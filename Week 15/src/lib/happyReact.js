/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:36:48
 * @LastEditTime: 2021-01-30 18:12:12
 * @Description: file content
 */


export const createElement = (target, props, ...children) => {
  const element = typeof target === 'string'
    ? new ElementNode(target)
    : new target

  for (const [k, v] of Object.entries(props)) {
    element.setAttribute(k, v)
  }

  for (const v of children) {
    element.appendChild(typeof v === 'string' ? new TextNode(v) : v)
  }

  return element
}

export class Component {
  constructor() {
    this.props = {}
  }
  setAttribute(k, v) {
    this.props[k] = v
  }
  appendChild(child) {
    child.mount(this.root)
  }
  mount(dom) {
    dom.appendChild(this.render(this.props))
  }
}

class Node {
  setAttribute(k, v) {
    this.root.setAttribute(k, v)
  }
  appendChild(child) {
    child.mount(this.root)
  }
  mount(dom) {
    dom.appendChild(this.root)
  }
}

class ElementNode extends Node {
  constructor(type) {
    super()
    this.root = document.createElement(type)
  }
}

class TextNode extends Node {
  constructor(text) {
    super()
    this.root = document.createTextNode(text)
  }
}