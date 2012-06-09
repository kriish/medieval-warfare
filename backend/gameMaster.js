
var player = require("../js/player");

// the initial money a player can get
var player_initial_money = 1000;


var players = new Object();

function createJoinPlayerResult( successfulOrNot ) {

	// whether the result was successful or not
	this.indication = successfulOrNot;
	
	// some other information??
}

// new user joins the game
function handleJoinGame(playerInfo) {
	console.log( JSON.stringify(playerInfo));
	
	for(var key in playerInfo){ 
		console.log('key name: ' + key + ' value: ' + playerInfo[key]); 
	}
	
	newPlayerName = playerInfo['playerName'];
	
	if (!newPlayerName) {
		console.log("no playerName found in json object!!!");
		return createJoinPlayerResult(false);
	}
	
	for (key in players) {
		if (key == newPlayerName) {
			console.log("player " + newPlayerName + " is joining again?");
			return  createJoinPlayerResult(false);
		}
	}

	newPlayer = new player.player(newPlayerName, player_initial_money);
	
	// save the player in the global variable;
	players[newPlayer.id] = newPlayer;
	
	console.log("new player " + newPlayer.id + " added!");
	
	result = new createJoinPlayerResult(true);
	result["player"] = newPlayer;
	
	return result;
	
}


// handle incoming data from client
function handleData (clientRequestData) {
	console.log("received ", clientRequestData);

	if (clientRequestData["action"] == "joinGame") {
		
	}
	return clientRequestData;
}

exports.handleJoinGame = handleJoinGame;