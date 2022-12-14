/*
 * https://adventofcode.com/2022/day/7
 */

import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'
import { Directory, parseCommand } from './Parser'
import { strict as assert } from 'assert'

let cwd: Directory

function processLine(l: string) {
    const output = parseCommand(l)

    if ('command' in output && output.command === 'cd') {
        if (output.arg === '..') {
            assert(cwd.parent)
            cwd = cwd.parent
        }
        else {
            cwd = cwd ? cwd.getSubDir(output.arg) : new Directory('/', null)
        }
    } else if ('type' in output) {
        if (output.type === 'file') {
            cwd.files.push({ fileName: output.fileName, size: output.size })
        } else {
            cwd.subDirs.push(new Directory(output.dirName, cwd))
        }
    }
}

let total = 0

function findAnswer() {
    while (cwd.parent)
        cwd = cwd.parent

    findTotal(cwd)
    console.log(`Total: ${total}`)
}

function findTotal(dir: Directory) {
    if (dir.size <= 100000)
        total += dir.size

    for (let ch of dir.subDirs)
        findTotal(ch)
}

function start() {
    const filePath = pathJoin(__dirname, process.argv[2])
    createInterface({
        input: createReadStream(filePath)
    })
    .on('line', processLine)
    .on('close', findAnswer)
}

start()

/* 
 * Answers
 * Part 1: 1297683
 * Part 2: X
 */

