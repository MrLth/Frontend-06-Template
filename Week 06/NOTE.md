

# Number

## 取值

### 可取值数量

​	18437736874454810627(即 2^64-2^53+3)

### 可取值范围

- `Number.MAX_SAFE_INTEGER`: `9007199254740991 (2^53 - 1)` 
- `Number.MIN_SAFE_INTEGER`: `-9007199254740991`
- `Number.MAX_VALUE`: `1.7976931348623157e+308`
- `Number.MIN_VALUE`: `-1.7976931348623157e+308`

### 最小精度值

- `Number.EPSILON` : `2.220446049250313e-16`

###  在使用IEEE 754 - 2008 规定的双精度浮点数规则基础上，引用以下三个值解决除以0出错：

- **NaN**;  据说占用`9007199254740990 (2^53 - 2)`，但验证失败
- **Infinity**；无穷大
- **-Infinity**; 负无穷大

## +0 与 -0

### 区分方式 

```typescript
1/x // 返回finity为+0，-finity为-0 
```

## IEEE 754双精度浮点数的存储

**双精度浮点数在内存中以「科学计数法」存储，使用64位字节：1符号位+11指数位+52尾数位**

> 科学计数法：`12345.6`以`1.23456e4`表示，`0.000123`以`1.23e-4`表示

### IEEE 754如何表示一个实数

- 每个实数都有一个相反数
  符号位改变下就是一个相反数，但是0的相反数就是自己，在IEEE 754下有+0和-0

- 指数可以负数

  1. 为指数部分也设置一个符号位

  2. 设置一个偏移量，使指数部分永远表现为一个非负数。计算时减去偏移量得到真实的指数

     偏移量的设置： 1023  ` 2^(11-1) - 1`, 11为指数位数

     指数存储值: 0 至 2047 

     指数实际值: 指数存储值 - 1023

     指数取值范围：-1023 至 1024

- 规格化：`1.01010101e2`，这个1默认存在，但不占用存储位

- 非规格化：`0.01e-1023`, 指数为最小值`-1023`了，小数点前也无法做到`1`

### 为什么尾数位只有52位却可以表示2^53个安全的整数？

​		前面有说，所有数字最后都以**「科学计数法」**存储，即`1.xxxxeyyy`的形式的存储，其中`xxxx`就保存在52个尾数位中，小数点前有且只有一个数字`1`，如果不是`1`，就`指数-1`，小数点向右移，直到小数点前为`1`，既然都为`1`，所以省略掉就好了。

​		简单的说，就是`指数位`的作用。

## 精度丢失

### 十进制转二进制时丢失

​		`0.1 0.2 0.4 0.8` 在十进制转二进制时都是无限循环的小数，但是只有52位的有效域，所以会出现`舍入`,`IEEE754`默认舍入到最接近的值，如果`舍`和`入`一样接近，那么取结果为偶数的选择

```typescript
0.1 * 2 = 0.2 ... 0
0.2 * 2 = 0.4 ... 0
0.4 * 2 = 0.8 ... 0 
0.8 * 2 = 1.6 ... 1
0.6 * 2 = 1.2 ... 1
0.2 * 2 = 0.4 ... 0
0.4 * 2 = 0.8 ... 0
0.8 * 2 = 1.6 ... 1
0.6 * 2 = 1.2 ... 1
...
0.1n10 => 0.00011001100110011...n2 => 1.1001100110011001100110011001100110011001100110011010e-4 // 精度丢失
```

### 参与运算时发生对阶导致丢失

​		**对阶**：以加法为例，把小的指数域转化为大的指数域，也就是左移小数点，一旦小数点左移，必然会把52位最右位挤出去，挤出去时会发生**`舍入`**

```typescript
10**-7 // 0.0000001 以1结尾，无限循环小数，精度丢失
// 1.1010110101111111001010011010101111001010111101001000e-24
10**-6 // 0.000001	以1结尾，无限循环小数，精度丢失
// 1.0000110001101111011110100000101101011110110110001101e-20
10**10 // 10000000000 精度不会丢失
// 1.0010101000000101111100100000000000000000000000000000e33

10**10 + 10*-6 == 10**10 // falsel; e-20和e33发生对阶，相差53位，指数小的需要向左移53位，虽然大于52位，但是小数前的1不参数存储的，所以不会全丢弃, 所以变成了
0.0000000000000000000000000000000000000000000000000001e33 +
1.0010101000000101111100100000000000000000000000000000e33 =
1.0010101000000101111100100000000000000000000000000001e33 

10**10 + 10*-7 == 10**10 // true; e-24和e33发生对阶，相差57位，指数小的需要向左移57位, 毫无疑问所有数字已经全丢弃了
0.0000000000000000000000000000000000000000000000000000e33 +
1.0010101000000101111100100000000000000000000000000000e33 =
1.0010101000000101111100100000000000000000000000000000e33 
```

### 数值数量级与精确度数量级的关系

​		在`IEEE754 64位双精度`的表示下，如果一个数的数量级在`10**X`，其精确度在`10**Y`，那么`X`和`Y`大致满足：

```typescript
X-16=Y

// 已知0.1是10**-1数量级，那么精确度在10^-17左右
0.10000000000000000 ==
0.10000000000000001 // true
0.1000000000000000 ==
0.1000000000000001 // false  
```



### 0.1输出时未出现精度丢失

​	0.1在存储时会将十进制转为二进制，会出现舍入

​	0.1在输出时会将二进制转为十进制，再由十进制转为字符串，也会出现舍入

### 实际运算时以存储的64bit为准

### [使用工具查看IEEE754的存储](https://babbage.cs.qc.cuny.edu/IEEE-754.old/Decimal.html)

## 解决精度丢失

### 思路

**将小数转为整数，在整数范围内计算结果**

### 注意点

- 整数超过一定值也会出现精度丢失，安全值在`-2^53-1至2^53-1`之内 

## Number.prototype.toFixed

​		使用定点表示法来格式化一个数值。

​		支持一个可选参数**digits**：小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。

​		一个数值的字符串表现形式，不使用指数记数法，而是在小数点后有 digits（注：digits具体值取决于传入参数）位数字。该数值在必要时进行四舍五入，另外在必要时会用 0 来填充小数部分，以便小数部分有指定的位数。 如果数值大于 1e+21，该方法会简单调用 [`Number.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)并返回一个指数记数法格式的字符串。

### 解决方案

```typescript
//注意要传入两个小数的字符串表示，不然在小数转成二进制浮点数的过程中精度就已经损失了
function numAdd(num1/*:String*/, num2/*:String*/) { 
    var baseNum, baseNum1, baseNum2; 
    try { 
        //取得第一个操作数小数点后有几位数字，注意这里的num1是字符串形式的
        baseNum1 = num1.split(".")[1].length; 
    } catch (e) {
        //没有小数点就设为0 
        baseNum1 = 0; 
    } 
    try { 
        //取得第二个操作数小数点后有几位数字
        baseNum2 = num2.split(".")[1].length; 
    } catch (e) { 
        baseNum2 = 0;
    }
    //计算需要 乘上多少数量级 才能把小数转化为整数 
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2)); 
    //把两个操作数先乘上计算所得数量级转化为整数再计算，结果再除以这个数量级转回小数
    
  	return (num1 * baseNum + num2 * baseNum) / baseNum; // 🔺
  	// 最后返回时，传入的字符串直接参与运算了，被隐式转换为了`number`，导致精度丢失
  	return (num1*baseNum + num2*baseNum).toFixed(0) / baseName;
  	// 虽然toFixed会进入四舍五入，但是四舍五入前值的差距只有+-0.000000001，我们明确地知道分子是一个整数，所以			 舍入后也不会造成影响
};
```

# Object

​	由三个核心要素组成

1. identifer
   唯一标识
2. state
3. behavior
   改变自身 state 的行为，**在设计对象的状态和行为时，应遵循“行为改变状态”的原则**

# 描述对象的方式

## 1. class 类

### 1.1 归类

​	一个对象可以归为多个类（多继承）

### 1.2 分类

​	单继承，从顶层 Object 一层一层向下分，每个对象仅有一个归属

## 2. Prototype 原型

​	任何对象只需要描述自己和原型的区别即可，更符合人类原始认识

# Js 中一些具有特殊行为的对象

1. Function 的 [[call]]
2. Symbol.toStringTag | [[class]] 
3. arguments 参数绑定
4. Object.prototype 为 null 且无法更改
5. Array 的 length
6. 类型数组和数组缓冲区， 特殊的下标运算机制
7. bind 后的 function