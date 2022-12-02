import { readFile } from '../modules/fileReader'

let forward: number = 0
let depth: number = 0

function navigate(l: string) {
    let [cmd, distStr] = l.split(' ')
    let dist = Number(distStr)
    if (cmd === 'forward') {
        forward += dist
    } else if (cmd === 'down') {
        depth += dist
    } else if (cmd === 'up') {
        depth -= dist
    } else {
        throw new Error('Unknown command: ' + cmd)
    }
}

function showDestination() {
    console.log(`F: ${forward}, Depth: ${depth}, Mul: ${forward * depth}`)
}

readFile('./input_1.txt', navigate, showDestination)
