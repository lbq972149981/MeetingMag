package dbdao;
public class PageBean {
    private static final int size=2;
    private int currPage;
    private int pageCount;
    private int pageSize;
    private int count;
    public PageBean(){
        this.pageSize = size;
        this.currPage = 1;
    }
    public PageBean(int pageSize){
        this.pageSize = pageSize;
        this.currPage = 1;
    }
    public int prePage(){
       return this.currPage == 1?1:this.currPage-1;
    }
    public int nextPage(){
        return this.currPage == this.pageCount?this.pageCount:this.currPage+1;
    }
    public int getStartrow(){
        return this.pageSize*(this.getCurrPage()-1);
    }

    public int getCurrPage() {
        return currPage;
    }

    public void setCurrPage(int currPage) {
        this.currPage = currPage;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
        this.pageCount = count%this.pageSize==0?count/this.pageSize:count/this.pageSize+1;
    }

}
