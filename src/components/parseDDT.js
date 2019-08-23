const fs = require('fs')

exports.parse = (path) => {
    console.log(path)
    let d = {}
    let ddt = fs.readFileSync(path, 'ascii')


    fs.writeFileSync(d)
}

this.parse('JL DDT Routine.csv')