package dbdao;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class DbConnMethon {

	private Statement st;

	public DbConnMethon(Statement st) {
		this.st = st;
	}

	public int insert(String sql) {
		int t = 0;
		try {
			t = st.executeUpdate(sql);
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return t;
	}

	public int update(String sql) {
		int t = 0;
		try {
			t = st.executeUpdate(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return t;
	}
	public int del(String sql) {
		int t = 0;
		try {
			t = st.executeUpdate(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return t;
	}

	public ResultSet query(String sql) {
		ResultSet rs=null;
		try {
			rs = st.executeQuery(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return rs;
	}
	//select * from proposer_t
	public ResultSet PageQuery(String sql,PageBean pageBean) {
		ResultSet rs=null;
		try {
			int count = queryCount(sql);
			if(count==0){
				return null;
			}
			pageBean.setCount(count);
			sql = sql + " limit "+pageBean.getStartrow()+","+pageBean.getPageSize();
			rs = st.executeQuery(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rs;
	}
	public int queryCount(String sql) throws SQLException {
		String countsql = "select count(*) c from ("+sql+") t";
		ResultSet rs=this.query(countsql);
		if(rs.next()){
			return rs.getInt(1);
		}
		return 0;
	}
	@Override
	protected void finalize() throws Throwable {

		super.finalize();
		if(st!=null)
		{
			st.close();
		}
	}
	
	public  <E> List<E> queryObjectList(String sql,String ClassName) throws SQLException, IllegalArgumentException, IllegalAccessException, InstantiationException, ClassNotFoundException
	{
		ResultSet  rs=st.executeQuery(sql);
		ResultSetMetaData meta=rs.getMetaData();
		int count=meta.getColumnCount();
		Class cla=Class.forName(ClassName);
		Field[]  fs=cla.getDeclaredFields();
		List<E> list=new ArrayList<E>();
		while(rs.next())
		{
			Object obj=cla.newInstance();
			for(int i=1;i<=count;i++)
			{
				for(Field f:fs)
				{
					if(f.getName().equals(meta.getColumnName(i))) 
					{
						if("INT".equals(meta.getColumnTypeName(i)))
						{
							f.set(obj, rs.getInt(meta.getColumnName(i)));
						}
						if("VARCHAR".equals(meta.getColumnTypeName(i)))
						{
							f.set(obj, rs.getString(meta.getColumnName(i)));
						}
						
					}
				}
			}
			list.add((E)obj);
		}
		rs.close();
		return list;
	}


	public  <E> List<E> queryObjectList1(String sql,String ClassName,PageBean pageBean) throws SQLException, IllegalArgumentException, IllegalAccessException, InstantiationException, ClassNotFoundException
	{

		ResultSet  rs=PageQuery(sql,pageBean);
		ResultSetMetaData meta=rs.getMetaData();
		int count=meta.getColumnCount();
		Class cla=Class.forName(ClassName);
		Field[]  fs=cla.getDeclaredFields();

		List<E> list=new ArrayList<E>();

		while(rs.next())
		{
			Object obj=cla.newInstance();
			for(int i=1;i<=count;i++)
			{
				for(Field f:fs)
				{
					if(f.getName().equals(meta.getColumnName(i)))
					{
						if("INT".equals(meta.getColumnTypeName(i)))
						{
							f.set(obj, rs.getInt(meta.getColumnName(i)));
						}
						if("VARCHAR".equals(meta.getColumnTypeName(i)))
						{
							f.set(obj, rs.getString(meta.getColumnName(i)));
						}

					}
				}
			}
			list.add((E)obj);
		}
		rs.close();
		return list;
	}

}
