### 参考链接

https://yeoman.io/

###  

### 工具

1. yeoman-generator

   

### 使用

1. 新建以 generator- 开头的目录， 比如 generator-vue，移动到新建的目录
2. 使用 npm link 为 generator 目录创建链接
3. 移动到要初始化的目录，使用 yo 选择并执行 generator



### babel-plugin-log

#### 原理

`$log(123) => console.log(...$log(123))`

#### 用法

```typescript
const para = { a: 1, b: 2 }

$log({ BookMark: 'BookMark', Tab: 'Tab' }, 'render', 1);
$log({ BookMark: 'BookMark', Tab: 'Tab' }, 'render');
$log({ BookMark: 'BookMark', Tab: 'Tab' });
$log('not object');
$log({ para })

$debug({
  title: `happy`,
  para: 'what',
  multi: {
    'para1': 'para1 value',
    'para2': 'para2 value'
  },
  color: 2,
});
```

#### 效果

[![6PmjmQ.png](https://s3.ax1x.com/2021/03/01/6PmjmQ.png)](https://imgtu.com/i/6PmjmQ)