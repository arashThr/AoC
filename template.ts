/*
 * https://adventofcode.com/2022/day/N
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { strict as assert } from 'assert'
import { join as pathJoin } from 'path'

let lines: string[] = []

function processLine(l: string) {
}

function findAnswer() {
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)

