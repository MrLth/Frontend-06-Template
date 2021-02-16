/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-16 09:29:08
 * @LastEditTime: 2021-02-16 10:34:09
 * @Description: file content
 */

import { createElement, Component, RENDER } from './lib/happyReact'

class Button extends Component {
  render() {
    this.childTemplate = <span />
    return <div>{this.childTemplate}</div>
  }

  appendChild(child) {
    if (!this.childTemplate) this[RENDER]()
    this.childTemplate.appendChild(child)
  }
}

(<Button>
  <a href='#'>content</a>
</Button>).mount(document.body)

export default Button