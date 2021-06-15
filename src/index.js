let promise = new Promise((resolve, reject) => {
  let condition = true;
  if(condition) {
    resolve('data')
  } else {
    reject('error')
}
})
// .then((res)=>{
//   console.log(2,res);
// })
// console.log(promise);
let promise2 = promise.then((res)=>{
  console.log(1,res);
}).then((res)=>{
  console.log(2,res);
})