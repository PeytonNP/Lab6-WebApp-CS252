//  OpenShift sample Node application
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var firebase = require("firebase");
var controller = require('./controller');

app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

controller(app);

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
