package dbdao;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class DbProcedure {
   private Connection conn = null;
   DataSource ds = null;
   public DbProcedure(){
       ds = new ComboPooledDataSource("mysqlId");
   }
   public boolean executeProceduce(String sql){
      try {
         return this.getConn().prepareCall(sql).execute();
      } catch (SQLException e) {
         e.printStackTrace();
      }
      return false;
   }
   public Connection getConn() {
      try {
         conn = ds.getConnection();
      } catch (SQLException e) {
         e.printStackTrace();
      }
      return conn;
   }

   public void setConn(Connection conn) {
      this.conn = conn;
   }
}
