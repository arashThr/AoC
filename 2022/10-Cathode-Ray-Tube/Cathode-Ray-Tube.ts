import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let lines: string[] = []

function checkCycle(cycle: number) {
    if (cycle >= nextCycle) {
        history.push(total * nextCycle)
        // console.log(`${cycle}: ${total}`)
        nextCycle += 40
    }
}

function processLine(l: string) {
    if (l === 'noop') {
        cycle += 1
        checkCycle(cycle)
    } else {
        cycle += 2
        checkCycle(cycle)
        const num = Number(l.split(' ')[1])
        total += num
    }
}

let cycle = 0
let total = 1
let nextCycle = 20
let history: number[] = []

function solvePartOne() {
    console.log('Answer: ' + history.reduce((prev, cur) => prev + cur))
}

function solvePartTwo() {
    throw Error('Not implemented')
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', () => {
    solvePartOne()
    // solvePartTwo()
})

