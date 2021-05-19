let uni = function(){
    let count = 0
    return function(){
        return ++count
    }
}
let a = uni()
let b = uni()
let c = uni()
console.log(a());
console.log(a());
console.log(b());
console.log(a());
// console.log(uni());
// console.log(uni());
// console.log(uni());
// console.log(uni());