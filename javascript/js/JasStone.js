let rivalHero = document.getElementById('rival-hero');
let myHero = document.getElementById('my-hero');
let rivalDeck = document.getElementById('rival-deck');
let myDeck = document.getElementById('my-deck');
let rivalField = document.getElementById('rival-cards');
let myField = document.getElementById('my-cards');
let rivalCost = document.getElementById('rival-cost');
let myCost = document.getElementById('my-cost');
let turnButton = document.getElementById('turn-btn');
let rivalDeckData = [];
let myDeckData = [];
let rivalHeroData;
let myHeroData;
let rivalFieldData = [];
let myFieldData = [];
let turn = true; //true 면 내 턴


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
        if(turn){
            if(!data.myCard || data.field){ //내 턴인데 상대 카드 눌렀을 때
                return;
            }
            let currentCost = Number(myCost.textContent);
            if(currentCost < data.cost){ //내가 갖고있는 코스트보다 카드 코스트가 더 크면 return
                return;
            }
            let idx = myDeckData.indexOf(data);
            myDeckData.splice(idx, 1);
            myFieldData.push(data);
            connectCard(data, myField);
            myDeck.innerHTML = '';
            myField.innerHTML = '';
            myFieldData.forEach(() => {
                connectCard(data, myField);
            });
            myDeckData.forEach(() => {
                connectCard(data, myDeck);
            });
            myCost.textContent = currentCost - data.cost;
            createMyDeck(1);
            data.field = true; //필드에 올라간 카드
        } else {
            if(data.myCard || data.field){ //내 턴인데 상대 카드 눌렀을 때
                return;
            }
            let currentCost = Number(rivalCost.textContent);
            if(currentCost < data.cost){ //내가 갖고있는 코스트보다 카드 코스트가 더 크면 return
                return;
            }
            let idx = rivalDeckData.indexOf(card);
            rivalDeckData.splice(idx, 1);
            rivalFieldData.push(data);
            connectCard(data, rivalField);
            rivalDeck.innerHTML = '';
            rivalField.innerHTML = '';
            rivalFieldData.forEach(() => {
                connectCard(data, rivalField);
            });
            rivalDeckData.forEach(() => {
                connectCard(data, rivalDeck);
            });
            myCost.textContent = currentCost - data.cost;
            createRivalDeck(1);
            data.field = true; //필드에 올라간 카드
        }
    })
    dom.appendChild(card);
}
//상대 덱 생성
const createRivalDeck = (num) => {
    for(let i = 0; i < num; i++ ){
        rivalDeckData.push(cardFactory());
    }
    rivalDeck.innerHTML = '';
    rivalDeckData.forEach((data) => {
        connectCard(data, rivalDeck);
    });
}
//내 덱 생성
const createMyDeck = (num) => {
    for(let i = 0; i < num; i++ ){
        myDeckData.push(cardFactory(false, true));
    }
    myDeck.innerHTML = '';
    myDeckData.forEach((data) => {
        connectCard(data, myDeck);
    });
}
//상대 영웅 생성
const createRivalHero = () => {
    rivalHeroData = cardFactory(true);
    connectCard(rivalHeroData, rivalHero);
}
//내 영웅 생성
const createMyHero = () => {
    myHeroData = cardFactory(true, true);
    connectCard(myHeroData, myHero, true);
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
            this.cost = (this.att + this.hp) / 2;
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