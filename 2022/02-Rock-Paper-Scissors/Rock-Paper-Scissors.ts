/*
 * https://adventofcode.com/2022/day/2
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let score = 0

const winCases = new Map([
    ['X', 'C'],
    ['Y', 'A'],
    ['Z', 'B']
])

function processLine(l: string) {
    const [theirMove, myMove] = l.split(' ')

    const myCode = myMove.charCodeAt(0) - 'X'.charCodeAt(0) + 1
    const theirCode = theirMove.charCodeAt(0) - 'A'.charCodeAt(0) + 1
    score += myCode

    if (theirCode === myCode) {
        score += 3
    } else if (winCases.get(myMove) === theirMove) {
        score += 6
    }
}

function findAnswer() {
    console.log('Score: ' + score)
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)


