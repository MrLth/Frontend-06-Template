import { enableGesture } from './gesture'
import TimeLine from './TimeLine'
import Animation from './Animation'
import { ease } from './TimingFunction'
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-04 10:17:15
 * @LastEditTime: 2021-02-14 16:52:21
 * @Description: file content
 */
import { Component } from './happyReact'

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
    let width = 500

    enableGesture(this.root)

    this.root.addEventListener('start', e => {
      console.log('start')
    })

    this.root.addEventListener('pan', e => {
      const x = e.clientX - e.startX
      const current = position - (x / width | 0) // position - ((x - x % 888) / 888)
      for (const offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = pos < 0 ? len - 1 + pos % len : pos % len // (pos + children.length) % children.length
        children[pos].style.transition = 'none'
        children[pos].style.transform = `translateX(${-pos * width + offset * width + x % width}px)`
      }
      console.log(1)
    })

    this.root.addEventListener('flick', e => console.log('flick'))

    this.root.addEventListener('end', e => {
      console.log('end')
      const x = e.clientX - e.startX
      position = position - Math.round(x / width)
      for (const offset of [0, -Math.sign(Math.round(x / width) - x + width / 2 * Math.sign(x))]) {
        let pos = position + offset;
        pos = pos < 0 ? len - 1 + pos % len : pos % len
        children[pos].style.transform = `translateX(${-pos * width + offset * width}px)`
      }
    })

    // this.root.addEventListener('mousedown', (e) => {
    //   const startX = e.clientX
    //   width = 500

    //   const move = (e) => {
    //     const x = e.clientX - startX
    //     const current = position - (x / width | 0) // position - ((x - x % 888) / 888)
    //     for (const offset of [-1, 0, 1]) {
    //       let pos = current + offset;
    //       pos = pos < 0 ? len - 1 + pos % len : pos % len // (pos + children.length) % children.length
    //       children[pos].style.transition = 'none'
    //       children[pos].style.transform = `translateX(${-pos * width + offset * width + x % width}px)`
    //     }
    //   }
    //   const up = (e) => {
    //     const x = e.clientX - startX
    //     position = position - Math.round(x / width)
    //     for (const offset of [0, -Math.sign(Math.round(x / width) - x + width / 2 * Math.sign(x))]) {
    //       let pos = position + offset;
    //       pos = pos < 0 ? len - 1 + pos % len : pos % len
    //       children[pos].style.transition = ''
    //       children[pos].style.transform = `translateX(${-pos * width + offset * width}px)`
    //     }
    //     document.removeEventListener('mousemove', move)
    //     document.removeEventListener('mouseup', up)
    //   }

    //   document.addEventListener('mousemove', move)
    //   document.addEventListener('mouseup', up)
    // })
    return this.root
  }
}

export default Carousel