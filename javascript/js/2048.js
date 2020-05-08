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

let dragFlag = false;
let isDragging = false;
let startLocation;
let endLocation;

//마우스 누를 때
window.addEventListener('mousedown', (e) => {
    dragFlag = true;
    startLocation = [e.clientX, e.clientY];
});

//마우스 움직일 때
window.addEventListener('mousemove', (e) => {
    if(dragFlag){
        isDragging = true;
    }
});

//마우스 뗄 때
window.addEventListener('mouseup', (e) => {
    endLocation = [e.clientX, e.clientY];
    let direction;
    if(isDragging){
        let xDiff = endLocation[0] - startLocation[0];
        let yDiff = endLocation[1] - startLocation[1];
        if(xDiff < 0 && Math.abs(xDiff) / Math.abs(yDiff) > 1) {
            direction = 'left';
        } else if(xDiff > 0 && Math.abs(xDiff) / Math.abs(yDiff) > 1){
            direction = 'right';
        } else if(xDiff > 0 && Math.abs(xDiff) / Math.abs(yDiff) < 1){
            direction = 'up';
        } else if(xDiff < 0 && Math.abs(xDiff) / Math.abs(yDiff) < 1){
            direction = 'down';
        }
    }
    dragFlag = false;
    isDragging = false;
    let newData;

    switch(direction){
        case 'left' :
            console.log(direction);
            break;
        case 'right' :
            console.log(direction);
            break;
        case 'up' :
            console.log(direction);
            newData = [[],[],[],[]];
            //새로운 데이터 만들기
            data.map((colData, i) => {
                colData.map((rowData, j) => {
                    if(rowData){ //원래 데이터를 돌면서 칸에 데이터가 있으면 newData엔 해당 행의 맨위에 넣음
                        newData[j].push(rowData);
                    }
                });
            });
            console.log(newData);
            //새로운 데이터 그리기
            [1,2,3,4].map((rowData, i) => {
                [1,2,3,4].map((colData, j) => {
                    data[j][i] = newData[i][j] || 0;
                });
            });
            break;
        case 'down' :
            console.log(direction);
            newData = [[],[],[],[]];
            //새로운 데이터 만들기
            data.map((colData, i) => {
                colData.map((rowData, j) => {
                    if(rowData){ //원래 데이터를 돌면서 칸에 데이터가 있으면 newData엔 해당 행의 맨아래 넣음
                        newData[j].unshift(rowData);
                    }
                });
            });
            console.log(newData);
            //새로운 데이터 그리기
            [1,2,3,4].map((rowData, i) => {
                [1,2,3,4].map((colData, j) => {
                    data[3-j][i] = newData[i][j] || 0;
                });
            });
            console.log(data);
            break;
    }
    createRandom();
});