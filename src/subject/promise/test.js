/**
初始化 Promise 状态（pending）
立即执行 Promise 中传入的 fn 函数，将Promise 内部 resolve、reject 函数作为参数传递给 fn ，按事件机制时机处理
执行 then(..) 注册回调处理数组（then 方法可被同一个 promise 调用多次）
Promise里的关键是要保证，then方法传入的参数 onFulfilled 和 onRejected，必须在then方法被调用的那一轮事件循环之后的新执行栈中执行。
First Step
1. 初始化Promise的状态 state -> pending
2. 创建Promise的value 用于保存 resolve传入的值
3. 创建Promise的callbacks执行组
4. Promise 的then 方法 返回 Promise
5. 处理当前Promise和then返回的Promise, 将新Promise的resolve放到前一个Promise的回调对象中
 */
function _Promise(fn) {
    let state = 'pending' // fulfilled, rejected
    let value = null
    let callbacks = []

    this.then = function (onFulfilled, onRejected) {
        return new _Promise((resolve, reject) => {
            // 将新 Promise 的resolve方法,放到前一个Promise的的回调对象中(链式调用)
            handle({
                onFulfilled,
                onRejected,
                resolve,
                reject
            })
        })

    }
    fn(resolve)
    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback)
        }
        if (state === 'fulfilled') {
            // 没有设置onFulfilled 静默移入下一promise的resolve
            if (!callback.onFulfilled) {
                callback.resolve(value)
                return
            }
            // 执行外层promise的onFulfilled
            const ret = callback.onFulfilled(value)
            // 执行下一promise的resolve, 返回值传入下一resolve的value
            callback.resolve(ret)
        }
    }
    function resolve(newValue) {
        // const fn = () => {
        if (state !== 'pending') return
        state = 'fulfilled'
        value = newValue
        handleCb()
        // }
        // 基于 PromiseA+ 规范
        // setTimeout(fn, 0);
    }
    function handleCb() {
        while (callbacks.length) {
            const fulfilledFn = callbacks.shift()
            handle(fulfilledFn)
        }
    }
}
console.log(11111);
let p = new _Promise((resolve, reject) => {
    console.log(22222);
    setTimeout(() => {
        resolve(1)
    }, 500);
}).then((value) => {
    console.log(44444);
    console.log(value);
    return 2
}, (reason) => {
    console.log(reason);
}).then((value) => {
    console.log(value);
})
console.log(33333);

// new Promise((resolve,reject)=>{
//     resolve(1)
// }).then((value)=>{
//     console.log(value);
// },(reason)=>{
//     console.log(reason);
// })