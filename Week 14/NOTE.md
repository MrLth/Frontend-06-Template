# 目前已知的情报

1. requestAnimationFrame 添加的回调的执行时机
   1. 当前帧至下一帧之间，且每次都会清空在下一帧之前添加的所有 requestAnimationFrame 任务，而被递归调用的 requestAnimationFrame 所生成的任务会在下下帧被执行
   2. 所有 requestAnimationFrame 任务都会在 Recalulate Style 和 Upadate Layer Tree 以及 Composite Layers 之前被执行
2. mousedown，mousemove，mouseup  事件的事件处理回调在执行前都会执行一次 Upadate Layer Tree 任务，与回调内是否有读写样式无关。
3. 如果在事件回调函数中进行写样式，就会在回调执行完毕后，在同一宏任务内完成一次 Recalulate Style 和 Upadate Layer Tree 以及 Composite Layers 三连。而定时器任务的写样式的三连不在同一宏任务内
4. 在 chrome中，mousemove 16.8ms 执行一次，这和 requestAnimationFrame 很相似

# 技巧

1. 使数组下标支持倒数第 n 个元素，n = (input + arr.length) % arr.length，但当 input < - arr.length 时就会出现下标越界

# 最新情报

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
   ```
   

# 辅助记忆
位运算大概精度 32 位，每 10 位二进制位表示 1024，即 1024\*1024\*1024，简单记为 1000\**3，即10亿这个量级，`2**31 = 2147483648`

[![ye0z7R.png](https://s3.ax1x.com/2021/02/01/ye0z7R.png)](https://imgchr.com/i/ye0z7R)