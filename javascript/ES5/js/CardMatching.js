const hor = 4;
const ver = 3;
const colors = ['red', 'orange', 'green', 'yellow', 'white', 'pink', 'red', 'orange', 'green', 'yellow', 'white', 'pink'];
let candidateColors = colors.slice();
let startTime;
let clickFlag = false;
let clickCard = []; //클릭 시도한 한 페어 카드
let completeCard = [];
let color = []; //섞은 카드 색상

const shuffle = () => {
    for(let i=0; candidateColors.length > 0; i++){
        color = color.concat(candidateColors.splice(Math.floor(Math.random() * candidateColors.length), 1));
    }
}
console.log(color);
const cardSetting = (hor, ver) => {
    shuffle();
    for(let i = 0; i < hor * ver; i++){
        let card = document.createElement('div');
        card.className = 'card';
        let cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        let cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        let cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', () => {
            //완성카드에 들어있지 않으면
            if(clickFlag && !completeCard.includes(card)){
                card.classList.toggle('flipped'); //toggle switch 같은 개념
                clickCard.push(card);
                if(clickCard.length > 1){ //두개 골랐을 때
                    //짝이 같을 때
                    if(clickCard[0].querySelector('.card-back').style.backgroundColor === clickCard[1].querySelector('.card-back').style.backgroundColor){
                        completeCard.push(clickCard[0]);
                        completeCard.push(clickCard[1]);
                        clickCard = [];
                        if(completeCard.length > 11){
                            let endTime = new Date();
                            alert((endTime - startTime)/1000 + '초 걸렸습니다.');
                            document.querySelector('#wrapper').innerHTML = '';
                            color = [];
                            candidateColors = colors.slice();
                            shuffle();
                            clickFlag = true;
                            clickCard = [];
                            completeCard = [];
                            clickFlag = false;
                            cardSetting(hor, ver);
                        }
                    } else{ //짝이 틀릴 때
                        clickFlag = false;
                        setTimeout(() => {
                            clickCard[0].classList.remove('flipped');
                            clickCard[1].classList.remove('flipped');
                            clickFlag = true;
                            clickCard = [];
                        }, 1000);
                    }
                }
            }
        })
        document.querySelector('#wrapper').appendChild(card);
    }
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + 100 * index);

        setTimeout(() => {
            card.classList.remove('flipped');
            startTime = new Date();
            clickFlag=true;
        }, 5000)
    });
}



cardSetting(hor, ver);
