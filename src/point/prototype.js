/**
 * 对应名称
 * - prototype : 原型
 * - __proto__ : 原型链(链接点),原型链是由__proto__连接起来的
 * 
 * 从属关系
 * prototype -> 函数的一个属性: 对象{}
 * __proto__ -> 对象Object的一个属性: 对象{}
 * 对象的__proto__ 保存着该对象的构造函数的prototype
 * 
 */

function Func() {
  // let func = 1
}
Func.prototype.a = function() {
  console.log('funca');
}
Func.constructor = function() {
  console.log('Func-constructor')
}
let func = new Func()
class Father {
  constructor(){
    console.log('Father-constructor');
  }
  a(){
    console.log('fathera');
  }
}
let fat = new Father()
// func.a()
// fat.a()
console.log(Func.prototype);
console.log(Father.prototype);
// console.log(fat.__proto__ === Father.prototype);

// console.log(fun.__proto__);
// let funchild = new fun()
// console.log(funchild.__proto__ === fun.prototype);
// console.log(Object.prototype.__proto__);