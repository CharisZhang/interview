/**
 * 手写_promise
 * 哔哩哔哩: https://www.bilibili.com/video/BV137411e7KA?p=13
 */
/**
 * 1. 创建状态和值 state, value
 *    因为state的状态固定(pending, fulfilled, rejected),设置为静态属性 static
 *    value, 使用promise的时候, 把值改变,交给then去处理 then可以获取值
 * 2. 创建promise的时候会传递一个函数(executor: 执行者) 含有两个方法resolve(解决)和reject(拒绝)
 *    使用的时候executor传递两个参数 executor(resolve, reject) -> 可以将其写成类方法 Promise类的方法
 *    类方法会有参数: resolve的值/reject的拒因
 *    调用resolve/reject的时候需要改变状态和值
 *    executor(this.resolve, this.reject) 遵循严格模式外部调用resolve this会指向外部的上下文,需要bind来改变this()
 *    executor(this.resolve.bind(this),this.reject.bind(this))
 * 3. 状态保护, 只有状态为PENDING的情况才可以修改
 * 4. 执行过程中有错误会调用reject, trycatch executor
 * 5. then 构建
 *    传递两个函数参数(onFulfilled, onRejected )
 *    then不会立即执行,只有状态改变之后才会执行
 *    then 内的参数是可以不传的, 需要做额外的处理, 比如return Promise
 * 6. then 异步操作异常捕获
 *    then的函数参数执行报错也需要 将错误放入onRejected执行
 *    promise是异步操作的, 需要将then的操作放到任务队列中比如settimeout(宏任务模拟微任务) 否则会从上到下执行
 * 7. promise的pending状态处理
 *    在状态改变是异步的时候 需要另外处理(在pending状态处理)
 *    创建未来要执行的函数的数组 callbacks, 状态改变后再拿出执行
 *    异步执行之后会执行resolve/reject的方法 将callbacks遍历执行放入resolve/reject的方法内
 * 8. 在异步执行之后仍然需要做错误处理, push callbacks 做错误处理
 * 9. priomise 永远是异步的, resolve/reject 后面有同步执行的代码,先执行, 再去执行then的方法
 *    callbacks 遍历执行 套上settimeout
 * A. then的链式调用
 *    then返回一个new promise
 *    将then执行的返回值传递到下一promise的resolve方法
 * B. then新增promise异常处理
 *    新Promise发生异常的时候会调用 新promise的异常处理 onRejected(error)-> reject(error)
 * C. then的穿透处理
 *    在then的参数不是function的时候 直接返回value 实现穿透
 * D. then 返回proimise 的处理
 *    判断result 类型是否为Promise, 是: 执行result的then(resolve,reject) 否: 执行resolve(result)
 * E. 代码冗余优化
 *    
 */
class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.state = MyPromise.PENDING
    this.value = null
    this.callbacks = []
    // 执行过程中有错误会调用reject
    try {
      // class 遵循严格模式, 外部调用class的resolve,会指向全局
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(value) {
    // 状态保护
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.FULFILLED
      this.value = value
      setTimeout(() => {
        this.callbacks.forEach(callback => {
          callback.onFulfilled(value)
        })
      });
    }
  }
  reject(reason) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.REJECTED
      this.value = reason
      setTimeout(() => {
        this.callbacks.forEach(callback => {
          callback.onRejected(reason)
        })
      });
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve,reject)=>{
      if (typeof onFulfilled !== 'function') {
        onFulfilled = () => this.value
      }
      if (typeof onRejected !== 'function') {
        onRejected = () => this.value
      }
      if (this.state === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            try {
              let result = onFulfilled(value)
              if (result instanceof MyPromise) {
                result.then(resolve, reject)
              }else{
                resolve(result)
              }
            } catch (error) {
              reject(error)
              // onRejected(error)
            }
          },
          onRejected: reason => {
            try {
              let result = onRejected(reason)
              if (result instanceof MyPromise) {
                result.then(resolve, reject)
              }else{
                resolve(result)
              }
            } catch (error) {
              reject(error)
              // onRejected(error)
            }
  
          }
        })
      }
      if (this.state === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value)
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            }else{
              resolve(result)
            }
          } catch (error) {
            reject(error)
            // onRejected(error)
          }
        });
      }
      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value) 
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            }else{
              resolve(result)
            }
          } catch (error) {
            reject(error)
            // onRejected(error)
          }
        });
      }
    })
  }
}

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject('错误')
    // resolve('解决')
    // console.log(333);
  }, 1000);
  // reject('错误')
  // resolve('解决')
}).then(value => {
  console.log(value);
  return new MyPromise((resolve,reject)=>{
    reject('promise inner')
  })
  // return 'resolve2'
},reason=>{
  console.log('Error1: '+reason);
  return new MyPromise((resolve,reject)=>{
    reject('promise inner')
  })
}).then(value=>{
  console.log('resolve2: '+value);
},reason=>{
  console.log('Error2: '+reason);
})
console.log(2);