/*
 * Advent of code: Day 1
 * https://adventofcode.com/2021/day/1
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

let maxCalories: number[] = [0, 0, 0]
let elfCalories = 0

function getMaxList(maxList: number[], newNum: number) {
  if (newNum < Math.min(...maxList))
    return maxList
  return [...maxList, newNum].sort((a, b) => b - a).slice(0, 3)
}

function processLine(l: string) {
  const calories = l.trim()
  if (calories) {
    elfCalories += parseInt(calories)
  } else {
    maxCalories = getMaxList(maxCalories, elfCalories)
    elfCalories = 0
  }
}

function findAnswer() {
  console.log(`Max calories: ${maxCalories.reduce((a, b) => a + b)}`)
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)
.on('close', findAnswer)

