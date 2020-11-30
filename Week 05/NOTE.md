# Porxy

**相比于 setter 和 getter 的优点**

1. 可以拦截对象原来没有的属性的写操作

**特点**

1. 不会拦截对原始对象的操作，只拦截对代理对象的操作

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy

# reactive 实现

**基本思路**

1. 代理对象的读操作，添加订阅，代理对象的写操作，发布更新，类似发布订阅模式

**精确更新**

​	思路：用一个数组保存回调里将会用到的 key

1. 回调触发前清空此数组
2. 触发回调
3. 代理对象的读操作，将用到的 key 添加进此数组
4. 仅对用到的 key 添加订阅，用 Map 实现
5. 对象进行写操作时，发布对应 key 的更新

> 1. 如果不使用 Map 可以尝试用对象实现，思路：修改对象的 toString 方法，只要能区分对象即可
> 2. 代码中订阅可能会重复添加，~~可以将保存回调函数的数组改为 Set~~
>    在保存回调函数的数组中做限制会忽略两个相同的 effect 的订阅，即使使用两个相同的 effect 可能无意义
>    最终限制收集依赖的数组就好了
> 3. 保存发布者上次的值，值没改变就不用发布更新了
> 4. 收集依赖的过程中可能会发布更新，导致收集到更多的依赖
>    暂时无法确定是否要忽略这些依赖，但不忽略会造成循环更新，最终导致栈溢出
> 5. 每次访问子对象时，都会返回新的子对象代理，使用 weakMap 保存
> 6. 对象或者对象属性销毁时，相关订阅应该取消掉。暂时还不知道应用场景，没思路实现

# Range

​	range 可以很方便地操作文本节点 ( nodeType : 3 )，另外 Selection Api  返回的也是一个 range

```typescript
document.getSelection().getRangeAt(0).toString()
dom.onselectstart
```

​	https://developer.mozilla.org/en-US/docs/Web/API/Range

​	https://developer.mozilla.org/en-US/docs/Web/API/Selection_API

# 易忽略知识点

1. 对于 Dom 节点的插入，如果插入的元素已经在 Dom Tree 上存在，则会将此节点从原来的位置删除，再插入到指定位置。这一过程类似于移动
2. 可以使用 Selection Api 的 selectstart 事件配合 preventDefault 实现禁止文本选择的功能，类似于 CSS 中的 user-select:none