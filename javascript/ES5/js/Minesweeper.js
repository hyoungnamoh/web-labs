document.querySelector('#exec').addEventListener('click', () => {
    const hor = document.querySelector('#hor').value;
    const ver = document.querySelector('#ver').value;
    const mine = document.querySelector('#mine').value;
    console.log(hor, ver, mine);

    let dataset = [];
    let tbody = document.querySelector('#table tbody');
    for(let i =0; i < ver; i++) {
        let arr = [];
        let tr = document.createElement('tr');
        dataset.push(arr);
        for(let j = 0; j < hor; j ++){
            arr.push(1);
            let td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    console.log(dataset);

})