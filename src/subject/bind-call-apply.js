/**
 * 实现call,apply,bind
 */



// bar.apply(foo, ['name', 18])
//  1. 将函数设为对象的属性
//  2. 执行该函数
//  3. 删除该函数
//  foo.fn = bar
//  foo.fn()
//  delete foo.fn
/**
 * call
 */
Function.prototype.call2 = function (context) {
  var context = context || window
  context.fn = this
  var args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
/**
 * apply
 */
Function.prototype.apply2 = function (context, arr) {
  var context = context || window
  context.fn = this
  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for (let i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }
  delete context.fn
  return result
}
// bar.apply2(foo, ['name', 18])
/**
 * bind
 */
// var bindFoo = bar.bind(foo,'name')
// bindFoo(18)
let foo = { value: 1 }
function bar(name, age) {
  this.habit = 'shopping'
  console.log(this.value)
  console.log(name)
  console.log(age)
}
bar.prototype.friend = 'kevin'
// Function.prototype.bind2 = function (context) {
//   var self = this
//   var args = Array.prototype.slice.call(arguments, 1)

//   var fBound = function () {
//     var bindArgs = Array.prototype.slice.call(arguments)
//     console.log(this.__protp__);
//     return self.apply(
//       this instanceof fBound ? this : context,
//       args.concat(bindArgs)
//     )
//   }
//   fBound.prototype = this.prototype
//   return fBound
// }
Function.prototype.bind2 = function(context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var self = this
  var args = Array.prototype.slice.call(arguments,1)
  var fNOP = function() { }
  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fBound ? this : context,args.concat(bindArgs))
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}




var bindFoo = bar.bind2(foo, 'name')
// bindFoo(18)
var obj = new bindFoo('18')
console.log(obj.habit)
console.log(obj.friend)
