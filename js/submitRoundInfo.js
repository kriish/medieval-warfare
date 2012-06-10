
// the data submitted by a player in his/her turn in a round:

function submitRoundInfo (playerName, newCityList, newTroopList){
	this.player = playerName;
	
	this.create = new Array();
	
	var newlyCreatedCities = new Object();
	var newlyCreatedTroops = new Object();
	
	newlyCreatedCities.cities = newCityList;
	this.create[0] = newlyCreatedCities;
	
	newlyCreatedTroops.troops = newTroopList;
	this.create[1] = newlyCreatedTroops;
}

exports.submitRoundInfo = submitRoundInfo;