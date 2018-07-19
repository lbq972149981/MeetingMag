package tag;

import com.sun.deploy.net.HttpRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

public class SelectTag extends TagSupport{
   private String name;
   private String value;
   private String list;
   private String text;
   private String classname;

   public String getClassname() {
      return classname;
   }

   public void setClassname(String classname) {
      this.classname = classname;
   }

   @Override
   public int doStartTag() throws JspException {
      JspWriter out = this.pageContext.getOut();
      HttpServletRequest req = (HttpServletRequest) this.pageContext.getRequest();
      /**
       * Map类型
       */
      if(req.getAttribute(list) instanceof Map) {
         Map<String,String> map = (Map<String, String>) req.getAttribute(list);
         try {
            out.print("<select name=\"" + name + "\">");
            for (String key : map.keySet()) {

               out.print("<option value=\"" + key + "\">");
               out.print(map.get(key));
               out.print("</option>");
            }
            out.print("</select>");


         } catch (IOException e) {
            e.printStackTrace();
         }
      }

      /**
       * List类型
       */
      if(req.getAttribute(list) instanceof List) {

         try {
            Class cl = Class.forName(classname);
            Field valueField = cl.getDeclaredField(value);
            valueField.setAccessible(true);
            Field textField = cl.getDeclaredField(text);
            textField.setAccessible(true);
            out.print("<select name=\"" + name + "\">");
            for (Object obj : (List)req.getAttribute(list)) {
               out.print("<option value=\"" + valueField.get(obj) + "\">");
               out.print(textField.get(obj));
               out.print("</option>");
            }
            out.print("</select>");
         } catch (IOException e) {
            e.printStackTrace();
         } catch (IllegalAccessException e) {
            e.printStackTrace();
         } catch (NoSuchFieldException e) {
            e.printStackTrace();
         } catch (ClassNotFoundException e) {
            e.printStackTrace();
         }
      }
      System.out.println(name+value+list+text);
      return super.doStartTag();
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getValue() {
      return value;
   }

   public void setValue(String value) {
      this.value = value;
   }

   public String getList() {
      return list;
   }

   public void setList(String list) {
      this.list = list;
   }

   public String getText() {
      return text;
   }

   public void setText(String text) {
      this.text = text;
   }
}
