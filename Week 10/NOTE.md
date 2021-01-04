# Render 

## 思路

1. 样式计算 2，对 computedStyle 进行处理，处理为方便运算的实际样式值。
2. 构造布局树，根据布局方式为元素生成 top、left、height、width 位置信息
3. 绘制，遍历所有节点根据元素的位置信息进行绘制

# 时机

1. 样式计算，TagStartEnd，保证元素属性已添加，涉及行内样式
2. 布局计算，TagEnd，保证子元素已完成布局，元素宽高没指定时，元素由子元素撑开

# 排版方式

1. 正常流（display、position、float）
2. flex
3. grid
4. Houdini

# flex 布局

1. flex-direction

2. justify-content

3. align-item / align-self，**成员**在当前**行内**的对齐方式

   `remain = Math.max( ...items.map(v => v.height) ) - item.height `

4. align-content = stretch，定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

   `remain = container.height - items.reduce( (a,c) => (a + c.heihgt), 0 )`

****

1. order
2. flex-grow = 0
3. flex-shrink = 1
4. flex-basis = auto

## 技巧

​	flex-direction 为不同值时，参与计算的位置和定位属性不同，但布局的思路一致，使用变量统一处理



# 技巧

1. 使用 array.some 代替 array.forEach 实现 break

   ```typescript
   const arr = Array.from({length:100000}).map((_,i)=>i+1)
   // 没有 i
   for (const item of arr){
       if (item > 50000)
           break
   }
   
   // arr.find 或者 arr.every 也可，但语义都变差了
   arr.some((item,i)=>{
       if (item > 50000)
           return true
   })
   ```

   