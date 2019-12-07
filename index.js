module.exports = {
  compile,
  interpret,
  run
}

function compile (commands = '', { memory = [], loops = [], looping = false, commandIndex = 0, inner = 0, pointer = 0, output = '', input = '' } = {}) {
  let state = { memory, loops, looping, commandIndex, inner, pointer, output, input }
  commands = commands.replace(/ /gi, '')
  while (state.commandIndex < commands.length) {
    state = interpret(commands[state.commandIndex], state)
  }
  return state
}

function interpret (command, { memory = [], loops = [], looping = false, commandIndex = 0, inner = 0, pointer = 0, output = '', input = '' } = {}) {
  if (looping) {
    if (command === '[') inner++
    if (command === ']') {
      if (inner === 0) looping = false
      else inner--
    }
    commandIndex++
    return { commandIndex, inner, memory, loops, looping, pointer, output, input }
  }
  if (command === '>') pointer++
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
      commandIndex = loops[loops.length - 1]
    }
  }
  commandIndex++
  return { commandIndex, inner, memory, loops, looping, pointer, output, input }
}

function run (program, { input = '' } = {}) {
  const result = compile(program, { input })
  console.log(result.output)
  return result.output
}
