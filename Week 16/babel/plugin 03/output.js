/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-12-28 10:33:28
 * @LastEditTime: 2020-12-29 16:35:13
 * @Description: file content
 */
// 用例 (add 2 (sub 40 2))
// 1. 解析，原始代码 => AST
// 1.1 词法解析 - 分词
function FSM(string) {
  try {
    let next = data;

    for (const c of string) {
      next = next(c);
    }

    return stack[0];
  } catch (e) {
    console.log(e, 'function name: FSM');
  }
}

function data(c) {
  try {
    if (c === '(') {
      emit({
        type: 'parenthesesStart'
      });
      return data;
    } else if (c === ')') {
      emit({
        type: 'parenthesesEnd'
      });
      return data;
    } else if (/\d/.test(c)) {
      tempNumber = '';
      return number(c);
    } else if (/\w/.test(c)) {
      tempIdentifier = '';
      return identifier(c);
    } else if (/\s/.test(c)) {
      return space;
    } else {
      return data;
    }
  } catch (e) {
    console.log(e, 'function name: data');
  }
}

function space(c) {
  try {
    if (/\s/.test(c)) {
      return space;
    } else {
      return data(c);
    }
  } catch (e) {
    console.log(e, 'function name: space');
  }
}

let tempNumber;

function number(c) {
  try {
    if (/\d/.test(c)) {
      tempNumber += c;
      return number;
    } else {
      emit({
        type: 'number',
        value: tempNumber
      });
      return data(c);
    }
  } catch (e) {
    console.log(e, 'function name: number');
  }
}

let tempIdentifier;

function identifier(c) {
  try {
    if (/\w/.test(c)) {
      tempIdentifier += c;
      return identifier;
    } else {
      emit({
        type: 'identifier',
        value: tempIdentifier
      });
      return data(c);
    }
  } catch (e) {
    console.log(e, 'function name: identifier');
  }
} // 1.2 语法解析


const stack = [{
  type: 'Program',
  body: []
}];

function emit(node) {
  try {
    const top = stack[stack.length - 1];

    switch (node.type) {
      case 'parenthesesStart':
        const newNode = {
          type: 'CallExpression',
          body: [],
          parent: top
        };
        top.body.push(newNode);
        stack.push(newNode);
        break;

      case 'parenthesesEnd':
        stack.pop();
        break;

      case 'identifier':
        top.body.push({
          type: 'Identifier',
          name: node.value,
          parent: top
        });
        break;

      case 'number':
        top.body.push({
          type: 'Literal',
          raw: node.value,
          parent: top
        });
    }
  } catch (e) {
    console.log(e, 'function name: emit');
  }
} // 2. 转换，AST => AST
// 2.1 深度优先遍历


function DFS(root, lifeCycle) {
  try {
    function reverse(node) {
      try {
        const fn = lifeCycle[node.type];
        typeof fn === 'function' && fn(node);
        if (!Array.isArray(node.body)) return;

        for (const subNode of node.body) {
          reverse(subNode);
        }
      } catch (e) {
        console.log(e, 'function name: reverse');
      }
    }

    reverse(root);
    return root;
  } catch (e) {
    console.log(e, 'function name: DFS');
  }
}

function removeBodyNode(parent, node) {
  try {
    if (Array.isArray(parent.body)) {
      parent.body = parent.body.filter(v => v !== node);
      if (parent.body.length === 0) delete parent.body;
    }
  } catch (e) {
    console.log(e, 'function name: removeBodyNode');
  }
}

function replaceNode(parent, node, newNode) {
  try {
    if (Array.isArray(parent.body)) {
      const i = parent.body.findIndex(v => v === node);
      if (i === -1) return;
      parent.body.splice(i, 1, newNode);
    }

    node.parent = newNode;
  } catch (e) {
    console.log(e, 'function name: replaceNode');
  }
} // 3. 生成，AST => 目标代码


function generate(node) {
  try {
    switch (node.type) {
      case 'Program':
        return node.body.map(v => generate(v)).join('');

      case 'ExpressStatement':
        return generate(node.expression) + ';';

      case 'CallExpression':
        return `${generate(node.callee)}(${node.arguments.map(v => generate(v)).join(', ')})`;

      case 'Identifier':
        return node.name;

      case 'Literal':
        return node.raw;
    }
  } catch (e) {
    console.log(e, 'function name: generate');
  }
}

function parser(nativeCode) {
  try {
    // 1. 解析
    const ast = FSM(nativeCode); // 2. 转换

    DFS(ast, {
      CallExpression(node) {
        const parent = node.parent;

        if (!['ExpressStatement', 'CallExpression'].includes(parent.type)) {
          const statement = {
            type: 'ExpressStatement',
            expression: node
          };
          replaceNode(parent, node, statement);
        }

        if (!Array.isArray(node.arguments)) {
          node.arguments = [];
        }

        if (parent.type === 'CallExpression') {
          parent.arguments.push(node);
          removeBodyNode(parent, node);
        }
      },

      Identifier(node) {
        const parent = node.parent;

        if (parent.type === 'CallExpression') {
          if (!parent.callee) {
            parent.callee = node;
          } else {
            parent.arguments.push(node);
          }

          removeBodyNode(parent, node);
        }
      },

      Literal(node) {
        const parent = node.parent;

        if (parent.type === 'CallExpression') {
          parent.arguments.push(node);
          removeBodyNode(parent, node);
        }
      }

    }); // 3. 生成

    return generate(ast);
  } catch (e) {
    console.log(e, 'function name: parser');
  }
}

const rst = parser('(add 1 (sub one two (as)) 3 4)');
console.log(rst);
