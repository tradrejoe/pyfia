<%@ page session="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Pyfia</title>
<link rel="stylesheet" href="<c:url value="/resources/scripts/amcharts/style.css" />" />
<link rel="stylesheet" href="<c:url value="/resources/scripts/themes/base/jquery.ui.all.css"/>" />
<script type="text/javascript" src="<c:url value="/resources/scripts/iScroll.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery-1.8.2.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/ui/jquery.ui.datepicker.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/ui/jquery.ui.core.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/ui/jquery.ui.widget.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/ui/jquery.ui.tabs.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/ui/jquery.ui.mouse.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/ui/jquery.ui.draggable.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery.roundabout.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/touch-scroll.min.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/BrowserDetect.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/pyfia.comp.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/pyfia.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery.fixedheadertable.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/json.min.js" /> "></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/mxgraph/src/js/mxClient.js" /> "></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/amcharts/amstock.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/tiny_mce/tiny_mce.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/scripts/jquery.cookie.js" />"></script>
<script type="text/javascript" src="http://connect.facebook.net/en_US/all.js"></script>
</head>
<body>
<script type="text/javascript">
	pyfia.init();
</script>
<div id="fb-root"></div>
<script>
  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '451931174890657',                        // App ID from the app dashboard
      channelUrl : 'http://www.pyfia.com/channel', // Channel file for x-domain comms
      status: true, cookie: true, xfbml: true                                  // Look for social plugins on the page
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-40641563-1', 'pyfia.com');
  ga('send', 'pageview');
</script>
<script type="text/javascript"><!--
google_ad_client = "ca-pub-7278864812285180";
/* pyfia */
google_ad_slot = "1455062894";
google_ad_width = 468;
google_ad_height = 60;
//-->
</script>
</body>
</html>
