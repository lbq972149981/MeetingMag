<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/21
  Time: 18:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>jscl</title>
</head>
<body>
<%--默认request--%>

<%--${count = page.count}
${currPage = page.currPage}--%>

<%--session级别的--%>
${sessionScope.page.count}
${sessionScope.page.currPage}
${empty sessionScope.page.currPage}
${not empty sessionScope.page.currPage}
${sessionScope.page.currPage>10}
<c:out value="${sessionScope.page.count+1000}"/>
<c:out value="123"/>
<c:set var="name" value="刘晓含"/>
<c:out value="${name}"/>
<br>
<%--ifelseifelse--%>
<c:choose>
    <c:when test="${worker.age>20}">1</c:when>
    <c:when test="${worker.age>25}">2</c:when>
    <c:when test="${worker.age>30}">3</c:when>
    <c:when test="${worker.age>35}">4</c:when>
    <c:when test="${worker.age>40}">5</c:when>
    <c:otherwise>不出家</c:otherwise>
</c:choose>
<br>
<c:url value="index.jsp" var="index">
    <c:param name="name" value="liu" />
    <c:param name="password" value="123" />
</c:url>
<c:out value="${index}"/>
<a href="${index}">index</a>
<br>
<c:import url="index.jsp" />
<%--<c:redirect url="index.jsp"/>--%>
<br>
<c:set var="str" value="aaa,bbb,ccc,ddd,eee"/>
<c:set var="url" value="D:\kolin\jstl\jakarta-taglibs\standard\src\org\apache\taglibs\standard\tag\el\core"/>
<c:forTokens items="${str}" delims="," var="e">
    ${e}
    <br>
</c:forTokens>
<br>
<c:forEach var="worker" items="${list}">
    ${worker.name}
    ${worker.age}
    ${url}
    <br>
</c:forEach>
</body>
</html>
