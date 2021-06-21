/**
 * 手写_promise
 * 哔哩哔哩: https://www.bilibili.com/video/BV1L441157jg?p=5
 * 掘金: https://juejin.cn/post/6844903625769091079#heading-1
 */
/* 1. 基本状态
  Promise存在三个状态（state）pending、fulfilled、rejected
  pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）
  成功时，不可转为其他状态，且必须有一个不可改变的值（value）
  失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
  new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。
  new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。
  若是executor函数报错 直接执行reject();
 */

class _Promise {
  constructor(executor) {
    console.log('1.promise.constructor')
    this.state = 'pending' // 三种状态 pending, fulfilled, rejected
    this.value = null // 成功的值
    this.reason = null // 失败的原因
    // 成功/失败回调函数存放的数组
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      console.log('3.promise.constructor.resolve')
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }
    let reject = (reason) => {
      // console.log('3.promise.constructor.reject',reason);
      if (this.state === 'pending') {
        this.state = 'reject'
        this.reason = reason
        console.error('opts')
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  /* 2. then 方法
    Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因
    当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.reason
    onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数
  */
  then(onFulfilled, onRejected) {
    console.log('4.promise.then');
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ?
      onFulfilled :
      value => value
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onFulfilled === 'function' ?
      onRejected :
      err => {
        throw err
      }
    /* 4. new Promise().then().then() 链式调用
      then里面返回一个新的promise
      将这个promise2返回的值传递到下一个then中
      如果返回一个普通的值，则将普通的值传递给下一个then中
      规定onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise
      首先，要看x是不是promise。
      如果是promise，则取它的结果，作为新的promise2成功的结果
      如果是普通值，直接作为promise2成功的结果
      所以要比较x和promise2
      resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象）、resolve、reject
      resolve和reject是promise2的
    */
    const promise2 = new _Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      }
      /* 3. 异步实现
        但是当resolve在setTomeout内执行，then时state还是pending等待状态
        我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
        类似于发布订阅，先将then里面的两个函数储存起来，由于一个promise可以有多个then，所以存在同一个数组内。
      */
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
      }

    })
    return promise2
  }
  catch(fn) {
    return this.then(null, fn)
  }
}
/* 5. resolvePromise 让不同的promise代码互相套用
  如果 x === promise2，则是会造成循环引用，自己等待自己完成，则报“循环引用”错误
  x 不能是null
  x 是普通值 直接resolve(x)
  x 是对象或者函数（包括promise），let then = x.then
  2、当x是对象或者函数（默认promise）
  声明了then
  如果取then报错，则走reject()
  如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
  如果成功的回调还是pormise，就递归继续解析
  3、成功和失败只能调用一个 所以设定一个called来防止多次调用
*/
function resolvePromise(promise2, x, resolve, reject) {
  // 防止循环引用
  if (x === promise2) {
    console.error(new TypeError(`Chaining cycle detected for promise`))
    return
  }
  // 防止多次调用
  let called
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      //  A+规定,声明then = x的then方法
      let then = x.then
      // 如果then是函数, 就默认是promise了
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            // 成功和失败只能调用一个
            if (called) return
            called = true
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject)
          },
          (err) => {
            if (called) return
            called = true
            reject(err)
          }
        )
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
_Promise.resolve = function(val) {
  return new _Promise((resolve,reject)=>{
    resolve(val)
  })
}
_Promise.reject = function(val) {
  return new _Promise((resolve,reject)=>{
    reject(val)
  })
}
_Promise.race = function(promises) {
  return new _Promise((resolve,reject)=>{
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve,reject)
    }
  })
}
let _promise_1 = new _Promise((resolve,reject)=>{
  setTimeout(() => {
    reject('_promise_1')
  }, 500);
})
let _promise_2 = new _Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve('_promise_2')
  }, 1000);
})
let _promise_3 = new _Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve('_promise_3')
  }, 1500);
})
_Promise.race([_promise_1,_promise_2,_promise_3]).then((data)=>{
  console.warn('resolve',data);
}).catch((err)=>{
  console.warn('reject',err);
})
// let _promise = new _Promise((resolve, reject) => {
//   console.warn('2');
//   setTimeout(() => {
//     resolve('succeed')
//   }, 500);
// }).then((value) => {
//   console.warn('97.fulfilled', value);
//   // return 'return 1'
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('promisexxx')
//     }, 100);
//   })
// }, (reason) => {
//   console.warn('97.rejected', reason);
// }).then(value => {
//   console.warn('98.fulfilled.1', value);
//   return 'return 2'
// }).then(value => {
//   console.warn('98.fulfilled.2', value);
//   return 'return 3'
// }).then(value => {
//   console.warn('98.fulfilled.3', value);
//   return 'return 4'
// })
// let p = new _Promise((resolve, reject) => {
//   // resolve(0);
//   setTimeout(() => {
//     resolve(0);
//   }, 500);
// }, reason => {
//   console.error('reject1', reason);
// });
// var p2 = p.then(data => {
//   // 循环引用，自己等待自己完成，一辈子完不成
//   console.log('循环引用，自己等待自己完成，一辈子完不成');
//   return p2;
// }, reason => {
//   console.error('reject2', reason);
// })
