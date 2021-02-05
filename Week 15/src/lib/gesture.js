/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-05 14:22:04
 * @LastEditTime: 2021-02-05 16:59:32
 * @Description: file content
 */

const contents = new Map()
const threshold = (window.devicePixelRatio ?? 1) * 5
let isListeningMouse = false


export class Listener {
  /**
   * @param {HTMLElement} element
   */
  constructor(element, _Recognizer = Recognizer, _dispatch = dispatch.bind(null, element)) {
    //#region mouse event，注意区分左右键（e.button & e.buttons）
    element.addEventListener('mousedown', e => {
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
        content.end(e)
        if (e.buttons === 0) { // 只有所有按键都松开才清除事件
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
          isListeningMouse = false
        }
      }
      // fix press multiple keys at the same time to add event multiple times
      if (!isListeningMouse) {
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
        isListeningMouse = true
      }
    })
    //#endregion
    //#region touch event
    element.addEventListener('touchstart', e => {
      for (const touch of e.targetTouches) {
        const content = new Recognizer(dispatch)
        contents.set(touch.identifier, content)
        content.start(touch)
      }
    })
    element.addEventListener('touchmove', e => {
      for (const touch of e.targetTouches) {
        const content = contents.get(touch.identifier)
        content.move(touch)
      }
    })
    element.addEventListener('touchend', e => {
      for (const touch of e.targetTouches) {
        const content = contents.get(touch.identifier)
        content.end(touch)
      }
    })
    element.addEventListener('touchcancel', e => {
      for (const touch of e.targetTouches) {
        const content = contents.get(touch.identifier)
        content.cancel(touch)
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
      // TODO: press start
      console.log('press')
      // TODO: press
    }, 500)
  }
  /**
   * @param {MouseEvent|TouchEvent} e
   */
  move(e) {
    const dx = e.clientX - this.startX
    const dy = e.clientY - this.startY
    if (!this.isPan && dx ** 2 + dy ** 2 > threshold ** 2) {
      this.isPan = true
      this.isPress = false
      this.isTap = false
      clearTimeout(this.handler)
      // TODO: pan start
      console.log('pan start');
    }

    if (this.isPan) {
      // TODO: pan
      console.log('pan');
    }
  }
  /**
   * @param {MouseEvent|TouchEvent} e
   */
  end(e) {
    if (this.isTap) {
      // TODO: tap
      console.log('tap');
      this.dispatch('tap')
      clearTimeout(this.handler)
    }

    if (this.isPan) {
      console.log('pan end');
      // TODO: pan end
    }

    if (this.isPress) {
      // TODO: press end
    }
  }
  /**
   * @param {TouchEvent} e
   */
  cancel(e) {
    clearTimeout(this.handler)
  }
}

function dispatch(element, type, props) {
  const event = new Event(type)
  Object.assign(event, props)
  element.dispatch(event)
}
