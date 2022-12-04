/*
 * https://adventofcode.com/2022/day/3
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let total = 0

function processLine(l: string) {
    const digits = l.split('').map(c => c.toLowerCase() == c
        ? c.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        : c.charCodeAt(0) - 'A'.charCodeAt(0) + 27)

    total += findCommon(digits)
}

function findCommon(digits: number[]): number {
    const mid = digits.length / 2
    const small = digits.slice(0, mid)
    const big = digits.slice(mid)

    for (let i = 0; i < mid; i++) {
        for (let j = 0; j < mid * 2; j++) {
            if (small[i] == big[j])
                return small[i]
        }
    }
    throw Error('Common not found')
}

function findAnswer() {
    console.log('Totoal: ' + total)
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)

