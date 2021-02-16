/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:36:48
 * @LastEditTime: 2021-02-16 10:48:17
 * @Description: file content
 */

import { ease } from "./TimingFunction"

export const STATE = Symbol('state')
export const PROPS = Symbol('props')
export const RENDER = Symbol('render')


export const createElement = (target, props, ...children) => {
  const element = typeof target === 'string'
    ? new ElementNode(target)
    : new target


  if (props) {
    for (const [k, v] of Object.entries(props)) {
      element.setAttribute(k, v)
    }
  }

  const processChildren = (children) => {
    for (const child of children) {
      if (Array.isArray(child)) {
        processChildren(child)
      } else {
        element.appendChild(typeof child === 'string' ? new TextNode(child) : child)
      }
    }
  }

  processChildren(children)

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
    if (!this.root) this[RENDER]()
    dom.appendChild(this.root)
  }
  triggerEvent(type, args) {
    // string.prototype.replace(/^(\w)/, s => s.toUpperCase())
    const onType = `on${type.replace(/^(\w)/, RegExp.$1.toUpperCase())}`
    typeof this[PROPS][onType] === 'function' && this[PROPS][onType](new CustomEvent(type, { detail: args }))
  }
  [RENDER]() {
    const root = this.render(this[PROPS])
    if (root !== null && typeof root === 'object') {
      this.root = root instanceof HTMLElement ? root : root.root
    }
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