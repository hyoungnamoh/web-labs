const hor = 4;
const ver = 3;
const candidateColors = ['red', 'orange', 'green', 'yellow', 'white', 'pink', 'red', 'orange', 'green', 'yellow', 'white', 'pink'];
let color = [];
for(let i=0; candidateColors.length > 0; i++){
    color = color.concat(candidateColors.splice(Math.floor(Math.random() * candidateColors.length), 1));
}
console.log(color);
const cardSetting = (hor, ver) => {
    for(let i = 0; i < hor * ver; i++){
        let card = document.createElement('div');
        card.className = 'card';
        let cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        let cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        let cardBack = document.createElement('div');
        cardBack.className = 'card-back';

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', () => {
            card.classList.toggle('flipped'); //toggle switch 같은 개념
        })
        document.body.appendChild(card);
    }
}

cardSetting(hor, ver);
