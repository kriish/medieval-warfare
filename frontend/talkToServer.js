
var frontEndPlayer = new Object();

function sendToServer(actionID, data, callback) {
	$.ajax('/'+actionID+'/', {
		type : 'POST',
		data : JSON.stringify(data),
		contentType : 'text/json',
		success : function(data) {
				callback(true, data);
				console.log("successfully talked to server" + JSON.stringify(data));
				
		},
		error : function() {
				callback(false);
				console.log("failed talked to server");
		}
	});
}


function joinTheGame(playerName, callback) {
    var submitJson = new Object();
    
    submitJson.playerName = playerName;
	
	sendToServer('joinGame', submitJson, callback);	
}


function submitRound(roundInfo, callback) {
    var submitJson = new Object();
    
    submitJson.playerName = playerName;
	
	sendToServer('submitRound', submitJson, callback);	
	
}
