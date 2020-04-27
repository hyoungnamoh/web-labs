// const testArray = [3,15,123,23,54,76,87,51,34,27];
// console.log(testArray);
// testArray.sort((p, c) => {
//     return p-c;
// })
//
// console.log(testArray);

// for(let i=0; i<100; i++) {
//     setTimeout(function() {
//         console.log('문제',i);
//     }, i*1000);
// }
//
// for(let i=0; i<100; i++) {
//     const closure = (i) => {
//         setTimeout(() => {
//             console.log(i);
//         }, i*1000);
//     }
//     closure(i);
// }

for(var i=0; i<100; i++) {
    (function(j){
        setTimeout(() => {
            console.log(j);
        }, j*1000);
    }(i))

}
