/**
 * es6-Promise
 */
// console.log(1);
// new Promise((resolve, reject) => {
//     throw new Error('error')
//     console.log(2);
//     resolve(1)
// }).then(
//     value => {
//         console.log(4);
//         console.log('value', value);
//     },
//     reason => {
//         console.log('reason', reason);
//     }
// )
// console.log(3);

new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve({test:1})
        resolve({test:2})
        reject({test:1})
    }, 1000);
}).then((res)=>{
    console.log('result1',res);
},(err)=>{
    console.log('result2',err);
}).then((res)=>{
    console.log('result3',res);
})

