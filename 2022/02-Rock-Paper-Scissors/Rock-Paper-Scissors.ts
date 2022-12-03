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

function part1(l: string) {
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

const responseScore = new Map([
    ['A', { win: 2, lose: 3, tie: 1 }],
    ['B', { win: 3, lose: 1, tie: 2 }],
    ['C', { win: 1, lose: 2, tie: 3 }],
])

function part2(l: string) {
    const [theirMove, resultCode] = l.split(' ')

    if (resultCode === 'Y') { // draw
        score += 3 + responseScore.get(theirMove)!.tie
    } else if (resultCode === 'X') { // lose
        score += responseScore.get(theirMove)!.lose
    } else { // win
        score += 6 + responseScore.get(theirMove)!.win
    }
}

function findAnswer() {
    console.log('Score: ' + score)
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', part2)
.on('close', findAnswer)


