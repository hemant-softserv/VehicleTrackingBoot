var stompClient = null;

$(document)
		.ready(

				function() {

					let idd = "Id-" + Math.random();
					if (stompClient != null)
						stompClient.disconnect();
					var socket = new SockJS(
							'http://13.75.220.119/VehicleTrackingBoot/updateMapLocation');
					//var socket = new
					//SockJS('http://localhost:8080/updateMapLocation');
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