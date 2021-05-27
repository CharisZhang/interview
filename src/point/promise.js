// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve({test:1})
//     resolve({test:2})
//     reject({ test: 3 })
//   }, 500)
// }).then((res) => {
//     console.log(res)
// }, (reason) => {
//     console.log('1' + reason) // 出错了！
// }).then((res) => {
//     console.log('2' + res)
// })
let p1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject({name:'p1-resolve'})
    }, 500);
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject({name:'p2-reject'})
    }, 1000);
})
let p3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject({name:'p3-resolve'})
    }, 1500);
})
// Promise
// p2.catch((e)=>{console.log(e);})
const p = Promise.any([p1, p2, p3])
p.then((res)=>{
    console.log('then');
    console.log(res);
}).catch((e)=>{
    console.log('catch');
    console.log(e);
})