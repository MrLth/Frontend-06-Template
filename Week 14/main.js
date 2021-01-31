/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:18:13
 * @LastEditTime: 2021-01-30 19:42:02
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


    let currentIndex = 0
    setInterval(() => {
      const children = this.root.children
      const current = children[currentIndex]
      const nextIndex = (currentIndex + 1) % children.length
      const next = children[nextIndex]

      next.style.transition = 'none'
      next.style.transform = `translateX(${- 100 * (nextIndex - 1)}%)`

      setTimeout(() => {
        // requestAnimationFrame(() => {
        next.style.transition = ''
        current.style.transform = `translateX(${-(100 * (currentIndex + 1))}%)`
        next.style.transform = `translateX(${- 100 * nextIndex}%)`
        currentIndex = nextIndex
        // })
      }, 0)

    }, 1000)

    return this.root
  }
}

const vDom = <Carousel src={[
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
  './images/5.jpg',
]} />
vDom.mount(document.body)