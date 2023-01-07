import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let trees: number[][] = []

function processLine(l: string) {
    trees.push(l.split('').map(Number))
}

function findAnswer() {
    let visibles = new Set<string>()
    const len = trees.length

    for (let i = 0; i < len; i++) {
        let max = -1
        for (let j = 0; j < len; j++) {
            if (trees[i][j] > max) {
                visibles.add(`${i},${j}`)
                max = trees[i][j]
            }
        }
    }

    for (let i = 0; i < len; i++) {
        let max = -1
        for (let j = 0; j < len; j++) {
            if (trees[j][i] > max) {
                visibles.add(`${j},${i}`)
                max = trees[j][i]
            }
        }
    }

    for (let i = len - 1; i >= 0; i--) {
        let max = -1
        for (let j = len - 1; j >= 0; j--) {
            if (trees[j][i] > max) {
                visibles.add(`${j},${i}`)
                max = trees[j][i]
            }
        }
    }

    for (let i = len - 1; i >= 0; i--) {
        let max = -1
        for (let j = len - 1; j >= 0; j--) {
            if (trees[i][j] > max) {
                visibles.add(`${i},${j}`)
                max = trees[i][j]
            }
        }
    }

    // showResult(visibles, len)
    console.log(visibles.size)
}

class Score {
    up = 0
    down = 0
    left = 0
    right = 0
}

function findAnswer2() {
    const len = trees.length

    let scores: Score[] = []

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            let score = new Score()
            for (let n = i - 1; n >= 0; n--) {
                score.up += 1
                if (trees[n][j] >= trees[i][j]) break
            }

            for (let n = i + 1; n < len; n++) {
                score.down += 1
                if (trees[n][j] >= trees[i][j]) break
            }

            for (let n = j - 1; n >= 0; n--) {
                score.left += 1
                if (trees[i][n] >= trees[i][j]) break
            }

            for (let n = j + 1; n < len; n++) {
                score.right += 1
                if (trees[i][n] >= trees[i][j]) break
            }
            scores.push(score)
        }
    }

    let max = 0
    for (let s of scores) {
        const val = s.up * s.down * s.left * s.right
        if (val > max) max = val
    }
    console.log('Max: ', max)
}

function showResult(visible: Set<string>, len: number) {
    let arr: string[][] = []
    for (let i = 0; i < len; i++) {
        let row = []
        for (let j = 0; j < len; j++) {
            row.push(visible.has(`${i},${j}`) ? 'X' : ' ')
        }
        arr.push(row)
    }
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer2)

