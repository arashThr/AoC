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


function findAnswer() {
    while (cwd.parent)
        cwd = cwd.parent

    const total = findTotal(cwd)
    console.log(`Total: ${total}`)

    const size = findDirToDel(cwd)
    console.log('Size of dir to remove: ' + size)
}

function findDirToDel(cwd: Directory) {
    const total = 70_000_000
    const updateSize = 30_000_000

    const free = total - cwd.size
    const minSize = updateSize - free

    return findDir(cwd, minSize, total)
}

function findDir(cwd: Directory, minSize: number, candidateSize: number): number {
    if (cwd.size > minSize && cwd.size < candidateSize)
        candidateSize = cwd.size
    for (let ch of cwd.subDirs)
        candidateSize = findDir(ch, minSize, candidateSize)
    return candidateSize
}

function findTotal(dir: Directory) {
    let total = 0
    if (dir.size <= 100000)
        total += dir.size

    for (let ch of dir.subDirs)
        total += findTotal(ch)

    return total
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

