/*
 * https://adventofcode.com/2022/day/4
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let totalOverlap = 0

function processLine(l: string) {
  const [firstRange, secondRange] = getRanges(l)

  const [larger, smaller] = firstRange.len > secondRange.len
    ? [firstRange, secondRange]
    : [secondRange, firstRange]

  if (larger.start <= smaller.start && larger.end >= smaller.end)
    totalOverlap += 1
}

class Location {
  start: number
  end: number

  constructor(x: number, y: number) {
    this.start = x
    this.end = y
  }

  get len() {
    return Math.abs(this.end - this.start)
  }
}

function getRanges(l: string): [Location, Location] {
  const [a, b, x, z] = l.split(',').flatMap(p => p.split('-')).map(Number)
  return [
    new Location(a, b),
    new Location(x, z)
  ]
}

function findAnswer() {
  console.log('Total number of overlaps: ' + totalOverlap)
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)

