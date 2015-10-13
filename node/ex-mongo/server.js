var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

//config
var app = express();
app.set('port', process.env.PORT || 3000);

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: true }
));

//routes
var obj = [
    {id: 1, name: 'david'},
    {id: 2, name: 'joris'},
    {id: 3, name: 'seeger'}
]

app.get('/', function(req, res, next) {
    return res.status(200).send(obj);
})

//listen
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port: '
                    + server.address().port);
});
