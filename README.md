test drive a brainfuck compiler in javascript

## tests

```
npm test
```

- [see index.examples.test.js](https://github.com/christian-fei/test-drive-a-brainfuck-compiler-in-javascript/blob/master/index.examples.test.js)
- [see index.test.js](https://github.com/christian-fei/test-drive-a-brainfuck-compiler-in-javascript/blob/master/index.test.js)


## examples

print "Hello World!"

```sh
./bin.js '++++++++[>++++[>++>+++>+++>+<<<<-]>+>->+>>+[<]<-]>>.>>---.+++++++..+++.>.<<-.>.+++.------.--------.>+.'
```

clear screen

```sh
./bin.js '++++++++++[>++++++++++>+<<-]>[>.<-]'
```

translate text into bf program that outputs same text

```sh
./bin.js (./bin.js '+++++[>+++++++++<-],[[>--.++>+<<-]>+.->[<.>-]<<,]' 'hello world')
```

```sh
```

infinitely print `>+`

```sh
./bin.js '>+++++>+++>+++>+++++>+++>+++>+++++>++++++>+>++>+++>++++>++++>+++>+++>+++++>+>+>++++>+++++++>+>+++++>+>+>+++++>++++++>+++>+++>++>+>+>++++>++++++>++++>++++>+++>+++++>+++>+++>++++>++>+>+>+>+>++>++>++>+>+>++>+>+>++++++>++++++>+>+>++++++>++++++>+>+>+>+++++>++++++>+>+++++>+++>+++>++++>++>+>+>++>+>+>++>++>+>+>++>++>+>+>+>+>++>+>+>+>++++>++>++>+>+++++>++++++>+++>+++>+++>+++>+++>+++>++>+>+>+>+>++>+>+>++++>+++>+++>+++>+++++>+>+++++>++++++>+>+>+>++>+++>+++>+++++++>+++>++++>+>++>+>+++++++>++++++>+>+++++>++++++>+++>+++>++>++>++>++>++>++>+>++>++>++>++>++>++>++>++>++>+>++++>++>++>++>++>++>++>++>+++++>++++++>++++>+++>+++++>++++++>++++>+++>+++>++++>+>+>+>+>+++++>+++>+++++>++++++>+++>+++>+++>++>+>+>+>++++>++++[[>>>+<<<-]<]>>>>[<<[-]<[-]+++++++[>+++++++++>++++++<<-]>-.>+>[<.<<+>>>-]>]<<<[>>+>>>>+<<<<<<-]>++[>>>+>>>>++>>++>>+>>+[<<]>-]>>>-->>-->>+>>+++>>>>+[<<]<[[-[>>+<<-]>>]>.[>>]<<[[<+>-]<<]<<]'
```

[see more examples](https://github.com/christian-fei/test-drive-a-brainfuck-compiler-in-javascript/blob/master/index.examples.test.js)

---

[The Epistle to the Implementors](http://www.hevanet.com/cristofd/brainfuck/epistle.html)

from the [brainfuck website](https://www.muppetlabs.com/~breadbox/bf/)

```
a brainfuck program has an implicit byte pointer, called "the pointer", which is free to move around within an array of 30000 bytes, initially all set to zero. the pointer itself is initialized to point to the beginning of this array.

the brainfuck programming language consists of eight commands, each of which is represented as a single character.

> 	increment the pointer
< 	decrement the pointer
+ 	increment the byte at the pointer
- 	decrement the byte at the pointer
. 	output the byte at the pointer
, 	input a byte and store it in the byte at the pointer
[ 	jump forward past the matching ] if the byte at the pointer is zero
] 	jump backward to the matching [ unless the byte at the pointer is zero

the semantics of the brainfuck commands can also be succinctly expressed in terms of c, as follows (assuming that p has been previously defined as a char*):

> 	becomes 	++p;
< 	becomes 	--p;
+ 	becomes 	++*p;
- 	becomes 	--*p;
. 	becomes 	putchar(*p);
, 	becomes 	*p = getchar();
[ 	becomes 	while (*p) {
] 	becomes 	}
```