import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ContactDao {
 private String dburl="jdbc:mysql://localhost:3306/sys";
 private String dbuname="root";
 private String dbpassword="1234";
 private String dbdriver="com.mysql.jdbc.Driver";
 
 public void loadDriver(String dbDriver) {
	 try {
		Class.forName(dbDriver);
	} catch (ClassNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
 }
 
 public Connection getConnection() {
	 Connection con=null;
	 try {
		 con=DriverManager.getConnection(dburl,dbuname,dbpassword);
		 }catch (SQLException e) {
			 e.printStackTrace();
		 }
			return con;
 }
 
 public String insert(Member member) {
	 loadDriver(dbdriver);
	 Connection con=getConnection();
	 String result="data entered successfully";
	 String sql="insert into sys.member values(?,?,?)";
	 try {
		PreparedStatement ps=con.prepareStatement(sql);
		ps.setString(1, member.getName());
		ps.setString(2, member.getEmail());
		ps.setString(3, member.getFeedback());
		ps.executeUpdate();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		result="Data not entered, try again";
	}
	 
	 return result;
 }
}
