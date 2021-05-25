class Father {
  constructor(){
    this.a = 'a'
    console.log('father');
  }
  static classMethod(){
    console.log('staticMethod');
  }
}
let father = new Father()
class Child extends Father{
  constructor(){
    super()
    this.b = 'b'
    console.log('child');
  }
}
let child = new Child()
Father.classMethod()
Child.classMethod()