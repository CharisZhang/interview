/**
 * generator函数自执行器
 */
//  function* example() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// var iter=example();
// console.log(iter.next());;//{value:1，done:false}
// console.log(iter.next());;//{value:2，done:false}
// console.log(iter.next());;//{value:3，done:false}
// console.log(iter.next());;//
var marked0$0 = [example].map(regeneratorRuntime.mark);
function example() {
  return regeneratorRuntime.wrap(function example$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return 1;
 
      case 2:
        context$1$0.next = 4;
        return 2;
 
      case 4:
        context$1$0.next = 6;
        return 3;
 
      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}
var iter = example();
iter.next();
runtime.mark = function(genFun) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
  } else {
    genFun.__proto__ = GeneratorFunctionPrototype;
  }
  genFun.prototype = Object.create(Gp);
  return genFun;
};