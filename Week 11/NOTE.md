# 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢?

## 1. 性能上

​	first-letter 很好匹配，不需要更多信息，在开始标签结束时就可以完成匹配，和其它选择器表现一致，性能良好。

​	first-line 则不然，它需要知道父元素的第一个行框盒子，所以需要在父元素布局阶段之后才能完成匹配，和 :last-nth-child 一样，已经破坏了回溯原则。如果这时再改变布局就会导致父元素重新布局，得不偿失。

## 2. 表现上

​	fisrt-line 应用 float 本身没什么意义，应用 float 的节点会导致其之后的行内盒子环绕着它进行布局，而 first-line 本身就占满一行了，其之后的文本节点也必然会出现在第二行，也就是说就算 first-line 支持 float，表现上也不会有太大区别。

> 但是 first-line 支持 letter-space 之类同样会影响布局的属性，却不支持 margin 之类的盒子属性，所以以上解释只是个人理解，难以自洽
>
> TODO: 各种标准文档中也没找到详细解释，找到具体出处





![](https://ftp.bmp.ovh/imgs/2021/01/f62439ab1f1cf2fe.png)



## 选择器（Selector）

###  分类

- 1. 简单选择器

	- 1. ID选择器
	- 2. 类选择器、属性选择器、伪类选择器
	- 3. 标签选择器、伪元素选择器
	- 4. 组合选择器
	- 5. 通配选择器

- 2. 复合选择器

	- 例: div#id.class1.class2

	  标签选择器或者通配选择器必须写在开头

- 3. 复杂选择器

	- 1. 后代选择器
	- 2. 子选择器  >
	- 3. 弟弟选择器  ~
	- 4. 精确弟弟选择器  +

### 优先级

- [ A, B, C, D ]

	- A. 行内样式
	- B. ID选择器的次数
	- C. 类选择器、属性选择器、伪类选择器的次数
	- D. 标签选择器、伪元素选择器的次数

- 细节

	- 同级时次数多的优先使用，次数相同时按书写顺序后替前
	- !important 标记的属性总是最优先被使用
	- * 星号不参与优先级计算
	- 优先级最终会采用数字存储

	  [1,2,3,4]
	  S=1*N**3 + 2*N**2 + 3*N**1 + 4
	  老 IE N 取 255，所以会有一些 BUG，目前大部分浏览器选择 65536

### 伪类 & 伪元素

- 区别

	- 伪类表示元素的特殊状态
	- 伪元素指在文档特殊位置的一些元素
（不在Dom Tree中，但根据 Dom Tree 生成）

	  伪元素会在样式计算阶段（Dom Tree 和 CSSOM Tree 生成 Render Tree）由 UA 创建一个虚拟节点，如 <::first-line></::first-line>，所以将其当作标签理解就好

- 伪类

	- 链接

		- :any-link
		- :link
		- :visited

		  :visited 只能修改颜色等属性，这是为了不让 JS 获取到这一状态，避免隐私泄露
		  (故事：早期浏览器支持对 :visited 修改透明度，但被黑客利用了透明度渲染时间长的特点)

		- :hover
		- :active
		- :focus
		- :target

	- 树结构

		- :nth-child
		- :first-child
		- :empty
		- :only-child
		- :last-child
		- :nth-last-child

	- 逻辑型

		- :not

			- 优先级计算不按伪类，而是里面的选择器

		- :where
		- :has

- 伪元素

	- ::before
	- ::after
	- ::first-line

		- float 和 margin... ✅

		  以下为个人理解
		  	布局时机上的问题，在 Dom Tree 中，顺序相对靠后的节点的位置信息受其之前节点的位置信息影响。而 first-letter 作为第一个节点甚至可以在开始标签结束时匹配，且不会影响后续节点的布局，所以可以使用 float 和 margin 等布局属性（first-letter 只会匹配文本节点，所以其默认为行内元素，垂直方向的 margin 是失效的）
		  	而 first-line 是需要在布局阶段第一个 line-box 生成时才能完成匹配，如果这时再发生布局更改就需要再次进行布局计算，重新匹配第一个 line-box
		  	但 letter-spacing 也影响了布局，导致重新匹配 line-box ，这样就不好解释 margin 不能用了
		  	必要性：
		  	first-line 的宽度已经不可能再容下更多字符了，那么 float 的意义也就没有了

	- ::first-letter

		- float 和 margin... ❌
		- 注意匹配 'F 和 ::before 时的表现

### 命名空间，svg | a

HTML 中的命名空间
涉及：HTML、SVG、MathML
选择 svg 或者 MathML 里特定的元素，使用 svg|a 这种方式（因为 a 标签 会和 svg|a 发生冲突）（命名空间分隔符，在 HTML 里面是冒号，CSS 里面就是单竖线)
@namespace 声明，算是一个超冷的知识了，因为 html 和 svg 冲突的就一个 a

