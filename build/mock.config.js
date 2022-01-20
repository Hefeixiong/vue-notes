const fs = require('fs')
const path = require('path')

const mockBaseURL = '//note-server.hunger-valley.com'
const realBaseURL = '//note-server.hunger-valley.com'

exports.config = function ({isDev = true} = {isDev: true}) {
  let fileTxt =  `
  module.exports = {\n'
       baseURL: \'${isDev ? mockBaseURL : realBaseURL}\'\n'
      }`
  fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'), fileTxt)

}
