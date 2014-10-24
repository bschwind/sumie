var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Use to serve stuff from /public
// Users coming to the home page will simply receive index.html
// and app.get("/") will not fire
app.use(express.static(__dirname + '/public'));

// Get express working with POSTed form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	// This is handled by the /public static route
})

// Start the server on port 3000
var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
