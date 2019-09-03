const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const PouchDB = require('pouchdb')
const PORT = process.env.PORT || 3000;
// create pouchdb database in .data
const TempPouchDB = PouchDB.defaults({prefix: '.data/'})
app.use(cors());
app.use(helmet())
// Serve public assets
app.use(express.static('public'));

app.get('/ping', function(request, response)
{
    let datetime = new Date();
    let pcode = Math.floor(Math.random() * 10239571);
    response.send(`Ping Code: ${pcode}`);
    console.log('Ping recieved [' + util.formatShortDate(datetime) + ', ' + util.formatShortTime(datetime) + ']');
}); 

app.use('/', require('express-pouchdb')(TempPouchDB))

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your pouchdb is listening on port ' + listener.address().port);
});

try {
    require('./src/botShard.js')
} catch (error) {
    console.log('\n\n------ begin: src/bot.js ------')
    console.log(error)
    console.log('------ end:  ------\n\n')
}
