import { createReadStream } from 'fs'
import { createInterface } from 'readline'

const rl = createInterface({
    input: createReadStream('input.txt')
})

let prev = Infinity
let increament = 0

rl.on('line', l => {
    const cur = Number(l)
    if (cur > prev)
        increament += 1
    prev = cur
})

rl.on('close', () => {
    console.log('Number of increases: ', increament)
})

