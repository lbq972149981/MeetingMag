package Servlet.Proposer;

import bean.Proposer;
import bean.RequestBean;
import dbdao.DbConnMethon;
import dbdao.DbConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

public class AlterServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = new DbConnMethon(dbConn.createStatement());
        Proposer pro = new Proposer();
        RequestBean.<Proposer>getBean(req,pro);
        String action = req.getParameter("action");
        switch (action){
            case "submit":
                pro.setMeet_static("发布");break;
            case "save":
                pro.setMeet_static("未发布");break;
            case "null":
                pro.setMeet_static("未发布");break;
        }
        String str = req.getSession().getAttribute("a").toString();
        int id = Integer.parseInt(str);
//        String updatesql = "update proposer_t set pro_name='" + pro.getPro_name() + "',meet_name='" + pro.getMeet_name() + "',meet_type='"+pro.getMeet_type()+"',meet_time='"+pro.getMeet_time()+"',meet_leader='"+pro.getMeet_leader()+"',meet_staff='"+pro.getMeet_staff()+"',meet_branch='"+pro.getMeet_branch()+"',meet_content='"+pro.getMeet_content()+"',meet_theme='"+pro.getMeet_theme()+"',meet_static='"+pro.getMeet_static()+"'where pro_id =" + id + "";
        String updatesql = "{call alterPro('" + pro.getPro_name() + "','" + pro.getMeet_name() + "','"+pro.getMeet_type()+"','"+pro.getMeet_time()+"','"+pro.getMeet_leader()+"','"+pro.getMeet_staff()+"','"+pro.getMeet_branch()+"','"+pro.getMeet_content()+"','"+pro.getMeet_theme()+"','"+pro.getMeet_static()+"','" + id +"')}";
        int tiao = dbmethod.insert(updatesql);
        List<Proposer> list = null;
        try {
            String sq = "{call selectPro()}";
//            String sq = "select pro_id,pro_name,meet_name,meet_type,meet_time,meet_leader,meet_staff,meet_branch,meet_content,meet_theme,meet_static from proposer_t";
            list=(List<Proposer>)dbmethod.<Proposer>queryObjectList(sq, Proposer.class.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        req.setAttribute("list",list);
        req.getRequestDispatcher("defendMapply.jsp").forward(req,resp);
    }
    @Override
    public void init() throws ServletException {
        super.init();
        dbConn = (DbConnection)this.getServletContext().getAttribute("conn");
    }
}
