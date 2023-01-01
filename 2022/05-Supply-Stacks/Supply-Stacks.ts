/*
 * https://adventofcode.com/2022/day/5
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let lines: string[] = []
let readingMoves = false
let cargo: string[][] = []

function processLine(l: string) {
    if (l.trim() === '') {
        cargo = modelCrates(lines)
        readingMoves = true
        return
    }

    if (!readingMoves) {
        lines.push(l)
    } else {
        moveCrates(cargo, l)
    }
}

function modelCrates(lines: string[]) {
    const initChar = 1
    const steps = 4
    const rows = lines.length - 1
    const deckLength = lines[0].length
    let colNo = 0
    let cur = initChar

    let cargo: string[][] = []

    while (cur < deckLength) {
        const stack: string[] = []
        for (let i = 0; i < rows; i++) {
            const c = lines[i][cur]
            if (c.trim() !== '')
                stack.unshift(c)
        }
        cargo.push(stack)
        colNo += 1
        cur = initChar + steps * colNo
    }

    return cargo
}

function moveCrates(cargo: string[][], instruction: string) {
    const match = instruction.match(/move (?<howMany>\d+) from (?<src>\d+) to (?<dest>\d+)/)
    if (!match)
        throw Error('Unexpected input')

    let howMany = Number(match.groups?.howMany || 0)
    const src = Number(match.groups?.src || 0) - 1
    const dest = Number(match.groups?.dest || 0) - 1

    while(howMany--) {
        const crate = cargo[src].pop()
        if (!crate) throw Error('Crate not found')
        cargo[dest].push(crate)
    }
}

function findAnswer() {
    const topCrates = []
    for (let col of cargo) {
        topCrates.push(col.at(-1))
    }
    console.log(topCrates.join(''))
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)

/* 
 * Answers
 * Part 1: X
 * Part 2: X
 */


