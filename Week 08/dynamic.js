/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-18 10:04:40
 * @LastEditTime: 2020-12-18 17:02:50
 * @Description: file content
 */

/**
 * @param {string} pattern
 * @return {number[]}
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

/**
 * @param {number[]} nextTable
 * @return {[start:function,end:function]}
 */
function stateMachine(pattern) {
    // 1. 生成 nextTable
    const table = nextTable(pattern)
    console.log("nextTable", table)
    // 2. 根据 nextTable 生成状态机
    const fnTable = [], len = table.length
    fnTable[0] = c => c === pattern[0] ? fnTable[1] : fnTable[0] // start function
    for (let i = 1; i < len; i++) {
        fnTable[i] = (c => c === pattern[i] ? fnTable[i + 1] : fnTable[table[i]](c))
    }
    fnTable[len] = () => fnTable[len]   // end function
    // 3. 返回状态机的 start function 和 end function
    return [fnTable[0], fnTable[len]]
}

function kmp(source, pattern) {
    let [next, end] = stateMachine(pattern)
    for (const c of source) {
        next = next(c)
    }
    return next === end
}


console.log(kmp('aabaabaabaacc', 'aabaac'))