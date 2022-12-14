import { parseCommand } from "./Parser"

describe('File system navigation', () => {
    test('start from root', () => {
        expect(1).toBe(1)
    })

    test('get the command', () => {
        const cmds = [
            { in: '$ ls', out: { command: 'ls' } },
            { in: '$ cd /', out: { command: 'cd', arg: '/' } },
            { in: '$ cd ..', out: { command: 'cd', arg: '..' } },
            { in: '$ cd blah', out: { command: 'cd', arg: 'blah' } },
        ]

        for (let cmd of cmds) {
            expect(parseCommand(cmd.in)).toStrictEqual(cmd.out)
        }
    })

    test('parse command output', () => {
        const cmds = [
            { in: 'dir lala', out: { type: 'dir', dirName: 'lala' } },
            { in: '12 file.text', out: { type: 'file', fileName: 'file.text', size: 12 } },
        ]

        for (let cmd of cmds) {
            expect(parseCommand(cmd.in)).toStrictEqual(cmd.out)
        }
    })
})

