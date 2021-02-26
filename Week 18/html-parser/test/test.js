/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-26 16:32:18
 * @LastEditTime: 2021-02-27 00:28:04
 * @Description: file content
 */
import { strictEqual } from 'assert'
import { parseHTML } from '../parser'
import { expect } from 'chai'

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

})
