<html>
<head>
    <%@ page language="java" contentType="text/html; charset=utf-8"
             pageEncoding="utf-8"%>
    <%@page import="java.util.List"%>
    <%@page import="java.util.ArrayList"%>
    <%@ page import="bean.MeetSummary" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>编辑发布会议纪要</title>
<link href="../css/style.css" rel="stylesheet" type="text/css" />
<link href="../css/extremecomponents.css" rel="stylesheet" type="text/css">
<SCRIPT language=javascript src="../js/common.js"></SCRIPT>
<!-- 日历控件 -->
<script language="javascript" type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
<!-- js分页 -->
<Script Language="JavaScript" type="text/JavaScript" src="../js/Page.js"></Script>
<!-- jQuery---双色表格 -->
<script src="../js/jquery-1.2.2.js" type="text/javascript"></script>
<script type="text/javascript">
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
<div class="mainTitle"><img src="../images/bt1_ico.gif" width="31" height="23" align="absmiddle" />发布会议纪要</div>
<!-- 查询条件列表 -->
<table class="tableClass" width="100%" border="0" cellPadding="0" cellspacing="1">
  <form class="formClass" name="myform" action="" method="post" target="_blank">
     <tbody>
     <%
            List<MeetSummary> sum = new ArrayList<>();
            sum = (List<MeetSummary>) request.getAttribute("list");
            MeetSummary m = sum.get(0);
     %>
        <tr>
        <td class="tdLabel" width="20%">会议时间：</td>
        <td class="tdInput" width="60%"colspan="3"><%=m.getMsummary_time()%></td>
      </tr>
	  <tr>
        <td class="tdLabel" width="20%">会议地点：</td>
        <td class="tdInput" width="60%"colspan="3"><%=m.getMsummary_place()%></td>
      </tr>
	  <tr>
        <td class="tdLabel" width="20%"><span class="label">与会领导</span>：</td>
        <td class="tdInput" width="60%"colspan="3"><%=m.getMsummary_lead()%></td>
      </tr>
	   <tr>
        <td class="tdLabel" width="20%"><span class="label">主要参与人员</span>：</td>
        <td class="tdInput" width="60%"colspan="3"><%=m.getMsummary_staff()%></td>
      </tr>	 
	  <tr>
        <td class="tdLabel" width="20%"><span class="label">缺席人员</span>：</td>
        <td class="tdInput" width="60%"colspan="3"><%=m.getMsummary_absent()%></td>
      </tr>
	   <tr>
        <td class="tdLabel" width="20%"><span class="label">会议主持人</span>：</td>
        <td class="tdInput" width="60%"colspan="3"><%=m.getMsummary_pro()%></td>
      </tr>
	   <tr>
        <td class="tdLabel" width="20%"><span class="label">记录整理</span>：</td>
        <td class="tdInput" width="60%"colspan="3">徐克</td>       
      </tr>	 
	  <tr>
        <td class="tdLabel" width="20%"><span class="label">召集部门</span>：</td>
        <td class="tdInput" width="60%"colspan="3"><%=m.getMsummary_branch()%></td>
      </tr>	     
	   <tr>
        <td class="tdLabel">会议主题：</td>
        <td class="tdInput" colspan="3"><%=m.getMsummary_theme()%>
	  </tr>	 
		 
		<tr>
		  <td class="tdLabel">会议内容：</td>
          <td class="tdInput" colspan="3"><%=m.getMsummary_content()%></td>
		</tr>   
		 
		<tr>
        <td class="tdLabel">会议内容附件：</td>
        <td class="tdInput" colspan="3"><a href="#">会议内容附件.doc</a></td>		
	  </tr>  
	   <tr>
        <td class="tdLabel">会议纪要内容：</td>
        <td class="tdInput" colspan="3"><%=m.getMsummary_sumcontent()%></td>
      </tr>
	  <tr>
        <td class="tdLabel">会议纪要内容附件：</td>
        <td class="tdInput" colspan="3"><a href="#">会议纪要内容附件.doc</a></td>		
	  </tr> 
	  <tr>
	  <td class="tdLabel">发布范围：</td>
	  <td class="tdInput">
	  <input name="QZMC2" value="人事处">
	  <input name="选择2" align="middle" type="image" src="../images/btnChoice.gif"/></td>
	  <td class="tdLabel">发布方式：</td>
	  <td class="tdInput">
	  <select name="XXLX">
	    <option value="01">手机短信</option>
        <option value="02" selected>个人待办事项</option>
		<option value="02">==================</option>
        </select>	  </td>
	  </tr>
    </tbody>
  </form>
</table>
<!-- 查询条件列表所用的按钮 -->
<div class="queryButton">
  <a href="PublishMSumServlet.html?id=<%=m.getMsummary_id()%>" onclick="myform.submit()"><img src="../images/btnRelease.gif" alt="单击此按钮，发布会议纪要信息" name="修改" border="0" type="image" /></a>
  &nbsp;&nbsp;
  <a href="PublishMSumServlet.html"><img src="../images/btnBack.gif" alt="单击此按钮，返回上一页" name="返回" width="65" height="20" border="0" type="image" /></a></div>
<div class="space"></div>
<div class=eXtremeTable> </div>
</body>
</html>
