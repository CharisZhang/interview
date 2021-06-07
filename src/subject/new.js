/**
 * 实现new
 */

// 例子
function Otaku (name, age) {
  this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

// var person = new Otaku('Kevin', '18');
var person = objectFactory(Otaku,'Kevin', '18')
// var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined

// person.sayYourName(); // I am Kevin




function objectFactory() {
  var obj = new Object()
  // 删除并返回第一项
  var Constructor = Array.prototype.shift.call(arguments)
  // 实例的 __proto__ 属性会指向构造函数的 prototype
  obj.__proto__ = Constructor.prototype
  // 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  var ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}