package bean;
import java.lang.reflect.Field;
import javax.servlet.http.HttpServletRequest;
public class RequestBean {
	public static <E> E getBean(HttpServletRequest req,E e)
	{
		
		Class c=e.getClass();
		Field[]  fs=c.getDeclaredFields();
//		try {
//			e=(E)c.newInstance();
//		} catch (InstantiationException e1) {
//			// TODO 自动生成的 catch 块
//			e1.printStackTrace();
//		} catch (IllegalAccessException e1) {
//			// TODO 自动生成的 catch 块
//			e1.printStackTrace();
//		}
		for(Field  f:fs)
		{
			String value=req.getParameter(f.getName());
			
			if(value!=null &&!value.trim().equals(""))
			{
				
				f.setAccessible(true);
				try {
					
					if(f.getType().getName().equals("int")||f.getType().getName().equals("java.lang.Integer"))
					{
						f.set(e,Integer.parseInt(value.trim()) );
					
					}
					if(f.getType().getName().equals("java.lang.String"))
					{
						f.set(e,value );
					
					}
					
				} catch (IllegalArgumentException e1) {
					// TODO 自动生成的 catch 块
					e1.printStackTrace();
				} catch (IllegalAccessException e1) {
					// TODO 自动生成的 catch 块
					e1.printStackTrace();
				}
			}
		}
		return e;
	}
}
