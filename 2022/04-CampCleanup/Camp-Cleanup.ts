/*
 * https://adventofcode.com/2022/day/4
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let totalOverlap = 0

type Location = {
  start: number
  end: number
  diff: number
}

function processPart1(l: string) {
  const [firstRange, secondRange] = getRanges(l)

  const [larger, smaller] = firstRange.diff > secondRange.diff
    ? [firstRange, secondRange]
    : [secondRange, firstRange]

  if (larger.start <= smaller.start && larger.end >= smaller.end)
    totalOverlap += 1
}

function getRanges(l: string): [Location, Location] {
  const [a, b, x, y] = l.split(',').flatMap(p => p.split('-')).map(Number)
  return [
    { start: a, end: b, diff: b - a },
    { start: x, end: y, diff: y - x },
  ]
}

function findAnswer() {
  console.log('Total number of overlaps: ' + totalOverlap)
}

function processPart2(l: string) {
  const [firstRange, secondRange] = getRanges(l)

  const combinLength = Math.max(firstRange.end, secondRange.end) - Math.min(firstRange.start, secondRange.start)
  const hasOverlap = combinLength <= firstRange.diff + secondRange.diff

  if (hasOverlap)
    totalOverlap += 1
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processPart2)
.on('close', findAnswer)

/* 
 * Answers
 * Part 1: 466
 * Part 2: 865
 */
