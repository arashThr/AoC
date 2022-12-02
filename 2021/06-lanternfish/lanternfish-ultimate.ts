/*
 * Advent of code: Day 6: Lanternfish, part 2
 * https://adventofcode.com/2021/day/6
 */

import { readFile } from '../modules/fileReader'

const ROUNDS = 256, LIVE_PERIOD = 8, REBIRTH = 6, NEW_BIRTH = 8

let lanterns = Array(LIVE_PERIOD + 1).fill(0)

readFile('./input_1.txt', processFile, findAnswer)

function processFile(line: string) {
    let initLanterns = line.split(',').map(Number)
    console.log(`There are ${initLanterns.length} lanterns at start`)
    for (let l of initLanterns)
        lanterns[l] += 1
}

function findAnswer() {
    for (let round = 0; round < ROUNDS; round++) {
        let prevGenCount = 0
        for (let generation = LIVE_PERIOD; generation >= 0; generation--) {
            let thisGeneration = lanterns[generation]
            lanterns[generation] = prevGenCount
            prevGenCount = thisGeneration
        }
        lanterns[REBIRTH] += prevGenCount
        lanterns[NEW_BIRTH] += prevGenCount
    }

    console.log(`Find number of lanterns after ${ROUNDS} rounds: ${
        lanterns.reduce((sum, cur) => sum += cur)
    }`)
}

