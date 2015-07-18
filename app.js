var express = require("express"),
    ejs = require("ejs"),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();

app.set('view engine', 'ejs');

// The "extended" syntax allows for rich objects and arrays to 
// be encoded into the URL-encoded format, allowing for a 
// JSON-like experience with URL-encoded.
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index')
});

var url = 'https://agent.electricimp.com/h__trcroDG77?led=0';

// Things we want to receive:
// Days of the week
// Hours
// Minutes
// on-off State
// Snooze Time
app.post('/led', function (req, res) {
	console.log(req.body);

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
