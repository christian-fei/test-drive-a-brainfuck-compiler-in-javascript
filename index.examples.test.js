const assert = require('assert')

const brainfuck = require('.')

assert.deepStrictEqual(brainfuck.compile('>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.'), {
  commandIndex: 164,
  depth: 0,
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
  brainfuck.run('++++++++[>++++[>++>+++>+++>+<<<<-]>+>->+>>+[<]<-]>>.>>---.+++++++..+++.>.<<-.>.+++.------.--------.>+.'),
  'Hello World!',
  'runs "Hello World!" program'
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

assert.deepStrictEqual(
  brainfuck.run(`,[.[-],]`, { input: 'hello' }),
  'hello',
  'complex example - pipe input to output'
)

assert.deepStrictEqual(
  brainfuck.run(`,[---------[-[++++++++++.[-]]],]`, { input: 'hello\t world\n\t \n\t\t\txoxo' }),
  'hello world xoxo',
  'complex example - strip tabs and linefeeds'
)

assert.deepStrictEqual(
  brainfuck.run(
    brainfuck.run(`+++++[>+++++++++<-],[[>--.++>+<<-]>+.->[<.>-]<<,]`, {
      input: 'hello world'
    })
  ),
  'hello world',
  'complex example - translate text to brainfuck that prints it'
)

// assert.deepStrictEqual(
//   brainfuck.run(`>,[>>>++++++++[<[<++>-]<+[>+<-]<-[-[-<]>]>[-<]<,>>>-]<.[-]<<]`, { input: '0110100001101001' }),
//   'hi',
//   'complex example - binary to ascii'
// )

// assert.deepStrictEqual(
//   brainfuck.run(`>>>+>>>>>+>>+>>+[<<],[
//     -[-[-[-[-[-[-[-[<+>-[>+<-[>-<-[-[-[<++[<++++++>-]<
//         [>>[-<]<[>]<-]>>[<+>-[<->[-]]]]]]]]]]]]]]]]
//     <[-<<[-]+>]<<[>>>>>>+<<<<<<-]>[>]>>>>>>>+>[
//         <+[
//             >+++++++++<-[>-<-]++>[<+++++++>-[<->-]+[+>>>>>>]]
//             <[>+<-]>[>>>>>++>[-]]+<
//         ]>[-<<<<<<]>>>>
//     ],
// ]+<++>>>[[+++++>>>>>>]<+>+[[<++++++++>-]<.<<<<<]>>>>>>>>]`, { input: 'hello world' }),
//   '2',
//   'complex example - wc'
// )

// assert.deepStrictEqual(
//   brainfuck.run(`>>,[>>,]<<[[-<+<]>[>[>>]<[.[-]<[[>>+<<-]<]>>]>]<<]`, { input: '0110100001101001' }),
//   'hi',
//   'complex example - binary to ascii'
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
