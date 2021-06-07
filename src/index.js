// js extends
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function prototype(child,parent) {
  var prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}








function Parent1() {
  // console.log('Parent1');
  this.name = 'parent1'
  this.arr = [1,2,3]
}
Parent1.prototype.name = 'pro_parent1'
Parent1.prototype.getName = function() {
  return this.name
}
function Child1() {
  // console.log('Child1');
}
prototype(Child1,Parent1)

var child1 = new Child1()
var parent1 = new Parent1()
console.log(child1.getName());


class Parent2 {
  static name = 'Parent2'
  constructor(){
    // console.log('Parent2');
  }
}
class Child2 extends Parent2{
  constructor(){
    super()
  }
}
var child2 = new Child2()
// console.log(child2);