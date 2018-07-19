package Servlet.MeetSummary;

import bean.MeetSummary;
import bean.Proposer;
import bean.RequestBean;
import dbdao.DbConnMethon;
import dbdao.DbConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class AlterMSumServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = new DbConnMethon(dbConn.createStatement());
        MeetSummary meetsum = new MeetSummary();
        RequestBean.<MeetSummary>getBean(req,meetsum);

        String str = req.getSession().getAttribute("id1").toString();
        int id = Integer.parseInt(str);

//        String updatesql = "update meetsummary_t set msummary_time='" + meetsum.getMsummary_time() + "',msummary_place='" + meetsum.getMsummary_place() + "',msummary_lead='"+meetsum.getMsummary_lead()+"',msummary_staff='"+meetsum.getMsummary_staff()+"',msummary_absent='"+meetsum.getMsummary_absent()+"',msummary_pro='"+meetsum.getMsummary_pro()+"',msummary_branch='"+meetsum.getMsummary_branch()+"',msummary_theme='"+meetsum.getMsummary_theme()+"',msummary_content='"+meetsum.getMsummary_content()+"',msummary_sumcontent='"+meetsum.getMsummary_sumcontent()+"'where msummary_id =" + id + "";
        String updatesql = "{call alterSummary('"+meetsum.getMsummary_time()+"','"+meetsum.getMsummary_place()+"','"+meetsum.getMsummary_lead()+"','"+meetsum.getMsummary_staff()+"','"+meetsum.getMsummary_absent()+"','"+meetsum.getMsummary_pro()+"','"+meetsum.getMsummary_branch()+"','"+meetsum.getMsummary_theme()+"','"+meetsum.getMsummary_content()+"','"+meetsum.getMsummary_sumcontent()+"','"+id+"')}";
        int tiao = dbmethod.insert(updatesql);
        List<MeetSummary> list = null;
        try {
            list=(List<MeetSummary>)dbmethod.<MeetSummary>queryObjectList("{call selectSummary()}", MeetSummary.class.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        req.setAttribute("list",list);
        req.getRequestDispatcher("defendMsummary.jsp").forward(req,resp);
    }
    @Override
    public void init() throws ServletException {
        super.init();
        dbConn = (DbConnection)this.getServletContext().getAttribute("conn");
    }
}
