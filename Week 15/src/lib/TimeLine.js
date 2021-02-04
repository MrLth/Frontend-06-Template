/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-04 10:27:04
 * @LastEditTime: 2021-02-04 16:30:46
 * @Description: file content
 */

const TICK = Symbol('tick')
const TASKS = Symbol('tasks')
const TICK_HANDLER = Symbol('Tick handler')
const PAUSE_START = Symbol('Pause start')
const PAUSE_TIME = Symbol('Pause time')

class TimeLine {
  constructor() {
    this.state = 'initd'
    this[TASKS] = new Set()

    this[TICK] = this[TICK].bind(this)
  }

  [TICK]() {
    let now = Date.now()
    for (const task of this[TASKS]) {
      const { animation, startTime } = task

      if (startTime > now) {
        continue
      }

      let timing = now - startTime - this[PAUSE_TIME]

      if (timing > animation.duration) {
        this[TASKS].delete(task)
        timing = animation.duration
      }

      animation.receive(timing)
    }

    this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
  }

  start() {
    if (this.state !== 'initd') {
      return
    }
    this.state = 'started'
    this.startTime = new Date()
    this[PAUSE_TIME] = 0
    this[TICK]()
  }

  add(animation, delay) {
    delay = delay ?? animation.delay ?? 0
    this[TASKS].add({ animation, startTime: Date.now() + delay })
    return this
  }

  pause() {
    if (this.state !== 'started') {
      return
    }
    this.state = 'paused'
    this[PAUSE_START] = new Date()
    cancelAnimationFrame(this[TICK_HANDLER])
  }

  resume() {
    if (this.state !== 'paused') {
      return
    }
    this.state = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }

  reset() {
    this.pause()
    this.state = 'initd'
    this.startTime = new Date()
    this[PAUSE_TIME] = 0
    this[PAUSE_START] = 0
    this[TICK_HANDLER] = null
    this[TASKS] = new Set()
    return this
  }


}

export default TimeLine
