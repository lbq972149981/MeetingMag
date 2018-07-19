package Servlet.MeetSummary;

import bean.MeetSummary;
import bean.RequestBean;
import dbdao.DbConnMethon;
import dbdao.DbConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class PublishServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = new DbConnMethon(dbConn.createStatement());
        MeetSummary meetsum = new MeetSummary();
        RequestBean.<MeetSummary>getBean(req,meetsum);
        int id = Integer.parseInt(req.getParameter("id"));

        List<MeetSummary> list = null;
        try {
//            String sql = "select * from meetsummary_t where msummary_id ='"+id+"'";
            String sql = "{call publish('"+id+"')}";
            list=(List<MeetSummary>)dbmethod.<MeetSummary>queryObjectList(sql, MeetSummary.class.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        req.setAttribute("list",list);
        req.getRequestDispatcher("publishSum.jsp").forward(req,resp);
    }
    @Override
    public void init() throws ServletException {
        super.init();
        dbConn = (DbConnection)this.getServletContext().getAttribute("conn");
    }
}
