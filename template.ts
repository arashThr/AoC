/*
 * Advent of code: Day N - Part 1|2
 * https://adventofcode.com/2021/day/N
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { strict as assert } from 'assert'

let lines: string[] = []

function processLine(l: string) {
}

function findAnswer() {
}

const filePath = process.argv[2] ? './sample.txt' :'./input.txt'
const rl = createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)

