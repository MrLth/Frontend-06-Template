# 参考

[https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90](https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子)

https://www.npmjs.com/package/puppeteer

https://eslint.org/docs/developer-guide/nodejs-api

https://developers.google.com/web/updates/2017/04/headless-chrome

# 发展历程

## 客户端

1. 各自开发<=>集成联调
2. 由客户端工程师提出「持续集成」概念后

1. 1. daily build
   2. build verfication test, BVT

1. 1. 1. 冒烟测试

## 前端

1. daily build <=> git hook
2. BVT <=> lint + 无头浏览器



# Git hook

1. 存放目录：`.git/hook`
2. 使用的 hook: 

1. 1. `pre-commit ` lint
   2. `pre-push` check
   3. `pre-receive`

1. 需要给这些 hook 添加执行权限

1. 1. `chmod +x ./pre-commit`

1. 给脚本指定语言

1. 1. `#!/usr/bin/env node`

1. 阻止提交

1. 1. `require('process').exitCode = 1`



# EsLint + Git hook

1. result 里的错误不算错误，导致无法阻止提交

1. 1. 通过 result.errorCount 手动阻止提交

1. 边界处理

```
修改 index.js 文件
ga.
再次修改 index.js 文件
gs
gcm 'xxx' // git 会提交第一次修改的版本，而 eslint 检查的是二次修改的版本
```

1. 1. 解决方案

1. 1. 1. `git stash push -k` *keep-index*
      2. `gcm 'xxxz'`
      3. `git stash pop`

1. 1. 在 git hook 里使用 `require('child_process')('git stash push -k')` 应用解决方案



# 无头浏览器

## chrome --headless

```
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
alias chrome-canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
alias chromium="/Applications/Chromium.app/Contents/MacOS/Chromium"

chrome-canary --headless --dump-dom about:blank
chrome-canary --headless --dump-dom about:blank > temp.txt
```

## puppeteer



# 毕业总结

​	20 周来学了不少东西，包括以下知识点：

1. week 20 | 发布系统 | 持续集成「GitHook, Puppeteer」
2. week 19 | 发布系统 | 部署 & 发布系统 & Github oAtuh
3. week 18 | 工具链 | 单元测试工具「mocha」
4. week 17 | 工具链 | 初始化构建工具「yeoman」
5. week 16 | 组件化 | 轮播图「支持手势, 自动轮播」
6. week 15 | 组件化 | 手势 & 时间线 & 动画
7. week 14 | 组件化 | Toy-React & 轮播图 & Raf & Attr/Prop
8. week 13 | HTML+API | 标记语言 & 标签 & DOM & CSSDOM & Data Uri & 标准化组织 & 网页爬虫
9. week 12 | CSS | 布局 & 盒子 & 颜色 & 贝塞尔曲线
10. week 11 | CSS | 选择器 & 选择器 & 伪类/伪元素 & 命名空间
11. week 10 | 浏览器工作原理 | 排版 & 渲染
12. week 09 | 浏览器工作原理 | HTML解析 & CSS计算
13. week 08 | 浏览器工作原理 | 有限状态机 & HTTP请求
14. week 07 | JavaScript | 表达式 & 语句 & 类型转换 & 任务调度 & 执行上下文
15. week 06 | JavaScript | 语言通识 & 类型 & 对象 & OOP
16. week 05 | 编程与算法训练 | Proxy双向绑定 & Range操作Dom
17. week 04 | 编程与算法训练 | 字典树 & KMP & Wildcard
18. week 03 | 编程与算法训练 | 使用 LL 算法构建四则运算的 AST
19. week 02 | 编程与算法训练 | 广度优先搜索 & 启发式搜索 & A*寻路
20. week 01 | 编程与算法训练 | TicTacToe & 异步编程

除了这些，以下能力也有不小的提升：

1. 对知识的记录和总结的能力
2. 各类工具与框架的工具原理的学习能力
3. 编译原理相关知识