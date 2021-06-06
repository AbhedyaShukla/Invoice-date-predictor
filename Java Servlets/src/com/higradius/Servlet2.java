package com.higradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class Servlet2
 */
@WebServlet("/Servlet2")
public class Servlet2 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Servlet2() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html");  
        PrintWriter out=response.getWriter();  
        
//		SimpleDateFormat datetype1 = new SimpleDateFormat("yyyyMMdd", Locale.ENGLISH);
//		SimpleDateFormat datetype2 = new SimpleDateFormat("yyyy-MM-dd");
        
//		String customerName = request.getParameter("customer_name");
//		String customerNo = request.getParameter("customer_no");
//		String invoiceNo = request.getParameter("invoice_no");
//		String invoiceAmount = request.getParameter("invoice_amount");
//		String dueDate = request.getParameter("due_date");
//		String notes = request.getParameter("notes");
		
//		milestone1Pojo obj = new milestone1Pojo();
//		
//		obj.setName_customer(customerName);
//		obj.setCust_number(customerNo);
//		obj.setInvoice_id(Long.parseLong(invoiceNo));
//		obj.setTotal_open_amount(Double.parseDouble(invoiceAmount));
//		try {
//			obj.setDue_in_date(java.sql.Date.valueOf(datetype2.format(datetype1.parse(dueDate))));
//		} catch (ParseException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		obj.setNotes(notes);
//		
//		 int status=Dao.addInvoice(obj);  
//	        if(status>0){  
//	            out.print("<p>Record saved successfully!</p>");  
//	            request.getRequestDispatcher("index.html").include(request, response);  
//	        }else{  
//	            out.println("Sorry! unable to save record");  
//	        }  
		
		BufferedReader reader = request.getReader();
		StringBuffer stringBuffer = new StringBuffer();
		String line="";
		Gson gson = new Gson();
		while((line=reader.readLine())!=null) 
			stringBuffer.append(line);
		String json = stringBuffer.toString();
		System.out.print(json);
		milestone1Pojo invoiceDetails = gson.fromJson(json, milestone1Pojo.class);
		
		 int status = Dao.addInvoice(invoiceDetails);  
		 
	        if(status>0){  
	        	HashMap<String, String> data = new HashMap<>();
	        	data.put("message", "invoice updated");
	        	response.setStatus(200);
	        	response.setContentType("application/json");
				out.print(gson.toJson(data));
				out.flush();
	        }else{  
	        	HashMap<String, String> data = new HashMap<>();
	        	data.put("message", "invoice not updated");
	        	response.setStatus(400);
	        	response.setContentType("application/json");
				out.print(gson.toJson(data));
				out.flush();
	        } 
	          
	        out.close(); 
		
		
		
	}

}
