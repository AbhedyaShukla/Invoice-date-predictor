package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class Search
 */
@WebServlet("/Search")
public class Search extends HttpServlet {
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://127.0.0.1:3306/h2h_internship";
	// Database credentials
	static final String USER = "root";
	static final String PASS = "good";
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Search() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String str = request.getParameter("docID");  
		long invoiceId = Long.parseLong(str);
		
		try {
			// STEP 2: Register JDBC driver
			Class.forName(JDBC_DRIVER);
			Connection con = DriverManager.getConnection(DB_URL, USER, PASS);
			Statement stmt = con.createStatement();
			String sqlQuery = "SELECT cust_number, name_customer, due_in_date, total_open_amount, invoice_id, notes FROM  invoice_details WHERE invoice_id='"+invoiceId+"'";
			
			
			ResultSet rs=stmt.executeQuery(sqlQuery);
			System.out.println("Connected");
			   PrintWriter printWriter=response.getWriter();
			   
			   Gson gson = new GsonBuilder().serializeNulls().create();

			   Collection list = new ArrayList();
			   while(rs.next()) {
				   
			    Map<String, Object> obj = new HashMap<>();
			    	   
			          // obj.put("business_code", rs.getString(1));
			           obj.put("cust_number", rs.getString(1));
			           obj.put("name_customer", rs.getString(2));
			          // obj.put("clear_date", rs.getDate(4));
			         //  obj.put("business_year", rs.getInt(5));
			         //  obj.put("doc_id", rs.getLong(3));
			         //  obj.put("posting_date", rs.getDate(7));
			         //  obj.put("document_create_date", rs.getDate(8));
			           obj.put("due_in_date", rs.getDate(3));
			        //   obj.put("invoice_currency", rs.getString(10));
			        //   obj.put("document_type", rs.getString(11));
			          // obj.put("posting_id", rs.getInt(12));
			         //  obj.put("area_business", rs.getString(13));
			           obj.put("total_open_amount", rs.getDouble(4));
			         //  obj.put("baseline_create_date", rs.getDate(15));
			        //   obj.put("cust_payment_terms", rs.getString(16));
			           obj.put("invoice_id", rs.getLong(5));
			        //   obj.put("isOpen", rs.getInt(18));
			           obj.put("notes", rs.getString(6));
			           
			    
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
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
