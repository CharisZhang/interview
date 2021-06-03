/**
 * 实现instanceof
 */
 function _instanceof(obj, check) {
  if(!obj || typeof obj !== 'object') return false
  let objProto = obj.__proto__
  let checkPrototype = check.prototype
  while (true) {
    if (objProto === null) {
      return false
    }
    if(objProto === checkPrototype){
      return true
    }
    objProto = objProto.__proto__
  }
}
function Foo() {
  return 1
}
let foo = new Foo()
let obj = null
console.log(foo instanceof Foo);
console.log(_instanceof(foo,Foo));