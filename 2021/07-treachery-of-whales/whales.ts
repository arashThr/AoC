/*
 * Advent of code: Day 7
 * https://adventofcode.com/2021/day/7
 */

import { readFile } from '../modules/fileReader'

readFile('./input_1.txt', processFile, findAnswer)

let crabs: number[] = []

function processFile(l: string) {
    crabs = l.split(',').map(Number).sort((a, b) => a - b)
    // crabs = [16,1,2,0,4,2,7,2,14]
}

function findAnswer() {
    let mid_floor = crabs[Math.floor(crabs.length/2)]
    console.log('Mid: ' + mid_floor)
    let fuel_floor = crabs.reduce((sum, cur) => sum + Math.abs(cur - mid_floor), 0)
    console.log(`Fuel: ${fuel_floor}`)

    let mid_ceil = crabs[Math.ceil(crabs.length/2)]
    if (mid_ceil == mid_floor)
        return
    console.log('Mid: ' + mid_ceil)
    let fuel_ceil = crabs.reduce((sum, cur) => sum + Math.abs(cur - mid_ceil), 0)
    console.log(`Fuel: ${fuel_ceil}`)
}

