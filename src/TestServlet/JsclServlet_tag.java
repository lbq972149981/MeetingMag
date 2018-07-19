package TestServlet;

import bean.Area;
import bean.Worker;
import dbdao.PageBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsclServlet_tag extends HttpServlet{
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        /*Map<String,String> place = new HashMap<>();
        place.put("01","北京");
        place.put("02","北京1");
        place.put("03","北京2");
        place.put("04","北京3");
        place.put("05","北京4");
        place.put("06","北京5");
        req.setAttribute("map",place);*/
        List<Area> list = new ArrayList<>();
        for(int i=0;i<5;i++){
            Area a = new Area();
            a.setId("0"+i);
            a.setName("Beijing"+i);
            list.add(a);
        }
        req.setAttribute("map",list);
        req.getRequestDispatcher("test.jsp").forward(req,resp);
    }

    @Override
    public void init() throws ServletException {
        super.init();
    }
}
