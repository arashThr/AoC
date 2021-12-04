/*
 * Advent of code, day 3
 * https://adventofcode.com/2021/day/3
 */

import { readFile } from '../modules/fileReader'

let rates = { total: 0, size: 0, aggregate: Array<number>() }

function processData(l: string) {
    if (rates.size === 0) {
        rates.size = l.length
        rates.aggregate = Array(rates.size).fill(0)
    }

    rates.total += 1
    const bits = l.split('').map(Number)
    for (let i = 0; i < rates.size; i++) {
        const bit = bits[i]
        if (bit === 1)
            rates.aggregate[i] += 1
    }
}

function calcResults() {
    const gamma = []
    const epsilon = []
    for (let sumOfOnes of rates.aggregate) {
        let isOneMore = sumOfOnes > rates.total / 2 ? 1 : 0;
        gamma.push(isOneMore)
        epsilon.push(isOneMore ^ 1)
    }
    const gammaBin = gamma.join('')
    const epsilonBin = epsilon.join('')
    console.log(`Gamma: ${gammaBin} - Epsilon ${epsilonBin} - Mul: ${parseInt(gammaBin, 2) * parseInt(epsilonBin, 2)}`)
}

readFile('./input_1.txt', processData, calcResults)

