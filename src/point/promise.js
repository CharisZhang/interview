










// function Promise(fn) {
//     let state = 'pending'
//     let value = null
//     const callbacks = []
//     this.then = function(onFulfilled) {
//         return new Promise((resolve,reject)=>{
//             handle({ // 将新Promise的 resolve方法,放到前一个promise的回调对象中
//                 onFulfilled,
//                 resolve
//             })
//         })
//     }
//     function handle(callback) {
//         if (state === 'pending') {
//             callbacks.push(callback)
//             return
//         }
//         if (state === 'fulfilled') {
//             if (!callback.onFulfilled) {
//                 callback.resolve(value)
//                 return
//             }
//             const ret = callback.onFulfilled(value) // 处理回调
//             callback.resolve(ret)
//         }
//     }
//     function resolve(newValue) {
//         const fn = ()=>{
//             if (state !== 'pending') return
//             state = 'fulfilled'   
//             value = newValue
//             handleCb()
//         }
//         setTimeout(fn, 0); // 基于PromiseA+ 规范
//     }
//     function handleCb() {
//         while (callbacks.length) {
//             const fulfilledFn = callbacks.shift()
//             handle(fulfilledFn)
//         }
//     }
//     fn(resolve)
// }





















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
        resolve({name:'p1-resolve'})
    }, 500);
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve({name:'p2-reject'})
    }, 1000);
})
let p3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve({name:'p3-resolve'})
    }, 1500);
})
// Promise
// p2.catch((e)=>{console.log(e);})
// const p = Promise.all([p1, p2, p3])
// const p = Promise.race([p1, p2, p3])
// const p = Promise.allSettled([p1, p2, p3])
const p = Promise.any([p1, p2, p3])
p.then((res)=>{
    console.log('then',res);
}).catch((e)=>{
    console.log('catch',e);
})