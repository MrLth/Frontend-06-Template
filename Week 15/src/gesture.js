/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-05 16:06:09
 * @LastEditTime: 2021-02-07 10:43:16
 * @Description: file content
 */
import { Listener } from './lib/gesture'

document.addEventListener('contextmenu', e => e.preventDefault())

new Listener(document.documentElement)

document.documentElement.addEventListener('tap', e => console.log('tap event trigged',e))
document.documentElement.addEventListener('pressstart', e => console.log('pressstart event trigged',e))
document.documentElement.addEventListener('press', e => console.log('press event trigged',e))
document.documentElement.addEventListener('pressend', e => console.log('pressend event trigged',e))
document.documentElement.addEventListener('panstart', e => console.log('panstart event trigged',e))
document.documentElement.addEventListener('pan', e => console.log('pan event trigged',e))
document.documentElement.addEventListener('panend', e => console.log('panend event trigged',e))
document.documentElement.addEventListener('flick', e => console.log('flick event trigged',e))
