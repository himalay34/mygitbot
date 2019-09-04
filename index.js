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

app.use('/', require('express-pouchdb')(TempPouchDB))
//import all dbs here to use with fauxton later
//require('./pouch.js')

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Server is listening on port ' + listener.address().port);
});

try {
    require('./src/botShard.js')
} catch (error) {
    console.log('\n\n------Bot initialization error begin: src/botShard.js ------')
    console.log(error)
    console.log('------ Bot initialization error end:  ------\n\n')
}
