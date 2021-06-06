package com.higradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class UpdateServlet
 */
@WebServlet("/UpdateServlet")
public class UpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		response.setContentType("text/html");  
        PrintWriter out=response.getWriter();
		
		BufferedReader reader = request.getReader();
		StringBuffer stringBuffer = new StringBuffer();
		String line="";
		Gson gson = new Gson();
		while((line=reader.readLine())!=null) 
			stringBuffer.append(line);
		String json = stringBuffer.toString();
		System.out.print(json);
		milestone1Pojo invoiceDetails = gson.fromJson(json, milestone1Pojo.class);
		
		int status = Dao.update(invoiceDetails);  
		 
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
