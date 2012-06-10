
function roundInfo( roundNumber, players, currentPlayer ) {
	this.roundNumber = roundNumber;
	
	// list of players
	this.players = players;
	
	// currentPlayer
	this.currentPlayer = currentPlayer;
}


exports.roundInfo = roundInfo;