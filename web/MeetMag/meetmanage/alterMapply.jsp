<html>
<head>
  <%@ page language="java" contentType="text/html; charset=utf-8"
           pageEncoding="utf-8"%>
  <%@page import="java.util.List"%>
  <%@page import="java.util.ArrayList"%>
  <%@page import="bean.Proposer"%>
  <%
    int id = Integer.parseInt(request.getParameter("id"));
    session.setAttribute("a",id);
  %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>起草会议申请</title>
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
function submitaction(){
    document.myform.action="AlterServlet.html?action=submit";
}
function saveaction(){
    document.myform.action="AlterServlet.html?action=null";
}
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
<div class="mainTitle"><img src="../images/bt1_ico.gif" width="31" height="23" align="absmiddle" />起草会议</div>
<!-- 查询条件列表 -->
<table class="tableClass" width="100%" border="0" cellPadding="0" cellspacing="1">
  <form class="formClass" name="myform" action="" method="post" target="_blank">
    <tbody>
      <tr>
        <td class="tdLabel" width="15%"><span class="required">*</span>
          <label class="label">会议类型：</label></td>
        <td class="tdInput" width="35%">
		<select  name="meet_type" >
            <option value="年会">年会</option>
            <option value="专业会议">专业会议</option>
			<option value="专题会议">专题会议</option>
            <option value="代表会议">代表会议</option>
			<option value="研讨会">研讨会</option>
            <option value="培训会议">培训会议</option>
			<option value="奖励会议">奖励会议</option>
            <option value="新闻发布会">新闻发布会</option>
          </select>		  </td>
        <td class="tdLabel" width="15%"><span class="required">*</span>
          <label class="label">会议名称：</label></td>
        <td class="tdInput" width="35%"><input   name="meet_name"></td>
      </tr>
      <tr>
	  <td class="tdLabel" ><span class="required">*</span>
          <label class="label">会议时间：</label></td>
        <td class="tdInput"><input  name="meet_time"></td>
        <td class="tdLabel" ><span class="required">*</span>
          <label class="label">会议起草人：</label></td>
        <td class="tdInput" align="left">
		<input   name="pro_name" value=""/></td>
      </tr>
      <tr>
        <td class="tdLabel" ><span class="required">*</span>
          <label class="label">与会领导：</label></td>
        <td class="tdInput"><input  name="meet_leader" value="">
        <input name="选择1" align="middle" type="image" src="../images/btnChoice.gif"  alt="单击此按钮，选择与会领导" />		</td>
        <td class="tdLabel" ><span class="required">*</span>
          <label class="label">主要参加人员：</label></td>
        <td class="tdInput" align="left">
		<input name="meet_staff"  value="" />
		<input name="选择2" align="middle" type="image" src="../images/btnChoice.gif"  alt="单击此按钮，选择参加人员" />		</td>
      </tr>
	   <tr>
        <td class="tdLabel" >
          <label class="label">召集部门：</label></td>
        <td class="tdInput" colspan="3" >
		<input  name="meet_branch" value=""/>
		<input name="选择3" align="middle" type="image" src="../images/btnChoice.gif"  alt="单击此按钮，选择召集部门" /></td>
      </tr>
	   <tr>
        <td class="tdLabel">会议主题：</td>
        <td class="tdInput"><textarea  name="meet_theme" cols="26" rows="4"  class="textareaClass"></textarea></td>
        <td class="tdLabel">会议内容：</td>
        <td class="tdInput"><textarea  name="meet_content" cols="26" rows="4"  class="textareaClass"></textarea></td>
      </tr>
    </tbody>
  </form>
</table>

<!-- 查询条件列表所用的按钮 -->
<div class="queryButton">
  <img onclick="submitaction();myform.submit(); " src="../images/btnSubmit.gif" alt="单击此按钮，提交会议申请" name="查询" border="0" type="image" />
  &nbsp;&nbsp;
  <img onclick="saveaction(); myform.submit();" src="../images/btnSave.gif" alt="单击此按钮，提交会议申请" name="查询" width="65" height="20" border="0" type="image" />
  &nbsp;&nbsp;
    <a href=""><img src="../images/btnClear.gif" alt="单击此按钮，清空录入信息" name="清空"  width="65" height="20" border="0" type="image" onclick="myform.submit();"/></a>
  &nbsp;&nbsp;
<a href="MenuServlet.html"><img src="../images/btnBack.gif" alt="单击此按钮，返回上一页" name="返回" border="0" type="image" /></a></div>
<div class="space"></div>
<div class=eXtremeTable> </div>
</body>
</html>
