/**
 * 手写继承 ES5 ES6
 */
// class Father {
//   constructor(){
//     this.a = 'a'
//     console.log('father');
//   }
// }
// class Child extends Father{
//   constructor(){
//     super()
//     this.b = 'b'
//     console.log('child');
//   }
// }
// let child = new Child()



function Parent(){
  this.name = ['aaa']
}
Parent.prototype.getName = function(){
  return this.name
}
function Child(){
  // 在子类的构造函数中执行父类的构造函数，并且为其绑定子类的this
  Parent.call(this)
}
// 让子类的原型对象指向父类的实例，找不到时候沿着原型链往上找
Child.prototype = new Parent()
Child.prototype.constructor = Child
let child1 = new Child()
child1.name[0] = 'bbb'
let child2 = new Child()
console.log(child1)
console.log(child2)
console.log(child2.getName())