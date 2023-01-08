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

function findAnswer() {
    const headPos: Position = { x: 0, y: 0 }
    const tailPos: Position = { x: 0, y: 0 }
    const visited = new Set<string>(['0,0'])

    for (let m of motions) {
        for (let i = 0; i < m.len; i++) {
            const prevPos = { x: headPos.x , y: headPos.y }

            if (m.dir === 'U') headPos.y += 1
            if (m.dir === 'D') headPos.y -= 1
            if (m.dir === 'L') headPos.x -= 1
            if (m.dir === 'R') headPos.x += 1

            if (areAdjecent(headPos, tailPos))
                continue

            tailPos.x = prevPos.x
            tailPos.y = prevPos.y
            visited.add(`${tailPos.x},${tailPos.y}`)
        }
    }

    console.log(visited.size)
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
.on('close', findAnswer)

