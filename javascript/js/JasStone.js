let rivalHero = document.getElementById('rival-hero');
let myHero = document.getElementById('my-hero');
let rivalDeck = document.getElementById('rival-deck');
let myDeck = document.getElementById('my-deck');
let rivalDeckData = [];
let myDeckData = [];
let rivalHeroData;
let myHeroData;

//상대 덱 생성
const createRivalDeck = (num) => {
    for(let i = 0; i < num; i++ ){
        rivalDeckData.push(cardFactory());
    }
}
//내 덱 생성
const createMyDeck = (num) => {
    for(let i = 0; i < num; i++ ){
        myDeckData.push(cardFactory());
    }
}
//상대 영웅 생성
const createRivalHero = () => {
    rivalHeroData = cardFactory();
}
//내 영웅 생성
const createMyHero = () => {
    myHeroData = cardFactory();
}

const setting = () => {
    createRivalDeck(5);
    createMyDeck(5);
    createRivalHero();
    createMyHero();
}
//Card 생성자
const Card = () => {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = (att + hp) / 2;
}
const cardFactory = () => {
    return new Card();
}

setting();