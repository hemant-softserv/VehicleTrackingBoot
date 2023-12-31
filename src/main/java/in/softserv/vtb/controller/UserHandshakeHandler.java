package in.softserv.vtb.controller;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;


import com.sun.security.auth.UserPrincipal;

public class UserHandshakeHandler  extends DefaultHandshakeHandler{

	private final Logger LOG=LoggerFactory.getLogger(UserHandshakeHandler.class);
	@Override
	protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
			Map<String, Object> attributes) {
		// TODO Auto-generated method stub
		final String randomUID= UUID.randomUUID().toString();
		
		LOG.info("User with ID `{}` opened the page",randomUID);
		
		
		
		return new UserPrincipal(randomUID);
	}
}
