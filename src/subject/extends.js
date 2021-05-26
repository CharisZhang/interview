
// /**
//  * 手写继承 ES5 ES6
//  */
//  ES6
class Parent{
  constructor(){
    this.name = 'parent'
    this.names = ['name1','name2']
  }
}
class Child extends Parent{
  constructor(){
    super()
  }
}
let child = new Child()
let _child = new Child()
// console.log(Child.prototype.__proto__ === Parent.prototype);
// console.log(child.__proto__ === Child.prototype);
child.names.push('name3')
// console.log(_child.names);
/**
 * ES5
 */
// 原型链继承
function Parent2() {
  console.log('p2');
  this.name = 'p2'
  this.names = ['a','b']
}
Parent2.prototype.getNames = function() {
  return this.names
}
function Child2() {
}
Child2.prototype = new Parent2()
let child2 = new Child2()
// 构造函数继承
function Parent3() {
  console.log('p2');
  this.name = 'p2'
  this.names = ['a','b']
}
function Child3() {
  Parent3.apply(this,arguments)
}
// 组合继承
function Parent4() {}
function Child4() {
  Parent4.apply(this,arguments)
}
Child4.prototype = new Parent4()
// 原型式继承
function createObj(o) {
  function F() {}
  F.prototype = o
  return new F()
}
let Parent5 = {
  name: 'p5',
  names: ['a','b','c']
}

let person1 = createObj(Parent5)
console.log(person1.names);