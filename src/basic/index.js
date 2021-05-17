// const json = require('./index.json')
// import('./index.css')
// console.log(json,add(2+3));
// import { add } from "./other";

/**
 * @param {string} s
 * @return {number}
 */
//  var lengthOfLongestSubstring = function(s) {
//   let set = new Set()
//   let str = ''
//   for(let i = 0;i<s.length;i++){
//       let letter = s.charAt(i)
//       if(set.has(letter)){
//           let strnow = [...set.values()].join('')
//           if(str.length<strnow.length){
//               str = strnow
//           }
//           set.clear()
//       }
//       set.add(letter)
//   }
//   str = [...set.values()].join('')
  
//   return str.length
// };
// function lengthOfLongestSubstring(s) {
//   const set = new Set()
//   const n = s.length
//   let rk = -1, ans = 0
//   for (let i = 0; i < n; i++) {
//     const element = n[i];
    
//   }
// }
// var lengthOfLongestSubstring = function(s) {
//   // 哈希集合，记录每个字符是否出现过
//   const occ = new Set();
//   const n = s.length;
//   // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
//   let rk = -1, ans = 0;
//   for (let i = 0; i < n; ++i) {
//       if (i != 0) {
//           // 左指针向右移动一格，移除一个字符
//           occ.delete(s.charAt(i - 1));
//       }
//       while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
//           // 不断地移动右指针
//           occ.add(s.charAt(rk + 1));
//           ++rk;
//       }
//       // 第 i 到 rk 个字符是一个极长的无重复字符子串
//       ans = Math.max(ans, rk - i + 1);
//   }
//   return ans;
// };
// var lengthOfLongestSubstring = function(s) {
//   const set = new Set()
//   const n = s.length
//   let index = -1,ret = 0
//   for (let i = 0;i<n;i++){
//       if(i!=0){
//           // set.delete([...set][0])
//           set.delete(s[i-1])
//       }
//       while(index + 1<n&&!set.has(s.charAt(index+1))){
//           set.add(s.charAt(index+1))
//           ++index 
//       }
//       ret = Math.max(ret,index-i+1)
//   }
//   return ret
// };
// console.log(lengthOfLongestSubstring('pwwkew'));

// let s = new Set()
// s.add(1)
// s.add(2)
// s.add(2)
// s.add(2)
// s.add(2)
// s.add(2)
// s.add(3)
// s.add(4)
// console.log([...s][0]) //1,2,3
// console.log(s[0]) //1,2,3

// for(let item of s){
//   console.log(item) //1,2,3
// }

let arr = [1,3,3,4,5,6]
console.log(Math.max(...arr));