import spoof from 'spoof'
import exec from './sudo-prompt'

const SPOOF_BIN_PATH = './node_modules/.bin/spoof '

function isSpoofed (target) {
  return target.currentAddress && target.currentAddress !== target.address
}

function randomize (device) {
  const cmd = `randomize ${device}`
  return exec(SPOOF_BIN_PATH + cmd)
}

function reset (device) {
  const cmd = `reset ${device}`
  return exec(SPOOF_BIN_PATH + cmd)
}

function resetAll (devices) {
  if (!devices) {
    return
  }
  const cmd = 'reset '
  return exec(SPOOF_BIN_PATH + cmd + devices)
}

export default {
  ...spoof,
  isSpoofed,
  randomize,
  resetAll,
  reset
}
