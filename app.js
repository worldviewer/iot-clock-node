var express = require("express"),
    ejs = require("ejs"),
    request = require('request'),
    app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index')
});
 

app.listen(3000, function() {
	console.log("We have a connection");
});
