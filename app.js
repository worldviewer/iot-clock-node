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

app.get('/zapier', function (req, res) {
	res.render("setting/zapier");
});

// Incoming parameters:

app.post('/led', function (req, res) {
	console.log("req.body contents:");
	console.log(req.body);
	console.log('');

	var url = 'https://agent.electricimp.com/h__trcroDG77';
	url = url + "?seconds=" + req.body.seconds + '&snooze=' + req.body.snooze + '&onoff=' + req.body.onoff + '&week=' + req.body.week;

	console.log('Sending URL:');
	console.log(url);

	request(url, function(err, resp, body) {
		if(!err && resp.statusCode === 200) {
			console.log("Status 200: OK");
		} else {
			console.log("Error! "+err);
			console.log("Body: "+body);
			console.log("Response: "+resp);
		}
		res.render('index');
	})
});


app.listen(process.env.PORT || 3000, function() {
	console.log("We have a connection");
});
