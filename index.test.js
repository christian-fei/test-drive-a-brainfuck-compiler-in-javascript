#!/usr/bin/env node

const assert = require('assert')

const result = brainfuck('')
assert(result, 'result is defined')
assert.deepStrictEqual(result, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'empty memory initialized with 10 bytes')

function brainfuck (program = '') {
  const memory = Array(10).fill(0)
  return memory
}
