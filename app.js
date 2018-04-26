var express = require('express');
var bodyParser = require("body-parser");
var firebase = require("firebase");
var controller = require('./controller');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

controller(app);

app.set('port', (process.env.PORT || 8036));
app.listen(app.get('port'), function() {
    console.log('App is live listening on port', app.get('port'))
});