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

public class AddMSumServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = new DbConnMethon(dbConn.createStatement());
        MeetSummary meetsum = new MeetSummary();
        RequestBean.<MeetSummary>getBean(req,meetsum);
        meetsum.setMsummary_status("未发布");
        //String sql = "insert into meetsummary_t(msummary_time,msummary_place,msummary_lead,msummary_staff,msummary_absent,msummary_pro,msummary_branch,msummary_theme,msummary_content,msummary_sumcontent,msummary_status) values('" + meetsum.getMsummary_time()+ "','" + meetsum.getMsummary_place() + "','"+meetsum.getMsummary_lead()+"','"+meetsum.getMsummary_staff()+"','"+meetsum.getMsummary_absent()+"','"+meetsum.getMsummary_pro()+"','"+meetsum.getMsummary_branch()+"','"+meetsum.getMsummary_theme()+"','"+meetsum.getMsummary_content()+"','"+meetsum.getMsummary_sumcontent()+"','"+meetsum.getMsummary_status()+"')";
        String sql = "{call insertSummary('"+meetsum.getMsummary_time()+"','"+meetsum.getMsummary_place()+"','"+meetsum.getMsummary_lead()+"','"+meetsum.getMsummary_staff()+"','"+meetsum.getMsummary_absent()+"','"+meetsum.getMsummary_pro()+"','"+meetsum.getMsummary_branch()+"','"+meetsum.getMsummary_theme()+"','"+meetsum.getMsummary_content()+"','"+meetsum.getMsummary_sumcontent()+"','"+meetsum.getMsummary_status()+"')}";
        int tiao = dbmethod.insert(sql);
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
