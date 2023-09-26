package in.softserv.vtb.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import in.softserv.vtb.db.DBConnection;
import in.softserv.vtb.dto.LocationDTO;

public class UtilityImpl {

	public void setLocationInDB(LocationDTO lDTO) {
		// TODO Auto-generated method stub
	
		 try (Connection connection = DBConnection.getConnection();
				   PreparedStatement statement = 
				     connection.prepareStatement("UPDATE MAPINFO SET longitude = ?, latitude = ?, status = ? WHERE truckId = ?")) {
				  statement.setString(1, lDTO.getLongitude());
				  statement.setString(2, lDTO.getLatitude());
				  statement.setString(3, lDTO.getStatus());
				  statement.setString(4, lDTO.getId());
				  statement.executeUpdate();
				 } catch (SQLException ex) {
				  ex.printStackTrace();
				 } catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	}
	
}
