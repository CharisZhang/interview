/**
 * 手写promise
 * 哔哩哔哩: https://www.bilibili.com/video/BV1L441157jg?p=5
 */
class Promise {
    constructor(executor) {
        // 参数校验
        if (typeof executor !== 'function') {
            throw new TypeError(`Promise resolver ${executor} is not a function`)
        }
        this.value = null //终值
        this.reason = null // 拒因
        this.state = 'pending' // 状态
        // 非箭头函数中this的指向会指向他的调用者,也就是new Promise中resolve(), 调用者是全局,
        // 使用箭头函数会this指向他的父级,也就是class Promise
        const resolve = value => {
            // 成功后的操作(状态的改变,成功回调的执行)
            // 不可逆的,所以判断只有状态为pending的时候才可以执行
            if (this.state === 'pending') {
                this.state = 'fulfilled' // 状态
                this.value = value
            }
        }
        const reject = reason => {
            // 失败后的操作(状态的改变,失败回调的执行)
            // 不可逆的,所以判断只有状态为pending的时候才可以执行
            if (this.state === 'pending') {
                this.state = 'rejected' // 状态
                this.reason = reason
            }
        }
        executor(resolve, reject)
    }

}
module.exports = Promise