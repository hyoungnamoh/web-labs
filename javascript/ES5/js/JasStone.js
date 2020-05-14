let rival = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: {},
    fieldData: [],
    selectedCard: {},
}
// let rivalHero = document.getElementById('rival-hero');
// let rivalDeck = document.getElementById('rival-deck');
// let rivalField = document.getElementById('rival-cards');
// let rivalCost = document.getElementById('rival-cost');
// let rivalDeckData = [];
// let rivalHeroData;
// let rivalFieldData = [];

let my = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: {},
    fieldData: [],
    selectedCard: {},
    selectedCardData:{},
}
// let myHero = document.getElementById('my-hero');
// let myDeck = document.getElementById('my-deck');
// let myField = document.getElementById('my-cards');
// let myCost = document.getElementById('my-cost');
// let myDeckData = [];
// let myHeroData;
// let myFieldData = [];
let turnButton = document.getElementById('turn-btn');
let turn = true; //true 면 내 턴

const deckToField = (data, myTurn) => {
    let obj = myTurn ? my : rival;
    let currentCost = Number(obj.cost.textContent);
    if(currentCost < data.cost){ //내가 갖고있는 코스트보다 카드 코스트가 더 크면 return
        return true;
    }
    let idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx, 1);
    // console.log(data, obj.field, obj.fieldData);
    obj.fieldData.push(data);
    connectCard(data, obj.field);
    obj.deck.innerHTML = '';
    obj.field.innerHTML = '';
    obj.fieldData.forEach((d) => {
        connectCard(d, obj.field);
    });
    obj.deckData.forEach((d) => {
        connectCard(d, obj.deck);
    });
    obj.cost.textContent = currentCost - data.cost;
}

const redraw = (myTurn) => {
    let obj = myTurn ? my : rival;
    obj.fieldData.forEach((v) => {
        connectCard(v, obj.field);
    });
    obj.deckData.forEach((v) => {
        connectCard(v, obj.deck);
    });
    connectCard(obj.heroData, obj.hero, true);
}
//카드 돔 연결
const connectCard = (data, dom, hero) => {
    //cloneNode로 기존 태그를 그대로 복사, 인자에 true 넣으면 내부까지 전부 복사
    let card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;
    if(hero){
        card.querySelector('.card-cost').style.display = 'none';
        let name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }
    card.addEventListener('click', () => {
        console.log('click');
        if(turn){
            if(!data.myCard && my.selectedCard && card.classList.contains('card-turnover')){ //상대 카드 선택했을 때 내 카드가 선택되어 있고 턴이 끝나지 않았으면(정상 공격 시)
                data.hp = data.hp - my.selectedCard.att;
                deckToField();
                my.selectedCard.classList.remove('card-selected');
                my.selectedCard.classList.add('card-turnover');
                my.selectedCard = null;
                my.selectedCardData = null;
                console.log('click');
                return;
            } else if(!data.myCard){
                return;
            }
            if(data.field) {
                card.parentNode.querySelectorAll('.card').forEach((c) => {
                    c.classList.remove('card-selected');
                });
                card.classList.add('card-selected');
                my.selectedCard = card;
                my.selectedCardData = data;
            } else{
                if(!deckToField(data, true)){
                    createMyDeck(1);
                }
            }

        } else {
            if(data.myCard){
                return;
            }
            if(data.field) {

            } else {
                if(!deckToField(data, false)){
                    createRivalDeck(1);
                }
            }
        }
        data.field = true; //필드에 올라간 카드
    });
    dom.appendChild(card);
}
//상대 덱 생성
const createRivalDeck = (num) => {
    for(let i = 0; i < num; i++ ){
        rival.deckData.push(cardFactory());
    }
    rival.deck.innerHTML = '';
    rival.deckData.forEach((data) => {
        connectCard(data, rival.deck);
    });
}
//내 덱 생성
const createMyDeck = (num) => {
    for(let i = 0; i < num; i++ ){
        my.deckData.push(cardFactory(false, true));
    }
    my.deck.innerHTML = '';
    my.deckData.forEach((data) => {
        connectCard(data, my.deck);
    });
}
//상대 영웅 생성
const createRivalHero = () => {
    rival.heroData = cardFactory(true);
    connectCard(rival.heroData, rival.hero, true);
}
//내 영웅 생성
const createMyHero = () => {
    my.heroData = cardFactory(true, true);
    connectCard(my.heroData, my.hero, true);
}

//Card 생성자
class Card {
    constructor(hero, myCard) {
        if(hero){
            this.att = Math.ceil(Math.random() * 2);
            this.hp = Math.ceil(Math.random() * 5 + 25);
            this.hero = true;
            this.myCard = myCard;
        } else{
            this.att = Math.ceil(Math.random() * 5);
            this.hp = Math.ceil(Math.random() * 5);
            this.cost = Math.ceil((this.att + this.hp) / 2);
            this.myCard = myCard;
        }
    }
}
//카드 공장
const cardFactory = (hero, myCard) => {
    return new Card(hero, myCard);
}

//턴 버튼
turnButton.addEventListener('click', () => {
    turn = !turn;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
});

//초기 셋팅
const setting = () => {
    createRivalDeck(5);
    createMyDeck(5);
    createRivalHero();
    createMyHero();
}

setting();