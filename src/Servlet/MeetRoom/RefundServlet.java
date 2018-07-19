package Servlet.MeetRoom;

import bean.proroom;
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

public class RefundServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = new DbConnMethon(dbConn.createStatement());
        proroom prom = new proroom();
        RequestBean.<proroom>getBean(req,prom);
        int id = Integer.parseInt(req.getSession().getAttribute("id").toString());
//        String deletesql = "delete from proroom_t where pro_id ='"+id+"'";
        String deletesql = "{call deleteRoom('"+id+"')}";
        int tiao = dbmethod.update(deletesql);
        List<proroom> list = null;
        try {
            list=(List<proroom>)dbmethod.<proroom>queryObjectList("{call selectRoom()}", proroom.class.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        req.setAttribute("list",list);
        req.getRequestDispatcher("defendMroom.jsp").forward(req,resp);
    }
    @Override
    public void init() throws ServletException {
        super.init();
        dbConn = (DbConnection)this.getServletContext().getAttribute("conn");
    }
}
