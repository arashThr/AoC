import { createReadStream } from 'fs'
import { createInterface } from 'readline'

const rl = createInterface({
    input: createReadStream('input.txt')
})

let prev = 0
let increases = 0
let win: number[] = []

rl.on('line', l => {
    const len = win.length
    let cur = Number(l)
    win.push(cur)
    if (len < 3) {
        prev += cur
        return
    }

    const sum = prev - win[0] + cur
    if (sum > prev)
        increases += 1
    prev = sum
    win.shift()
})

rl.on('close', () => {
    console.log('Increases: ', increases)
})

