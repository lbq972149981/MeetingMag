package Servlet.Proposer;

import bean.Proposer;
import bean.RequestBean;
import dbdao.DbConnMethon;
import dbdao.DbConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public class CheckServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = null;
        dbmethod = new DbConnMethon(dbConn.createStatement());
        Proposer pro = new Proposer();
        RequestBean.<Proposer>getBean(req,pro);
        int id = Integer.parseInt(req.getParameter("id"));
        List<Proposer> list = null;
        try {
//            String sql = "select * from proposer_t where pro_id='"+id+"'";
            String sql = "{call checkPro('"+id+"')}";
            list=(List<Proposer>)dbmethod.<Proposer>queryObjectList(sql, Proposer.class.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        req.setAttribute("list",list);
        req.getRequestDispatcher("checkMapply.jsp").forward(req,resp);
    }
    @Override
    public void init() throws ServletException {
        super.init();
        dbConn = (DbConnection)this.getServletContext().getAttribute("conn");
    }
}
