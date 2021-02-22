/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-29 14:25:25
 * @LastEditTime: 2020-12-29 15:07:06
 * @Description: file content
 */
module.exports = ({ types: t }) => ({
    visitor: {
        // 处理 process.env 相关语句
        MemberExpression(path) {
            if (path.get('object').matchesPattern("process.env")) {
                const key = path.toComputedKey()
                const parent = path.parentPath
                // 对于使用了 process.env 相关属性的 if 语句，要么直接删除，要么去除判断
                if (t.isBinaryExpression(parent) && t.isIfStatement(parent.parentPath)) {
                    const another = parent.node.right === path.node ? parent.node.left : parent.node.right
                    if (t.isStringLiteral(another)) {
                        if (process.env && process.env[key.value] === another.value) {
                            parent.parentPath.replaceWith(parent.parentPath.node.consequent)
                        } else {
                            parent.parentPath.remove()
                        }
                    }
                }else{
                    path.replaceWith(t.valueToNode(process.env[key.value]))
                }
                //if (process.env[key.value] === )
            }
        }
    }
})
//NODE_ENV=production npm run parse
//NODE_ENV=development npm run parse