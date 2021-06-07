/**
 * 实现柯里化函数
 */
 var person = [{name: 'kevin'}, {name: 'daisy'}]
//  var name = person.map(function (item) {
//      return item.name;
//  })
//  console.log(name);


var sub_curry = function (fn) {
  var args = Array.prototype.slice.call(arguments,1)
  return function() {
    var newArgs = args.concat(Array.prototype.slice.call(arguments))
    return fn.apply(this)
  }
}
function curry(fn, length) {
  length = length || fn.length
  var slice = Array.prototype.slice
  return function() {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments))
      return curry(sub_curry.apply(this,combined), length - arguments.length)
    }else{
      return fn.apply(this,arguments)
    }
  }
}
var fn = curry(function(a, b, c) {
  return [a, b, c];
});

console.log(fn("a", "b", "c")); // ["a", "b", "c"]
console.log(fn("a", "b")("c")); // ["a", "b", "c"]
console.log(fn("a")("b")("c")); // ["a", "b", "c"]
console.log(fn("a")("b", "c")); // ["a", "b", "c"]
// function add(a, b) {
//   return a + b;
// }
// var addCurry = curry(add, 1, 2);
// console.log(addCurry()); // 3
// //或者
// var addCurry = curry(add, 1);
// console.log(addCurry(2)); // 3
// //或者
// var addCurry = curry(add);
// console.log(addCurry(1, 2)); // 3

// var prop = curry(function (key,obj) {
//   console.log(key,obj);
//   return obj[key]
// })
// var name = person.map(prop('name'))