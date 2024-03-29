const assert = require('assert')

const brainfuck = require('.')

assert.ok(brainfuck.compile(''), 'result is defined')
assert.deepStrictEqual(brainfuck.compile(''), {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}, 'empty memory initialized, pointer set to 0, not looping')

assert.deepStrictEqual(brainfuck.compile('>'), {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 1,
  output: '',
  input: ''
}, 'increment the pointer')

assert.deepStrictEqual(brainfuck.compile('<', {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 0,
  pointer: 1,
  output: '',
  input: ''
}), {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'decrement the pointer')

assert.deepStrictEqual(brainfuck.compile('<'), {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'do not decrement the pointer below 0')

assert.deepStrictEqual(brainfuck.compile('+'), {
  memory: [1],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'increment the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile('-', {
  memory: [1],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [0],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'decrement the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile('.', {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '\u0000',
  input: ''
}, 'output the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile(',', {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: '\u0001'
}), {
  memory: [1],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'input a byte and store it in the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile('[', {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loopCommandIndexes: [0],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'jump forward past the matching ] if the byte at the pointer is zero')

assert.deepStrictEqual(brainfuck.compile(']', {
  memory: [],
  loopCommandIndexes: [],
  looping: true,
  depth: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'ends loops with matching ]')

assert.deepStrictEqual(brainfuck.compile('[', {
  memory: [1],
  loopCommandIndexes: [],
  looping: false,
  depth: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [1],
  loopCommandIndexes: [0],
  looping: false,
  depth: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'pushes commandIndex in loop stack')

assert.deepStrictEqual(
  brainfuck.run('>,>+++++++++,>+++++++++++[<++++++<++++++<+>>>-]<<.>.<<-.>.>.<<.', { input: '\n\u0010' }),
  'LR\nLR\n',
  'test 1 http://www.hevanet.com/cristofd/brainfuck/tests.b'
)
