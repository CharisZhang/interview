function fn(a,b) {
  var a = 2
  // function a() {
  //   return 2
  // }
  console.log(a);
}
fn(3,4)


// function calc(num) {
//   let arr = []
//   if(num === 0 || num === 1 || num === 2){
//     arr.push(num)
//     return arr
//   }
//   for (let i = 2; i < num; i++) {
//     if(num%i === 0){
//       arr.push(i)
//     }
//   }
//   if(arr.length === 0){
//     arr = [num]
//   }
//   return arr
// }
// console.log(calc(13));



// // fn(arr, n, num) arr是一个数组，n 表示在这个数组中找出n个项，num表示在这n个项相加和为num
// function fn(arr, n, num){
//   for (let arr = 0; arr < array.length; arr++) {
//     const element = array[arr];
    
//   }
// }


// function getLength(arr) {
//   // let map = new Map()
//   let count = 0
//   let letter = ''
//   for (let i = 0; i < arr.length; i++) {
     
//   }
// }
// getLength([1,  1, '1', '1', '2', '2', 1, '2', '2', 4,  5,  6 ] )

// function fib(n) {
//   console.log(n);
//   if (n === 1 || n === 2) {
//     return 1
//   }
//   return fib(n - 1) + fib(n - 2)
// }
// console.log(fib(6))

// // var longestPalindrome = function (s) {
// //   // babad
// //   // tag : dp
// //   if (!s || s.length === 0) return ''
// //   let res = s[0]

// //   const dp = []

// //   // 倒着遍历简化操作， 这么做的原因是dp[i][..]依赖于dp[i + 1][..]
// //   for (let i = s.length - 1; i >= 0; i--) {
// //     dp[i] = []
// //     for (let j = i; j < s.length; j++) {
// //     console.log(dp);
// //     console.log(i,j);
// //     if (j - i === 0) {
// //         dp[i][j] = true
// //       }
// //       // specail case 1
// //       else if (j - i === 1 && s[i] === s[j]) {
// //         dp[i][j] = true
// //       }
// //       // specail case 2
// //       else if (s[i] === s[j] && dp[i + 1][j - 1]) {
// //         // state transition
// //         dp[i][j] = true
// //       }

// //       if (dp[i][j] && j - i + 1 > res.length) {
// //         // update res
// //         res = s.slice(i, j + 1)
// //       }
// //     }
// //   }

// //   return res
// // }

// // console.log(longestPalindrome('abcba'))
// // var isValid = function(s) {
// //   if(s.length%2 === 1) return false
// //   let arr = []

// // };
// // console.log(isValid('{[()]}'));

// var a = []
// function sum(num) {
//   // num = [2]
//   // num.push(2)
//   setTimeout(() => {
//     num.push(2)
//     console.log(a);
//   });
// }
// sum(a)
// console.log(a);
