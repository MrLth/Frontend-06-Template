/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-25 08:43:27
 * @LastEditTime: 2020-12-31 16:07:18
 * @Description: file content
 */

const css = require('css')
const { layout } = require('./layout')

const EOF = Symbol('EOF')
let tempAttrName = ''
let currentToken = null
let tempTextElement = null
const stack = [{ tagName: 'document', attributes: [], children: [], type: 'element' }]
const cssRules = []

function addCSSRules(content) {
    const ast = css.parse(content)
    cssRules.push(...ast.stylesheet.rules)

    /** 既然所有 rule 都会参与比较，那就先处理为方便运算的结构
     * 但大多数选择器可能只有最右边的选择器才会参与比较，所以使用 proxy 转移到需要时运算
     * // 但产生了额外的空间和时间成本
     */
    for (const rule of cssRules) {
        for (let i = 0; i < rule.selectors.length; i++) {
            rule.selectors[i] = new Proxy(rule.selectors[i].split(' ').reverse(), {
                get(target, key) {
                    const native = target[key]
                    // 只拦截元素，length 类型为 number 不会被拦截
                    if (typeof native === 'string') {
                        // 提供对 tag#id.class1.class2 的支持
                        const specificity = [0, 0, 0, 0]
                        const value = [...native.matchAll(/((?:\.|#)?[^#\.]+)/g)]
                            .reduce((a, [/*matched selector*/s]) => {
                                /*  */ if (s[0] === '#') {
                                    a.id = s.substr(1)
                                    specificity[1]++
                                } else if (s[0] === '.') {
                                    a.classNames.push(s.substr(1))
                                    specificity[2]++
                                } else {
                                    a.tag = s
                                    specificity[3]++
                                }
                                return a
                            }, {
                                tag: null,
                                id: null,
                                classNames: []
                            })

                        target[key] = { value, specificity }
                    }
                    return target[key]
                }
            })
        }
    }
}

function match(element, selectorCell) {
    // 1. tagName
    if (selectorCell.tag && selectorCell.tag !== element.tagName)
        return false

    // 2. ID selector
    if (selectorCell.id) {
        // TODO: id 属性应该直接保存在元素上
        const id = element.attributes.find(v => v.name === 'id')?.value
        if (selectorCell.id !== id)
            return false
    }

    // 3. class selectors
    if (selectorCell.classNames.length === 0)
        return true

    // TODO: class 属性应该直接保存在元素的 classList 属性上
    let classList = element.attributes?.find(v => v.name === 'class')?.value
    if (!classList)
        return false

    classList = classList.split(' ')
    for (const c of selectorCell.classNames) {
        if (!classList.includes(c))
            return false
    }
    return true
}

function addRule(element, rule, specificity) {
    const computed = element.computedStyle ?? {}
    for (const declaration of rule.declarations) {
        const prop = declaration.property
        if (!computed[prop] || morePriority(specificity, computed[prop].specificity) === specificity) {
            computed[prop] = {
                value: declaration.value,
                specificity
            }
        }
    }
    element.computedStyle = computed
}

function morePriority(newS, oldS) {
    if (!oldS) return newS
    for (let i = 0; i < newS.length; i++) {
        if (newS[i] > oldS[i]) {
            return newS
        } else if (newS[i] < oldS[i]) {
            return oldS
        }
    }
    return newS
}


function computeCSS(element) {
    const hierarchial = stack.slice().reverse()

    /** 遍历 css rules，为元素添加上匹配的规则
     */
    // FIXME: time complexity N ** 3
    for (const rule of cssRules) {
        for (const selectorList of rule.selectors) {
            let compoundSelector = selectorList[0]
            const selectorLength = selectorList.length
            const specificity = compoundSelector.specificity.slice()

            // 0. 最右边的选择器表示要匹配的具体元素，值得特殊对待
            if (!match(element, compoundSelector.value))
                continue

            // 1. 单个选择器，如 tag | #id | .class
            if (selectorLength === 1) {
                addRule(element, rule, specificity)
                break
            }

            // 2. 后代选择器，如 ”body div“
            let i = element.isSelfClosingTag ? 0 : 1,
                j = 1
            for (; i < hierarchial.length; i++) {
                compoundSelector = selectorList[j]
                if (match(hierarchial[i], compoundSelector.value)) {
                    // 2.1 更新 specificity
                    for (let i = 0; i < specificity.length; i++) {
                        specificity[i] += compoundSelector.specificity[i]
                    }
                    j++
                    // 2.2 rule 跑完就表明匹配了，后续剪了✂
                    if (j === selectorLength) {
                        break
                    }
                }
            }
            if (j === selectorLength) {
                addRule(element, rule, specificity)
                break
            }
        }
    }
}

function emit(token) {
    const stackTopElem = stack[stack.length - 1]

    const t = token.type
    /*  */ if (t === 'startTag') {
        tempTextElement = null

        const element = {
            tagName: token.value,
            type: 'element',
            children: [],
            attributes: [],
            parent: stackTopElem,
            computedStyle: {}
        }

        for (const [k, v] of Object.entries(token)) {
            if (['type', 'value', 'isSelfClosingTag'].includes(k))
                continue

            if (k === 'style') {
                v.split(';').reduce((a, c) => {
                    const [key, value] = c.split(':')
                    if (key && value)
                        a[key.trim()] = { value: value.trim(), specificity: [1, 0, 0, 0] }
                    return a
                }, element.computedStyle)
                continue
            }

            element.attributes.push({
                name: k,
                value: v
            })
        }

        stackTopElem.children.push(element)

        if (!token.isSelfClosingTag) {
            stack.push(element)
        } else {
            element.isSelfClosingTag = true
            layout(element)
        }

        // CSS
        computeCSS(element)

    } else if (t === 'endTag') {
        tempTextElement = null

        if (stackTopElem.tagName !== token.value)
            throw 'parse failed'
        else {
            stack.pop()

            // CSS
            if (stackTopElem.tagName === 'style') {
                addCSSRules(stackTopElem.children[0].content)
            }

            layout(stackTopElem)
        }

    } else if (t === 'text') {
        if (!tempTextElement) {
            tempTextElement = {
                type: 'text',
                content: ''
            }
            stackTopElem.children.push(tempTextElement)
        }
        tempTextElement.content += token.value
    }
}

function omit(c) {
    if (c === '>') {
        return content
    } else {
        return omit
    }
}

function tagOpen(c) {
    /*  */ if (c === '/') {
        return tagClose
    } else if (c === '>') {
        // return tagOpenEnd
    } else if (c === ' ') {
        // return attributeName
    } else if (c === '!') {
        return omit
    } else {
        currentToken = {
            type: 'startTag',
            value: ''
        }
        return tagName(c)
    }
}

function tagOpenEnd(c) {
    emit(currentToken)
    currentToken = null
    tempTextElement = ''
    return content(c)
}

function tagName(c) {
    /*  */ if (c === '/') {
        return tagOpenClose
    } else if (c === '>') {
        return tagOpenEnd
    } else if ('\t\n\f '.includes(c)) {
        return attrSeparator
    } else if (c.match(/^[A-Za-z]$/)) {
        currentToken.value += c
        return tagName
    } else {
        return tagName
    }
}


function tagClose(c) {
    currentToken = {
        type: 'endTag',
        value: ''
    }
    return endTagName(c)
}

function endTagName(c) {
    if (c === '>') {
        return tagOpenEnd
    } else {
        currentToken.value += c
        return endTagName
    }
}

function tagOpenClose(c) {
    if (c === '>') {
        currentToken.isSelfClosingTag = true
        emit(currentToken)
        currentToken = null
        return content
    }
}

function attributeName(c) {
    /*  */ if (c === '/') { // <div readonly/>
        if (tempAttrName !== '')
            currentToken[tempAttrName] = tempAttrName
        return tagOpenClose
    } else if (c === '>') { // <div readonly>
        if (tempAttrName !== '')
            currentToken[tempAttrName] = tempAttrName
        return tagOpenEnd
    } else if (c === '=') {
        currentToken[tempAttrName] = ''
        return attributeValueBefore
    } else if ('\t\n\f '.includes(c)) {
        return attributeName
    } else {
        tempAttrName += c
        return attributeName
    }
}

function attributeValueBefore(c) {
    /*  */ if (c === '\'') {
        return attrValSingleQuote
    } else if (c === '\"') {
        return attrValDoubleQuote
    } else if ('\t\n\f '.includes(c)) {
        return attributeValueBefore
    } else {
        return attrValNoQuote(c)
    }
}

function attributeValueAfter(c) {
    if ('\t\n\f '.includes(c)) {
        return attrSeparator
    } else if (c === '/') {
        return tagOpenClose
    } else if (c === '>') {
        return endTagName(c)
    }
}

function attrSeparator(c) {
    if ('\t\n\f '.includes(c)) {
        return attrSeparator
    } else if (c === '/') {
        return tagOpenClose
    } else if (c === '>') {
        return tagOpenEnd
    } else {
        tempAttrName = ''
        return attributeName(c)
    }
}

function attrValSingleQuote(c) {
    if (c === '\'') {
        return attributeValueAfter
    } else {
        currentToken[tempAttrName] += c
        return attrValSingleQuote
    }
}

function attrValDoubleQuote(c) {
    if (c === '\"') {
        return attributeValueAfter
    } else {
        currentToken[tempAttrName] += c
        return attrValDoubleQuote
    }
}

function attrValNoQuote(c) {
    /*  */ if (c === '/') { // <div readonly=readonly/>
        return tagOpenClose
    } else if (c === '>') { // <div readonly=readonly>
        return tagOpenEnd
    } else if ('\t\n\f '.includes(c)) {
        return attrSeparator
    } else {
        currentToken[tempAttrName] += c
        return attrValNoQuote
    }
}



function content(c) {
    /*  */ if (c === '<') {
        return tagOpen
    } else if (c === EOF) {
        emit({ type: 'EOF', })
    } else {
        emit({
            type: 'text',
            value: c
        })
        return content
    }
}


function parseHTML(body) {
    let next = content
    for (const c of body) {
        next = next(c)
    }
    next(EOF)
    return stack[0]
}


module.exports = { parseHTML }
