// const { greet, name } = require('./ExporterFile')

// console.log(greet())
// console.log(name);
const colors = require('colors')
const newDir = require('./ExporterFile')
const { name, greet } = newDir


console.log(greet(), name)
