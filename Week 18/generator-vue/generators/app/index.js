/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-17 08:58:27
 * @LastEditTime: 2021-02-27 16:53:11
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
      this.templatePath(),
      this.destinationPath(),
      { title: answers.name }
    );
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc')
    );

    const json = {
      name: answers.name,
      scripts: {
        build: 'webpack',
        test: 'mochapack --webpack-config webpack.config.js --require test/setup.js test/**/*.spec.js',
        coverage: 'nyc mocha'
      }
    }


    this.fs.extendJSON(this.destinationPath('package.json'), json)
    this.npmInstall(['vue'], { 'save-dev': false })
    this.npmInstall([
      '@babel/core',
      '@babel/preset-env',
      '@babel/register',
      '@istanbuljs/nyc-config-babel',
      '@vue/test-utils',
      'babel-plugin-istanbul',
      'mocha',
      'mochapack',
      'nyc',
      'chai',
      'jsdom',
      'jsdom-global',
      'webpack-node-externals',
      'webpack@4',
      'webpack-cli',
      'vue-loader',
      'vue-style-loader',
      'css-loader',
      'vue-template-compiler',
      'html-webpack-plugin@4'
    ], { 'save-dev': true })


  }
};