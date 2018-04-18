var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    //console.log("ksdjaflsdk testing");
    // res.render('ind.ejs');
});

app.listen(8042);
console.log('8042 is live')


