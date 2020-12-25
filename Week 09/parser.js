/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-25 08:43:27
 * @LastEditTime: 2020-12-25 16:39:27
 * @Description: file content
 */

const css = require('css')

const EOF = Symbol('EOF')
let tempAttrName = ''
let currentToken = null
let tempTextElement = null
const stack = [{ tagName: 'document', children: [] }]
const cssRules = []

function addCSSRules(content) {
    const ast = css.parse(content)
    cssRules.push(...ast.stylesheet.rules)
}

function emit(token) {
    console.log(token)

    const stackTopElem = stack[stack.length - 1]

    const t = token.type
    /*  */ if (t === 'startTag') {
        tempTextElement = null

        const element = {
            tagName: token.value,
            children: [],
            attributes: [],
            parent: stackTopElem
        }

        for (const [k, v] of Object.entries(token)) {
            if (['type', 'value', 'isSelfClosingTag'].includes(k))
                continue
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
        }
    } else if (t === 'endTag') {
        tempTextElement = null

        if (stackTopElem.tagName !== token.value)
            throw 'parse failed'
        else
            stack.pop()


        if (stackTopElem.tagName === 'style') {

            addCSSRules(stackTopElem.children[0].content)
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

function tagOpen(c) {
    /*  */ if (c === '/') {
        return tagClose
    } else if (c === '>') {
        // return tagOpenEnd
    } else if (c === ' ') {
        // return attributeName
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



/**
 * @param {string} body
 * @return {*}
 */
function parseHTML(body) {
    let next = content
    for (const c of body) {
        next = next(c)
    }
    next(EOF)
    console.log(cssRules)

}


module.exports = { parseHTML }
