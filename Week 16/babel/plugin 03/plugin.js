/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-29 14:25:25
 * @LastEditTime: 2020-12-29 17:09:24
 * @Description: file content
 */
const { statements } = require("@babel/template");


module.exports = ({ types: t }) => ({
    visitor: {
        FunctionDeclaration(path) {
            const tempTry = path.node.body;
            const temCatch = t.catchClause(
                t.identifier("e"),
                t.blockStatement(statements(`console.log(e,'function name: ${path.node.id.name}')`)())
            );

            path.node.body = t.blockStatement([
                t.tryStatement(tempTry, temCatch)
            ]);
        }
    }
})
//NODE_ENV=production npm run parse
//NODE_ENV=development npm run parse