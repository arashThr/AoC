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
.on('close', findAnswer)

