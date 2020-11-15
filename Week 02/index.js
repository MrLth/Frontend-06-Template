const c = 100
const brC = c + 1
const initMap = Array(c ** 2).fill(0)
let map = Object.create(initMap)
const domMap = document.querySelector('.map-wrapper')
const [domBtnSave, domBtnPause] = document.querySelectorAll('button')
const domHistory = document.querySelector('.history-wrapper')
let isMouseDown = false
let isClear = false

domMap.addEventListener('mousedown', (e) => { isMouseDown = true; isClear = (e.which === 3) })
domMap.addEventListener('mouseup', () => isMouseDown = false)
domMap.addEventListener('contextmenu', (e) => e.preventDefault())

domBtnSave.addEventListener('click', () => {
    const arr = Array(c ** 2) // 这样创建会有优化
    for (let i = 0, len = c ** 2; i < len; i++) {
        arr[i] = map[i] === 1 ? 1 : 0
    }
    map = arr
    localStorage.setItem(new Date(), JSON.stringify(map))
    renderHistory()
})
domBtnPause.addEventListener('click', () => {
    if (pause) {
        continueCb && continueCb()
        domBtnPause.innerText = '暂停'
    } else {
        pause = true
        domBtnPause.innerText = '继续'
    }
})

const renderHistory = () => {
    const fragment = document.createDocumentFragment()
    Object.keys(localStorage)
        .sort((p, n) => new Date(n) - new Date(p))
        .forEach(k => {
            const btn = document.createElement('button')
            btn.innerText = k
            btn.addEventListener('click', () => {
                const rst = JSON.parse(localStorage.getItem(k))
                map = Array.isArray(rst) ? rst : Object.create(initMap)
                render(map)
            })
            fragment.appendChild(btn)
            fragment.appendChild(document.createElement('br'))
        })
    domHistory.innerHTML = ''
    domHistory.appendChild(fragment)
}

const render = (map) => {
    const fragment = document.createDocumentFragment()
    for (let x = 0; x < c; x++) {
        for (let y = 0; y < c; y++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')

            if (map[x * c + y] === 1)
                cell.style.backgroundColor = '#000'

            cell.addEventListener('mousemove', () => {
                if (!isMouseDown) return
                if (isClear) {
                    cell.style.backgroundColor = 'transparent'
                    map[x * c + y] = 0
                } else {
                    cell.style.backgroundColor = '#000'
                    map[x * c + y] = 1
                }
            })
            cell.addEventListener('click', () => {
                console.log(x, y, map[x * c + y], ((50 - x) ** 2 + (50 - y) ** 2) ** 0.5)
            })
            fragment.appendChild(cell)
        }
        fragment.appendChild(document.createElement('br'))
    }
    domMap.innerHTML = ''
    domMap.appendChild(fragment)
}

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

let pause = false
let continueCb = null

let count = 0

const drawPath = async ([x, y], [endX, endY]) => {
    const g = map[x * c + y].g
    domMap.childNodes[x * brC + y].style.backgroundColor = '#0f0'
    while (x !== endX || y !== endY) {
        [x, y] = map[x * c + y].position
        await sleep(10)
        domMap.childNodes[x * brC + y].style.backgroundColor = '#f00'
    }
    return g
}


const find = async (queue, end, start) => {
    const insert = (x, y, info) => {
        if (x >= c || x < 0) return
        if (y >= c || y < 0) return
        if (map[x * c + y]) {
            // 撞墙了
            if (map[x * c + y] === 1)
                return null

            // 两只搜索队相遇了
            if (map[x * c + y].queue !== info.queue)
                return [x, y]

            // 被搜索过的节点
            const oldInfo = map[x * c + y]
            if (oldInfo.g > info.g) {
                map[x * c + y] = info // 已经被搜索过的格子是不存在于扩张队列中的，直接替换就好
            }
            return null
        }
        map[x * c + y] = info

        count++
        domMap.childNodes[x * brC + y].style.backgroundColor = '#ffe58f'
        queue.push([x, y, info])
    }


    let item = queue.shift()
    let [x, y] = item

    const draw = async (rst) => {
        const [g1, g2] = await Promise.all([drawPath([x, y], start), drawPath(rst, end)])
        console.log('count', g1 + g2, count);
    }

    domMap.childNodes[x * brC + y].style.backgroundColor = '#91d5ff'

    if (x === end[0] && y === end[1]) {
        drawPath([x, y], end)
        return true
    }

    let g = map[x * c + y].g + 1, info
    const position = [x, y] // 避免内存泄漏

    let rst = null
    info = { position, g, queue }
    rst = insert(x + 1, y, info); if (rst) { draw(rst); return true }
    rst = insert(x - 1, y, info); if (rst) { draw(rst); return true }
    rst = insert(x, y + 1, info); if (rst) { draw(rst); return true }
    rst = insert(x, y - 1, info); if (rst) { draw(rst); return true }
    g += 0.4
    info = { position, g, queue }
    rst = insert(x - 1, y - 1, info); if (rst) { draw(rst); return true }
    rst = insert(x + 1, y - 1, info); if (rst) { draw(rst); return true }
    rst = insert(x + 1, y + 1, info); if (rst) { draw(rst); return true }
    rst = insert(x - 1, y + 1, info); if (rst) { draw(rst); return true }

    return false
}

const path = async (map, start, end) => {
    const info = (position) => ({
        position: position,
        g: 0
    })

    const startInfo = info(start), endInfo = info(end)

    const F1 = ([x, y, info]) => (((end[0] - x) ** 2 + (end[1] - y) ** 2) ** 0.5 + info.g)
    const F2 = ([x, y, info]) => (((start[0] - x) ** 2 + (start[1] - y) ** 2) ** 0.5 + info.g)

    // 广度优先搜索使用队列，深度优先搜索使用栈
    // const queue = new PathQueue([...start, startInfo], F1)
    // const queue1 = new PathQueue([...end, endInfo], F2)

    const queue = new BinaryHeap([...start, startInfo], (a, b) => (F1(a) - F1(b)))
    const queue1 = new BinaryHeap([...end, endInfo], (a, b) => (F2(a) - F2(b)))

    startInfo.queue = queue
    endInfo.queue = queue1

    map[start[0] * c + start[1]] = startInfo
    map[end[0] * c + end[1]] = endInfo

    let findRst = false
    while (queue.length && queue1.length) {

        if (pause) {
            await new Promise(resolve => { continueCb = resolve })
            pause = false
        }

        await sleep(0)

        findRst = await find(queue, end, start); if (findRst) return true
        findRst = await find(queue1, start, end); if (findRst) return true
    }

    return false
}

render(map)
renderHistory()
