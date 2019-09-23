require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const PouchDB = require('pouchdb')
const PORT = process.env.PORT || 3000;
let utils = require('./utils')

let dir = path.join(__dirname, 'store/')
// create pouchdb database in .data
const TempPouchDB = PouchDB.defaults({prefix: dir})

app.use(cors());
app.use(helmet())

// Serve public assets
app.use(express.static('public'));
app.get('/ping', function(request, response)
{
  let datetime = new Date();
  let pcode = Math.floor(Math.random() * 10239571);
  response.send(`Ping Code: ${pcode}`);
  console.log('Ping recieved [' + utils.formatShortDate(datetime) + ', ' + utils.formatShortTime(datetime) + ']');
}); 

app.use("/", require("./src/customPouch/index")(TempPouchDB));

var listener = app.listen(PORT, function () {
  console.log('Server is listening on port ' + listener.address().port);
});

/**
some   functions
*/
// <String>.toPropercase() returns a proper-cased string such as: 
// "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
String.prototype.toProperCase = function () {
  return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.ucfirst = function(){
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}
// <Array>.random() returns a single random element from an array
// [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};


try {
  //require('./src/botShard.js')
  require('./src/bot.js')
} catch (error) {
  console.log('\n\n------Bot initialization error begin: src/botShard.js ------')
  console.log(error)
  console.log('------ Bot initialization error end:  ------\n\n')
}
