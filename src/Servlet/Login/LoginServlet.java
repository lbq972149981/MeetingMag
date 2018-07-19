package Servlet.Login;
import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LoginServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5442336831052199861L;
	
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO 自动生成的方法存根
		Cookie ck = new Cookie(req.getParameter("userName"),req.getParameter("userPwd"));
		res.addCookie(ck);
		DataSource ds = new ComboPooledDataSource("mysqlId");
		ResultSet rs = null;
		Map<String,String> user = new HashMap<>();
		try {
			String sql = "select * from login_user";
			rs = ds.getConnection().createStatement().executeQuery(sql);
			while (rs.next()) {
				user.put(rs.getString("user_name"),rs.getString("user_password"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		boolean flag = false;
		for(String username:user.keySet()){

			if (username.equals(req.getParameter("userName")) && user.get(username).equals(req.getParameter("userPwd"))) {
				flag = true;
				break;
			} else {
				flag = false;
			}
		}
		if(flag)
		res.sendRedirect(req.getContextPath() + "/MeetMag/menu.htm");
		else
		res.sendRedirect(req.getContextPath() + "/login.html");
	}
}
