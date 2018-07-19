package TestServlet;

import bean.Worker;
import dbdao.PageBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JsclServlet extends HttpServlet{
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        List<Worker> list = new ArrayList<>();
        for(int i=0;i<5;i++){
            Worker w = new Worker();
            w.setAge(10+i);
            w.setName("worker"+i);
            list.add(w);
        }
        req.setAttribute("list",list);
        PageBean pageBean = new PageBean();
        pageBean.setCount(10);
        pageBean.setCurrPage(2);
        PageBean pageBean1 = new PageBean();
        pageBean1.setCount(101);
        pageBean1.setCurrPage(10);
        Worker worker = new Worker();
        worker.setAge(50);
        req.setAttribute("worker",worker);
        req.setAttribute("page",pageBean);
        req.getSession().setAttribute("page",pageBean1);
       req.getRequestDispatcher("test.jsp").forward(req,resp);
    }

    @Override
    public void init() throws ServletException {
        super.init();
    }
}
