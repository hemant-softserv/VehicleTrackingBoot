package in.softserv.vtb.db;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.SQLException;




public class DBConnection {
	
	
    
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
    	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        Connection con = DriverManager.getConnection("jdbc:sqlserver://localhost;databaseName=VT", "sa", "Password!@#");
        return con;
    }
    
    
	
	public static void main(String[] args) throws Exception
    {
		 Connection conn = null;
		 
	        try {
	 
	           
	            conn = DBConnection.getConnection();
	            if (conn != null) {
	                DatabaseMetaData dm = (DatabaseMetaData) conn.getMetaData();
	                System.out.println("Driver name: " + dm.getDriverName());
	                System.out.println("Driver version: " + dm.getDriverVersion());
	                System.out.println("Product name: " + dm.getDatabaseProductName());
	                System.out.println("Product version: " + dm.getDatabaseProductVersion());
	            }
	 
	        } catch (SQLException ex) {
	            ex.printStackTrace();
	        } finally {
	            try {
	                if (conn != null && !conn.isClosed()) {
	                    conn.close();
	                }
	            } catch (SQLException ex) {
	                ex.printStackTrace();
	            }
	        }
    }

}
