import sudo from 'sudo-prompt'
import { name } from '../../../package'

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

function exec (cmd) {
  return new Promise(function (resolve, reject) {
    sudo.exec(cmd, { name: capitalize(name) }, function (err, stdout, stderr) {
      if (err || stderr) {
        return reject(err || stderr)
      }

      return resolve(stdout)
    })
  })
}

export default exec
