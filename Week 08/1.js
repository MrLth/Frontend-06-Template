/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-18 09:25:07
 * @LastEditTime: 2020-12-18 11:02:00
 * @Description: file content
 */

const nextTable = (pattern) => {
    const table = Array(pattern.length).fill(0)

    {
        let i = 1, j = 0
        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++i, ++j
                table[i] = j
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    ++i
                }
            }
        }
    }

    return table
}


function a1(c){
    if (c=== 'a'){
        return b1
    }else{
        return a1
    }
}

function b1(c){
    if (c==='b'){
        return a2
    }else{
        return a1
    }
}

function a2(c){
    if (c==='a'){
        return b2
    }else{
        return a1(c)
    }
}

function b2(c){
    if (c==='b'){
        return a3
    }else{
        return b1(c)
    }
}

function a3(c){
    if (c==='a'){
        return b3
    }else{
        return a2(c)
    }
}

function b3(c){
    if (c==='b'){
        return x
    }else{
        return b2(c)
    }
}

function x(c){
    if (c==='x'){
        return end
    }else{
        return a3(c)
    }
}

function end(){
    return end
}


function find(source){
    let t = a1
    for (const c of source){
        t = t(c)
    }
    return t === end
}

// console.log(nextTable('abababx'))

console.log(find('ababxbxababax1232'))