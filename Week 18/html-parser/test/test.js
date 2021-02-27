/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-26 16:32:18
 * @LastEditTime: 2021-02-27 10:39:20
 * @Description: file content
 */
import { strictEqual } from 'assert'
import { parseHTML } from '../parser'
import { readFileSync } from 'fs'
import { resolve as _resolve } from 'path'
import { expect } from 'chai'

const resolve = _resolve.bind(null, __dirname)

console.log(__dirname)

describe('parseHTML', function () {
  it("parseHTML('<a/>')", function () {
    const tree = parseHTML('<a/>')
    expect(tree).to.deep.nested.include({
      'children[0].tagName': 'a',
      'children[0].type': 'element',
      'children[0].children': [],
      'children[0].computedStyle': {},
      'children[0].attributes': []
    });
  })

  it("parseHTML('<a href/>')", function () {
    const tree = parseHTML('<a href/>')

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'a',
      'type': 'element',
    });

    expect(tree.children[0].children).to.be.empty
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(1)
    expect(tree.children[0].attributes).deep.include({
      'name': 'href',
      'value': 'href',
    })
  })

  it("parseHTML('<a href=baidu.com />')", function () {
    const tree = parseHTML('<a href=baidu.com />')

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'a',
      'type': 'element',
    });

    expect(tree.children[0].children).to.be.empty
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(1)
    expect(tree.children[0].attributes).deep.include({
      'name': 'href',
      'value': 'baidu.com',
    })
  })

  // FIXME: parseHTML('<a href=http://baidu.com />')
  //#region BUG
  /**
  it("parseHTML('<a href=http://baidu.com />')", function () {
    const tree = parseHTML('<a href=http://baidu.com />')

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'a',
      'type': 'element',
    });

    expect(tree.children[0].children).to.be.empty
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(1)
    expect(tree.children[0].attributes).deep.include({
      'name': 'href',
      'value': 'baidu.com',
    })
  })
  /**/
  //#endregion

  it("parseHTML('<a href='http://baidu.com' />')", function () {
    const tree = parseHTML("<a href='http://baidu.com' />")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'a',
      'type': 'element',
    });

    expect(tree.children[0].children).to.be.empty
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(1)
    expect(tree.children[0].attributes).deep.include({
      'name': 'href',
      'value': 'http://baidu.com',
    })
  })

  it("parseHTML('<div title='http://baidu.com'>content</div>')", function () {
    const tree = parseHTML("<div title='http://baidu.com'>content</div>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].children[0]).include({
      'content': 'content',
      'type': 'text',
    })
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(1)
    expect(tree.children[0].attributes).deep.include({
      'name': 'title',
      'value': 'http://baidu.com',
    })
  })

  it("parseHTML('<div title=\"http://baidu.com\" disable>content</div>')", function () {
    const tree = parseHTML("<div title=\"http://baidu.com\" disable>content</div>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].children[0]).include({
      'content': 'content',
      'type': 'text',
    })
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(2)
    expect(tree.children[0].attributes).deep.include({
      'name': 'title',
      'value': 'http://baidu.com',
    })
    expect(tree.children[0].attributes).deep.include({
      'name': 'disable',
      'value': 'disable',
    })
  })

  it("parseHTML('<div a=b>content</div>')", function () {
    const tree = parseHTML("<div a=b>content</div>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].children[0]).include({
      'content': 'content',
      'type': 'text',
    })
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(1)
    expect(tree.children[0].attributes).deep.include({
      'name': 'a',
      'value': 'b',
    })
  })
  it("parseHTML('<div a=b/>')", function () {
    const tree = parseHTML("<div a=b/>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(1)
    expect(tree.children[0].attributes).deep.include({
      'name': 'a',
      'value': 'b',
    })
  })
  it("parseHTML('<div a=b c=d>content</div>')", function () {
    const tree = parseHTML("<div a=b c=d>content</div>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].children[0]).include({
      'content': 'content',
      'type': 'text',
    })
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.have.lengthOf(2)
    expect(tree.children[0].attributes).deep.include({
      'name': 'a',
      'value': 'b',
    })
    expect(tree.children[0].attributes).deep.include({
      'name': 'c',
      'value': 'd',
    })
  })
  it("parseHTML('<div>content</div>')", function () {
    const tree = parseHTML("<div>content</div>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].children[0]).include({
      'content': 'content',
      'type': 'text',
    })
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.be.empty
  })

  // TODO: 支持 comment 节点
  it("parseHTML('<!--comment--><div>content</div>')", function () {
    const tree = parseHTML("<!--comment--><div>content</div>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].children[0]).include({
      'content': 'content',
      'type': 'text',
    })
    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.be.empty
  })

  it("parseHTML('<div style=\"color:#fff\">content</div>')", function () {
    const tree = parseHTML("<div style=\"color:#fff\">content</div>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].children[0]).include({
      'content': 'content',
      'type': 'text',
    })

    expect(Object.keys(tree.children[0].computedStyle)).to.have.lengthOf(1)
    expect(tree.children[0].computedStyle).deep.include({
      color: {
        value: '#fff',
        specificity: [1, 0, 0, 0]
      }
    })

    expect(tree.children[0].attributes).to.be.empty
  })

  it("parseHTML('<div style=\"color:#fff\"/>')", function () {
    const tree = parseHTML("<div style=\"color:#fff\"/>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0]).to.be.an('object').and.include({
      'tagName': 'div',
      'type': 'element',
    });

    expect(tree.children[0].children).to.be.empty

    expect(Object.keys(tree.children[0].computedStyle)).to.have.lengthOf(1)
    expect(tree.children[0].computedStyle).deep.include({
      color: {
        value: '#fff',
        specificity: [1, 0, 0, 0]
      }
    })

    expect(tree.children[0].attributes).to.be.empty
  })

  it("parseHTML('<style>.a{color:#fff;}</style>')", function () {
    const tree = parseHTML("<style>.a{color:#fff;}</style>")

    expect(tree.children).to.have.lengthOf(1)

    expect(tree.children[0].children[0]).include({
      'content': '.a{color:#fff;}',
      'type': 'text',
    })

    expect(tree.children[0].computedStyle).to.be.empty

    expect(tree.children[0].attributes).to.be.empty
  })


  it("parseHTML(readFileSync('../template.html'))", function () {
    const htmlContent = readFileSync(resolve('../template.html'), { encoding: 'utf-8' })
    const tree = parseHTML(htmlContent)

    const elementFilter = e => e.type === 'element'

    const html = tree.children.filter(elementFilter)[0]
    // debugger
    expect(html).include({
      'tagName': 'html'
    })

    const [head, body] = html.children.filter(elementFilter)

    expect(head).include({
      'tagName': 'head'
    })

    expect(body).include({
      'tagName': 'body'
    })

    const deepestElement = body.children.filter(elementFilter)[0]
      .children.filter(elementFilter)[2]
      .children.filter(elementFilter)[1]

    expect(deepestElement).deep.include({
      'tagName': 'div',
      'computedStyle': {
        width: {
          value: '120px',
          specificity: [ 1, 0, 0, 0, ]
        }
      }
    })

  })
})
