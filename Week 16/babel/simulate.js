/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-28 10:33:28
 * @LastEditTime: 2020-12-29 11:59:11
 * @Description: file content
 */
// 用例 (add 2 (sub 40 2))
// 1. 解析，原始代码 => AST
// 1.1 词法解析 - 分词
function FSM(string) {
    let next = data
    for (const c of string) {
        next = next(c)
    }
    return stack[0]
}
function data(c) {
    if (c === '(') {
        emit({
            type: 'parenthesesStart'
        })
        return data
    } else if (c === ')') {
        emit({
            type: 'parenthesesEnd'
        })
        return data
    } else if (/\d/.test(c)) {
        tempNumber = ''
        return number(c)
    } else if (/\w/.test(c)) {
        tempIdentifier = ''
        return identifier(c)
    } else if (/\s/.test(c)) {
        return space
    } else {
        return data
    }
}
function space(c) {
    if (/\s/.test(c)) {
        return space
    } else {
        return data(c)
    }
}
let tempNumber
function number(c) {
    if (/\d/.test(c)) {
        tempNumber += c
        return number
    } else {
        emit({
            type: 'number',
            value: tempNumber
        })
        return data(c)
    }
}
let tempIdentifier
function identifier(c) {
    if (/\w/.test(c)) {
        tempIdentifier += c
        return identifier
    } else {
        emit({
            type: 'identifier',
            value: tempIdentifier
        })
        return data(c)
    }
}
// 1.2 语法解析
const stack = [{
    type: 'Program',
    body: []
}]
function emit(node) {
    const top = stack[stack.length - 1]
    switch (node.type) {
        case 'parenthesesStart':
            const newNode = {
                type: 'CallExpression',
                body: [],
                parent: top
            }
            top.body.push(newNode)
            stack.push(newNode)
            break
        case 'parenthesesEnd':
            stack.pop()
            break
        case 'identifier':
            top.body.push({
                type: 'Identifier',
                name: node.value,
                parent: top
            })
            break
        case 'number':
            top.body.push({
                type: 'Literal',
                raw: node.value,
                parent: top
            })
    }
}


// 2. 转换，AST => AST
// 2.1 深度优先遍历
function DFS(root, lifeCycle) {
    function reverse(node) {
        const fn = lifeCycle[node.type]
        typeof fn === 'function' && fn(node)

        if (!Array.isArray(node.body))
            return

        for (const subNode of node.body) {
            reverse(subNode)
        }
    }

    reverse(root)

    return root
}
function removeBodyNode(parent, node) {
    if (Array.isArray(parent.body)) {
        parent.body = parent.body.filter(v => v !== node)
        if (parent.body.length === 0)
            delete parent.body
    }
}
function replaceNode(parent, node, newNode) {
    if (Array.isArray(parent.body)) {
        const i = parent.body.findIndex(v => v === node)
        if (i === -1) return
        parent.body.splice(i, 1, newNode)
    }
    node.parent = newNode
}


// 3. 生成，AST => 目标代码
function generate(node) {
    switch (node.type) {
        case 'Program': return node.body.map(v => generate(v)).join('')
        case 'ExpressStatement': return generate(node.expression) + ';'
        case 'CallExpression': return `${generate(node.callee)}(${node.arguments.map(v => generate(v)).join(', ')})`
        case 'Identifier': return node.name
        case 'Literal': return node.raw
    }
}



function parser(nativeCode) {
    // 1. 解析
    const ast = FSM(nativeCode)
    // 2. 转换
    DFS(ast, {
        CallExpression(node) {
            const parent = node.parent
            if (!['ExpressStatement', 'CallExpression'].includes(parent.type)) {
                const statement = {
                    type: 'ExpressStatement',
                    expression: node
                }
                replaceNode(parent, node, statement)
            }
            if (!Array.isArray(node.arguments)) {
                node.arguments = []
            }
            if (parent.type === 'CallExpression') {
                parent.arguments.push(node)
                removeBodyNode(parent, node)
            }
        },
        Identifier(node) {
            const parent = node.parent
            if (parent.type === 'CallExpression') {
                if (!parent.callee) {
                    parent.callee = node
                } else {
                    parent.arguments.push(node)

                }
                removeBodyNode(parent, node)
            }
        },
        Literal(node) {
            const parent = node.parent
            if (parent.type === 'CallExpression') {
                parent.arguments.push(node)
                
                removeBodyNode(parent, node)
            }
        }
    })
    // 3. 生成
    return generate(ast)
}

const rst = parser('(add 1 (sub one two (as)) 3 4)')
console.log(rst)