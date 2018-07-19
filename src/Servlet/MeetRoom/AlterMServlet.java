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

public class AlterMServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = new DbConnMethon(dbConn.createStatement());
        proroom prom = new proroom();
        RequestBean.<proroom>getBean(req,prom);
        int id = Integer.parseInt(req.getSession().getAttribute("idid").toString());
//        String updatesql = "update proroom_t set proroom_type='" + promeetroom.getProroom_type() + "',proroom_head='" +promeetroom.getProroom_head()+ "',proroom_degree='"+promeetroom.getProroom_degree()+"',proroom_roomname='"+promeetroom.getProroom_roomname()+"',proroom_stime='"+promeetroom.getProroom_stime()+"',proroom_etime='"+promeetroom.getProroom_etime()+"',proroom_resource='"+promeetroom.getProroom_resource()+"',proroom_equipment='"+promeetroom.getProroom_equipment()+"',proroom_service='"+promeetroom.getProroom_service()+"',proroom_proposer='"+promeetroom.getProroom_proposer()+"'where proroom_id =" + id + "";
        String updatesql = "{call alterRoom('"+prom.getMeet_type()+"','"+prom.getMeet_head()+"','"+prom.getMeet_degree()+"','"+prom.getRoom_name()+"','"+prom.getMeet_starttime()+"','"+prom.getMeet_endtime()+"','"+prom.getMeet_resource()+"','"+prom.getMeet_equipment()+"','"+prom.getMeet_service()+"','"+prom.getPro_name()+"','"+id+"')}";
        int tiao = dbmethod.insert(updatesql);
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
