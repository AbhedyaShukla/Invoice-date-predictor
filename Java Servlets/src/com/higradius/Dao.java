package com.higradius;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.sql.*;
import java.util.ArrayList;
public class Dao {
	
	
	
	public static Connection getConnection(){  
		final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
		final String DB_URL = "jdbc:mysql://127.0.0.1:3306/h2h_internship";
		// Database credentials
		final String USER = "root";
		final String PASS = "good";
        Connection con = null;  
        try{  
        	Class.forName(JDBC_DRIVER);
			con = DriverManager.getConnection(DB_URL, USER, PASS);  
        }catch(Exception e){System.out.println(e);}  
        return con;
	}
	
	public static int update(milestone1Pojo e){  
        int status=0;  
        try{  
            Connection con = Dao.getConnection();  
            PreparedStatement ps=con.prepareStatement(  
                         "update invoice_details set total_open_amount=?, notes=? where invoice_id=?");  
            
            ps.setDouble(1,e.getTotal_open_amount());   
            ps.setString(2,e.getNotes()); 
            ps.setLong(3, e.getInvoice_id());
            
            status=ps.executeUpdate();  
              
            con.close();  
        }catch(Exception ex){ex.printStackTrace();}  
          
        return status;  
    }
	
	public static int addInvoice(milestone1Pojo e){  
        int status=0;  
        try{  
            Connection con = Dao.getConnection();  
            PreparedStatement ps=con.prepareStatement(  
                         "insert into invoice_details(name_customer,invoice_id,total_open_amount, due_in_date, notes, doc_id) values (?,?,?,?,?,?)");  
            ps.setString(1,e.getName_customer());  
            ps.setLong(2,e.getInvoice_id());  
            ps.setDouble(3,e.getTotal_open_amount());  
            ps.setDate(4,e.getDue_in_date()); 
            ps.setString(5,e.getNotes());  
            ps.setLong(6, generateId());
            
            status=ps.executeUpdate();  
              
            con.close();  
        }catch(Exception ex){ex.printStackTrace();}           
        return status;  
    } 
	
	 public static boolean delete(DeletePojo id){  
	        int status=0;  
	        try{  
	            Connection con = Dao.getConnection();  
	            PreparedStatement ps = con.prepareStatement("delete from invoice_details where invoice_id=?");  
	              
	            ArrayList<Long> list = id.getInvoice_id();
	            
	            for(long i : list){
	            	//System.out.print(i);
	            	ps.setLong(1, i);
	            	ps.addBatch();
	            }
	            
	            ps.executeBatch();  
	            
	               System.out.print(status);    
	            con.close();  
	            return true;
	        }catch(Exception e){e.printStackTrace(); return false;}
	          
	    }
	 
	 public static  long generateId() {
		  ThreadLocalRandom random = ThreadLocalRandom.current();
		  return random.nextLong(10_000_000_000L, 100_000_000_000L);
		}
}
