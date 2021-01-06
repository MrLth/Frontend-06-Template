/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-06 13:26:35
 * @LastEditTime: 2021-01-06 16:58:59
 * @Description: file content
 */

/**
 * @param {string} selector
 * @param {HTMLElement} element
 * @return {*}
 */
const EOF = Symbol('EOF')

function match(source, element) {
    let temp, tempKey, tempVal, attrType
    let tempEl
    const omit = (type, value) => {
        temp = ''
        switch (type) {
            case 'cls':
                tempEl.classList.push(value)
                break
            case 'hash':
                tempEl.id = value
                break
            case 'tag':
                tempEl.tagName = value
                break
            case 'attr':
                tempEl.attribute.push(value)
                break
            case 'parent':
                tempEl = {
                    parent: tempEl,
                    classList: [],
                    attribute: []
                }
                break
            case 'ancestor':
                tempEl = {
                    ancestor: tempEl,
                    classList: [],
                    attribute: []
                }


        }
    }

    function selector(c) {

        omit('ancestor')

        if (c === '.') {
            return _class
        }
        if (c === '#')
            return hash
        if (c === '[')
            return attrBefore


        return tag(c)
    }

    function _class(c) {
        if ([' ', '\t'].includes(c)) {
            omit('cls', temp)
            return delimiter
        }

        if (c === '#') {
            omit('cls', temp)
            return hash
        }

        if (c === '.') {
            omit('cls', temp)
            return _class
        }

        if (c === '[') {
            omit('cls', temp)
            return attrBefore
        }

        if (c === '>') {
            omit('cls', temp)
            return children
        }

        if (c === EOF) {
            omit('cls', temp)
            return
        }

        temp += c
        return _class
    }
    function hash(c) {
        if ([' ', '\t'].includes(c)) {
            omit('hash', temp)
            return delimiter
        }

        if (c === '.') {
            omit('hash', temp)
            return _class
        }

        if (c === '[') {
            omit('hash', temp)
            return attrBefore
        }

        if (c === '>') {
            omit('hash', temp)
            return children
        }

        if (c === EOF) {
            omit('hash', temp)
            return
        }


        temp += c
        return hash
    }
    function tag(c) {
        if ([' ', '\t'].includes(c)) {
            omit('tag', temp)
            return delimiter
        }

        if (c === '#') {
            omit('tag', temp)
            return hash
        }

        if (c === '.') {
            omit('tag', temp)
            return _class
        }

        if (c === '[') {
            omit('tag', temp)
            return attrBefore
        }

        if (c === '>') {
            omit('tag', temp)
            return children
        }

        if (c === EOF) {
            omit('tag', temp)
            return
        }


        temp += c
        return tag
    }


    function attrBefore(c) {
        tempKey = ''
        tempVal = ''
        attrType = 'normal'
        return attrName(c)
    }
    function attrName(c) {
        if ([' ', '\t'].includes(c))
            return attrName

        if (c === '^') {
            return attrPrefix
        }

        if (c === '=') {
            return attrVal
        }

        if (c === ']') {
            omit('attr', [tempKey, null, 'noValue'])
            return delimiter
        }

        tempKey += c
        return attrName

    }

    function attrPrefix(c) {
        if (c === '=') {
            attrType = 'prefix'
            return attrVal
        }
        throw SyntaxError('attr prefix')
    }

    function attrVal(c) {
        if ([' ', '\t'].includes(c))
            return attrVal

        if (c === ']') {
            omit('attr', [tempKey, tempVal, attrType])
            return delimiter
        }

        tempVal += c
        return tempVal
    }

    function children(c) {
        if ([' ', '\t'].includes(c)) {
            return children
        }

        omit('parent')

        if (c === '.')
            return _class

        if (c === '#')
            return hash

        if (c === EOF)
            throw SyntaxError('parse children error')

        return tag(c)
    }


    function delimiter(c) {
        if ([' ', '\t'].includes(c))
            return delimiter
        if (c === '>') {
            return children
        }

        return selector(c)
    }

    function fsm(source) {
        let next = selector
        for (const c of source) {
            next = next(c)
        }
        next(EOF)
    }

    fsm(source)

    console.log(tempEl)
}

match('div.c1>div.c2.c3.c4+.c5>span[a=b]')
