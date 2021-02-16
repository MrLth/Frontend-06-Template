/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-16 10:15:54
 * @LastEditTime: 2021-02-16 10:47:27
 * @Description: file content
 */

import { createElement, Component, PROPS } from './lib/happyReact'

class List extends Component {
  render() {
    console.log(this)
    this.children = this[PROPS].data.map(this.template)
    return <ul>{this.children}</ul>
  }
  appendChild(child) {
    this.template = child
    this.render()
  }
}

const list = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
];

(<List data={list}>
  {
    item =>
      <li>
        <img src={item} />
      </li>
  }
</List>).mount(document.body)