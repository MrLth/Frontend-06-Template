/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-19 17:31:00
 * @LastEditTime: 2021-01-19 18:04:06
 * @Description: file content
 */
/**
 * ECMAScript
 *
let ecmaSet = new Set([...document.querySelectorAll('code')].map(filter))

for (const name of names) {
    if (ecmaSet.has(name)) {
        rst.ecma.push(name)
    }
}
/**/


function filter(el) {
    if (el.parentNode.tagName === 'TD') return false
    const text = el?.innerText
    if (!text) return false
    const rst = /^[_$A-Za-z][_$A-Za-z0-9]*(?:\.([_$A-Za-z0-9]*))*$/.exec(text)

    return rst
        ? rst[1]
            ? rst[1]
            : text
        : false
}



function generateRst(set) {
    const rst = []
    for (const name of names) {
        if (set.has(name)) {
            rst.push(name)
        }
    }
    return rst
}

function baseFn() {
    return generateRst(new Set([...document.querySelectorAll('code,a,dfn')].map(filter)))
}

function svgFn() {
    return generateRst(
        new Set(
            [...document.querySelectorAll('a[href$="#DOMInterfaces"]')]
                .reduce((a, c) => a.concat(Array.from(c.nextSibling?.children)), [])
                .map(el => {
                    const rst = /(?<=\s)\S*$/.exec(el.innerText)
                    return rst ? rst[0] : false
                })
        )
    )
}

let names = module || new Set(Object.getOwnPropertyNames(window))

const config = [
    ['ecma', 'https://tc39.es/ecma262/', baseFn],
    ['whatwg-html', 'https://html.spec.whatwg.org/', baseFn],
    ['whatwg-compat', 'https://compat.spec.whatwg.org/', baseFn],
    ['whatwg-encoding', 'https://encoding.spec.whatwg.org/', baseFn],
    ['whatwg-fetch', 'https://fetch.spec.whatwg.org/', baseFn],
    ['whatwg-notifications', 'https://notifications.spec.whatwg.org/', baseFn],
    ['whatwg-quirks', 'https://quirks.spec.whatwg.org/', baseFn],
    ['whatwg-storage', 'https://storage.spec.whatwg.org/', baseFn],
    ['whatwg-streams', 'https://streams.spec.whatwg.org/', baseFn],
    ['whatwg-xhr', 'https://xhr.spec.whatwg.org/', baseFn],
    ['webGL', 'https://www.khronos.org/registry/webgl/specs', baseFn],
    ['w3c-webAudio', 'https://www.w3.org/TR/webaudio/#APIOverview', baseFn],
    ['w3c-svg', 'https://www.w3.org/TR/SVG11/expanded-toc.html', svgFn],
]

module.exports = config

