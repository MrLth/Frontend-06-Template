/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-26 16:32:18
 * @LastEditTime: 2021-02-27 16:48:50
 * @Description: file content
 */
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Hello from '../src/Hello.vue'

it('<Hello/>', function () {
  expect(mount(Hello).text()).to.match(/Hello World!/)
});
