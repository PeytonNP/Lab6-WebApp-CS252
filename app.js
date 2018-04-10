var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.listen(8036);
console.log('8036 is live')