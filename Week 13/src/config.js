/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-19 17:31:00
 * @LastEditTime: 2021-01-20 00:21:09
 * @Description: file content
 */
function filter(el) {
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

    for (const name of rst) {
        notSortedNames.delete(name)
    }

    return rst
}

function baseFn(iframeDocument) {
    return generateRst(new Set([...iframeDocument.querySelectorAll('code,a,dfn')].map(filter)))
}

function svgFn(iframeDocument) {
    return generateRst(
        new Set(
            [...iframeDocument.querySelectorAll('a[href$="#DOMInterfaces"]')]
                .reduce((a, c) => a.concat(Array.from(c.nextSibling?.children)), [])
                .map(el => {
                    const rst = /(?<=\s)\S*$/.exec(el.innerText)
                    return rst ? rst[0] : false
                })
        )
    )
}

function webAudioFn(iframeDocument) {
    return generateRst(new Set([...iframeDocument.querySelectorAll('ul li code a')].map(filter)))
}

let names = module ?? new Set(Object.getOwnPropertyNames(window))
let notSortedNames = module ?? new Set(Object.getOwnPropertyNames(window))


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
    ['webGL', 'https://www.khronos.org/registry/webgl/specs/latest/2.0/', baseFn],
    ['w3c-webAudio', 'https://www.w3.org/TR/webaudio/#APIOverview', webAudioFn],
    ['w3c-svg', 'https://www.w3.org/TR/SVG11/expanded-toc.html', svgFn],
]

if (module) module.exports = config
