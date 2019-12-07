#!/usr/bin/env node

const assert = require('assert')

const brainfuck = require('.')

assert.ok(brainfuck.compile(''), 'result is defined')
assert.deepStrictEqual(brainfuck.compile(''), {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}, 'empty memory initialized, pointer set to 0, not looping')

assert.deepStrictEqual(brainfuck.compile('>'), {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 1,
  output: '',
  input: ''
}, 'increment the pointer')

assert.deepStrictEqual(brainfuck.compile('<', {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 0,
  pointer: 1,
  output: '',
  input: ''
}), {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'decrement the pointer')

assert.deepStrictEqual(brainfuck.compile('<'), {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'do not decrement the pointer below 0')

assert.deepStrictEqual(brainfuck.compile('+'), {
  memory: [1],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'increment the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile('-', {
  memory: [1],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [0],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'decrement the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile('.', {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '\u0000',
  input: ''
}, 'output the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile(',', {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: '\u0001'
}), {
  memory: [1],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'input a byte and store it in the byte at the pointer')

assert.deepStrictEqual(brainfuck.compile('[', {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loops: [0],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'jump forward past the matching ] if the byte at the pointer is zero')

assert.deepStrictEqual(brainfuck.compile(']', {
  memory: [],
  loops: [],
  looping: true,
  innerLoops: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'ends loops with matching ]')

assert.deepStrictEqual(brainfuck.compile('[', {
  memory: [1],
  loops: [],
  looping: false,
  innerLoops: 0,
  commandIndex: 0,
  pointer: 0,
  output: '',
  input: ''
}), {
  memory: [1],
  loops: [0],
  looping: false,
  innerLoops: 0,
  commandIndex: 1,
  pointer: 0,
  output: '',
  input: ''
}, 'pushes commandIndex in loop stack')

assert.deepStrictEqual(brainfuck.compile('>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.'), {
  commandIndex: 164,
  innerLoops: 0,
  memory: [100, 87, 33, 0],
  loops: [],
  looping: false,
  pointer: 2,
  output: 'Hello, World!',
  input: ''
}, 'compiles "Hello, World!" program')

assert.deepStrictEqual(
  brainfuck.run('>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.'),
  'Hello, World!',
  'runs "Hello, World!" program'
)

assert.deepStrictEqual(
  brainfuck.run(`>+++++++++[<++++++>-]<...`),
  '666',
  'complex example - 666'
)

assert.deepStrictEqual(
  brainfuck.run(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.`, { input: '' }),
  'a',
  'complex example - print a'
)

// assert.deepStrictEqual(
//   brainfuck.run(`>,[>>>++++++++[<[<++>-]<+[>+<-]<-[-[-<]>]>[-<]<,>>>-]<.[-]<<]`, { input: '0110100001101001' }),
//   'hi',
//   'complex example - binary to ascii'
// )

// assert.deepStrictEqual(
//   brainfuck.run(`+[>,]<-[+.<-]`, { input: 'hello\n' }),
//   'olleh',
//   'complex example - reverse'
// )

// assert.deepStrictEqual(
//   brainfuck.run(`
//                                 >
//                                + +
//                               +   +
//                              [ < + +
//                             +       +
//                            + +     + +
//                           >   -   ]   >
//                          + + + + + + + +
//                         [               >
//                        + +             + +
//                       <   -           ]   >
//                      > + + >         > > + >
//                     >       >       +       <
//                    < <     < <     < <     < <
//                   <   [   -   [   -   >   +   <
//                  ] > [ - < + > > > . < < ] > > >
//                 [                               [
//                - >                             + +
//               +   +                           +   +
//              + + [ >                         + + + +
//             <       -                       ]       >
//            . <     < [                     - >     + <
//           ]   +   >   [                   -   >   +   +
//          + + + + + + + +                 < < + > ] > . [
//         -               ]               >               ]
//        ] +             < <             < [             - [
//       -   >           +   <           ]   +           >   [
//      - < + >         > > - [         - > + <         ] + + >
//     [       -       <       -       >       ]       <       <
//    < ]     < <     < <     ] +     + +     + +     + +     + +
//   +   .   +   +   +   .   [   -   ]   <   ]   +   +   +   +   +
//   `),
//   '',
//   'complex example - tree'
// )
