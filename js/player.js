
//player_id
//cities 
//	city.name
//	city.location
//
//troops
//    troop.name
//    troop.location
//    size #how many people
//    
//money 
//submitted round

function player( player_id, initialMoney ) {
	this.id = player_id;
	
	// cities:
	this.cities = new Object();
	
	// troops:
	this.troops = new Object();

	// money:
	this.money = initialMoney;
	
	// submittedRount
	this.submittedRound = 0;
	
	this.increamentSubmittedRount = function () {
		this.submittedRound ++;
	};
	
	this.addMoney = function(someAmount) {
		this.money += someAmount;
	};
	
	this.substractMoney = function (someAmount) {
		this.money -= someAmount;
	};

	// create a city
	this.createCity = function (theCity) {
	    console.log("createCity [" + theCity.name + ", " + theCity.location);
	    this.cities[theCity.name] = theCity;
	};
	
	// destroy a City
	this.destroyCity = function (theCity) {
	    console.log("destroyCity [" + theCity.name + ", " + theCity.location);
		delete this.cities[theCity.name];
	};
}

exports.player = player;
