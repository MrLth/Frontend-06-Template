/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-13 22:48:13
 * @LastEditTime: 2020-12-13 23:26:53
 * @Description: file content
 */

const table = [...Array(10).fill(0).map((_, i) => String.fromCharCode(48 + i)), ...Array(26).fill(0).map((_, i) => String.fromCharCode(65 + i))]

const numberToString = (number, base = 10) => {
    let num = number < 0 ? -number : number
    let string = ''
    while (num) {
        string = [num % base] + string
        num = parseInt(num / base)
    }
    return number < 0 ? '-' + string : string
}

const stringToNumber = (string, base) => {
    let number = 0
    let sign = 1

    if (string[0] === '-') {
        string = string.slice(1)
        sign = -1
    }

    if (!base) {
        if (['0O', '0o'].find(v => string.startsWith(v))) {
            string = string.slice(2)
            base = 8
        } else if (['0X', '0x'].find(v => string.startsWith(v))) {
            string = string.slice(2)
            base = 16
        } else if (['0B', '0b'].find(v => string.startsWith(v))) {
            string = string.slice(2)
            base = 2
        }
    }

    for (let i = 0, len = string.length; i < len; i++) {
        const charCode = string[i].toUpperCase().charCodeAt()
        const n = charCode > 64 ? charCode - 55 : charCode - 48
        if (n >= base) throw new SyntaxError()
        number = number * base + n
    }

    return number * sign
}

console.log(stringToNumber('0X64'))
console.log(stringToNumber('0b1000'))
console.log(stringToNumber('0o64'))

console.log(numberToString(100, 16))