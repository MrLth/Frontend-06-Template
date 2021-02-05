/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-05 16:06:09
 * @LastEditTime: 2021-02-05 16:59:57
 * @Description: file content
 */
import { Listener } from '../lib/gesture'

document.addEventListener('contextmenu', e => e.preventDefault())

new Listener(document.documentElement)

document.documentElement.addEventListener('tap', e => console.log(e))
