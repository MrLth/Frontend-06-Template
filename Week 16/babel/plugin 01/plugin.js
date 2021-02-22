/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-28 15:55:54
 * @LastEditTime: 2020-12-29 14:18:10
 * @Description: file content
 */
module.exports = ({ types: t }) => ({
    visitor: {
        BinaryExpression(path, state) {
            path.node.operator = state.opts.operator
        }
    }
})