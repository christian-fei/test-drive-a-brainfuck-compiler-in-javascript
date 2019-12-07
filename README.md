test drive a brainfuck compiler in javascript

## usage


print "Hello World!"
```
./bin.js '++++++++[>++++[>++>+++>+++>+<<<<-]>+>->+>>+[<]<-]>>.>>---.+++++++..+++.>.<<-.>.+++.------.--------.>+.'
``` 

---

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