package com.higradius;
import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.*;
import java.text.SimpleDateFormat;

public class mileStone1 {

	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://127.0.0.1:3306/h2h_internship";
	// Database credentials
	static final String USER = "root";
	static final String PASS = "good";

	public static void main(String[] args) {
		long start = System.currentTimeMillis();
		Connection conn = null;
		PreparedStatement pstmt=null;
		
		String query = "INSERT INTO invoice_details(business_code, cust_number, name_customer, clear_date, business_year, doc_id, "
				+ "posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, area_business, "
				+ "total_open_amount, baseline_create_date, cust_payment_terms, invoice_id, isOpen)"
				+ "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
		
		try {
			// STEP 2: Register JDBC driver
			Class.forName("com.mysql.cj.jdbc.Driver");
			// STEP 3: Open a connection
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			
			if(conn!=null)
			{
				conn.setAutoCommit(false);
				System.out.println("Connection successful");
			}
			else
				System.out.println("Connection unsuccessful");
			
			pstmt = conn.prepareStatement(query);
			
			System.out.println("Executing the given query...");
			
			String path = "C:\\1828001(1).csv";
			BufferedReader br =new BufferedReader(new FileReader(path));
			br.readLine();
			
			ArrayList<milestone1Pojo> list = new ArrayList<milestone1Pojo>();
			
			SimpleDateFormat datetype1 = new SimpleDateFormat("yyyyMMdd", Locale.ENGLISH);
			SimpleDateFormat datetype2 = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat datetype3 = new SimpleDateFormat("dd-MM-yyyy HH:mm");
			SimpleDateFormat datetype4 = new SimpleDateFormat("dd-MM-yyyy");
			String s = "";
			
			while ((s =br.readLine()) != null) {
				String[] arr = s.split(",");
				milestone1Pojo obj = new milestone1Pojo();
				
				if(!arr[0].isEmpty())
	               	obj.setBusiness_code(arr[0]);
	            if(!arr[1].isEmpty())
				  	obj.setCust_number(arr[1]);
	            if(!arr[2].isEmpty())
				  	obj.setName_customer(arr[2]);
	            if(!arr[3].isEmpty())
				  	obj.setClear_date(java.sql.Date.valueOf(datetype2.format(datetype3.parse(arr[3]))));
	            if(!arr[4].isEmpty())
				  	obj.setBusiness_year(Integer.parseInt(arr[4].replace(".0","")));
	            if(!arr[5].isEmpty())
				  	obj.setDoc_id(Long.parseLong(arr[5]));
	            if(!arr[6].isEmpty())
				  	obj.setPosting_date(java.sql.Date.valueOf(datetype2.format(datetype4.parse(arr[6]))));
	            if(!arr[7].isEmpty())
				  	obj.setDocument_create_date(java.sql.Date.valueOf(datetype2.format(datetype1.parse(arr[7]))));
	            if(!arr[8].isEmpty())
				  	obj.setDue_in_date(java.sql.Date.valueOf(datetype2.format(datetype1.parse(arr[8]))));
	            if(!arr[9].isEmpty())
				  	obj.setInvoice_currency(arr[9]);
	            if(!arr[10].isEmpty())
				  	obj.setDocument_type(arr[10]);
	            if(!arr[11].isEmpty())
				  	obj.setPosting_id(Integer.parseInt(arr[11]));
	            if(!arr[12].isEmpty())
				  	obj.setArea_business(arr[12]);
	            if(!arr[13].isEmpty())
				  	obj.setTotal_open_amount(Double.parseDouble(arr[13]));
	            if(!arr[14].isEmpty())
				  	obj.setBaseline_create_date(java.sql.Date.valueOf(datetype2.format(datetype1.parse(arr[14]))));
	            if(!arr[15].isEmpty())
				  	obj.setCust_payment_terms(arr[15]);
	            if(!arr[16].isEmpty())
				  	obj.setInvoice_id(Long.parseLong(arr[16]));
	            if(!arr[17].isEmpty())
				  	obj.setIsOpen(Integer.parseInt(arr[17]));
	            
	            list.add(obj);
			}
		
			System.out.println("Number of rows: "+ list.size());
			
			System.out.println("Adding to Database");
			
			int c=0;
			
	        int batchsize=100;
	        
	        for(int i=0;i<list.size();i++) {   
	             if(list.get(i).getBusiness_code()!=null)	
	                pstmt.setString(1, list.get(i).getBusiness_code());
	             else
	             	pstmt.setNull(1, java.sql.Types.VARCHAR);
	             
	             
	             if(list.get(i).getCust_number()!=null)
	                pstmt.setString(2, list.get(i).getCust_number());
	             else
	                pstmt.setNull(2, java.sql.Types.VARCHAR);
	             
	             if(list.get(i).getName_customer()!=null)
	                 pstmt.setString(3, list.get(i).getName_customer());
	               else
	              	 pstmt.setNull(3, java.sql.Types.VARCHAR);
	             
	             if(list.get(i).getClear_date()!=null)
	                pstmt.setDate(4, list.get(i).getClear_date());
	             else
	             	pstmt.setNull(4, java.sql.Types.DATE);
	             
	             if(list.get(i).getBusiness_year()!=null)
	                pstmt.setInt(5, list.get(i).getBusiness_year());
	             else
	             	pstmt.setNull(5, java.sql.Types.INTEGER);
	             
	             
	             if(list.get(i).getDoc_id()!=null)
	                pstmt.setLong(6, list.get(i).getDoc_id());
	             else 
	             	pstmt.setNull(6, java.sql.Types.BIGINT);
	             
	             
	             if(list.get(i).getPosting_date()!=null)
	             	pstmt.setDate(7, list.get(i).getPosting_date());
	             else 
	              	pstmt.setNull(7, java.sql.Types.DATE);
	             
	             
	              if(list.get(i).getDocument_create_date()!=null)
	                pstmt.setDate(8, list.get(i).getDocument_create_date());
	              else
	             	 pstmt.setNull(8, java.sql.Types.DATE);
	              
	              
	              if(list.get(i).getDue_in_date()!=null)
	                pstmt.setDate(9, list.get(i).getDue_in_date());
	              else
	             	 pstmt.setNull(9, java.sql.Types.DATE);
	              
	              
	              if( list.get(i).getInvoice_currency()!=null)
	                pstmt.setString(10, list.get(i).getInvoice_currency());
	              else
	             	 pstmt.setNull(10, java.sql.Types.VARCHAR);
	              
	              
	              if( list.get(i).getDocument_type()!=null)
	                  pstmt.setString(11, list.get(i).getDocument_type());
	              else
	               	 pstmt.setNull(11, java.sql.Types.VARCHAR);
	              
	              if( list.get(i).getPosting_id()!=null)
	                  pstmt.setInt(12, list.get(i).getPosting_id());
	              else
	               	 pstmt.setNull(12, java.sql.Types.INTEGER);
	              
	              if( list.get(i).getArea_business()!=null)
	                  pstmt.setString(13, list.get(i).getArea_business());
	              else
	               	 pstmt.setNull(13, java.sql.Types.VARCHAR);
	              
	              if( list.get(i).getTotal_open_amount()!=null)
	                  pstmt.setDouble(14, list.get(i).getTotal_open_amount());
	              else
	               	 pstmt.setNull(14, java.sql.Types.DOUBLE);
	              
	              if( list.get(i).getBaseline_create_date()!=null)
	                  pstmt.setDate(15, list.get(i).getBaseline_create_date());
	              else
	               	 pstmt.setNull(15, java.sql.Types.DATE);
	              
	              if( list.get(i).getCust_payment_terms()!=null)
	                  pstmt.setString(16, list.get(i).getCust_payment_terms());
	              else
	               	 pstmt.setNull(16, java.sql.Types.VARCHAR);
	              
	              if( list.get(i).getInvoice_id()!=null)
	                  pstmt.setLong(17, list.get(i).getInvoice_id());
	              else
	               	 pstmt.setNull(17, java.sql.Types.BIGINT);
	              
	              if( list.get(i).getIsOpen()!=null)
	                  pstmt.setInt(18, list.get(i).getIsOpen());
	              else
	               	 pstmt.setNull(18, java.sql.Types.INTEGER);
	              
	              c++;
	            //ADDING TO THE  BATCH.
	              pstmt.addBatch();
	                       			
	              if(c%batchsize==0) {
	                  pstmt.executeBatch();
	                  c=0;
	              }
	       }//for end
	        
	        pstmt.executeBatch();
	        conn.commit();
			br.close();
	
			System.out.println("DATA LOADING SUCCESSFULL!!");
			long end = System.currentTimeMillis();
            System.out.println("Execution Time: " + (end - start));
	}
		catch(Exception e){
			e.printStackTrace();
		}
		finally {
			try {
				
				pstmt.close();
				conn.close();
				
			}
			catch(Exception e){
				e.printStackTrace();
			}
}
	}
	}