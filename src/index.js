// function Company() {
//   var instance = {
//     name: 'a1',
//     getName() {
//       console.log(this.name);
//     },
//     getName1: () => {
//       console.log(this.name);
//     }
//   };
//   this.name = 'a2';
//   this.getName2 = function () {
//     console.log(this.name);
//   }
//   return instance;
// }
// Company.prototype.name = 'a3';
// var company1 = new Company();
// console.log(company1);
// company1.getName();
// company1.getName1();
// company1.getName2();
setTimeout(function () {
  console.log("6");
}, 0);
console.log("1");
async function async1() {
  console.log("2");
  await async2();
  console.log("3");
}
async function async2() {
  console.log("5");
}
// async1();
console.log("4");
