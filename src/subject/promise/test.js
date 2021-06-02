/**
 * 测试手写Promise
 */
// const Promise = require('./promise')
import { Promise } from './promise.js'
console.log(1);
new Promise((resolve, reject) => {
    throw new Error('error')
    console.log(2);
    resolve(1)
}).then(
    value => {
        console.log(4);
        console.log('value', value);
    },
    reason => {
        console.log('reason', reason);
    }
)
console.log(3);