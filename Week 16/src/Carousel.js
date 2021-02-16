import { enableGesture } from './lib/gesture'
import TimeLine from './lib/TimeLine'
import Animation from './lib/Animation'
import { ease } from './lib/TimingFunction'
import { STATE } from './lib/happyReact'
export { STATE } from './lib/happyReact'

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-04 10:17:15
 * @LastEditTime: 2021-02-16 10:44:31
 * @Description: file content
 */
import { Component } from './lib/happyReact'

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

    Object.defineProperty(this[STATE], 'position', {
      get() {
        return position
      },
      set: v => {
        if (position !== v) {
          position = v
          this.triggerEvent('change', { position: (position % len + len) % len })
        }
      }
    })


    const children = this.root.children
    const len = children.length
    let width = 500

    enableGesture(this.root)

    let timeline = new TimeLine()
    timeline.start()

    let t = 0
    let animationX = 0

    this.root.addEventListener('tap', e => {
      const pos = (position % len + len) % len
      this.triggerEvent('click', {
        position: pos,
        src: props.src[pos]
      })
    })

    this.root.addEventListener('start', e => {
      timeline.pause()

      const animationSpentTime = Date.now() - t

      // 限定 animationX 只在动画执行过程中有效，其余时间为 0 (即无效)
      animationX = animationSpentTime < duration
        ? ease(animationSpentTime / duration) * width - width
        : 0

      clearInterval(handler)
    })

    this.root.addEventListener('pan', e => {
      console.log('pan')
      const x = e.clientX - e.startX - animationX
      const current = this[STATE].position - (x / width | 0)
      for (const offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = (pos % len + len) % len
        children[pos].style.transition = 'none'
        children[pos].style.transform = `translateX(${-pos * width + offset * width + x % width}px)`
      }
    })

    this.root.addEventListener('end', e => {
      timeline.reset()
      timeline.start()
      handler = setInterval(nextPicture, 3000)

      const x = e.clientX - e.startX - animationX
      const current = this[STATE].position - (x / width | 0)

      const direction = e.isFlick
        ? x < 0 ? Math.floor((x % width) / width) : Math.ceil((x % width) / width)
        : Math.round((x % width) / width)

      // 已经执行一部分的动画，不需要完整的动画时长
      const progress = Math.abs(x % width) / width
      let _duration = direction ? (1 - progress) * duration : progress * duration

      const sign = Math.sign(Math.round(x / width) - x + width / 2 * Math.sign(x))
      for (const offset of [0, sign, -sign]) {
        let pos = current + offset;
        pos = (pos % len + len) % len

        timeline.add(new Animation(children[pos].style, 'transform',
          (-pos + offset) * width + x % width,
          (-pos + offset + direction) * width,
          _duration, 0, ease, templateFunction))
      }

      this[STATE].position = current - direction
      this[STATE].position = (this[STATE].position % len + len) % len
    })

    const templateFunction = v => `translateX(${v}px)`
    const duration = 1000
    const nextPicture = () => {
      const children = this.root.children
      const current = children[this[STATE].position]
      const nextIndex = (this[STATE].position + 1) % children.length
      const next = children[nextIndex]

      t = Date.now()

      timeline.add(new Animation(current.style, 'transform',
        -width * this[STATE].position,
        -width * (this[STATE].position + 1),
        duration, 0, ease, templateFunction))

      timeline.add(new Animation(next.style, 'transform',
        -width * (nextIndex - 1),
        -width * nextIndex,
        duration, 0, ease, templateFunction))

      this[STATE].position = nextIndex
    }

    let handler = setInterval(nextPicture, 3000)

    return this.root
  }
}

export default Carousel