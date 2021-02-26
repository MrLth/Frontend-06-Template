/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-30 08:23:43
 * @LastEditTime: 2020-12-31 16:55:54
 * @Description: file content
 */


function generateStyle(element) {
    element.style = element.style ?? {}

    for (const [k, v] of Object.entries(element.computedStyle)) {
        const key = k.split('-').reduce((a, c) => (a + c[0].toUpperCase() + c.slice(1)))
        const value = v.value
        // 仅支持 px 单位
        if (/px$/.test(value) || /^\d*\.?\d+$/.test(value))
            element.style[key] = parseInt(value)
        else
            element.style[key] = value
    }

    return element.style
}

function layout(element) {
    generateStyle(element)

    switch (element.style.display) {
        case 'flex':
            flexLayout(element)
            break
        case 'inline':
            throw Error('display: inline 不支持')
        case 'block':
        default:
            basicLayout(element)
    }

}

function flexLayout(element) {
    const style = element.style
    const items = element.children.filter(e => e.type === 'element')

    // order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0
    items.sort((a, b) => (a.style.order ?? 0) - (b.style.order ?? 0))

    let flexLine = []
    const flexLines = [flexLine]
    /**
     * @description:
     *  1. 属性默认值
     *  2. 统一输入
     * @return {{
     *  size: 'width' | 'height',
     *  start: 'left' | 'right',
     *  end: 'right'|'left',
     *  sign: number,
     *  base: number}[]
     * } [main, cross]
     */
    function preprocess() {
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

        return [main, cross]
    }
    /**
     * @description:
     *  1. 分离元素到行（分行）
     *  2. flex-wrap
     */
    function splitItems() {
        const size = style[main.size]

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
        }
        flexLine.remainSpace = remainSpace
        flexLine.crossSize = (style.flexWrap === 'nowrap' || !size) && style[crossSize]
            ? style[crossSize]
            : crossSize
    }
    /**
     * @description:
     *  1. 计算元素在主轴上的位置
     *  2. flex-wrap
     *  3. justify-content
     */
    function calcMainSize() {
        const remainSpace = flexLine.remainSpace
        // 剩余空间不够时，flex 元素 size 为 0，其它元素等比压缩
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
                        const itemStyle = item.style
                        if (itemStyle.flex) {
                            itemStyle[main.size] = itemStyle.flex / flexTotal * remainSpace
                        }
                        itemStyle[main.start] = currentStart
                        itemStyle[main.end] = currentStart + main.sign * itemStyle[main.size]
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
                        const itemStyle = item.style

                        itemStyle[main.start] = currentStart
                        itemStyle[main.end] = currentStart + main.sign * itemStyle[main.size]
                        currentStart = itemStyle[main.end] + step
                    }
                }
            }
        }
    }
    /**
     * @description:
     *  1. 计算元素在交叉轴上的位置
     *  2. flex-wrap
     *  3. align-content
     *  4. align-self
     *  5. align-item
     */
    function calcCrossSize() {
        let remainCrossSpace
        if (!style[cross.size]) {
            // auto size
            remainCrossSpace = 0
            style[cross.size] = flexLines.reduce((a, c) => (a + c.crossSize), 0)
        } else {
            remainCrossSpace = flexLines.reduce((a, c) => (a - c.crossSize), style[cross.size])
        }

        cross.base = style.flexWrap === 'wrap-reverse' ? style[cross.size] : 0

        let step = 0
        switch (style.alignContent) {
            case 'flex-end':
                cross.base += cross.sign * remainCrossSpace
                break
            case 'center':
                cross.base += cross.sign * remainCrossSpace / 2
                break
            case 'space-between':
                step = remainCrossSpace / (flexLines.length - 1)
                break
            case 'space-around':
                step = remainCrossSpace / flexLines.length
                cross.base += cross.sign * step / 2
                break
            case 'flex-start':
            case 'stretch':
                break
        }

        for (const items of flexLines) {
            const lineCrossSize = style.alignContent === 'stretch'
                ? items.crossSize + remainCrossSpace / flexLines.length
                : items.crossSize

            for (const item of items) {
                const itemStyle = item.style
                const align = itemStyle.alignSelf ?? style.alignItems

                itemStyle[cross.size] = itemStyle[cross.size] ??
                    align === 'stretch' ? lineCrossSize : 0

                switch (align) {
                    case 'flex-start':
                        itemStyle[cross.start] = cross.base
                        itemStyle[cross.end] = itemStyle[cross.start] + cross.sign * itemStyle[cross.size]
                        break
                    case 'flex-end':
                        itemStyle[cross.end] = cross.base + cross.sign * lineCrossSize
                        itemStyle[cross.start] = itemStyle[cross.end] - cross.sign * itemStyle[cross.size]
                        break
                    case 'center':
                        itemStyle[cross.start] = cross.base + cross.sign * (lineCrossSize - itemStyle[cross.siz]) / 2
                        itemStyle[cross.end] = itemStyle[cross.start] + cross.sign * itemStyle[cross.size]
                        break
                    case 'stretch':
                        itemStyle[cross.start] = cross.base
                        itemStyle[cross.end] = cross.base + cross.sign * (itemStyle[cross.size] ?? lineCrossSize)
                        let temp = item.computedStyle[cross.size].value
                        temp = temp && temp !== 'auto' && parseInt(temp)
                        itemStyle[cross.size] = temp ?? cross.sign * (itemStyle[cross.end] - itemStyle[cross.start])
                }
            }
            cross.base += cross.sign * (lineCrossSize + step)
        }
    }

    const [main, cross] = preprocess()
    splitItems()
    calcMainSize()
    calcCrossSize()
}

function basicLayout(element) {
    const style = element.style
    const parentStyle = element.parent.computedStyle ?? {}


    const items = element.children
        .filter(e => e.type === 'element')

    if (!style.width || style.width === 'auto') {
        const isInherit =
            (!parentStyle.display || parentStyle.display === 'block') &&
            (parentStyle.width && parentStyle.width.value !== 'auto')

        if (isInherit) {
            style.width = parseInt(parentStyle.width)
        } else {
            style.width = Math.max(0, ...(
                items.map(e => e.style.width)
            ))
        }
    }

    if (!style.height || style.height === 'auto') {
        style.height = items.reduce((a, c) => (a + c.style.height), 0)
    }
}



module.exports = { layout }