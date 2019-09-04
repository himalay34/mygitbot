const path = require('path')
let dir = path.join(__dirname, 'store/')
const PouchDB = require('pouchdb').defaults({prefix: dir})

exports.servers = new PouchDB('servers')
exports.profiles = new PouchDB('profiles')
exports.botinfo = new PouchDB('botinfo')

