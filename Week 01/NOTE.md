# TicTacToe

1. 数据结构
   3x3的二维数组存放

2. 棋盘显示
   通过`document.createElement`创建节点

3. 棋盘状态表示
   - 0 无
   - 1 白棋
   - 2 黑棋
4. 对战状态切换
   `3 - color`
5. 胜负判断
   行、列、正斜、反斜
6. **wilWin**
   循环遍历所有空落点，进行胜负判断
7. Ai感知胜负
   循环遍历所有空落点，带入角色，进行胜负判断

  # 性能优化

1. 二维数组变一维数组

   ```typescript
   arr[i][j] === arr1[i*colCount+j]
   ```

2.  使用`Object.create()`实现`clone`
   好处是对于只读的对象来说，可以节省很大一笔内存开销
   缺点是无法很好的实现遍历，并且克隆层级过多时，读取时性能开销也会增大

   ```typescript
   // 注意， 对象原型对于对象是只读的，无法直接通过属性索引的方式修改
   const obj = {a:1,b:2}
   const a = Object.create(obj)
   a.a // 1
   a // {}
   a.a = 2 // 2
   a // {a:2}
   obj // {a:1, b:2}
   ```

   

# 异步编程

## Callback

```typescript
// 回调地狱 callback hell
function go(){
	green()
	setTimeout(()=>{
		yellow()
		setTimeout(()=>{
			red()
			setTimeout(()=>{
				go()
			}, 10000)
		}, 5000)
	}, 2000)
}
go()
```

## Promise

```typescript
const sleep = (delay)=> new Promise(resolve=> setTimeout(resolve, delay))

function go(){
    green()
    sleep(2000).then(()=>{
         yellow()
		return sleep(5000)
    }).then(()=>{
         red()
		return sleep(10000)
    }).then(go)
}
go()
```

## Async

```typescript
async function go(){
    while (true){
        green()
        await sleep(2000)
        yellow()
        await sleep(5000)
        red()
        await sleep(10000)
    }
}
go()
```

## Generator

```typescript
function* go(){
    while (true){
        green()
        yield sleep(2000)
        yellow()
        yield sleep(5000)
        red()
        yield sleep(10000)
    }
}

function run(iterator){
    let {v, done} = iterator.next()
    if (done)
        return
    if (value instanceof Promise)
        value.then(()=>{run(iterator)})
}

function co(generator){
    return function (){
        return run(generator())
    }
}

go = co(go)
go()
```

# async generator

```typescript
async function* counter(){
    let count = 0
	while(true){
        await sleep(1000)
        yield count++
    }
}

async function go(){
	for await (const v of counter()){
        console.log(v)
    }
}

go()
```

