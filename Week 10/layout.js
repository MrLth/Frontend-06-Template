/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-30 08:23:43
 * @LastEditTime: 2020-12-30 17:00:05
 * @Description: file content
 */


function getStyle(element) {
    element.style = element.style ?? {}

    for (const [k, v] of Object.entries(element.computedStyle)) {
        const value = v.value.trim()
        // 仅支持 px 单位
        if (/px$/.test(value) || /^\d*\.?\d+$/.test(value))
            element.style[k] = parseInt(value)
        else
            element.style[k] = value
    }

    return element.style
}

function layout(element) {
    const style = getStyle(element)

    if (style.display !== 'flex')
        return

    const items = element.children.filter(e => e.type === 'element')

    // order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0
    items.sort((a, b) => (a.style.order ?? 0) - (b.style.order ?? 0))

    const defaultValues = {
        width: null,
        height: null,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        alignContent: 'stretch'
    }

    for (const [k, v] of Object.entries(defaultValues)) {
        if (!style[k] || style[k] === 'auto')
            style[k] = v
    }

    let main, cross
    switch (style.flexDirection) {
        case 'row':
            main = {
                size: 'width',
                start: 'left',
                end: 'right',
                sign: +1,
                base: 0
            }
            cross = {
                size: 'height',
                start: 'top',
                end: 'bottom'
            }
            break
        case 'row-reverse':
            main = {
                size: 'width',
                start: 'right',
                end: 'left',
                sign: -1,
                base: style.width
            }
            cross = {
                size: 'height',
                start: 'top',
                end: 'bottom'
            }
            break
        case 'column':
            main = {
                size: 'height',
                start: 'top',
                end: 'bottom',
                sign: +1,
                base: 0
            }
            cross = {
                size: 'width',
                start: 'left',
                end: 'right'
            }
            break
        case 'column-reverse':
            main = {
                size: 'height',
                start: 'bottom',
                end: 'top',
                sign: -1,
                base: style.height
            }
            cross = {
                size: 'width',
                start: 'left',
                end: 'right'
            }
            break
        default:
            break;
    }

    if (style.flexWrap === 'wrap-reverse') {
        cross = {
            start: cross.end,
            end: cross.start,
            sign: -1
        }
    } else {
        Object.assign(cross, {
            sign: +1,
            base: 0
        })
    }

    // 分行
    // 1. 计算后代元素 size
    const size = style[main.size]
    const computeSize = (element) => {
        const size = element.children.reduce((a, c) => (
            c.type === 'element'
                ? a + computeSize(c)
                : a
        ), 0)

        if (element.style[main.size])
            return element.style[main.size]

        element.style[main.size] = size

        return size
    }

    /** size 为 auto 时，size 由子元素的 size 组成
    * 因为是在 endTag 时才开始布局，所以 element 的子元素是已经完成布局了的。
    * 正常情况是这样，但是我们对非 flex 元素跳过了 size 计算，所以还是需要递归计算子元素的 size
    */
    computeSize(element)
    /** computeSize 会更改 style[main.size]
     * 本来 size 在已经给定的情况下，是不用由子元素的 size 组合起来的总 size 的，但是仍然需要递归地计算子元素的 size */
    if (size) style[main.size] = size



    // 2. 分行
    let flexLine = []
    const flexLines = [flexLine]

    let remainSpace = style[main.size]
    let crossSize = 0

    for (const item of items) {
        itemStyle = item.style

        if (itemStyle.flex) {
            flexLine.push(item)
        } else if (style.flexWrap === 'nowrap' || !size) {
            flexLine.push(item)
            remainSpace -= itemStyle[main.size]
            crossSize = Math.max(crossSize, itemStyle[cross.size] ?? 0)
        } else {
            // item 的最大 size 不可超过 flex 元素
            if (itemStyle[main.size] > style[main.size])
                itemStyle[main.size] = style[main.size]


            if (itemStyle[main.size] > remainSpace) {
                flexLine.crossSize = crossSize
                flexLine.remainSpace = remainSpace
                // 另起新行
                flexLine = [item]
                flexLines.push(flexLine)

                remainSpace = style[main.size]
                crossSize = 0
            } else {
                flexLine.push(item)
            }

            remainSpace -= itemStyle[main.size]
            crossSize = Math.max(crossSize, itemStyle[cross.size] ?? 0)
        }
        console.log("TLL ~ file: layout.js ~ line 162 ~ layout ~ itemStyle", itemStyle);

    }
    flexLine.remainSpace = remainSpace
    flexLine.crossSize = (style.flexWrap === 'nowrap' || !size) && style[crossSize]
        ? style[crossSize]
        : crossSize


    console.log("TLL ~ file: layout.js ~ line 158 ~ layout ~ flexLines", flexLines);

    // 3. 计算主轴
    // 3.1 剩余空间不够时，flex 元素 size 为 0，其它元素等比压缩
    if (remainSpace < 0) {
        const scale = style[main.size] / (style[main.size] - remainSpace)
        let currentStart = main.base
        for (const item of items) {
            const itemStyle = item.style

            itemStyle[main.size] = itemStyle.flex ? 0 : itemStyle[main.size] * scale

            itemStyle[main.start] = currentStart
            itemStyle[main.end] = currentStart + main.sign * itemStyle[main.size]
            currentStart = itemStyle[main.end]
        }
    } else {
        for (const items of flexLines) {
            const flexTotal = items.reduce((a, c) => c.style.flex ?? 0 + a, 0)
            const { remainSpace } = items
            // 存在 flex item
            if (flexTotal > 0) {
                let currentStart = main.base
                for (const item of items) {
                    if (item.style.flex) {
                        item.style[main.size] = item.style.flex / flexTotal * remainSpace
                    }
                    itemStyle[main.start] = currentStart
                    itemStyle[main.end] = currentStart * main.sign * itemStyle[main.size]
                    currentStart = itemStyle[main.end]
                }
            } else {
                // 不存在 flex item，剩余空间将依据 justifyContent 分配
                let currentStart = main.base, step = 0
                switch (style.justifyContent) {
                    case 'flex-start':
                        break
                    case 'flex-end':
                        currentStart = main.base + remainSpace * main.sign
                        break
                    case 'center':
                        currentStart = main.base + remainSpace / 2 * main.sign
                        break
                    case 'space-between':
                        step = remainSpace / (items.length - 1) * main.sign
                        break
                    case 'space-around':
                        step = remainSpace / items.length * main.sign
                        currentStart = main.base + step / 2
                        break
                }
                for (const item of items) {
                    itemStyle[main.start] = currentStart
                    itemStyle[main.end] = currentStart * main.sign * itemStyle[main.size]
                    currentStart = itemStyle[main.end] + step
                }

            }
        }
    }
    console.log(flexLines)
}




module.exports = { layout }