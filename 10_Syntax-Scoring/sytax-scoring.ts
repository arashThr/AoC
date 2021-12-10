/*
 * Advent of code: Syntax Scoring
 * https://adventofcode.com/2021/day/10
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { strict as assert } from 'assert'

let lines: string[] = []

type Token = {
    open: string
    close: string
    score: number
    additionPoint: number
}

type TokenState = 'open' | 'close'

const tokens = [
    { open: '(', close: ')', score: 3, additionPoint: 1 },
    { open: '[', close: ']', score: 57, additionPoint: 2 },
    { open: '{', close: '}', score: 1197, additionPoint: 3 },
    { open: '<', close: '>', score: 25137, additionPoint: 4 },
]

function getToken(c: string): [Token, TokenState] {
    let open = tokens.findIndex(t => t.open === c)
    if (open !== -1)
        return [tokens[open], 'open']
    let close = tokens.findIndex(t => t.close === c)
    if (close !== -1)
        return [tokens[close], 'close']
    throw new Error('Undefined token')
}

function processLine(l: string) {
    lines.push(l)
}

function findAnswer() {
    let score = 0
    let additionPoints = []
    for (let l of lines) {
        let mismatch = hasMismatch(l)
        if (typeof mismatch === 'number')
            additionPoints.push(mismatch)
        else
            score += mismatch.score
    }
    console.log(`Total: ${score} - Additional points: ${additionPoints.sort((a, b) => a - b)[Math.floor(additionPoints.length / 2)]}`)
}

function hasMismatch(line: string): Token | number {
    const stack: string[] = []
    for (let c of line.split('')) {
        let [t, state] = getToken(c)
        if (state === 'open') {
            stack.push(t.open)
            continue
        }
        let expectedOpen = stack.pop()
        if (t.open !== expectedOpen) {
            return t
        }
    }

    // Close everything remained in the stack
    let totalMul = 0
    for (let c of stack.reverse()) {
        let [t, state] = getToken(c)
        assert(state === 'open')
        totalMul = totalMul * 5 + t.additionPoint
    }
    return totalMul
}

const filePath = process.argv[2] ? './sample.txt' :'./input.txt'
const rl = createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)

