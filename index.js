const PouchDB = require('pouchdb').defaults({prefix: '.data/'});
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
// Serve public assets
app.use(express.static('public'));

const myLogger = function (req, res, next) {
    //console.log(req)
    next();
};

app.use(myLogger);

app.get('/ping', function(request, response)
{
    let datetime = new Date();
    let pcode = Math.floor(Math.random() * 10239571);
    response.send(`Ping Code: ${pcode}`);
    console.log('Ping recieved [' + util.formatShortDate(datetime) + ', ' + util.formatShortTime(datetime) + ']');
}); 

app.use('/', require('express-pouchdb')(PouchDB));

global.pdb = new PouchDB('servers');
//var listener = app.listen(process.env.PORT, function () {
const listener = app.listen(port, function () {
    console.log('Your pouchdb is listening on port ' + listener.address().port);
});

try {
    require('./src/bot.js')
} catch (error) {
    console.log('\n\n------ begin: src/bot.js ------')
    console.log(error)
    console.log('------ end:  ------\n\n')
}