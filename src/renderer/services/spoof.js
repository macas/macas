import path from 'path'
import spoof from 'spoof'
import exec from './sudo-prompt'

const IS_DEV = process.env.NODE_ENV === 'development'
const SPOOF_BIN_PATH = IS_DEV
  ? './node_modules/.bin/spoof'
  : path.resolve(process.resourcesPath, 'spoof')

function isSpoofed (target) {
  return target.currentAddress && target.currentAddress !== target.address
}

function randomize (device) {
  const cmd = ` randomize ${device}`
  return exec(SPOOF_BIN_PATH + cmd)
}

function reset (device) {
  const cmd = ` reset ${device}`
  return exec(SPOOF_BIN_PATH + cmd)
}

function resetAll (devices) {
  if (!devices) {
    return
  }
  const cmd = ' reset '
  return exec(SPOOF_BIN_PATH + cmd + devices)
}

export default {
  ...spoof,
  isSpoofed,
  randomize,
  resetAll,
  reset
}
