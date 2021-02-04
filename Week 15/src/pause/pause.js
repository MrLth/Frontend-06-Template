import TimeLine from "../lib/TimeLine";
import Animation from "../lib/Animation";
import { ease, easeIn, easeInOut, easeOut, linear } from "../lib/TimingFunction";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-04 13:50:07
 * @LastEditTime: 2021-02-04 16:28:37
 * @Description: file content
 */

const timeline = new TimeLine()
timeline
  .add(new Animation(document.querySelector('#div1').style, 'transform', 0, 800, 5500, 0, linear, v => `translateX(${v}px)`))
  .add(new Animation(document.querySelector('#div2').style, 'transform', 0, 800, 5500, 0, ease, v => `translateX(${v}px)`))
  .add(new Animation(document.querySelector('#div3').style, 'transform', 0, 800, 5500, 0, easeIn, v => `translateX(${v}px)`))
  .add(new Animation(document.querySelector('#div4').style, 'transform', 0, 800, 5500, 0, easeOut, v => `translateX(${v}px)`))
  .add(new Animation(document.querySelector('#div5').style, 'transform', 0, 800, 5500, 0, easeInOut, v => `translateX(${v}px)`))
  .start()


function native(id, timingFunctionName) {
  const native = document.querySelector(id)
  native.style.transition = '5.5s ' + timingFunctionName
  native.style.transform = 'translateX(800px)'
}

native('#native1', 'linear')
native('#native2', 'ease')
native('#native3', 'ease-in')
native('#native4', 'ease-out')
native('#native5', 'ease-in-out')

document.querySelector('#btn-pause').addEventListener('click', () => timeline.pause())
document.querySelector('#btn-resume').addEventListener('click', () => timeline.resume())