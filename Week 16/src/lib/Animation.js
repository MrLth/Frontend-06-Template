import { linear } from "./TimingFunction"

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-04 10:26:55
 * @LastEditTime: 2021-02-05 16:58:07
 * @Description: file content
 */
class Animation {
  constructor(target, property, startValue, endValue, duration, delay, timingFunction = linear, template = v => v) {
    this.target = target
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.template = template
    this.timingFunction = timingFunction
    this.range = endValue - startValue
  }

  receive(timing) {
    this.target[this.property] = this.template(this.startValue + this.timingFunction(timing / this.duration) * this.range)
  }



}

export default Animation