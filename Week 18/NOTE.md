# 单元测试

1. mocha 不支持 ESModule，使用的是 CommonJS 模块标准
2. 要想让 mocha 支持 ESModule，有两种方式
   1. build 后在 dist 里 test，但有些问题：
      1. 将 test 放置在 build 之后会比较慢
      2. 不利于后续操作
      3. dist 的模块是 CommonJS 模块打包过后的，一样会很麻烦
   2. babel-register
      1. mocha --require babel-register
         1. 注意确保 mocha 是本地的，不然会找不到 babel-register 模块

