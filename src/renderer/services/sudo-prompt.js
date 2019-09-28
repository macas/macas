import sudo from 'sudo-prompt'

const options = {
  name: 'macas spoof'
}

function exec (cmd) {
  return new Promise(function (resolve, reject) {
    sudo.exec(cmd, options, function (err, stdout, stderr) {
      if (err || stderr) {
        return reject(err || stderr)
      }

      return resolve(stdout)
    })
  })
}

export default exec
