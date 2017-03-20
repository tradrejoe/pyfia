<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ page session="false" %>
<%@ page isELIgnored="false" %>>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE HTML>
<html>
<head>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery-1.11.1.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery-ui-1.11.1.custom/jquery-ui.js" />"></script>
</head>

<tiles:insertAttribute name="body"/>

</html>
	