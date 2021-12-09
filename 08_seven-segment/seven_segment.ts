/*
 * Day 8: Seven Segment Search
 * https://adventofcode.com/2021/day/8
 */

import { readFile } from '../modules/fileReader'
import { strict as assert } from 'assert'

readFile('./input_1.txt', processFile, findSecondAnswer)

let lines: string[] = []
let numCount: number[] = Array(7).fill(0)
const numMap = new Map<string, number>()

let patterns = {
    acedgfb: 8,
    cdfbe: 5,
    gcdfa: 2,
    fbcad: 3,
    dab: 7,
    cefabd: 9,
    cdfgeb: 6,
    eafb: 4,
    cagedb: 0,
    ab: 1,
}

Object.entries(patterns).forEach(([k, v]) => numMap.set(k.split('').sort().join(''), v))

function processFile(l: string) {
    lines.push(l)
}

function findFirstAnswer() {
    for (let l of lines) {
        for (let digit of l.split(' | ')[1].split(' ')) {
            numCount[digit.length - 1] += 1
        }
    }
    console.log('Result: ' + (numCount[1] + numCount[3] + numCount[2] + numCount[6]))
}

function findSecondAnswer() {
    for (let l of lines) {
        let total = 0
        for (let digits of l.split(' | ')[1].split(' ')) {
            let digit
            if (digits.length == 2) {
                digit = 1
            } else if (digits.length == 3) {
                digit = 7
            } else if (digits.length == 4) {
                digit = 4
            } else if (digits.length == 7) {
                digit = 8
            } else {
                const key = digits.split('').sort().join('')
                console.log('key: ' + key)
                digit = numMap.get(key)
            }
            console.log('digit: ' + digit + ' - digits: ' + digits)
            assert(digit)
            total = total * 10 + digit
        }
        console.log('total: ' + total)
    }

}

