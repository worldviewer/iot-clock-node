var express = require("express"),
    ejs = require("ejs"),
    request = require('request'),
    app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index')
});

var url = 'https://agent.electricimp.com/h__trcroDG77?led=0';

app.post('/led', function (req, res) {
	request(url, function(err, resp, body) {
		if(!err && resp.statusCode === 200) {
			console.log("good!");
		}
		res.render('index');
	})
});


app.listen(process.env.PORT || 3000, function() {
	console.log("We have a connection");
});
