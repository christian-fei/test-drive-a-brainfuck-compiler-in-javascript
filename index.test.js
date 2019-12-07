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
assert.deepStrictEqual(brainfuck('>>>>>>>>>>>'), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 10
}, 'do not increment pointer above 10')

assert.deepStrictEqual(brainfuck('><'), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0
}, 'decrement pointer')

assert.deepStrictEqual(brainfuck('<'), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0
}, 'do not decrement pointer below 0')

assert.deepStrictEqual(brainfuck('+'), {
  memory: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0
}, 'increment byte at pointer')

function brainfuck (commands = '', memory = Array(10).fill(0)) {
  let pointer = 0
  for (const command of commands) {
    if (command === '>' && pointer < 10) pointer++
    if (command === '<' && pointer > 0) pointer--
    if (command === '+') memory[pointer]++
  }
  return { memory, pointer }
}
