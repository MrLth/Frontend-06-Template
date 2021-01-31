目前已知的情报

1. requestAnimationFrame 添加的回调的执行时机
   1. 当前帧至下一帧之间，且每次都会清空在下一帧之前添加的所有 requestAnimationFrame 任务，而被递归调用的 requestAnimationFrame 生成的任务会在下下帧被执行
   2. 所有 requestAnimationFrame 任务都会在 Recalulate Style 和 Upadate Layer Tree 以及 Composite Layers 之前被执行

技巧

1. 使数组下标支持倒数第 n 个元素，n = (input + arr.length) % arr.length

最新情报

1. 位运算的优先级比普通运算符更低，而不是和乘除类似
   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

2. ```typescript
   const x = 0.4
   parseInt(x)   // 0
   x | 0         // 0
   Math.floor(x) // 0
   Math.ceil(x)  // 1
   Math.round(x) // 0
   
   // 负数
   const x = -0.4
   parseInt(x)   // -0
   x | 0         // 0
   -1.4 | 0      // -1
   Math.floor(x) // -1
   Math.ceil(x)  // -0
   Math.round(x) // -0
   Math.round(-0.50) // -0
   Math.round(-0.51) // -1
   
   // 辅助记忆
   位运算大概精度 32 位，每 10 位二进制位表示 1024，即 1024*1024*1024，简单记为 1000**3，即 32 位二进制位描述十进制的精度大概在 1000**(32/10) == 1E9 左右
   
   ```

   