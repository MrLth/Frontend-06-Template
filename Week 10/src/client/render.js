/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-31 10:51:15
 * @LastEditTime: 2020-12-31 16:13:03
 * @Description: file content
 */

const images = require('images')

const preset = {
    green: [0, 255, 0]
}

function parseBgColor(style) {
    const color = style.backgroundColor ?? style.background
    if (color) {
        let r = 0,
            g = 0,
            b = 0
        if (color.match(/rgb\((\d+),(\d+),(\d+)\)/)) {
            r = +RegExp.$1
            g = +RegExp.$2
            b = +RegExp.$3
        } else if (color.match(/#([A-Za-z0-9]{2})([A-Za-z0-9]{2})([A-Za-z0-9]{2})/)) {
            r = parseInt(RegExp.$1, 16)
            g = parseInt(RegExp.$2, 16)
            b = parseInt(RegExp.$3, 16)
        } else if (color.match(/#([A-Za-z0-9])([A-Za-z0-9])([A-Za-z0-9])/)) {
            r = parseInt(RegExp.$1 + RegExp.$1, 16)
            g = parseInt(RegExp.$2 + RegExp.$2, 16)
            b = parseInt(RegExp.$3 + RegExp.$3, 16)
        } else if (preset[color]) {
            [r, g, b] = preset[color]
        } else {
            throw SyntaxError('错误的颜色值')
        }
        return [r, g, b]
    }
}

function render(viewport, element) {
    if (element.style) {
        const img = images(element.style.width, element.style.height)
        const color = parseBgColor(element.style)
        if (color) {
            img.fill(...color, 1)
            viewport.draw(img, element.style.left ?? 0, element.style.top ?? 0)
        }
    }

    if (element.children) {
        for (const child of element.children) {
            render(viewport, child)
        }
    }

}

module.exports = { render }
