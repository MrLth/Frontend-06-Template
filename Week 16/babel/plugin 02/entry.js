/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-29 14:55:40
 * @LastEditTime: 2020-12-29 14:56:33
 * @Description: file content
 */
if (process.env.NODE_ENV === 'production') {
    console.log(1)
}

console.log(process.env.NODE_ENV)

function test() {
    if (process.env.NODE_ENV === 'production') {
        console.log(2)
    }
}