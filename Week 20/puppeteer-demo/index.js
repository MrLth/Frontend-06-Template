/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-21 13:40:31
 * @LastEditTime: 2021-03-21 17:29:41
 * @Description: file content
 */
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com/');
    // const hrefElement = await page.$('a');
    // console.log(a.asElement().boxModel());
    const img = await page.$$('a');
    console.log(img)
})();