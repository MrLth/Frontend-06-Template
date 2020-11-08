/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-11-08 18:14:38
 * @LastEditTime: 2020-11-08 19:05:50
 * @Description: file content
 */
class PathQueue {
    queue = []
    F = null

    constructor(start, F) {
        this.F = F
        this.queue.push(start)
    }

    push(v) {
        this.queue.push(v)
    }

    shift() {
        // return this.queue.shift()
        let minI = 0
        let minV = this.F(this.queue[0])
        const len = this.length
        for (let i = 1; i < len; i++) {
            let v = this.F(this.queue[i])
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