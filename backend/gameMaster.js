
var player = require("../js/player");

// the initial money a player can get
var player_initial_money = 1000;

var totalNumOfPlayers = 2;	// the total number of players expected

var players = new Array();

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
	
	for (var i = 0; i < players.length; i++) {
		if (players[i].id == newPlayerName) {
			console.log("player " + newPlayerName + " is joining again?");
			return new createJoinPlayerResult(false);
		}
	}

	newPlayer = new player.player(newPlayerName, player_initial_money);
	
	// save the player in the global variable;
	players[players.length] = newPlayer;
	
	console.log("new player " + newPlayer.id + " added!");
	
	result = new createJoinPlayerResult(true);
	result.player = newPlayer;
	
	
	// check if we can start the game now and see whose turn it is
	if ( players.length == totalNumOfPlayers ) {
		result.gameStarted = true;
		//TODO decide whose turn it is		
	} else {
		result.gameStarted = false;
	}
	
	return result;
	
}


function handleSubmitRound(roundInfo) {
	// OK, we need some game master logic here
	
	// which player is this?
	currPlayer = players[roundInfo.playerName];
	
	console.log("currPlayer is" + JSON.stringify(currPlayer));
}

exports.handleJoinGame = handleJoinGame;
exports.handleSubmitRound = handleSubmitRound;
