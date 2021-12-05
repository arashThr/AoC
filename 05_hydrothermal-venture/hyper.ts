/*
 * Advent of code: Day 5: Hydrothermal Venture - Part 1
 * https://adventofcode.com/2021/day/5
 */

import { readFile } from '../modules/fileReader'

const MAX_VAL = 1000
readFile('./input_1.txt', processFile, findLinesCrossings)

class Point {
    x: number
    y: number

    constructor(x: string, y: string) {
        this.x = Number(x)
        this.y = Number(y)
    }
}

const lines: [Point, Point][] = []
const map: number[][] = [...Array(MAX_VAL)].map(_ => Array(MAX_VAL).fill(0))

function processFile(l: string) {
    let [_, x1, y1, x2, y2] = l.match(/^(\d+),(\d+) -> (\d+),(\d+)$/)!
    const p1 = new Point(x1, y1)
    const p2 = new Point(x2, y2)
    if ([p1.x, p1.y, p2.x, p2.y].some(n => n >= 1000))
        throw Error('Unexpected value')
    if (p1.x <= p2.x)
        lines.push([p1, p2])
    else
        lines.push([p2, p1])
}

function findLinesCrossings() {
    for (let [p1, p2] of lines) {
        if (p1.x === p2.x) {
            for (let i = Math.min(p1.y, p2.y); i <= Math.max(p1.y, p2.y); i++) {
                map[p1.x][i] += 1
            }
        }
        else if (p1.y === p2.y) {
            for (let i = Math.min(p1.x, p2.x); i <= Math.max(p1.x, p2.x); i++) {
                map[i][p1.y] += 1
            }
        }
    }

    let counter = 0
    for (let i = 0; i < MAX_VAL; i++) {
        for (let j = 0; j < MAX_VAL; j++) {
            if (map[i][j] > 1)
            counter += 1
        }
    }
    console.log('Counter: ' + counter)
}

