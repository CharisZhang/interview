// /**
//  * 手写继承 ES5 ES6
//  */
//  ES6
class Parent {
  constructor() {
    this.name = 'parent'
    this.names = ['name1', 'name2']
  }
}
class Child extends Parent {
  constructor() {
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
  // console.log('p2');
  this.name = 'p2'
  this.names = ['a', 'b']
}
Parent2.prototype.getNames = function () {
  return this.names
}
function Child2() {}
Child2.prototype = new Parent2()
let child2 = new Child2()
// 构造函数继承
function Parent3() {
  console.log('p2')
  this.name = 'p2'
  this.names = ['a', 'b']
}
function Child3() {
  Parent3.apply(this, arguments)
}
// 组合继承
function Parent4() {}
function Child4() {
  Parent4.apply(this, arguments)
}
Child4.prototype = new Parent4()
// 原型式继承
// 将传入的对象作为创建的对象的原型
function createObj(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 寄生式继承
function createObj2(o) {
  var clone = createObj(o)
  clone.sayName = function () {
    console.log(this.names)
  }
  return clone
}

// 寄生组合继承
function Parent6() {
  // console.log('Parent: Parent6');
  this.name = 'Parent6'
  this.names = [1, 2, 3, 4, 5]
}
Parent6.prototype.getNames = function () {
  return this.names
}
function Child6() {
  this.testChild = 'Child6'
  this.getChildTest = function () {
    return this.testChild
  }
  Parent6.apply(this, arguments)
}
// Child6.prototype = new Parent6()
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
// Child6.prototype = object(Parent6.prototype)
function prototype(child, parent) {
  var prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}
prototype(Child6, Parent6)

let child6 = new Child6()
// console.log(child6.__proto__.constructor);
console.log(child6.__proto__ === Child6.prototype)
let _child6 = new Child6()
// child6.names.push(6)
// console.log(child6.getChildTest());
// console.log(child6.names);
// console.log(_child6.names);
