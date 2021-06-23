/*
可进行链式调用，且每次 then 返回了新的 Promise(2次打印结果不一致，如果是同一个实例，打印结果应该一致。
只输出第一次 resolve 的内容，reject 的内容没有输出，即 Promise 是有状态且状态只可以由pending -> fulfilled或 pending-> rejected,是不可逆的。
then 中返回了新的 Promise,但是then中注册的回调仍然是属于上一个 Promise 的。
 */
function _Promise(fn) {
    let state = 'pending'
    let value = null
    const callbacks = []
    this.then = function (onFulfilled, onRejected) {
        return new _Promise((resolve, reject) => {
            // 将新的Promise 的resolve方法,放到前一个promise的回调对象中
            handle({
                onFulfilled,
                onRejected,
                resolve,
                reject
            })
        })
    }
    this.catch = function (onError) {
        this.then(null, onError)
    }
    this.finally = function (onDone) {
        this.then(onDone, onDone)
    }
    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback)
            return
        }
        const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
        const next = state === 'fulfilled' ? callback.resolve : callback.reject
        if (!cb) {
            next(value)
            return
        }
        let ret
        try {
            ret = cb(value)
        } catch (e) {
            callback.reject(e)
        }
        callback.resolve(ret)
        // if (state === 'fulfilled') {
        //     if (!cb.onFulfilled) {
        //         cb.resolve(value)// 没有设置onFulfilled 静默移如下一promise的resolve
        //         return
        //     }
        //     const ret = cb.onFulfilled(value) // 处理回调
        //     cb.resolve(ret) //处理下一个 promise 的resolve
        // }
    }
    function resolve(newValue) {
        const fn = () => {
            if (state !== 'pending') return
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                const { then } = newValue
                console.log(then);
                if (typeof then === 'function') {
                    // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
                    //相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调
                    then.call(newValue, resolve, reject)
                    return
                }
            }

            state = 'fulfilled'
            value = newValue
            handleCb()
        }
        setTimeout(fn, 0) //基于promiseA+规范
    }
    function reject(error) {
        const fn = () => {
            if (state !== 'pending') return
            if (error && (typeof error === 'object' || typeof error === 'function')) {
                const { then } = error
                if (typeof then === 'function') {
                    then.call(error, resolve, reject)
                    return
                }
            }
            state = 'rejected'
            value = error
            handleCb()
        }
        setTimeout(fn, 0);
    }
    function handleCb() {
        while (callbacks.length) {
            const fulfilledFn = callbacks.shift()
            handle(fulfilledFn)
        }
    }
    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}
_Promise.resolve = function (value) {
    if (value && value instanceof _Promise) {
        return value
    } else if (value && (typeof value === 'object' || typeof value === 'function')) {
        let { then } = value
        return new _Promise(resolve => {
            then()
        })
    } else if (value) {
        return new _Promise(resolve => resolve(value))
    } else {
        return new _Promise(resolve => resolve())
    }
}
_Promise.reject = function (value) {
    if (value && value instanceof _Promise) {
        return value
    } else if (value && (typeof value === 'object' || typeof value === 'function')) {
        let { then } = value
        return new _Promise(reject => {
            then()
        })
    } else if (value) {
        return new _Promise(reject => reject(value))
    } else {
        return new _Promise(reject => reject())
    }
}
_Promise.all = function(arr){
    var args = Array.prototype.slice.call(arr)
    return new _Promise((resolve,reject)=>{
        if (args.length === 0) return resolve([])
        var remaining = args.length
        function res(i, val) {
            try {
                if (val && (typeof val === 'object' || typeof val === 'function')) {
                    let {then} = val
                    if (typeof then === 'function') {
                        then.call(val, function(val){
                            res(i,val)
                        },reject)
                        return
                    }
                }
                args[i] = val
                if (--remaining === 0) {
                    resolve(args)
                }
            } catch (e) {
                reject(e)
            }
        }
        for (let i = 0; i < args.length; i++) {
            res(i,args[i])
            
        }
    })
    
}
// console.log(_Promise.resolve(2));
console.log(new _Promise((resolve)=>{resolve()}));
// let _promise = new _Promise((resolve, reject) => {
//     // setTimeout(() => {
//     reject('haha')
//     // }, 500);
// }).then((data) => {
//     // return new _Promise((resolve)=>{
//     //     resolve('haha2')
//     // })
//     return 'haha3'
// }, (e) => {
//     console.error(e);
// }).then((data) => {
//     console.log(data);
// })
let _promise_1 = new _Promise((resolve, reject) => {
    setTimeout(() => {
        reject('_promise_1')
    }, 500);
})
let _promise_2 = new _Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('_promise_2')
    }, 1000);
})
let _promise_3 = new _Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('_promise_3')
    }, 1500);
})
_Promise.all([_promise_1, _promise_2, _promise_3]).then((data) => {
    console.warn('resolve', data);
}).catch((err) => {
    console.warn('reject', err);
})