#!/usr/bin/env node

const brainfuck = require('.')

main(process.argv[2], process.argv[3])
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

async function main (commands, input = '') {
  let state = { commandIndex: 0, input }
  commands = commands.replace(/ /gi, '')
  while (state.commandIndex < commands.length) {
    state = brainfuck.interpret(commands[state.commandIndex], state)
    if (state.output) {
      process.stdout.write(state.output)
      state.output = ''
      // await new Promise((resolve) => setTimeout(resolve, 1))
    }
  }

  // return brainfuck.run(commands)
}
