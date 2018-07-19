<html>
<head>
  <%@ page language="java" contentType="text/html; charset=utf-8"
  pageEncoding="utf-8"%>
  <%@page import="java.util.List"%>
  <%@page import="java.util.ArrayList"%>
  <%@page import="bean.Proposer"%>
  <%@page import="bean.MeetRoom"%>
  <%@ page import="java.util.Random" %>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>新增会议室预定信息</title>
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
<div class="mainTitle"><img src="../images/bt1_ico.gif" width="31" height="23" align="absmiddle" />起草会议室预定信息</div>
<!-- 查询条件列表 -->
<table class="tableClass" width="100%" border="0" cellPadding="0" cellspacing="1">
  <form class="formClass" name="myform" action="RoomServlet.html" method="post" target="_blank">
    <tbody>
    <%
//      String type = request.getParameter("action");
      String id = request.getParameter("id");
      request.getSession().setAttribute("id",id);
      String meetname = request.getParameter("meetname");
      session.setAttribute("meetname",meetname);
//      String time = request.getParameter("time");
//      List<MeetRoom> room = new ArrayList<>();
//      room = (List<MeetRoom>) request.getAttribute("list");
    %>
    <%
//      if(room!=null) {
//        MeetRoom m = room.get(2);
    %>
      <tr>
        <td class="tdLabel" width="15%"><span class="required">*</span>
          <label class="label">会议类型：</label></td>
        <td class="tdInput" width="35%">
          <input name="meet_type"  id="meet_type" value="" /></td>
        <td class="tdLabel" width="15%"><span class="required">*</span>
          <label class="label">负责人：</label></td>
        <td class="tdInput" width="35%"><input  name="meet_head" value=""></td>
      </tr>
      <tr>
        <td class="tdLabel" ><span class="required">*</span>
          <label class="label">紧急程度：</label></td>
        <td class="tdInput">
		<select name="meet_degree" >
            <option value="01">特急</option>
			<option value="02" >紧急</option>
            <option value="02" selected>普通</option>
        </select>		</td>
        <td class="tdLabel" ><span class="required">*</span>
          <label class="label">会议室名称：</label></td>
        <td class="tdInput" align="left"><input  id="room_name" name="room_name" value="" type="text" class="Wdate"  onFocus="WdatePicker({el:this,maxDate:'#F{$dp.$D(\'d4322\',{d:-0});}'})"/>
           <input name="选择1" align="middle" type="image" src="../images/btnChoice.gif"  alt="单击此按钮，选择与会领导" />		</td>
      </tr>
      <tr>
        <td class="tdLabel">会议开始时间：</td>
        <td class="tdInput"><input  id="meet_starttime" name="meet_starttime" value="" type="text" class="Wdate"  onFocus="WdatePicker({el:this,maxDate:'#F{$dp.$D(\'d4322\',{d:-0});}'})"/></td>
        <td class="tdLabel">会议结束时间：</td>
        <td class="tdInput"><input  id="meet_endtime" name="meet_endtime" type="text" class="Wdate"  onFocus="WdatePicker({el:this,maxDate:'#F{$dp.$D(\'d4321\',{d:-0});}'})"/></td>
      </tr>      
	  <tr>
        <td class="tdLabel" >
          <label class="label">会议室资源：</label></td>
        <td class="tdInput"><input name="meet_resource" value=""></td>
        <td class="tdLabel" >需要会议室设备：</td>
        <td class="tdInput" align="left">
		<input  id="meet_equipment" name="meet_equipment"/></td>
      </tr>
	  <tr>
        <td class="tdLabel" >
          <label class="label">会议室服务：</label></td>
        <td class="tdInput"><input name="meet_service" value=""></td>
        <td class="tdLabel" ><label class="label">预定人：</label></td>
        <td class="tdInput" align="left">
		<input name="pro_name"  id="pro_name" value="" /></td>
      </tr>
    <%--<%}%>--%>
    </tbody>
  </form>
</table>
<!-- 查询条件列表所用的按钮 -->
<div class="queryButton">
  <img src="../images/btnSubmit.gif" onclick="myform.submit()" alt="单击此按钮，预定会议室"  name="查询" type="image">
  &nbsp;&nbsp;
  <a href="MenuServlet.html"><img src="../images/btnBack.gif" alt="单击此按钮，返回上一页" name="返回" border="0" type="image" /></a></div>
<div class="space"></div>
<div class=eXtremeTable> </div>
</body>
</html>
