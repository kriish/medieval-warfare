function sendToServer(data, callback) {
	$.ajax('/comm/', {
		type : 'POST',
		data : JSON.stringify(data),
		contentType : 'text/json',
		success : function(data) {
				console.log("successfully talked to server" + JSON.stringify(data));
				
		},
		error : function() {
				console.log("failed talked to server");
		}
	});
}

