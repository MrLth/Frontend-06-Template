/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-17 08:58:27
 * @LastEditTime: 2021-02-17 14:22:34
 * @Description: file content
 */
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

  }
  async init() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname.split(' ').filter(c => c.length).join('-') // Default to current folder name
      }
    ]);
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answers.name }
    );

    this.fs.copyTpl(
      this.templatePath('Hello.vue'),
      this.destinationPath('src/Hello.vue')
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

    const json = {
      name: answers.name,
      scripts: {
        build: 'webpack'
      }
    }

    this.fs.extendJSON(this.destinationPath('package.json'), json)
    this.npmInstall(['vue'], { 'save-dev': false })
    this.npmInstall(['webpack', 'webpack-cli', 'vue-loader', 'vue-style-loader', 'css-loader', 'vue-template-compiler', 'html-webpack-plugin'], { 'save-dev': true })
  }
};