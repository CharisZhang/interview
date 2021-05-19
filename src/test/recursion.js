/**
 * 调用栈溢出
 */
// console.log((function recur() {
//     try {
//         return 1 + recur()
//     } catch (error) {
//         return 1
//     }
// })());
function add(num) {
    if(num==1){
        return 1
    }else{
        return num + add(num-1)
    }
}
// 蹦床函数
// function add2(num,result=1) {
//     if (num == 1) {
//         return result
//     }else{
//         return () => add2(num - 1, 1 + result)
//     }
// }
function add2(num, result = 1) {
    if (num === 1) return result
    return () => add2(num - 1 + result)
}
function trampoline(fun) {
    let result = fun()
    // 循环调用，解决递归问题
    while (typeof (result) === 'function') {
        result = result()
    }
    return result
}

console.log(trampoline(add2(10)));
// console.log(add2(100000));