
var player = require("../js/player");
var roundInfo = require("../js/roundInfo");

// the initial money a player can get
var player_initial_money = 1000;



var players = new Array();
var totalNumOfPlayers = 2;	// the total number of players expected
var currPlayerIdx = 0;
var totalNumberOfRounds = 10;	// the total number of rounds
var currRoundNumber = 1;

function getCurrPlayer() {
	return players[currPlayerIdx];
}

function switchToNextPlayer() {
	currPlayerIdx ++;
	if (currPlayerIdx == players.length) {
		currPlayerIdx = 0;
		
		// update round information
		currRoundNumber ++;
		
	}
}

// get the names of all the players
function getPlayerNames() {
	var playerNames = new Array();
	
	for (var i = 0; i < players.length; i++) {
		playerNames[i] = players[i].id;
	}

	return playerNames;
}

function getRoundNumber() {
	return currRoundNumber;
} 

// notify the next player it is his/her turn to play the game
function notifyNextPlayer() {
	
}


// update all players with game info
function notifyAllPlayers(gameInfo) {
	
}

//function getTimeStampStr(){
//	var currentTime = new Date();
//
//	var hours = currentTime.getHours();
//	var minutes = currentTime.getMinutes();
//	var seconds = currentTime.getSeconds();
//	if (minutes < 10) {
//		minutes = "0" + minutes;
//	}
//
//	if (seconds < 10) {
//		seconds = "0" + seconds;
//	}
//	
//	return hours+":"+minutes+","+seconds;
//}

function createJoinPlayerResult( successfulOrNot ) {

	// whether the result was successful or not
	this.indication = successfulOrNot;
	
	// some other information??

}

// new user joins the game
function handleJoinGame(playerInfo) {
	console.log( "handleJoinGame: " + JSON.stringify(playerInfo));
	
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
		result.roundInfo = new roundInfo.roundInfo(getRoundNumber(), getPlayerNames(), getCurrPlayer().id);
//		result.currentPlayer = players[getCurrPlayer()].id;
		//TODO notify all players
//		notifyAllPlayers(roundInfo);
	} else {
		result.gameStarted = false;
	}
	
	console.log(JSON.stringify(result));
	
	return result;
	
}


function handleSubmitRound(roundInfo) {
	// OK, we need some game master logic here
	console.log( "handleSubmitRound: " + JSON.stringify(roundInfo));

	// which player is this?
	var currPlayer = players[roundInfo.playerName];
	
	console.log("currPlayer is" + JSON.stringify(currPlayer));
	
	//TODO: switch to next player() and also notify all other players what's going on with the game
	
	
}

function handleClientSubscription(playerInfo, response) {
	// handle client's subscription for notification;
	console.log( "handleClientSubscription: " + JSON.stringify(playerInfo));

	// find the player
	for (var i = 0; i < players.length; i++) {
		if (players[i].id == playerInfo.playerName) {

			var thePlayer = players[i];
			console.log("handleClientSubscription for player " + thePlayer.id);
			

			if (thePlayer.pendingResponse) {
				thePlayer.pendingResponse.writeHead(200, {
					'content-type' : 'text/json'});

				// acknowledge existing response
				//TODO: it is better to generate event from some constructor ...
				var event = {};
				event.type="nothingHappend";
				thePlayer.pendingResponse.write(JSON.stringify(event));

				thePlayer.pendingResponse.end();				
				
			}
			
			// save the new pending request
			thePlayer.pendingResponse = response;
		}
	}

}

exports.handleJoinGame = handleJoinGame;
exports.handleSubmitRound = handleSubmitRound;
exports.handleClientSubscription=handleClientSubscription;
