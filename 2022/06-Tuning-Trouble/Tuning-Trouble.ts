import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { join as pathJoin } from 'path'

function processLine(l: string) {
    const chars = l.split('')

    for (let i = 0; i <= l.length - 4; i++) {
        const chunk = chars.slice(i, i + 4)
        if (isUnique(chunk)) {
            console.log('Answer is: ' + (i + 4))
            break
        }
    }
}

function isUnique(chunk: string[]) {
    for (let i = 0; i < chunk.length; i++) {
        for (let j = i + 1; j < chunk.length; j++) {
            if (chunk[i] === chunk[j])
                return false
        }
    }
    return true
}

const filePath = pathJoin(__dirname, process.argv[2])
createInterface({
    input: createReadStream(filePath)
})
.on('line', processLine)

