let _id = 0
function _Promise(id,fn) {
    _id+=1
    console.warn(id,_id);
    let state = 'pending'// fulfilled,rejected
    let value = null
    const callbacks = []
    this.then = (onFulfilled, onRejected) => {
        return new _Promise('inner',(resolve,reject)=>{
            handle({
                onFulfilled,
                resolve
            })
        })
    }
    fn(resolve)
    function handle(cb){
        if (state === 'pending') {
            callbacks.push(cb)
            return
        }
        if (state === 'fulfilled') {
            if (!cb.onFulfilled) {
                cb.resolve(value)
                return 
            }
            const ret = cb.onFulfilled(value)
            cb.resolve(ret)
        }
    }
    function resolve(newValue) {
        setTimeout(() => {
            if (state !== 'pending') return
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                const { then } = newValue
                if (typeof then === 'function') {
                    then.call(newValue,resolve)
                    return
                }
            }
            state = 'fulfilled'
            value = newValue
            handleCb()
        }, 0);
    }
    function handleCb() {
        while (callbacks.length) {
            const fulfilledFn = callbacks.shift()
            handle(fulfilledFn)
        }
    }
}

let _promise = new _Promise('outter',(resolve, reject) => {
    resolve('succeed')
})
_promise.then(null).then((data)=>{
    console.log(data);
})
// .then((data)=>{
//     console.log(333,data);
// })
