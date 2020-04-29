let rivalHero = document.getElementById('rival-hero');
let myHero = document.getElementById('my-hero');
let rivalDeck = document.getElementById('rival-deck');
let myDeck = document.getElementById('my-deck');
let rivalDeckData = [];
let myDeckData = [];
let rivalHeroData;
let myHeroData;

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
    dom.appendChild(card);
}
//상대 덱 생성
const createRivalDeck = (num) => {
    for(let i = 0; i < num; i++ ){
        rivalDeckData.push(cardFactory());
    }
    rivalDeckData.forEach((data) => {
        connectCard(data, rivalDeck);
    });
}
//내 덱 생성
const createMyDeck = (num) => {
    for(let i = 0; i < num; i++ ){
        myDeckData.push(cardFactory());
    }
    myDeckData.forEach((data) => {
        connectCard(data, myDeck);
    });
}
//상대 영웅 생성
const createRivalHero = () => {
    rivalHeroData = cardFactory(true);
    connectCard(rivalHeroData, rivalHero, true);
}
//내 영웅 생성
const createMyHero = () => {
    myHeroData = cardFactory(true);
    connectCard(myHeroData, myHero, true);
}

//Card 생성자
class Card {
    constructor(hero) {
        if(hero){
            this.att = Math.ceil(Math.random() * 2);
            this.hp = Math.ceil(Math.random() * 5 + 25);
            this.hero = true;
        } else{
            this.att = Math.ceil(Math.random() * 5);
            this.hp = Math.ceil(Math.random() * 5);
            this.cost = (this.att + this.hp) / 2;
        }
    }
}
//카드 공장
const cardFactory = (hero) => {
    return new Card(hero);
}

//초기 셋팅
const setting = () => {
    createRivalDeck(5);
    createMyDeck(5);
    createRivalHero();
    createMyHero();
}

setting();