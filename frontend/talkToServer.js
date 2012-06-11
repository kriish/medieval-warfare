
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
//		alert("subscribeToServer got notification from server: \n" + JSON.stringify(serverData));
//		console.log(handle);
		
		try {
			callback(success, serverData);
		} catch (err) {
			  txt="There was an error on this page.\n\n";
			  txt+="Error description: " + err.message + "\n\n";
			  txt+="Click OK to continue.\n\n";
			  alert(txt);			
		}

		console.log("OK. I'm subscribing to server again");

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