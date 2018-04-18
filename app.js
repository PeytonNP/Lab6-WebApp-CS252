var express = require('express');
var app = express();
app.set('view engine', 'ejs');

var port = process.env.PORT || 8036;


// Put static content in public directory 
app.use(express.static(__dirname + '/public'));     

// Routes
app.get('/', function (req, res) {       // route
    res.render('index');
})

app.listen(port, function () {
    console.log('App is live listening on port 8036!')
})