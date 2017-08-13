<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ page session="true" %>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE HTML>
<html>
<head>
<title>Pyfia</title>
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery-1.11.1.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery-ui-1.11.1.custom/jquery-ui.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/roundabout.js" />"></script>
<!-- Load jquery before angularjs to use jquery style selector with the angular.element() function. -->
<script type="text/javascript" src="<c:url value='/resources/scripts/angularjs-1.2.16.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/scripts/angularjs-directives.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/scripts/angularjs-ngroute.js' />"></script>
<script type="text/javascript" src="<c:url value='/resources/scripts/ngResource/resource.js' />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/pyfia.comp.1.0.26.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/pyfia.1.0.30.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/pyfia.angular.1.0.23.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery.fixedheadertable.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/json.min.js" /> "></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery.cookie.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/BrowserDetect.js" />"></script>
<c:if test="${device ne 'normal'}">
	<script type="text/javascript" src="<c:url value="/resources/dropdown-check-list.1.4/js/ui.dropdownchecklist-1.4-min.js" />"></script>
</c:if>
<c:if test="${device eq 'normal'}">
<script type="text/javascript" src="<c:url value="/resources/scripts/iScroll.js" />"></script>
</c:if>
<c:if test="${device eq 'mobile' || device eq 'tablet'}">
<script type="text/javascript" src="<c:url value="/resources/scripts/touch-scroll.min.js" />"></script>
</c:if>
<script>
	pf.comp.setDevice('${device}');
</script>
<!-- Bootstrap core CSS -->
<c:if test="${device ne 'normal'}">
	<link href='<c:url value="/resources/bootstrap-3.1.1/dist/css/bootstrap.min.css"/>' rel="stylesheet">
</c:if>
<c:if test="${device eq 'normal'}">
	<link href='<c:url value="/resources/bootstrap-2.3.2/css/bootstrap.css"/>' rel="stylesheet">
</c:if>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src='<c:url value="/resources/scripts/ie10-viewport-bug-workaround.js"/>'></script>

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src='<c:url value="/resources/scripts/html5shiv.min.js"/>'></script>
  <script src='<c:url value="/resources/scripts/respond.min.js"/>'></script>
<![endif]-->
<!-- Amchart and JQuery stylesheets. -->
<c:if test="${device eq 'normal'}">
	<script src='<c:url value="/resources/bootstrap-2.3.2/js/bootstrap.min.js"/>'></script>
</c:if>
<c:if test="${device ne 'normal'}">
	<script src='<c:url value="/resources/bootstrap-3.1.1/dist/js/bootstrap.min.js"/>'></script>
</c:if>
<link rel="stylesheet" href="<c:url value="/resources/scripts/amcharts/style.css" />" />
<link rel="stylesheet" href="<c:url value="/resources/css/roundabout.css" />" />
<link rel="stylesheet" href="<c:url value="/resources/css/themes/smoothness/jquery-ui.css"/>" />
<link rel="stylesheet" href="<c:url value="/resources/css/pyfia.1.0.2.css"/>" />
<link rel="stylesheet" href="<c:url value="/resources/css/font-awesome-4.2.0/css/font-awesome.min.css"/>" />
<script>
	pyfia.fullui = ${fullui};
</script>
</head>
<body style="margin:0px;padding:0px;" ng-app="pfNgApp" ng-controller="pfCtrl">

<c:if test="${device eq 'normal'}">
    <div class="navbar navbar-inverse navbar-fixed-top" style="height:50px !important">
      <div class="navbar-inner" style="height:50px !important">
        <div class="container" style="margin-right:0px !important;">
          <div class="nav-collapse collapse pull-right">
            <ul class="nav">
								<li class="pf_menu_item_normal">
								  <a href="#" style="color:#ffffff !important;font-size: 13pt;" ng-click="panel();"><i class="fa fa-magic"></i>&nbsp;
								  	<span style="font-weight:700 !important;font-size: 13pt;">Forecast</span>
								  	</a>
								</li>
								<!--li class="pf_menu_item_normal">
								  <a href="#" style="color:#ffffff !important;font-size: 13pt;" ng-click="data();"><i class="fa fa-database"></i>&nbsp;
								  	<span style="font-weight:700 !important;font-size: 13pt;">Data</span>
								  	</a>
								</li-->
																						
								<li class="pf_menu_item_normal">
									<a href="#" style="color:#ffffff !important;font-size: 13pt;" ng-click="disclaimer();"><i class="fa fa-exclamation-triangle"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 13pt;">Disclaimer</span>
									</a>
								</li>
								
								<li class="pf_menu_item_normal">
									<a href="#" style="color:#ffffff !important;font-size: 13pt;" ng-click="aboutus();"><i class="fa fa-info-circle"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 13pt;">About Us</span>
									</a>
								</li>
								
								<li class="pf_menu_item_normal">
									<a href="#" style="color:#ffffff !important;font-size: 13pt;" ng-click="contactus();"><i class="fa fa-newspaper-o"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 13pt;">Contact Us</span>
									</a>
								</li>
								
								<li class="pf_menu_item_normal">
									<a href="#" style="color:#ffffff !important;font-size: 13pt;" ng-click="help();"><i class="fa fa-question-circle"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 13pt;">Help</span>
									</a>
								</li>
								
								<li class="pf_menu_item_normal">
									<a href="#" style="color:#ffffff !important;font-size: 13pt;" ng-click="facebook();">
										<i class="fa fa-facebook-square" title="Facebook"></i>&nbsp;										
									</a>
								</li>
								
								<li style="color:#ffffff !important;white-space: nowrap !important; vertical-align: middle !important;">
									<a target="_blank" style="text-align:left;color:#ffffff !important;font-size: 13pt;text-decoration:none;border:none;" href="https://twitter.com/share" data-url="http://www.pyfia.com" data-text="Do your own forecasting." data-count="none">
										<i class="fa fa-twitter-square" title="Twitter"></i>&nbsp;
									</a>
								</li>	
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
</c:if>
<c:if test="${device ne 'normal'}">
		<nav id="mainmenu" class="navbar navbar-default navbar-fixed-top pf_menu_container" role="navigation" style="margin:0px;width:100%;height:50px !important;">
			<div class="container-fluid" style="height:50px !important">
					<!-- ul class="nav navbar-nav pull-left" style="vertical-align:bottom;float:left;">
						<li class=title style="font-size:medium;white-space:nowrap">
						<img width="50" height="50" zIndex="999" style="z-index:999;width:50px;height:50px;!important;" src='<c:url value="/resources/images/pythialogo.jpg"/>'/>
						</li>
					</ul-->
					<ul class="nav navbar-nav pull-right" style="float:right;">
						<li style="vertical-align:bottom;" class="dropdown">
			                <a class="dropdown-toggle" data-toggle="dropdown" style="white-space:nowrap; color:#ffffff !important;font-weight: bold; font-size: 18pt;border: none;background: transparent;"><i class="fa fa-list-ul"></i><b class="caret"></b></a>
			                
			                <ul class="dropdown-menu pf_menu_container" id="dropdown-menu" style="margin:0px;padding:0px;">
								<li class="pf_menu_item">
								  <a href="#" style="color:#ffffff !important;font-size: 18pt;" ng-click="panel();"><i class="fa fa-magic"></i>&nbsp;
								  	<span style="font-weight:700 !important;font-size: 18pt;">Forecast</span>
								  	</a>
								</li>
														
								<li class="pf_menu_item">
									<a href="#" style="color:#ffffff !important;font-size: 18pt;" ng-click="disclaimer();"><i class="fa fa-exclamation-triangle"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 18pt;">Disclaimer</span>
									</a>
								</li>
								
								<li class="pf_menu_item">
									<a href="#" style="color:#ffffff !important;font-size: 18pt;" ng-click="aboutus();"><i class="fa fa-info-circle"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 18pt;">About Us</span>
									</a>
								</li>
								
								<li class="pf_menu_item">
									<a href="#" style="color:#ffffff !important;font-size: 18pt;" ng-click="contactus();"><i class="fa fa-newspaper-o"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 18pt;">Contact Us</span>
									</a>
								</li>
								
								<li class="pf_menu_item">
									<a href="#" style="color:#ffffff !important;font-size: 18pt;" ng-click="help();"><i class="fa fa-question-circle"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 18pt;">Help</span>
									</a>
								</li>
								
								<li class="pf_menu_item">
									<a href="#" style="color:#ffffff !important;font-size: 18pt;" ng-click="facebook();"><i class="fa fa-facebook-square"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 18pt;">Facebook</span>
									</a>
								</li>
								
								<li style="color:#ffffff !important;white-space: nowrap !important; vertical-align: middle !important;">
									<a target="_blank" style="text-align:left;color:#ffffff !important;font-size: 18pt;text-decoration:none;border:none;" href="https://twitter.com/share" data-url="http://www.pyfia.com" data-text="Do your own forecasting." data-count="none">
										<i class="fa fa-twitter-square"></i>&nbsp;
										<span style="font-weight:700 !important;font-size: 18pt;">Twitter</span>
									</a>
								</li>			                
			             	</ul>
			             </li>
					</ul>
				</div>	
 	    </nav>
</c:if>
<c:if test="${fullui==true }">
<img width="50" height="50" zIndex="2000" style="position:absolute;left:0px;top:0px;z-index:2000;width:50px;height:50px;" src='<c:url value="/resources/images/pythialogo.jpg"/>'/>
</c:if>

<div id="pfmsg" style="position:absolute;top:0px;left:0px;" class="pfmsg transparent">&nbsp;</div>
	<tiles:insertAttribute name="body"/>
	
<div style="clear:both;" id="fb-root"></div>
<script>
var context = '<%=(request.getSession(true).getServletContext().getContextPath().equals("/") ? "" : request.getSession(true).getServletContext().getContextPath())%>';
angular.element(document).ready(function() {
	pyfia.init_bootstrap();
	(function(d,s,id) {
		var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";
		if(!d.getElementById(id)) {
			js=d.createElement(s);
			js.id=id;
			js.src=p+"://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js,fjs);
		}
	} (document, "script", "twitter-wjs"));	
  	window.fbAsyncInit = function() {
		// Load the SDK asynchronously
		(function(d, s, id){
		   var js, fjs = d.getElementsByTagName(s)[0];
		   if (d.getElementById(id)) {return;}
		   js = d.createElement(s); js.id = id;
		   //js.src = "//connect.facebook.net/en_US/all.js";
			js.src = "<c:url value="/resources/scripts/fb/all.js" />";
		   fjs.parentNode.insertBefore(js, fjs);
		 }(document, 'script', 'facebook-jssdk'));
		// init the FB JS SDK
		FB.init({
			appId      : '451931174890657',                        // App ID from the app dashboard
			channelUrl : 'http://www.pyfia.com/channel', // Channel file for x-domain comms
			status: true, cookie: true, xfbml: true                                  // Look for social plugins on the page
		  });
	}; 
	//Google analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	ga('create', 'UA-40641563-1', 'pyfia.com');
	ga('send', 'pageview');
	google_ad_client = "ca-pub-7278864812285180";
	google_ad_slot = "1455062894";
	google_ad_width = 468;
	google_ad_height = 60;
});
$(window).on('beforeunload', function() {
    pyfia.logout();    
});	
</script>
<!-- script type="text/javascript" src="<c:url value="/resources/scripts/fusioncharts/js/fusioncharts.js" />"></script -->
<!-- script type="text/javascript" src="<c:url value="/resources/scripts/fusioncharts/js/fusioncharts.powercharts.min.js" />"></script -->
<!-- script type="text/javascript" src="<c:url value="/resources/scripts/fusioncharts/js/themes/fusioncharts.theme.fint.js" />"></script -->
<!-- script type="text/javascript" src="<c:url value="/resources/scripts/mxgraph/src/js/mxClient.js" /> "></script-->

<script type="text/javascript" src="<c:url value="/resources/scripts/d3.v3.js" /> "></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/amcharts/amcharts.lib3.js" /> "></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/amcharts/amcharts.serial.js" /> "></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/amcharts/amcharts.themes.light.js" /> "></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/tiny_mce/tiny_mce.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/scrollbar.js" />"></script>
</body>
</html>
