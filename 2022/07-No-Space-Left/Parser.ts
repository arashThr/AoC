type File = {
    fileName: string
    size: number
}

export class Directory {
    dirName: string
    files: File[] = []
    parent: Directory | null
    subDirs: Directory[] = []

    private _size: number | null = null

    constructor(dirName: string, parent: Directory | null) {
        this.dirName = dirName
        this.parent = parent
    }

    get size(): number {
        if (!this._size)
            this._size = this.files.reduce((acc, f) => acc + f.size, 0) + this.subDirs.reduce((acc, dir) => acc + dir.size, 0)
        return this._size
    }

    getSubDir(dirName: string): Directory {
        for (let dir of this.subDirs) {
            if (dir.dirName === dirName)
                return dir
        }
        throw new Error('Directory not found: ' + dirName)
    }
}

type Command = {
    command: 'ls'
} | {
    command: 'cd',
    arg: string
}

type Node = {
    type: 'dir'
    dirName: string
} | {
    type: 'file'
    fileName: string
    size: number
}

export function parseCommand(line: string): Command | Node {
    const cmdMatch = line.match(/\$ (?<cmd>cd|ls)[ ]?(?<args>.*)/)
    if (cmdMatch) {
        if (cmdMatch.groups?.cmd === 'ls')
            return { command: 'ls' }
        if (cmdMatch.groups?.cmd === 'cd')
            return { command: 'cd', arg: cmdMatch.groups.args }
        throw Error('Unknown command: ' + line)
    }

    const dirMatch = line.match(/dir (?<dirName>.+)/)
    if (dirMatch && dirMatch.groups?.dirName) {
        return { type: 'dir', dirName: dirMatch.groups.dirName }
    }

    const fileMatch = line.match(/(?<size>\d+) (?<name>.+)/)
    if (fileMatch) {
        const fileName = fileMatch.groups?.name
        const size = fileMatch.groups?.size
        if (fileName && size)
            return { type: 'file', fileName, size: parseInt(size) }
   }

    throw Error('Found no match for the line: ' + line)
}

