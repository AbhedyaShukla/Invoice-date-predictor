package com.higradius;
import java.sql.*;

public class DBConn {
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String url = "jdbc:mysql://localhost:3306/h2h_internship";
	static final String username = "root";
	static final String password = "good";
	static Connection conn = null;
	
	public Connection initializeDatabase() {
		// TODO Auto-generated method stub	
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(url,username,password);
		}
		
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return conn;
	}
}
