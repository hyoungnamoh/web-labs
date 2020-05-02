let table = document.getElementById('table');
let data = [];

const init = () => {
    let fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(() => {
        let col = [];
        data.push(col);
        let tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(() => {
            col.push(0);
            let td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
    console.log(table);
}

//랜덤으로 빈칸에 숫자 넣어주는 함수
const createRandom = () => {
    let spaceArr = []; //빈칸 모아두는 배열
    data.map((col, i) => { //반복문 돌면서 빈칸들을 배열에 푸쉬
        col.map((row, j) => {
            if(!row) {
                spaceArr.push([i, j]); //인덱스배열을 빈공간배열에 넣어줌
            }
        });
    });
    let random = spaceArr[Math.floor(Math.random() * spaceArr.length)]; //빈칸 배열 중 한 칸 고름(floor = 소수점 버리고 같거나 작은 숫자)
    data[random[0]][random[1]] = 2;
    draw();
}

const draw = () => {
    data.map((col, i) => {
        col.map((row, j) => {
            if(row > 0){
                table.children[i].children[j].textContent = row;
            } else{
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

init();
createRandom();
draw();

