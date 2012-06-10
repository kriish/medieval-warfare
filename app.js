
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var gameMaster = require('./public/backend/gameMaster');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index);

app.post('/joinGame/', function(request, response) {
	
	var data = '';
	request.addListener('data', function(chunk) { data += chunk; });
	request.addListener('end', function() {
		console.log("received data is :" + data);

		var playerInfo = JSON.parse(data);

		// let the gamemaster handles the incoming data
		result = gameMaster.handleJoinGame(playerInfo);

		response.writeHead(200, {
			'content-type' : 'text/json'
		});

		response.write(JSON.stringify(result));

		response.end();

	});

});


app.post('/submitRound/', function(request, response) {
	var data = '';
	request.addListener('data', function(chunk) { data += chunk; });
	
	request.addListener('end', function() {
		console.log("received data is :" + data);

		var roundInfo = JSON.parse(data);

		// let the gamemaster handles the incoming data
		result = gameMaster.handleSubmitRound(roundInfo);


		response.writeHead(200, {
			'content-type' : 'text/json'
		});

		response.write(JSON.stringify(result));

		response.end();

	});

});



app.post('/subscribeToServer/', function(request, response) {
	var data = '';

	request.addListener('data', function(chunk) { data += chunk; });
	
	request.addListener('end', function() {
		console.log("=== subscribeToServer == : received data is :" + data);

		var playerInfo = JSON.parse(data);

		gameMaster.handleClientSubscription(playerInfo, response);

	});

});

app.post('/endGame/',  function(request, response){


	// the body of the POST is JSON payload. It is raw, not
	// multipart encoded.
	var data = '';
	request.addListener('data', function(chunk) { data += chunk; });
	request.addListener('end', function() {
		// store[id] = JSON.parse(data);
		response.writeHead(200, {'content-type': 'text/plain' });
		
		// let the gamemaster handles the incoming data
		result = gameMaster.handleData(data);
		
		response.write( JSON.stringify(result));
		
		response.end();
		console.log("received from client: " + data);
	});
	
});

app.listen(8077, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
