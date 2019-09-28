import spoof from 'spoof'
import exec from './sudo-prompt'

const SPOOF_BIN_PATH = './node_modules/.bin/spoof '

function findSpoofedInterfaces () {
  const query = []
  return spoof.findInterfaces(query).filter(i => isSpoofed(i))
}

function isSpoofed (target) {
  return target.currentAddress && target.currentAddress !== target.address
}

function areSpoofedInterfaces () {
  return !!findSpoofedInterfaces().length
}

function randomize (device) {
  const cmd = `randomize ${device}`
  return exec(SPOOF_BIN_PATH + cmd)
}

function reset (device) {
  const cmd = `reset ${device}`
  return exec(SPOOF_BIN_PATH + cmd)
}

function resetAll () {
  const cmd = 'reset '
  const devices = findSpoofedInterfaces()
    .map(i => i.device)

  console.log(SPOOF_BIN_PATH + cmd + devices.join(' '))

  if (!devices.length) {
    return
  }
  return exec(SPOOF_BIN_PATH + cmd + devices.join(' '))
}

export default {
  ...spoof,
  findSpoofedInterfaces,
  isSpoofed,
  areSpoofedInterfaces,
  randomize,
  resetAll,
  reset
}
