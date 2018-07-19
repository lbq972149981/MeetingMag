package dbdao;
import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DbConnection {

	private Connection conn = null;
	private static final String mysqlurl = "jdbc:mysql://";

	public static final String mysql = "mysql";
	public static final String oracle = "oracle";
	private static final String oracleurl = "jdbc:oracle:thin:@";
	public DataSource ds = null;
	public DbConnection(String name, String password, String dbName, String ip, String port, String dbtype) {
		String url = "";
		if (mysql.equals(dbtype)) {
			url = url + mysqlurl;
			url = url + ip + ":" + port + "/" + dbName;
			try {
				Class.forName("com.mysql.jdbc.Driver");
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		if (oracle.equals(dbtype)) {
			url = url + oracleurl;
			url = url + ip + ":" + port + ":" + dbName;
			try {
				Class.forName("oracle.jdbc.driver.OracleDriver");
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}

		try {
			conn = DriverManager.getConnection(url, name, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public DbConnection(){
		ds = new ComboPooledDataSource("mysqlId");
	}
	public Connection getConn() throws SQLException {
		if(conn == null){
			conn = ds.getConnection();
		}
		return conn;
	}
	public void setConn(Connection conn) {
		this.conn = conn;
	}

	@Override
	protected void finalize() throws Throwable {
		super.finalize();
		if (this.conn != null) {
			conn.close();
		}
	}
	public Statement createStatement() {
		Statement st=null;
		if(this.conn==null)
		{
			try {
				st = getConn().createStatement();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}else {
			try {

				st = this.conn.createStatement();
			} catch (SQLException e) {
				e.printStackTrace();
				return null;
			}
		}
		return st;
	}
}
