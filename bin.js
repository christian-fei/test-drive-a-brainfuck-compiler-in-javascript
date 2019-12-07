#!/usr/bin/env node

const brainfuck = require('.')

main(process.argv[2])
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

async function main (program) {
  return brainfuck.run(program)
}
