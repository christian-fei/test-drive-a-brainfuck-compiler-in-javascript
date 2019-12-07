module.exports = {
  compile,
  run
}

function compile (commands = '', { memory = [], loops = [], looping = false, commandIndex = 0, innerLoops = 0, pointer = 0, output = '', input = '' } = {}) {
  let state = { memory, loops, looping, commandIndex, innerLoops, pointer, output, input }
  for (; state.commandIndex < commands.length; state.commandIndex++) {
    const command = commands[state.commandIndex]
    state = interpret(command, state)
  }
  return state
}

function interpret (command, { memory = [], loops = [], looping = false, commandIndex = 0, innerLoops = 0, pointer = 0, output = '', input = '' } = {}) {
  if (looping) {
    if (command === '[') innerLoops++
    if (command === ']') {
      if (innerLoops === 0) looping = false
      else innerLoops--
    }
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
    if (memory[pointer] === 0) {
      loops.pop()
    } else {
      commandIndex = loops[loops.length - 1] || 0
    }
  }
  return { commandIndex, innerLoops, memory, loops, looping, pointer, output, input }
}

function run (program) {
  const result = compile(program)
  console.log(result.output)
  return result.output
}
