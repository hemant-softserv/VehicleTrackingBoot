var stompClient = null;

$(document)
		.ready(

				function() {

					let idd = "Id-" + Math.random();
					if (stompClient != null)
						stompClient.disconnect();
					var socket = new SockJS('https://247rsa.softservtest.com/VehicleTrackingBoot/updateMapLocation');
					//var socket = new SockJS('http://localhost/VehicleTrackingBoot/updateMapLocation');
					//var socket = new SockJS(
						//		'http://localhost/VehicleTrackingBoot/updateMapLocation');
					stompClient = Stomp.over(socket);

					$("button").click(function() {

						sendData2Socket(idd);

					});
				});

function sendData2Socket(idd) {

	var latitudeeValue = $("#latitudeeId").val();
	var longitudeValue = $("#longitudeId").val();

	stompClient.send("/app/loc", {}, JSON.stringify({
		'latitude' : latitudeeValue,
		'longitude' : longitudeValue,
		'id' : idd
	}));

}