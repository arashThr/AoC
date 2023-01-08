import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let lines: string[] = []

function processLine(l: string) {
    lines.push(l)
}

function solvePartOne() {
    throw Error('Not implemented')
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
    solvePartTwo()
})

