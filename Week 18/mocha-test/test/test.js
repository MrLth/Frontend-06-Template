/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-26 16:32:18
 * @LastEditTime: 2021-02-26 23:06:17
 * @Description: file content
 */
import { strictEqual } from 'assert'
import { add, mul } from '../index'

it('add(1,2) === 3', function () {
  strictEqual(add(1, 2), 3);
});

it('mul(1,2) === 8', function () {
  strictEqual(mul(2, 4), 8);
});
