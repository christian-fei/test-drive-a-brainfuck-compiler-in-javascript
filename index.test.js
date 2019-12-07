#!/usr/bin/env node

const assert = require('assert')

assert.ok(brainfuck(''), 'result is defined')
assert.deepStrictEqual(brainfuck(''), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'empty memory initialized with 10 bytes, pointer set to 0')

assert.deepStrictEqual(brainfuck('>'), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 1,
  output: '',
  input: ''
}, 'increment the pointer')
assert.deepStrictEqual(brainfuck('>>>>>>>>>>>'), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 10,
  output: '',
  input: ''
}, 'do not increment the pointer above 10')

assert.deepStrictEqual(brainfuck('<', {
  memory: [],
  loops: [],
  looping: false,
  pointer: 1,
  output: '',
  input: ''
}), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'decrement the pointer')

assert.deepStrictEqual(brainfuck('<'), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'do not decrement the pointer below 0')

assert.deepStrictEqual(brainfuck('+'), {
  memory: [1],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'increment the byte at the pointer')

assert.deepStrictEqual(brainfuck('-', {
  memory: [1],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [0],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'decrement the byte at the pointer')

assert.deepStrictEqual(brainfuck('.', {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '\u0000',
  input: ''
}, 'output the byte at the pointer')

assert.deepStrictEqual(brainfuck(',', {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: '\u0001'
}), {
  memory: [1],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'input a byte and store it in the byte at the pointer')

assert.deepStrictEqual(brainfuck('[', {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loops: [0],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'jump forward past the matching ] if the byte at the pointer is zero')

assert.deepStrictEqual(brainfuck(']', {
  memory: [],
  loops: [],
  looping: true,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'ends loops with matching ]')

assert.deepStrictEqual(brainfuck('[', {
  memory: [1],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [1],
  loops: [0],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'pushes commandIndex in loop stack')

assert.deepStrictEqual(brainfuck('>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.', {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [100, 87, 33, 0],
  loops: [],
  looping: false,
  pointer: 2,
  output: 'Hello, World!',
  input: ''
}, 'compiles "Hello, world!" program')

function brainfuck (commands = '', { memory = [], loops = [], looping = false, innerLoops = 0, pointer = 0, output = '', input = '' } = {}) {
  for (let commandIndex = 0; commandIndex < commands.length; commandIndex++) {
    const command = commands[commandIndex]
    if (looping) {
      if (command === '[') innerLoops++
      if (command === ']') {
        if (innerLoops === 0) looping = false
        else innerLoops--
      }
      continue
    }

    if (command === '>' && pointer < 10) pointer++
    if (command === '<' && pointer > 0) pointer--
    if (command === '+') memory[pointer] ? memory[pointer]++ : memory[pointer] = 1
    if (command === '-') memory[pointer] ? memory[pointer]-- : memory[pointer] = 0
    if (command === '.') output += String.fromCharCode(memory[pointer])
    if (command === ',' && input.length > 0) {
      memory[pointer] = input.slice(0, 1).charCodeAt()
      input = input.slice(1)
    }
    if (command === '[') {
      if (memory[pointer] === 0) {
        looping = true
      } else {
        loops.push(commandIndex)
      }
    }
    if (command === ']') {
      if (memory[pointer] !== 0) {
        commandIndex = loops[loops.length - 1]
      } else {
        loops.pop()
      }
    }
  }
  return { memory, loops, looping, pointer, output, input }
}
