# 1. 易混淆和遗忘知识点

## 1.1 in 和 hasOwnProperty 的区别

​	**in** 会寻找对象的不可访问属性和原型链上的属性，而 **hasOwnProperty** 不会

```typescript
for (let key in obj){
	if (Obj.hasOwnProperty(key)){
		...doSth
	}
}
// 与上种方式等价
for (let key of Object.keys(obj)){
	...doSth
}
```

## 1.2 new RegExp("[\\\\s\\\\S]") 转义符需要双反斜杠

​	使用字符串生成的正则表达式会被转义两次（字符串一次，正则一次），所以需要两次反斜杠

# 2. 常用技巧

1. 牢记对象存储的是引用，只需一个变量作为中转，就可以实现重复的操作

   ```typescript
   let node = this.root
   for (const c of word) {
       if (!node[c])
           node[c] = Object.create(null)
       node = node[c]
   }
   ```

2. 使用递归时，使用外部变量和参数传递信息

   - 外部变量：所有递归节点使用同一个，整个递归过程中需要频繁更改的参考值
   - 参数：每个递归节点都有，下次递归需要的参数依赖于上次递归传入的参数

   ```typescript
   most() {
       let max = 0
       let maxWord = null
       let visit = (node, word) => {
       	if (node[$] && node[$] > max) {
       		max = node[$]
       		maxWord = word
       	}
       	for (const c in node) {
       		visit(node[c], word + c)
       	}
       }
       visit(this.root, '')
       console.log(maxWord, max)
   }
   ```

# 3. 字符串分析算法

## 3.1 字典树

**使用场景**

1. 大量高重复字符串的存储与分析，如：
   - 1 亿个字符串中出现频率最高的前 50 个字符串
   - 多个字符串中值最小的字符串（基于字典序匹配，类似于 Array.prototype.sort 的默认排序）
2. 将多个数字经过前补位，找出最小最大值

**特点**

1. 两个字符串完全匹配
2. 先建树再操作，适合大量高重复字符串

## 3.2 KMP

​	KMP算法是三位学者在 **Brute-Force** 算法的基础上同时提出的模式匹配的改进算法。Brute-Force 算法在模式串中有多个字符和主串中的若干个连续字符比较都相等，但最后一个字符比较不相等时，主串的比较位置需要回退。KMP算法在上述情况下,主串位置不需要回退，从而可以大大提高效率。

**步骤**

1. 对模式串中的每一个字符寻找它之前的公共前后缀，得到 next 值，并将这些 next 值与对应的字符索引组合成一个表

   pattern:	abcdabc**<u>e</u>**

   前缀:		<u>abc</u>dabc**<u>e</u>**

   后缀:		abcd<u>abc</u>**<u>e</u>**

   next 值:    公共前后缀长度 + 1，也就是 4（如果字符串索引从 0 开始，就是 3）

   next 索引指向: abc**<u>d</u>**abc**<u>e</u>**

2. 根据 next 表对原串进行匹配，匹配时和 **Brute-Force** 算法类似，不同在于匹配到两者字符不等时，按 next 表对应的索引回退到指定位置，减少重复匹配

## 3.3 Wildcard

**实现思路**

1. *号先于 ？号处理
2. 最后一个 * 号尽量多匹配，前面的 * 号尽量少匹配
3. 无 * 号全字匹配
4. 第一个 * 号前的子串单独匹配（要求原串必须以此子串开头）
5. 最后一个 * 号后的子串单独匹配（最后一个 * 号尽量多匹配，但要求原串必须以此子串结尾）
6. 其余以 * 号分隔为子串，依次匹配
7. ? 号匹配跳过对比就行

## 3.4 正则

## 3.5 状态机

## 3.6 LL LR

 