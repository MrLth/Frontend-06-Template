/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-05 14:22:04
 * @LastEditTime: 2021-02-15 10:55:22
 * @Description: file content
 */

import { ease } from "./TimingFunction"

const contents = new Map()
const threshold = (window.devicePixelRatio ?? 1) * 5
let isListeningMouse = false
let isTouched = false

export class Listener {
  /**
   * @param {HTMLElement} element
   */
  constructor(element, _Recognizer = Recognizer, _dispatch = dispatch.bind(null, element)) {
    //#region mouse event，注意区分左右键（e.button & e.buttons）
    element.addEventListener('mousedown', e => {
      // fix tap trigger twice
      if (isTouched) {
        isTouched = false
        return
      }
      // fix mouseup not triggered, because triggered drag
      e.preventDefault()

      //#region mouse down
      const content = new _Recognizer(_dispatch)
      contents.set(`mouse ${1 << e.button}`, content)
      content.start(e)
      //#endregion
      const move = e => {
        let x = e.buttons // mousemove event 没有 button
        while (x) {
          //#region fix order of buttons & button is not same
          let t = x & -x // 取最低位的 1
          t = t === 2 ? 4 : t === 4 ? 2 : t
          //#endregion
          const content = contents.get(`mouse ${t}`)
          content?.move(e)
          x = x & (x - 1) // 打掉最低位的 1
        }
      }
      const up = e => {
        const content = contents.get(`mouse ${1 << e.button}`)
        content?.end(e)
        contents.delete(`mouse ${1 << e.button}`)
        if (e.buttons === 0) { // 只有所有按键都松开才清除事件
          document.removeEventListener('mouseup', up)
          document.removeEventListener('mousemove', move)
          isListeningMouse = false
        }
      }
      // fix press multiple keys at the same time to add event multiple times
      if (!isListeningMouse) {
        document.addEventListener('mouseup', up)
        document.addEventListener('mousemove', move)
        isListeningMouse = true
      }
    })
    //#endregion
    //#region touch event
    element.addEventListener('touchstart', e => {
      isTouched = true
      for (const touch of e.changedTouches) {
        const content = new _Recognizer(_dispatch)
        contents.set(touch.identifier, content)
        content.start(touch)
      }
    })
    element.addEventListener('touchmove', e => {
      for (const touch of e.changedTouches) {
        const content = contents.get(touch.identifier)
        content.move(touch)
      }
    })
    element.addEventListener('touchend', e => {
      for (const touch of e.changedTouches) {
        const content = contents.get(touch.identifier)
        content.end(touch)
        contents.delete(touch.identifier)
      }
    })
    element.addEventListener('touchcancel', e => {
      for (const touch of e.changedTouches) {
        const content = contents.get(touch.identifier)
        content.cancel(touch)
        contents.delete(touch.identifier)
      }
    })
    //#endregion
  }
}

class Recognizer {
  constructor(dispatch) {
    this.dispatch = dispatch
    this.isTap = true
    this.isPress = false
    this.isPan = false
    this.isFlick = false
    this.isVertical = false
    this.points = []
    this.handler = null
    this.startX = NaN
    this.startY = NaN
  }

  /**
   * @param {MouseEvent|TouchEvent} e
   */
  start(e) {
    this.startX = e.clientX
    this.startY = e.clientY

    this.handler = setTimeout(() => {
      this.isPress = true
      this.isTap = false
      this.dispatch('pressstart')
    }, 500)

    this.points = [{
      t: Date.now(),
      x: e.clientX,
      y: e.clientY
    }]

    this.dispatch('start', {
      clientX: e.clientX,
      clientY: e.clientY,
    })
  }
  /**
   * @param {MouseEvent|TouchEvent} e
   */
  move(e) {
    const dx = e.clientX - this.startX
    const dy = e.clientY - this.startY
    this.isVertical = Math.abs(dx) < Math.abs(dy)
    if (!this.isPan && dx ** 2 + dy ** 2 > threshold ** 2) {
      this.isPan = true
      this.isPress = false
      this.isTap = false
      clearTimeout(this.handler)
      this.dispatch('panstart', {
        startX: this.startX,
        startY: this.startY,
        clientX: e.clientX,
        clientY: e.clientY,
        isVertical: this.isVertical
      })
    }

    if (this.isPan) {
      this.dispatch('pan', {
        startX: this.startX,
        startY: this.startY,
        clientX: e.clientX,
        clientY: e.clientY,
        isVertical: this.isVertical
      })
    }

    //#region flick points handling
    const now = Date.now()
    this.points = this.points.filter(v => v.t > now - 500)
    this.points.push({
      t: now,
      x: e.clientX,
      y: e.clientY
    })
    //#endregion
  }
  /**
   * @param {MouseEvent|TouchEvent} e
   */
  end(e) {
    //#region flick
    const velocity = this.points.length < 2
      ? 0
      : Math.sqrt((e.clientX - this.points[0].x) ** 2 + (e.clientY - this.points[0].y) ** 2) / (Date.now() - this.points[0].t)

    if (velocity > 1.5) {
      this.isFlick = true
      this.dispatch('flick', {
        startX: this.startX,
        startY: this.startY,
        clientX: e.clientX,
        clientY: e.clientY,
        isVertical: this.isVertical,
        isFlick: this.isFlick,
        velocity
      })
    }
    //#endregion


    if (this.isTap) {
      clearTimeout(this.handler)
      this.dispatch('tap')
    }

    if (this.isPan) {
      this.dispatch('panend', {
        startX: this.startX,
        startY: this.startY,
        clientX: e.clientX,
        clientY: e.clientY,
        isVertical: this.isVertical,
        isFlick: this.isFlick,
        velocity
      })
    }

    if (this.isPress) {
      this.dispatch('pressend')
      this.dispatch('press')
    }

    this.dispatch('end', {
      startX: this.startX,
      startY: this.startY,
      clientX: e.clientX,
      clientY: e.clientY,
      isVertical: this.isVertical,
      isFlick: this.isFlick,
      velocity
    })
  }
  /**
   * @param {TouchEvent} e
   */
  cancel(e) {
    clearTimeout(this.handler)
    this.dispatch('cancel', e)
  }
}

function dispatch(element, type, props) {
  const event = new Event(type)
  Object.assign(event, props)
  element.dispatchEvent(event)
}

export const enableGesture = (element) => {
  return new Listener(element)
}