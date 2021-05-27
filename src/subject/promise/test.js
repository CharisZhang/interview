/**
 * 测试手写Promise
 */
const Promise = require('./promise')
new Promise((resolve,reject)=>{
    console.log('start promise');
    resolve(1)
})
// new Promise(2) 