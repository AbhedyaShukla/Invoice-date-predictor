package com.higradius;

import java.io.IOException;
import java.sql.DriverManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
/**
 * Servlet implementation class servlet1
 */
@WebServlet("/servlet1")
public class servlet1 extends HttpServlet {
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://127.0.0.1:3306/h2h_internship";
	// Database credentials
	static final String USER = "root";
	static final String PASS = "good";
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public servlet1() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	  
		String pageid = request.getParameter("page");  
	    int pageNo = Integer.parseInt(pageid);  
	    int limit=20;  
	    int start = ((pageNo-1) * limit)+1;
       
		try {
			// STEP 2: Register JDBC driver
			Class.forName(JDBC_DRIVER);
			Connection con = DriverManager.getConnection(DB_URL, USER, PASS);
			Statement stmt = con.createStatement();
			String sqlQuery = "SELECT * from invoice_details LIMIT %d OFFSET %d";
			
			String sql = String.format(sqlQuery,limit,start);
			ResultSet rs=stmt.executeQuery(sql);
			System.out.println("Connected");
			   PrintWriter printWriter=response.getWriter();
			   
			   Gson gson = new GsonBuilder().serializeNulls().create();

			   Collection list = new ArrayList();
			   while(rs.next()) {
				   
			    Map<String, Object> obj = new HashMap<>();
			    	   
			           obj.put("business_code", rs.getString(1));
			           obj.put("cust_number", rs.getString(2));
			           obj.put("name_customer", rs.getString(3));
			           obj.put("clear_date", rs.getDate(4));
			           obj.put("business_year", rs.getInt(5));
			           obj.put("doc_id", rs.getLong(6));
			           obj.put("posting_date", rs.getDate(7));
			           obj.put("document_create_date", rs.getDate(8));
			           obj.put("due_in_date", rs.getDate(9));
			           obj.put("invoice_currency", rs.getString(10));
			           obj.put("document_type", rs.getString(11));
			           obj.put("posting_id", rs.getInt(12));
			           obj.put("area_business", rs.getString(13));
			           obj.put("total_open_amount", rs.getDouble(14));
			           obj.put("baseline_create_date", rs.getDate(15));
			           obj.put("cust_payment_terms", rs.getString(16));
			           obj.put("invoice_id", rs.getLong(17));
			           obj.put("isOpen", rs.getInt(18));
			           obj.put("notes", rs.getString(19));
			           
			    
			    list.add(obj);
			   }
			  
			   String userJSON=gson.toJson(list);
			   response.setContentType("application/json");
			   response.setCharacterEncoding("UTF-8");
			   printWriter.write(userJSON);
			   printWriter.close();
			  }
			  catch(Exception p) {
			   System.out.println("error"+p);
			  }
	
	}

	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}





























