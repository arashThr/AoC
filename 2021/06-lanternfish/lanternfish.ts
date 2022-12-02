/*
 * Advent of code: Day 6: Lanternfish
 * https://adventofcode.com/2021/day/6
 */

import { readFile } from '../modules/fileReader'

let lanterns: number[] = []
const ROUNDS = 80

readFile('./input_1.txt', processFile, findAnswer)

function processFile(l: string) {
    lanterns = l.split(',').map(Number)
    console.log(`There are ${lanterns.length} lanterns at start`)
}

function findAnswer() {
    for (let rounds = ROUNDS; rounds > 0; rounds--) {
        let curLanterns = lanterns.length
        for (let i = 0; i < curLanterns; i++) {
            if (lanterns[i] === 0) {
                lanterns[i] = 6
                lanterns.push(8)
            } else {
                lanterns[i] -= 1
            }
        }
    }

    console.log(`Find number of lanterns after ${ROUNDS} rounds: ${lanterns.length}`)
}

