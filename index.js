module.exports = {
  compile,
  interpret,
  run
}

function compile (commands = '', { memory = [], loopCommandIndexes = [], looping = false, commandIndex = 0, depth = 0, pointer = 0, output = '', input = '' } = {}) {
  let state = { memory, loopCommandIndexes, looping, commandIndex, depth, pointer, output, input }
  commands = commands.replace(/ /gi, '')
  while (state.commandIndex < commands.length) {
    state = interpret(commands[state.commandIndex], state)
  }
  return state
}

function interpret (command, { memory = [], loopCommandIndexes = [], looping = false, commandIndex = 0, depth = 0, pointer = 0, output = '', input = '' } = {}) {
  if (looping) {
    if (command === '[') depth++
    if (command === ']') {
      if (depth === 0) looping = false
      else depth--
    }
    commandIndex++
    return { commandIndex, depth, memory, loopCommandIndexes, looping, pointer, output, input }
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
      loopCommandIndexes.push(commandIndex)
    }
  }
  if (command === ']') {
    if (memory[pointer] === 0) {
      loopCommandIndexes.pop()
    } else {
      commandIndex = loopCommandIndexes[loopCommandIndexes.length - 1]
    }
  }
  commandIndex++
  return { commandIndex, depth, memory, loopCommandIndexes, looping, pointer, output, input }
}

function run (program, { input = '' } = {}) {
  const result = compile(program, { input })
  console.log(result.output)
  return result.output
}
