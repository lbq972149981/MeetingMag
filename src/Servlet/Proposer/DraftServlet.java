package Servlet.Proposer;

import bean.Proposer;
import bean.RequestBean;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import dbdao.DbConnMethon;
import dbdao.DbConnection;
import dbdao.DbProcedure;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class DraftServlet extends HttpServlet{
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
        }
        /* String sq = "{call insertPro('" + pro.getPro_name()+ "','" + pro.getMeet_name() + "','"+pro.getMeet_type()+"','"+pro.getMeet_time()+"','"+pro.getMeet_leader()+"','"+pro.getMeet_staff()+"','"+pro.getMeet_branch()+"','"+pro.getMeet_content()+"','"+pro.getMeet_theme()+"','"+pro.getMeet_static()+"')}";
        DbProcedure procedure = new DbProcedure();
        procedure.executeProceduce(sq);*/
        String sq = "{call insertPro('" + pro.getPro_name()+ "','" + pro.getMeet_name() + "','"+pro.getMeet_type()+"','"+pro.getMeet_time()+"','"+pro.getMeet_leader()+"','"+pro.getMeet_staff()+"','"+pro.getMeet_branch()+"','"+pro.getMeet_content()+"','"+pro.getMeet_theme()+"','"+pro.getMeet_static()+"')}";
        int tiao = dbmethod.insert(sq);
        //int tiao = dbmethod.insert("insert into proposer_t(pro_name,meet_name,meet_type,meet_time,meet_leader,meet_staff,meet_branch,meet_content,meet_theme,meet_static) values('" + pro.getPro_name()+ "','" + pro.getMeet_name() + "','"+pro.getMeet_type()+"','"+pro.getMeet_time()+"','"+pro.getMeet_leader()+"','"+pro.getMeet_staff()+"','"+pro.getMeet_branch()+"','"+pro.getMeet_content()+"','"+pro.getMeet_theme()+"','"+pro.getMeet_static()+"')");
        List<Proposer> list = null;
        try {
            list=(List<Proposer>)dbmethod.<Proposer>queryObjectList("{call selectPro()}", Proposer.class.getName());
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
