

var stompClient = null;


$(document).ready(function(){
	if(stompClient!=null)
		stompClient.disconnect();
	
	
	var map;
	var markers= [];
	 async function initMap() {
		 
		 var center = new google.maps.LatLng(23.76250228864416, 90.37851862204738);
		 
		   // Request needed libraries.
		  
		   const { Map } = await google.maps.importLibrary("maps");
		   var opts = {
		            zoom: 10,
		            center: center,
		            mapTypeId: google.maps.MapTypeId.ROADMAP
		        };

		   // The map, centered at
		 // map = new Map(document.getElementById("map"),opts);
		   map = new Map(document.getElementById('map'), opts);
		 }
	 initMap();
	 
	// Add marker
	    function addMarker(lat, lon, idd) {
	    	
	    	
	        deleteMarkers(idd);
	        var marker = new google.maps.Marker({
	            position: new google.maps.LatLng(lat, lon),
	            map: map,
	            customInfo:idd
	        });
	        markers.push(marker);
	        map.setCenter(new google.maps.LatLng(lat, lon));
	    }
	    // Removes the markers from the map, but keeps them in the array.
	    function clearMarkers(idd) {
	        for (var i = 0; i < markers.length; i++) {
	        	if(markers[i].customInfo==idd){
	        		markers[i].setMap(null);  // markerToBeRemoved.setMap(null);
	        	}
	            
	        }
	    }

	    // Deletes all markers in the array by removing references to them.
	    function deleteMarkers(idd) {
	        clearMarkers(idd);
	        // markers = [];
	    }
	

	
		var socket = new SockJS('http://13.75.220.119/VehicleTrackingBoot/updateMapLocation');
	     //var socket = new SockJS('http://localhost:8080/updateMapLocation');
	    
	    stompClient = Stomp.over(socket);
	 console.log("I am out frame");
	 stompClient.connect({}, function (frame) {
		 console.log("I am in frame");
	        stompClient.subscribe('/topic/updateLoc', function (mapData) {
	        	console.log("I am innnnn frame");
	        	
	        	mapJson = JSON.parse(mapData.body);
	        	console.log(mapJson);
	        	var latt=parseFloat(mapJson.latitude);
	        	var lngg=parseFloat(mapJson.longitude);
	        	var idd=mapJson.id;
	        	console.log(mapJson.id);
	        	
	        		 if(Number.isNaN(latt) || Number.isNaN(lngg) ){
	        			 navigator.geolocation.getCurrentPosition(
	        					   function (position) {
	        						   console.log("idd:"+idd);
	        						   addMarker(position.coords.latitude, position.coords.longitude,idd)
	        					   },
	        					   function errorCallback(error) {
	        					      console.log(error)
	        					   }
	        					);
	        			 
	        		 }else{
	        			 if(map!=null){
	        				
	        				 console.log("idd:"+idd);
	        				 addMarker(latt,lngg,idd);
		        			
		        			 
		        		 }else{
		        			 console.log("idd:"+idd);
		        			 addMarker(latt,lngg,idd);
		        			 
		        		 }
	        			 
	        		 }
	        		
	        		
	        	
	        	$("#lang_td").html("LLatitude: "+mapJson.latitude);
	        	$("#lat_td").html("LLongitude: "+mapJson.longitude);
	            
	        });
	    });
	




	
	 
	 
});