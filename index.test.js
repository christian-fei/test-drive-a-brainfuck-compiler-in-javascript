#!/usr/bin/env node

const assert = require('assert')

assert.ok(brainfuck(''), 'result is defined')
assert.deepStrictEqual(brainfuck(''), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: ''
}, 'empty memory initialized with 10 bytes, pointer set to 0')

assert.deepStrictEqual(brainfuck('>'), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 1,
  output: '',
  input: ''
}, 'increment the pointer')
assert.deepStrictEqual(brainfuck('>>>>>>>>>>>'), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 10,
  output: '',
  input: ''
}, 'do not increment the pointer above 10')

assert.deepStrictEqual(brainfuck('<', {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 1,
  output: '',
  input: ''
}), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: ''
}, 'decrement the pointer')

assert.deepStrictEqual(brainfuck('<'), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: ''
}, 'do not decrement the pointer below 0')

assert.deepStrictEqual(brainfuck('+'), {
  memory: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: ''
}, 'increment the byte at the pointer')

assert.deepStrictEqual(brainfuck('-', {
  memory: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: ''
}, 'decrement the byte at the pointer')

assert.deepStrictEqual(brainfuck('.', {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '\u0000',
  input: ''
}, 'output the byte at the pointer')

assert.deepStrictEqual(brainfuck(',', {
  memory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: '\u0001'
}), {
  memory: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  pointer: 0,
  output: '',
  input: ''
}, 'input a byte and store it in the byte at the pointer')

function brainfuck (commands = '', { pointer = 0, memory = Array(10).fill(0), output = '', input = '' } = {}) {
  for (const command of commands) {
    if (command === '>' && pointer < 10) pointer++
    if (command === '<' && pointer > 0) pointer--
    if (command === '+') memory[pointer]++
    if (command === '-') memory[pointer]--
    if (command === '.') output += String.fromCharCode(memory[pointer])
    if (command === ',' && input.length > 0) {
      memory[pointer] = input.slice(0, 1).charCodeAt()
      input = input.slice(1)
    }
  }
  return { memory, pointer, output, input }
}
