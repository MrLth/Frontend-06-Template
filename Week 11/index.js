/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-06 09:22:54
 * @LastEditTime: 2021-01-06 13:26:39
 * @Description: file content
*/





/**
 * @description: 
 * @param {string} selector
 * @param {HTMLElement} element
 * @return {boolean}
 */
function match(selector, element) {
    debugger

    const compounds = selector.split(' ')

    /**
     * @description: 
     * @param {string} selector
     * @return {*}
     */
    const complexMatch = (selector) => {

        if (selector.includes('>')) {
            const compounds = selector.split('>')
            
            

        }

        const [parent, children] = selector.split('>')

        if (children) {
            return complexMatch(children) && complexMatch(parent)
        }

        return
    }


    const _match = (_selector) => {
        const rst = [..._selector.matchAll(/([^#\.]+)|(?:#([^#\.]+))|(?:\.([^#\.]+))?/g)]
            .slice(0, -1)
            .every(rst => {
                // debugger
                console.log(rst)
                // tag
                if (rst[1]) {
                    return element.tagName.toLowerCase() === rst[1].toLowerCase()
                }
                // hash
                if (rst[2]) {
                    return element.id.toLowerCase() === rst[2].toLowerCase()
                }
                // class
                if (rst[3]) {
                    return element.classList.contains(rst[3])
                }
            })

        console.log([..._selector.matchAll(/([^#\.]+)|(?:#([^#\.]+))|(?:\.([^#\.]+))?/g)], element.tagName)
        element = element.parentElement

        return rst
    }

    // 1. 最右选择器
    if (!_match(compounds.pop())) return false

    // 2. 后代选择器

    let i = compounds.length - 1
    while (element && i > -1) {

        if (_match(compounds[i]))
            i--

    }

    return i < 0
}
