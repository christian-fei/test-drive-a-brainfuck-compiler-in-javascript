#!/usr/bin/env node

const assert = require('assert')

const result = brainfuck('')
assert.ok(result, 'result is defined')
assert.deepStrictEqual(result, {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0
}, 'empty memory initialized with 10 bytes, pointer set to 0')

assert.deepStrictEqual(brainfuck('>'), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 1
}, 'increment pointer')

function brainfuck (commands = '') {
  const memory = Array(10).fill(0)
  let pointer = 0
  for (const command of commands) {
    if (command === '>') pointer++
  }
  return { memory, pointer }
}
