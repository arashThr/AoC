import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

type Motion = {
    len: number
    dir: string
}

const motions: Motion[] = []

function processLine(l: string) {
    const [dir, len] = l.split(' ')
    motions.push({len: Number(len), dir})
}

type Position = {
    x: number
    y: number
}

function solvePartOne() {
    const headPos: Position = { x: 0, y: 0 }
    const tailPos: Position = { x: 0, y: 0 }
    const visited = new Set<string>(['0,0'])

    for (let m of motions) {
        for (let i = 0; i < m.len; i++) {
            const prevPos = { x: headPos.x , y: headPos.y }

            updateHead(headPos, m)

            if (areAdjecent(headPos, tailPos))
                continue

            tailPos.x = prevPos.x
            tailPos.y = prevPos.y
            visited.add(`${tailPos.x},${tailPos.y}`)
        }
    }

    console.log(visited.size)
}

function solvePartTwo() {
    const knots: Position[] = Array.from(new Array(10)).map(() => ({ x: 0, y: 0}))
    const visited = new Set<string>(['0,0'])

    for (let m of motions) {
        for (let i = 0; i < m.len; i++) {
            const head = knots[0]

            updateHead(head, m)

            for (let i = 1; i < knots.length; i++) {
                moveKnots(knots[i-1], knots[i])
            }

            visited.add(`${knots.at(-1)!.x},${knots.at(-1)!.y}`)
        }
    }
    console.log(visited.size)
}

function moveKnots(head: Position, tail: Position) {
    if (areAdjecent(head, tail)) return

    if (tail.x < head.x) tail.x += 1
    if (tail.x > head.x) tail.x -= 1
    if (tail.y < head.y) tail.y += 1
    if (tail.y > head.y) tail.y -= 1
}

function updateHead(pos: Position, m: Motion) {
    if (m.dir === 'U') pos.y += 1
    if (m.dir === 'D') pos.y -= 1
    if (m.dir === 'L') pos.x -= 1
    if (m.dir === 'R') pos.x += 1
}

function areAdjecent(head: Position, tail: Position) {
    const xd = head.x - tail.x
    const yd = head.y - tail.y
    const diff = Math.abs(xd) <= 1 && Math.abs(yd) <= 1
    return diff
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

