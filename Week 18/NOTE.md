### 参考文章

https://vue-test-utils.vuejs.org/zh/installation/testing-single-file-components-with-mocha-webpack.html

https://github.com/vuejs/vue-test-utils-mocha-webpack-example

https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha



#### 工具

1. mocha

1. 1. 书写业务代码时参考

1. @babel/register

1. 1. 让 mocha 支持 ESmodule 导入导出
   2. [使用] npx mocha --require @babel/register

1. nyc

1. 1. 计算 Code Coverage，注意去除 babel 的干扰
   2. 书写测试用例时参考
   3. 主要关注行覆盖率
   4. [使用] nyc mocha

1. babel-plugin-istanbul

1. 1. 让 nyc 支持 ESmodule 导入导出

1. @istanbul/nyc-config-babel

1. 1. 让 nyc 支持 ESmodule 导入导出



#### vs code launch.json

1. runtimeArgs

1. 1. 为运行的脚本添加参数

1. args

1. 1. 为 node 添加参数

1. sourceMap

1. 1. 是否读取 sourceMap，记得在 .babelrc 为 babel 加上 sourceMap



#### 使用 mocha 和 webpack 测试 vue 单文件组件

1. webpack 及 html-webpack-plugin 使用 4 版本



#### 指标

##### Code Coverage 代码覆盖率

一般认为单元测试覆盖到 100% 的函数和 90% 以上的行就是比较合理了