/*
 * Advent of code: Day 9, Smoke Basin
 * https://adventofcode.com/2021/day/9
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'

let lines: number[][] = []

type Hole = {
    x: number
    y: number
    height: number
}

function processLine(l: string) {
    lines.push(l.split('').map(Number))
}

const access = (x: number, y: number): Hole | null =>
    x < 0 || x >= lines.length ? null :
    y < 0 || y >= lines[x].length ? null :
    {x, y, height: lines[x][y] }

const getKey = (x: number, y: number) => `${x} ${y}`

function getNeighbours(x: number, y: number): Hole[] {
    return [
        access(x-1, y),
        access(x+1, y),
        access(x, y-1),
        access(x, y+1),
    ].filter(n => n != null) as Hole[]
}

function findAnswer() {
    let basinSize: number[] = []
    let total = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const neighbours = getNeighbours(i, j)
            if (neighbours.every(n => n.height > lines[i][j])) {
                total += lines[i][j] + 1
                basinSize.push(findBasinSize(i, j))
            }
        }
    }
    console.log('Answer 1: ' + total)
    basinSize.sort((a, b) => b - a)
    console.log('Answer 2: ' + (basinSize[0] * basinSize[1] * basinSize[2]))
}

function findBasinSize(x: number, y: number, basin: Set<string> = new Set<string>()): number {
    const key = getKey(x, y)
    if (basin.has(key))
        return 0
    basin.add(key)

    return 1 + getNeighbours(x, y)
        .filter(n => n.height < 9 && !basin.has(getKey(n.x, n.y)))
        .map(n => findBasinSize(n.x, n.y, basin))
        .reduce((total, size) => total + size, 0)
}

const filePath = process.argv[2] ? './sample.txt' :'./input.txt'
const rl = createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)

