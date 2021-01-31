/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:18:13
 * @LastEditTime: 2021-01-31 19:03:16
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
      width = width ?? this.root.getBoundingClientRect().width ?? 500
      console.log(width);


      const move = (e) => {
        const x = e.clientX - startX
        const current = position - (x / width | 0)
        // const current = position - ((x - x % 888) / 888)
        for (const offset of [-2, -1, 0, 1, 2]) {
          let pos = current + offset;
          pos = pos < 0 ? len - 1 + pos % len : pos % len
          // pos = (pos + children.length) % children.length
          children[pos].style.transition = 'none'
          children[pos].style.transform = `translateX(${-pos * width + offset * width + x % width}px)`
        }
      }
      const up = (e) => {
        const x = e.clientX - startX
        position = position - Math.round(x / width)
        for (const offset of [0, -Math.sign(Math.round(x / width) - x + width / 2 * Math.sign(x))]) {
          let pos = position + offset;
          console.log(pos);
          pos = pos < 0 ? len - 1 + pos % len : pos % len
          console.log(pos);
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
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
  './images/5.jpg',
]} />).mount(document.body)