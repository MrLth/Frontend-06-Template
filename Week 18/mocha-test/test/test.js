/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-26 16:32:18
 * @LastEditTime: 2021-02-26 16:58:58
 * @Description: file content
 */
import { strictEqual } from 'assert'
import { add } from '../index'

it('add(1,2) => 3', function () {
  strictEqual(add(1, 2), 3);
});