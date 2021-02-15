/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:36:48
 * @LastEditTime: 2021-02-15 16:35:25
 * @Description: file content
 */

export const STATE = Symbol('state')
export const PROPS = Symbol('props')


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
    this[PROPS] = {}
    this[STATE] = {}
  }
  setAttribute(k, v) {
    this[PROPS][k] = v
  }
  appendChild(child) {
    child.mount(this.root)
  }
  mount(dom) {
    if (!this.root) this.render(this[PROPS])
    dom.appendChild(this.root)
  }
  triggerEvent(type, args) {
    // string.prototype.replace(/^(\w)/, s => s.toUpperCase())
    const onType = `on${type.replace(/^(\w)/, RegExp.$1.toUpperCase())}`
    typeof this[PROPS][onType] === 'function' && this[PROPS][onType](new CustomEvent(type, { detail: args }))
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