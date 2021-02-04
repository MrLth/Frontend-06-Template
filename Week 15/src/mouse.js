/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-30 16:18:13
 * @LastEditTime: 2021-02-04 10:20:38
 * @Description: file content
 */
import { createElement } from './lib/happyReact'
import Carousel from './lib/Carousel'

(<Carousel src={[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]} />).mount(document.body)