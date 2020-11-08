/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-11-08 16:06:36
 * @LastEditTime: 2020-11-08 18:51:55
 * @Description: file content
 */
class BinaryHeap {
    queue = [null]
    updQueue = []
    compare = null

    constructor(start, compare) {
        this.compare = compare
        this.queue.push(start)
    }

    refreshDown(startIndex) {
        const len = this.queue.length
        this.updQueue = [startIndex]
        let li, ri, temp
        while (this.updQueue.length) {
            const i = this.updQueue.shift()
            li = 2 * i
            ri = li + 1

            if (li < len && this.compare(this.queue[i], this.queue[li]) < 0) {
                temp = this.queue[i], this.queue[i] = this.queue[li], this.queue[li] = temp
                this.updQueue.push(li)
            }
            if (ri < len && this.compare(this.queue[i], this.queue[ri]) < 0) {
                temp = this.queue[i], this.queue[i] = this.queue[ri], this.queue[ri] = temp
                this.updQueue.push(ri)
            }
        }
    }

    refreshUp(startIndex) {
        this.updQueue = [startIndex]
        let /*parent index*/pi, temp

        while (this.updQueue.length) {
            const i = this.updQueue.shift()

            pi = Math.floor(i / 2)

            if (pi > 0 && this.compare(this.queue[i], this.queue[pi]) > 0) {
                temp = this.queue[i], this.queue[i] = this.queue[pi], this.queue[pi] = temp
                this.updQueue.push(pi)
            }
        }
    }

    push(v) {
        this.queue.push(v)
        this.refreshUp(this.queue.length - 1)
    }

    shift() {
        let len = this.queue.length - 1
        if (len === 0) return
        if (len === 1) return this.queue.pop()

        let rst = this.queue[1]
        this.queue[1] = this.queue[len]
        this.queue.length = len

        this.refreshDown(1)

        return rst
    }

    get length() {
        return this.queue.length - 1
    }

    // update(findCb, newValue) {
    //     const i = this.queue.findIndex(findCb)

    //     console.log(i)

    //     if (i < 1) return false
    //     const rst = this.compare(newValue, this.queue[i])
    //     this.queue[i] = newValue
    //     console.log(rst)
    //     if (rst < 0) {
    //         this.refreshDown(i)
    //         return
    //     }
    //     if (rst > 0) {
    //         this.refreshUp(i)
    //     }
    // }

}
