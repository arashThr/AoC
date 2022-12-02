/*
 * Advent of code, Day 4: Giant Squid
 * https://adventofcode.com/2021/day/4
 */

import { readFile } from '../modules/fileReader'
import { strict as assert } from 'assert';

type Slot = {
    num: number
    drawn: boolean
}

class Card {
    rowSize: number = 0
    slots: Slot[][] = []

    addRow(nums: number[]) {
        assert(nums.length === this.rowSize, 'Size mismatch')
        this.slots.push(nums.map(n => ({
            num: n,
            drawn: false
        })))
    }

    drawNumber(num: number) {
        for (let row of this.slots) {
            for (let slot of row) {
                if (slot.num === num)
                    slot.drawn = true
            }
        }
        return this.checkCard()
    }

    checkCard(): boolean {
        for (let row of this.slots) {
            if (row.every(r => r.drawn))
                return true
        }

        for (let i = 0; i < this.rowSize; i++) {
            let allDrawn = true
            for (let j = 0; j < this.slots.length; j++) {
                allDrawn &&= this.slots[i][j].drawn
            }
            if (allDrawn)
                return true
        }
        return false
    }

    calculateScore(num: number) {
        let unmarkedSum = 0
        for (let slot of this.slots.flat()) {
            if (!slot.drawn)
                unmarkedSum += slot.num
        }
        return num * unmarkedSum
    }
}

function createCards(l: string) {
    if (numbers.length === 0) {
        numbers = l.split(',').map(Number)
        return
    }

    if (l.trim() === '') {
        const cardId = board.length
        board.push(new Card())
        return
    }

    const card = board.at(-1)
    const nums = l.match(/\d\d?/g)
    if (!card || !nums) throw Error('Bad input')
    card.rowSize ||= nums.length
    card.addRow(nums.map(Number))
}


const board: Card[] = []
let numbers: number[] = []

function playGame() {
    for (let num of numbers) {
        for (let card of board) {
            const cardWon = card.drawNumber(num)
            if (cardWon) {
                console.log('Puzzle answer:', card.calculateScore(num))
                return
            }
        }
    }
}

readFile('./input_1.txt', createCards, playGame)

