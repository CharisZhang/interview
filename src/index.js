// js extends
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function prototype(child, parent) {
  var prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

function Parent() {
  this.name = 'parent'
  this.arr = [1,2,3]
}
Parent.prototype.getName = function() {
  return this.name
}
function Child() {
  
}
prototype(Child,Parent)
var child = new Child()