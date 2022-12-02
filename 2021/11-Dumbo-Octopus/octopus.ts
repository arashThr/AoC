/*
 * Advent of code: Dumbo Octopus
 * https://adventofcode.com/2021/day/11
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { strict as assert } from 'assert'

let lines: string[] = []
let energyLeveles: number[][] = []
const ITERATIONS = 100

class Octopus {
    x: number
    y: number
    energyLevel: number
    glowing: boolean = false
    adjacents?: Octopus[]

    constructor(x: number, y: number, el: number) {
        this.x = x
        this.y = y
        this.energyLevel = el
    }

    glow() {
        this.glowing = true
        this.adjacents ??= this.getAdjacents()
        for (let adj of this.adjacents) {
            adj.energyLevel += 1
            if (!adj.glowing && adj.energyLevel > 9) {
                adj.glowing = true
                adj.glow()
            }
        }
    }

    getAdjacents() {
        let adjacents = []
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) continue
                let adj = octopuses?.[this.x + i]?.[this.y + j]
                if (adj) adjacents.push(adj)
            }
        }
        return adjacents
    }
}

let octopuses: Octopus[][] = []

function processLine(l: string) {
    energyLeveles.push(l.split('').map(Number))
}

function findAnswer1_iterate(iterations: number) {
    let flashes = 0
    while (iterations--) {
        flashes += addLifeCycle()
    }
    console.log('Flashes: ' + flashes)
}

function findAnswer2_allFlash() {
    let total = octopuses.flat().length
    let step = 1
    while (addLifeCycle() !== total)
        step += 1
    console.log('Steps to flash all: ' + step)
}

function addLifeCycle(): number {
    let octs = octopuses.flat()
    let totalGlow = 0
    for (let o of octs) {
        o.energyLevel += 1
        if (o.energyLevel < 10 || o.glowing)
            continue
        o.glow()
    }
    for (let o of octs.filter(o => o.glowing)) {
        totalGlow += 1
        o.energyLevel = 0
        o.glowing = false
    }
    return totalGlow
}

const filePath = process.argv[2] ? './sample.txt' :'./input.txt'
const rl = createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', () => {
    for (let i = 0; i < energyLeveles.length; i++) {
        let row: Octopus[] = []
        for (let j = 0; j < energyLeveles[i].length; j++) {
            row.push(new Octopus(i, j, energyLeveles[i][j]))
        }
        octopuses.push(row)
    }
    findAnswer1_iterate(ITERATIONS)
    findAnswer2_allFlash()
})

