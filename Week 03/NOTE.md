# 正则表达式 

1. **`g`** 和  **`regExpObj.lastIndex`**

   - 只有对 regExpObj 设置 g 时，lastIndex 属性才有效，否则 lastIndex 始终为 0。
   - lastIndex 不是只读的，更改它的值可以改变 regExpObj 的下次正则匹配的起始位置
   - 匹配失败时，lastIndedx 也将为 0

   ```typescript
   const reg = /abc/g
   reg.exec('123abc') // ['abc'...]
   reg.lastIndex // 6
   reg.exec('abc123') // null
   reg.lastIndex // 0
   reg.exec('abc123') // ['abc'...]
   ```

2.  **`sticky`** 标志和 **`global`** 标志的不同点
   如果正则表达式有粘性 `y` 标志，下一次匹配一定在 `lastIndex` 位置开始；如果正则表达式有全局 `g` 标志，下一次匹配可能在 `lastIndex` 位置开始，也可能在这个位置的后面开始

3. 非标准属性，以后尽量不要使用

   ```typescript
   RegExp.$1-$9
   RegExp.lastMatch
   ```

4. `$1-$99` 使用先前的匹配

   ```typescript
   let re = /(\w+)\s(\w+)/;
   let str = "John Smith";
   let newstr = str.replace(re, "$2, $1");
   console.log(newstr); // "Smith John"
   ```

# Generator 配合 for of (iterator)

**相比直接返回数组的优点**

1. 生成器会按需计算它们的产生值，这使得它们能够有效的表示一个计算成本很高的序列，甚至是一个无限序列
2. 逻辑解耦

**基础用法**

```typescript
Object.prototype[Symbol.iterator] = function* (){
  for (const item of Object.entries(this)){
    yield item
  }
}

// for of
for (const [k,v] of {a:1,b:2}){
  ...
}
// ...
[...{a:1, b:2}] // [[a,1],[b,2]]

```

# 使用 LL 算法构建 AST

## 1. 名词解释

- **AST :** Abstract Syntax Tree 抽象语法树

- **LL(1) :**
  1. 第一个 L : left to righ 从左到右的顺序处理输入的 token 序列
  2. 第二个 L : leftmost derivation 从文法的最左边开始进行推导
  3. (1) : 向前探测 1 个 token 来预测解析的方向
- **BNF** 语法格式描述规范 [🐴 ](https://www.jianshu.com/p/15efcb0c06c8)

## 2. 构建 AST 步骤

1. 分词，即词法分析
2. 语法分析

## 3. 构建四则运算的 AST

### 3.1 产生式/语法格式描述

1. 终结符
   - 数字：n
   - 运算符（+、-、*、/）
   - ~~括号~~
2. 非终结符
   - 表达式：E
   - 项：T
   - 因子：F
3. 起始符号：S
4. 产生式

```typescript
S -> E

E -> E + T
E -> E - T
E -> T

T -> T * F
T -> T / F
T -> F

F -> n
// F -> (E)
```

<img src="https://s3.ax1x.com/2020/11/13/Dp1N0f.jpg" style="zoom:33%;" />

