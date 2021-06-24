function Company() {
  var instance = {
    name: 'a1',
    getName() {
      console.log(this.name);
    },
    getName1: () => {
      console.log(this.name);
    }
  };
  this.name = 'a2';
  this.getName2 = function () {
    console.log(this.name);
  }
  return instance;
}
Company.prototype.name = 'a3';
var company1 = new Company();
console.log(company1);
company1.getName();
company1.getName1();
company1.getName2();