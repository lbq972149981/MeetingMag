<html>
<head>
	<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
	<%@page import="java.util.List"%>
	<%@page import="java.util.ArrayList"%>
	<%@page import="bean.Proposer"%>
	<%@page import="bean.MeetRoom"%>
	<%@ page import="bean.ProMeetRoom" %>
	<%@ page import="bean.proroom" %>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>退定会议室</title>

<link href="../css/style.css" rel="stylesheet" type="text/css" />
<link href="../css/extremecomponents.css" rel="stylesheet" type="text/css">

<SCRIPT language=javascript src="../js/common.js"></SCRIPT>
<!-- 日历控件 -->
<script language="javascript" type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<!-- js分页 -->
<Script Language="JavaScript" type="text/JavaScript" src="../js/Page.js"></Script>
<!-- jQuery---双色表格 -->
<script src="../js/jquery-1.2.2.js" type="text/javascript"></script> <script type="text/javascript">
$(document).ready(function(){  //这个就是传说的ready
  $(".stripe tr").mouseover(function(){  //如果鼠标移到class为stripe的表格的tr上时，执行函数
$(this).addClass("over");}).mouseout(function(){   //给这行添加class值为over，并且当鼠标一出该行时执行函数
					$(this).removeClass("over");})  //移除该行的class
  $(".stripe tr:even").addClass("alt");  //给class为stripe的表格的偶数行添加class值为alt
});
</script>

</head>


<body>
<!-- 当前位置div -->
<div id="place"><img src="../images/place_ico.gif" width="31" height="22" align="absmiddle" />当前位置： 行政办公 >> 公共事务管理 >> 会议管理</div>

<!-- 特殊页面所需要的帮助按钮div（如不需要可删除） -->
<div id="help" align="right"><img src="../images/help_ico.gif" alt="帮助" style="CURSOR:pointer" /></div>

<!-- 内容区（控制所包含的div和table的宽度，包含在其中的div不用设宽度，默认即可，table的宽度设成100%。）-->
<div id="content">

	<!-- 列表主标题div -->
    <div class="mainTitle"><img src="../images/bt1_ico.gif" width="31" height="23" align="absmiddle" />退定会议室</div>
	
	<!-- 查询条件列表 -->
	<table class="tableClass" width="100%" border="0" cellPadding="0" cellspacing="1">
	<form class="formClass" name="myform" action="" method="post" target="_blank">
	<tbody>
	<%
		int id = Integer.parseInt(request.getParameter("id"));
		List<proroom> prom = (List<proroom>)session.getAttribute("prom");
		session.setAttribute("id",id);
	%>
	<%
		if(prom!=null){
			for(proroom p:prom){
			    if(p.getPro_id()==id){
	%>
      <tr>
	  <td class="tdLabel" width="15%">
	    <label class="label">会议名称：</label></td>
	    <td class="tdInput" width="35%"><input  name="meet_name" value="十八大">	      </td>
	    <td width="15%" class="tdLabel">会议室名称：</td>
	    <td class="tdInput" width="35%">
		<input  name="proroom_roomname" value="<%=p.getRoom_name()%>">		</td>
      </tr>
      <tr>
	    <td class="tdLabel">会议时间：</td>
	    <td class="tdInput" ><input name="proroom_stime" type="text" class="Wdate"    onFocus="WdatePicker({el:this,maxDate:'#F{$dp.$D(\'d4322\',{d:-0});}'})" value="<%=p.getMeet_starttime()%>" readonly/></td>
		<td class="tdLabel">预订人：</td>
		<td class="tdInput"><input  name="proroom_proposer" value="<%=p.getPro_name()%>"></td>
      </tr>
	<%}}}%>
	  </tbody>
	  </form>
</table> 
	  
     <!-- 查询条件列表所用的按钮 -->
  <div class="queryButton">
<img name="查询" type="image" src="../images/btnQuery.gif" alt="单击此按钮，根据输入条件查询" />
		  &nbsp;&nbsp;<img name="清空" type="image" src="../images/btnClear.gif"  alt="单击此按钮，请空已输入的查询条件" />  
		  <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="title">&nbsp;</td>
              <td class="statusBar">找到2 条记录, 显示 1 到 2 </td>
              <td><!-- 页码table(位于查询结果列表顶部居右)-->
                  <table border="0" align="right" cellpadding="0" cellspacing="0" class="toolbar">
                    <tbody>
                      <tr>
                        <td><img alt=第一页 src="../images/firstPageDisabled.gif"></td>
                        <td><img alt=上一页 src="../images/prevPageDisabled.gif"></td>
                        <td><img src="../images/separator.gif" width="2" height="13"></td>
                        <td>Page
                            <input type="text" name="textfield2" class="pageInput">
                          of 1</td>
                        <td><img src="../images/separator.gif" width="2" height="13"></td>
                        <td><a href="javascript:document.forms.myForm.ec_p.value='2';document.forms.myForm.setAttribute('action','/webapp/oa/issueArticle!pagerIssueArticle.action');document.forms.myForm.setAttribute('method','post');document.forms.myForm.submit()"><img title="下一页" alt="下一页" src="../images/nextPage.gif" border="0"></a></td>
                        <td><a href="javascript:document.forms.myForm.ec_p.value='8';document.forms.myForm.setAttribute('action','/webapp/oa/issueArticle!pagerIssueArticle.action');document.forms.myForm.setAttribute('method','post');document.forms.myForm.submit()"><img title="最后页" alt="最后页" src="../images/lastPage.gif" border="0"></a></td>
                      </tr>
                    </tbody>
                </table></td>
            </tr>
          </table>
  </div> 
   
     <!-- 查询条件与查询结果之间的间隔 -->
     <div class="space"></div>
	 
	  <!-- 查询结果列表 -->
	  <div class=eXtremeTable>	     
		 <!-- 查询结果标题（右侧带页码） -->
		 <!-- 查询结果列表信息 -->
<div id="queryResult">
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="stripe"><!--用class="stripe"来标识需要使用 jQuery---双色表格效果-->
		<thead>
		<tr>
		<td nowrap class="tableHeader1" >会议室名称</td>
		<td class="tableHeader1" >会议名称</td>
		<td class="tableHeader1" >预定人</td>
		<td class="tableHeader1" >会议时间</td>
		<td class="tableHeader1" >预定状态</td>
		<td class="tableHeader1" >操作</td>
		
		</tr>
		</thead>
		
		<tbody>
		<%
			if(prom!=null){
				for(proroom p:prom){
					if(p.getPro_id()==id){
		%>
			<tr>
			<td><%=p.getRoom_name()%></td>
			<td>十八大</td>
			<td><%=p.getPro_name()%></td>
			<td><%=p.getMeet_starttime()%></td>
			<td>已预定</td>
			<td><a href="RefundServlet.html">退定</a></td>
			
			</tr>
		<%}}}%>
		</tbody>
		</table>
			<!-- jQuery---双色表格 -->
			<script type="text/javascript">
			$(document).ready(function(){
			$('a.affLink').mouseover(function(){window.status=this.title;return true;})
			.mouseout(function(){window.status='Done';return true;});
			});
			</script>	
        </div>

	  
	  
	 <!-- 页码table(位于查询结果列表底部居右) -->  
     <div class="pageBottom" >
	  <table border="0" align="right" cellPadding="0" cellSpacing="0" class="toolbar">
		 <tbody>
		   <tr>
			 <td><IMG alt=第一页 src="../images/firstPageDisabled.gif"></td>
			 <td><IMG alt=上一页 src="../images/prevPageDisabled.gif"></td>
			 <td><img src="../images/separator.gif" width="2" height="13"></td>
			 <td>Page<input type="text" name="textfield" class="pageInput">
			   of 1</td>
			 <td><img src="../images/separator.gif" width="2" height="13"></td>
			 <td><A href="javascript:document.forms.myForm.ec_p.value='2';document.forms.myForm.setAttribute('action','/webapp/oa/issueArticle!pagerIssueArticle.action');document.forms.myForm.setAttribute('method','post');document.forms.myForm.submit()"><img title="下一页" alt="下一页" src="../images/nextPage.gif" border="0"></A></td>
			 <td><A href="javascript:document.forms.myForm.ec_p.value='8';document.forms.myForm.setAttribute('action','/webapp/oa/issueArticle!pagerIssueArticle.action');document.forms.myForm.setAttribute('method','post');document.forms.myForm.submit()"><img title="最后页" alt="最后页" src="../images/lastPage.gif" border="0"></A></td>
		   </tr>
		 </tbody>
	   </table>	
      </div>

  </div>
</div>
</body>
</html>
