import { franc } from 'franc'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const langs = require('langs')

const string = process.argv.slice(2)
let message = ''
for (let word of string)
{

    message += `${word} `
}



if(franc(message).name) 
{
    console.log(langs.where('3', franc(message)).name)
}
else console.log('Cannot identify')