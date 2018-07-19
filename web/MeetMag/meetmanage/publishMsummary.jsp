<html>
<head>
	<%@ page language="java" contentType="text/html; charset=utf-8"
			 pageEncoding="utf-8"%>
	<%@page import="java.util.List"%>
	<%@page import="java.util.ArrayList"%>
	<%@ page import="bean.MeetSummary" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>发布会议纪要信息</title>

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
    <div class="mainTitle"><img src="../images/bt1_ico.gif" width="31" height="23" align="absmiddle" />待发布会议纪要列表</div>
	
	<!-- 查询条件列表 -->
	<table class="tableClass" width="100%" border="0" cellPadding="0" cellspacing="1">
	<form class="formClass" name="myform" action="" method="post" target="_blank">
	<tbody>
	<%
		List<MeetSummary> msum = new ArrayList<>();
		msum = (List<MeetSummary>) request.getAttribute("list");
		MeetSummary ms = msum.get(msum.size()-1);
	%>
      <tr>
	  <td class="tdLabel" width="15%">
	    <label class="label">会议名称：</label></td>
	    <td class="tdInput" width="35%"><input  name="TM2" value="<%=ms.getMsummary_theme()%>">	      </td>
	    <td width="15%" class="tdLabel">会议主持人：</td>
	    <td class="tdInput" width="35%">
		<input  name="TM" value="<%=ms.getMsummary_pro()%>">		</td>
      </tr>
      <tr>
	    <td class="tdLabel">会议日期：</td>
	    <td class="tdInput"><input name="KSSJ_from" type="text" class="Wdate"  id="d4322"  onFocus="WdatePicker({el:this,maxDate:'#F{$dp.$D(\'d4322\',{d:-0});}'})" value="<%=ms.getMsummary_time()%>" readonly/></td>
		<td class="tdLabel">会议室名称：</td>
	    <td class="tdInput"><input name="HYSMC" type="text" value="<%=ms.getMsummary_place()%>"></td>
      </tr> 	  
	  </tbody>
	  </form>
</table> 
	  
     <!-- 查询条件列表所用的按钮 -->
  <div class="queryButton">
           <img name="查询" type="image" src="../images/btnQuery.gif" alt="单击此按钮，根据输入条件查询" />
		  &nbsp;&nbsp;<img name="清空" type="image" src="../images/btnClear.gif"  alt="单击此按钮，请空已输入的查询条件" />  </div> 
   
     <!-- 查询条件与查询结果之间的间隔 -->
     <div class="space"></div>
	 
	  <!-- 查询结果列表 -->
	  <div class=eXtremeTable>	     
		 <!-- 查询结果标题（右侧带页码） -->
		 <table width="100%" border="0" cellspacing="0" cellpadding="0">
		  <tr>
			<td class="title">&nbsp;</td>
			<td class="statusBar">找到2 条记录, 显示 1 到 2 </td>
			<td>
			
			    <!-- 页码table(位于查询结果列表顶部居右)-->
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
			   
			   
		    </td>
		  </tr>
		</table>

		<!-- 查询结果列表信息 -->
		<div id="queryResult">
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="stripe"><!--用class="stripe"来标识需要使用 jQuery---双色表格效果-->
		<thead>
		<tr>
		<td nowrap class="tableHeader1" >会议名称</td>
		<td class="tableHeader1" >会议主持人</td>
		<td class="tableHeader1" >会议时间</td>
		<td class="tableHeader1" >审批状态</td>
		<td class="tableHeader1" >审批人</td>
		<td class="tableHeader1" >发布状态</td>
		<td class="tableHeader1" >操作</td>
		
		</tr>
		</thead>
		
		<tbody>
		<%
			if(msum!=null){
				for(MeetSummary m:msum){
		%>
			<tr>
			<td><%=m.getMsummary_theme()%></td>
			<td><%=m.getMsummary_pro()%></td>
			<td><%=m.getMsummary_time()%></td>
			<td>已审批</td>
			<td>某人</td>
			<td><%=m.getMsummary_status()%></td>
			<td><a href="PublishServlet.html?id=<%=m.getMsummary_id()%>">发布</a></td>
			</tr>
		<%}}%>
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
	
	
	   <!-- 查询结果底部按钮 
	   <div class="queryResultButton">
	&nbsp;<input onClick="checkAll(this, 'deleteCheck')" type="checkbox" name="selectAll">是否全选
	&nbsp;<input onClick="deleteSelected('selectFiles','receivedFileCheck');" src="../images/btnDelete.gif" alt="删除" name="imageField33" type="image" />
	   </div>-->
		  <div class="queryResultButton">
			  &nbsp;<a href="../menu.htm"><img src="../images/btnBack.gif" alt="返回"></a>
		  </div>
  </div>
</div>
</body>
</html>
