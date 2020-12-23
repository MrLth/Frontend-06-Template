/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-23 16:17:38
 * @LastEditTime: 2020-12-23 16:17:55
 * @Description: file content
 */
const a1 = c => c==='a' ? b1 : a1
const b1 = c => c==='b' ? c1 : a1
const c1  = c => c==='c' ? a2 : a1
const a2 = c => c==='a' ? b2 : a1
const b2 = c => c==='b' ? x  : b1(c)
const x  = c => c==='x' ? end: c1(c)
const end = ()=> end

const match = (string)=> {
  let next = a1
  for (let c of string){
    next = next(c)
  }
  return next === end
}

console.log(match('abcabx'))