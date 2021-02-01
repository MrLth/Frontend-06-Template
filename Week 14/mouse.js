/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:18:13
 * @LastEditTime: 2021-02-01 21:18:00
 * @Description: file content
 */
import { createElement, Component } from './happyReact'

class Carousel extends Component {
  render(props) {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    for (const imgPath of props.src) {
      const child = document.createElement('div')
      child.style.backgroundImage = `url('${imgPath}')`
      this.root.appendChild(child)
    }

    let position = 0
    const children = this.root.children
    const len = children.length
    let width

    this.root.addEventListener('mousedown', (e) => {
      const startX = e.clientX
      // TODO: 观察 performance 是否会减少一次重绘
      // width = width ?? this.root.getBoundingClientRect().width ?? 500
      // width = this.root.getBoundingClientRect().width ?? 500
      width = 500

      const move = (e) => {
        const x = e.clientX - startX
        const current = position - (x / width | 0) // position - ((x - x % 888) / 888)
        for (const offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = pos < 0 ? len - 1 + pos % len : pos % len // (pos + children.length) % children.length
          children[pos].style.transition = 'none'
          children[pos].style.transform = `translateX(${-pos * width + offset * width + x % width}px)`
        }
      }
      const up = (e) => {
        const x = e.clientX - startX
        position = position - Math.round(x / width)
        for (const offset of [0, -Math.sign(Math.round(x / width) - x + width / 2 * Math.sign(x))]) {
          let pos = position + offset;
          pos = pos < 0 ? len - 1 + pos % len : pos % len
          children[pos].style.transition = ''
          children[pos].style.transform = `translateX(${-pos * width + offset * width}px)`
        }
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
    return this.root
  }
}

(<Carousel src={[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]} />).mount(document.body)