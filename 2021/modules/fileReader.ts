import { createReadStream } from 'fs'
import { createInterface } from 'readline'

export function readFile(filePath: string, cb: (line: string) => void, end: () => void) {
    const rl = createInterface({
        input: createReadStream(filePath)
    })

    rl.on('line', l => {
        cb(l)
    })

    rl.on('close', () => {
        end()
    })
}


