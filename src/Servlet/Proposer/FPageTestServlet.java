package Servlet.Proposer;

import bean.Proposer;
import bean.RequestBean;
import dbdao.DbConnMethon;
import dbdao.DbConnection;
import dbdao.PageBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FPageTestServlet extends HttpServlet{
    private static final long serialVersionUID = -5442336831052199861L;
    private DbConnection dbConn = null;
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        DbConnMethon dbmethod = new DbConnMethon(dbConn.createStatement());
        Proposer pro = new Proposer();
        RequestBean.<Proposer>getBean(req,pro);
        PageBean pageBean =new PageBean();
        String page = req.getParameter("page");

        if(page!=null&&!"".equals(page)){
            int pagea=Integer.parseInt(page);
            pageBean.setCurrPage(pagea);
        }
        List<Proposer> list = null;
        try {
            list=dbmethod.queryObjectList1("select * from proposer_t", Proposer.class.getName(),pageBean);
        } catch (Exception e) {
            e.printStackTrace();
        }
        req.setAttribute("list",list);
        req.setAttribute("pageBean",pageBean);
        req.getRequestDispatcher("defendMapply.jsp").forward(req,resp);
    }
    @Override
    public void init() throws ServletException {
        super.init();
        dbConn = (DbConnection)this.getServletContext().getAttribute("conn");
    }
}
