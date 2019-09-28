import spoof from 'spoof'
import exec from './sudo-prompt'

const SPOOF_BIN_PATH = './node_modules/.bin/spoof '

function randomize (device) {
  const cmd = `randomize ${device}`
  return exec(SPOOF_BIN_PATH + cmd)
}

function reset (device) {
  const cmd = `reset ${device}`
  return exec(SPOOF_BIN_PATH + cmd)
}

function resetAll () {
  const cmd = 'reset'
  return exec(SPOOF_BIN_PATH + cmd)
}

export default {
  ...spoof,
  randomize,
  resetAll,
  reset
}
