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

public class PublishMSumServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = new DbConnMethon(dbConn.createStatement());
        MeetSummary meetsum = new MeetSummary();
        RequestBean.<MeetSummary>getBean(req,meetsum);
        String str = "发布";
        String sid = req.getParameter("id");
        if(sid!=null){
            System.out.println(sid);
            int id = Integer.parseInt(sid);
//            String updatesql = "update meetsummary_t set msummary_status='" + str + "' where msummary_id =" + id + "";
            String updatesql = "{call publishSummary('"+str+"','"+id+"')}";
            int tiao = dbmethod.insert(updatesql);
        }
        List<MeetSummary> list = null;
        try {
            list=(List<MeetSummary>)dbmethod.<MeetSummary>queryObjectList("{call selectSummary()}", MeetSummary.class.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        req.setAttribute("list",list);
        req.getRequestDispatcher("publishMsummary.jsp").forward(req,resp);
    }
    @Override
    public void init() throws ServletException {
        super.init();
        dbConn = (DbConnection)this.getServletContext().getAttribute("conn");
    }
}
