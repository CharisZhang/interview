import { arguments, arguments } from "file-loader"

/**
 * 实现call,apply,bind
 */
let foo = { value: 1 }
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
  return [name,age]
}
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
    args.push('arguments[' + i + ']');
  }
  var result = eval('context.fn('+args+')')
  delete context.fn
  return result
}
/**
 * apply
 */
Function.prototype.apply2 = function(context, arr){
  var context = context || window
  context.fn = this
  var result
  if(!arr){
      result = context.fn()
  }else{
      var args = []
      for(let i = 0; i<arr.length;i++){
          args.push('arr['+i+']')    
      }
      result = eval('context.fn('+args+')')
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
Function.prototype.bind2 = function(context) {
  var self = this
  var args = Array.prototype.slice.call(arguments,1)
  return function() {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(context)
  }
}
var bindFoo = bar.bind2(foo)
bindFoo('name',18)