package in.softserv.vtb.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import in.softserv.vtb.dto.LocationDTO;

@Controller
public class LocationController {

	@MessageMapping("/loc")
	@SendTo("/topic/updateLoc")
	public LocationDTO updateLoc(LocationDTO lDTO) throws InterruptedException {
		System.out.println("data coming from client/mobile/browser");
		System.out.println(lDTO);
		//Thread.sleep(2000);
		return lDTO;
	}
	
	@MessageMapping("/updateDB")
	public LocationDTO updateDB(LocationDTO lDTO){
		System.out.println("data updating");
		System.out.println("updateDB");
		System.out.println(lDTO);
		
		UtilityImpl utility= new UtilityImpl();
		utility.setLocationInDB(lDTO);
		//Thread.sleep(2000);
		return lDTO;
	}
	
}