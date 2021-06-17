// /**
//  * 实现柯里化函数
//  */
//  var person = [{name: 'kevin'}, {name: 'daisy'}]
// //  var name = person.map(function (item) {
// //      return item.name;
// //  })
// //  console.log(name);


// var sub_curry = function (fn) {
//   var args = Array.prototype.slice.call(arguments,1)
//   return function() {
//     var newArgs = args.concat(Array.prototype.slice.call(arguments))
//     return fn.apply(this)
//   }
// }
// function curry(fn, length) {
//   length = length || fn.length
//   var slice = Array.prototype.slice
//   return function() {
//     if (arguments.length < length) {
//       var combined = [fn].concat(slice.call(arguments))
//       return curry(sub_curry.apply(this,combined), length - arguments.length)
//     }else{
//       return fn.apply(this,arguments)
//     }
//   }
// }
// var fn = curry(function(a, b, c) {
//   return [a, b, c];
// });

// console.log(fn("a", "b", "c")); // ["a", "b", "c"]
// console.log(fn("a", "b")("c")); // ["a", "b", "c"]
// console.log(fn("a")("b")("c")); // ["a", "b", "c"]
// console.log(fn("a")("b", "c")); // ["a", "b", "c"]

const curry = (fn, ...args) => 
  args.length >= fn.length ? 
  fn(...args) : 
  (..._args) => curry(fn, ...args, ..._args)

function _add() {
  return eval(Array.prototype.slice.call(arguments).join('+'))
}
// const add = curry(_add)
// console.log(add(2)(3)(4));
// console.log(add(1,2,3));
console.log(_add(1,3,4,5));