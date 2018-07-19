package filter;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

public class LoginFilter implements Filter {

	@Override
	public void destroy() {
		// TODO 自动生成的方法存根

	}
	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
			throws IOException, ServletException {
		// TODO 自动生成的方法存根
		HttpServletRequest req = (HttpServletRequest)arg0;
		HttpServletResponse res = (HttpServletResponse)arg1;
		Cookie[] cookie = req.getCookies();
		boolean islogin = false;

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
		for(String username:user.keySet()) {
			if (cookie != null) {
				for (Cookie c : cookie) {
					if ((username.equals(c.getName())) && (user.get(username).equals(c.getValue()))) {
						islogin = true;
					}
				}
			}
		}
		if(islogin){
			arg2.doFilter(req, res);
		}else{
			res.sendRedirect(req.getContextPath()+"/login.html");
		}
	}
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO 自动生成的方法存根
	}
}
