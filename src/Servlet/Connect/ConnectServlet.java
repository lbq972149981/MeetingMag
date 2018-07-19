package Servlet.Connect;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import dbdao.DbConnection;

public class ConnectServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6117749978841924343L;
	private DbConnection dbconn = null;
	@Override
	public void init() throws ServletException {
		// TODO 自动生成的方法存根
		super.init();
//		dbconn = new DbConnection("root", "root", "meetingmanage", "127.0.0.1", "3306", dbconn.mysql);
		dbconn = new DbConnection();
		this.getServletContext().setAttribute("conn", dbconn);
	}
	@Override
	public void destroy() {
		// TODO 自动生成的方法存根
		super.destroy();
	}
	public DbConnection getDbconn() {
		return dbconn;
	}
	public void setDbconn(DbConnection dbconn) {
		this.dbconn = dbconn;
	}
	
}
