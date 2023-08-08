

var stompClient = null;


$(document).ready(function(){
	if(stompClient!=null)
		stompClient.disconnect();
	
	
	var map;
	var markers= [];
	var shapeCordinates={"polygon":[],"circle":{"radius":'',"center":null}};

	 async function initMap() {
		
		 var center = new google.maps.LatLng(26.7782, 75.8625); //26.996471,75.876472
		 
		   // Request needed libraries.
		  
		   const { Map } = await google.maps.importLibrary("maps");
		   var opts = {
		            zoom: 12,
		            center: center,
		            mapTypeId: google.maps.MapTypeId.ROADMAP
		        };

		   // The map, centered at
		 // map = new Map(document.getElementById("map"),opts);
		   map = new Map(document.getElementById('map'), opts);
		   
		   const {DrawingManager} = await google.maps.importLibrary("drawing");
		  
		   
		   var drawingManager=new DrawingManager({
			   drawingControlOptions:{
				   position: google.maps.ControlPosition.TOP_CENTER,
				   drawingModes:[
					   google.maps.drawing.OverlayType.CIRCLE,
		               google.maps.drawing.OverlayType.POLYGON
					   ]
			   },
			   polygonOptions:{
				   fillcolor:'#ADFF2F',
				   fillopacity:0.5,
				   clickable:true,
				   draggable:false,
				   editable:false
			   },
			   cicleOptions:{
				   fillcolor:'#ffff00',
				   fillopacity:0.2,
				   strokeweight:3,
				   clickable:true,
				   editable:false
			   }
		   });
		   drawingManager.setMap(map);
		   
		   google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
			   if(event.type=='polygon'){
				   shapeCordinates['polygon'] = event.overlay.getPath().getArray();
				   shapeCordinates['circle']['radius']='';
				   shapeCordinates['circle']['center']=null;
			   }else if(event.type=='circle'){
				   shapeCordinates['polygon']=[];
				   shapeCordinates['circle']['radius'] = event.overlay.radius;
				   shapeCordinates['circle']['center'] = event.overlay.center;
			   }

			});
		
		 
		 }
	
	 
	// Add marker
	    function addMarker(lat, lon, idd) {
	    
	    	// polygon 
	    	if(shapeCordinates['polygon'].length>0){
	    		 var p= new google.maps.Polygon( { paths: shapeCordinates['polygon'] } );
	    		 console.log(p);
	    		 var pp=google.maps.geometry.poly.containsLocation(new google.maps.LatLng( lat,lon ),p);
			     if(pp){
			    	 alert("in polygon");
			     }else{
			    	 alert("out polygon");
			     }
	    		
	    	} else if(shapeCordinates['polygon'].length=0) {//circle
	    		
	    		var c=new google.maps.Circle({
				      strokeColor: "#FF0000",
				      strokeOpacity: 0.8,
				      strokeWeight: 2,
				      fillColor: "#FF0000",
				      fillOpacity: 0.35,
				      center: shapeCordinates['circle']['center'],
				      radius: shapeCordinates['circle']['radius']
				    });
	    		var cc=c.getBounds().contains(new google.maps.LatLng( lat,lon ))
	    		if(cc){
	    			alert("in circle");
	    		}else{
	    			alert("out circle");
	    		}
	    	} 
	    	
	        deleteMarkers(idd);
	        
	        var marker = new google.maps.Marker({
	            position: new google.maps.LatLng(lat, lon),
	            map: map,
	            customInfo:idd
	        });
	        markers.push(marker);
	       // map.setCenter(new google.maps.LatLng(lat, lon));
	       
	        
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
	    initMap();

		var socket = new SockJS('https://247rsa.softservtest.com/VehicleTrackingBoot/updateMapLocation');
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