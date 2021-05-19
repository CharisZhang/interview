/**
 * 数组去重
 */
// es6-set方法
let arr = [1,2,3,3,4]
let set = new Set(arr)
// console.log([...set]);

let arrObj = {}
const map = new Map();
for (const item of arr) {
    map.set(item,item)
}
console.log([...map.keys()]);