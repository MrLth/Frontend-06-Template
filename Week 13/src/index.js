/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-19 23:07:37
 * @LastEditTime: 2021-01-20 00:31:03
 * @Description: file content
 */

function createIframe(id, url, onLoadCb) {
    return new Promise((resolve) => {
        var iframe = document.createElement("iframe");

        iframe.id = id;
        iframe.width = 200;
        iframe.height = 200;
        iframe.src = url;

        iframe.onload = () => {
            onLoadCb(iframe)
            resolve(iframe)
        }

        document.body.appendChild(iframe);
    })

}

let rst = Object.create(null)
Promise.allSettled(config.map(
    ([name, target, generator]) =>
        createIframe(name, `/${name}`, (iframe) => {
            rst[name] = generator(iframe.contentDocument)
            console.log('#loaded', target, name, iframe.contentDocument)
        })
)).then((rstList) => {
    console.log('#loaded\nall done!!!', '\nrst', rst, '\nnotSortedNames', notSortedNames)
})
