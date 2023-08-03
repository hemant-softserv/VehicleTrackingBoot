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
		System.out.println("before sleep");
		System.out.println(lDTO);
		//Thread.sleep(2000);
		return lDTO;
	}
	
}