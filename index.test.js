#!/usr/bin/env node

const assert = require('assert')

const brainfuck = require('.')

assert.ok(brainfuck.compile(''), 'result is defined')
assert.deepStrictEqual(brainfuck.compile(''), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'empty memory initialized with 10 bytes, pointer set to 0')

assert.deepStrictEqual(brainfuck.compile('>'), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 1,
  output: '',
  input: ''
}, 'increment the pointer')
assert.deepStrictEqual(brainfuck.compile('>>>>>>>>>>>'), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 10,
  output: '',
  input: ''
}, 'do not increment the pointer above 10')

assert.deepStrictEqual(brainfuck.compile('<', {
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

assert.deepStrictEqual(brainfuck.compile('<'), {
  memory: [],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'do not decrement the pointer below 0')

assert.deepStrictEqual(brainfuck.compile('+'), {
  memory: [1],
  loops: [],
  looping: false,
  pointer: 0,
  output: '',
  input: ''
}, 'increment the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile('-', {
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

assert.deepStrictEqual(brainfuck.compile('.', {
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

assert.deepStrictEqual(brainfuck.compile(',', {
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

assert.deepStrictEqual(brainfuck.compile('[', {
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

assert.deepStrictEqual(brainfuck.compile(']', {
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

assert.deepStrictEqual(brainfuck.compile('[', {
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

assert.deepStrictEqual(brainfuck.compile('>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.', {
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
