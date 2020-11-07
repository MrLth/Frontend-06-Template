const c = 100
const brC = c + 1
const initMap = Array(c ** 2).fill(0)
let map = Object.create(initMap)
const domMap = document.querySelector('.map-wrapper')
const domBtn = document.querySelector('button')
const domHistory = document.querySelector('.history-wrapper')
let isMouseDown = false
let isClear = false

domMap.addEventListener('mousedown', (e) => { isMouseDown = true; isClear = (e.which === 3) })
domMap.addEventListener('mouseup', () => isMouseDown = false)
domMap.addEventListener('contextmenu', (e) => e.preventDefault())

domBtn.addEventListener('click', () => {
    const arr = Array(c ** 2) // 这样创建会有优化
    for (let i = 0, len = c ** 2; i < len; i++) {
        arr[i] = map[i] === 1 ? 1 : 0
    }
    map = arr
    localStorage.setItem(new Date(), JSON.stringify(map))
    renderHistory()
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
                console.log(x, y)
            })
            fragment.appendChild(cell)
        }
        fragment.appendChild(document.createElement('br'))
    }
    domMap.innerHTML = ''
    domMap.appendChild(fragment)
}

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

class PathQueue {
    queue = []
    map = null

    constructor(map, start) {
        this.queue.push(start)
        this.map = map
    }

    insert(x, y, info) {
        if (x >= c || x < 0) return
        if (y >= c || y < 0) return
        if (this.map[x * c + y]) {
            // if (typeof this.map[x * c + y] === 'object')
            // this.map[x * c + y] = info
            return
        }
        this.map[x * c + y] = info

        domMap.childNodes[x * brC + y].style.backgroundColor = '#faa'
        this.queue.push([x, y])
    }

    shift(computeCb) {
        let minI = 0
        let minV = computeCb(this.queue[0])
        const len = this.length
        for (let i = 1; i < len; i++) {
            const v = computeCb(this.queue[i])
            if (v < minV) {
                minV = v
                minI = i
            }
        }
        [this.queue[minI], this.queue[len - 1]] = [this.queue[len - 1], this.queue[minI]]
        return this.queue.pop()
    }

    get length() {
        return this.queue.length
    }
}


const path = async (map, start, end) => {
    // 广度优先搜索使用队列，深度优先搜索使用栈
    const queue = new PathQueue(map, start)
    window.queue = queue
    map[start[0] * c + start[1]] = {
        position: start,
        count: 0
    }

    const cb = ([x, y]) => {
        return ((end[0] - x) ** 2 + (end[1] - y) ** 2)
        return ((end[0] - x) ** 2 + (end[1] - y) ** 2) ** 0.5 + map[x * c + y].count
    }
    while (queue.length) {
        const position = queue.shift(cb)
        let [x, y] = position
        await sleep(0)
        if (x === end[0] && y === end[1]) {
            console.log('count', map[x * c + y].count);
            domMap.childNodes[x * brC + y].style.backgroundColor = '#0f0'
            while (x !== start[0] || y !== start[1]) {
                [x, y] = map[x * c + y].position
                await sleep(10)

                domMap.childNodes[x * brC + y].style.backgroundColor = '#f00'
            }
            return true
        }

        let count = map[x * c + y].count + 1


        queue.insert(x + 1, y, { position, count })
        queue.insert(x - 1, y, { position, count })
        queue.insert(x, y + 1, { position, count })
        queue.insert(x, y - 1, { position, count })
        queue.insert(x - 1, y - 1, { position, count })
        queue.insert(x + 1, y - 1, { position, count })
        queue.insert(x + 1, y + 1, { position, count })
        queue.insert(x - 1, y + 1, { position, count })
    }

    return false

}

render(map)
renderHistory()
