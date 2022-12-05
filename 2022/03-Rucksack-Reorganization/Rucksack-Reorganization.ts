/*
 * https://adventofcode.com/2022/day/3
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'
import { strict as assert } from 'assert'

let part1Total = 0
const lines: string[] = []

function calcPriority(l: string) {
    return l.split('').map(c => c.toLowerCase() == c
        ? c.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        : c.charCodeAt(0) - 'A'.charCodeAt(0) + 27)
}

function part1(l: string) {
    const priorities = calcPriority(l)
    part1Total += findCommon(priorities)
}

function part2(l: string) {
  lines.push(l)
}

function findCommon(priorities: number[]): number {
    const mid = priorities.length / 2
    const small = priorities.slice(0, mid)
    const big = priorities.slice(mid)

    for (let i = 0; i < mid; i++) {
        for (let j = 0; j < mid * 2; j++) {
            if (small[i] == big[j])
                return small[i]
        }
    }
    throw Error('Common not found')
}

function findPart1Answer() {
    console.log('Total: ' + part1Total)
}

function findPart2Answer() {
  assert(lines.length % 3 === 0)
  const alphabet = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ']
  let total = 0

  for (let start = 0; start < lines.length; start+= 3) {
    const group = lines.slice(start, start + 3)
    for (let a of alphabet) {
      const hasItem = group.every(member => member.includes(a))
      if (hasItem) {
        total += calcPriority(a)[0]
        break
      }
    }
  }
  console.log('Total for part 2: ' + total)
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', part2)
.on('close', findPart2Answer)

