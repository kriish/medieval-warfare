
var frontEndPlayer = new Object();

function sendToServer(actionID, data, callback) {
	$.ajax('/'+actionID+'/', {
		type : 'POST',
		data : JSON.stringify(data),
		contentType : 'text/json',
		success : function(serverData) {
				callback(true, serverData);
				console.log("successfully talked to server" + JSON.stringify(serverData));
				
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


function submitRoundToServer(submitRoundInfo, callback) {
	
	sendToServer('submitRound', submitRoundInfo, callback);	
	
}

function subscribeToServer(playerName, callback) {
	var submitJson = new Object();

	submitJson.playerName = playerName;

	sendToServer('subscribeToServer', submitJson, function(success, serverData) {
		alert("subscribeToServer got notification from server: \n" + JSON.stringify(serverData));
//		console.log(handle);
		
		callback(success, serverData);
		
//		console.log();
		alert("OK. I'm subscribing again");

		subscribeToServer(playerName, callback);
	});
	
};

//function handleNotificationFromServer(notification) {
//		alert("received notification from server " + notification);
//		
//		subscribeToServer(frontEndPlayer.id,  
//				  function(notification) {
//				handleNotificationFromServer(notification);
//		  			});		
//		
//}