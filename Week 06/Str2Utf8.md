```typescript
const run = (str) => {
    const buffer = []
    for (const char of str) {
        const code = char.codePointAt(0)
        // 1 Byte 块的访问概率更大，应该写在最前面，以下仅为方便理解
        if (code >= 0x00010000) { // 4 Byte
            buffer.push(
                code >> 18 & 0b00000111 | 0b11110000,
                code >> 12 & 0b00111111 | 0b10000000,
                code >> 6  & 0b00111111 | 0b10000000,
                code       & 0b00111111 | 0b10000000
            )
        } else if (code >= 0x00000800) { // 3 Byte
            buffer.push(
                code >> 12 & 0b00001111 | 0b11100000,
                code >> 6  & 0b00111111 | 0b10000000,
                code       & 0b00111111 | 0b10000000
            )
        } else if (code >= 0x00000080) { // 2 Byte
            buffer.push(
                code >> 6  & 0b00011111 | 0b11000000,
                code       & 0b00111111 | 0b10000000
            )
        } else { // 1 Byte AscII
            buffer.push(code)
        }
    }
    console.log(buffer.map(v => v.toString(2)))
    return Uint8Array.from(buffer).buffer
}
```

https://es6.ruanyifeng.com/#docs/string P50
https://es6.ruanyifeng.com/#docs/arraybuffer P521

[![DjjjPS.png](https://s3.ax1x.com/2020/12/06/DjjjPS.png)](https://imgchr.com/i/DjjjPS)