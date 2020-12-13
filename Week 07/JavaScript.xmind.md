# JavaScript

## 编译时

### 执行上下文（Execution context）

- 分类

	- 全局执行上下文
	- 函数执行上下文
	- Eval 执行上下文

- 组成

	- Viriable Environment

	  var 和 function 声明的变量会在预处理阶段提升到函数执行上下文的变量环境中

		- var、function 

	- Lexical Environment

		- Outer Reference
		- Environment Record

			- var、function 
			- let、const、class 
			- this、arguments、super、new.target

	- ThisBinding
	- code evaluation state

	  用于 async 和 generator function

	- function

	  function object => function object
	  script / module => null

	- Realm

	  Realm 应该是类似于闭包的一个概念，简单说就是将函数要用到的所有东西都装好带上，这样函数在任何地方任何时候都可以被执行

	- script or module

	  script  object => script  object
	  module object => module object
	  other => null

	- Generator

### Environment Records (抽象类)

- Declarative Environment Records

  FunctionDeclarations
  VariableDeclarations
  Catch clauses 
  将标识符绑定和 ECMAScript 值关联起来

	- Function Environment Records
	- Module Environment Records

- Global Environment Records

  [[OuterEnv]] is null.

- Object Environment Reocrds

  WithStatement
  将标识符绑定与某个对象的属性关联起来

### 调用栈（执行上下文栈）

### 闭包 （closure）

- 闭包就是 Lexical Environment？
- 每个函数都会生成一个闭包
- 箭头函数指向的闭包会默认保存一个 this

### 作用域链，ES3.0 的概念，如今已不太适用

### 预处理

- 嵌套函数的闭包创建
- 声明提升（Hoisting）

	- function 声明提升并赋值
	- var 声明提升但不赋值（undefined）
	- 有条件的 funcion 声明只提升不赋值（undefined）
😒不同浏览器表现不同

- let、const、class 暂时性死区

## Grammar

### Syntax

- 1. Atom
- 2. Expression
- 3. Statement

	- 简单语句

	  不允许再容纳其它语句的语句为简单语句

		- 1. ExpressionStatement
		- 2. EmptyStatement
		- 3. DebuggerStatement
		- 4. ThrowStatement
		- 5. ContinueStatement
		- 6. BreakStatement
		- 7. ReturnStatement

	- 复合语句

		- 1. BlockStatement

		  {
		      [[type]]: normal,
		      [[value]]: unkown,
		      [[label]]: null
		    }

		- 2. IfStatement
		- 3. SwitchStatement

		  不同于 C++ 和 C，在 JavaScript 中性能和多条 if-else 一致

		- 4. IterationStatement

		  for
		  for in
		  for of
		  for await of
		  while
		  do...while

			- for 语句配合 let/const 会生成两个作用域

			  for 语句可以使用 var、let、const 声明变量，let/const 和 for 内部的循环体各自使用一个作用域，let/const 在上层

		- 5. LabelledStatement
		- 6. TryStatement

			- try 语句的 {} 不可省略

			  try...catch...finally
			  TryStatement 中由花括号括起来的语句块并不是 EmptyStatement，而是由 tryStatement 自己定义的。所以 {} 不可省略

			- catch 会创建一个 Declarative Environment Record
			- finally 语句块会在 return 后继续执行

		- 7. WithStatement

	- 声明

		- 1. FunctionDeclaration
		- 2. GeneratorDeclaration
		- 3. AsyncFunctionDeclaration
		- 4. AsyncGeneratorDeclaration
		- 5. VariableStatement
		- 6. ClassDeclaration
		- 7. LexicalDeclaration

	- 语句值

- 4. Structure
- 5. Program

## Runtime

### 执行粒度

- 宏任务

	- 将一段代码交给 JavaScript Engine 处理，引擎会生成若干 MicroTask(Job) 并执行，这一过程就是一个宏任务

- 微任务（Promise）
- 函数调用（Excution Context）
- 语句/声明（Completion Record）
- 表达式（Reference）
- 直接量/变量/this ...

### 事件循环

- 由宿主环境实现？

### 函数调用

### Type

- 1. Number
- 2. String
- 3. Boolean
- 4. null
- 5. undefined
- 6. Object
    Function
    Array
- 7. Symbol
- 内部类型

	- 8. Reference
	- 9. Completion Record，存储语句的完成结果
    {
        [[type]]: normal | break | continue | return | throw,
        [[value]]: any,
        [[label]]: label
    }

## 最佳实践

### {} 配合 let/const/class 分离业务逻辑

