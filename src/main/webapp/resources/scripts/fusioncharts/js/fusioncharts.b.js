/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.7.0

 @attributions (infers respective third-party copyrights)
 Raphael 2.1.0 (modified as 'Red Raphael') <http://raphaeljs.com/license.html>
 JSON v2 <http://www.JSON.org/js.html>
 Firebug Lite 1.3.0 <http://getfirebug.com/firebuglite>
*/
(function(){
  if(!window.FusionCharts||!window.FusionCharts.version){
    var e=window,k=e.document,u=e.navigator,q={
      window:e}
    ,D=q.modules={
      }
    ,b=q.interpreters={
      }
    ,N=Object.prototype.toString,J=/msie/i.test(u.userAgent)&&!e.opera,c=/loaded|complete/,p=!1,a=function(){
      var a=q.ready;
      q.ready=!0;
      q.raiseEvent&&(q.readyNotified=!0,q.raiseEvent("ready",{
        version:q.core.version,now:!a}
      ,q.core));
      q.readyNow=!a}
    ,t=function(a,b){
      var c,d;
      if(b instanceof Array)for(c=0;
      c<b.length;
      c+=1)"object"!==typeof b[c]?a[c]=b[c]:("object"!==
typeof a[c]&&(a[c]=b[c]instanceof Array?[]:{
        }
      ),t(a[c],b[c]));
      else for(c in b)"object"===typeof b[c]?(d=N.call(b[c]),"[object Object]"===d?("object"!==typeof a[c]&&(a[c]={
        }
      ),t(a[c],b[c])):"[object Array]"===d?(a[c]instanceof Array||(a[c]=[]),t(a[c],b[c])):a[c]=b[c]):a[c]=b[c];
      return a}
    ;
    q.extend=function(a,b,c,d){
      var h;
      c&&a.prototype&&(a=a.prototype);
      if(!0===d)t(a,b);
      else for(h in b)a[h]=b[h];
      return a}
    ;
    q.uniqueId=function(){
      return"chartobject-"+(q.uniqueId.lastId+=1)}
    ;
    q.uniqueId.lastId=0;
    q.policies=
{
      options:{
        chartTypeSourcePath:["typeSourcePath",""],product:["product","v3"],insertMode:["insertMode","replace"],safeMode:["safeMode",!0],overlayButton:["overlayButton",void 0],containerBackgroundColor:["containerBackgroundColor","#ffffff"],containerBackgroundOpacity:["containerBackgroundOpacity",1],containerClassName:["containerClassName","fusioncharts-container"],chartType:["type",void 0],baseChartMessageFont:["baseChartMessageFont","Verdana,sans"],baseChartMessageFontSize:["baseChartMessageFontSize",
"10"],baseChartMessageColor:["baseChartMessageColor","#666666"],baseChartMessageImageHAlign:["baseChartMessageImageHAlign","middle"],baseChartMessageImageVAlign:["baseChartMessageImageVAlign","middle"],baseChartMessageImageAlpha:["baseChartMessageImageAlpha",100],baseChartMessageImageScale:["baseChartMessageImageScale",100],dataLoadStartMessage:["dataLoadStartMessage","Retrieving data. Please wait."],dataLoadErrorMessage:["dataLoadErrorMessage","Error in loading data."],dataInvalidMessage:["dataInvalidMessage",
"Invalid data."],dataEmptyMessage:["dataEmptyMessage","No data to display."],typeNotSupportedMessage:["typeNotSupportedMessage","Chart type not supported."],loadMessage:["loadMessage","Loading chart. Please wait."],renderErrorMessage:["renderErrorMessage","Unable to render chart."]}
      ,attributes:{
        lang:["lang","EN"],id:["id",void 0]}
      ,width:["width","400"],height:["height","300"],src:["swfUrl",""]}
    ;
    b.stat="swfUrl id width height debugMode registerWithJS backgroundColor scaleMode lang detectFlashVersion autoInstallRedirect".split(" ");
    
q.parsePolicies=function(a,b,c){
      var d,h,l;
      for(h in b)if(q.policies[h]instanceof Array)l=c[b[h][0]],a[h]=void 0===l?b[h][1]:l;
      else for(d in"object"!==typeof a[h]&&(a[h]={
        }
      ),b[h])l=c[b[h][d][0]],a[h][d]=void 0===l?b[h][d][1]:l}
    ;
    q.parseCommands=function(a,c,g){
      var d,h;
      "string"===typeof c&&(c=b[c]||[]);
      d=0;
      for(h=c.length;
      d<h;
      d++)a[c[d]]=g[d];
      return a}
    ;
    q.registrars={
      module:function(){
        return q.core.apply(q.core,arguments)}
      }
    ;
    q.core=function(a){
      if(!(this instanceof q.core)){
        if(1===arguments.length&&a instanceof
Array&&"private"===a[0]){
          if(D[a[1]])return;
          D[a[1]]={
            }
          ;
          a[3]instanceof Array&&(q.core.version[a[1]]=a[3]);
          return"function"===typeof a[2]?a[2].call(q,D[a[1]]):q}
        if(1===arguments.length&&"string"===typeof a)return q.core.items[a];
        q.raiseError&&q.raiseError(this,"25081840","run","",new SyntaxError('Use the "new" keyword while creating a new FusionCharts object'))}
      var c={
        }
      ;
      this.__state={
        }
      ;
      1===arguments.length&&"object"===typeof arguments[0]?c=arguments[0]:q.parseCommands(c,b.stat,arguments);
      1<arguments.length&&
"object"===typeof arguments[arguments.length-1]&&(delete c[b.stat[arguments.length-1]],q.extend(c,arguments[arguments.length-1]));
      this.id="undefined"===typeof c.id?this.id=q.uniqueId():c.id;
      this.args=c;
      q.core.items[this.id]instanceof q.core&&q.raiseWarning(this,"06091847","param","",Error('A FusionChart oject with the specified id "'+this.id+'" already exists. Renaming it to '+(this.id=q.uniqueId())));
      q.parsePolicies(this,q.policies,c);
      this.attributes.id=this.id;
      this.resizeTo&&this.resizeTo(c.width,
c.height,!0);
      this.chartType&&this.chartType(c.type||c.swfUrl,!0);
      q.raiseEvent("beforeInitialize",c,this);
      q.core.items[this.id]=this;
      q.core.defaultOptions=q.core.options;
      q.raiseEvent("initialized",c,this);
      return this}
    ;
    q.core.prototype={
      }
    ;
    q.core.prototype.constructor=q.core;
    q.extend(q.core,{
      id:"FusionCharts",version:["3","7","0"],items:{
        }
      ,options:{
        }
      ,getObjectReference:function(a){
        return q.core.items[a].ref}
      ,register:function(a){
        return q.registrars[a=a&&a.toString&&a.toString().toLowerCase()]&&q.registrars[a].apply(q.core,
Array.prototype.slice.call(arguments,1))}
      }
    );
    e.FusionCharts=q.core;
    e.FusionMaps&&e.FusionMaps.legacy&&(q.core(["private","modules.core.geo",e.FusionMaps.legacy,e.FusionMaps.version]),p=!0);
    c.test(k.readyState)||k.loaded?(q.ready=!0,setTimeout(a,1)):function(){
      function b(){
        arguments.callee.done||(arguments.callee.done=!0,g&&clearTimeout(g),p||(e.FusionMaps&&e.FusionMaps.legacy&&q.core(["private","modules.core.geo",e.FusionMaps.legacy,e.FusionMaps.version]),e.FusionMaps=q.core),setTimeout(a,1))}
      function F(){
        c.test(k.readyState)?
b():g=setTimeout(F,10)}
      var g,d;
      k.addEventListener?k.addEventListener("DOMContentLoaded",b,!1):k.attachEvent&&e.attachEvent("onLoad",b);
      if(J)try{
        "https:"===e.location.protocol?k.write('<script id="__ie_onload_fusioncharts" defer="defer" src="//:">\x3c/script>'):k.write('<script id="__ie_onload_fusioncharts" defer="defer" src="javascript:void(0)">\x3c/script>'),d=k.getElementById("__ie_onload_fusioncharts"),d.onreadystatechange=function(){
          "complete"==this.readyState&&b()}
        }
      catch(h){
        }
      /WebKit/i.test(u.userAgent)&&
(g=setTimeout(F,10));
      e.onload=function(a){
        return function(){
          b();
          a&&a.call&&a.call(e)}
        }
      (e.onload)}
    ();
    e.FusionMaps=q.core}
  }
  )();
  
FusionCharts.register("module",["private","modules.mantle.errormanager",function(){
  var e=this,k=e.window,u={
    type:"TypeException",range:"ValueRangeException",impl:"NotImplementedException",param:"ParameterException",run:"RuntimeException",comp:"DesignTimeError",undefined:"UnspecifiedException"}
  ,q=function(b,q,J,c,p,a){
    var t="#"+q+" "+(b?b.id:"unknown-source")+c+" "+a+" >> ";
    p instanceof Error?(p.name=u[J],p.module="FusionCharts"+c,p.level=a,p.message=t+p.message,t=p.message,k.setTimeout(function(){
      throw p;
      
}
    ,0)):t+=p;
    q={
      id:q,nature:u[J],source:"FusionCharts"+c,message:t}
    ;
    e.raiseEvent(a,q,b);
    if("function"===typeof k["FC_"+a])k["FC_"+a](q)}
  ,D;
  e.raiseError=function(b,e,k,c,p){
    q(b,e,k,c,p,"Error")}
  ;
  e.raiseWarning=function(b,e,k,c,p){
    q(b,e,k,c,p,"Warning")}
  ;
  D={
    outputHelpers:{
      text:function(b,e){
        D.outputTo("#"+b.eventId+" ["+(b.sender.id||b.sender).toString()+'] fired "'+b.eventType+'" event. '+("error"===b.eventType||"warning"===b.eventType?e.message:""))}
      ,event:function(b,e){
        this.outputTo(b,e)}
      ,verbose:function(b,
e){
        D.outputTo(b.eventId,b.sender.id,b.eventType,e)}
      }
    ,outputHandler:function(b,k){
      "function"!==typeof D.outputTo?e.core["debugger"].outputFailed=!0:(e.core["debugger"].outputFailed=!1,D.currentOutputHelper(b,k))}
    ,currentOutputHelper:void 0,outputTo:void 0,enabled:!1}
  ;
  D.currentOutputHelper=D.outputHelpers.text;
  e.extend(e.core,{
    "debugger":{
      syncStateWithCharts:!0,outputFormat:function(b){
        return b&&"function"===typeof b.toLowerCase&&"function"===typeof D.outputHelpers[b=b.toLowerCase()]?(D.currentOutputHelper=
D.outputHelpers[b],!0):!1}
      ,outputTo:function(b){
        "function"===typeof b?D.outputTo=b:null===b&&(e.core["debugger"].enable(!1),delete D.outputTo)}
      ,enable:function(b,k,q){
        var c;
        "object"===typeof b&&1===arguments.length&&(c=b,b=c.state,k=c.outputTo,q=c.outputFormat);
        "function"===typeof b&&("string"!==typeof k||2!==arguments.length&&!c||(q=k),k=b,b=!0);
        if("boolean"===typeof b&&b!==D.enabled)e.core[(D.enabled=b)?"addEventListener":"removeEventListener"]("*",D.outputHandler);
        "function"===typeof k&&(D.outputTo=
k);
        e.core["debugger"].outputFormat(q);
        return D.enabled}
      ,enableFirebugLite:function(){
        var b;
        k.console&&k.console.firebug?e.core["debugger"].enable(k.console.log,"verbose"):((b=k.document.getElementsByTagName("html"))&&b[0].setAttribute("debug","true"),e.loadScript("https://getfirebug.com/firebug-lite.js#overrideConsole=false,startOpened=true",function(){
          e.core["debugger"].enable(k.console.log,"verbose")}
        ,"{
           startOpened: true }
        ",!0,!0))}
      }
    ,debugMode:{
      enabled:function(){
        k.setTimeout(function(){
          throw Error("Deprecated! Please use FusionCharts.debugger.enable instead.");
          
}
        ,0);
        return e.core["debugger"].enable.apply(e.core["debugger"],arguments)}
      }
    }
  ,!1)}
  ]);
  
FusionCharts.register("module",["private","modules.mantle.eventmanager",function(){
  var e=this,k=e.window,u=e.core,q=k.Object.prototype.toString,D=q.call([]),b=function(a,b,c,g){
    try{
      a[0].call(b,c,g||{
        }
      )}
    catch(d){
      setTimeout(function(){
        throw d;
        }
      ,0)}
    }
  ,N=function(a,c,F){
    if(a instanceof Array)for(var g=0,d;
    g<a.length;
    g+=1){
      if(a[g][1]===c.sender||void 0===a[g][1])d=a[g][1]===c.sender?c.sender:e.core,b(a[g],d,c,F),!0===c.detached&&(a.splice(g,1),--g,c.detached=!1);
      if(!0===c.cancelled)break}
    }
  ,J={
    unpropagator:function(){
      return!1===
(this.cancelled=!0)}
    ,detacher:function(){
      return!1===(this.detached=!0)}
    ,undefaulter:function(){
      return!1===(this.prevented=!0)}
    ,listeners:{
      }
    ,lastEventId:0,addListener:function(a,b,c){
      var g,d;
      if(q.call(a)===D){
        g=[];
        for(d=0;
        d<a.length;
        d+=1)g.push(J.addListener(a[d],b,c));
        return g}
      if("string"!==typeof a)e.raiseError(c||e.core,"03091549","param","::EventTarget.addListener",Error("Unspecified Event Type"));
      else if("function"!==typeof b)e.raiseError(c||e.core,"03091550","param","::EventTarget.addListener",
Error("Invalid Event Listener"));
      else return a=a.toLowerCase(),J.listeners[a]instanceof Array||(J.listeners[a]=[]),J.listeners[a].push([b,c]),b}
    ,removeListener:function(a,b,c){
      var g;
      if("function"!==typeof b)e.raiseError(c||e.core,"03091560","param","::EventTarget.removeListener",Error("Invalid Event Listener"));
      else if(a instanceof Array)for(g=0;
      g<a.length;
      g+=1)J.removeListener(a[g],b,c);
      else if("string"!==typeof a)e.raiseError(c||e.core,"03091559","param","::EventTarget.removeListener",Error("Unspecified Event Type"));
      
else if(a=a.toLowerCase(),a=J.listeners[a],a instanceof Array)for(g=0;
      g<a.length;
      g+=1)a[g][0]===b&&a[g][1]===c&&(a.splice(g,1),--g)}
    ,triggerEvent:function(a,b,c,g,d,h){
      if("string"!==typeof a)e.raiseError(b,"03091602","param","::EventTarget.dispatchEvent",Error("Invalid Event Type"));
      else{
        a=a.toLowerCase();
        var l={
          eventType:a,eventId:J.lastEventId+=1,sender:b||Error("Orphan Event"),cancelled:!1,stopPropagation:this.unpropagator,prevented:!1,preventDefault:this.undefaulter,detached:!1,detachHandler:this.detacher}
        ;
        
N(J.listeners[a],l,c);
        N(J.listeners["*"],l,c);
        switch(l.prevented){
          case !0:if("function"===typeof h)try{
            h.call(g||b||k,l,c||{
              }
            )}
          catch(L){
            setTimeout(function(){
              throw L;
              }
            ,0)}
          break;
          default:if("function"===typeof d)try{
            d.call(g||b||k,l,c||{
              }
            )}
          catch(p){
            setTimeout(function(){
              throw p;
              }
            ,0)}
          }
        return!0}
      }
    }
  ,c=e.raiseEvent=function(a,b,c,g,d,h){
    return J.triggerEvent(a,c,b,g,d,h)}
  ,p=e.legacyEventList={
    }
  ,a={
    }
  ;
  e.disposeEvents=function(a){
    var b,c;
    for(b in J.listeners)for(c=0;
    c<J.listeners[b].length;
    c+=1)J.listeners[b][c][1]===
a&&J.listeners[b].splice(c,1)}
  ;
  e.raiseEventWithLegacy=function(a,b,e,g,d,h,l){
    var L=p[a];
    c(a,b,e,d,h,l);
    L&&"function"===typeof k[L]&&setTimeout(function(){
      k[L].apply(d||k,g)}
    ,0)}
  ;
  e.raiseEventGroup=function(b,e,F,g,d,h,l){
    var L=g.id,p=b+L;
    a[p]?(clearTimeout(a[p]),delete a[p]):L&&p?a[p]=setTimeout(function(){
      c(e,F,g,d,h,l);
      delete a[p]}
    ,0):c(e,F,g,d,h,l)}
  ;
  e.addEventListener=function(a,b){
    return J.addListener(a,b)}
  ;
  e.removeEventListener=function(a,b){
    return J.removeListener(a,b)}
  ;
  e.extend(u,{
    addEventListener:function(a,
b){
      return J.addListener(a,b)}
    ,removeEventListener:function(a,b){
      return J.removeListener(a,b)}
    ,ready:function(a,b,c){
      e.ready?(u.ready=function(a,d){
        "function"===typeof a&&setTimeout(function(){
          a.call(d||u,b||u)}
        ,0)}
      ,u.ready(a,c)):"function"===typeof a&&u.addEventListener("ready",function(){
        u.ready(a,b,c)}
      );
      return this}
    }
  );
  u.on=u.addEventListener;
  e.extend(u.prototype,{
    addEventListener:function(a,b){
      return J.addListener(a,b,this)}
    ,removeEventListener:function(a,b){
      return J.removeListener(a,b,this)}
    }
  );
  
u.prototype.on=u.prototype.addEventListener;
  e.policies.options.events=["events",{
    }
  ];
  e.addEventListener("beforeInitialize",function(a){
    a=a.sender;
    var b=a.options.events,c;
    if(b)for(c in b)"function"===typeof b[c]&&a.addEventListener(c,b[c])}
  );
  e.ready&&!e.readyNotified&&(e.readyNotified=!0,e.raiseEvent("ready",{
    version:e.core.version,now:e.readyNow}
  ,e.core))}
  ]);
  
FusionCharts.register("module",["private","modules.mantle.ajax",function(){
  var e=this,k=e.window,u=parseFloat(k.navigator.appVersion.split("MSIE")[1]),q=5.5<=u&&7>=u?!0:!1,D="file:"===k.location.protocol,b=k.ActiveXObject,N=(!b||!D)&&k.XMLHttpRequest,J={
    objects:0,xhr:0,requests:0,success:0,failure:0,idle:0}
  ,c=function(){
    var e;
    if(N)return c=function(){
      J.xhr++;
      return new N}
    ,c();
    try{
      e=new b("Msxml2.XMLHTTP"),c=function(){
        J.xhr++;
        return new b("Msxml2.XMLHTTP")}
      }
    catch(a){
      try{
        e=new b("Microsoft.XMLHTTP"),
c=function(){
          J.xhr++;
          return new b("Microsoft.XMLHTTP")}
        }
      catch(t){
        e=!1}
      }
    return e}
  ;
  e.core.ajax={
    stats:function(b){
      return b?J[b]:e.extend({
        }
      ,J)}
    ,headers:{
      "If-Modified-Since":"Sat, 29 Oct 1994 19:43:31 GMT","X-Requested-With":"XMLHttpRequest","X-Requested-By":"FusionCharts",Accept:"text/plain, */*","Content-Type":"application/x-www-form-urlencoded;
       charset=UTF-8"}
    }
  ;
  u=e.ajax=function(b,a){
    this.onSuccess=b;
    this.onError=a;
    this.open=!1;
    J.objects++;
    J.idle++}
  ;
  e.extend(u.prototype,{
    headers:e.core.ajax.headers,
transact:function(b,a,t,U){
      var F=this,g=F.xmlhttp,d=F.headers,h=F.onError,l=F.onSuccess;
      b="POST"===b;
      var L,P;
      if(!g||q)g=c(),F.xmlhttp=g;
      g.onreadystatechange=function(){
        try{
          4===g.readyState&&(!g.status&&D||200<=g.status&&300>g.status||304===g.status||1223===g.status||0===g.status?(l&&l(g.responseText,F,U,a),J.success++):h&&(h(Error("XmlHttprequest Error"),F,U,a),J.failure++),J.idle--,F.open=!1)}
        catch(b){
          h&&h(b,F,U,a),k.FC_DEV_ENVIRONMENT&&setTimeout(function(){
            throw b;
            }
          ,0),J.failure++}
        }
      ;
      try{
        g.open(b?
"POST":"GET",a,!0);
        g.overrideMimeType&&g.overrideMimeType("text/plain");
        if(b)if("string"===typeof t)L=t;
        else{
          L=[];
          for(P in t)L.push(P+"="+(t[P]+"").replace(/\=/g,"%3D").replace(/\&/g,"%26"));
          L=L.join("&")}
        else L=null;
        for(P in d)g.setRequestHeader(P,d[P]);
        g.send(L);
        J.requests++;
        J.idle++;
        F.open=!0}
      catch(n){
        e.raiseError(e.core,"1110111515A","run","XmlHttprequest Error",n.message)}
      return g}
    ,get:function(b,a){
      return this.transact("GET",b,void 0,a)}
    ,post:function(b,a,c){
      return this.transact("POST",b,a,
c)}
    ,abort:function(){
      var b=this.xmlhttp;
      this.open=!1;
      return b&&"function"===typeof b.abort&&b.readyState&&0!==b.readyState&&b.abort()}
    ,dispose:function(){
      this.open&&this.abort();
      delete this.onError;
      delete this.onSuccess;
      delete this.xmlhttp;
      delete this.open;
      J.objects--;
      return null}
    }
  )}
  ]);
  
FusionCharts.register("module",["private","modules.mantle.runtime;
  1.1",function(){
  var e=this,k=e.window,u=/(^|[\/\\])(fusioncharts\.js)([\?#].*)?$/ig,q=/[\\\"<>;
  &]/,D=/^[^\S]*?(sf|f|ht)(tp|tps):\/\//i,b={
    }
  ,N={
    }
  ,J={
    }
  ,c={
    }
  ,p=e.purgeDOM=function(a){
    var b=a.attributes,c,d;
    if(b)for(c=b.length-1;
    0<=c;
    --c)d=b[c].name,"function"===typeof a[d]&&(a[d]=null);
    if(b=a.childNodes)for(b=b.length,c=0;
    c<b;
    c+=1)p(a.childNodes[c])}
  ,a=function(a,b,c){
    var d,h;
    for(d in a)if(a[d]instanceof Array)b[a[d][0]]=c[d];
    else for(h in a[d])b[a[d][h][0]]=
c[d][h]}
  ,t=/^(FusionCharts|FusionWidgets|FusionMaps)/;
  e.getScriptBaseUri=function(a){
    var b=k.document.getElementsByTagName("script"),c=b.length,d,h;
    for(h=0;
    h<c;
    h+=1)if(d=b[h].getAttribute("src"),void 0!==d&&null!==d&&null!==d.match(a))return d.replace(a,"$1")}
  ;
  e.core.options.scriptBaseUri=function(){
    var a=e.getScriptBaseUri(u);
    return void 0===a?(e.raiseError(FusionCharts,"1603111624","run",">GenericRuntime~scriptBaseUri","Unable to locate FusionCharts script source location (URL)."),""):a}
  ();
  e.isXSSSafe=
function(a,b){
    return b&&null!==D.exec(a)?!1:null===q.exec(a)}
  ;
  e.xssEncode=function(a){
    return null===a||void 0===a||"function"!==typeof a.toString?"":a=a.toString().replace(/&/g,"&amp;
    ").replace(/\'/g,"&#39;
    ").replace(/\"/g,"&quot;
    ").replace(/</g,"&lt;
    ").replace(/>/g,"&gt;
    ")}
  ;
  e.loadScript=function(a,F,g,d,h){
    if(!a)return!1;
    var l=F&&F.success||F,L=F&&F.failure,p,n={
      type:"script",success:!1}
    ,C=function(){
      c[p]=clearTimeout(c[p]);
      n.success?l&&l(a,p):L&&L(a,p);
      e.raiseEvent("externalresourceload",n,e.core)}
    ;
    
h=h?"":e.core.options.scriptBaseUri;
    p=h+a;
    e.isXSSSafe(p,!1)||(p="function"===typeof k.encodeURIComponent?k.encodeURIComponent(p):k.escape(p));
    n.path=h;
    n.src=p;
    n.file=a;
    if(!0===J[p]&&d)return n.success=!0,n.notReloaded=!0,"function"===typeof F&&(F(),e.raiseEvent("externalresourceload",n,e.core)),!0;
    if(b[p]&&d)return!1;
    b[p]=!0;
    N[p]&&N[p].parentNode&&N[p].parentNode.removeChild(N[p]);
    F=N[p]=k.document.createElement("script");
    F.type="text/javascript";
    F.src=p;
    g&&(F["\v"==="v"?"text":"innerHTML"]=g);
    "function"===
typeof l&&(J[p]=!1,c[p]=clearTimeout(c[p]),F.onload=function(){
      J[p]=!0;
      n.success=!0;
      C()}
    ,F.onerror=function(){
      J[p]=!1;
      b[p]=!1;
      C()}
    ,F.onreadystatechange=function(){
      if("complete"===this.readyState||"loaded"===this.readyState)J[p]=!0,n.success=!0,C()}
    );
    k.document.getElementsByTagName("head")[0].appendChild(F);
    "function"===typeof L&&(c[p]=setTimeout(function(){
      J[p]||C()}
    ,e.core.options.html5ResourceLoadTimeout||15E3));
    return!0}
  ;
  e.capitalizeString=function(a,b){
    return a?a.replace(b?/(^|\s)([a-z])/g:/(^|\s)([a-z])/,
function(a,b,c){
      return b+c.toUpperCase()}
    ):a}
  ;
  e.extend(e.core,{
    clone:function(b,c){
      var g=typeof b,d,h=e.extend({
        }
      ,this.args,!1,!1);
      a(e.policies,h,this);
      a(e.renderer.getRendererPolicy(this.options.renderer),h,this);
      delete h.id;
      delete h.animate;
      delete h.stallLoad;
      d=h.link;
      h=e.extend({
        }
      ,h,!1,!1);
      h.link=d;
      switch(g){
        case "object":e.extend(h,b);
        break;
        case "boolean":c=b}
      return c?h:new e.core(h)}
    ,isActive:function(){
      if(!this.ref||k.document.getElementById(this.id)!==this.ref)return!1;
      try{
        return t.test(this.ref.signature())}
      catch(a){
        return!1}
      }
    ,
chartType:function(a,b){
      var c=this.src,d=!0===b,h=this.options,l;
      "string"===typeof a&&(b="object"===typeof b?b:{
        }
      ,c=a.replace(/[\?\#][\s\S]*$/g,""),l=null!==c.match(/\.swf\s*?$/ig),c=c.replace(/\.swf\s*?$/ig,""),h.chartType=c.replace(/^[\s\S]*\//ig,"").replace(/^fcmap_/i,""),h.chartTypeSourcePath=-1===c.indexOf("/")?b.chartTypeSourcePath||this.options.chartTypeSourcePath||e.core.options.chartTypeSourcePath||"":c.replace(/[^\/]*?$/ig,""),this.src=((e.core.options.scriptBaseUri||"")+(h.chartTypeSourcePath||
e.core.options.chartTypeSourcePath||"")).replace(/\/\s*$/g,"")+"/"+h.chartType.replace(/\.swf\s*?$/ig,"")+".swf",l&&(e.raiseWarning(this,"08101320181","comp","FusionCharts#chartType",'Chart type has ".swf" in alias and as such has been deprecated. Please use chart type alias.'),h.chartTypeSourcePath=e.core.options.chartTypeSourcePath||""),void 0!==b.dataSource&&null!==b.dataSource?this.setChartData(b.dataSource,b.dataFormat,b.dataConfiguration):this.isActive()&&!d&&this.render());
      return(h.chartType||
"").toLowerCase()}
    }
  ,!0);
  k.getChartFromId=function(a){
    e.raiseWarning(this,"11133001041","comp","GenericRuntime~getObjectFromId()",'Use of deprecated getChartFromId() or getMapFromId(). Replace with "FusionCharts()" or FusionCharts.items[].');
    return e.core.items[a]instanceof e.core?e.core.items[a].ref:k.swfobject&&k.swfobject.getObjectById(a)}
  ;
  k.getMapFromId=k.getChartFromId}
  ]);
  
FusionCharts.register("module",["private","api.printmanager",function(){
  var e=this;
  e.extend(e.core,{
    printManager:{
      configure:function(){
        e.raiseWarning(e.core,"28141714","impl",".printManager.configure","PrintManager is deprecated")}
      ,isReady:function(){
        e.raiseWarning(e.core,"28141714","impl",".printManager.isReady","PrintManager is deprecated");
        return!1}
      ,enabled:function(){
        e.raiseWarning(e.core,"28141714","impl",".printManager.enabled","PrintManager is deprecated");
        return!1}
      ,managedPrint:function(){
        e.raiseWarning(e.core,
"28141714","impl",".printManager.managedPrint","PrintManager is deprecated")}
      }
    }
  ,!1)}
  ]);
  
FusionCharts.register("module",["private","modules.interface.renderer",function(){
  var e=this,k=e.window,u=k.document,q=function(){
    e.raiseError(this,"25081845","run","::RendererManager",Error("No active renderer"))}
  ,D=e.FusionChartsDOMInsertModes={
    REPLACE:"replace",APPEND:"append",PREPEND:"prepend"}
  ,b={
    undefined:{
      render:q,remove:q,update:q,resize:q,config:q,policies:{
        }
      }
    }
  ,N={
    }
  ,J=function(a){
    return function(){
      var b=this.ref;
      if(void 0===b||null===b||"function"!==typeof b[a])e.raiseError(this,"25081617",
"run","#"+a+"()","ExternalInterface call failed. Check whether chart has been rendered.");
      else return b[a].apply(b,arguments)}
    }
  ,c=function(a,b){
    return"function"===typeof a[b]?function(){
      return a[b].apply(a,arguments)}
    :a[b]}
  ,p=function(a,b){
    var c=u.getElementById(a),d=b.id||b.getAttribute("id"),h,l;
    if(null===c)return!1;
    if(a===d)return!0;
    d=b.getElementsByTagName("*");
    h=0;
    for(l=d.length;
    h<l;
    h++)if(d[h]===c)return!1;
    return!0}
  ,a=/[^\%\d]*$/ig,t;
  e.policies.options.containerElementId=["renderAt",void 0];
  
e.policies.options.renderer=["renderer",void 0];
  e.policies.options.containerElementType=["containerElementType",void 0];
  e.normalizeCSSDimension=function(a,b,c){
    a=void 0===a?c.offsetWidth||parseFloat(c.style.width):a;
    b=void 0===b?c.offsetHeight||parseFloat(c.style.height):b;
    var d={
      }
    ,h=c.style,l;
    h.width=a=a.toString?a.toString():"0";
    h.height=b=b.toString?b.toString():"0";
    if((d.widthIsRelative=a.match(/^\s*\d*\.?\d*\%\s*$/)&&!a.match(/^\s*0\%\s*$/))&&0===c.offsetWidth)for(l=c;
    l=l.offsetParent;
    )if(0<
l.offsetWidth){
      a=(l.offsetWidth*parseFloat(a.match(/\d*/)[0])/100).toString();
      break}
    if((d.heightIsRelative=b.match(/^\s*\d*\.?\d*\%\s*$/)&&!b.match(/^\s*0\%\s*$/))&&20>=c.offsetHeight)for(l=c;
    l=l.offsetParent;
    )if(0<l.offsetHeight){
      b=(l.offsetHeight*parseFloat(b.match(/\d*/)[0])/100).toString();
      break}
    d.width=a.replace?a.replace(/^\s*(\d*\.?\d*)\s*$/ig,"$1px"):a;
    d.height=b.replace?b.replace(/^\s*(\d*\.?\d*)\s*$/ig,"$1px"):b;
    h.width=d.width;
    h.height=d.height;
    d.pixelWidth=d.widthIsRelative?c.offsetWidth:
parseInt(d.width,10)||0;
    d.pixelHeight=d.heightIsRelative?c.offsetHeight:parseInt(d.height,10)||0;
    return d}
  ;
  t=e.renderer={
    register:function(a,c){
      if(!a||"function"!==typeof a.toString)throw Error("#03091436 ~renderer.register() Invalid value for renderer name.");
      a=a.toString().toLowerCase();
      if(void 0!==b[a])return e.raiseError(e.core,"03091438","param","::RendererManager>register",'Duplicate renderer name specified in "name"'),!1;
      b[a]=c;
      return!0}
    ,userSetDefault:!1,setDefault:function(a){
      if(!a||"function"!==
typeof a.toString)return e.raiseError(e.core,"25081731","param","::RendererManager>setDefault",'Invalid renderer name specified in "name"'),!1;
      if(void 0===b[a=a.toString().toLowerCase()])return e.raiseError(e.core,"25081733","range","::RendererManager>setDefault","The specified renderer does not exist."),!1;
      this.userSetDefault=!1;
      e.policies.options.renderer=["renderer",a];
      return!0}
    ,notifyRender:function(a){
      var b=e.core.items[a&&a.id];
      b&&(!1!==a.success||a.silent)||e.raiseError(e.core.items[a.id],
"25081850","run","::RendererManager",Error("There was an error rendering the chart. Enable FusionCharts JS debugger for more information."));
      if(b.ref=a.ref)a.ref.FusionCharts=e.core.items[a.id];
      e.raiseEvent("internal.DOMElementCreated",{
        }
      ,b)}
    ,protectedMethods:{
      options:!0,attributes:!0,src:!0,ref:!0,constructor:!0,signature:!0,link:!0,addEventListener:!0,removeEventListener:!0}
    ,getRenderer:function(a){
      return b[a]}
    ,getRendererPolicy:function(a){
      a=b[a].policies;
      return"object"===typeof a?a:{
        }
      }
    ,currentRendererName:function(){
      return e.policies.options.renderer[1]}
    ,
update:function(a){
      N[a.id].update.apply(a,Array.prototype.slice.call(arguments,1))}
    ,render:function(a){
      N[a.id].render.apply(a,Array.prototype.slice.call(arguments,1))}
    ,remove:function(a){
      N[a.id].remove.apply(a,Array.prototype.slice.call(arguments,1))}
    ,resize:function(a){
      N[a.id].resize.apply(a,Array.prototype.slice.call(arguments,1))}
    ,config:function(a){
      N[a.id].config.apply(a,Array.prototype.slice.call(arguments,1))}
    ,dispose:function(a){
      N[a.id].dispose.apply(a,Array.prototype.slice.call(arguments,
1))}
    }
  ;
  e.addEventListener("beforeInitialize",function(a){
    a=a.sender;
    var c=a.options.renderer.toLowerCase(),g;
    "string"===typeof a.options.renderer&&void 0===b[c]&&(a.options.renderer=e.policies.options.renderer[1]);
    a.options.renderer=c;
    N[a.id]=b[a.options.renderer];
    !0!==N[a.id].initialized&&"function"===typeof N[a.id].init&&(N[a.id].init(),N[a.id].initialized=!0);
    e.parsePolicies(a,N[a.id].policies||{
      }
    ,a.args);
    for(g in N[a.id].prototype)a[g]=N[a.id].prototype[g];
    for(g in N[a.id].events)a.addEventListener(g,
N[a.id].events[g])}
  );
  e.addEventListener(["rendered","dataloaderror","nodatatodisplay","rendercancelled"],function(a,b){
    var c=a.sender;
    c instanceof e.core&&c.__state.rendering&&(e.raiseEvent("internal.rendered",b,c),delete c.__state.rendering)}
  );
  e.addEventListener("loaded",function(a){
    var b=a.sender;
    a=a.sender.ref;
    var g,d;
    if(void 0!==a&&null!==a&&"function"===typeof a.getExternalInterfaceMethods){
      try{
        g=a.getExternalInterfaceMethods(),g="string"===typeof g?g.split(","):[]}
      catch(h){
        g=[],e.raiseError(b,
"13111126041","run","RendererManager^Loaded",Error("Error while retrieving data from the chart-object."+(h.message&&0<=h.message.indexOf("NPObject")?" Possible cross-domain security restriction.":"")))}
      for(a=0;
      a<g.length;
      a+=1)d=g[a],void 0===b[d]&&(b[d]=J(d));
      if(b.ref)for(d in g=t.protectedMethods,a=t.getRenderer(b.options.renderer).protectedMethods,b)if(a&&!g[d]&&!a[d]&&void 0===b.ref[d])try{
        b.ref[d]=c(b,d)}
      catch(l){
        }
      }
    }
  );
  e.legacyEventList.resized="FC_Resized";
  e.extend(e.core.prototype,{
    render:function(a,
b,c){
      var d=this,h,l,L;
      if((L=k[this.id])&&L.FusionCharts&&L.FusionCharts===this||(L=this.ref)&&L.FusionCharts&&L.FusionCharts===this)e.renderer.dispose(this),L===k[this.id]&&(k[this.id]=void 0);
      void 0!==k[this.id]&&e.raiseError(this,"25081843","comp",".render",Error("#25081843:IECompatibility() Chart Id is same as a JavaScript variable name. Variable naming error. Please use unique name forchart JS variable, chart-id and container id."));
      c?"function"!==typeof c&&(c=void 0):"function"===typeof b?(c=
b,b=void 0):b||"function"!==typeof a||(c=a,a=void 0);
      b=(b||this.options.insertMode).toLowerCase()||D.REPLACE;
      void 0===a&&(a=this.options.containerElementId);
      "string"===typeof a&&(a=u.getElementById(a));
      if(void 0===a||null===a)return e.raiseError(this,"03091456","run",".render()",Error("Unable to find the container DOM element.")),this;
      if(p(this.id,a))return e.raiseError(this,"05102109","run",".render()",Error("A duplicate object already exists with the specific Id: "+this.id)),this;
      h=u.createElement(this.options.containerElementType||
"span");
      h.setAttribute("id",this.id);
      if("append"!==b&&"prepend"!==b)for(;
      a.hasChildNodes();
      )a.removeChild(a.firstChild);
      "prepend"===b&&a.firstChild?a.insertBefore(h,a.firstChild):a.appendChild(h);
      this.options.containerElement=a;
      this.options.containerElementId=a.id;
      if(b=h.style)b.position="relative",b.textAlign="left",b.lineHeight="normal",b.display="inline-block",b.zoom="1",b.fontWeight="normal",b.fontVariant="normal",b.fontStyle="normal",b.textDecoration="none",b["*DISPLAY"]="inline",b.padding="0",
b.margin="0",b.border="none",b.direction="ltr";
      this.options.containerClassName&&(h.className=this.options.containerClassName);
      b=e.normalizeCSSDimension(this.width,this.height,h);
      this.__state.renderedWidth=b.pixelWidth;
      this.__state.renderedHeight=b.pixelHeight;
      this.__state.rendering=!0;
      e.raiseEvent("beforeRender",l={
        container:a,width:this.width,height:this.height,renderer:this.options.renderer}
      ,this,void 0,function(a,b){
        e.renderer.render(d,h,function(){
          e.renderer.notifyRender.apply(this,arguments);
          
if(c)try{
            c.call(a.sender,b.container)}
          catch(d){
            setTimeout(function(){
              throw d;
              }
            )}
          }
        )}
      ,function(){
        e.raiseEvent("renderCancelled",l,d)}
      );
      return this}
    ,remove:function(){
      e.renderer.remove(this);
      return this}
    ,resizeTo:function(b,c,g){
      var d=this,h=d.width,l=d.height,p=d.__state;
      "object"===typeof b&&(g=c,c=b.h,b=b.w);
      b=null===b||void 0===b?h:b.toString().replace(a,"");
      c=null===c||void 0===c?l:c.toString().replace(a,"");
      !0!==g?e.raiseEvent("beforeresize",{
        currentWidth:h,currentHeight:l,newWidth:b,newHeight:c}
      ,
d,void 0,function(){
        d.width=b;
        d.height=c;
        e.renderer.resize(d,{
          width:b,height:c}
        );
        e.raiseEventWithLegacy("resized",{
          width:d.width,height:d.height,prevWidth:h,prevHeight:l,pixelWidth:d.ref&&d.ref.offsetWidth||0,pixelHeight:d.ref&&d.ref.offsetHeight||0,originalWidth:p.renderedWidth,originalHeight:p.renderedHeight}
        ,d,[d.id,d.width,d.height])}
      ,function(){
        e.raiseEvent("resizecancelled",{
          currentWidth:h,currentHeight:l,cancelledTargetWidth:b,cancelledTargetHeight:c}
        ,d)}
      ):(d.width=b,d.height=c);
      return this}
    ,
dispose:function(){
      var a=this,b={
        }
      ;
      e.raiseEvent("beforeDispose",b,a,void 0,function(){
        e.renderer.dispose(a);
        e.raiseEvent("disposed",b,a);
        e.disposeEvents(a);
        delete e.core.items[a.id];
        for(var c in a)a.hasOwnProperty(c)&&delete a[c];
        a.disposed=!0}
      ,function(){
        e.raiseEvent("disposeCancelled",b,a)}
      )}
    ,configure:function(a,b){
      var c;
      a&&("string"===typeof a?(c={
        }
      ,c[a]=b):c=a,e.renderer.config(this,c))}
    }
  );
  e.extend(e.core,{
    setCurrentRenderer:function(){
      var a=t.setDefault.apply(t,arguments);
      t.userSetDefault=!0;
      
return a}
    ,getCurrentRenderer:function(){
      return t.currentRendererName.apply(t,arguments)}
    ,render:function(a,b){
      return a instanceof e.core?(a.render(b),a):(new e.core(a)).render(b)}
    }
  ,!1)}
  ]);
  
FusionCharts.register("module",["private","modules.interface.transcoder",function(){
  var e=this,k=e.window,u=e.transcoders={
    }
  ,q={
    }
  ,D={
    }
  ,b=/url$/i,N=e._interactiveCharts={
    selectscatter:[!0,!1],dragcolumn2d:[!0,!0],dragarea:[!0,!0],dragline:[!0,!0],dragnode:[!0,!0]}
  ,J=function(b,c,l,g){
    var t=l.obj;
    l=l.args;
    l.dataSource=b;
    l.xmlHttpRequestObject=c;
    l.source="XmlHttpRequest";
    l.url=g;
    e.raiseEvent("dataLoadRequestCompleted",l,t,void 0,p,a)}
  ,c=function(a,b,c){
    var g=c.obj;
    c=c.args;
    c.error=a;
    c.httpStatus=b.xhr&&
b.xhr.status?b.xhr.status:-1;
    c.xmlHttpRequestObject=b;
    e.raiseEvent("dataLoadError",c,g);
    "function"===typeof k.FC_DataLoadError&&k.FC_DataLoadError(g.id,c)}
  ,p=function(a,b){
    a.sender.setChartData(b.dataSource,b.dataFormat,b.config,b.successcallback,b.silent)}
  ,a=function(a,b){
    e.raiseEvent("dataLoadCancelled",b,a.sender);
    b.xmlHttpRequestObject.abort()}
  ,t=function(a,b){
    var l=a.sender,g=l.__state,p=b.url;
    l.options.dataSource=b.url;
    g.dhmXhrObj||(g.dhmXhrObj=new e.ajax(J,c));
    g.dhmXhrObj.get("function"===
typeof k.decodeURIComponent?k.decodeURIComponent(p):k.unescape(p),{
      obj:l,args:b}
    )}
  ,U=function(a,b){
    var c=a.sender,g=c.__state;
    e.raiseEvent("dataLoadRequestCancelled",b,c);
    g&&g.dhmXhrObj&&g.dhmXhrObj.abort()}
  ,F=function(a,b){
    var c=a.sender,g=c.__state,p=c.id;
    q[p]=b;
    D[p]&&delete D[p];
    D[p]={
      }
    ;
    g.dataReady=void 0;
    g.dataAvailable=!0;
    !0!==b.silent&&(!0!==c.options.safeMode||!0!==g.rendering||c.isActive()?(delete g.args,e.renderer.update(c,b)):(g.updatePending=b,e.raiseWarning(c,"23091255","run","::DataHandler~update",
"Renderer update was postponed due to async loading.")));
    e.raiseEvent("dataUpdated",b,c,void 0,b.successcallback)}
  ,g=function(a,b){
    e.raiseEvent("dataUpdateCancelled",b,a.sender,void 0,b.failurecallback)}
  ;
  e.dataFormats={
    }
  ;
  e.policies.options.dataSource=["dataSource",void 0];
  e.policies.options.dataFormat=["dataFormat",void 0];
  e.policies.options.dataConfiguration=["dataConfiguration",void 0];
  e.policies.options.showDataLoadingMessage=["showDataLoadingMessage",!1];
  e.addDataHandler=function(a,b){
    if("string"!==
typeof a||void 0!==u[a.toLowerCase()])e.raiseError(e.core,"03091606","param","::DataManager.addDataHandler",Error("Invalid Data Handler Name"));
    else{
      var c={
        }
      ,g=a.toLowerCase();
      u[g]=b;
      b.name=a;
      c["set"+a+"Data"]=function(b,c,h){
        return this.setChartData(b,a,c,h)}
      ;
      b.transportable&&(c["set"+a+"Url"]=function(b,c,h){
        return this.setChartDataUrl(b,a,c,h)}
      ,e.dataFormats[a+"URL"]=g+"Url");
      c["get"+a+"Data"]=function(){
        return this.getChartData(a)}
      ;
      e.dataFormats[a]=g;
      e.extend(e.core,c,!0)}
    }
  ;
  e.extend(e.core.prototype,
{
    setChartDataUrl:function(a,c,g,p,F){
      if(void 0===c||null===c||"function"!==typeof c.toString)c=this.options.dataFormat,e.raiseWarning(this,"03091609","param","FusionCharts#setChartDataUrl","Invalid Data Format. Reverting to current data format - "+c);
      c=c.toString().toLowerCase();
      c=b.test(c)?c.slice(0,-3):c;
      e.raiseEvent("dataLoadRequested",{
        source:"XmlHttpRequest",url:a,dataFormat:c,silent:!!F,config:g,successcallback:p}
      ,this,void 0,t,U)}
    ,setChartData:function(a,c,l,p,t){
      var n=this.options,C,w;
      if(void 0===
c||null===c||"function"!==typeof c.toString)c=n.dataFormat,e.raiseWarning(this,"03091610","param","FusionCharts#setChartData","Invalid Data Format. Reverting to current data format - "+c);
      c=c.toString().toLowerCase();
      b.test(c)?this.setChartDataUrl(a,c,l,p,t):(n.dataSource=a,C=c,n.dataFormat=c,w=u[C],"undefined"===typeof w?e.raiseError(e.core,"03091611","param","FusionCharts#setChartData",Error("Data Format not recognized")):(c=(c=e.renderer&&e.renderer.getRenderer(n.renderer||e.renderer.currentRendererName()))&&
c.dataFormat,l=c===C?w.passthrough?w.passthrough(a,l):{
        data:a}
      :w.encode(a,this,l||n.dataConfiguration)||{
        }
      ,l["native"]=c===C,l.format=l["native"]?c:"xml",l.dataFormat=C,l.dataSource=a,l.silent=!!t,"function"===typeof p&&(l.successcallback=p),e.raiseEvent("beforeDataUpdate",l,this,void 0,F,g)))}
    ,getChartData:function(a,b){
      var c=this.options,g=this.id,p;
      if(void 0===a||"function"!==typeof a.toString||void 0===(p=u[a=a.toString().toLowerCase()]))e.raiseError(this,"25081543","param","::transcoder~getChartData()",
Error('Unrecognized data-format specified in "format"'));
      else return D[g][a]?c=D[g][a]:q[g]?(a===q[g].format?D[g][a]=q[g]:(D[g].xml||(D[g].xml="xml"===q[g].format?q[g]:u[q[g].format].encode(q[g].data,this,c.dataConfiguration)),D[g][a]||(D[g][a]=p.decode(D[g].xml.data,this,c.dataConfiguration))),c=D[g][a]):c={
        error:Error("Data not defined")}
      ,!0===Boolean(b)?c:c.data}
    ,dataReady:function(a){
      return a?this.__state.dataAvailable:this.__state.dataReady}
    }
  );
  e.extend(e.core,{
    transcodeData:function(a,b,c,g,
p){
      if(b&&"function"===typeof b.toString&&c&&"function"===typeof c.toString&&void 0!==u[c=c.toString().toLowerCase()]&&void 0!==u[b=b.toString().toLowerCase()])return a=u[b].encode(a,this,p),c=u[c].decode(a.data,this,p),c.error instanceof Error||(c.error=a.error),g?c:c.data;
      e.raiseError(this,"14090217","param",".transcodeData()",Error("Unrecognized data-format specified during transcoding."))}
    }
  ,!1);
  e.getRenderer&&!e.getRenderer("flash")||e.addEventListener("DataLoadRequested",function(a){
    var b=a.sender;
    
b.options&&"flash"===b.options.renderer&&b.options.useLegacyXMLTransport&&a.preventDefault()}
  );
  e.addEventListener("beforeInitialize",function(a){
    a=a.sender;
    var c=a.options,g=c.dataSource,p=e.renderer&&e.renderer.getRenderer(c.renderer);
    delete q[a.id];
    D[a.id]={
      }
    ;
    if(void 0!==g&&null!==g){
      a.__state.dataSetDuringConstruction=!0;
      if("string"!==typeof c.dataFormat)switch(typeof g){
        case "function":g=c.dataSource=g.call(a,c.dataConfiguration);
        c.dataFormat="JSON";
        break;
        case "string":c.dataFormat=/^\s*?\{
          [\s\S]*\}
        \s*?$/g.test(a.options.dataFormat)?
"JSON":"XML";
        break;
        case "object":c.dataFormat="JSON"}
      c.dataFormat&&c.dataFormat.toString&&(a.__state.dataFetchDuringConstruction=b.test(c.dataFormat.toString()));
      a.setChartData(g,c.dataFormat,void 0,void 0,!0)}
    else p&&(a.__state.dataSetDuringConstruction=!1,e.raiseWarning(a,"1810131922A","param",":dataHandler~event:beforeInitialize","Data source was not defined during construction, hence set to blank renderer default - "+p.dataFormat),a.setChartData("",p.dataFormat,void 0,void 0,!0),a.__state.dataAvailable=
!1)}
  );
  e.addEventListener("beforeDispose",function(a){
    var b=a.sender;
    delete q[a.sender.id];
    delete D[a.sender.id];
    b&&b.__state&&b.__state.dhmXhrObj&&b.__state.dhmXhrObj.abort()}
  );
  e.addEventListener("disposed",function(a){
    delete D[a.sender.id]}
  );
  e.addEventListener("loaded",function(a){
    a=a.sender;
    var b=a.__state.updatePending;
    a instanceof e.core&&void 0!==b&&(delete a.__state.updatePending,e.renderer.update(a,b))}
  );
  e.addEventListener("dataUpdated",function(a,b){
    var c=a.sender,g=c.__state;
    g.rendering&&
(g.dataFetchDuringConstruction||g.updatePending)&&(delete g.dataFetchDuringConstruction,delete g.updatePending,e.renderer.update(c,b))}
  );
  e.addEventListener(["dataLoadError","dataInvalid"],function(a){
    a.sender.__state.dataAvailable=!1}
  );
  e.addEventListener("loaded",function(a){
    a=a.sender;
    var b=a.__state,c,g,p;
    p=function(a,b){
      return function(c){
        return!1===c?b.apply(this):this.ref.getUpdatedXMLData?e.core.transcodeData(this.ref.getUpdatedXMLData(),"xml",a):this.getData?this.getData(a):b.apply(this)}
      }
    ;
    
if(a.chartType&&N[a.chartType()]&&N[a.chartType()][0]){
      for(c in e.transcoders)g=e.transcoders[c].name,g="get"+g+"Data",a[g]=p(c,a.constructor.prototype[g]),a[g]._dynamicdatarouter=!0;
      b.dynamicDataRoutingEnabled=!0}
    else if(b.dynamicDataRoutingEnabled){
      for(c in e.transcoders)g=e.transcoders[c].name,g="get"+g+"Data",a.hasOwnProperty(g)&&a[g]._dynamicdatarouter&&delete a[g];
      b.dynamicDataRoutingEnabled=!1}
    }
  )}
  ]);
  "object"!==typeof JSON&&(JSON={
  }
  );
  
(function(){
  function e(b){
    return 10>b?"0"+b:b}
  function k(b){
    D.lastIndex=0;
    return D.test(b)?'"'+b.replace(D,function(a){
      var b=J[a];
      return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}
    )+'"':'"'+b+'"'}
  function u(e,a){
    var t,q,F,g,d=b,h,l=a[e];
    l&&"object"===typeof l&&"function"===typeof l.toJSON&&(l=l.toJSON(e));
    "function"===typeof c&&(l=c.call(a,e,l));
    switch(typeof l){
      case "string":return k(l);
      case "number":return isFinite(l)?String(l):"null";
      case "boolean":case "null":return String(l);
      
case "object":if(!l)return"null";
      b+=N;
      h=[];
      if("[object Array]"===Object.prototype.toString.apply(l)){
        g=l.length;
        for(t=0;
        t<g;
        t+=1)h[t]=u(t,l)||"null";
        F=0===h.length?"[]":b?"[\n"+b+h.join(",\n"+b)+"\n"+d+"]":"["+h.join(",")+"]";
        b=d;
        return F}
      if(c&&"object"===typeof c)for(g=c.length,t=0;
      t<g;
      t+=1)"string"===typeof c[t]&&(q=c[t],(F=u(q,l))&&h.push(k(q)+(b?": ":":")+F));
      else for(q in l)Object.prototype.hasOwnProperty.call(l,q)&&(F=u(q,l))&&h.push(k(q)+(b?": ":":")+F);
      F=0===h.length?"{
        }
      ":b?"{
        \n"+b+h.join(",\n"+
b)+"\n"+d+"}
      ":"{
        "+h.join(",")+"}
      ";
      b=d;
      return F}
    }
  "function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){
    return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"Z":null}
  ,String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){
    return this.valueOf()}
  );
  var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
D=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,b,N,J={
    "\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"}
  ,c;
  "function"!==typeof JSON.stringify&&(JSON.stringify=function(e,a,t){
    var k;
    N=b="";
    if("number"===typeof t)for(k=0;
    k<t;
    k+=1)N+=" ";
    else"string"===typeof t&&(N=t);
    if((c=a)&&"function"!==typeof a&&("object"!==typeof a||"number"!==typeof a.length))throw Error("JSON.stringify");
    return u("",{
      "":e}
    )}
  );
  
"function"!==typeof JSON.parse&&(JSON.parse=function(b,a){
    function c(b,g){
      var d,h,e=b[g];
      if(e&&"object"===typeof e)for(d in e)Object.prototype.hasOwnProperty.call(e,d)&&(h=c(e,d),void 0!==h?e[d]=h:delete e[d]);
      return a.call(b,g,e)}
    var e;
    b=String(b);
    q.lastIndex=0;
    q.test(b)&&(b=b.replace(q,function(a){
      return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}
    ));
    if(/^[\],:{
      }
    \s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{
      4}
    )/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+b+")"),"function"===typeof a?c({
      "":e}
    ,""):e;
    throw new SyntaxError("JSON.parse");
    }
  )}
  )();
  
FusionCharts.register("module",["private","modules.data.json",function(){
  var e=this,k=e.window,u=k.document,q=e.xssEncode,D,b;
  void 0===k.JSON&&e.raiseError(this,"1113062012","run","JSONDataHandler",Error("Could not find library support for JSON parsing."));
  e.policies.options.allowIESafeXMLParsing=["_allowIESafeXMLParsing",!0];
  D=function(){
    var b={
      set:!0,trendlines:!0,vtrendlines:!0,line:{
        trendlines:!0,vtrendlines:!0}
      ,data:!0,dataset:!0,lineset:!0,categories:!0,category:!0,linkeddata:!0,application:!0,
definition:!0,axis:!0,connectors:!0,connector:{
        connectors:!0}
      ,trendset:!0,row:{
        rows:!0}
      ,column:{
        columns:!0}
      ,label:{
        labels:!0}
      ,color:{
        colorrange:!0}
      ,dial:{
        dials:!0}
      ,pointer:{
        pointers:!0}
      ,point:{
        trendpoints:!0}
      ,process:{
        processes:!0}
      ,task:{
        tasks:!0}
      ,milestone:{
        milestones:!0}
      ,datacolumn:{
        datatable:!0}
      ,text:{
        datacolumn:!0}
      ,item:{
        legend:!0}
      ,alert:{
        alerts:!0}
      ,groups:{
        annotations:!0}
      ,items:{
        groups:!0,data:!0}
      ,shapes:!0,shape:{
        shapes:!0}
      ,entitydef:!0,entity:{
        entitydef:!0}
      }
    ,q={
      chart:"linkedchart",map:"linkedmap",
set:"data",vline:{
        chart:"data",graph:"data",dataset:"data",categories:"category",linkedchart:"data"}
      ,apply:{
        application:"application"}
      ,style:{
        definition:"definition"}
      ,marker:{
        application:"application",definition:"definition",data:"items"}
      ,entity:{
        entitydef:"entitydef",data:"data"}
      ,shape:{
        shapes:"shapes"}
      ,connector:{
        connectors:{
          chart:"connector",linkedchart:"connector",map:"connectors",linkedmap:"connectors"}
        }
      ,annotationgroup:{
        annotations:"groups"}
      ,annotation:{
        groups:"items"}
      }
    ,c={
      vline:{
        vline:"true"}
      }
    ,
p={
      chart:!0,map:!0,graph:!0}
    ,a={
      dataset:"data",categories:"category"}
    ,t={
      target:"target",value:"value"}
    ,D={
      styles:{
        definition:!0,application:!0}
      ,chart:{
        value:!0,target:!0}
      ,graph:{
        value:!0,target:!0}
      ,linkedchart:{
        value:!0,target:!0}
      ,markers:{
        definition:!0,application:!0,shapes:!0,connectors:!0,data:!0}
      ,map:{
        entitydef:!0,data:!0}
      ,linkedmap:{
        entitydef:!0,data:!0}
      }
    ,F,g;
    F={
      append:function(a,c,g,e){
        !b[g]||!0!==b[g]&&!0!==b[g][e]?c[g]=a:(c[g]instanceof Array||(c[g]=[]),c[g].push(a))}
      ,child:function(b,g,
l,L){
        var k,n,C,w,R,v;
        for(k=0;
        k<g.length;
        k+=1)switch(C=g[k],n=C.nodeName.toLowerCase(),C.nodeType){
          case 1:w=F.attr(C.attributes);
          v=p[n];
          !0===v&&(R=w,w={
            }
          ,w[n]=R);
          v=c[n];
          "object"===typeof v&&e.extend(w,v);
          if(v=q[n])if("object"===typeof v&&"object"===typeof v[l])for(R in R=void 0,v[l]){
            if(L[R]){
              n=v[l][R];
              break}
            }
          else"object"===typeof v&&"string"===typeof v[l]?n=v[l]:"string"===typeof v&&(n=v);
          C.childNodes.length&&((v=D[l])&&v[n]?F.child(b,C.childNodes,n,L):F.child(w,C.childNodes,n,L));
          (v=D[l])&&v[n]||
F.append(w,b,n,l);
          break;
          case 3:if(v=t[l])n=v,w=C.data,F.append(w,b,n,l);
          v=a[l];
          "string"===typeof v&&L.chart&&parseInt(L.chart.compactdatamode,10)&&(n=v,w=C.data,b[n]=b[n]?b[n]+w:w)}
        }
      ,attr:function(a){
        var b,c={
          }
        ;
        if(!a||!a.length)return c;
        for(b=0;
        b<a.length;
        b+=1)c[a[b].nodeName.toLowerCase()]=a[b].value||a[b].nodeValue;
        return c}
      }
    ;
    g=function(a){
      var b={
        }
      ,c,p,t,n,C,w,R,v,q;
      if("object"!==typeof a&&a&&"function"!==typeof a.toString)return g.errorObject=new TypeError("xml2json.parse()"),b;
      a=a.toString().replace(/<\!--[\s\S]*?--\x3e/g,
"").replace(/<\?xml[\s\S]*?\?>/ig,"").replace(/&(?!([^;
      \n\r]+?;
      ))/g,"&amp;
      $1");
      a=a.replace(/^\s\s*/,"");
      for(var J=/\s/,D=a.length;
      J.test(a.charAt(--D));
      );
      a=a.slice(0,D+1);
      if(!a)return b;
      try{
        k.DOMParser?c=(new k.DOMParser).parseFromString(a,"text/xml"):u.body&&e.core.options.allowIESafeXMLParsing?(p=u.createElement("xml"),p.innerHTML=a,u.body.appendChild(p),c=p.XMLDocument,u.body.removeChild(p)):(c=new k.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(a));
        if(!(c&&c.childNodes&&1===c.childNodes.length&&
(t=c.childNodes[0])&&t.nodeName&&(n=t.nodeName.toLowerCase()))||"chart"!==n&&"map"!==n&&"graph"!==n)return g.errorObject=new TypeError("xml2json.parse()"),b;
        if("graph"===n){
          C=c.createElement("chart");
          for(q=(R=t.attributes)&&R.length||0;
          q--;
          )C.setAttribute(R[q].name,R[q].value),R.removeNamedItem(R[q].name);
          if(q=(v=t.childNodes)&&v.length||0)--q,w=t.removeChild(v[q]),C.appendChild(w);
          for(;
          q--;
          )w=t.removeChild(v[q]),C.insertBefore(w,C.firstChild);
          c.replaceChild(C,t);
          t=C}
        }
      catch(W){
        g.errorObject=W}
      t?(t.attributes&&
(b[n]=F.attr(t.attributes)),t.childNodes&&F.child(b,t.childNodes,n,b),delete g.errorObject):g.errorObject=new TypeError("xml2json.parse()");
      return b}
    ;
    return function(a){
      delete g.errorObject;
      return{
        data:g(a),error:g.errorObject}
      }
    }
  ();
  b=function(){
    var b,e;
    b={
      items:{
        explode:{
          data:"set",groups:{
            annotations:"annotationgroup"}
          ,items:{
            groups:"annotation"}
          }
        ,text:{
          chart:{
            target:"target",value:"value"}
          ,graph:{
            target:"target",value:"value"}
          }
        ,dsv:{
          dataset:{
            data:"dataset"}
          ,categories:{
            category:"categories"}
          }
        ,attr:{
          chart:{
            chart:"chart"}
          ,
graph:{
            graph:"graph"}
          ,map:{
            map:"map"}
          ,linkedmap:{
            map:"map"}
          ,linkedchart:{
            chart:"chart"}
          }
        ,group:{
          styles:{
            definition:"style",application:"apply"}
          ,map:{
            data:"entity",entitydef:"entity"}
          ,markers:{
            definition:"marker",application:"marker",shapes:"shape",connectors:"connector",items:"marker"}
          }
        ,tag:{
          markers:{
            items:"data"}
          }
        }
      ,qualify:function(b,e,a){
        return"object"===typeof this.items[b][a]?this.items[b][a][e]:this.items[b][a]}
      }
    ;
    e=function(c,p,a,t){
      var k="",F="",g="",d="",h,l,L;
      p&&"function"===typeof p.toLowerCase&&
(p=p.toLowerCase());
      if(void 0===a&&c[p])for(h in c[p])l=h.toLowerCase(),"compactdatamode"===l&&(t.applyDSV=1==c[p][h]);
      if(c instanceof Array)for(h=0;
      h<c.length;
      h+=1)g="string"===typeof c[h]?g+q(c[h]):g+e(c[h],p,a,t);
      else{
        for(h in c)l=h.toLowerCase(),c[h]instanceof Array&&(L=b.qualify("group",l,p))?(g=b.qualify("tag",l,p)||l,F+="<"+g+">"+e(c[h],L,p,t)+"</"+g+">"):"object"===typeof c[h]?(L=b.qualify("attr",l,p))?(d=e(c[h],L,p,t).replace(/\s*\/\>/ig,""),p=l):F+=e(c[h],l,p,t):t.applyDSV&&(L=b.qualify("dsv",
l,p))?F+=c[h]:(L=b.qualify("text",l,p))?(g=b.qualify("tag",l,p)||L,F+="<"+g+">"+c[h]+"</"+g+">"):"vline"===l&&Boolean(c[h])?p="vline":k+=" "+l+'="'+q(c[h]).toString().replace(/\"/ig,"&quot;
        ")+'"';
        if(L=b.qualify("explode",a,p))p=L;
        g=p;
        g=(""!==d?d:"<"+g)+k+(""!==F?">"+F+"</"+g+">":" />")}
      return g}
    ;
    return function(b){
      delete e.errorObject;
      if(b&&"string"===typeof b)try{
        b=JSON.parse(b)}
      catch(p){
        e.errorObject=p}
      return{
        data:e(b,b&&b.graph?"graph":b&&b.map?"map":"chart",void 0,{
          }
        ),error:e.errorObject}
      }
    }
  ();
  
e.addDataHandler("JSON",{
    encode:b,decode:D,passthrough:function(b){
      var e={
        data:{
          }
        }
      ;
      if(!b)return e;
      if("string"!==typeof b)try{
        b=JSON.stringify(b)}
      catch(c){
        return e.error=c,e}
      try{
        e.data=JSON.parse(b.replace(/"([^"]+)":/g,function(a,b){
          return'"'+b.toLowerCase()+'":'}
        ))}
      catch(p){
        e.error=p}
      return e}
    ,transportable:!0}
  )}
  ]);
  FusionCharts.register("module",["private","modules.data.xml",function(){
  var e=function(e){
    return{
      data:e,error:void 0}
    }
  ;
  this.addDataHandler("XML",{
    encode:e,decode:e,transportable:!0}
  )}
  ]);
  
FusionCharts.register("module",["private","modules.data.csv",function(){
  var e=this,k=e.window,u=e.core,q=k.parseInt,D=k.parseFloat,b=function(b){
    return b}
  ,N;
  N=function(b){
    this.data=[];
    this.columnCount=this.rowCount=0;
    this.configure(b)}
  ;
  N.decodeLiterals=function(b,c){
    return void 0!==b&&null!==b&&b.toString?b.replace("{
      tab}
    ","\t").replace("{
      quot}
    ",'"').replace("{
      apos}
    ","'"):c}
  ;
  N.prototype.set=function(b,c,e){
    var a;
    if(this.rowCount<=b){
      for(a=this.rowCount;
      a<=b;
      a+=1)this.data[a]=[];
      this.rowCount=b+1}
    this.columnCount<=
c&&(this.columnCount=c+1);
    this.data[b][c]=e}
  ;
  N.prototype.setRow=function(b,c){
    var e;
    if(this.rowCount<=b){
      for(e=this.rowCount;
      e<=b;
      e+=1)this.data[e]=[];
      this.rowCount=b+1}
    this.columnCount<c.length&&(this.columnCount=c.length);
    this.data[b]=c}
  ;
  N.prototype.get=function(b,c){
    var e=this.data;
    return e[b]&&e[b][c]}
  ;
  N.prototype.configure=function(b){
    var c=N.decodeLiterals;
    this.delimiter=c(b.delimiter,",");
    this.qualifier=c(b.qualifier,'"');
    this.eolCharacter=c(b.eolCharacter,"\r\n");
    this.numberFormatted=!!q(b.numberFormatted,
0)}
  ;
  N.prototype.clear=function(){
    this.data=[];
    this.columnCount=this.rowCount=0}
  ;
  N.prototype.toString=function(){
    var b,c,e="";
    for(b=0;
    b<this.rowCount;
    b+=1)c=this.qualifier+this.data[b].join(this.qualifier+this.delimiter+this.qualifier)+this.qualifier,e+='""'===c?this.eolCharacter:c+this.eolCharacter;
    0<this.rowCount&&(e=e.slice(0,e.length-2));
    return e}
  ;
  e.addDataHandler("CSV",{
    encode:function(b,c){
      e.raiseError(c,"0604111215","run","::CSVDataHandler.encode()","FusionCharts CSV data-handler only supports encoding of data.");
      
throw Error("FeatureNotSupportedException()");
      }
    ,decode:function(e,c){
      var p=u.transcodeData(e,"xml","json")||{
        }
      ,a=c.jsVars,t,k,F,g,d,h,l,L=p.chart||p.map||p.graph||{
        }
      ;
      l=Boolean(L.exporterrorcolumns||0);
      var q=p.categories&&p.categories[0]&&p.categories[0].category||[],n=p.map&&!p.chart||a&&a.instanceAPI&&"geo"===a.instanceAPI.defaultSeriesType,C=!1,w=!1,R=!1,v=!1;
      k=!1;
      var oa=b,ea={
        }
      ,$,W,pa,Ca,fa,la,Q,ya,G,S,ba;
      d=0;
      t=new N({
        separator:L.exportdataseparator,qualifier:L.exportdataqualifier,numberFormatted:L.exportdataformattedval}
      );
      
u.formatNumber&&t.numberFormatted&&(oa=function(a){
        return u.formatNumber(a,L)}
      );
      if(n)for(S in ea.geo=!0,q=a.hcObj&&a.hcObj.entities&&a.hcObj.entities.items||[],t.setRow(0,["Id"," Short Name","Long Name","Value","Formatted Value"]),a=0,q)w=q[S],ba=w.eJSON,k=w.value,t.setRow(++a,[S,ba.shortLabel,ba.label,void 0===k?"":k,w.formattedValue]);
      else if(void 0!==($=p.dials&&p.dials.dial||p.pointers&&p.pointers.pointer||p.value))if(ea.gauge=!0,"string"===typeof $)t.set(0,0,oa($)),ea.singlevalue=!0,"string"===
typeof p.target&&(t.set(0,1,oa(p.target)),ea.bullet=!0);
      else for(t.setRow(0,["Id","Value"]),ea.multivalue=!0,a=0,h=1,d=$.length;
      a<d;
      a+=1,h+=1)t.setRow(h,[h,oa($[a].value)]);
      else if($=p.dataset||!(p.data instanceof Array)&&[]){
        ea.multiseries=!0;
        F=1;
        if(W=p.lineset)$=$.concat(W),ea.lineset=!0;
        if(pa=p.axis)$=$.concat(pa),ea.multiaxis=!0;
        la=$.length;
        fa=q.length;
        if(!(la=$.length)){
          for(a=0;
          a<fa;
          a+=1)Q=q[a],t.set(a+1,0,Q.label||Q.name);
          ea.multilevel=!0}
        for(a=0;
        a<la;
        a+=1)for(ya=$,ya[a].dataset?(ya=ya[a].dataset,
g=0,Ca=ya.length):(ya=$,g=a,Ca=g+1);
        g<Ca&&!C&&!R;
        g+=1,F+=1){
          n=ya[g];
          t.set(0,F,n.seriesname);
          "string"===typeof n.data&&(ea.compactdata=!0,n.data=n.data.split(L.dataseparator||"|"));
          h=d=0;
          for(G=n.data&&n.data.length||0;
          d<G||d<fa;
          d+=1){
            Q=q[d];
            k=h+1;
            S=n.data&&n.data[h]||{
              }
            ;
            if(void 0!==S.x&&void 0!==S.y){
              C=ea.xy=!0;
              break}
            if(void 0!==S.open||void 0!==S.high||void 0!==S.close||void 0!==S.low){
              v=ea.ohlc=!0;
              break}
            if(void 0!==S.rowid&&void 0!==S.columnid){
              R=ea.heatmap=!0;
              break}
            if(d<fa&&!Q.vline){
              t.set(k,0,
Q.label||Q.name);
              Q=D(S?S.value:"");
              Q=isNaN(Q)?"":oa(Q);
              t.set(k,F,Q);
              if(w||l||S.errorvalue)w||t.set(0,F+1,"Error"),ba=1,t.set(k,F+1,oa(S.errorvalue));
              h+=1}
            }
          ba&&(F+=ba,ba=0)}
        W&&($=$.slice(0,-W.length));
        pa&&($=$.slice(0,-pa.length))}
      else if($=p.data){
        t.set(0,1,L.yaxisname||"Value");
        ea.singleseries=!0;
        k="1"==L.showsumatend;
        a=0;
        for(fa=$.length;
        a<fa;
        a+=1)S=$[a],S.vline||(Q=D(S.value?S.value:""),t.setRow(a+1,[S.label||S.name,isNaN(Q)?"":(d+=Q,oa(Q))]));
        k&&(ea.summation=!0,t.setRow(a+1,[L.sumlabel||"Total",
oa(d)]))}
      if(v)for(t.clear(),t.setRow(0,["Open","Close","High","Low"]),a=0,k=1,$=p.dataset,Ca=$.length;
      a<Ca;
      a+=1)for(d=0,n=$[a]&&$[a].data||[],la=n.length;
      d<la;
      d+=1,k+=1)S=n[d]||{
        }
      ,t.setRow(d+1,[oa(S.open),oa(S.close),oa(S.high),oa(S.low)]);
      else if(C)for(t.clear(),w=!1,ba=0,t.setRow(0,["Series","x","y"]),a=0,k=1,$=p.dataset,Ca=$.length;
      a<Ca;
      a+=1)for(d=0,n=$[a]&&$[a].data||[],la=n.length;
      d<la;
      d+=1,k+=1){
        S=n[d]||{
          }
        ;
        Q=[$[a].seriesname,oa(S.x),oa(S.y)];
        void 0!==S.z&&(Q.push(oa(S.z)),ba||(t.set(0,3,"z"),
ba=1));
        if(w||l||void 0!==S.errorvalue||void 0!==S.horizontalerrorvalue||void 0!==S.verticalerrorvalue)p=oa(S.errorvalue),Q.push(S.errorvalue,void 0===S.horizontalerrorvalue?p:oa(S.horizontalerrorvalue),void 0===S.verticalerrorvalue?p:oa(S.verticalerrorvalue)),w||(t.set(0,ba+3,"Error"),t.set(0,ba+4,"Horizontal Error"),t.set(0,ba+5,"Vertical Error")),w=ea.error=!0;
        t.setRow(k,Q)}
      else if(R){
        t.clear();
        C={
          }
        ;
        R={
          }
        ;
        a=0;
        d=1;
        q=p.rows&&p.rows.row||[];
        for(l=q.length;
        a<l;
        a+=1,d+=1)Q=q[a],Q.id&&(C[Q.id.toLowerCase()]=
d,t.set(d,0,Q.label||Q.id));
        a=0;
        d=1;
        q=p.columns&&p.columns.column||[];
        for(l=q.length;
        a<l;
        a+=1,d+=1)Q=q[a],Q.id&&(R[Q.id.toLowerCase()]=d,t.set(0,d,Q.label||Q.id));
        n=p.dataset&&p.dataset[0]&&p.dataset[0].data||[];
        a=0;
        for(l=n.length;
        a<l;
        a+=1)S=n[a],k=S.rowid.toLowerCase(),F=S.columnid.toLowerCase(),C[k]||(C[k]=t.rowCount,t.set(t.rowCount,0,S.rowid)),R[F]||(R[F]=t.columnCount,t.set(0,t.columnCount,S.columnid)),t.set(C[k],R[F],oa(S.value))}
      $=q=W=pa=null;
      0<t.rowCount&&void 0===t.get(0,0)&&t.set(0,0,L.xaxisname||
"Label");
      return{
        data:t.toString(),error:void 0,predictedFormat:ea}
      }
    ,transportable:!1}
  );
  u.addEventListener("Loaded",function(b){
    b=b.sender;
    "javascript"!==b.options.renderer||b.getDataAsCSV||(b.getDataAsCSV=b.ref.getDataAsCSV=b.getCSVData)}
  )}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js",function(){
  var e=this,k=e.window,u=k.document,q=e.core.options,D=/msie/i.test(k.navigator.userAgent)&&!k.opera,b=Boolean(k.SVGAngle||u.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")),N=function(){
    }
  ,J=e.hcLib={
    cmdQueue:[]}
  ,c=J.moduleCmdQueue={
    base:[],charts:[],powercharts:[],widgets:[],maps:[]}
  ,p=J.moduleDependencies={
    }
  ,a=J.moduleMeta={
    base:"fusioncharts.js",charts:"fusioncharts.charts.js",powercharts:"fusioncharts.powercharts.js",
widgets:"fusioncharts.widgets.js",maps:"fusioncharts.maps.js"}
  ,t={
    }
  ,U=J.getMetaSentence=function(){
    var a={
      }
    ;
    return function(b){
      b=b&&b.replace(/(^\s*)|(\s*$)/g,"")||"";
      return a[b]||(a[b]={
        key:b,subject:b.replace(/[^\/]*?$/ig,""),predicate:b.replace(/^.*\//ig,"")}
      )}
    }
  (),F=J.getDependentModuleName=function(a){
    var b=[],c,d;
    a=U(a).predicate;
    for(c in p)void 0!==(d=p[c][a])&&(b[d]=c);
    return b}
  ,g=J.hasModule=function(a){
    var b,c;
    if(a instanceof Array){
      b=0;
      for(c=a.length;
      b<c;
      b+=1)if(!Boolean(e.modules["modules.renderer.js-"+
U(a[b]).predicate]))return!1;
      return!0}
    return Boolean(e.modules["modules.renderer.js-"+U(a).predicate])}
  ,d=J.loadModule=function(b,c,d,h){
    b instanceof Array||(b=[b]);
    var l=b.length,p=0,k;
    k=function(){
      if(p>=l)c&&c();
      else{
        var L=b[p],F=L&&L.match(/[^\/]*$/i)[0],pa=a[L];
        p+=1;
        if(L){
          if(g(F)){
            k();
            return}
          if(t[F]){
            e.raiseError(h||e.core,"1112201445A","run","JavaScriptRenderer~loadModule() ","required resources are absent or blocked from loading.");
            d&&d(F);
            return}
          }
        else d&&d(F);
        L=e.core.options["html5"+e.capitalizeString(F)+
"Src"];
        e.loadScript(void 0===L?pa:L,{
          success:function(){
            g(F)?k():d&&d(F)}
          ,failure:d&&function(){
            d(F)}
          }
        ,void 0,!0)}
      }
    ;
    k()}
  ,h=J.executeWaitingCommands=function(a){
    for(var b;
    b=a.shift();
    )"object"===typeof b&&N[b.cmd].apply(b.obj,b.args)}
  ,l=function(a){
    delete a.sender.jsVars._reflowData;
    a.sender.jsVars._reflowData={
      }
    ;
    delete a.sender.jsVars._reflowClean}
  ,L=function(){
    var a=function(){
      }
    ;
    a.prototype={
      LoadDataErrorText:"Error in loading data.",XMLLoadingText:"Retrieving data. Please wait",InvalidXMLText:"Invalid data.",
ChartNoDataText:"No data to display.",ReadingDataText:"Reading data. Please wait",ChartNotSupported:"Chart type not supported.",PBarLoadingText:"",LoadingText:"Loading chart. Please wait",RenderChartErrorText:"Unable to render chart."}
    ;
    return a.prototype.constructor=a}
  (),P=J.getContainerBackgroundColor=function(a){
    var c=a.options.containerBackgroundColor,d=a.options.containerBackgroundOpacity,g=a.jsVars.transparent;
    void 0!==g&&null!==g?d=a.jsVars.transparent?0:1:(d=parseFloat(d),0>d?d=0:1<d&&(d=1));
    
c||(c="#ffffff");
    if(D&&!b)return d?c:"transparent";
    c=c.replace(/^#?([a-f0-9]+)/ig,"$1");
    c=J.graphics.HEXtoRGB(c);
    c[3]=d.toString();
    return"rgba("+c.join(",")+")"}
  ;
  J.injectModuleDependency=function(a,b,d){
    var g=!1,e=U(a).subject;
    a=U(a).predicate;
    b=void 0===b?a:U(b).predicate;
    p[a]||(p[a]={
      }
    ,c[a]||(c[a]=[],J.moduleMeta[a]=e+q.html5ScriptNamePrefix+(b&&b.replace&&b.replace(/^[\s\S]*\//ig,"").replace(/\?/g,"%3F").replace(/\#/g,"%23").replace(/\:/g,"%3A")||"")+q.html5ScriptNameSuffix),g=!0);
    p[a][b]=d||0;
    
return g}
  ;
  J.needsModule=function(a,b){
    a=U(a).predicate;
    b=U(b).predicate;
    return void 0!==(J.moduleDependencies[a]&&J.moduleDependencies[a][b])}
  ;
  J.cleanupWaitingCommands=function(a){
    for(var b=a.chartType(),b=F(b),d,g=[],e;
    d=b.shift();
    ){
      for(d=c[d]||[];
      e=d.shift();
      )"object"===typeof e&&e.obj!==a&&g.push(e);
      d.concat(g);
      g=[]}
    }
  ;
  e.extend(e.core.options,{
    html5ScriptNameSuffix:".js",html5ScriptNamePrefix:"fusioncharts."}
  );
  e.extend(N,{
    dataFormat:"json",ready:!1,policies:{
      jsVars:{
        }
      ,options:{
        showChartLoadingMessage:["showChartLoadingMessage",
!0]}
      }
    ,init:function(){
      g("base")?N.ready=!0:d("base",function(){
        N.ready=!0;
        h(J.cmdQueue)}
      ,void 0,e.core)}
    ,render:function(a){
      var b=a,c=this.jsVars.msgStore;
      b&&this.options.showChartLoadingMessage&&(b.innerHTML='<small style="display: inline-block;
       *zoom:1;
       *display:inline;
       width: 100%;
       font-family: Verdana,sans;
       font-size: 10px;
       color: #666666;
       text-align: center;
       padding-top: '+(parseInt(b.style.height,10)/2-5)+'px">'+(c.PBarLoadingText||c.LoadingText)+"</small>",b.style.backgroundColor=P(this));
      
J.cmdQueue.push({
        cmd:"render",obj:this,args:arguments}
      )}
    ,update:function(){
      J.cmdQueue.push({
        cmd:"update",obj:this,args:arguments}
      )}
    ,resize:function(){
      J.cmdQueue.push({
        cmd:"resize",obj:this,args:arguments}
      )}
    ,dispose:function(){
      var a=J.cmdQueue,b,c;
      b=0;
      for(c=a.length;
      b<c;
      b+=1)a[b].obj===this&&(a.splice(b,1),--c,--b)}
    ,load:function(){
      J.cmdQueue.push({
        cmd:"load",obj:this,args:arguments}
      )}
    ,config:function(a,b){
      var c,d=this.jsVars,g=d.msgStore,d=d.cfgStore,e=this.options,h;
      h={
        LoadingText:"loadMessage",
ChartNotSupported:"typeNotSupportedMessage",RenderChartErrorText:"renderErrorMessage",XMLLoadingText:"dataLoadStartMessage",ChartNoDataText:"dataEmptyMessage",LoadDataErrorText:"dataLoadErrorMessage",InvalidXMLText:"dataInvalidMessage"}
      ;
      "string"===typeof a&&1<arguments.length&&(c=a,a={
        }
      ,a[c]=b);
      for(c in a)void 0!==g[c]?g[c]=a[c]:d[c.toLowerCase()]=a[c],h[c]&&(e[h[c]]=a[c])}
    ,protectedMethods:{
      }
    ,events:{
      beforeInitialize:function(a){
        var b=a.sender;
        a=b.jsVars;
        var c;
        a.fcObj=b;
        a.msgStore=a.msgStore||new L;
        
a.cfgStore=a.cfgStore||{
          }
        ;
        a.previousDrawCount=-1;
        a.drawCount=0;
        a._reflowData={
          }
        ;
        b.addEventListener("beforeRender",function(a){
          a.sender.jsVars.smartLabel=new J.SmartLabelManager(b.id,u.body||u.getElementsByTagName("body")[0]);
          a.detachHandler()}
        );
        a.userModules instanceof Array||(c=a.userModules,a.userModules=[],"string"===typeof c&&(a.userModules=a.userModules.concat(c.split(","))));
        J.chartAPI&&J.chartAPI[void 0]||(a.needsLoaderCall=!0)}
      ,initialized:function(a){
        a=a.sender;
        var b=a.jsVars;
        b.needsLoaderCall&&
(delete b.needsLoaderCall,N.load.call(a))}
      ,beforeDataUpdate:l,beforeDispose:function(a){
        var b=a.sender.jsVars;
        b.smartLabel&&!b.smartLabel.disposed&&b.smartLabel.dispose();
        l.apply(this,arguments)}
      ,beforeRender:function(a){
        var b=a.sender.jsVars;
        delete b.drLoadAttempted;
        delete b.waitingModule;
        delete b.waitingModuleError;
        l.apply(this,arguments)}
      ,dataLoadRequested:function(a){
        a=a.sender;
        var b=a.jsVars;
        delete b.loadError;
        a.ref&&a.options.showDataLoadingMessage?b.hcObj&&!b.hasNativeMessage&&b.hcObj.showLoading?
b.hcObj.showMessage(b.msgStore.XMLLoadingText):a.ref.showChartMessage?a.ref.showChartMessage("XMLLoadingText"):b.stallLoad=!0:b.stallLoad=!0}
      ,dataLoadRequestCompleted:function(a){
        delete a.sender.jsVars.stallLoad}
      ,dataLoadError:function(a){
        var b=a.sender,c=b.jsVars;
        delete c.stallLoad;
        c.loadError=!0;
        b.ref&&"function"===typeof b.ref.showChartMessage&&b.ref.showChartMessage("LoadDataErrorText");
        b.__state.dataFetchDuringConstruction&&delete b.__state.dataFetchDuringConstruction;
        l.apply(this,arguments)}
      }
    ,
_call:function(a,b,c){
      a.apply(c||k,b||[])}
    }
  );
  e.extend(N.prototype,{
    getSWFHTML:function(){
      e.raiseWarning(this,"11090611381","run","JavaScriptRenderer~getSWFHTML()","getSWFHTML() is not supported for JavaScript charts.")}
    ,addVariable:function(){
      e.raiseWarning(this,"11090611381","run","JavaScriptRenderer~addVariable()",'Use of deprecated "addVariable()". Replace with "configure()".');
      e.core.prototype.configure.apply(this,arguments)}
    ,getXML:function(){
      e.raiseWarning(this,"11171116291","run","JavaScriptRenderer~getXML()",
'Use of deprecated "getXML()". Replace with "getXMLData()".');
      return this.getXMLData.apply(this,arguments)}
    ,setDataXML:function(){
      e.raiseWarning(this,"11171116292","run","JavaScriptRenderer~setDataXML()",'Use of deprecated "setDataXML()". Replace with "setXMLData()".');
      return this.setXMLData.apply(this,arguments)}
    ,setDataURL:function(){
      e.raiseWarning(this,"11171116293","run","JavaScriptRenderer~setDataURL()",'Use of deprecated "SetDataURL()". Replace with "setXMLUrl()".');
      return this.setXMLUrl.apply(this,
arguments)}
    ,hasRendered:function(){
      return!(!this.jsVars.hcObj||!this.jsVars.hcObj.hasRendered)}
    ,setTransparent:function(a){
      var b;
      if(b=this.jsVars)"boolean"!==typeof a&&null!==a&&(a=!0),b.transparent=null===a?!1:!0===a?!0:!1}
    }
  );
  e.extend(e.core,{
    _fallbackJSChartWhenNoFlash:function(){
      k.swfobject.hasFlashPlayerVersion(e.core.options.requiredFlashPlayerVersion)||e.renderer.setDefault("javascript")}
    ,_enableJSChartsForSelectedBrowsers:function(a){
      void 0!==a&&null!==a&&e.renderer.setDefault((new RegExp(a)).test(k.navigator.userAgent)?
"javascript":"flash")}
    ,_doNotLoadExternalScript:function(b){
      var c,d;
      for(c in b)d=c.toLowerCase(),a[d]&&(t[d]=Boolean(b[c]))}
    ,_preloadJSChartModule:function(){
      throw"NotImplemented()";
      }
    }
  );
  e.renderer.register("javascript",N);
  b||D?e.renderer.setDefault("javascript"):k.swfobject&&k.swfobject.hasFlashPlayerVersion&&!k.swfobject.hasFlashPlayerVersion(e.core.options.requiredFlashPlayerVersion)&&(e.raiseWarning(e.core,"1204111846","run","JSRenderer","Switched to JavaScript as default rendering due to absence of required Flash Player."),
e.renderer.setDefault("javascript"))}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-lib",function(){
  var e=this,k=e.window,u=k.document,q=k.navigator,D=Boolean(k.SVGAngle||u.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")),b=/msie/i.test(q.userAgent)&&!k.opera,N=k.parseFloat,J=/\s+/g,c=/^#?/,p=/^rgba/i,a=/[#\s]/ig,t=/\{
    br\}
  /ig,U=/(^#[0-9A-F]{
    6}
  $)|(^#[0-9A-F]{
    3}
  $)/i,F=Math.abs,g=Math.pow,d=Math.round,h=g(2,-24),l=Object.prototype.toString,L="ontouchstart"in u,q=L&&!(q.maxTouchPoints||
q.msMaxTouchPoints),P="http://www.fusioncharts.com?BS=FCHSEvalMark&utm_source=FCS_trial&pver="+k.escape(e.core.version),n=Math,C=n.max,w=n.min,R={
    pageX:0,pageY:0}
  ,v=e.hcLib||(e.hcLib={
    }
  ),oa=function(a){
    var b=a.data,c=b.chart,m=c.paper,r=a.state,d=G(ya(a.originalEvent)),g=d.target||d.originalTarget||d.srcElement||d.relatedTarget||d.fromElement,e=c.elements.resizeBox,h=b.layerX=d.pageX-b.chartPosLeft,n=b.layerY=d.pageY-b.chartPosTop,B=h-b.ox,l=n-b.oy,p=b.bBox,v=b.ox,ga=b.oy,Z=b.zoomX,k=b.zoomY,p=b.canvasY,
t=b.canvasX,L=b.canvasW,S=b.canvasH,pa=b.canvasX2,q=b.canvasY2,T=b.strokeWidth,B=b.attr;
    switch(r){
      case "start":a=$(this);
      b.chartPosLeft=a.left;
      b.chartPosTop=a.top;
      h=d.pageX-b.chartPosLeft;
      n=d.pageY-b.chartPosTop;
      b.oy=n;
      b.ox=h;
      b.allowMove=!1;
      e||(e=c.elements.resizeBox=m.rect(c.layers.tracker).attr(B));
      h>t&&h<pa&&n>p&&n<q&&(b.allowMove=!0);
      g&&g.ishot&&(b.allowMove=!1);
      e.attr({
        x:0,y:0,width:0,height:0}
      ).show();
      break;
      case "end":p=e.getBBox();
      c={
        chart:c,selectionLeft:p.x,selectionTop:p.y,selectionHeight:p.height,
selectionWidth:p.width,originalEvent:a.originalEvent}
      ;
      b.isDragged&&(b.selectionEnd&&b.selectionEnd(c),b.isDragged=0);
      e.hide();
      delete b.oy;
      delete b.ox;
      break;
      default:if(!b.allowMove)break;
      B=h-b.ox;
      l=n-b.oy;
      v=b.ox;
      ga=b.oy;
      b.isDragged||(c={
        chart:c,selectionLeft:(Z?w(v,v+B):t)+.5*T,selectionTop:(k?w(ga,ga+l):p)+.5*T,selectionHeight:0,selectionWidth:0,originalEvent:a.originalEvent}
      ,b.selectionStart&&b.selectionStart(c),b.isDragged=1);
      B=-(v-w(v-(v-C(v+B,t)),pa));
      l=-(ga-w(ga-(ga-C(ga+l,p)),q));
      e.attr({
        x:(Z?
w(v,v+B):t)+.5*T,y:(k?w(ga,ga+l):p)+.5*T,width:Z?F(B):L,height:k?F(l):S}
      )}
    }
  ,ea=function(a){
    var b=a.data;
    a=a.originalEvent;
    var c=a.target||a.originalTarget||a.srcElement||a.relatedTarget||a.fromElement,m=a.type,r=a.layerX,d=a.layerY;
    void 0===r&&(r=a.pageX-b.chartPosLeft,d=a.pageY-b.chartPosTop);
    "mousedown"===m&&(c.ishot=r>b.canvasX&&r<b.canvasX2&&d>b.canvasY&&d<b.canvasY2);
    "mouseup"===m&&setTimeout(function(){
      c.ishot=!1}
    ,1)}
  ,n=function(){
    var a="innerWidth",b="innerHeight",c=u.documentElement||u.body,
r=c;
    "innerWidth"in k?r=k:(a="clientWidth",b="clientHeight");
    return function(){
      return{
        width:r[a],height:r[b],scrollTop:c.scrollTop,scrollLeft:c.scrollLeft}
      }
    }
  (),$=function(a,b){
    var c={
      left:a.offsetLeft||0,top:a.offsetTop||0}
    ;
    for(a=a.offsetParent;
    a;
    )c.left+=a.offsetLeft||0,c.top+=a.offsetTop||0,a===u.body||a===u.documentElement||b||(c.left-=a.scrollLeft,c.top-=a.scrollTop),a=a.offsetParent;
    return c}
  ,W=function(a){
    return a&&a.replace(/\$/g,"$$$$")}
  ,pa=function(a,b){
    return a||!1===a||0===a?a:b}
  ,Ca=function(){
    var a,
b,c;
    b=0;
    for(c=arguments.length;
    b<c;
    b+=1)if((a=arguments[b])||!1===a||0===a)return a;
    return""}
  ,fa=function(){
    var a,b,c;
    b=0;
    for(c=arguments.length;
    b<c;
    b+=1)if((a=arguments[b])||!1===a||0===a)return a}
  ,la=function(a,b,c,r){
    return v.dem.listen(a,b,c,r)}
  ,Q=function(a,b,c){
    return v.dem.unlisten(a,b,c)}
  ,ya=function(a){
    a=a.sourceEvent||a.originalEvent||a;
    return L&&a&&a.touches&&a.touches[0]||a||R}
  ,G=function(){
    var a;
    return function(b){
      void 0===b.pageX&&(b.pageX=b.clientX+(a||(a=k.document.body||k.document.documentElement)).scrollLeft,
b.pageY=b.clientY+a.scrollTop);
      return b}
    }
  (),S=function(a,b){
    b=G(ya(b));
    var c=b.pageX,r=b.pageY,m=$(a);
    return{
      chartX:c-m.left,chartY:r-m.top,pageX:c,pageY:r}
    }
  ,ba=function(a){
    return a&&a.replace(/^#?([a-f0-9]+)/ig,"#$1")||"none"}
  ,r=function(){
    var a,b,c;
    b=0;
    for(c=arguments.length;
    b<c;
    b+=1)if(((a=arguments[b])||!1===a||0===a)&&!isNaN(a=Number(a)))return a}
  ,B=function(a,b){
    a=a||!1===a||0===a?Number(a):NaN;
    return isNaN(a)?null:b?F(a):a}
  ,ga=function(a){
    return"string"===typeof a?a.replace(t,"<br />"):""}
  ,
Z=function(a,b){
    for(var c=b.length,r=-1;
    c--;
    )if(a===b[c]){
      r=c;
      break}
    return r}
  ,Da=function(){
    if(Array.isArray)return Array.isArray;
    var a=Object.prototype.toString,b=a.call([]);
    return function(c){
      return a.call(c)===b}
    }
  (),T=function(a,b,c,r,m){
    var d,g,e,h;
    m?(r.push(a),m.push(b)):(r=[a],m=[b]);
    if(b instanceof Array)for(d=0;
    d<b.length;
    d+=1){
      try{
        g=a[d],e=b[d]}
      catch(n){
        continue}
      if("object"!==typeof e)c&&void 0===e||(a[d]=e);
      else{
        if(null===g||"object"!==typeof g)g=a[d]=e instanceof Array?[]:{
          }
        ;
        h=Z(e,m);
        -1!==
h?g=a[d]=r[h]:T(g,e,c,r,m)}
      }
    else for(d in b){
      try{
        g=a[d],e=b[d]}
      catch(B){
        continue}
      if(null!==e&&"object"===typeof e)if(h=l.call(e),"[object Object]"===h){
        if(null===g||"object"!==typeof g)g=a[d]={
          }
        ;
        h=Z(e,m);
        -1!==h?g=a[d]=r[h]:T(g,e,c,r,m)}
      else"[object Array]"===h?(null!==g&&g instanceof Array||(g=a[d]=[]),h=Z(e,m),-1!==h?g=a[d]=r[h]:T(g,e,c,r,m)):a[d]=e;
      else a[d]=e}
    return a}
  ,xa=function(a,b,c){
    if("object"!==typeof a&&"object"!==typeof b)return null;
    if("object"!==typeof b||null===b)return a;
    "object"!==
typeof a&&(a=b instanceof Array?[]:{
      }
    );
    T(a,b,c);
    return a}
  ,va=function(a,b){
    var c;
    if(b instanceof Array)for(c=b.length-1;
    0<=c;
    --c)"object"!==typeof b[c]?!0===b[c]&&a&&a.splice&&a.splice(c,1):l.call(b[c])===l.call(a[c])&&va(a[c],b[c]);
    else for(c in b)"object"!==typeof b[c]?!0===b[c]&&a&&a.splice&&a.splice(c,1):l.call(b[c])===l.call(a[c])&&va(a[c],b[c]);
    return a}
  ,qa=function(){
    var a=/^@window_/g;
    return function(b,c){
      var r=b.replace(/\[[\'\"]/g,".").replace(/[\'\"]\]/g,"").replace(/\[/g,".@window_").replace(/\]/g,
"").split("."),d=k,m,g;
      g="";
      var e,h,n;
      h=r.length;
      for(n=0;
      n<h;
      n+=1){
        e=r[n];
        m=d;
        if(e.match(a))g=k[e.replace(a,"")],d=d[g];
        else{
          if(void 0===d||null===d)throw(g||e).replace(a,"")+" is not defined";
          d=d[e]}
        g=e}
      !d||"function"!==typeof d.call&&d!==k.alert?setTimeout(function(){
        throw e.replace(a,"")+"() is not a function";
        }
      ,0):d===k.alert?d(c):d.call(m,c)}
    }
  (),Na=function(){
    var a="FusionChartslinkEval"+parseInt(+new Date,10);
    return function(b){
      try{
        k[a]=new Function(b),eval('window["'+a+'"]();
        ')}
      catch(c){
        setTimeout(function(){
          throw c;
          
}
        ,0)}
      D?delete k[a]:k[a]=null}
    }
  (),ha=function(a,b){
    a=Number(a);
    a=isNaN(a)?100:a;
    void 0!==b&&(a=a*b/100);
    return a%101}
  ,Sa=function(a,b,c){
    a=a.split(",");
    var d;
    void 0!==c&&(c=r(c.split(",")[0]));
    a[0]=ha(a[0],c);
    for(d=1;
    d<b;
    d+=1)a[d]=a[0]*ha(a[d],c)/100;
    return a.join(",")}
  ,ka=function(b,c,d){
    var r=0,m=0,g=0;
    d&&d.match(p)&&(d=d.split(","),r=d[0].slice(d[0].indexOf("(")+1),m=d[1],g=d[2],c||0===c||(c=parseInt(100*d[3].slice(0,d[3].indexOf(")")),10)));
    if(b)if(b.match(p))d=b.split(","),r=d[0].slice(d[0].indexOf("(")+
1),m=d[1],g=d[2];
    else{
      b=b.replace(a,"").split(",")[0];
      switch(b.length){
        case 3:b=b.charAt(0)+b.charAt(0)+b.charAt(1)+b.charAt(1)+b.charAt(2)+b.charAt(2);
        break;
        case 6:break;
        default:b=(b+"FFFFFF").slice(0,6)}
      r=parseInt(b.slice(0,2),16);
      m=parseInt(b.slice(2,4),16);
      g=parseInt(b.slice(4,6),16)}
    c||0===c||(c=100);
    "string"===typeof c&&(c=c.split(",")[0]);
    c=parseInt(c,10)/100;
    return"rgba("+r+","+m+","+g+","+c+")"}
  ,sa=function(){
    var a={
      }
    ;
    return function(b){
      var c=(b=b||this)&&b.FCcolor||b,d=c.color,r=c.ratio,
m=c.angle,g=c.alpha,e=c.r,h=c.cx,n=c.cy,B=c.fx,l=c.fy,p=c.gradientUnits,w=c.x1,v=c.y1,G=c.x2,ga=c.y2,Z=1,k,t,C,L;
      if("string"===typeof b)return a[L="~"+b]||(a[L]=b.replace(/^#?([a-f0-9]{
        3,6}
      )/ig,"#$1"));
      d=d||"";
      if(!d)return k;
      L=[d,g,r,m,e,h,n,p,B,l,w,G,v,ga].join("_").replace(/[\(\)\s,\xb0#]/g,"_");
      if(a[L])return a[L];
      r=r&&(r+"").split(",")||[];
      g=(g||0===g)&&(g+"").split(",")||[];
      if(d=d.split(","))if(k="",1===d.length)C=d[0].replace(/^#?([a-f0-9]{
        3,6}
      )/ig,"$1"),k=g.length?"rgba("+ab(C).join(",")+","+
.01*N(g[0])+")":C.replace(/^#?([a-f0-9]{
        3,6}
      )/ig,"#$1");
      else{
        b=0;
        for(t=d.length;
        b<t;
        b++)C=d[b].replace(/^#?([a-f0-9]{
          3,6}
        )/ig,"$1"),isNaN(r[b])||(r[b]=N(r[b]),C+=":"+r[b],isNaN(r[b+1])||(r[b+1]=N(r[b+1])+r[b])),isNaN(g[b])||""===g[b]||(Z=.01*g[b]),d[b]="rgba("+ab(C).join(",")+","+Z+")",isNaN(r[b])||(d[b]=d[b]+":"+r[b]);
        k+=d.join("-");
        if(void 0!==e||void 0!==B||void 0!==h||c.radialGradient)k="xr("+[B,l,e,h,n,p].join()+")"+k;
        else{
          k="-"+k;
          if(void 0!==w||void 0!==v||void 0!==G||void 0!==ga)k="("+[w,v,
G,ga,p].join()+")"+k;
          void 0===m&&(m=0);
          k=360-N(m)%360+k}
        }
      return a[L]=k}
    }
  (),Ra=function(){
    return function(){
      return""}
    }
  (),hb=function(b){
    return b.replace(a,"").replace(c,"#")}
  ,La=function(b,c){
    c=(0>c||100<c?100:c)/100;
    b=b.replace(a,"");
    var d=parseInt(b,16),r=Math.floor(d/65536),m=Math.floor((d-65536*r)/256);
    return("000000"+(r*c<<16|m*c<<8|(d-65536*r-256*m)*c).toString(16)).slice(-6)}
  ,za=function(b,c){
    c=(0>c||100<c?100:c)/100;
    b=b.replace(a,"");
    var d=parseInt(b,16),r=Math.floor(d/65536),m=Math.floor((d-
65536*r)/256);
    return("000000"+(256-(256-r)*c<<16|256-(256-m)*c<<8|256-(256-(d-65536*r-256*m))*c).toString(16)).slice(-6)}
  ,ab=function(a){
    a=parseInt(a,16);
    var b=Math.floor(a/65536),c=Math.floor((a-65536*b)/256);
    return[b,c,Math.floor(a-65536*b-256*c)]}
  ,Ea=function(a,b){
    if("object"!==typeof a)return"";
    if(a.fontSize||a["font-size"])!a.fontSize&&a["font-size"]&&(a.fontSize=a["font-size"],delete a["font-size"]),a.lineHeight=(parseFloat(a.fontSize)||b||10)*v.lineHeightFactor+"px",delete a["line-height"];
    
!a.lineHeight&&a["line-height"]&&(a.lineHeight=a["line-height"],delete a["line-height"]);
    return a.lineHeight}
  ,db=function(a,b,c,d,m){
    var g=Ca(a.labelbordercolor,b.bordercolor,c.labelbordercolor,""),e=fa(a.labelbgcolor,b.bgcolor,c.labelbgcolor),h=r(a.labelborderthickness,b.borderthickness,c.labelborderthickness,1);
    m=r(c.usedataplotcolorforlabels,0)?m||d.color:d.color;
    g=g?ka(g,r(a.labelborderalpha,b.borderalpha,c.labelborderalpha,a.labelalpha,b.alpha,c.labelalpha,100)):"";
    a={
      fontFamily:fa(a.labelfont,
b.font,c.labelfont,d.fontFamily),fontSize:fa(a.labelfontsize,b.fontsize,c.labelfontsize,parseInt(d.fontSize,10))+"px",color:ka(fa(a.labelfontcolor,b.fontcolor,c.labelfontcolor,m),r(a.labelfontalpha,b.fontalpha,c.labelfontalpha,a.labelalpha,b.alpha,c.labelalpha,100)),fontWeight:r(a.labelfontbold,b.fontbold,c.labelfontbold)?"bold":"normal",fontStyle:r(a.labelfontitalic,b.fontitalic,c.labelfontitalic)?"italic":"normal",border:g||e?h+"px solid":"",borderColor:g,borderThickness:h,borderPadding:r(a.labelborderpadding,
b.borderpadding,c.labelborderpadding,2),borderRadius:r(a.labelborderradius,b.borderradius,c.labelborderradius,0),backgroundColor:e?ka(e,r(a.labelbgalpha,b.bgalpha,c.labelbgalpha,a.labelalpha,b.alpha,c.labelalpha,100)):"",borderDash:r(a.labelborderdashed,b.borderdashed,c.labelborderdashed,0)?kb(r(a.labelborderdashlen,b.borderdashlen,c.labelborderdashlen,4),r(a.labelborderdashgap,b.borderdashgap,c.labelborderdashgap,2),h):void 0}
    ;
    a.lineHeight=Ea(a);
    return a}
  ,$a=function(){
    var a={
      top:{
        align:"center",
verticalAlign:"top",textAlign:"center"}
      ,right:{
        align:"right",verticalAlign:"middle",textAlign:"left"}
      ,bottom:{
        align:"center",verticalAlign:"bottom",textAlign:"center"}
      ,left:{
        align:"left",verticalAlign:"middle",textAlign:"right"}
      }
    ,b=/([^\,^\s]+)\)$/g,c=function(a,b){
      var c;
      /^(bar|bar3d)$/.test(a)&&(this.isBar=!0,this.yPos="bottom",this.yOppPos="top",this.xPos="left",this.xOppPos="right");
      c=parseInt(b.labelstep,10);
      this.labelStep=1<c?c:1;
      this.showLabel=r(b.showlabels,b.shownames,1);
      this.is3D=/3d$/.test(a)}
    ;
    
c.prototype={
      isBar:!1,yPos:"left",yOppPos:"right",xPos:"bottom",xOppPos:"top",addAxisGridLine:function(c,d,r,m,g,e,K,h){
        var n=""===r?!1:!0,B=0<m||0<e.match(b)[1]?!0:!1,l;
        if(n||B)B||(e="rgba(0,0,0,0)",m=.1),l={
          isGrid:!0,width:m,dashStyle:g,color:e,value:d,zIndex:void 0===K?2:K}
        ,n&&(d=c.opposite?h?this.xOppPos:this.yOppPos:h?this.xPos:this.yPos,d=a[d],l.label={
          text:r,style:c.labels.style,textAlign:d.textAlign,align:d.align,verticalAlign:d.verticalAlign,rotation:0,x:0,y:0}
        ),c.plotLines.push(l);
        return l}
      ,
addAxisAltGrid:function(a,b){
        if(!this.is3D){
          var c=r(a._lastValue,a.min),d=fa(a._altGrid,!1);
          d&&a.plotBands.push({
            isGrid:!0,color:a.alternateGridColor,to:b,from:c,zIndex:1}
          );
          a._lastValue=b;
          a._altGrid=!d}
        }
      ,addXaxisCat:function(b,c,d,E,r,m,g,e){
        var K=a[b.opposite?this.xOppPos:this.xPos];
        c={
          isGrid:!0,isDataLabel:!0,width:.1,color:"rgba(0,0,0,0)",value:c,label:{
            text:E,link:fa(r.labellink,m.link,g.labellink),style:db(r,m,g,b.labels.style,e),textAlign:K.textAlign,align:K.align,verticalAlign:K.verticalAlign,
rotation:0,x:0,y:0}
          }
        ;
        0!==d%this.labelStep&&(c.stepped=!0,c.label.style=b.steppedLabels.style);
        b.plotLines.push(c)}
      ,addVline:function(a,b,c,d){
        d=d._FCconf;
        var E=d.isBar,m=d.divlineStyle,M=ga(b.label),g=Boolean(r(b.showlabelborder,d.showVLineLabelBorder,1)),e=Boolean(r(b.showlabelbackground,1)),K=fa(b.labelhalign,E?"left":"center"),h=fa(b.labelvalign,E?"middle":"bottom").toLowerCase(),n=r(b.labelposition,0),B=r(b.lineposition,.5),l=r(b.showvlines,d.showVLines,1),p=r(b.alpha,d.vLineAlpha,80),w=fa(b.color,
d.vLineColor).replace(/^#?/,"#"),v=e?fa(b.labelbgcolor,d.vLineLabelBgColor,"333333").replace(/^#?/,"#"):"",G=fa(b.labelcolor,d.vLineLabelColor,b.color,d.vLineColor).replace(/^#?/,"#"),k=r(b.thickness,d.vLineThickness,1),Z=.5*k,t=Boolean(Number(fa(b.dashed,0))),C=r(b.dashlen,5),L=r(b.dashgap,2),S=d.smartLabel,pa=parseInt(m.fontSize,10)+2,F=0,q=r(b.rotatelabel,d.rotateVLineLabels)?270:0,B=0>B||1<B?.5:B,n=0>n||1<n?0:n;
        S.setStyle(m);
        S=S.getOriSize(M);
        w=ka(w,l?p:"0");
        if(E){
          switch(h){
            case "top":pa-=S.height+
Z+2;
            break;
            case "middle":pa-=.5*S.height+1;
            break;
            default:pa+=Z}
          b.labelhalign||(F-=S.width*n)}
        else{
          switch(h){
            case "top":pa=.5*-S.height+1;
            break;
            case "middle":pa=0;
            break;
            default:pa=.5*S.height}
          switch(K){
            case "left":F+=k;
            break;
            case "right":F-=k+1}
          }
        a.plotLines.push({
          isVline:!0,color:w,width:k,value:c-1+B,zIndex:r(b.showontop,d.showVLinesOnTop)?5:3,dashStyle:t?kb(C,L,k):void 0,label:{
            text:M,align:E?"left":"center",offsetScale:n,rotation:q,y:pa,x:F,textAlign:K,backgroundColor:v,borderWidth:l&&g?1:0,borderType:l&&
g?"solid":"",borderColor:l&&g?G:"",backgroundOpacity:l&&e?fa(b.labelbgalpha,d.vLineLabelBgAlpha)/100:0,style:{
              color:l?G:w,fontSize:m.fontSize,fontFamily:m.fontFamily,lineHeight:m.lineHeight,backgroundColor:v}
            }
          }
        )}
      }
    ;
    return c.prototype.constructor=c}
  (),Ga=function(){
    var a=function(a,c,d,r,m){
      a=Math.abs(c-a);
      c=a/(d+1);
      b(a,d,r)||(m&&Number(c)/Number(r)<(1<r?2:.5)&&(r/=10),c=(Math.floor(c/r)+1)*r,a=c*(d+1));
      return a}
    ,b=function(a,b,d){
      return c(a/(b+1))>c(d)?!1:!0}
    ,c=function(a){
      a=Math.abs(a);
      a=String(a);
      
var b=0,c=a.indexOf(".");
      -1!=c&&(b=a.length-c-1);
      return b}
    ;
    return function(c,d,r,m,g,e,K,n){
      var B,l,w,p,v,G,k,ga=0;
      c=!0===isNaN(c)||void 0===c?.1:c;
      d=!0===isNaN(d)||void 0===d?0:d;
      c===d&&0===c&&(c=.1);
      g=void 0===typeof g?!0:g;
      e=void 0===typeof e?!0:e;
      B=Math.floor(Math.log(Math.abs(c))/Math.LN10);
      l=Math.floor(Math.log(Math.abs(d))/Math.LN10);
      l=Math.max(l,B);
      B=Math.pow(10,l);
      2>Math.abs(c)/B&&2>Math.abs(d)/B&&(l--,B=Math.pow(10,l));
      l=Math.floor(Math.log(c-d)/Math.LN10);
      w=Math.pow(10,l);
      0<c-d&&10<=B/
w&&(B=w);
      l=(Math.floor(c/B)+1)*B;
      0>d?w=-1*(Math.floor(Math.abs(d/B))+1)*B:e?w=0:(w=Math.floor(Math.abs(d/B)-1)*B,w=0>w?0:w);
      g&&0>=c&&(l=0);
      g=r||0===r?!0:!1;
      e=m||0===m?!0:!1;
      c=!1===g||!0===g&&Number(r)<c&&c-Number(r)>h?l:Number(r);
      d=!1===e||!0===e&&Number(m)>d&&Number(m)-d>h?w:Number(m);
      m=Math.abs(c-d);
      if(!1===e&&!1===g&&n)if(0<c&&0>d)for(r=!1,g=10<B?B/10:B,n=a(d,c,K,g,!1),e=n-(K+1)*g;
      !1===r;
      ){
        if(e+=(K+1)*g,b(e,K,g))if(n=e-m,l=e/(K+1),p=Math.min(Math.abs(d),c),w=p==Math.abs(d)?-1:1,0===K)r=!0;
        else for(G=
1;
        G<=Math.floor((K+1)/2);
        G++)v=l*G,!(v-p>n)&&v>p&&(k=e-v,k/l==Math.floor(k/l)&&v/l==Math.floor(v/l)&&(m=e,c=-1==w?k:v,d=-1==w?-v:-k,r=!0))}
      else r=a(d,c,K,B,!0),n=r-m,m=r,0<c?c+=n:d-=n;
      else n&&(r=function(a,c,d){
        for(var r=0,m=1,M;
        ;
        ){
          M=a+r*m;
          M=0===M?1:M;
          if(b(c,M,d))break;
          r=-1==m||r>a?++r:r;
          if(25<r){
            M=0;
            break}
          m=r<=a?-1*m:1}
        return M}
      ,0<K&&(n=r(K,m,B),0===n&&(n=r(K,m+1,B),ga=1),K=n));
      return{
        Max:c,Min:d,Range:m,interval:B,divGap:(c-d+ga)/(K+1)}
      }
    }
  (),Xb=function(){
    var a=function(a,b,c){
      var d=c.jsVars&&c.jsVars.smartLabel,
r=a.offsetWidth,m=a.offsetHeight,M=this.chart;
      a=this.title;
      var g=c._chartMessageImageStyle,e=!1,h;
      void 0!==b&&(b=b.replace(/^\s+/,"").replace(/\s+$/,""),/^i\s*[\-]\s*/i.test(b)?(e=!0,h=b.replace(/^i\s*[\-]\s*/i,"")):h=b.replace(/^\\/,""));
      a.y=m/2;
      a.x=r/2;
      M.bgSWF=a.text=void 0;
      b=h;
      e?(M.bgSWF=b,M.bgImageHAlign=g.imageHAlign,M.bgImageVAlign=g.imageVAlign,M.bgImageScale=g.imageScale,M.bgSWFAlpha=g.imageAlpha):void 0!==b&&(d?(Ea(a.style),d.setStyle(a.style),d=d.getSmartText(ga(b),r,m),a.text=d.text):a.text=
ga(b),a.verticalAlign="middle");
      a.style=c._chartMessageStyle;
      delete c._chartMessageImageStyle;
      delete c._chartMessageStyle}
    ;
    a.prototype={
      chart:{
        events:{
          }
        ,margin:[0,0,0,0],backgroundColor:{
          FCcolor:{
            alpha:0}
          }
        }
      ,credits:{
        href:P,text:"FusionCharts XT Trial",enabled:!1}
      ,legend:{
        enabled:!1}
      ,title:{
        text:"",style:{
          fontFamily:"Verdana,sans",fontSize:"10px",color:"#666666"}
        }
      ,plotOptions:{
        series:{
          }
        }
      ,series:[{
        }
      ],exporting:{
        enabled:!1}
      ,nativeMessage:!0}
    ;
    return a.prototype.constructor=a}
  (),Kb={
    "true":{
      "true":{
        "true":"center",
"false":"center"}
      ,"false":{
        "true":"center","false":"center"}
      }
    ,"false":{
      "true":{
        "true":"right","false":"left"}
      ,"false":{
        "true":"left","false":"right"}
      }
    }
  ,Ub=function(){
    return function(a,b,d,g,e,h,n){
      var B,l=d.trendStyle,w,p,v,G,k,Z,t,C,L,S,F,q,T,ba=h?"xAxis":"dataLabels";
      if(h?d.showVLines:d.showTrendlines)for(B=0,p=a.length;
      B<p;
      B+=1)if((T=a[B])&&T.line)for(w=0,v=T.line.length;
      w<v;
      w+=1)G=T.line[w],S=d.numberFormatter.getCleanValue(fa(G.startvalue,G.value,0)),F=d.numberFormatter.getCleanValue(fa(G.endvalue,
fa(G.startvalue,G.value,0))),h?C=b:g&&G.parentyaxis&&/^s$/i.test(G.parentyaxis)?(C=b[1],q=1):C=b[0],Z=C.max,t=C.min,k=!1,Z>=S&&Z>=F&&t<=S&&t<=F&&(g&&G.parentyaxis&&/^s$/i.test(G.parentyaxis)?k="1"!==fa(G.valueonleft,d.trendlineValuesOnOpp):g||(k="1"===fa(G.valueonright,d.trendlineValuesOnOpp)),Z=Boolean(r(G.istrendzone,h?1:0)),(t=(h?d.showVLineLabels:d.showTrendlineLabels)?ga(fa(G.displayvalue,d.numberFormatter[ba](k?F:S,q))):"")?(L=S<F,k={
        text:t,textAlign:e?"center":k?"left":"right",align:e?Kb[Z][!n][L]:
k?"right":"left",verticalAlign:e?"bottom":"middle",rotation:0,x:0,y:0,style:l}
      ,t=fa(G.color,d.trendlineColor),G.alwaysVisible=Z,t&&(k.style=xa({
        }
      ,l),k.style.color=t.replace(c,"#"))):k=void 0,t=pa(ga(fa(G.tooltext,T.tooltext,d.trendLineToolText))),t=m(t,[7,15,16,17,18,19],{
        startValue:S,startDataValue:d.numberFormatter[ba](S,q),endValue:F,endDataValue:d.numberFormatter[ba](F,q),axisName:C.title&&C.title.text}
      ,G),L=r(G.thickness,d.trendlineThickness,1),Z?C.plotBands.push({
        isTrend:!0,color:ka(fa(G.color,
d.trendlineColor),fa(G.alpha,d.trendlineAlpha,40)),from:S,to:F,label:k,zIndex:d.is3d||"1"!==fa(G.showontop,d.showTrendlinesOnTop)?3:5,tooltext:t,alwaysVisible:G.alwaysVisible}
      ):C.plotLines.push({
        isTrend:!0,color:ka(fa(G.color,d.trendlineColor,d.trendlineColor),fa(G.alpha,d.trendlineAlpha,99)),value:S,to:F,width:L,dashStyle:"1"==fa(G.dashed,d.trendlinesAreDashed)?kb(r(G.dashlen,d.trendlinesDashLen),r(G.dashgap,d.trendlinesDashGap),L):void 0,label:k,zIndex:d.is3d||"1"!==fa(G.showontop,d.showTrendlinesOnTop)?
3:5,tooltext:t}
      ))}
    }
  (),kb=function(a,b,c,d){
    return d||void 0===d?[a,b]:""}
  ,nb=function(){
    }
  ,gb=function(a,b,c){
    var d,r=gb[a];
    r||(r=function(){
      }
    ,r.prototype=c instanceof nb?c:new nb,r.prototype.constructor=r,r=gb[a]=new r);
    c&&(r.base=c);
    r.name=a;
    for(d in b)switch(typeof b[d]){
      case "object":if(b[d]instanceof nb){
        r[d]=b[d][d];
        break}
      default:r[d]=b[d];
      break;
      case "undefined":delete r[d]}
    return this instanceof gb?(a=function(){
      }
    ,a.prototype=r,a.prototype.constructor=a,new a):r}
  ,m=function(){
    var a=[{
      regex:/((^|[^\\])((\\)\\)*\$cleanvalue)/ig,
escapeRegex:/((^|[^\\])((\\)\\)*\\(\$cleanvalue))/ig,argIndex:2,argKey:"cleanvalue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$datavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$datavalue))/ig,argIndex:2,argKey:"formattedValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$value)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$value))/ig,argIndex:3,argKey:"value"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$label)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$label))/ig,argIndex:2,argKey:"label"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$seriesname)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$seriesname))/ig,
argIndex:5,argKey:"seriesname"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$yaxisname)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$yaxisname))/ig,argIndex:2,argKey:"yaxisName"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$xaxisname)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$xaxisname))/ig,argIndex:2,argKey:"xaxisName"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$displayvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$displayvalue))/ig,argIndex:3,argKey:"displayvalue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$xdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$xdatavalue))/ig,
argIndex:2,argKey:"xDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$ydatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$ydatavalue))/ig,argIndex:2,argKey:"yDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$xvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$xvalue))/ig,argIndex:3,argKey:"x"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$yvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$yvalue))/ig,argIndex:3,argKey:"y"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$zvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$zvalue))/ig,argIndex:3,argKey:"z"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$name)/ig,
escapeRegex:/((^|[^\\])((\\)\\)*\\(\$name))/ig,argIndex:3,argKey:"name"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$percentValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$percentValue))/ig,argIndex:2,argKey:"percentValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$startValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$startValue))/ig,argIndex:2,argKey:"startValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$startDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$startDataValue))/ig,argIndex:2,argKey:"startDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$endValue)/ig,
escapeRegex:/((^|[^\\])((\\)\\)*\\(\$endValue))/ig,argIndex:2,argKey:"endValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$endDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$endDataValue))/ig,argIndex:2,argKey:"endDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$axisName)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$axisName))/ig,argIndex:2,argKey:"axisName"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$cumulativevalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$cumulativevalue))/ig,argIndex:2,argKey:"cumulativeValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$cumulativedatavalue)/ig,
escapeRegex:/((^|[^\\])((\\)\\)*\\(\$cumulativedatavalue))/ig,argIndex:2,argKey:"cumulativeDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$cumulativePercentValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$cumulativePercentValue))/ig,argIndex:2,argKey:"cumulativePercentValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$cumulativepercentdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$cumulativepercentdatavalue))/ig,argIndex:2,argKey:"cumulativePercentDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$sum)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$sum))/ig,
argIndex:2,argKey:"sum"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedsum)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$unformattedsum))/ig,argIndex:2,argKey:"unformattedSum"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$targetvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$targetvalue))/ig,argIndex:2,argKey:"targetValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$targetdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$targetdatavalue))/ig,argIndex:2,argKey:"targetDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$processname)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$processname))/ig,
argIndex:2,argKey:"processName"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$start)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$start))/ig,argIndex:2,argKey:"start"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$end)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$end))/ig,argIndex:2,argKey:"end"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$percentcomplete)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$percentcomplete))/ig,argIndex:2,argKey:"percentComplete"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$taskpercentcomplete)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$taskpercentcomplete))/ig,
argIndex:2,argKey:"taskPercentComplete"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$taskstartdate)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$taskstartdate))/ig,argIndex:2,argKey:"taskStartDate"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$taskenddate)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$taskenddate))/ig,argIndex:2,argKey:"taskEndDate"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$tasklabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$tasklabel))/ig,argIndex:2,argKey:"taskLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$date)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$date))/ig,
argIndex:2,argKey:"date"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$percentofprevvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$percentofprevvalue))/ig,argIndex:2,argKey:"percentOfPrevValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$sname)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$sname))/ig,argIndex:2,argKey:"sName"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$lname)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$lname))/ig,argIndex:2,argKey:"lName"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromid)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromid))/ig,argIndex:2,
argKey:"fromId"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromlabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromlabel))/ig,argIndex:2,argKey:"fromLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toid)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toid))/ig,argIndex:2,argKey:"toId"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$tolabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$tolabel))/ig,argIndex:2,argKey:"toLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromxvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromxvalue))/ig,argIndex:2,argKey:"fromXValue"}
    ,
{
      regex:/((^|[^\\])((\\)\\)*\$fromyvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromyvalue))/ig,argIndex:2,argKey:"fromYValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromxdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromxdatavalue))/ig,argIndex:2,argKey:"fromXDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromydatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromydatavalue))/ig,argIndex:2,argKey:"fromYDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromlabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromlabel))/ig,
argIndex:2,argKey:"fromLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toxvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toxvalue))/ig,argIndex:2,argKey:"toXValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toyvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toyvalue))/ig,argIndex:2,argKey:"toYValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toxdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toxdatavalue))/ig,argIndex:2,argKey:"toXDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toydatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toydatavalue))/ig,
argIndex:2,argKey:"toYDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$tolabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$tolabel))/ig,argIndex:2,argKey:"toLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$openvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$openvalue))/ig,argIndex:2,argKey:"openValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$closevalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$closevalue))/ig,argIndex:2,argKey:"closeValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$highvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$highvalue))/ig,
argIndex:2,argKey:"highValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$lowvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$lowvalue))/ig,argIndex:2,argKey:"lowValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$opendatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$opendatavalue))/ig,argIndex:2,argKey:"openDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$closedatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$closedatavalue))/ig,argIndex:2,argKey:"closeDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$highdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$highdatavalue))/ig,
argIndex:2,argKey:"highDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$lowdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$lowdatavalue))/ig,argIndex:2,argKey:"lowDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$maxvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$maxvalue))/ig,argIndex:2,argKey:"maxValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$maxdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$maxdatavalue))/ig,argIndex:2,argKey:"maxDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$minvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$minvalue))/ig,
argIndex:2,argKey:"minValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$mindatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$mindatavalue))/ig,argIndex:2,argKey:"minDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$q1)/ig,argIndex:2,argKey:"Q1"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedQ1)/ig,argIndex:2,argKey:"unformattedQ1"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$q3)/ig,argIndex:2,argKey:"Q3"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedQ3)/ig,argIndex:2,argKey:"unformattedQ3"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$median)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$median))/ig,
argIndex:2,argKey:"median"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedMedian)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$unformattedMedian))/ig,argIndex:2,argKey:"unformattedMedian"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$SD)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$SD))/ig,argIndex:2,argKey:"SD"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedsd)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$unformattedsd))/ig,argIndex:2,argKey:"unformattedsd"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$QD)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$QD))/ig,
argIndex:2,argKey:"QD"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedQD)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$unformattedQD))/ig,argIndex:2,argKey:"unformattedQD"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$MD)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$MD))/ig,argIndex:2,argKey:"MD"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedMD)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$unformattedMD))/ig,argIndex:2,argKey:"unformattedMD"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$mean)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$mean))/ig,argIndex:2,
argKey:"mean"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedMean)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$unformattedMean))/ig,argIndex:2,argKey:"unformattedMean"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$unformattedMean)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$unformattedMean))/ig,argIndex:2,argKey:"unformattedMean"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$volumeValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$volumeValue))/ig,argIndex:2,argKey:"volumeValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$volumeDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$volumeDataValue))/ig,
argIndex:2,argKey:"volumeDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromXValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromXValue))/ig,argIndex:2,argKey:"fromXValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromYValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromYValue))/ig,argIndex:2,argKey:"fromYValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromXDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromXDataValue))/ig,argIndex:2,argKey:"fromXDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromYDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromYDataValue))/ig,
argIndex:2,argKey:"fromYDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$fromLabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$fromLabel))/ig,argIndex:2,argKey:"fromLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toXValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toXValue))/ig,argIndex:2,argKey:"toXValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toYValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toYValue))/ig,argIndex:2,argKey:"toYValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toXDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toXDataValue))/ig,
argIndex:2,argKey:"toXDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$toYDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$toYDataValue))/ig,argIndex:2,argKey:"toYDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$tolabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$tolabel))/ig,argIndex:2,argKey:"toLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$tlLabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$tlLabel))/ig,argIndex:5,argKey:"tlLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$trlabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$trlabel))/ig,argIndex:5,
argKey:"trLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$bllabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$bllabel))/ig,argIndex:5,argKey:"blLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$brlabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$brlabel))/ig,argIndex:5,argKey:"brLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$rowlabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$rowlabel))/ig,argIndex:5,argKey:"rowLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$columnlabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$columnlabel))/ig,argIndex:5,argKey:"columnLabel"}
    ,
{
      regex:/((^|[^\\])((\\)\\)*\$errorvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$errorvalue))/ig,argIndex:2,argKey:"errorValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$errordatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$errordatavalue))/ig,argIndex:2,argKey:"errorDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$errorpercentvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$errorpercentvalue))/ig,argIndex:2,argKey:"errorPercentValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$errorpercentdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$errorpercentdatavalue))/ig,
argIndex:2,argKey:"errorPercentDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$horizontalErrorValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$horizontalErrorValue))/ig,argIndex:2,argKey:"horizontalErrorValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$horizontalErrorDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$horizontalErrorDataValue))/ig,argIndex:2,argKey:"horizontalErrorDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$verticalErrorValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$verticalErrorValue))/ig,argIndex:2,argKey:"verticalErrorValue"}
    ,
{
      regex:/((^|[^\\])((\\)\\)*\$verticalErrorDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$verticalErrorDataValue))/ig,argIndex:2,argKey:"verticalErrorDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$horizontalErrorPercent)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$horizontalErrorPercentValue))/ig,argIndex:2,argKey:"horizontalErrorPercentValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$horizontalErrorPercentDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$horizontalErrorPercentDataValue))/ig,argIndex:2,argKey:"horizontalErrorPercentDataValue"}
    ,
{
      regex:/((^|[^\\])((\\)\\)*\$verticalErrorPercent)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$verticalErrorPercentValue))/ig,argIndex:2,argKey:"verticalErrorPercentValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$verticalErrorPercentDataValue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$verticalErrorPercentDataValue))/ig,argIndex:2,argKey:"verticalErrorPercentDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$xaxispercentvalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$xaxispercentvalue))/ig,argIndex:2,argKey:"xAxisPercentValue"}
    ,
{
      regex:/((^|[^\\])((\\)\\)*\$percentdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$percentdatavalue))/ig,argIndex:2,argKey:"percentDataValue"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$trType)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$trType))/ig,argIndex:4,argKey:"trtype"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$tlType)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$tlType))/ig,argIndex:4,argKey:"tltype"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$brType)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$brType))/ig,argIndex:4,argKey:"brtype"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$blType)/ig,
escapeRegex:/((^|[^\\])((\\)\\)*\\(\$blType))/ig,argIndex:4,argKey:"bltype"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$colorRangeLabel)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$colorRangeLabel))/ig,argIndex:5,argKey:"colorRangeLabel"}
    ,{
      regex:/((^|[^\\])((\\)\\)*\$zdatavalue)/ig,escapeRegex:/((^|[^\\])((\\)\\)*\\(\$zdatavalue))/ig,argIndex:2,argKey:"zDataValue"}
    ],b=[],c,d=a.length;
    for(c=0;
    c<d;
    c+=1)b.push(c);
    return function(){
      var c=arguments[0],d=arguments[1],r,m,g,e,h;
      Da(d)||(d=b);
      if(c)for(h=d.length,e=0;
      e<h;
      e+=
1)if(g=a[d[e]])r=W(pa((m=arguments[g.argIndex])&&m[g.argKey],"")+""),c=c.replace(g.regex,"$2$4"+(g.parsingMethod?g.parsingMethod(r):r)),c=c.replace(g.escapeRegex,"$2$4$5");
      return c}
    }
  ();
  e.core._setLineHeightFactor=function(a){
    !(a=N(a))||0>a||(v.lineHeightFactor=a)}
  ;
  e.extend(v,{
    BLANKSTRINGPLACEHOLDER:"#BLANK#",BLANKSTRING:"",COLOR_BLACK:"000000",COLOR_GLASS:"rgba(255, 255, 255, 0.3)",COLOR_WHITE:"FFFFFF",COLOR_TRANSPARENT:"rgba(0,0,0,0)",HASHSTRING:"#",BREAKSTRING:"<br />",STRINGSTRING:"string",OBJECTSTRING:"object",
COMMASTRING:",",ZEROSTRING:"0",SAMPLESTRING:"Ay0",TESTSTR:"Ag",ONESTRING:"1",DECIMALSTRING:".",STRINGUNDEFINED:"undefined",POSITION_TOP:"top",POSITION_RIGHT:"right",POSITION_BOTTOM:"bottom",POSITION_LEFT:"left",POSITION_CENTER:"center",POSITION_MIDDLE:"middle",POSITION_START:"start",POSITION_END:"end",FC_CONFIG_STRING:"_FCconf",SHAPE_RECT:"rect",HUNDREDSTRING:"100",PXSTRING:"px",COMMASPACE:", ",TEXTANCHOR:"text-anchor",TOUCH_THRESHOLD_PIXELS:15,CLICK_THRESHOLD_PIXELS:5,regex:{
      stripWhitespace:J,dropHash:c,
startsRGBA:p,cleanColorCode:a,breakPlaceholder:t,hexcode:/^#?[0-9a-f]{
        6}
      /i}
    ,fireEvent:function(a,b,c,d){
      v.dem.fire(a,b,c,d)}
    ,plotEventHandler:function(a,c,d){
      c=c||{
        }
      ;
      var r=c.type,m=S(a.container,c),m=xa(m,this.data("eventArgs")),g=a.logic.fireGroupEvent,h=this.data("groupId"),n=function(a,d){
        c.FusionChartsPreventEvent=!0;
        b&&d.toolText&&v.toolTip&&v.toolTip.preventTooltip()}
      ;
      "index"in m&&!("dataIndex"in m)&&(m.dataIndex=m.index);
      "value"in m&&!("dataValue"in m)&&(m.dataValue=m.value);
      d=fa(d,"dataplotclick").toLowerCase();
      
"dataplotrollover"===d?(c.FusionChartsPreventEvent=!1,g?e.raiseEventGroup(h,d,m,a.fusionCharts,void 0,void 0,n):e.raiseEvent(d,m,a.logic.chartInstance,void 0,void 0,n)):g&&"dataplotclick"!==d?e.raiseEventGroup(h,d,m,a.fusionCharts):e.raiseEvent(d,m,a.logic.chartInstance);
      "click"!==r&&"mouseup"!==r&&"touchend"!==r||!/click/i.test(d)||a.linkClickFN.call({
        link:m.link}
      ,a)}
    ,getEventCoordinate:G,getMouseCoordinate:S,addEvent:la,removeEvent:Q,getTouchEvent:ya,extend2:xa,deltend:function(a,b){
      if("object"!==
typeof a||"object"!==typeof b)return null;
      va(a,b);
      return a}
    ,imprint:function(a,b,c){
      var d;
      if("object"!==typeof a||null===a)return b;
      if("object"!==typeof b||null===b)return a;
      for(d in b)if(void 0===a[d]||!c&&null===a[d])a[d]=b[d];
      return a}
    ,pluck:fa,pluckNumber:r,getFirstDefinedValue:function(){
      var a,b,c;
      b=0;
      for(c=arguments.length;
      b<c;
      b+=1)if((a=arguments[b])||!1===a||0===a||""==a)return a}
    ,createElement:function(a,b,c){
      a=u.createElement(a);
      for(var d in b)a.setAttribute(d,b[d]);
      c&&c.appendChild&&c.appendChild(a);
      
return a}
    ,hashify:ba,pluckFontSize:function(){
      var a,b,c;
      b=0;
      for(c=arguments.length;
      b<c;
      b+=1)if(((a=arguments[b])||!1===a||0===a)&&!isNaN(a=Number(a)))return 1>a?1:a;
      return 1}
    ,getValidValue:pa,getPosition:$,getViewPortDimension:n,bindSelectionEvent:function(a,b){
      b=b||{
        }
      ;
      var c=a.options.chart,d=a.container,m=c.zoomType,g=xa({
        }
      ,b.attr||{
        }
      ),e=g["stroke-width"]=r(g.strokeWidth,g["stroke-width"],1),h=$(d),n=a.eventListeners||(a.eventListeners=[]);
      b=xa({
        chart:a,zoomX:/x/.test(m),zoomY:/y/.test(m),canvasY:a.canvasTop,
canvasX:a.canvasLeft,canvasW:a.canvasWidth,canvasH:a.canvasHeight,canvasX2:a.canvasLeft+a.canvasWidth,canvasY2:a.canvasTop+a.canvasHeight,strokeWidth:e,chartPosLeft:h.left,chartPosTop:h.top,attr:g}
      ,b);
      g.stroke=Ca(g.stroke,"rgba(51,153,255,0.8)");
      g.fill=Ca(g.fill,"rgba(185,213,241,0.3)");
      g.ishot=!0;
      d&&(Q(d,"pointerdrag",oa),n.push(la(d,"pointerdrag",oa,b)));
      c.link&&(Q(a.container,"mouseup mousedown",ea),n.push(la(a.container,"mouseup mousedown",ea,b)))}
    ,createContextMenu:function(a){
      var c=a.chart,
d=c.smartLabel,r=c.logic.hcJSON&&c.logic.hcJSON.chart.useRoundEdges,m=v.Raphael,g=function(a){
        var b=a.menufillcolor&&ba(a.menufillcolor),c=a.menulabelcolor&&ba(a.menulabelcolor),d=a.menufillhovercolor&&ba(a.menufillhovercolor);
        a=a.menulabelhovercolor&&ba(a.menulabelhovercolor);
        return{
          attrs:{
            backgroundColor:b,color:c}
          ,hover:{
            backgroundColor:d,color:a}
          }
        }
      (c.definition.chart),e=function(a,b,c){
        b=b||{
          }
        ;
        a=(a=(a=a&&m.tintshade(a.color,.7))&&m.getRGB(a))&&"rgb("+[a.r,a.g,a.b].join()+")";
        return{
          backgroundColor:b.backgroundHoverColor||
c.backgroundColor||a||"rgb(64, 64, 64)",color:b.hoverColor||c.color||"#FFFFFF"}
        }
      (a.basicStyle,a.hover,g.hover),h=function(a,b,c){
        b=xa({
          }
        ,b||{
          }
        );
        b=xa(b,a);
        return{
          fontFamily:b.fontFamily||"Verdana,sans",fontSize:b.fontSize||"10px",color:b.color||c.color||"#000000",backgroundColor:b.backgroundColor||c.backgroundColor||"rgb(255, 255, 255)"}
        }
      (a.basicStyle,a.attrs,g.attrs),n={
        textAlign:"left",align:"left",paddingLeft:"5px",paddingRight:"5px",paddingTop:"5px",cursor:"pointer",borderWidth:"0px"}
      ,B=a.items,
l=a.position,w=a.verticalPadding||3,p=a.horizontalPadding||6,G={
        }
      ,k,ga,t,Z,S,L,F,pa,q,T,Da,P,R;
      if(c)k=$(c.container);
      else return!1;
      Z=function(){
        var a=G.items,c=a.length,m=0,g=0,e=0,E,s;
        G.menuItems||(G.menuItems=[]);
        for(d.setStyle(h);
        c--;
        )E=a[c],E=d.getOriSize(E.text),e||(e=E.height+2*w),m+=e,g=C(g,E.width+2*p);
        G.height=m;
        G.width=g;
        G.itemH=e;
        this.style.width=g+"px";
        G.menuRect||(m=G.menuRect=u.createElement("div"),m.style.border="1px solid rgb(100, 100, 100)",r&&(m.style.mozBorderRadius="4px",m.style.webkitBorderRadius=
"4px",m.style.borderRadius="4px",m.style.overflow="hidden"),b&&!D?m.style.filter="progid:DXImageTransform.Microsoft.Shadow(Color=#999999,direction=135,strength=3)":(m.style.mozBoxShadow="3px 3px 3px #999",m.style.webkitBoxShadow="3px 3px 3px #999",m.style.boxShadow="3px 3px 3px #999"),this.appendChild(m));
        g=a.length;
        for(c=0;
        c<g;
        c+=1)if(E=a[c],G.menuItems[c])G.menuItems[c].label.innerHTML=E.text;
        else{
          G.menuItems[c]={
            }
          ;
          m=G.menuItems[c].box=u.createElement("div");
          m.style.height=e+"px";
          m.style.lineHeight=
e+"px";
          for(s in n)m.style[s]=n[s];
          for(s in h)m.style[s]=h[s];
          G.menuRect.appendChild(m);
          m.innerHTML=E.text;
          v.dem.listen(m,"click",R);
          v.dem.listen(m,"pointerhover",T);
          G.menuItems[c].box._itemIdx=c}
        for(;
        G.menuItems[c];
        )G.menuItems[c].box.parentNode.removeChild(G.menuItems[c].box),G.menuItems.splice(c,1)}
      ;
      S=function(){
        t||(t=u.createElement("div"),t.style.position="absolute",t.style.zIndex="50",t.style.display="none",c.container.appendChild&&c.container.appendChild(t));
        return t}
      ;
      L=function(){
        ga=setTimeout(G.hide,
800)}
      ;
      F=function(){
        ga&&clearTimeout(ga)}
      ;
      pa=function(a){
        var b=a.x;
        a=a.y;
        var d={
          x:b,y:a}
        ,m=G.width,r=G.height,g=c.chartHeight,s=c.chartWidth;
        b+m>s&&0<b-m?d.x-=m:b+m>s&&(d.x=0);
        a+r>g&&0<a-r&&(d.y-=r);
        return d}
      ;
      q=function(){
        G.hide()}
      ;
      T=function(a){
        a.target&&a.target.parentNode&&("start"===a.state?Da:P).call(a.target)}
      ;
      Da=function(){
        var a=G.menuItems[this._itemIdx],b;
        F();
        for(b in e)a.box.style[b]=e[b]}
      ;
      P=function(){
        var a=G.menuItems[this._itemIdx],b;
        for(b in h)a.box.style[b]=h[b];
        L()}
      ;
      R=function(a){
        var b=
G.items[this._itemIdx];
        b.onclick&&b.onclick.call(b,a);
        a.originalEvent.stopPropagation?a.originalEvent.stopPropagation():a.originalEvent.cancelBubble=!0;
        G.hide()}
      ;
      G.showItem=function(a){
        a=this.menuItems[a];
        var b=this.height,c=this.itemH;
        a&&a._isHidden&&(a.box.style.display="",this.height=b+c,a._isHidden=!1,a=pa(l),this.left=a.x,this.top=a.y)}
      ;
      G.hideItem=function(a){
        a=this.menuItems[a];
        var b=this.height,c=this.itemH;
        a&&!a._isHidden&&(a.box.style.display="none",this.height=b-c,a._isHidden=!0,a=pa(l),
this.left=a.x,this.top=a.y)}
      ;
      G.redraw=function(){
        var a=this.menuContainer;
        this.items=B;
        a?Z.call(this.menuContainer):l&&void 0!==l.x&&void 0!==l.y?(this.menuContainer=S(),Z.call(this.menuContainer),a=pa(l),this.left=a.x,this.top=a.y,this.menuContainer.style.left=this.left+"px",this.menuContainer.style.top=this.top+"px"):(this.menuContainer=S(),Z.call(this.menuContainer))}
      ;
      G.show=function(a){
        var b=this;
        a&&void 0!==a.x&&void 0!==a.y?(a=pa(a),b.menuContainer.style.left=a.x+"px",b.menuContainer.style.top=
a.y+"px"):(b.menuContainer.style.left=b.left+"px",b.menuContainer.style.top=b.top+"px");
        b.menuContainer.style.display="";
        setTimeout(function(){
          b.visible=!0;
          m.click(q)}
        ,400)}
      ;
      G.hide=function(){
        this.visible&&(this.visible=!1,G.menuContainer.style.display="none",G.menuContainer.style.left=-G.width+"px",G.menuContainer.style.top=-G.height+"px",m.unclick(q))}
      ;
      G.update=function(a){
        a&&a.length&&(this.items=a,this.redraw())}
      ;
      G.updatePosition=function(a){
        var b=k.left,d=k.top;
        k=$(c.container);
        a?(l=a,a=pa(a),
this.left=a.x,this.top=a.y):(this.left-=b-k.left,this.top-=d-k.top)}
      ;
      G.add=function(a){
        var b=this.menuItems,c=b.length,m;
        d.setStyle(h);
        this.width=C(this.width,d.getOriSize(a.text).width);
        b[c]={
          }
        ;
        b=b[c].box=u.createElement("div");
        b.style.height=this.itemH+"px";
        b.style.lineHeight=this.itemH+"px";
        for(m in n)b.style[m]=n[m];
        for(m in h)b.style[m]=h[m];
        G.menuRect.appendChild(b);
        b.innerHTML=a.text;
        v.dem.listen(b,"click",R);
        v.dem.listen(b,"pointerhover",T);
        G.menuItems[c].box._itemIdx=c;
        this.height+=this.itemH}
      ;
      
G.removeItems=function(){
        for(var a=this.menuItems,b=a&&a.length,c;
        b--;
        )c=a[b],v.dem.unlisten(c.box,"click",R),v.dem.unlisten(c.box,"pointerhover",T),c.box&&c.box.parentNode&&c.box.parentNode.removeChild(c.box);
        delete this.menuItems;
        delete this.items}
      ;
      G.setPosition=function(a){
        void 0!==a.x&&void 0!==a.y&&(this.menuContainer.style.x=a.x,this.menuContainer.style.y=a.y)}
      ;
      G.destroy=function(){
        this.removeItems();
        this.menuContainer.parentNode.removeChild(this.menuContainer)}
      ;
      B&&B.length&&(G.redraw(),G.hide());
      
return G}
    ,getDefinedColor:function(a,b){
      return a||0===a||""===a?a:b}
    ,getFirstValue:Ca,getFirstColor:function(a){
      a=a.split(",")[0];
      a=a.replace(J,"");
      ""==a&&(a="000000");
      return a.replace(c,"#")}
    ,getColorCodeString:function(a,b){
      var c="",d,m,r=0,g=b.split(",");
      for(m=g.length;
      r<m;
      r+=1)d=g[r].split("-"),c=2===d.length?"-1"!==d[0].indexOf("dark")?c+(za(a,100-parseInt(d[1],10))+","):c+(La(a,100-parseInt(d[1],10))+","):c+(g[r]+",");
      return c.substring(0,c.length-1)}
    ,pluckColor:function(a){
      if(pa(a))return a=
a.split(",")[0],a=a.replace(J,""),""==a&&(a="000000"),a.replace(c,"#")}
    ,toRaphaelColor:sa,gradientify:Ra,trimString:function(a){
      a=a.replace(/^\s\s*/,"");
      for(var b=/\s/,c=a.length;
      b.test(a.charAt(--c));
      );
      return a.slice(0,c+1)}
    ,getFirstAlpha:function(a){
      a=parseInt(a,10);
      if(isNaN(a)||100<a||0>a)a=100;
      return a}
    ,parsePointValue:B,parseUnsafeString:ga,parseTooltext:m,toPrecision:function(a,b){
      var c=g(10,b);
      return d(a*c)/c}
    ,hasTouch:q,CREDIT_HREF:P,CREDIT_STRING:"FusionCharts XT Trial",getSentenceCase:function(a){
      a=
a||"";
      return a.charAt(0).toUpperCase()+a.substr(1)}
    ,getCrispValues:function(a,b,c){
      var m=c%2/2;
      c=d(a+m)-m;
      a=d(a+b+m)-m-c;
      return{
        position:c,distance:a}
      }
    ,regescape:function(a){
      return a&&a.replace(/[\-\[\]{
        }
      ()*+?.,\\\^$|#\s]/g,"\\$&")}
    ,regReplaceEscape:W,isArray:Da,stubFN:function(){
      }
    ,falseFN:function(){
      return!1}
    ,stableSort:function(a,b){
      var c=a.length,d;
      for(d=0;
      d<c;
      d++)a[d].ssI=d;
      a.sort(function(a,c){
        var d=b(a,c);
        return 0===d?a.ssI-c.ssI:d}
      );
      for(d=0;
      d<c;
      d++)delete a[d].ssI}
    ,hasSVG:D,isIE:b,lineHeightFactor:1.2,
getLinkAction:function(a,b){
      var c=function(a){
        return a}
      ;
      return function(d){
        d=d||this.series&&this.series.chart;
        var m=a.chart||a.map||{
          }
        ,g=r(m.unescapelinks,1),m=r(m.clickurloverridesplotlinks,0),h=Ca(this.link,"");
        d=d&&d.options&&d.options.chart&&d.options.chart.link||"";
        var n=this.options&&this.options.chart&&this.options.chart.link||"",B=m?fa(d,n,h):fa(h,n,d),l=B,G,w,p,v,ga,t,Z,C,S,L;
        void 0!==B&&(g&&(B=k.decodeURIComponent?k.decodeURIComponent(B):k.unescape(B)),B=B.replace(/^\s+/,"").replace(/\s+$/,
""),-1!==B.search(/^[a-z]*\s*[\-\:]\s*/i)&&(ga=B.split(/\s*[\-\:]\s*/)[0].toLowerCase(),L=ga.length),setTimeout(function(){
          switch(ga){
            case "j":B=B.replace(/^j\s*\-/i,"j-");
            G=B.indexOf("-",2);
            -1===G?qa(B.slice(2)):qa(B.substr(2,G-2).replace(/\s/g,""),B.slice(G+1));
            break;
            case "javascript":Na(B.replace(/^javascript\s*\:/i,""));
            break;
            case "n":B.replace(/^n\s*\-/i,"n-");
            k.open(c(B.slice(2),g));
            break;
            case "f":B=B.replace(/^f\s*\-/i,"f-");
            G=B.indexOf("-",2);
            -1!==G?(w=B.substr(2,G-2))&&k.frames[w]?k.frames[w].location=
c(B.slice(G+1),g):k.open(c(B.slice(G+1),g),w):k.open(c(B.slice(2),g));
            break;
            case "p":B=B.replace(/p\s*\-/i,"p-");
            G=B.indexOf("-",2);
            p=B.indexOf(",",2);
            -1===G&&(G=1);
            v=c(B.slice(G+1),g);
            k.open(v,B.substr(2,p-2),B.substr(p+1,G-p-1)).focus();
            break;
            case "newchart":case "newmap":":"===B.charAt(L)&&(G=B.indexOf("-",L+1),S=B.substring(L+1,G),L=G);
            G=B.indexOf("-",L+1);
            t=B.substring(L+1,G).toLowerCase();
            switch(t){
              case "xmlurl":case "jsonurl":C=B.substring(G+1,B.length);
              break;
              case "xml":case "json":var d=Z=
B.substring(G+1,B.length),m={
                chart:{
                  }
                }
              ,r,d=d.toLowerCase();
              if(a.linkeddata)for(r=0;
              r<a.linkeddata.length;
              r+=1)a.linkeddata[r].id.toLowerCase()===d&&(m=a.linkeddata[r].linkedchart||a.linkeddata[r].linkedmap);
              C=m;
              t="json"}
            e.raiseEvent("linkedChartInvoked",{
              alias:S,linkType:t.toUpperCase(),data:C}
            ,b);
            break;
            default:k.location.href=B}
          e.raiseEvent("linkClicked",{
            linkProvided:l,linkInvoked:B,linkAction:ga&&ga.toLowerCase()}
          ,b)}
        ,0))}
      }
    ,graphics:{
      parseAlpha:Sa,convertColor:ka,getDarkColor:La,getLightColor:za,
mapSymbolName:function(a,b){
        var c="circle";
        a=B(a);
        3<=a&&(c=(b?"spoke_":"poly_")+a);
        return c}
      ,getColumnColor:function(a,b,c,d,m,r,g,e,h){
        var B,n;
        B=a.split(",");
        n=b.split(",");
        r=r.split(",");
        g=g.split(",");
        a=a.replace(/\s/g,"").replace(/\,$/,"");
        h?e={
          FCcolor:{
            color:B[0],alpha:n[0]}
          }
        :m?(a=B[0],n=n[0],e={
          FCcolor:{
            color:La(a,75)+","+za(a,10)+","+La(a,90)+","+za(a,55)+","+La(a,80),alpha:n+","+n+","+n+","+n+","+n,ratio:"0,11,14,57,18",angle:e?"90":"0"}
          }
        ,r=[La(a,70)]):(b=Sa(b,B.length),e={
          FCcolor:{
            color:a,
alpha:b,ratio:c,angle:e?-d:d}
          }
        );
        return[e,{
          FCcolor:{
            color:r[0],alpha:g[0]}
          }
        ]}
      ,getAngle:function(a,b,c){
        a=180*Math.atan(b/a)/Math.PI;
        2==c?a=180-a:3==c?a+=180:4==c&&(a=360-a);
        return a}
      ,parseColor:hb,getValidColor:function(a){
        return U.test(hb(a))&&a}
      ,HSBtoRGB:function(a){
        var b=a[0],c=0,m=0,r=0,g=[],g=a[1]/100;
        a=a[2]/100;
        var e=b/60-Math.floor(b/60),B=a*(1-g),h=a*(1-e*g),g=a*(1-(1-e)*g);
        switch(Math.floor(b/60)%6){
          case 0:c=a;
          m=g;
          r=B;
          break;
          case 1:c=h;
          m=a;
          r=B;
          break;
          case 2:c=B;
          m=a;
          r=g;
          break;
          case 3:c=B;
          m=h;
          
r=a;
          break;
          case 4:c=g;
          m=B;
          r=a;
          break;
          case 5:c=a,m=B,r=h}
        return g=[d(255*c),d(255*m),d(255*r)]}
      ,RGBtoHSB:function(a){
        var b=a[0],c=a[1];
        a=a[2];
        var m=Math.max(Math.max(b,c),a),r=Math.min(Math.min(b,c),a),g=0,e=0;
        m==r?g=0:m==b?g=(60*(c-a)/(m-r)+360)%360:m==c?g=60*(a-b)/(m-r)+120:m==a&&(g=60*(b-c)/(m-r)+240);
        e=0===m?0:(m-r)/m;
        return[d(g),d(100*e),d(m/255*100)]}
      ,RGBtoHex:function(a){
        return("000000"+(a[0]<<16|a[1]<<8|a[2]).toString(16)).slice(-6)}
      ,HEXtoRGB:ab}
    ,setImageDisplayMode:function(a,b,c,d,m,r,g,e){
      var B=
d/100*e.width;
      d=d/100*e.height;
      e={
        }
      ;
      var h,n=r-2*m;
      h=g-2*m;
      var l=function(a,b,c,d,r,g){
        var e={
          }
        ;
        switch(a){
          case "top":e.y=m;
          break;
          case "bottom":e.y=g-d-m;
          break;
          case "middle":e.y=(g-d)/2}
        switch(b){
          case "left":e.x=m;
          break;
          case "right":e.x=r-c-m;
          break;
          case "middle":e.x=(r-c)/2}
        return e}
      ;
      switch(a){
        case "center":e.width=B;
        e.height=d;
        e.y=g/2-d/2;
        e.x=r/2-B/2;
        break;
        case "stretch":e.width=r-2*m;
        e.height=g-2*m;
        e.y=m;
        e.x=m;
        break;
        case "tile":e.width=B;
        e.height=d;
        e.tileInfo={
          }
        ;
        e.tileInfo.xCount=a=Math.ceil(n/B);
        
e.tileInfo.yCount=h=Math.ceil(h/d);
        b=l(b,c,B*a,d*h,r,g);
        e.y=b.y;
        e.x=b.x;
        break;
        case "fit":a=B/d>n/h?n/B:h/d;
        e.width=B*a;
        e.height=d*a;
        b=l(b,c,e.width,e.height,r,g);
        e.y=b.y;
        e.x=b.x;
        break;
        case "fill":a=B/d>n/h?h/d:n/B;
        e.width=B*a;
        e.height=d*a;
        b=l(b,c,e.width,e.height,r,g);
        e.y=b.y;
        e.x=b.x;
        break;
        default:b=l(b,c,B,d,r,g),e.width=B,e.height=d,e.y=b.y,e.x=b.x}
      return e}
    ,setLineHeight:Ea,parsexAxisStyles:db,supportedStyle:{
      font:"font",fontFamily:"font-family","font-family":"font-family",fontWeight:"font-weight",
"font-weight":"font-weight",fontSize:"font-size","font-size":"font-size",lineHeight:"line-height","line-height":"line-height",textDecoration:"text-decoration","text-decoration":"text-decoration",color:"color",whiteSpace:"white-space","white-space":"white-space",padding:"padding",margin:"margin",background:"background",backgroundColor:"background-color","background-color":"background-color",backgroundImage:"background-image","background-image":"background-image",backgroundPosition:"background-position",
"background-position":"background-position",backgroundPositionLeft:"background-position-left","background-position-left":"background-position-left",backgroundPositionTop:"background-position-top","background-position-top":"background-position-top",backgroundRepeat:"background-repeat","background-repeat":"background-repeat",border:"border",borderColor:"border-color","border-color":"border-color",borderStyle:"border-style","border-style":"border-style",borderThickness:"border-thickness","border-thickness":"border-thickness",
borderTop:"border-top","border-top":"border-top",borderTopColor:"border-top-color","border-top-color":"border-top-color",borderTopStyle:"border-top-style","border-top-style":"border-top-style",borderTopThickness:"border-top-thickness","border-top-thickness":"border-top-thickness",borderRight:"border-right","border-right":"border-right",borderRightColor:"border-right-color","border-right-color":"border-right-color",borderRightStyle:"border-right-style","border-right-style":"border-right-style",borderRightThickness:"border-right-thickness",
"border-right-thickness":"border-right-thickness",borderBottom:"border-bottom","border-bottom":"border-bottom",borderBottomColor:"border-bottom-color","border-bottom-color":"border-bottom-color",borderBottomStyle:"border-bottom-style","border-bottom-style":"border-bottom-style",borderBottomThickness:"border-bottom-thickness","border-bottom-thickness":"border-bottom-thickness",borderLeft:"border-left","border-left":"border-left",borderLeftColor:"border-left-color","border-left-color":"border-left-color",
borderLeftStyle:"border-left-style","border-left-Style":"border-left-style",borderLeftThickness:"border-left-thickness","border-left-thickness":"border-left-thickness"}
    ,getAxisLimits:Ga,createTrendLine:Ub,getDashStyle:kb,axisLabelAdder:$a,chartAPI:gb,createDialog:Xb,isCanvasElemSupported:function(){
      var a=u.createElement("canvas");
      return!(!a.getContext||!a.getContext("2d"))}
    }
  )}
  ]);
  
window.FusionCharts&&window.FusionCharts.register("module",["private","vendor.redraphael",function(){
  var e=this.hcLib,k=window.Raphael,u;
  (function(){
    (function(e,k){
      var b=/[\.\/]/,u=function(){
        }
      ,J=function(a,b){
        return a-b}
      ,c,p,a={
        n:{
          }
        }
      ,t=function(a,b){
        a=String(a);
        var g=p,d=Array.prototype.slice.call(arguments,2),e=t.listeners(a),l=0,k,q=[],n={
          }
        ,C=[],w=c;
        c=a;
        for(var R=p=0,v=e.length;
        R<v;
        R++)"zIndex"in e[R]&&(q.push(e[R].zIndex),0>e[R].zIndex&&(n[e[R].zIndex]=e[R]));
        for(q.sort(J);
        0>q[l];
        )if(k=n[q[l++]],
C.push(k.apply(b,d)),p)return p=g,C;
        for(R=0;
        R<v;
        R++)if(k=e[R],"zIndex"in k)if(k.zIndex==q[l]){
          C.push(k.apply(b,d));
          if(p)break;
          do if(l++,(k=n[q[l]])&&C.push(k.apply(b,d)),p)break;
          while(k)}
        else n[k.zIndex]=k;
        else if(C.push(k.apply(b,d)),p)break;
        p=g;
        c=w;
        return C.length?C:null}
      ;
      t._events=a;
      t.listeners=function(c){
        c=c.split(b);
        var e=a,g,d,h,l,p,k,n,t=[e],w=[];
        h=0;
        for(l=c.length;
        h<l;
        h++){
          n=[];
          p=0;
          for(k=t.length;
          p<k;
          p++)for(e=t[p].n,g=[e[c[h]],e["*"]],d=2;
          d--;
          )if(e=g[d])n.push(e),w=w.concat(e.f||[]);
          t=n}
        return w}
      ;
      
t.on=function(c,e){
        c=String(c);
        if("function"!=typeof e)return function(){
          }
        ;
        for(var g=c.split(b),d=a,h=0,l=g.length;
        h<l;
        h++)d=d.n,d=d.hasOwnProperty(g[h])&&d[g[h]]||(d[g[h]]={
          n:{
            }
          }
        );
        d.f=d.f||[];
        h=0;
        for(l=d.f.length;
        h<l;
        h++)if(d.f[h]==e)return u;
        d.f.push(e);
        return function(a){
          +a==+a&&(e.zIndex=+a)}
        }
      ;
      t.f=function(a){
        var b=[].slice.call(arguments,1);
        return function(){
          t.apply(null,[a,null].concat(b).concat([].slice.call(arguments,0)))}
        }
      ;
      t.stop=function(){
        p=1}
      ;
      t.nt=function(a){
        return a?(new RegExp("(?:\\.|\\/|^)"+
a+"(?:\\.|\\/|$)")).test(c):c}
      ;
      t.nts=function(){
        return c.split(b)}
      ;
      t.off=t.unbind=function(c,e){
        if(c){
          var g=c.split(b),d,h,l,p,k,n,C=[a];
          p=0;
          for(k=g.length;
          p<k;
          p++)for(n=0;
          n<C.length;
          n+=l.length-2){
            l=[n,1];
            d=C[n].n;
            if("*"!=g[p])d[g[p]]&&l.push(d[g[p]]);
            else for(h in d)d.hasOwnProperty(h)&&l.push(d[h]);
            C.splice.apply(C,l)}
          p=0;
          for(k=C.length;
          p<k;
          p++)for(d=C[p];
          d.n;
          ){
            if(e){
              if(d.f){
                n=0;
                for(g=d.f.length;
                n<g;
                n++)if(d.f[n]==e){
                  d.f.splice(n,1);
                  break}
                !d.f.length&&delete d.f}
              for(h in d.n)if(d.n.hasOwnProperty(h)&&
d.n[h].f){
                l=d.n[h].f;
                n=0;
                for(g=l.length;
                n<g;
                n++)if(l[n]==e){
                  l.splice(n,1);
                  break}
                !l.length&&delete d.n[h].f}
              }
            else for(h in delete d.f,d.n)d.n.hasOwnProperty(h)&&d.n[h].f&&delete d.n[h].f;
            d=d.n}
          }
        else t._events=a={
          n:{
            }
          }
        }
      ;
      t.once=function(a,b){
        var c=function(){
          t.unbind(a,c);
          return b.apply(this,arguments)}
        ;
        return t.on(a,c)}
      ;
      t.version="0.4.2";
      t.toString=function(){
        return"You are running Eve 0.4.2"}
      ;
      "undefined"!=typeof module&&module.exports?module.exports=t:k||"undefined"==typeof define?e.eve=t:define("eve",
[],function(){
        return t}
      )}
    )(this,!0);
    (function(e,k,b){
      !b&&"function"===typeof define&&define.amd?define(["eve"],function(b){
        return k(e,b)}
      ):k(e,e.eve)}
    )(this,function(e,k){
      function b(a){
        var c,f;
        void 0===b._url&&(b._url="");
        if(b.is(a,"function"))return l?a():k.on("raphael.DOMload",a);
        if(b.is(a,n))return b._engine.create[L](b,a.splice(0,3+b.is(a[0],P))).add(a);
        c=Array.prototype.slice.call(arguments,0);
        return b.is(c[c.length-1],"function")?(f=c.pop(),l?f.call(b._engine.create[L](b,c)):k.on("raphael.DOMload",
function(){
          f.call(b._engine.create[L](b,c))}
        )):b._engine.create[L](b,arguments)}
      function N(){
        return this.hex}
      function J(a,b){
        for(var c=[],f=0,s=a.length;
        s-2*!b>f;
        f+=2){
          var d=[{
            x:+a[f-2],y:+a[f-1]}
          ,{
            x:+a[f],y:+a[f+1]}
          ,{
            x:+a[f+2],y:+a[f+3]}
          ,{
            x:+a[f+4],y:+a[f+5]}
          ];
          b?f?s-4==f?d[3]={
            x:+a[0],y:+a[1]}
          :s-2==f&&(d[2]={
            x:+a[0],y:+a[1]}
          ,d[3]={
            x:+a[2],y:+a[3]}
          ):d[0]={
            x:+a[s-2],y:+a[s-1]}
          :s-4==f?d[3]=d[2]:f||(d[0]={
            x:+a[f],y:+a[f+1]}
          );
          c.push(["C",(-d[0].x+6*d[1].x+d[2].x)/6,(-d[0].y+6*d[1].y+d[2].y)/6,(d[1].x+
6*d[2].x-d[3].x)/6,(d[1].y+6*d[2].y-d[3].y)/6,d[2].x,d[2].y])}
        return c}
      function c(a,b,c,f,s,d,z,A,m){
        null==m&&(m=1);
        m=(1<m?1:0>m?0:m)/2;
        for(var O=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],r=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],e=0,g=0;
        12>g;
        g++)var X=m*O[g]+m,H=X*(X*(-3*a+9*c-9*s+3*z)+6*a-12*c+6*s)-3*a+3*c,X=X*(X*(-3*b+9*f-9*d+3*A)+6*b-12*f+6*d)-3*b+3*f,e=e+r[g]*ha(H*H+X*X);
        return m*e}
      function p(a,b,f,s,d,z,A,m,O){
        if(!(0>O||
c(a,b,f,s,d,z,A,m)<O)){
          var r=.5,e=1-r,g;
          for(g=c(a,b,f,s,d,z,A,m,e);
          .01<xa(g-O);
          )r/=2,e+=(g<O?1:-1)*r,g=c(a,b,f,s,d,z,A,m,e);
          return e}
        }
      function a(a,f,s){
        a=b._path2curve(a);
        f=b._path2curve(f);
        for(var d,z,A,m,O,r,e,g,X,H,B=s?0:[],E=0,h=a.length;
        E<h;
        E++)if(X=a[E],"M"==X[0])d=O=X[1],z=r=X[2];
        else{
          "C"==X[0]?(X=[d,z].concat(X.slice(1)),d=X[6],z=X[7]):(X=[d,z,d,z,O,r,O,r],d=O,z=r);
          for(var n=0,Ia=f.length;
          n<Ia;
          n++)if(H=f[n],"M"==H[0])A=e=H[1],m=g=H[2];
          else{
            "C"==H[0]?(H=[A,m].concat(H.slice(1)),A=H[6],m=H[7]):
(H=[A,m,A,m,e,g,e,g],A=e,m=g);
            var l;
            var G=X,M=H;
            l=s;
            var K=b.bezierBBox(G),k=b.bezierBBox(M);
            if(b.isBBoxIntersect(K,k)){
              for(var K=c.apply(0,G),k=c.apply(0,M),K=Da(~~(K/5),1),k=Da(~~(k/5),1),p=[],w=[],aa={
                }
              ,ac=l?0:[],I=0;
              I<K+1;
              I++){
                var v=b.findDotsAtSegment.apply(b,G.concat(I/K));
                p.push({
                  x:v.x,y:v.y,t:I/K}
                )}
              for(I=0;
              I<k+1;
              I++)v=b.findDotsAtSegment.apply(b,M.concat(I/k)),w.push({
                x:v.x,y:v.y,t:I/k}
              );
              for(I=0;
              I<K;
              I++)for(G=0;
              G<k;
              G++){
                var sb=p[I],wa=p[I+1],M=w[G],v=w[G+1],t=.001>xa(wa.x-sb.x)?"y":"x",ga=
.001>xa(v.x-M.x)?"y":"x",yb;
                yb=sb.x;
                var V=sb.y,Z=wa.x,mc=wa.y,C=M.x,S=M.y,pa=v.x,Y=v.y;
                if(Da(yb,Z)<T(C,pa)||T(yb,Z)>Da(C,pa)||Da(V,mc)<T(S,Y)||T(V,mc)>Da(S,Y))yb=void 0;
                else{
                  var L=(yb*mc-V*Z)*(C-pa)-(yb-Z)*(C*Y-S*pa),F=(yb*mc-V*Z)*(S-Y)-(V-mc)*(C*Y-S*pa),q=(yb-Z)*(S-Y)-(V-mc)*(C-pa);
                  if(q){
                    var L=L/q,F=F/q,q=+L.toFixed(2),da=+F.toFixed(2);
                    yb=q<+T(yb,Z).toFixed(2)||q>+Da(yb,Z).toFixed(2)||q<+T(C,pa).toFixed(2)||q>+Da(C,pa).toFixed(2)||da<+T(V,mc).toFixed(2)||da>+Da(V,mc).toFixed(2)||da<+T(S,Y).toFixed(2)||
da>+Da(S,Y).toFixed(2)?void 0:{
                      x:L,y:F}
                    }
                  else yb=void 0}
                yb&&aa[yb.x.toFixed(4)]!=yb.y.toFixed(4)&&(aa[yb.x.toFixed(4)]=yb.y.toFixed(4),sb=sb.t+xa((yb[t]-sb[t])/(wa[t]-sb[t]))*(wa.t-sb.t),M=M.t+xa((yb[ga]-M[ga])/(v[ga]-M[ga]))*(v.t-M.t),0<=sb&&1.001>=sb&&0<=M&&1.001>=M&&(l?ac++:ac.push({
                  x:yb.x,y:yb.y,t1:T(sb,1),t2:T(M,1)}
                )))}
              l=ac}
            else l=l?0:[];
            if(s)B+=l;
            else{
              K=0;
              for(k=l.length;
              K<k;
              K++)l[K].segment1=E,l[K].segment2=n,l[K].bez1=X,l[K].bez2=H;
              B=B.concat(l)}
            }
          }
        return B}
      function t(a,b,c,f,s,d){
        null!=a?(this.a=
+a,this.b=+b,this.c=+c,this.d=+f,this.e=+s,this.f=+d):(this.a=1,this.c=this.b=0,this.d=1,this.f=this.e=0)}
      function U(){
        return this.x+" "+this.y+" "+this.width+" × "+this.height}
      function F(a,b,c,f,s,d){
        function z(a,b){
          var c,f,eb,s;
          eb=a;
          for(f=0;
          8>f;
          f++){
            s=((O*eb+m)*eb+A)*eb-a;
            if(xa(s)<b)return eb;
            c=(3*O*eb+2*m)*eb+A;
            if(1E-6>xa(c))break;
            eb-=s/c}
          c=0;
          f=1;
          eb=a;
          if(eb<c)return c;
          if(eb>f)return f;
          for(;
          c<f;
          ){
            s=((O*eb+m)*eb+A)*eb;
            if(xa(s-a)<b)break;
            a>s?c=eb:f=eb;
            eb=(f-c)/2+c}
          return eb}
        var A=3*b,m=3*(f-b)-A,
O=1-A-m,r=3*c,e=3*(s-c)-r,g=1-r-e;
        return function(a,b){
          var c=z(a,b);
          return((g*c+e)*c+r)*c}
        (a,1/(200*d))}
      function g(a,b){
        var c=[],f={
          }
        ;
        this.ms=b;
        this.times=1;
        if(a){
          for(var s in a)a.hasOwnProperty(s)&&(f[B(s)]=a[s],c.push(B(s)));
          c.sort(K)}
        this.anim=f;
        this.top=c[c.length-1];
        this.percents=c}
      function d(a,c,f,d,z,A){
        f=B(f);
        var e,g,X,H,E,h,n=a.ms,l={
          }
        ,G={
          }
        ,K={
          }
        ;
        if(d)for(h=0,w=Oa.length;
        h<w;
        h++){
          var p=Oa[h];
          if(p.el.id==c.id&&p.anim==a){
            p.percent!=f?(Oa.splice(h,1),X=1):g=p;
            c.attr(p.totalOrigin);
            break}
          }
        else d=
+G;
        h=0;
        for(var w=a.percents.length;
        h<w;
        h++)if(a.percents[h]==f||a.percents[h]>d*a.top){
          f=a.percents[h];
          E=a.percents[h-1]||0;
          n=n/a.top*(f-E);
          H=a.percents[h+1];
          e=a.anim[f];
          break}
        else d&&c.attr(a.anim[a.percents[h]]);
        if(e){
          if(g)g.initstatus=d,g.start=new Date-g.ms*d;
          else{
            for(var I in e)if(e.hasOwnProperty(I)&&(M.hasOwnProperty(I)||c.ca[I]))switch(l[I]=c.attr(I),null==l[I]&&(l[I]=m[I]),G[I]=e[I],M[I]){
              case P:K[I]=(G[I]-l[I])/n;
              break;
              case "colour":l[I]=b.getRGB(l[I]);
              h=b.getRGB(G[I]);
              K[I]={
                r:(h.r-l[I].r)/
n,g:(h.g-l[I].g)/n,b:(h.b-l[I].b)/n}
              ;
              break;
              case "path":h=s(l[I],G[I]);
              p=h[1];
              l[I]=h[0];
              K[I]=[];
              h=0;
              for(w=l[I].length;
              h<w;
              h++){
                K[I][h]=[0];
                for(var aa=1,ac=l[I][h].length;
                aa<ac;
                aa++)K[I][h][aa]=(p[h][aa]-l[I][h][aa])/n}
              break;
              case "transform":h=c._;
              if(w=Ia(h[I],G[I]))for(l[I]=w.from,G[I]=w.to,K[I]=[],K[I].real=!0,h=0,w=l[I].length;
              h<w;
              h++)for(K[I][h]=[l[I][h][0]],aa=1,ac=l[I][h].length;
              aa<ac;
              aa++)K[I][h][aa]=(G[I][h][aa]-l[I][h][aa])/n;
              else w=c.matrix||new t,h={
                _:{
                  transform:h.transform}
                ,getBBox:function(){
                  return c.getBBox(1)}
                }
              ,
l[I]=[w.a,w.b,w.c,w.d,w.e,w.f],O(h,G[I]),G[I]=h._.transform,K[I]=[(h.matrix.a-w.a)/n,(h.matrix.b-w.b)/n,(h.matrix.c-w.c)/n,(h.matrix.d-w.d)/n,(h.matrix.e-w.e)/n,(h.matrix.f-w.f)/n];
              break;
              case "csv":w=r(e[I]).split(ab);
              p=r(l[I]).split(ab);
              if("clip-rect"==I)for(l[I]=p,K[I]=[],h=p.length;
              h--;
              )K[I][h]=(w[h]-l[I][h])/n;
              G[I]=w;
              break;
              default:for(w=[].concat(e[I]),p=[].concat(l[I]),K[I]=[],h=c.ca[I].length;
              h--;
              )K[I][h]=((w[h]||0)-(p[h]||0))/n}
            h=e.easing;
            I=b.easing_formulas[h];
            if(!I)if((I=r(h).match($a))&&
5==I.length){
              var v=I;
              I=function(a){
                return F(a,+v[1],+v[2],+v[3],+v[4],n)}
              }
            else I=Y;
            h=e.start||a.start||+new Date;
            p={
              anim:a,percent:f,timestamp:h,start:h+(a.del||0),status:0,initstatus:d||0,stop:!1,ms:n,easing:I,from:l,diff:K,to:G,el:c,callback:e.callback,prev:E,next:H,repeat:A||a.times,origin:c.attr(),totalOrigin:z}
            ;
            Oa.push(p);
            if(d&&!g&&!X&&(p.stop=!0,p.start=new Date-n*d,1==Oa.length))return cb();
            X&&(p.start=new Date-p.ms*d);
            1==Oa.length&&od(cb)}
          k("raphael.anim.start."+c.id,c,a)}
        }
      function h(a){
        for(var b=
0;
        b<Oa.length;
        b++)Oa[b].el.paper==a&&Oa.splice(b--,1)}
      b.upgrade="1.0.0";
      b.version="2.1.0";
      b.eve=k;
      u=b;
      var l,L="apply",P="number",n="array",C=Array.prototype.slice,w=Array.prototype.splice,R=function(){
        return function(){
          }
        .hasOwnProperty("prototype")}
      (),v={
        doc:document,win:e}
      ,oa=Object.prototype.hasOwnProperty.call(v.win,"Raphael"),ea=v.win.Raphael,$=v.doc,W=v.win,pa=b.supportsTouch="createTouch"in $,Ca=b.supportsOnlyTouch=pa&&!(W.navigator.maxTouchPoints||W.navigator.msMaxTouchPoints),fa=function(){
        }
      ;
      
b.ca=b.customAttributes=fa.prototype;
      var la=function(){
        this.ca=this.customAttributes=new fa;
        this._CustomAttributes=function(){
          }
        ;
        this._CustomAttributes.prototype=this.ca;
        this._elementsById={
          }
        ;
        this.id=b._oid++;
        k("raphael.new",this)}
      ,Q=b.fn=la.prototype=b.prototype,ya={
        circle:1,rect:1,path:1,ellipse:1,text:1,image:1,group:1}
      ,G="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel dragstart dragmove dragend".split(" "),S=b._touchMap={
        mousedown:"touchstart",
mousemove:"touchmove",mouseup:"touchend"}
      ,ba=b._dragEventMap={
        dragstart:"mousedown",dragmove:"mousemove",dragend:"mouseup"}
      ,r=W.String,B=W.parseFloat,ga=W.parseInt,Z=W.Math,Da=Z.max,T=Z.min,xa=Z.abs,va=Z.pow,qa=Z.cos,Na=Z.sin,ha=Z.sqrt,Sa=Z.round,ka=Z.PI,sa=ka/180,Ra=180/ka,hb=r.prototype.toLowerCase,La=r.prototype.toUpperCase,za=W.Object.prototype.toString,ab=/[, ]+/,Ea=/\{
        (\d+)\}
      /g;
      b._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i;
      var db=/^\s*((#[a-f\d]{
        6}
      )|(#[a-f\d]{
        3}
      )|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
$a=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,Ga=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,Xb=/,?([achlmqrstvxz]),?/gi,Kb=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
Ub=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,kb=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig;
      
b._radial_gradient=/^x?r(?:\(([^\)]*?)\))?/;
      var nb={
        NaN:1,Infinity:1,"-Infinity":1}
      ,gb={
        hs:1,rg:1}
      ,m=b._availableAttrs={
        "arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9","clip-path":"",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"about:blank","letter-spacing":0,"line-height":12,"vertical-align":"middle",opacity:1,path:"M0,0",r:0,rx:0,ry:0,
src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",visibility:"",title:"",transform:"",rotation:0,width:0,x:0,y:0}
      ,M=b._availableAnimAttrs={
        blur:P,"clip-rect":"csv","clip-path":"path",cx:P,cy:P,fill:"colour","fill-opacity":P,"font-size":P,height:P,opacity:P,path:"path",r:P,rx:P,ry:P,stroke:"colour","stroke-opacity":P,"stroke-width":P,transform:"transform",width:P,
x:P,y:P}
      ,E={
        }
      ,K=function(a,b){
        return B(a)-B(b)}
      ,V=function(){
        }
      ,Y=function(a){
        return a}
      ,da=b._rectPath=function(a,b,c,f,s){
        return s?[["M",a+s,b],["l",c-2*s,0],["a",s,s,0,0,1,s,s],["l",0,f-2*s],["a",s,s,0,0,1,-s,s],["l",2*s-c,0],["a",s,s,0,0,1,-s,-s],["l",0,2*s-f],["a",s,s,0,0,1,s,-s],["z"]]:[["M",a,b],["l",c,0],["l",0,f],["l",-c,0],["z"]]}
      ,ja=function(a,b,c,f){
        null==f&&(f=c);
        return[["M",a,b],["m",0,-f],["a",c,f,0,1,1,0,2*f],["a",c,f,0,1,1,0,-2*f],["z"]]}
      ,na=b._getPath={
        group:function(){
          return!1}
        ,path:function(a){
          return a.attr("path")}
        ,
circle:function(a){
          a=a.attrs;
          return ja(a.cx,a.cy,a.r)}
        ,ellipse:function(a){
          a=a.attrs;
          return ja(a.cx,a.cy,a.rx,a.ry)}
        ,rect:function(a){
          a=a.attrs;
          return da(a.x,a.y,a.width,a.height,a.r)}
        ,image:function(a){
          a=a.attrs;
          return da(a.x,a.y,a.width,a.height)}
        ,text:function(a){
          a=a._getBBox();
          return da(a.x,a.y,a.width,a.height)}
        }
      ,Xa=b.mapPath=function(a,b){
        if(!b)return a;
        var c,f,d,z,A,m,O;
        a=s(a);
        d=0;
        for(A=a.length;
        d<A;
        d++)for(O=a[d],z=1,m=O.length;
        z<m;
        z+=2)c=b.x(O[z],O[z+1]),f=b.y(O[z],O[z+1]),O[z]=c,O[z+1]=
f;
        return a}
      ;
      b.pick=function(){
        for(var a,b=0,c=arguments.length;
        b<c;
        b+=1)if((a=arguments[b])||!1===a||0===a)return a}
      ;
      var ca=b._lastArgIfGroup=function(a,c){
        var f=a.length-1,s=a[f];
        if(s&&s.constructor===b.el.constructor&&"group"===s.type)return c&&(a[f]=void 0,delete a[f],w.call(a,f,1)),s}
      ,Va=b._serializeArgs=function(a){
        var c=a[0],f,s;
        if(b.is(c,"object")&&!b.is(c,"array")&&"group"!==c.type)for(f=c,c.path&&(c=c.path)&&!b.is(c,"string")&&b.is(c[0],n),c=1,s=arguments.length;
        c<s;
        c+=2)f[arguments[c]]||
(f[arguments[c]]=arguments[c+1]);
        else for(f={
          }
        ,c=1,s=arguments.length;
        c<s;
        c+=2)f[arguments[c]]=a[(c-1)/2]||arguments[c+1];
        return f}
      ,Ka=b.merge=function(a,b,c,f,s){
        var d,z,A,m;
        s?(f.push(a),s.push(b)):(f=[a],s=[b]);
        if(b instanceof Array)for(d=0;
        d<b.length;
        d+=1){
          try{
            z=a[d],A=b[d]}
          catch(O){
            continue}
          if("object"!==typeof A)c&&void 0===A||(a[d]=A);
          else{
            if(null===z||"object"!==typeof z)z=a[d]=A instanceof Array?[]:{
              }
            ;
            m=checkCyclicRef(A,s);
            -1!==m?z=a[d]=f[m]:Ka(z,A,c,f,s)}
          }
        else for(d in b){
          try{
            z=a[d],A=b[d]}
          catch(r){
            continue}
          if(null!==
A&&"object"===typeof A)if(m=za.call(A),"[object Object]"===m){
            if(null===z||"object"!==typeof z)z=a[d]={
              }
            ;
            m=checkCyclicRef(A,s);
            -1!==m?z=a[d]=f[m]:Ka(z,A,c,f,s)}
          else"[object Array]"===m?(null!==z&&z instanceof Array||(z=a[d]=[]),m=checkCyclicRef(A,s),-1!==m?z=a[d]=f[m]:Ka(z,A,c,f,s)):a[d]=A;
          else a[d]=A}
        return a}
      ;
      b.extend=function(a,b,c){
        if("object"!==typeof a&&"object"!==typeof b)return null;
        if("object"!==typeof b||null===b)return a;
        "object"!==typeof a&&(a=b instanceof Array?[]:{
          }
        );
        Ka(a,b,c);
        return a}
      ;
      
var ra=b.is=function(a,b){
        b=hb.call(b);
        return"finite"==b?!nb.hasOwnProperty(+a):b==n?a instanceof Array:"object"!==b||void 0!==a&&null!==a?"null"==b&&null===a||b==typeof a&&null!==a||"object"==b&&a===Object(a)||"array"==b&&Array.isArray&&Array.isArray(a)||za.call(a).slice(8,-1).toLowerCase()==b:!1}
      ;
      b.createUUID=function(a,b){
        return function(){
          return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a,b).toUpperCase()}
        }
      (/[xy]/g,function(a){
        var b=16*Z.random()|0;
        return("x"==a?b:b&3|8).toString(16)}
      );
      var ta=
b.clone=R?function(a){
        if(Object(a)!==a)return a;
        var b=new a.constructor,c;
        for(c in a)"prototype"!==c&&a.hasOwnProperty(c)&&(b[c]=ta(a[c]));
        return b}
      :function(a){
        if(Object(a)!==a)return a;
        var b=new a.constructor,c;
        for(c in a)a.hasOwnProperty(c)&&(b[c]=ta(a[c]));
        return b}
      ;
      b._g=v;
      b.type=W.ENABLE_RED_CANVAS&&(W.CanvasRenderingContext2D||$.createElement("canvas").getContext)?"CANVAS":W.SVGAngle||$.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML";
      if("VML"==
b.type){
        var mb=$.createElement("div"),Ha;
        mb.innerHTML='<v:shape adj="1"/>';
        Ha=mb.firstChild;
        Ha.style.behavior="url(#default#VML)";
        if(!Ha||"object"!=typeof Ha.adj)return b.type="";
        mb=null}
      b.svg=!((b.vml="VML"==b.type)||(b.canvas="CANVAS"==b.type));
      b._Paper=la;
      b._id=0;
      b._oid=0;
      b.angle=function(a,c,f,s,d,z){
        return null==d?(a-=f,c-=s,a||c?(Z.atan2(-c,-a)*Ra+540)%360:0):b.angle(a,c,d,z)-b.angle(f,s,d,z)}
      ;
      b.rad=function(a){
        return a%360*sa}
      ;
      b.deg=function(a){
        return a*Ra%360}
      ;
      b.snapTo=function(a,b,c){
        var f;
        
ra(c,"finite")||(c=10);
        if(ra(a,n))for(f=a.length;
        f--;
        ){
          if(xa(a[f]-b)<=c)return a[f]}
        else{
          a=+a;
          f=b%a;
          if(f<c)return b-f;
          if(f>a-c)return b-f+a}
        return b}
      ;
      b.setWindow=function(a){
        k("raphael.setWindow",b,v.win,a);
        W=v.win=a;
        $=v.doc=v.win.document;
        b._engine.initWin&&b._engine.initWin(v.win)}
      ;
      var ma=function(a){
        if(b.vml){
          var c=/^\s+|\s+$/g,f;
          try{
            var s=new ActiveXObject("htmlfile");
            s.write("<body>");
            s.close();
            f=s.body}
          catch(d){
            f=createPopup().document.body}
          var z=f.createTextRange();
          ma=rb(function(a){
            try{
              f.style.color=
r(a).replace(c,"");
              var b=z.queryCommandValue("ForeColor");
              return"#"+("000000"+((b&255)<<16|b&65280|(b&16711680)>>>16).toString(16)).slice(-6)}
            catch(s){
              return"none"}
            }
          )}
        else{
          var A=v.doc.createElement("i");
          A.title="Raphaël Colour Picker";
          A.style.display="none";
          v.doc.body.appendChild(A);
          ma=rb(function(a){
            A.style.color=a;
            return v.doc.defaultView.getComputedStyle(A,"").getPropertyValue("color")}
          )}
        return ma(a)}
      ,Ma=function(){
        return"hsb("+[this.h,this.s,this.b]+")"}
      ,Jb=function(){
        return"hsl("+[this.h,this.s,
this.l]+")"}
      ,Wa=function(){
        return this.hex}
      ,Eb=function(a,c,f){
        null==c&&ra(a,"object")&&"r"in a&&"g"in a&&"b"in a&&(f=a.b,c=a.g,a=a.r);
        null==c&&ra(a,"string")&&(f=b.getRGB(a),a=f.r,c=f.g,f=f.b);
        if(1<a||1<c||1<f)a/=255,c/=255,f/=255;
        return[a,c,f]}
      ,wb=function(a,c,f,s){
        var d={
          r:a*=255,g:c*=255,b:f*=255,hex:b.rgb(a,c,f),toString:Wa}
        ;
        ra(s,"finite")&&(d.opacity=s);
        return d}
      ;
      b.color=function(a){
        var c;
        b.is(a,"object")&&"h"in a&&"s"in a&&"b"in a?(c=b.hsb2rgb(a),a.r=c.r,a.g=c.g,a.b=c.b,a.hex=c.hex):b.is(a,
"object")&&"h"in a&&"s"in a&&"l"in a?(c=b.hsl2rgb(a),a.r=c.r,a.g=c.g,a.b=c.b,a.hex=c.hex):(b.is(a,"string")&&(a=b.getRGB(a)),b.is(a,"object")&&"r"in a&&"g"in a&&"b"in a?(c=b.rgb2hsl(a),a.h=c.h,a.s=c.s,a.l=c.l,c=b.rgb2hsb(a),a.v=c.b):(a={
          hex:"none"}
        ,a.r=a.g=a.b=a.h=a.s=a.v=a.l=-1));
        a.toString=Wa;
        return a}
      ;
      b.hsb2rgb=function(a,b,c,f){
        this.is(a,"object")&&"h"in a&&"s"in a&&"b"in a&&(c=a.b,b=a.s,a=a.h,f=a.o);
        var s,d,z;
        a=360*a%360/60;
        z=c*b;
        b=z*(1-xa(a%2-1));
        c=s=d=c-z;
        a=~~a;
        c+=[z,b,0,0,b,z][a];
        s+=[b,z,
z,b,0,0][a];
        d+=[0,0,b,z,z,b][a];
        return wb(c,s,d,f)}
      ;
      b.hsl2rgb=function(a,b,c,f){
        this.is(a,"object")&&"h"in a&&"s"in a&&"l"in a&&(c=a.l,b=a.s,a=a.h);
        if(1<a||1<b||1<c)a/=360,b/=100,c/=100;
        var s,d,z;
        a=360*a%360/60;
        z=2*b*(.5>c?c:1-c);
        b=z*(1-xa(a%2-1));
        c=s=d=c-z/2;
        a=~~a;
        c+=[z,b,0,0,b,z][a];
        s+=[b,z,z,b,0,0][a];
        d+=[0,0,b,z,z,b][a];
        return wb(c,s,d,f)}
      ;
      b.rgb2hsb=function(a,b,c){
        c=Eb(a,b,c);
        a=c[0];
        b=c[1];
        c=c[2];
        var f,s;
        f=Da(a,b,c);
        s=f-T(a,b,c);
        a=((0==s?null:f==a?(b-c)/s:f==b?(c-a)/s+2:(a-b)/s+4)+360)%6*60/
360;
        return{
          h:a,s:0==s?0:s/f,b:f,toString:Ma}
        }
      ;
      b.rgb2hsl=function(a,b,c){
        c=Eb(a,b,c);
        a=c[0];
        b=c[1];
        c=c[2];
        var f,s,d;
        f=Da(a,b,c);
        s=T(a,b,c);
        d=f-s;
        a=((0==d?null:f==a?(b-c)/d:f==b?(c-a)/d+2:(a-b)/d+4)+360)%6*60/360;
        f=(f+s)/2;
        return{
          h:a,s:0==d?0:.5>f?d/(2*f):d/(2-2*f),l:f,toString:Jb}
        }
      ;
      b._path2string=function(){
        return this.join(",").replace(Xb,"$1")}
      ;
      var rb=b._cacher=function(a,b,c){
        function f(){
          var s=C.call(arguments,0),d=s.join("␀"),z=f.cache=f.cache||{
            }
          ,A=f.count=f.count||[];
          if(z.hasOwnProperty(d)){
            a:for(var s=
A,A=d,m=0,O=s.length;
            m<O;
            m++)if(s[m]===A){
              s.push(s.splice(m,1)[0]);
              break a}
            return c?c(z[d]):z[d]}
          1E3<=A.length&&delete z[A.shift()];
          A.push(d);
          z[d]=a[L](b,s);
          return c?c(z[d]):z[d]}
        return f}
      ;
      b._preload=function(a,b){
        var c=$.createElement("img");
        c.style.cssText="position:absolute;
        left:-9999em;
        top:-9999em";
        c.onload=function(){
          b.call(this);
          this.onload=null;
          $.body.removeChild(this)}
        ;
        c.onerror=function(){
          $.body.removeChild(this)}
        ;
        $.body.appendChild(c);
        c.src=a}
      ;
      b.getRGB=rb(function(a){
        var c,f,s,d,z;
        a&&ra(a,
"object")&&"opacity"in a&&(c=a.opacity);
        if(!a||(a=r(a)).indexOf("-")+1)return{
          r:-1,g:-1,b:-1,hex:"none",error:1,toString:N}
        ;
        if("none"==a)return{
          r:-1,g:-1,b:-1,hex:"none",toString:N}
        ;
        !gb.hasOwnProperty(a.toLowerCase().substring(0,2))&&"#"!==a.charAt()&&(a=ma(a));
        if(a=a.match(db)){
          a[2]&&(d=ga(a[2].substring(5),16),s=ga(a[2].substring(3,5),16),f=ga(a[2].substring(1,3),16));
          a[3]&&(d=ga((z=a[3].charAt(3))+z,16),s=ga((z=a[3].charAt(2))+z,16),f=ga((z=a[3].charAt(1))+z,16));
          a[4]&&(z=a[4].split(Ga),f=B(z[0]),
"%"==z[0].slice(-1)&&(f*=2.55),s=B(z[1]),"%"==z[1].slice(-1)&&(s*=2.55),d=B(z[2]),"%"==z[2].slice(-1)&&(d*=2.55),"rgba"==a[1].toLowerCase().slice(0,4)&&(c=B(z[3])),z[3]&&"%"==z[3].slice(-1)&&(c/=100));
          if(a[5])return z=a[5].split(Ga),f=B(z[0]),"%"==z[0].slice(-1)&&(f*=2.55),s=B(z[1]),"%"==z[1].slice(-1)&&(s*=2.55),d=B(z[2]),"%"==z[2].slice(-1)&&(d*=2.55),"deg"!=z[0].slice(-3)&&"°"!=z[0].slice(-1)||(f/=360),"hsba"==a[1].toLowerCase().slice(0,4)&&(c=B(z[3])),z[3]&&"%"==z[3].slice(-1)&&(c/=100),b.hsb2rgb(f,
s,d,c);
          if(a[6])return z=a[6].split(Ga),f=B(z[0]),"%"==z[0].slice(-1)&&(f*=2.55),s=B(z[1]),"%"==z[1].slice(-1)&&(s*=2.55),d=B(z[2]),"%"==z[2].slice(-1)&&(d*=2.55),"deg"!=z[0].slice(-3)&&"°"!=z[0].slice(-1)||(f/=360),"hsla"==a[1].toLowerCase().slice(0,4)&&(c=B(z[3])),z[3]&&"%"==z[3].slice(-1)&&(c/=100),b.hsl2rgb(f,s,d,c);
          a={
            r:f,g:s,b:d,toString:N}
          ;
          a.hex="#"+(16777216|d|s<<8|f<<16).toString(16).slice(1);
          b.is(c,"finite")&&(a.opacity=c);
          return a}
        return{
          r:-1,g:-1,b:-1,hex:"none",error:1,toString:N}
        }
      ,b);
      
b.tintshade=rb(function(a,c){
        var f=b.getRGB(a),s;
        s=255;
        0>c&&(c*=-1,s=0);
        1<c&&(c=1);
        s=0===c?f:{
          r:s-(s-f.r)*c,g:s-(s-f.g)*c,b:s-(s-f.b)*c,toString:N}
        ;
        s.hex=b.rgb(s.r,s.g,s.b);
        f.error&&(s.error=f.error);
        "opacity"in f?(s.rgba="rgba("+[s.r,s.g,s.b,f.opacity].join()+")",s.opacity=f.opacity):s.rgba="rgb("+[s.r,s.g,s.b].join()+")";
        return s}
      ,b);
      b.hsb=rb(function(a,c,f){
        return b.hsb2rgb(a,c,f).hex}
      );
      b.hsl=rb(function(a,c,f){
        return b.hsl2rgb(a,c,f).hex}
      );
      b.rgb=rb(function(a,b,c){
        return"#"+(16777216|c|b<<8|a<<
16).toString(16).slice(1)}
      );
      b.getColor=function(a){
        a=this.getColor.start=this.getColor.start||{
          h:0,s:1,b:a||.75}
        ;
        var b=this.hsb2rgb(a.h,a.s,a.b);
        a.h+=.075;
        1<a.h&&(a.h=0,a.s-=.2,0>=a.s&&(this.getColor.start={
          h:0,s:1,b:a.b}
        ));
        return b.hex}
      ;
      b.getColor.reset=function(){
        delete this.start}
      ;
      b.parsePathString=function(a){
        if(!a)return null;
        var c=Tb(a);
        if(c.arr)return Fa(c.arr);
        var f={
          a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0}
        ,s=[];
        b.is(a,n)&&b.is(a[0],n)&&(s=Fa(a));
        s.length||r(a).replace(Kb,function(a,b,
c){
          var d=[];
          a=b.toLowerCase();
          c.replace(kb,function(a,b){
            b&&d.push(+b)}
          );
          "m"==a&&2<d.length&&(s.push([b].concat(d.splice(0,2))),a="l",b="m"==b?"l":"L");
          if("r"==a)s.push([b].concat(d));
          else for(;
          d.length>=f[a]&&(s.push([b].concat(d.splice(0,f[a]))),f[a]);
          );
          }
        );
        s.toString=b._path2string;
        c.arr=Fa(s);
        return s}
      ;
      b.parseTransformString=rb(function(a){
        if(!a)return null;
        var c=[];
        b.is(a,n)&&b.is(a[0],n)&&(c=Fa(a));
        c.length||r(a).replace(Ub,function(a,b,f){
          var s=[];
          hb.call(b);
          f.replace(kb,function(a,b){
            b&&s.push(+b)}
          );
          
c.push([b].concat(s))}
        );
        c.toString=b._path2string;
        return c}
      );
      var Tb=function(a){
        var b=Tb.ps=Tb.ps||{
          }
        ;
        b[a]?b[a].sleep=100:b[a]={
          sleep:100}
        ;
        setTimeout(function(){
          for(var c in b)b.hasOwnProperty(c)&&c!=a&&(b[c].sleep--,!b[c].sleep&&delete b[c])}
        );
        return b[a]}
      ;
      b.findDotsAtSegment=function(a,b,c,f,s,d,z,A,m){
        var O=1-m,r=va(O,3),e=va(O,2),g=m*m,h=g*m,X=r*a+3*e*m*c+3*O*m*m*s+h*z,r=r*b+3*e*m*f+3*O*m*m*d+h*A,e=a+2*m*(c-a)+g*(s-2*c+a),h=b+2*m*(f-b)+g*(d-2*f+b),H=c+2*m*(s-c)+g*(z-2*s+c),g=f+2*m*(d-f)+g*(A-
2*d+f);
        a=O*a+m*c;
        b=O*b+m*f;
        s=O*s+m*z;
        d=O*d+m*A;
        A=90-180*Z.atan2(e-H,h-g)/ka;
        (e>H||h<g)&&(A+=180);
        return{
          x:X,y:r,m:{
            x:e,y:h}
          ,n:{
            x:H,y:g}
          ,start:{
            x:a,y:b}
          ,end:{
            x:s,y:d}
          ,alpha:A}
        }
      ;
      b.bezierBBox=function(a,c,f,s,d,z,A,m){
        b.is(a,"array")||(a=[a,c,f,s,d,z,A,m]);
        a=ia.apply(null,a);
        return{
          x:a.min.x,y:a.min.y,x2:a.max.x,y2:a.max.y,width:a.max.x-a.min.x,height:a.max.y-a.min.y}
        }
      ;
      b.isPointInsideBBox=function(a,b,c){
        return b>=a.x&&b<=a.x2&&c>=a.y&&c<=a.y2}
      ;
      b.isBBoxIntersect=function(a,c){
        var f=b.isPointInsideBBox;
        
return f(c,a.x,a.y)||f(c,a.x2,a.y)||f(c,a.x,a.y2)||f(c,a.x2,a.y2)||f(a,c.x,c.y)||f(a,c.x2,c.y)||f(a,c.x,c.y2)||f(a,c.x2,c.y2)||(a.x<c.x2&&a.x>c.x||c.x<a.x2&&c.x>a.x)&&(a.y<c.y2&&a.y>c.y||c.y<a.y2&&c.y>a.y)}
      ;
      b.pathIntersection=function(b,c){
        return a(b,c)}
      ;
      b.pathIntersectionNumber=function(b,c){
        return a(b,c,1)}
      ;
      b.isPointInsidePath=function(c,f,s){
        var d=b.pathBBox(c);
        return b.isPointInsideBBox(d,f,s)&&(1==a(c,[["M",f,s],["H",d.x2+10]],1)%2||1==a(c,[["M",f,s],["V",d.y2+10]],1)%2)}
      ;
      b._removedFactory=function(a){
        return function(){
          k("raphael.log",
null,"Raphaël: you are calling to method “"+a+"” of removed object",a)}
        }
      ;
      var vb=b.pathBBox=function(a){
        var b=Tb(a);
        if(b.bbox)return b.bbox;
        if(!a)return{
          x:0,y:0,width:0,height:0,x2:0,y2:0}
        ;
        a=s(a);
        for(var c=0,f=0,d=[],z=[],A,m=0,O=a.length;
        m<O;
        m++)A=a[m],"M"==A[0]?(c=A[1],f=A[2],d.push(c),z.push(f)):(c=ia(c,f,A[1],A[2],A[3],A[4],A[5],A[6]),d=d.concat(c.min.x,c.max.x),z=z.concat(c.min.y,c.max.y),c=A[5],f=A[6]);
        a=T[L](0,d);
        A=T[L](0,z);
        d=Da[L](0,d);
        z=Da[L](0,z);
        z={
          x:a,y:A,x2:d,y2:z,width:d-a,height:z-
A}
        ;
        b.bbox=ta(z);
        return z}
      ,Fa=function(a){
        a=ta(a);
        a.toString=b._path2string;
        return a}
      ,Fb=b._pathToRelative=function(a){
        var c=Tb(a);
        if(c.rel)return Fa(c.rel);
        b.is(a,n)&&b.is(a&&a[0],n)||(a=b.parsePathString(a));
        var f=[],s=0,d=0,z=0,A=0,m=0;
        "M"==a[0][0]&&(s=a[0][1],d=a[0][2],z=s,A=d,m++,f.push(["M",s,d]));
        for(var O=a.length;
        m<O;
        m++){
          var r=f[m]=[],e=a[m];
          if(e[0]!=hb.call(e[0]))switch(r[0]=hb.call(e[0]),r[0]){
            case "a":r[1]=e[1];
            r[2]=e[2];
            r[3]=e[3];
            r[4]=e[4];
            r[5]=e[5];
            r[6]=+(e[6]-s).toFixed(3);
            r[7]=+(e[7]-
d).toFixed(3);
            break;
            case "v":r[1]=+(e[1]-d).toFixed(3);
            break;
            case "m":z=e[1],A=e[2];
            default:for(var g=1,h=e.length;
            g<h;
            g++)r[g]=+(e[g]-(g%2?s:d)).toFixed(3)}
          else for(f[m]=[],"m"==e[0]&&(z=e[1]+s,A=e[2]+d),r=0,g=e.length;
          r<g;
          r++)f[m][r]=e[r];
          e=f[m].length;
          switch(f[m][0]){
            case "z":s=z;
            d=A;
            break;
            case "h":s+=+f[m][e-1];
            break;
            case "v":d+=+f[m][e-1];
            break;
            default:s+=+f[m][e-2],d+=+f[m][e-1]}
          }
        f.toString=b._path2string;
        c.rel=Fa(f);
        return f}
      ,Ob=b._pathToAbsolute=function(a){
        var c=Tb(a),f;
        if(c.abs)return Fa(c.abs);
        
b.is(a,n)&&b.is(a&&a[0],n)||(a=b.parsePathString(a));
        if(!a||!a.length)return f=["M",0,0],f.toString=b._path2string,f;
        var s=0,d=0,z=0,A=0,m=0;
        f=[];
        "M"==a[0][0]&&(s=+a[0][1],d=+a[0][2],z=s,A=d,m++,f[0]=["M",s,d]);
        for(var O=3==a.length&&"M"==a[0][0]&&"R"==a[1][0].toUpperCase()&&"Z"==a[2][0].toUpperCase(),r,e=m,g=a.length;
        e<g;
        e++){
          f.push(m=[]);
          r=a[e];
          if(r[0]!=La.call(r[0]))switch(m[0]=La.call(r[0]),m[0]){
            case "A":m[1]=r[1];
            m[2]=r[2];
            m[3]=r[3];
            m[4]=r[4];
            m[5]=r[5];
            m[6]=+(r[6]+s);
            m[7]=+(r[7]+d);
            break;
            case "V":m[1]=
+r[1]+d;
            break;
            case "H":m[1]=+r[1]+s;
            break;
            case "R":for(var h=[s,d].concat(r.slice(1)),X=2,H=h.length;
            X<H;
            X++)h[X]=+h[X]+s,h[++X]=+h[X]+d;
            f.pop();
            f=f.concat(J(h,O));
            break;
            case "M":z=+r[1]+s,A=+r[2]+d;
            default:for(X=1,H=r.length;
            X<H;
            X++)m[X]=+r[X]+(X%2?s:d)}
          else if("R"==r[0])h=[s,d].concat(r.slice(1)),f.pop(),f=f.concat(J(h,O)),m=["R"].concat(r.slice(-2));
          else for(h=0,X=r.length;
          h<X;
          h++)m[h]=r[h];
          switch(m[0]){
            case "Z":s=z;
            d=A;
            break;
            case "H":s=m[1];
            break;
            case "V":d=m[1];
            break;
            case "M":z=m[m.length-2],
A=m[m.length-1];
            default:s=m[m.length-2],d=m[m.length-1]}
          }
        f.toString=b._path2string;
        c.abs=Fa(f);
        return f}
      ,Mb=function(a,b,c,f){
        return[a,b,c,f,c,f]}
      ,Ua=function(a,b,c,f,s,d){
        var z=1/3,A=2/3;
        return[z*a+A*c,z*b+A*f,z*s+A*c,z*d+A*f,s,d]}
      ,Aa=function(a,b,c,f,s,d,z,A,m,r){
        var O=120*ka/180,e=sa*(+s||0),g=[],h,X=rb(function(a,b,c){
          var f=a*qa(c)-b*Na(c);
          a=a*Na(c)+b*qa(c);
          return{
            x:f,y:a}
          }
        );
        if(r)E=r[0],h=r[1],d=r[2],H=r[3];
        else{
          h=X(a,b,-e);
          a=h.x;
          b=h.y;
          h=X(A,m,-e);
          A=h.x;
          m=h.y;
          qa(sa*s);
          Na(sa*s);
          h=(a-A)/2;
          E=(b-
m)/2;
          H=h*h/(c*c)+E*E/(f*f);
          1<H&&(H=ha(H),c*=H,f*=H);
          var H=c*c,B=f*f,H=(d==z?-1:1)*ha(xa((H*B-H*E*E-B*h*h)/(H*E*E+B*h*h)));
          d=H*c*E/f+(a+A)/2;
          var H=H*-f*h/c+(b+m)/2,E=Z.asin(((b-H)/f).toFixed(9));
          h=Z.asin(((m-H)/f).toFixed(9));
          E=a<d?ka-E:E;
          h=A<d?ka-h:h;
          0>E&&(E=2*ka+E);
          0>h&&(h=2*ka+h);
          z&&E>h&&(E-=2*ka);
          !z&&h>E&&(h-=2*ka)}
        if(xa(h-E)>O){
          var g=h,B=A,n=m;
          h=E+O*(z&&h>E?1:-1);
          A=d+c*qa(h);
          m=H+f*Na(h);
          g=Aa(A,m,c,f,s,0,z,B,n,[h,g,d,H])}
        d=h-E;
        s=qa(E);
        O=Na(E);
        z=qa(h);
        h=Na(h);
        d=Z.tan(d/4);
        c=4/3*c*d;
        d*=4/3*f;
        f=[a,
b];
        a=[a+c*O,b-d*s];
        b=[A+c*h,m-d*z];
        A=[A,m];
        a[0]=2*f[0]-a[0];
        a[1]=2*f[1]-a[1];
        if(r)return[a,b,A].concat(g);
        g=[a,b,A].concat(g).join().split(",");
        r=[];
        A=0;
        for(m=g.length;
        A<m;
        A++)r[A]=A%2?X(g[A-1],g[A],e).y:X(g[A],g[A+1],e).x;
        return r}
      ,ub=function(a,b,c,f,s,d,z,A,m){
        var r=1-m;
        return{
          x:va(r,3)*a+3*va(r,2)*m*c+3*r*m*m*s+va(m,3)*z,y:va(r,3)*b+3*va(r,2)*m*f+3*r*m*m*d+va(m,3)*A}
        }
      ,ia=rb(function(a,b,c,f,s,d,z,A){
        var m=s-2*c+a-(z-2*s+c),r=2*(c-a)-2*(s-c),O=a-c,e=(-r+ha(r*r-4*m*O))/2/m,m=(-r-ha(r*r-4*m*O))/
2/m,g=[b,A],h=[a,z];
        "1e12"<xa(e)&&(e=.5);
        "1e12"<xa(m)&&(m=.5);
        0<e&&1>e&&(e=ub(a,b,c,f,s,d,z,A,e),h.push(e.x),g.push(e.y));
        0<m&&1>m&&(e=ub(a,b,c,f,s,d,z,A,m),h.push(e.x),g.push(e.y));
        m=d-2*f+b-(A-2*d+f);
        r=2*(f-b)-2*(d-f);
        O=b-f;
        e=(-r+ha(r*r-4*m*O))/2/m;
        m=(-r-ha(r*r-4*m*O))/2/m;
        "1e12"<xa(e)&&(e=.5);
        "1e12"<xa(m)&&(m=.5);
        0<e&&1>e&&(e=ub(a,b,c,f,s,d,z,A,e),h.push(e.x),g.push(e.y));
        0<m&&1>m&&(e=ub(a,b,c,f,s,d,z,A,m),h.push(e.x),g.push(e.y));
        return{
          min:{
            x:T[L](0,h),y:T[L](0,g)}
          ,max:{
            x:Da[L](0,h),y:Da[L](0,
g)}
          }
        }
      ),s=b._path2curve=rb(function(a,b){
        var c=!b&&Tb(a);
        if(!b&&c.curve)return Fa(c.curve);
        var f=Ob(a),s=b&&Ob(b),d={
          x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null}
        ,z={
          x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null}
        ,m=function(a,b){
          var c,f;
          if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];
          a[0]in{
            T:1,Q:1}
          ||(b.qx=b.qy=null);
          switch(a[0]){
            case "M":b.X=a[1];
            b.Y=a[2];
            break;
            case "A":a=["C"].concat(Aa[L](0,[b.x,b.y].concat(a.slice(1))));
            break;
            case "S":c=b.x+(b.x-(b.bx||b.x));
            f=b.y+(b.y-(b.by||b.y));
            a=["C",c,f].concat(a.slice(1));
            
break;
            case "T":b.qx=b.x+(b.x-(b.qx||b.x));
            b.qy=b.y+(b.y-(b.qy||b.y));
            a=["C"].concat(Ua(b.x,b.y,b.qx,b.qy,a[1],a[2]));
            break;
            case "Q":b.qx=a[1];
            b.qy=a[2];
            a=["C"].concat(Ua(b.x,b.y,a[1],a[2],a[3],a[4]));
            break;
            case "L":a=["C"].concat(Mb(b.x,b.y,a[1],a[2]));
            break;
            case "H":a=["C"].concat(Mb(b.x,b.y,a[1],b.y));
            break;
            case "V":a=["C"].concat(Mb(b.x,b.y,b.x,a[1]));
            break;
            case "Z":a=["C"].concat(Mb(b.x,b.y,b.X,b.Y))}
          return a}
        ,A=function(a,b){
          if(7<a[b].length){
            a[b].shift();
            for(var c=a[b];
            c.length;
            )a.splice(b++,
0,["C"].concat(c.splice(0,6)));
            a.splice(b,1);
            e=Da(f.length,s&&s.length||0)}
          }
        ,r=function(a,b,c,d,z){
          a&&b&&"M"==a[z][0]&&"M"!=b[z][0]&&(b.splice(z,0,["M",d.x,d.y]),c.bx=0,c.by=0,c.x=a[z][1],c.y=a[z][2],e=Da(f.length,s&&s.length||0))}
        ,O=0,e=Da(f.length,s&&s.length||0);
        for(;
        O<e;
        O++){
          f[O]=m(f[O],d);
          A(f,O);
          s&&(s[O]=m(s[O],z));
          s&&A(s,O);
          r(f,s,d,z,O);
          r(s,f,z,d,O);
          var g=f[O],h=s&&s[O],X=g.length,H=s&&h.length;
          d.x=g[X-2];
          d.y=g[X-1];
          d.bx=B(g[X-4])||d.x;
          d.by=B(g[X-3])||d.y;
          z.bx=s&&(B(h[H-4])||z.x);
          z.by=s&&(B(h[H-
3])||z.y);
          z.x=s&&h[H-2];
          z.y=s&&h[H-1]}
        s||(c.curve=Fa(f));
        return s?[f,s]:f}
      ,null,Fa);
      b._parseDots=rb(function(a){
        for(var c=[],f=0,s=a.length;
        f<s;
        f++){
          var d={
            }
          ,z=a[f].match(/^([^:]*):?([\d\.]*)/);
          d.color=b.getRGB(z[1]);
          if(d.color.error)return null;
          d.opacity=d.color.opacity;
          d.color=d.color.hex;
          z[2]&&(d.offset=z[2]+"%");
          c.push(d)}
        f=1;
        for(s=c.length-1;
        f<s;
        f++)if(!c[f].offset){
          a=B(c[f-1].offset||0);
          z=0;
          for(d=f+1;
          d<s;
          d++)if(c[d].offset){
            z=c[d].offset;
            break}
          z||(z=100,d=s);
          z=B(z);
          for(z=(z-a)/(d-f+1);
          f<d;
          f++)a+=
z,c[f].offset=a+"%"}
        return c}
      );
      var z=b._tear=function(a,b){
        a==b.top&&(b.top=a.prev);
        a==b.bottom&&(b.bottom=a.next);
        a.next&&(a.next.prev=a.prev);
        a.prev&&(a.prev.next=a.next)}
      ;
      b._tofront=function(a,b){
        if(b.top===a)return!1;
        z(a,b);
        a.next=null;
        a.prev=b.top;
        b.top.next=a;
        b.top=a;
        return!0}
      ;
      b._toback=function(a,b){
        if(b.bottom===a)return!1;
        z(a,b);
        a.next=b.bottom;
        a.prev=null;
        b.bottom.prev=a;
        b.bottom=a;
        return!0}
      ;
      b._insertafter=function(a,b,c,f){
        z(a,c);
        a.parent=f;
        b===f.top&&(f.top=a);
        b.next&&(b.next.prev=a);
        
a.next=b.next;
        a.prev=b;
        b.next=a}
      ;
      b._insertbefore=function(a,b,c,f){
        z(a,c);
        a.parent=f;
        b===f.bottom&&(f.bottom=a);
        b.prev&&(b.prev.next=a);
        a.prev=b.prev;
        b.prev=a;
        a.next=b}
      ;
      var A=b.toMatrix=function(a,b){
        var c=vb(a),f={
          _:{
            transform:""}
          ,getBBox:function(){
            return c}
          }
        ;
        O(f,b);
        return f.matrix}
      ;
      b.transformPath=function(a,b){
        return Xa(a,A(a,b))}
      ;
      var O=b._extractTransform=function(a,c){
        if(null==c)return a._.transform;
        c=r(c).replace(/\.{
          3}
        |\u2026/g,a._.transform||"");
        var f=b.parseTransformString(c),s=0,d=0,z=
0,m=1,A=1,O=a._,z=new t;
        O.transform=f||[];
        if(f)for(var d=0,e=f.length;
        d<e;
        d++){
          var g=f[d],h=g.length,X=r(g[0]).toLowerCase(),H=g[0]!=X,E=H?z.invert():0,B;
          "t"==X&&3==h?H?(h=E.x(0,0),X=E.y(0,0),H=E.x(g[1],g[2]),E=E.y(g[1],g[2]),z.translate(H-h,E-X)):z.translate(g[1],g[2]):"r"==X?2==h?(B=B||a.getBBox(1),z.rotate(g[1],B.x+B.width/2,B.y+B.height/2),s+=g[1]):4==h&&(H?(H=E.x(g[2],g[3]),E=E.y(g[2],g[3]),z.rotate(g[1],H,E)):z.rotate(g[1],g[2],g[3]),s+=g[1]):"s"==X?2==h||3==h?(B=B||a.getBBox(1),z.scale(g[1],
g[h-1],B.x+B.width/2,B.y+B.height/2),m*=g[1],A*=g[h-1]):5==h&&(H?(H=E.x(g[3],g[4]),E=E.y(g[3],g[4]),z.scale(g[1],g[2],H,E)):z.scale(g[1],g[2],g[3],g[4]),m*=g[1],A*=g[2]):"m"==X&&7==h&&z.add(g[1],g[2],g[3],g[4],g[5],g[6]);
          O.dirtyT=1;
          a.matrix=z}
        a.matrix=z;
        O.sx=m;
        O.sy=A;
        O.deg=s;
        O.dx=d=z.e;
        O.dy=z=z.f;
        1==m&&1==A&&!s&&O.bbox?(O.bbox.x+=+d,O.bbox.y+=+z):O.dirtyT=1}
      ,f=function(a){
        var b=a[0];
        switch(b.toLowerCase()){
          case "t":return[b,0,0];
          case "m":return[b,1,0,0,1,0,0];
          case "r":return 4==a.length?[b,0,a[2],
a[3]]:[b,0];
          case "s":return 5==a.length?[b,1,1,a[3],a[4]]:3==a.length?[b,1,1]:[b,1]}
        }
      ,Ia=b._equaliseTransform=function(a,c){
        c=r(c).replace(/\.{
          3}
        |\u2026/g,a);
        a=b.parseTransformString(a)||[];
        c=b.parseTransformString(c)||[];
        for(var s=Da(a.length,c.length),d=[],z=[],m=0,A,O,e,g;
        m<s;
        m++){
          e=a[m]||f(c[m]);
          g=c[m]||f(e);
          if(e[0]!=g[0]||"r"==e[0].toLowerCase()&&(e[2]!=g[2]||e[3]!=g[3])||"s"==e[0].toLowerCase()&&(e[3]!=g[3]||e[4]!=g[4]))return;
          d[m]=[];
          z[m]=[];
          A=0;
          for(O=Da(e.length,g.length);
          A<O;
          A++)A in e&&
(d[m][A]=e[A]),A in g&&(z[m][A]=g[A])}
        return{
          from:d,to:z}
        }
      ;
      b._getContainer=function(a,c,f,s){
        var d;
        d=null!=s||b.is(a,"object")?a:v.doc.getElementById(a);
        if(null!=d)return d.tagName?null==c?{
          container:d,width:d.style.pixelWidth||d.offsetWidth,height:d.style.pixelHeight||d.offsetHeight}
        :{
          container:d,width:c,height:f}
        :{
          container:1,x:a,y:c,width:f,height:s}
        }
      ;
      b.pathToRelative=Fb;
      b._engine={
        }
      ;
      b.path2curve=s;
      b.matrix=function(a,b,c,f,s,d){
        return new t(a,b,c,f,s,d)}
      ;
      (function(a){
        function c(a){
          return a[0]*
a[0]+a[1]*a[1]}
        function f(a){
          var b=ha(c(a));
          a[0]&&(a[0]/=b);
          a[1]&&(a[1]/=b)}
        a.add=function(a,b,c,f,s,d){
          var z=[[],[],[]],m=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]];
          b=[[a,c,s],[b,f,d],[0,0,1]];
          a&&a instanceof t&&(b=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]);
          for(a=0;
          3>a;
          a++)for(c=0;
          3>c;
          c++){
            for(f=s=0;
            3>f;
            f++)s+=m[a][f]*b[f][c];
            z[a][c]=s}
          this.a=z[0][0];
          this.b=z[1][0];
          this.c=z[0][1];
          this.d=z[1][1];
          this.e=z[0][2];
          this.f=z[1][2]}
        ;
        a.invert=function(){
          var a=this.a*this.d-this.b*this.c;
          return new t(this.d/
a,-this.b/a,-this.c/a,this.a/a,(this.c*this.f-this.d*this.e)/a,(this.b*this.e-this.a*this.f)/a)}
        ;
        a.clone=function(){
          return new t(this.a,this.b,this.c,this.d,this.e,this.f)}
        ;
        a.translate=function(a,b){
          this.add(1,0,0,1,a,b)}
        ;
        a.scale=function(a,b,c,f){
          null==b&&(b=a);
          (c||f)&&this.add(1,0,0,1,c,f);
          this.add(a,0,0,b,0,0);
          (c||f)&&this.add(1,0,0,1,-c,-f)}
        ;
        a.rotate=function(a,c,f){
          a=b.rad(a);
          c=c||0;
          f=f||0;
          var s=+qa(a).toFixed(9);
          a=+Na(a).toFixed(9);
          this.add(s,a,-a,s,c,f);
          this.add(1,0,0,1,-c,-f)}
        ;
        a.x=function(a,
b){
          return a*this.a+b*this.c+this.e}
        ;
        a.y=function(a,b){
          return a*this.b+b*this.d+this.f}
        ;
        a.get=function(a){
          return+this[r.fromCharCode(97+a)].toFixed(4)}
        ;
        a.toString=function(){
          return b.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()}
        ;
        a.toMatrixString=function(){
          return"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")"}
        ;
        a.toFilter=function(){
          return"progid:DXImageTransform.Microsoft.Matrix(M11="+
this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"}
        ;
        a.offset=function(){
          return[this.e.toFixed(4),this.f.toFixed(4)]}
        ;
        a.split=function(){
          var a={
            }
          ;
          a.dx=this.e;
          a.dy=this.f;
          var s=[[this.a,this.c],[this.b,this.d]];
          a.scalex=ha(c(s[0]));
          f(s[0]);
          a.shear=s[0][0]*s[1][0]+s[0][1]*s[1][1];
          s[1]=[s[1][0]-s[0][0]*a.shear,s[1][1]-s[0][1]*a.shear];
          a.scaley=ha(c(s[1]));
          f(s[1]);
          a.shear/=a.scaley;
          var d=-s[0][1],s=s[1][1];
          
0>s?(a.rotate=b.deg(Z.acos(s)),0>d&&(a.rotate=360-a.rotate)):a.rotate=b.deg(Z.asin(d));
          a.isSimple=!+a.shear.toFixed(9)&&(a.scalex.toFixed(9)==a.scaley.toFixed(9)||!a.rotate);
          a.isSuperSimple=!+a.shear.toFixed(9)&&a.scalex.toFixed(9)==a.scaley.toFixed(9)&&!a.rotate;
          a.noRotation=!+a.shear.toFixed(9)&&!a.rotate;
          return a}
        ;
        a.toTransformString=function(a){
          a=a||this.split();
          return a.isSimple?(a.scalex=+a.scalex.toFixed(4),a.scaley=+a.scaley.toFixed(4),a.rotate=+a.rotate.toFixed(4),(a.dx||a.dy?"t"+[a.dx,a.dy]:
"")+(1!=a.scalex||1!=a.scaley?"s"+[a.scalex,a.scaley,0,0]:"")+(a.rotate?"r"+[a.rotate,0,0]:"")):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}
        }
      )(t.prototype);
      var X=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);
      "Apple Computer, Inc."==navigator.vendor&&(X&&4>X[1]||"iP"==navigator.platform.slice(0,2))||"Google Inc."==navigator.vendor&&X&&8>X[1]?Q.safari=function(){
        var a=this.rect(-99,-99,this.width+99,this.height+99).attr({
          stroke:"none"}
        );
        
setTimeout(function(){
          a.remove()}
        );
        return!0}
      :Q.safari=V;
      for(var H=function(){
        this.returnValue=!1}
      ,aa=function(){
        return this.originalEvent.preventDefault()}
      ,ac=function(){
        this.cancelBubble=!0}
      ,yb=function(){
        return this.originalEvent.stopPropagation()}
      ,mc=b.addEvent=function(){
        if(v.doc.addEventListener)return function(a,b,c,f){
          var s=Ca&&S[b]||b,d;
          S[ba[b]]&&(s=S[ba[b]]);
          d=function(s){
            var d=v.doc.documentElement.scrollTop||v.doc.body.scrollTop,z=v.doc.documentElement.scrollLeft||v.doc.body.scrollLeft,
m;
            if(pa&&S.hasOwnProperty(Ca?b:ba[b]))for(var A=0,r=s.targetTouches&&s.targetTouches.length;
            A<r;
            A++)if(m=s.targetTouches[A].target,m==a||"tspan"==m.nodeName&&m.parentNode==a){
              m=s;
              s=s.targetTouches[A];
              s.originalEvent=m;
              s.preventDefault=aa;
              s.stopPropagation=yb;
              break}
            return c.call(f,s,s.clientX+z,s.clientY+d)}
          ;
          a.addEventListener(s,d,!1);
          return function(){
            a.removeEventListener(s,d,!1);
            return!0}
          }
        ;
        if(v.doc.attachEvent)return function(a,b,c,f){
          var s=function(a){
            a=a||v.win.event;
            var b=a.clientX+(v.doc.documentElement.scrollLeft||
v.doc.body.scrollLeft),s=a.clientY+(v.doc.documentElement.scrollTop||v.doc.body.scrollTop);
            a.preventDefault=a.preventDefault||H;
            a.stopPropagation=a.stopPropagation||ac;
            return c.call(f,a,b,s)}
          ;
          a.attachEvent("on"+b,s);
          return function(){
            a.detachEvent("on"+b,s);
            return!0}
          }
        }
      (),Ac=[],I=function(a){
        for(var c=a.clientX,f=a.clientY,s=v.doc.documentElement.scrollTop||v.doc.body.scrollTop,d=v.doc.documentElement.scrollLeft||v.doc.body.scrollLeft,z,m=Ac.length;
        m--;
        ){
          z=Ac[m];
          if(pa&&"touchmove"===a.type)for(var A=
a.touches.length,r;
          A--;
          ){
            if(r=a.touches[A],r.identifier==z.el._drag.id){
              c=r.clientX;
              f=r.clientY;
              (a.originalEvent?a.originalEvent:a).preventDefault();
              break}
            }
          else a.preventDefault();
          if(!z.el.removed){
            var A=b._engine.getNode(z.el),O=A.nextSibling,e=A.parentNode,g=A.style.display;
            v.win.opera&&e.removeChild(A);
            A.style.display="none";
            r=z.el.paper.getElementByPoint(c,f);
            A.style.display=g;
            v.win.opera&&(O?e.insertBefore(A,O):e.appendChild(A));
            r&&k("raphael.drag.over."+z.el.id,z.el,r);
            c+=d;
            f+=s;
            k("raphael.drag.move."+
z.el.id,z.move_scope||z.el,c-z.el._drag.x,f-z.el._drag.y,c,f,a)}
          }
        }
      ,wa=function(a){
        b.unmousemove(I).unmouseup(wa);
        for(var c=Ac.length,f;
        c--;
        )f=Ac[c],f.el._drag={
          }
        ,k("raphael.drag.end."+f.el.id,f.end_scope||f.start_scope||f.move_scope||f.el,a);
        Ac=[]}
      ,Ja=b.el={
        }
      ,pd=G.length;
      pd--;
      )(function(a){
        b[a]=Ja[a]=function(c,f){
          b.is(c,"function")&&(this.events=this.events||[],this.events.push({
            name:a,f:c,unbind:mc(this.shape||this.node||v.doc,a,c,f||this)}
          ));
          return this}
        ;
        b["un"+a]=Ja["un"+a]=function(b){
          for(var c=
this.events||[],f=c.length;
          f--;
          )if(c[f].name==a&&c[f].f==b){
            c[f].unbind();
            c.splice(f,1);
            !c.length&&delete this.events;
            break}
          return this}
        }
      )(G[pd]);
      Ja.data=function(a,c){
        var f=E[this.id]=E[this.id]||{
          }
        ;
        if(1==arguments.length){
          if(b.is(a,"object")){
            for(var s in a)a.hasOwnProperty(s)&&this.data(s,a[s]);
            return this}
          k("raphael.data.get."+this.id,this,f[a],a);
          return f[a]}
        f[a]=c;
        k("raphael.data.set."+this.id,this,c,a);
        return this}
      ;
      Ja.removeData=function(a){
        null==a?delete E[this.id]:E[this.id]&&delete E[this.id][a];
        
return this}
      ;
      Ja.getData=function(){
        return ta(E[this.id]||{
          }
        )}
      ;
      var Jc=[],vd=function(){
        this.untrack=mc(v.doc,"mouseup",ud,this)}
      ,ud=function(){
        this.untrack();
        this.untrack=null;
        return this.fn&&this.fn.apply(this.scope||this.el,arguments)}
      ;
      Ja.mouseup=function(a,c,f){
        if(!f)return b.mouseup.apply(this,arguments);
        Jc.push(f={
          el:this,fn:a,scope:c}
        );
        f.unbind=mc(this.shape||this.node||v.doc,"mousedown",vd,f);
        return this}
      ;
      Ja.unmouseup=function(a){
        for(var c=Jc.length,f;
        c--;
        )Jc[c].el===this&&Jc[c].fn===a&&(f=
Jc[c],f.unbind(),f.untrack&&f.untrack(),Jc.splice(c,1));
        return f?this:b.unmouseup.apply(this,arguments)}
      ;
      Ja.hover=function(a,b,c,f){
        return this.mouseover(a,c).mouseout(b,f||c)}
      ;
      Ja.unhover=function(a,b){
        return this.unmouseover(a).unmouseout(b)}
      ;
      var Kc=[];
      Ja.drag=function(a,c,f,s,d,z){
        function m(A){
          (A.originalEvent||A).preventDefault();
          var r=v.doc.documentElement.scrollTop||v.doc.body.scrollTop,O=v.doc.documentElement.scrollLeft||v.doc.body.scrollLeft;
          this._drag.x=A.clientX+O;
          this._drag.y=A.clientY+
r;
          this._drag.id=A.identifier;
          !Ac.length&&b.mousemove(I).mouseup(wa);
          pa&&!Ca&&!Ac.length&&b.dragmove(I).dragend(wa);
          Ac.push({
            el:this,move_scope:s,start_scope:d,end_scope:z}
          );
          c&&k.on("raphael.drag.start."+this.id,c);
          a&&k.on("raphael.drag.move."+this.id,a);
          f&&k.on("raphael.drag.end."+this.id,f);
          k("raphael.drag.start."+this.id,d||s||this,A.clientX+O,A.clientY+r,A)}
        this._drag={
          }
        ;
        Kc.push({
          el:this,start:m}
        );
        this.mousedown(m);
        pa&&!Ca&&this.dragstart(m);
        return this}
      ;
      Ja.onDragOver=function(a){
        a?k.on("raphael.drag.over."+
this.id,a):k.unbind("raphael.drag.over."+this.id)}
      ;
      Ja.undrag=function(){
        for(var a=Kc.length;
        a--;
        )Kc[a].el==this&&(this.unmousedown(Kc[a].start),Kc.splice(a,1),k.unbind("raphael.drag.*."+this.id));
        !Kc.length&&b.unmousemove(I).unmouseup(wa);
        delete this._drag}
      ;
      Ja.follow=function(a,c,f){
        if(a.removed||a.constructor!==b.el.constructor)return this;
        a.followers.push({
          el:this,stalk:f={
            before:"insertBefore",after:"insertAfter"}
          [f],cb:c}
        );
        f&&this[f](a);
        return this}
      ;
      Ja.unfollow=function(a){
        if(a.removed||a.constructor!==
b.el.constructor)return this;
        for(var c=0,f=a.followers.length;
        c<f;
        c++)if(a.followers[c].el===this){
          a.followers.splice(c,1);
          break}
        return this}
      ;
      Q.hide=function(){
        this.canvas.style.visibility="hidden";
        return this}
      ;
      Q.show=function(){
        this.canvas.style.visibility="";
        return this}
      ;
      Q.group=function(){
        var a=arguments,c=ca(a,!0),a=b._engine.group(this,a[0],c);
        return this.__set__&&this.__set__.push(a),this._elementsById[a.id]=a}
      ;
      Q.circle=function(){
        var a=arguments,c=ca(a,!0),a=Va(a,"cx",0,"cy",0,"r",0,"fill",
"none","stroke","#000"),c=b._engine.circle(this,a,c);
        return this.__set__&&this.__set__.push(c),this._elementsById[c.id]=c}
      ;
      Q.rect=function(){
        var a=arguments,c=ca(a,!0),a=Va(a,"x",0,"y",0,"width",0,"height",0,"r",0,"fill","none","stroke","#000"),c=b._engine.rect(this,a,c);
        return this.__set__&&this.__set__.push(c),this._elementsById[c.id]=c}
      ;
      Q.ellipse=function(){
        var a=arguments,c=ca(a,!0),a=Va(a,"x",0,"y",0,"rx",0,"ry",0,"fill","none","stroke","#000"),c=b._engine.ellipse(this,a,c);
        return this.__set__&&
this.__set__.push(c),this._elementsById[c.id]=c}
      ;
      Q.path=function(){
        var a=arguments,c=ca(a,!0),a=Va(a,"path","","fill","none","stroke","#000"),c=b._engine.path(this,a,c);
        return this.__set__&&this.__set__.push(c),this._elementsById[c.id]=c}
      ;
      Q.image=function(){
        var a=arguments,c=ca(a,!0),a=Va(a,"src","about:blank","x",0,"y",0,"width",0,"height",0);
        out=b._engine.image(this,a,c);
        return this.__set__&&this.__set__.push(out),this._elementsById[out.id]=out}
      ;
      Q.text=function(){
        var a=arguments,c=ca(a,!0),a=Va(a,
"x",0,"y",0,"text","","stroke","none","fill","#000","text-anchor","middle","vertical-align","middle"),c=b._engine.text(this,a,c);
        return this.__set__&&this.__set__.push(c),this._elementsById[c.id]=c}
      ;
      Q.set=function(a){
        !b.is(a,"array")&&(a=w.call(arguments,0,arguments.length));
        var c=new Lc(a);
        this.__set__&&this.__set__.push(c);
        return c}
      ;
      Q.setStart=function(a){
        this.__set__=a||this.set()}
      ;
      Q.setFinish=function(a){
        a=this.__set__;
        delete this.__set__;
        return a}
      ;
      Q.setSize=function(a,c){
        return b._engine.setSize.call(this,
a,c)}
      ;
      Q.setViewBox=function(a,c,f,s,d){
        return b._engine.setViewBox.call(this,a,c,f,s,d)}
      ;
      Q.top=Q.bottom=null;
      Q.raphael=b;
      Q.getElementByPoint=function(a,b){
        var c,f,s=this.canvas,d=v.doc.elementFromPoint(a,b);
        if(v.win.opera&&"svg"==d.tagName){
          f=s.getBoundingClientRect();
          c=s.ownerDocument;
          var z=c.body,A=c.documentElement;
          c=f.top+(v.win.pageYOffset||A.scrollTop||z.scrollTop)-(A.clientTop||z.clientTop||0);
          f=f.left+(v.win.pageXOffset||A.scrollLeft||z.scrollLeft)-(A.clientLeft||z.clientLeft||0);
          z=s.createSVGRect();
          
z.x=a-f;
          z.y=b-c;
          z.width=z.height=1;
          c=s.getIntersectionList(z,null);
          c.length&&(d=c[c.length-1])}
        if(!d)return null;
        for(;
        d.parentNode&&d!=s.parentNode&&!d.raphael;
        )d=d.parentNode;
        d==this.canvas.parentNode&&(d=s);
        return d=d&&d.raphael?this.getById(d.raphaelid):null}
      ;
      Q.getElementsByBBox=function(a){
        var c=this.set();
        this.forEach(function(f){
          b.isBBoxIntersect(f.getBBox(),a)&&c.push(f)}
        );
        return c}
      ;
      Q.getById=function(a){
        return this._elementsById[a]||null}
      ;
      Q.forEach=function(a,b){
        for(var c=this.bottom;
        c&&!1!==
a.call(b,c);
        )c=c.next;
        return this}
      ;
      Q.getElementsByPoint=function(a,b){
        var c=this.set();
        this.forEach(function(f){
          f.isPointInside(a,b)&&c.push(f)}
        );
        return c}
      ;
      Ja.isPointInside=function(a,c){
        var f=this.realPath=this.realPath||na[this.type](this),s;
        return b.isPointInsidePath((s=this.attr("transform"))&&s.length&&b.transformPath(f,s)||f,a,c)}
      ;
      Ja.getBBox=function(a){
        if(this.removed)return{
          }
        ;
        var b=this._;
        if(a){
          if(b.dirty||!b.bboxwt)this.realPath=na[this.type](this),b.bboxwt=vb(this.realPath),b.bboxwt.toString=
U,b.dirty=0;
          return b.bboxwt}
        if(b.dirty||b.dirtyT||!b.bbox){
          if(b.dirty||!this.realPath)b.bboxwt=0,this.realPath=na[this.type](this);
          b.bbox=vb(Xa(this.realPath,this.matrix));
          b.bbox.toString=U;
          b.dirty=b.dirtyT=0}
        return b.bbox}
      ;
      Ja.clone=function(){
        if(this.removed)return null;
        var a=this.paper[this.type]().attr(this.attr());
        this.__set__&&this.__set__.push(a);
        return a}
      ;
      Ja.glow=function(a){
        if("text"==this.type)return null;
        a=a||{
          }
        ;
        var b=(a.width||10)+(+this.attr("stroke-width")||1),c=a.fill||!1,f=a.opacity||
.5,s=a.offsetx||0,d=a.offsety||0;
        a=a.color||"#000";
        for(var z=b/2,A=this.paper,m=A.set(),r=this.realPath||na[this.type](this),r=this.matrix?Xa(r,this.matrix):r,O=1;
        O<z+1;
        O++)m.push(A.path(r).attr({
          stroke:a,fill:c?a:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(b/z*O).toFixed(3),opacity:+(f/z).toFixed(3)}
        ));
        return m.insertBefore(this).translate(s,d)}
      ;
      var dd=function(a,f,s,d,z,A,m,r,O){
        return null==O?c(a,f,s,d,z,A,m,r):b.findDotsAtSegment(a,f,s,d,z,A,m,r,p(a,f,s,d,z,A,m,
r,O))}
      ,ed=function(a,c){
        return function(f,d,z){
          f=s(f);
          for(var A,m,r,O,e="",g={
            }
          ,h=0,X=0,H=f.length;
          X<H;
          X++){
            r=f[X];
            if("M"==r[0])A=+r[1],m=+r[2];
            else{
              O=dd(A,m,r[1],r[2],r[3],r[4],r[5],r[6]);
              if(h+O>d){
                if(c&&!g.start){
                  A=dd(A,m,r[1],r[2],r[3],r[4],r[5],r[6],d-h);
                  e+=["C"+A.start.x,A.start.y,A.m.x,A.m.y,A.x,A.y];
                  if(z)return e;
                  g.start=e;
                  e=["M"+A.x,A.y+"C"+A.n.x,A.n.y,A.end.x,A.end.y,r[5],r[6]].join();
                  h+=O;
                  A=+r[5];
                  m=+r[6];
                  continue}
                if(!a&&!c)return A=dd(A,m,r[1],r[2],r[3],r[4],r[5],r[6],d-h),{
                  x:A.x,y:A.y,
alpha:A.alpha}
                }
              h+=O;
              A=+r[5];
              m=+r[6]}
            e+=r.shift()+r}
          g.end=e;
          A=a?h:c?g:b.findDotsAtSegment(A,m,r[0],r[1],r[2],r[3],r[4],r[5],1);
          A.alpha&&(A={
            x:A.x,y:A.y,alpha:A.alpha}
          );
          return A}
        }
      ,Xc=ed(1),qd=ed(),fd=ed(0,1);
      b.getTotalLength=Xc;
      b.getPointAtLength=qd;
      b.getSubpath=function(a,b,c){
        if(1E-6>this.getTotalLength(a)-c)return fd(a,b).end;
        a=fd(a,c,1);
        return b?fd(a,b).end:a}
      ;
      Ja.getTotalLength=function(){
        if("path"==this.type)return this.node.getTotalLength?this.node.getTotalLength():Xc(this.attrs.path)}
      ;
      Ja.getPointAtLength=
function(a){
        if("path"==this.type)return qd(this.attrs.path,a)}
      ;
      Ja.getSubpath=function(a,c){
        if("path"==this.type)return b.getSubpath(this.attrs.path,a,c)}
      ;
      var Ya=b.easing_formulas={
        linear:function(a){
          return a}
        ,"<":function(a){
          return va(a,1.7)}
        ,">":function(a){
          return va(a,.48)}
        ,"<>":function(a){
          var b=.48-a/1.04,c=ha(.1734+b*b);
          a=c-b;
          a=va(xa(a),1/3)*(0>a?-1:1);
          b=-c-b;
          b=va(xa(b),1/3)*(0>b?-1:1);
          a=a+b+.5;
          return 3*(1-a)*a*a+a*a*a}
        ,backIn:function(a){
          return a*a*(2.70158*a-1.70158)}
        ,backOut:function(a){
          --a;
          
return a*a*(2.70158*a+1.70158)+1}
        ,elastic:function(a){
          return a==!!a?a:va(2,-10*a)*Na(2*(a-.075)*ka/.3)+1}
        ,bounce:function(a){
          a<1/2.75?a*=7.5625*a:a<2/2.75?(a-=1.5/2.75,a=7.5625*a*a+.75):a<2.5/2.75?(a-=2.25/2.75,a=7.5625*a*a+.9375):(a-=2.625/2.75,a=7.5625*a*a+.984375);
          return a}
        }
      ;
      Ya.easeIn=Ya["ease-in"]=Ya["<"];
      Ya.easeOut=Ya["ease-out"]=Ya[">"];
      Ya.easeInOut=Ya["ease-in-out"]=Ya["<>"];
      Ya["back-in"]=Ya.backIn;
      Ya["back-out"]=Ya.backOut;
      var Oa=[],od=e.requestAnimationFrame||e.webkitRequestAnimationFrame||
e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(a){
        setTimeout(a,16)}
      ,cb=function(){
        for(var a=+new Date,c=0;
        c<Oa.length;
        c++){
          var f=Oa[c];
          if(!f.el.removed&&!f.paused){
            var s=a-f.start,z=f.ms,A=f.easing,m=f.from,r=f.diff,O=f.to,e=f.el,g={
              }
            ,h,X={
              }
            ,H;
            f.initstatus?(s=(f.initstatus*f.anim.top-f.prev)/(f.percent-f.prev)*z,f.status=f.initstatus,delete f.initstatus,f.stop&&Oa.splice(c--,1)):f.status=(f.prev+s/z*(f.percent-f.prev))/f.anim.top;
            if(!(0>s))if(s<z){
              var E=
A(s/z),B;
              for(B in m)if(m.hasOwnProperty(B)){
                switch(M[B]){
                  case P:h=+m[B]+E*z*r[B];
                  break;
                  case "colour":h="rgb("+[gd(Sa(m[B].r+E*z*r[B].r)),gd(Sa(m[B].g+E*z*r[B].g)),gd(Sa(m[B].b+E*z*r[B].b))].join()+")";
                  break;
                  case "path":h=[];
                  s=0;
                  for(A=m[B].length;
                  s<A;
                  s++){
                    h[s]=[m[B][s][0]];
                    O=1;
                    for(X=m[B][s].length;
                    O<X;
                    O++)h[s][O]=(+m[B][s][O]+E*z*r[B][s][O]).toFixed(4);
                    h[s]=h[s].join(" ")}
                  h=h.join(" ");
                  break;
                  case "transform":if(r[B].real)for(h=[],s=0,A=m[B].length;
                  s<A;
                  s++)for(h[s]=[m[B][s][0]],O=1,X=m[B][s].length;
                  O<
X;
                  O++)h[s][O]=m[B][s][O]+E*z*r[B][s][O];
                  else h=function(a){
                    return+m[B][a]+E*z*r[B][a]}
                  ,h=[["m",h(0),h(1),h(2),h(3),h(4),h(5)]];
                  break;
                  case "csv":if("clip-rect"==B)for(h=[],s=4;
                  s--;
                  )h[s]=+m[B][s]+E*z*r[B][s];
                  break;
                  default:for(A=[].concat(m[B]),h=[],s=e.ca[B].length;
                  s--;
                  )h[s]=+A[s]+E*z*r[B][s]}
                g[B]=h}
              e.attr(g);
              (function(a,b,c){
                setTimeout(function(){
                  k("raphael.anim.frame."+a,b,c)}
                )}
              )(e.id,e,f.anim)}
            else{
              (function(a,c,f){
                setTimeout(function(){
                  k("raphael.anim.frame."+c.id,c,f);
                  k("raphael.anim.finish."+
c.id,c,f);
                  b.is(a,"function")&&a.call(c)}
                )}
              )(f.callback,e,f.anim);
              e.attr(O);
              Oa.splice(c--,1);
              if(1<f.repeat&&!f.next){
                for(H in O)O.hasOwnProperty(H)&&(X[H]=f.totalOrigin[H]);
                f.el.attr(X);
                d(f.anim,f.el,f.anim.percents[0],null,f.totalOrigin,f.repeat-1)}
              f.next&&!f.stop&&d(f.anim,f.el,f.next,null,f.totalOrigin,f.repeat)}
            }
          }
        b.svg&&e&&e.paper&&e.paper.safari();
        Oa.length&&od(cb)}
      ,gd=function(a){
        return 255<a?255:0>a?0:a}
      ;
      Ja.animateWith=function(a,c,f,s,z,A){
        if(this.removed)return A&&A.call(this),this;
        f=f instanceof
g?f:b.animation(f,s,z,A);
        d(f,this,f.percents[0],null,this.attr());
        f=0;
        for(s=Oa.length;
        f<s;
        f++)if(Oa[f].anim==c&&Oa[f].el==a){
          Oa[s-1].start=Oa[f].start;
          break}
        return this}
      ;
      Ja.onAnimation=function(a){
        a?k.on("raphael.anim.frame."+this.id,a):k.unbind("raphael.anim.frame."+this.id);
        return this}
      ;
      g.prototype.delay=function(a){
        var b=new g(this.anim,this.ms);
        b.times=this.times;
        b.del=+a||0;
        return b}
      ;
      g.prototype.repeat=function(a){
        var b=new g(this.anim,this.ms);
        b.del=this.del;
        b.times=Z.floor(Da(a,0))||1;
        return b}
      ;
      
b.animation=function(a,c,f,s){
        if(a instanceof g)return a;
        if(b.is(f,"function")||!f)s=s||f||null,f=null;
        a=Object(a);
        c=+c||0;
        var d={
          }
        ,z,A;
        for(A in a)a.hasOwnProperty(A)&&B(A)!=A&&B(A)+"%"!=A&&(z=!0,d[A]=a[A]);
        return z?(f&&(d.easing=f),s&&(d.callback=s),new g({
          100:d}
        ,c)):new g(a,c)}
      ;
      Ja.animate=function(a,c,f,s){
        if(this.removed)return s&&s.call(this),this;
        a=a instanceof g?a:b.animation(a,c,f,s);
        d(a,this,a.percents[0],null,this.attr());
        return this}
      ;
      Ja.setTime=function(a,b){
        a&&null!=b&&this.status(a,T(b,
a.ms)/a.ms);
        return this}
      ;
      Ja.status=function(a,b){
        var c=[],f=0,s,z;
        if(null!=b)return d(a,this,-1,T(b,1)),this;
        for(s=Oa.length;
        f<s;
        f++)if(z=Oa[f],z.el.id==this.id&&(!a||z.anim==a)){
          if(a)return z.status;
          c.push({
            anim:z.anim,status:z.status}
          )}
        return a?0:c}
      ;
      Ja.pause=function(a){
        for(var b=0;
        b<Oa.length;
        b++)Oa[b].el.id!=this.id||a&&Oa[b].anim!=a||!1===k("raphael.anim.pause."+this.id,this,Oa[b].anim)||(Oa[b].paused=!0);
        return this}
      ;
      Ja.resume=function(a){
        for(var b=0;
        b<Oa.length;
        b++)if(Oa[b].el.id==this.id&&
(!a||Oa[b].anim==a)){
          var c=Oa[b];
          !1!==k("raphael.anim.resume."+this.id,this,c.anim)&&(delete c.paused,this.status(c.anim,c.status))}
        return this}
      ;
      Ja.stop=function(a){
        for(var b=0;
        b<Oa.length;
        b++)Oa[b].el.id!=this.id||a&&Oa[b].anim!=a||!1!==k("raphael.anim.stop."+this.id,this,Oa[b].anim)&&Oa.splice(b--,1);
        return this}
      ;
      k.on("raphael.remove",h);
      k.on("raphael.clear",h);
      Ja.toString=function(){
        return"Raphaël’s object"}
      ;
      Ja.toFront=function(){
        if(this.removed)return this;
        var a=b._engine.getNode(this),c=this.parent,
f=this.followers,s;
        b._tofront(this,c)&&c.canvas.appendChild(a);
        a=0;
        for(c=f.length;
        a<c;
        a++)(s=f[a]).stalk&&s.el[s.stalk](this);
        return this}
      ;
      Ja.toBack=function(){
        if(this.removed)return this;
        var a=b._engine.getNode(this),c=this.parent,f=this.followers,s;
        b._toback(this,c)&&c.canvas.insertBefore(a,c.canvas.firstChild);
        a=0;
        for(c=f.length;
        a<c;
        a++)(s=f[a]).stalk&&s.el[s.stalk](this);
        return this}
      ;
      Ja.insertAfter=function(a){
        if(this.removed)return this;
        var c=b._engine.getNode(this),f=b._engine.getLastNode(a),
s=a.parent.canvas,d=this.followers,z;
        f.nextSibling?s.insertBefore(c,f.nextSibling):s.appendChild(c);
        b._insertafter(this,a,this.parent,a.parent);
        c=0;
        for(f=d.length;
        c<f;
        c++)(z=d[c]).stalk&&z.el[z.stalk](a);
        return this}
      ;
      Ja.insertBefore=function(a){
        if(this.removed)return this;
        var c=b._engine.getNode(this),f=b._engine.getNode(a),s=this.followers,d;
        a.parent.canvas.insertBefore(c,f);
        b._insertbefore(this,a,this.parent,a.parent);
        this.parent=a.parent;
        c=0;
        for(f=s.length;
        c<f;
        c++)(d=s[c]).stalk&&d.el[d.stalk](a);
        
return this}
      ;
      Ja.appendChild=function(a){
        if(this.removed||"group"!==this.type)return this;
        var c=this.followers,f,s,d;
        if(a.parent===this)return a.toFront(),this;
        s=b._engine.getNode(a);
        b._tear(a,a.parent);
        this.canvas.appendChild(s);
        a.parent=this;
        !this.bottom&&(this.bottom=a);
        a.prev=this.top;
        a.next=null;
        this.top&&(this.top.next=a);
        this.top=a;
        s=0;
        for(d=c.length;
        s<d;
        s++)(f=c[s]).stalk&&f.el[f.stalk](a);
        return this}
      ;
      Ja.removeChild=function(a){
        if(this.removed||"group"!==this.type||a.parent!==this)return this;
        
var c=b._engine.getNode(a),f=this.paper;
        b._tear(a,this);
        f.canvas.appendChild(c);
        this.parent=f;
        !f.bottom&&(f.bottom=this);
        (this.prev=f.top)&&(f.top.next=this);
        f.top=this;
        this.next=null;
        return this}
      ;
      var Lc=function(a){
        this.items=[];
        this.length=0;
        this.type="set";
        if(a)for(var b=0,c=a.length;
        b<c;
        b++)!a[b]||a[b].constructor!=Ja.constructor&&a[b].constructor!=Lc||(this[this.items.length]=this.items[this.items.length]=a[b],this.length++)}
      ,Ib=Lc.prototype;
      Ib.push=function(){
        for(var a,b,c=0,f=arguments.length;
        c<
f;
        c++)!(a=arguments[c])||a.constructor!=Ja.constructor&&a.constructor!=Lc||(b=this.items.length,this[b]=this.items[b]=a,this.length++);
        return this}
      ;
      Ib.pop=function(){
        this.length&&delete this[this.length--];
        return this.items.pop()}
      ;
      Ib.forEach=function(a,b){
        for(var c=0,f=this.items.length;
        c<f&&!1!==a.call(b,this.items[c],c);
        c++);
        return this}
      ;
      for(var jb in Ja)Ja.hasOwnProperty(jb)&&(Ib[jb]=function(a){
        return function(){
          var b=arguments;
          return this.forEach(function(c){
            c[a][L](c,b)}
          )}
        }
      (jb));
      Ib.attr=function(a,
c){
        if(a&&b.is(a,n)&&b.is(a[0],"object"))for(var f=0,s=a.length;
        f<s;
        f++)this.items[f].attr(a[f]);
        else for(f=0,s=this.items.length;
        f<s;
        f++)this.items[f].attr(a,c);
        return this}
      ;
      Ib.clear=function(){
        for(;
        this.length;
        )this.pop()}
      ;
      Ib.splice=function(a,b,c){
        a=0>a?Da(this.length+a,0):a;
        b=Da(0,T(this.length-a,isNaN(b)&&this.length||b));
        var f=[],s=[],d=[],z;
        for(z=2;
        z<arguments.length;
        z++)d.push(arguments[z]);
        for(z=0;
        z<b;
        z++)s.push(this[a+z]);
        for(;
        z<this.length-a;
        z++)f.push(this[a+z]);
        var A=d.length;
        for(z=0;
        z<
A+f.length;
        z++)this.items[a+z]=this[a+z]=z<A?d[z]:f[z-A];
        for(z=this.items.length=this.length-=b-A;
        this[z];
        )delete this[z++];
        return new Lc(s)}
      ;
      Ib.exclude=function(a){
        for(var b=0,c=this.length;
        b<c;
        b++)if(this[b]==a)return this.splice(b,1),!0}
      ;
      Ib.animate=function(a,c,f,s){
        !b.is(f,"function")&&f||(s=f||null);
        var d=this.items.length,z=d,A=this,m;
        if(!d)return this;
        s&&(m=function(){
          !--d&&s.call(A)}
        );
        f=b.is(f,"string")?f:m;
        c=b.animation(a,c,f,m);
        for(a=this.items[--z].animate(c);
        z--;
        )this.items[z]&&!this.items[z].removed&&
this.items[z].animateWith(a,c,c);
        return this}
      ;
      Ib.insertAfter=function(a){
        for(var b=this.items.length;
        b--;
        )this.items[b].insertAfter(a);
        return this}
      ;
      Ib.getBBox=function(){
        for(var a=[],b=[],c=[],f=[],s=this.items.length;
        s--;
        )if(!this.items[s].removed){
          var d=this.items[s].getBBox();
          a.push(d.x);
          b.push(d.y);
          c.push(d.x+d.width);
          f.push(d.y+d.height)}
        a=T[L](0,a);
        b=T[L](0,b);
        c=Da[L](0,c);
        f=Da[L](0,f);
        return{
          x:a,y:b,x2:c,y2:f,width:c-a,height:f-b}
        }
      ;
      Ib.clone=function(a){
        a=new Lc;
        for(var b=0,c=this.items.length;
        b<
c;
        b++)a.push(this.items[b].clone());
        return a}
      ;
      Ib.toString=function(){
        return"Raphaël‘s set"}
      ;
      Ib.glow=function(a){
        var b=this.paper.set();
        this.forEach(function(c,f){
          var s=c.glow(a);
          null!=s&&s.forEach(function(a,c){
            b.push(a)}
          )}
        );
        return b}
      ;
      b.registerFont=function(a){
        if(!a.face)return a;
        this.fonts=this.fonts||{
          }
        ;
        var b={
          w:a.w,face:{
            }
          ,glyphs:{
            }
          }
        ,c=a.face["font-family"],f;
        for(f in a.face)a.face.hasOwnProperty(f)&&(b.face[f]=a.face[f]);
        this.fonts[c]?this.fonts[c].push(b):this.fonts[c]=[b];
        if(!a.svg){
          b.face["units-per-em"]=
ga(a.face["units-per-em"],10);
          for(var s in a.glyphs)if(a.glyphs.hasOwnProperty(s)&&(c=a.glyphs[s],b.glyphs[s]={
            w:c.w,k:{
              }
            ,d:c.d&&"M"+c.d.replace(/[mlcxtrv]/g,function(a){
              return{
                l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}
              [a]||"M"}
            )+"z"}
          ,c.k))for(var d in c.k)c.hasOwnProperty(d)&&(b.glyphs[s].k[d]=c.k[d])}
        return a}
      ;
      Q.getFont=function(a,c,f,s){
        s=s||"normal";
        f=f||"normal";
        c=+c||{
          normal:400,bold:700,lighter:300,bolder:800}
        [c]||400;
        if(b.fonts){
          var d=b.fonts[a];
          if(!d){
            a=new RegExp("(^|\\s)"+a.replace(/[^\w\d\s+!~.:_-]/g,
"")+"(\\s|$)","i");
            for(var z in b.fonts)if(b.fonts.hasOwnProperty(z)&&a.test(z)){
              d=b.fonts[z];
              break}
            }
          var A;
          if(d)for(z=0,a=d.length;
          z<a&&(A=d[z],A.face["font-weight"]!=c||A.face["font-style"]!=f&&A.face["font-style"]||A.face["font-stretch"]!=s);
          z++);
          return A}
        }
      ;
      Q.print=function(a,c,f,s,d,z,A){
        z=z||"middle";
        A=Da(T(A||0,1),-1);
        var m=r(f).split(""),O=0,e=0,g="";
        b.is(s,f)&&(s=this.getFont(s));
        if(s){
          f=(d||16)/s.face["units-per-em"];
          var h=s.face.bbox.split(ab);
          d=+h[0];
          var X=h[3]-h[1],H=0;
          z=+h[1]+("baseline"==
z?X+ +s.face.descent:X/2);
          for(var h=0,B=m.length;
          h<B;
          h++){
            if("\n"==m[h])e=n=O=0,H+=X;
            else var E=e&&s.glyphs[m[h-1]]||{
              }
            ,n=s.glyphs[m[h]],O=O+(e?(E.w||s.w)+(E.k&&E.k[m[h]]||0)+s.w*A:0),e=1;
            n&&n.d&&(g+=b.transformPath(n.d,["t",O*f,H*f,"s",f,f,d,z,"t",(a-d)/f,(c-z)/f]))}
          }
        return this.path(g).attr({
          fill:"#000",stroke:"none"}
        )}
      ;
      Q.add=function(a){
        if(b.is(a,"array"))for(var c=this.set(),f=0,s=a.length,d;
        f<s;
        f++)d=a[f]||{
          }
        ,ya.hasOwnProperty(d.type)&&c.push(this[d.type]().attr(d));
        return c}
      ;
      b.format=function(a,
c){
        var f=b.is(c,n)?[0].concat(c):arguments;
        a&&b.is(a,"string")&&f.length-1&&(a=a.replace(Ea,function(a,b){
          return null==f[++b]?"":f[b]}
        ));
        return a||""}
      ;
      b.fullfill=function(){
        var a=/\{
          ([^\}
        ]+)\}
      /g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,c=function(a,c,f){
        var s=f;
        c.replace(b,function(a,b,c,f,d){
          b=b||f;
          s&&(b in s&&(s=s[b]),"function"==typeof s&&d&&(s=s()))}
        );
        return s=(null==s||s==f?a:s)+""}
      ;
      return function(b,f){
        return String(b).replace(a,function(a,b){
          return c(a,b,f)}
        )}
      }
    ();
    b.ninja=
function(){
      oa?v.win.Raphael=ea:delete Raphael;
      return b}
    ;
    var bb=b.vml&&.5||0;
    b.crispBound=rb(function(a,b,c,f,s){
      var d={
        }
      ,z;
      a=a||0;
      b=b||0;
      c=c||0;
      f=f||0;
      s=s||0;
      z=s%2/2+bb;
      d.x=Sa(a+z)-z;
      d.y=Sa(b+z)-z;
      d.width=Sa(a+c+z)-z-d.x;
      d.height=Sa(b+f+z)-z-d.y;
      d["stroke-width"]=s;
      0===d.width&&0!==c&&(d.width=1);
      0===d.height&&0!==f&&(d.height=1);
      return d}
    ,b);
    Ja.crisp=function(){
      var a=this.attrs,c,f=this.attr(["x","y","width","height","stroke-width"]),f=b.crispBound(f.x,f.y,f.width,f.height,f["stroke-width"]);
      for(c in f)a[c]===
f[c]&&delete f[c];
      return this.attr(f)}
    ;
    b.st=Ib;
    b.define=function(a,c,f,s,d,z){
      var A;
      if(b.is(a,n))for(z=0,A=a.length;
      z<A;
      z++)b.define(a[z]);
      else if(b.is(a,"object"))b.define(a.name,a[a.name],a.ca,a.fn,a.e,a.data);
      else if(a&&!b.fn[a])return b.fn[a]=function(){
        var z=arguments,A=c.apply(this,z),m;
        if(s&&b.is(s,"object"))for(m in s)A[m]=s[m];
        if(d&&b.is(d,"object"))for(m in d)A[m]&&A[m](d[m]);
        if(f){
          if(b.is(f,"function"))A.ca[a]=f;
          else for(m in f)A.ca[m]=f[m];
          A.ca[a]&&(b._lastArgIfGroup(z,!0),A.attr(a,C.call(z)))}
        return A}
      ,
f&&(b.fn[a].ca=f),s&&(b.fn[a].fn=s),d&&(b.fn[a].e=d),z&&(b.fn[a].data=z),b.fn[a]}
    ;
    (function(a,c,f){
      function s(){
        /in/.test(a.readyState)?setTimeout(s,9):b.eve("raphael.DOMload")}
      null==a.readyState&&a.addEventListener&&(a.addEventListener(c,f=function(){
        a.removeEventListener(c,f,!1);
        a.readyState="complete"}
      ,!1),a.readyState="loading");
      s()}
    )(document,"DOMContentLoaded");
    k.on("raphael.DOMload",function(){
      l=!0}
    );
    (function(){
      if(b.svg){
        var a=String,c=parseFloat,f=parseInt,s=Math,d=s.max,z=s.abs,A=s.pow,
m=s.sqrt,r=/[, ]+/,O=!(!/AppleWebKit/.test(b._g.win.navigator.userAgent)||/Chrome/.test(b._g.win.navigator.userAgent)&&!(29>b._g.win.navigator.appVersion.match(/Chrome\/(\d+)\./)[1])),e=b.eve,g={
          block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"}
        ,h={
          }
        ;
        b.toString=function(){
          return"Your browser supports SVG.\nYou are running Raphaël "+this.version}
        ;
        b._url="";
        var X=function(a,b){
          var c=
a.gradient;
          if(c){
            if(c===b)return;
            c.refCount--;
            c.refCount||c.parentNode.removeChild(c);
            delete a.gradient}
          b&&(a.gradient=b,b.refCount++)}
        ,H=b._createNode=function(c,f){
          if(f){
            "string"==typeof c&&(c=H(c));
            for(var s in f)f.hasOwnProperty(s)&&("xlink:"==s.substring(0,6)?c.setAttributeNS("http://www.w3.org/1999/xlink",s.substring(6),a(f[s])):c.setAttribute(s,a(f[s])))}
          else c=b._g.doc.createElementNS("http://www.w3.org/2000/svg",c);
          return c}
        ,B={
          userSpaceOnUse:"userSpaceOnUse",objectBoundingBox:"objectBoundingBox"}
        ,
E={
          pad:"pad",redlect:"reflect",repeat:"repeat"}
        ,n=function(f,r){
          if(!f.paper||!f.paper.defs)return 0;
          var O="linear",e=f.paper,g=(e.id+"-"+r).replace(/[\(\)\s%:,\xb0#]/g,"_"),h=.5,n=.5,Ia,l,I,G,K,M=f.node,k=M.style,p=b._g.doc.getElementById(g);
          if(!p){
            r=a(r).replace(b._radial_gradient,function(a,b){
              O="radial";
              b=b&&b.split(",")||[];
              G=b[5];
              K=b[6];
              var f=b[0],s=b[1],d=b[2],z=b[3],r=b[4],e=f&&s,g;
              d&&(Ia=/\%/.test(d)?d:c(d));
              if(G===B.userSpaceOnUse)return e&&(h=f,n=s),z&&r&&(l=z,I=r,e||(h=l,n=I)),"";
              e&&(h=
c(f),n=c(s),f=2*(.5<n)-1,.25<(g=A(h-.5,2))+A(n-.5,2)&&.25>g&&(n=m(.25-g)*f+.5)&&.5!==n&&(n=n.toFixed(5)-1E-5*f));
              z&&r&&(l=c(z),I=c(r),f=2*(.5<I)-1,.25<(g=A(l-.5,2))+A(I-.5,2)&&.25>g&&(I=m(.25-g)*f+.5)&&.5!==I&&(I=I.toFixed(5)-1E-5*f),e||(h=l,n=I));
              return""}
            );
            r=r.split(/\s*\-\s*/);
            if("linear"==O){
              var p=r.shift(),w=p.match(/\((.*)\)/),aa,w=w&&w[1]&&w[1].split(/\s*\,\s*/),p=-c(p);
              if(isNaN(p))return null;
              w&&w.length?(w[0]in B?(G=w.shift(),w[0]in E&&(K=w.shift())):(w[4]&&(G=w[4]),w[5]&&(K=w[5])),aa=[w[0]||
"0%",w[1]||"0%",w[2]||"100%",w[3]||"0%"]):(aa=[0,0,s.cos(b.rad(p)),s.sin(b.rad(p))],p=1/(d(z(aa[2]),z(aa[3]))||1),aa[2]*=p,aa[3]*=p,0>aa[2]&&(aa[0]=-aa[2],aa[2]=0),0>aa[3]&&(aa[1]=-aa[3],aa[3]=0))}
            w=b._parseDots(r);
            if(!w)return null;
            p=H(O+"Gradient",{
              id:g}
            );
            p.refCount=0;
            G in B&&p.setAttribute("gradientUnits",a(G));
            K in E&&p.setAttribute("spreadMethod",a(K));
            "radial"===O?(void 0!==Ia&&p.setAttribute("r",a(Ia)),void 0!==l&&void 0!==I&&(p.setAttribute("cx",a(l)),p.setAttribute("cy",a(I))),p.setAttribute("fx",
a(h)),p.setAttribute("fy",a(n))):H(p,{
              x1:aa[0],y1:aa[1],x2:aa[2],y2:aa[3]}
            );
            aa=0;
            for(var ac=w.length;
            aa<ac;
            aa++)p.appendChild(H("stop",{
              offset:w[aa].offset?w[aa].offset:aa?"100%":"0%","stop-color":w[aa].color||"#fff","stop-opacity":void 0===w[aa].opacity?1:w[aa].opacity}
            ));
            e.defs.appendChild(p)}
          X(f,p);
          H(M,{
            fill:"url('"+b._url+"#"+g+"')",opacity:1,"fill-opacity":1}
          );
          k.fill="";
          k.opacity=1;
          return k.fillOpacity=1}
        ,Ia=function(a){
          var b=a.getBBox(1);
          H(a.pattern,{
            patternTransform:a.matrix.invert()+" translate("+
b.x+","+b.y+")"}
          )}
        ,l=function(c,f,s){
          if("path"==c.type){
            for(var d=a(f).toLowerCase().split("-"),z=c.paper,A=s?"end":"start",m=c.node,r=c.attrs,O=r["stroke-width"],e=d.length,X="classic",B,E,n=3,l=3,Ia=5;
            e--;
            )switch(d[e]){
              case "block":case "classic":case "oval":case "diamond":case "open":case "none":X=d[e];
              break;
              case "wide":l=5;
              break;
              case "narrow":l=2;
              break;
              case "long":n=5;
              break;
              case "short":n=2}
            "open"==X?(n+=2,l+=2,Ia+=2,B=1,E=s?4:1,d={
              fill:"none",stroke:r.stroke}
            ):(E=B=n/2,d={
              fill:r.stroke,stroke:"none"}
            );
            
c._.arrows?s?(c._.arrows.endPath&&h[c._.arrows.endPath]--,c._.arrows.endMarker&&h[c._.arrows.endMarker]--):(c._.arrows.startPath&&h[c._.arrows.startPath]--,c._.arrows.startMarker&&h[c._.arrows.startMarker]--):c._.arrows={
              }
            ;
            if("none"!=X){
              var e="raphael-marker-"+X,I="raphael-marker-"+A+X+n+l+"-obj"+c.id;
              b._g.doc.getElementById(e)?h[e]++:(z.defs.appendChild(H(H("path"),{
                "stroke-linecap":"round",d:g[X],id:e}
              )),h[e]=1);
              var G=b._g.doc.getElementById(I);
              G?(h[I]++,n=G.getElementsByTagName("use")[0]):(G=H(H("marker"),
{
                id:I,markerHeight:l,markerWidth:n,orient:"auto",refX:E,refY:l/2}
              ),n=H(H("use"),{
                "xlink:href":"#"+e,transform:(s?"rotate(180 "+n/2+" "+l/2+") ":"")+"scale("+n/Ia+","+l/Ia+")","stroke-width":(1/((n/Ia+l/Ia)/2)).toFixed(4)}
              ),G.appendChild(n),z.defs.appendChild(G),h[I]=1);
              H(n,d);
              z=B*("diamond"!=X&&"oval"!=X);
              s?(s=c._.arrows.startdx*O||0,O=b.getTotalLength(r.path)-z*O):(s=z*O,O=b.getTotalLength(r.path)-(c._.arrows.enddx*O||0));
              d={
                }
              ;
              d["marker-"+A]="url('"+b._url+"#"+I+"')";
              if(O||s)d.d=b.getSubpath(r.path,
s,O);
              H(m,d);
              c._.arrows[A+"Path"]=e;
              c._.arrows[A+"Marker"]=I;
              c._.arrows[A+"dx"]=z;
              c._.arrows[A+"Type"]=X;
              c._.arrows[A+"String"]=f}
            else s?(s=c._.arrows.startdx*O||0,O=b.getTotalLength(r.path)-s):(s=0,O=b.getTotalLength(r.path)-(c._.arrows.enddx*O||0)),c._.arrows[A+"Path"]&&H(m,{
              d:b.getSubpath(r.path,s,O)}
            ),delete c._.arrows[A+"Path"],delete c._.arrows[A+"Marker"],delete c._.arrows[A+"dx"],delete c._.arrows[A+"Type"],delete c._.arrows[A+"String"];
            for(d in h)h.hasOwnProperty(d)&&!h[d]&&(c=b._g.doc.getElementById(d))&&
c.parentNode.removeChild(c)}
          }
        ,I={
          "":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]}
        ,G=function(c,f,s){
          var d=I[a(f).toLowerCase()],z,A;
          if(f=d||void 0!==f&&[].concat(f)){
            z=c.attrs["stroke-width"]||1;
            s={
              round:z,square:z,butt:0}
            [c.attrs["stroke-linecap"]||s["stroke-linecap"]]||0;
            A=f.length;
            z=d?z:1;
            for(d=[];
            A--;
            )d[A]=f[A]*z+(A%2?1:-1)*s,0>d[A]&&(d[A]=0);
            b.is(f,"array")&&H(c.node,{
              "stroke-dasharray":d.join(",")}
            )}
          }
        ,
K=function(a,b){
          for(var c in b)e("raphael.attr."+c+"."+a.id,a,b[c],c),a.ca[c]&&a.attr(c,b[c])}
        ,M=b._setFillAndStroke=function(c,s){
          if(c.paper.canvas){
            var A=c.node,m=c.attrs,e=c.paper,g=A.style,h=g.visibility;
            g.visibility="hidden";
            for(var B in s)if(s.hasOwnProperty(B)&&b._availableAttrs.hasOwnProperty(B)){
              var E=s[B];
              m[B]=E;
              switch(B){
                case "blur":c.blur(E);
                break;
                case "href":case "title":case "target":var I=A.parentNode;
                if("a"!=I.tagName.toLowerCase()){
                  if(""==E)break;
                  var K=H("a");
                  K.raphael=!0;
                  K.raphaelid=
A.raphaelid;
                  I.insertBefore(K,A);
                  K.appendChild(A);
                  I=K}
                "target"==B?I.setAttributeNS("http://www.w3.org/1999/xlink","show","blank"==E?"new":E):I.setAttributeNS("http://www.w3.org/1999/xlink",B,E);
                A.titleNode=I;
                break;
                case "cursor":g.cursor=E;
                break;
                case "transform":c.transform(E);
                break;
                case "rotation":b.is(E,"array")?c.rotate.apply(c,E):c.rotate(E);
                break;
                case "arrow-start":l(c,E);
                break;
                case "arrow-end":l(c,E,1);
                break;
                case "clip-path":var p=!0;
                case "clip-rect":I=!p&&a(E).split(r);
                c._.clipispath=!!p;
                if(p||
4==I.length){
                  c.clip&&c.clip.parentNode.parentNode.removeChild(c.clip.parentNode);
                  var K=H("clipPath"),M=H(p?"path":"rect");
                  K.id=b.createUUID();
                  H(M,p?{
                    d:E?m["clip-path"]=b._pathToAbsolute(E):b._availableAttrs.path,fill:"none"}
                  :{
                    x:I[0],y:I[1],width:I[2],height:I[3],transform:c.matrix.invert()}
                  );
                  K.appendChild(M);
                  e.defs.appendChild(K);
                  H(A,{
                    "clip-path":"url('"+b._url+"#"+K.id+"')"}
                  );
                  c.clip=M}
                !E&&(E=A.getAttribute("clip-path"))&&((E=b._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g,"")))&&E.parentNode.removeChild(E),
H(A,{
                  "clip-path":""}
                ),delete c.clip);
                break;
                case "path":"path"==c.type&&(H(A,{
                  d:E?m.path=b._pathToAbsolute(E):b._availableAttrs.path}
                ),c._.dirty=1,c._.arrows&&("startString"in c._.arrows&&l(c,c._.arrows.startString),"endString"in c._.arrows&&l(c,c._.arrows.endString,1)));
                break;
                case "width":if(A.setAttribute(B,E),c._.dirty=1,m.fx)B="x",E=m.x;
                else break;
                case "x":m.fx&&(E=-m.x-(m.width||0));
                case "rx":if("rx"==B&&"rect"==c.type)break;
                case "cx":A.setAttribute(B,E);
                c.pattern&&Ia(c);
                c._.dirty=1;
                break;
                case "height":if(A.setAttribute(B,
E),c._.dirty=1,m.fy)B="y",E=m.y;
                else break;
                case "y":m.fy&&(E=-m.y-(m.height||0));
                case "ry":if("ry"==B&&"rect"==c.type)break;
                case "cy":A.setAttribute(B,E);
                c.pattern&&Ia(c);
                c._.dirty=1;
                break;
                case "r":"rect"==c.type?H(A,{
                  rx:E,ry:E}
                ):A.setAttribute(B,E);
                c._.dirty=1;
                break;
                case "src":"image"==c.type&&A.setAttributeNS("http://www.w3.org/1999/xlink","href",E);
                break;
                case "stroke-width":if(1!=c._.sx||1!=c._.sy)E/=d(z(c._.sx),z(c._.sy))||1;
                e._vbSize&&(E*=e._vbSize);
                O&&0===E&&(E=1E-6);
                A.setAttribute(B,E);
                m["stroke-dasharray"]&&
G(c,m["stroke-dasharray"],s);
                c._.arrows&&("startString"in c._.arrows&&l(c,c._.arrows.startString),"endString"in c._.arrows&&l(c,c._.arrows.endString,1));
                break;
                case "stroke-dasharray":G(c,E,s);
                break;
                case "fill":var aa=a(E).match(b._ISURL);
                if(aa){
                  var K=H("pattern"),k=H("image");
                  K.id=b.createUUID();
                  H(K,{
                    x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}
                  );
                  H(k,{
                    x:0,y:0,"xlink:href":aa[1]}
                  );
                  K.appendChild(k);
                  (function(a){
                    b._preload(aa[1],function(){
                      var b=this.offsetWidth,c=this.offsetHeight;
                      H(a,{
                        width:b,
height:c}
                      );
                      H(k,{
                        width:b,height:c}
                      );
                      e.safari()}
                    )}
                  )(K);
                  e.defs.appendChild(K);
                  g.fill="url('"+b._url+"#"+K.id+"')";
                  H(A,{
                    fill:g.fill}
                  );
                  c.pattern=K;
                  c.pattern&&Ia(c);
                  break}
                I=b.getRGB(E);
                if(!I.error)delete s.gradient,delete m.gradient,!b.is(m.opacity,"undefined")&&b.is(s.opacity,"undefined")&&H(A,{
                  opacity:m.opacity}
                ),!b.is(m["fill-opacity"],"undefined")&&b.is(s["fill-opacity"],"undefined")&&H(A,{
                  "fill-opacity":m["fill-opacity"]}
                ),c.gradient&&X(c);
                else if(("circle"==c.type||"ellipse"==c.type||"r"!=a(E).charAt())&&
n(c,E)){
                  if("opacity"in m||"fill-opacity"in m)if(I=b._g.doc.getElementById(A.getAttribute("fill").replace(/^url\(#|\)$/g,"")))I=I.getElementsByTagName("stop"),H(I[I.length-1],{
                    "stop-opacity":("opacity"in m?m.opacity:1)*("fill-opacity"in m?m["fill-opacity"]:1)}
                  );
                  m.gradient=E;
                  m.fill="none";
                  g.fill="";
                  break}
                I.hasOwnProperty("opacity")?(H(A,{
                  "fill-opacity":g.fillOpacity=1<I.opacity?I.opacity/100:I.opacity}
                ),c._.fillOpacityDirty=!0):c._.fillOpacityDirty&&b.is(m["fill-opacity"],"undefined")&&b.is(s["fill-opacity"],
"undefined")&&(A.removeAttribute("fill-opacity"),g.fillOpacity="",delete c._.fillOpacityDirty);
                case "stroke":I=b.getRGB(E);
                A.setAttribute(B,I.hex);
                g[B]=I.hex;
                "stroke"==B&&(I.hasOwnProperty("opacity")?(H(A,{
                  "stroke-opacity":g.strokeOpacity=1<I.opacity?I.opacity/100:I.opacity}
                ),c._.strokeOpacityDirty=!0):c._.strokeOpacityDirty&&b.is(m["stroke-opacity"],"undefined")&&b.is(s["stroke-opacity"],"undefined")&&(A.removeAttribute("stroke-opacity"),g.strokeOpacity="",delete c._.strokeOpacityDirty),c._.arrows&&
("startString"in c._.arrows&&l(c,c._.arrows.startString),"endString"in c._.arrows&&l(c,c._.arrows.endString,1)));
                break;
                case "gradient":"circle"!=c.type&&"ellipse"!=c.type&&"r"==a(E).charAt()||n(c,E);
                break;
                case "line-height":case "vertical-align":break;
                case "visibility":"hidden"===E?c.hide():c.show();
                break;
                case "opacity":m.gradient&&!m.hasOwnProperty("stroke-opacity")&&H(A,{
                  "stroke-opacity":1<E?E/100:E}
                );
                case "fill-opacity":if(m.gradient){
                  if(I=b._g.doc.getElementById(A.getAttribute("fill").replace(/^url\(#|\)$/g,
"")))I=I.getElementsByTagName("stop"),H(I[I.length-1],{
                    "stop-opacity":E}
                  );
                  break}
                default:"font-size"==B&&(E=f(E,10)+"px"),I=B.replace(/(\-.)/g,function(a){
                  return a.substring(1).toUpperCase()}
                ),g[I]=E,c._.dirty=1,A.setAttribute(B,E)}
              }
            "text"===c.type&&w(c,s);
            g.visibility=h}
          }
        ,w=function(f,d){
          if("text"==f.type&&(d.hasOwnProperty("text")||d.hasOwnProperty("font")||d.hasOwnProperty("font-size")||d.hasOwnProperty("x")||d.hasOwnProperty("y")||d.hasOwnProperty("line-height")||d.hasOwnProperty("vertical-align"))){
            var z=
f.attrs,A=f.node,m=A.firstChild&&b._g.doc.defaultView.getComputedStyle(A.firstChild,""),r=m?c(b._g.doc.defaultView.getComputedStyle(A.firstChild,"").getPropertyValue("font-size")):10,O=c(d["line-height"]||z["line-height"])||1.2*r,e=z.hasOwnProperty("vertical-align")?z["vertical-align"]:"middle",g=(d.direction||(m?m.getPropertyValue("direction"):"initial")).toLowerCase(),h=!!document.documentMode;
            isNaN(O)&&(O=1.2*r);
            b.is(d.text,"array")&&(d.text=d.text.join("<br>"));
            e="top"===e?-.5:"bottom"===e?.5:
0;
            if(d.hasOwnProperty("text")&&(d.text!==z.text||f._textdirty)){
              for(z.text=d.text;
              A.firstChild;
              )A.removeChild(A.firstChild);
              for(var E=a(d.text).split(/\n|<br\s*?\/?>/ig),r=[],X=0,B=E.length;
              X<B;
              X++)m=H("tspan"),X?H(m,{
                dy:O,x:z.x}
              ):H(m,{
                dy:O*E.length*e,x:z.x}
              ),E[X]||(m.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),E[X]=" "),m.appendChild(b._g.doc.createTextNode(E[X])),A.appendChild(m),r[X]=m,!h&&"rtl"===g&&X<B-1&&(m=H("tspan"),H(m,{
                visibility:"hidden","font-size":"0px"}
              ),
m.appendChild(b._g.doc.createTextNode("i")),A.appendChild(m));
              f._textdirty=!1}
            else for(r=A.getElementsByTagName("tspan"),X=h=0,B=r.length;
            X<B;
            X++)if(m=r[X],g=m.attributes[0],!g||"visibility"!==g.name&&"visibility"!==g.nodeName||"hidden"!==g.value&&"hidden"!==g.nodeValue)X?H(m,{
              dy:O,x:z.x}
            ):(g=r[1]&&r[1].attributes[0],!g||"visibility"!==g.name&&"visibility"!==g.nodeName||"hidden"!==g.value&&"hidden"!==g.nodeValue||(h=s.floor(.5*r.length)),H(r[0],{
              dy:O*(r.length-h)*e,x:z.x}
            ));
            H(A,{
              x:z.x,y:z.y}
            );
            f._.dirty=
1;
            A=f._getBBox();
            O=z.y-(A.y+A.height/2);
            if(A.isCalculated)switch(z["vertical-align"]){
              case "top":O=.75*A.height;
              break;
              case "bottom":O=-(.25*A.height);
              break;
              default:O=z.y-(A.y+.25*A.height)}
            O&&b.is(O,"finite")&&r[0]&&H(r[0],{
              dy:O}
            )}
          }
        ,p=function(a,c,f){
          f=f||c;
          f.canvas&&f.canvas.appendChild(a);
          this.node=this[0]=a;
          a.raphael=!0;
          a.raphaelid=this.id=b._oid++;
          this.matrix=b.matrix();
          this.realPath=null;
          this.attrs=this.attrs||{
            }
          ;
          this.followers=this.followers||[];
          this.paper=c;
          this.ca=this.customAttributes=this.customAttributes||
new c._CustomAttributes;
          this._={
            transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1}
          ;
          this.parent=f;
          !f.bottom&&(f.bottom=this);
          (this.prev=f.top)&&(f.top.next=this);
          f.top=this;
          this.next=null}
        ,k=b.el;
        p.prototype=k;
        k.constructor=p;
        b._engine.getNode=function(a){
          a=a.node||a[0].node;
          return a.titleNode||a}
        ;
        b._engine.getLastNode=function(a){
          a=a.node||a[a.length-1].node;
          return a.titleNode||a}
        ;
        k.rotate=function(b,f,s){
          if(this.removed)return this;
          b=a(b).split(r);
          b.length-1&&(f=c(b[1]),s=c(b[2]));
          b=c(b[0]);
          null==s&&
(f=s);
          if(null==f||null==s)s=this.getBBox(1),f=s.x+s.width/2,s=s.y+s.height/2;
          this.transform(this._.transform.concat([["r",b,f,s]]));
          return this}
        ;
        k.scale=function(b,f,s,d){
          var z;
          if(this.removed)return this;
          b=a(b).split(r);
          b.length-1&&(f=c(b[1]),s=c(b[2]),d=c(b[3]));
          b=c(b[0]);
          null==f&&(f=b);
          null==d&&(s=d);
          if(null==s||null==d)z=this.getBBox(1);
          s=null==s?z.x+z.width/2:s;
          d=null==d?z.y+z.height/2:d;
          this.transform(this._.transform.concat([["s",b,f,s,d]]));
          return this}
        ;
        k.translate=function(b,f){
          if(this.removed)return this;
          
b=a(b).split(r);
          b.length-1&&(f=c(b[1]));
          b=c(b[0])||0;
          this.transform(this._.transform.concat([["t",b,+f||0]]));
          return this}
        ;
        k.transform=function(a){
          var c=this._;
          if(null==a)return c.transform;
          b._extractTransform(this,a);
          this.clip&&!c.clipispath&&H(this.clip,{
            transform:this.matrix.invert()}
          );
          this.pattern&&Ia(this);
          this.node&&H(this.node,{
            transform:this.matrix}
          );
          if(1!=c.sx||1!=c.sy)a=this.attrs.hasOwnProperty("stroke-width")?this.attrs["stroke-width"]:1,this.attr({
            "stroke-width":a}
          );
          return this}
        ;
        k.hide=
function(){
          !this.removed&&this.paper.safari(this.node.style.display="none");
          return this}
        ;
        k.show=function(){
          !this.removed&&this.paper.safari(this.node.style.display="");
          return this}
        ;
        k.remove=function(){
          if(!this.removed&&this.parent.canvas){
            var a=b._engine.getNode(this),c=this.paper,f=c.defs;
            c.__set__&&c.__set__.exclude(this);
            e.unbind("raphael.*.*."+this.id);
            for(this.gradient&&f&&X(this);
            f=this.followers.pop();
            )f.el.remove();
            for(;
            f=this.bottom;
            )f.remove();
            this._drag&&this.undrag();
            if(this.events)for(;
            f=
this.events.pop();
            )f.unbind();
            this.parent.canvas.removeChild(a);
            this.removeData();
            delete c._elementsById[this.id];
            b._tear(this,this.parent);
            for(f in this)this[f]="function"===typeof this[f]?b._removedFactory(f):null;
            this.removed=!0}
          }
        ;
        k._getBBox=function(){
          var a=this.node,b={
            }
          ,c=this.attrs,f,s;
          "none"===a.style.display&&(this.show(),s=!0);
          try{
            b=a.getBBox(),"text"==this.type&&(void 0===b.x&&(b.isCalculated=!0,f=c["text-anchor"],b.x=(c.x||0)-b.width*("start"===f?0:"middle"===f?.5:1)),void 0===b.y&&(b.isCalculated=
!0,f=c["vertical-align"],b.y=(c.y||0)-b.height*("bottom"===f?1:"middle"===f?.5:0)))}
          catch(d){
            }
          finally{
            b=b||{
              }
            }
          s&&this.hide();
          return b}
        ;
        k.attr=function(a,c){
          if(this.removed)return this;
          if(null==a){
            var f={
              }
            ,s;
            for(s in this.attrs)this.attrs.hasOwnProperty(s)&&(f[s]=this.attrs[s]);
            f.gradient&&"none"==f.fill&&(f.fill=f.gradient)&&delete f.gradient;
            f.transform=this._.transform;
            f.visibility="none"===this.node.style.display?"hidden":"visible";
            return f}
          if(null==c&&b.is(a,"string")){
            if("fill"==a&&"none"==this.attrs.fill&&
this.attrs.gradient)return this.attrs.gradient;
            if("transform"==a)return this._.transform;
            if("visibility"==a)return"none"===this.node.style.display?"hidden":"visible";
            var f=a.split(r),d={
              }
            ,z=0;
            for(s=f.length;
            z<s;
            z++)a=f[z],a in this.attrs?d[a]=this.attrs[a]:b.is(this.ca[a],"function")?d[a]=this.ca[a].def:d[a]=b._availableAttrs[a];
            return s-1?d:d[f[0]]}
          if(null==c&&b.is(a,"array")){
            d={
              }
            ;
            z=0;
            for(s=a.length;
            z<s;
            z++)d[a[z]]=this.attr(a[z]);
            return d}
          null!=c?(f={
            }
          ,f[a]=c):null!=a&&b.is(a,"object")&&(f=a);
          
for(z in f)e("raphael.attr."+z+"."+this.id,this,f[z],z);
          var A={
            }
          ;
          for(z in this.ca)if(this.ca[z]&&f.hasOwnProperty(z)&&b.is(this.ca[z],"function")&&!this.ca["_invoked"+z]){
            this.ca["_invoked"+z]=!0;
            s=this.ca[z].apply(this,[].concat(f[z]));
            delete this.ca["_invoked"+z];
            for(d in s)s.hasOwnProperty(d)&&(f[d]=s[d]);
            this.attrs[z]=f[z];
            !1===s&&(A[z]=f[z],delete f[z])}
          M(this,f);
          var m,z=0;
          for(s=this.followers.length;
          z<s;
          z++)m=this.followers[z],m.cb&&!m.cb.call(m.el,f,this)||m.el.attr(f);
          for(d in A)f[d]=A[d];
          
return this}
        ;
        k.blur=function(a){
          if(0!==+a){
            var c=H("filter"),f=H("feGaussianBlur");
            this.attrs.blur=a;
            c.id=b.createUUID();
            H(f,{
              stdDeviation:+a||1.5}
            );
            c.appendChild(f);
            this.paper.defs.appendChild(c);
            this._blur=c;
            H(this.node,{
              filter:"url('"+b._url+"#"+c.id+"')"}
            )}
          else this._blur&&(this._blur.parentNode.removeChild(this._blur),delete this._blur,delete this.attrs.blur),this.node.removeAttribute("filter")}
        ;
        k.on=function(a,c){
          if(this.removed)return this;
          var f=c;
          b.supportsTouch&&(a=b._touchMap[a]||"click"===
a&&"touchstart"||a,f=function(a){
            a.preventDefault();
            c()}
          );
          this.node["on"+a]=f;
          return this}
        ;
        b._engine.path=function(a,b,c){
          var f=H("path");
          a=new p(f,a,c);
          a.type="path";
          M(a,b);
          K(a,b);
          return a}
        ;
        b._engine.group=function(a,b,c){
          var f=H("g");
          a=new p(f,a,c);
          a.type="group";
          a.canvas=a.node;
          a.top=a.bottom=null;
          a._id=b||"";
          b&&f.setAttribute("class","raphael-group-"+a.id+"-"+b);
          return a}
        ;
        b._engine.circle=function(a,b,c){
          var f=H("circle");
          a=new p(f,a,c);
          a.type="circle";
          M(a,b);
          K(a,b);
          return a}
        ;
        b._engine.rect=function(a,
b,c){
          var f=H("rect");
          a=new p(f,a,c);
          a.type="rect";
          b.rx=b.ry=b.r;
          M(a,b);
          K(a,b);
          return a}
        ;
        b._engine.ellipse=function(a,b,c){
          var f=H("ellipse");
          a=new p(f,a,c);
          a.type="ellipse";
          M(a,b);
          K(a,b);
          return a}
        ;
        b._engine.image=function(a,b,c){
          var f=H("image");
          a=new p(f,a,c);
          a.type="image";
          f.setAttribute("preserveAspectRatio","none");
          M(a,b);
          K(a,b);
          return a}
        ;
        b._engine.text=function(a,b,c){
          var f=H("text");
          a=new p(f,a,c);
          a.type="text";
          a._textdirty=!0;
          M(a,b);
          K(a,b);
          return a}
        ;
        b._engine.setSize=function(a,b){
          this.width=
a||this.width;
          this.height=b||this.height;
          this.canvas.setAttribute("width",this.width);
          this.canvas.setAttribute("height",this.height);
          this._viewBox&&this.setViewBox.apply(this,this._viewBox);
          return this}
        ;
        b._engine.create=function(){
          var a=b._getContainer.apply(0,arguments),c=a&&a.container,f=a.x,s=a.y,d=a.width,a=a.height;
          if(!c)throw Error("SVG container not found.");
          var z=H("svg"),A,f=f||0,s=s||0,d=d||512,a=a||342;
          H(z,{
            height:a,version:1.1,width:d,xmlns:"http://www.w3.org/2000/svg"}
          );
          1==c?(z.style.cssText=
"overflow:hidden;
          -webkit-tap-highlight-color:rgba(0,0,0,0);
          -webkit-user-select:none;
          -moz-user-select:-moz-none;
          -khtml-user-select:none;
          -ms-user-select:none;
          user-select:none;
          -o-user-select:none;
          cursor:default;
          position:absolute;
          left:"+f+"px;
          top:"+s+"px",b._g.doc.body.appendChild(z),A=1):(z.style.cssText="overflow:hidden;
          -webkit-tap-highlight-color:rgba(0,0,0,0);
          -webkit-user-select:none;
          -moz-user-select:-moz-none;
          -khtml-user-select:none;
          -ms-user-select:none;
          user-select:none;
          -o-user-select:none;
          cursor:default;
          position:relative",
c.firstChild?c.insertBefore(z,c.firstChild):c.appendChild(z));
          c=new b._Paper;
          c.width=d;
          c.height=a;
          c.canvas=z;
          H(z,{
            id:"raphael-paper-"+c.id}
          );
          c.clear();
          c._left=c._top=0;
          A&&(c.renderfix=function(){
            }
          );
          c.renderfix();
          return c}
        ;
        b._engine.setViewBox=function(a,b,c,f,s){
          e("raphael.setViewBox",this,this._viewBox,[a,b,c,f,s]);
          var z=d(c/this.width,f/this.height),A=this.top,m=s?"meet":"xMinYMin",r;
          null==a?(this._vbSize&&(z=1),delete this._vbSize,r="0 0 "+this.width+" "+this.height):(this._vbSize=z,r=a+" "+b+
" "+c+" "+f);
          for(H(this.canvas,{
            viewBox:r,preserveAspectRatio:m}
          );
          z&&A;
          )m="stroke-width"in A.attrs?A.attrs["stroke-width"]:1,A.attr({
            "stroke-width":m}
          ),A._.dirty=1,A._.dirtyT=1,A=A.prev;
          this._viewBox=[a,b,c,f,!!s];
          return this}
        ;
        b.prototype.renderfix=function(){
          var a=this.canvas,b=a.style,c;
          try{
            c=a.getScreenCTM()||a.createSVGMatrix()}
          catch(f){
            c=a.createSVGMatrix()}
          a=-c.e%1;
          c=-c.f%1;
          if(a||c)a&&(this._left=(this._left+a)%1,b.left=this._left+"px"),c&&(this._top=(this._top+c)%1,b.top=this._top+"px")}
        ;
        b.prototype._desc=
function(a){
          var c=this.desc;
          if(c)for(;
          c.firstChild;
          )c.removeChild(c.firstChild);
          else this.desc=c=H("desc"),this.canvas.appendChild(c);
          c.appendChild(b._g.doc.createTextNode(b.is(a,"string")?a:"Created with Red Raphaël "+b.version))}
        ;
        b.prototype.clear=function(){
          var a;
          for(e("raphael.clear",this);
          a=this.bottom;
          )a.remove();
          for(a=this.canvas;
          a.firstChild;
          )a.removeChild(a.firstChild);
          this.bottom=this.top=null;
          a.appendChild(this.desc=H("desc"));
          a.appendChild(this.defs=H("defs"))}
        ;
        b.prototype.remove=function(){
          var a;
          
for(e("raphael.remove",this);
          a=this.bottom;
          )a.remove();
          this.defs&&this.defs.parentNode.removeChild(this.defs);
          this.desc&&this.desc.parentNode.removeChild(this.desc);
          this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
          for(a in this)this[a]="function"==typeof this[a]?b._removedFactory(a):null;
          this.removed=!0}
        ;
        var aa=b.st,ac;
        for(ac in k)k.hasOwnProperty(ac)&&!aa.hasOwnProperty(ac)&&(aa[ac]=function(a){
          return function(){
            var b=arguments;
            return this.forEach(function(c){
              c[a].apply(c,
b)}
            )}
          }
        (ac))}
      }
    )();
    (function(){
      if(b.vml){
        var a=String,c=parseFloat,f=Math,s=f.round,d=f.max,z=f.min,A=f.sqrt,m=f.abs,r=/[, ]+/,O=b.eve,e={
          M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"}
        ,g=/([clmz]),?([^clmz]*)/gi,h=/ progid:\S+Blur\([^\)]+\)/g,H=/-?[^,\s-]+/g,E={
          path:1,rect:1,image:1}
        ,X={
          circle:1,ellipse:1}
        ,B=function(c){
          var f=/[ahqstv]/ig,d=b._pathToAbsolute;
          a(c).match(f)&&(d=b._path2curve);
          f=/[clmz]/g;
          if(d==b._pathToAbsolute&&!a(c).match(f))return(c=a(c).replace(g,function(a,b,c){
            var f=[],d="m"==
b.toLowerCase(),z=e[b];
            c.replace(H,function(a){
              d&&2==f.length&&(z+=f+e["m"==b?"l":"L"],f=[]);
              f.push(s(21600*a))}
            );
            return z+f}
          ))||"m0,0";
          var f=d(c),z;
          c=[];
          for(var A=0,m=f.length;
          A<m;
          A++){
            d=f[A];
            z=f[A][0].toLowerCase();
            "z"==z&&(z="x");
            for(var r=1,O=d.length;
            r<O;
            r++)z+=s(21600*d[r])+(r!=O-1?",":"");
            c.push(z)}
          return c.length?c.join(" "):"m0,0"}
        ,n=function(a,c,f){
          var s=b.matrix();
          s.rotate(-a,.5,.5);
          return{
            dx:s.x(c,f),dy:s.y(c,f)}
          }
        ,I=function(a,b,c,f,s,d){
          var z=a._,A=a.matrix,r=z.fillpos;
          a=a.node;
          var O=
a.style,e=1,g="",h=21600/b,H=21600/c;
          O.visibility="hidden";
          if(b&&c){
            a.coordsize=m(h)+" "+m(H);
            O.rotation=d*(0>b*c?-1:1);
            d&&(s=n(d,f,s),f=s.dx,s=s.dy);
            0>b&&(g+="x");
            0>c&&(g+=" y")&&(e=-1);
            O.flip=g;
            a.coordorigin=f*-h+" "+s*-H;
            if(r||z.fillsize)if(f=(f=a.getElementsByTagName("fill"))&&f[0])a.removeChild(f),r&&(s=n(d,A.x(r[0],r[1]),A.y(r[0],r[1])),f.position=s.dx*e+" "+s.dy*e),z.fillsize&&(f.size=z.fillsize[0]*m(b)+" "+z.fillsize[1]*m(c)),a.appendChild(f);
            O.visibility="visible"}
          }
        ;
        b._url="";
        b.toString=
function(){
          return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version}
        ;
        var l=function(b,c,f){
          c=a(c).toLowerCase().split("-");
          f=f?"end":"start";
          for(var s=c.length,d="classic",z="medium",A="medium";
          s--;
          )switch(c[s]){
            case "block":case "classic":case "oval":case "diamond":case "open":case "none":d=c[s];
            break;
            case "wide":case "narrow":A=c[s];
            break;
            case "long":case "short":z=c[s]}
          b=b.node.getElementsByTagName("stroke")[0];
          b[f+"arrow"]=d;
          b[f+"arrowlength"]=z;
          b[f+
"arrowwidth"]=A}
        ,Ia=function(a,b){
          for(var c in b)O("raphael.attr."+c+"."+a.id,a,b[c],c),a.ca[c]&&a.attr(c,b[c])}
        ,K=b._setFillAndStroke=function(f,A){
          if(f.paper.canvas){
            f.attrs=f.attrs||{
              }
            ;
            var m=f.node,O=f.attrs,e=m.style,g=E[f.type]&&(A.x!=O.x||A.y!=O.y||A.width!=O.width||A.height!=O.height||A.cx!=O.cx||A.cy!=O.cy||A.rx!=O.rx||A.ry!=O.ry||A.r!=O.r),h=X[f.type]&&(O.cx!=A.cx||O.cy!=A.cy||O.r!=A.r||O.rx!=A.rx||O.ry!=A.ry),H="group"===f.type,n;
            for(n in A)A.hasOwnProperty(n)&&(O[n]=A[n]);
            g&&(O.path=b._getPath[f.type](f),
f._.dirty=1);
            A.href&&(m.href=A.href);
            A.title&&(m.title=A.title);
            A.target&&(m.target=A.target);
            A.cursor&&(e.cursor=A.cursor);
            "blur"in A&&f.blur(A.blur);
            if(A.path&&"path"==f.type||g)m.path=B(~a(O.path).toLowerCase().indexOf("r")?b._pathToAbsolute(O.path):O.path),"image"==f.type&&(f._.fillpos=[O.x,O.y],f._.fillsize=[O.width,O.height],I(f,1,1,0,0,0));
            "transform"in A&&f.transform(A.transform);
            "rotation"in A&&(e=A.rotation,b.is(e,"array")?f.rotate.apply(f,e):f.rotate(e));
            "visibility"in A&&("hidden"===A.visibility?
f.hide():f.show());
            h&&(e=+O.cx,h=+O.cy,g=+O.rx||+O.r||0,n=+O.ry||+O.r||0,m.path=b.format("ar{
              0}
            ,{
              1}
            ,{
              2}
            ,{
              3}
            ,{
              4}
            ,{
              1}
            ,{
              4}
            ,{
              1}
            x",s(21600*(e-g)),s(21600*(h-n)),s(21600*(e+g)),s(21600*(h+n)),s(21600*e)));
            "clip-rect"in A&&(e=a(A["clip-rect"]).split(r),4==e.length&&(e[0]=+e[0],e[1]=+e[1],e[2]=+e[2]+e[0],e[3]=+e[3]+e[1],g=H?m:m.clipRect||b._g.doc.createElement("div"),h=g.style,H?(f.clip=e.slice(),g=f.matrix.offset(),g=[c(g[0]),c(g[1])],e[0]-=g[0],e[1]-=g[1],e[2]-=g[0],e[3]-=g[1],h.width="10800px",h.height=
"10800px"):m.clipRect||(h.top="0",h.left="0",h.width=f.paper.width+"px",h.height=f.paper.height+"px",m.parentNode.insertBefore(g,m),g.appendChild(m),g.raphael=!0,g.raphaelid=m.raphaelid,m.clipRect=g),h.position="absolute",h.clip=b.format("rect({
              1}
            px {
              2}
            px {
              3}
            px {
              0}
            px)",e)),A["clip-rect"]||(H&&f.clip?(m.style.clip="rect(auto auto auto auto)",delete f.clip):m.clipRect&&(m.clipRect.style.clip="rect(auto auto auto auto)")));
            f.textpath&&(H=f.textpath.style,A.font&&(H.font=A.font),A["font-family"]&&(H.fontFamily=
'"'+A["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,"")+'"'),A["font-size"]&&(H.fontSize=A["font-size"]),A["font-weight"]&&(H.fontWeight=A["font-weight"]),A["font-style"]&&(H.fontStyle=A["font-style"]));
            "arrow-start"in A&&l(f,A["arrow-start"]);
            "arrow-end"in A&&l(f,A["arrow-end"],1);
            if(null!=A.opacity||null!=A["stroke-width"]||null!=A.fill||null!=A.src||null!=A.stroke||null!=A["stroke-width"]||null!=A["stroke-opacity"]||null!=A["fill-opacity"]||null!=A["stroke-dasharray"]||null!=A["stroke-miterlimit"]||
null!=A["stroke-linejoin"]||null!=A["stroke-linecap"]){
              H=m.getElementsByTagName("fill");
              e=-1;
              H=H&&H[0];
              !H&&(H=w("fill"));
              "image"==f.type&&A.src&&(H.src=A.src);
              A.fill&&(H.on=!0);
              if(null==H.on||"none"==A.fill||null===A.fill)H.on=!1;
              H.on&&A.fill&&((h=a(A.fill).match(b._ISURL))?(H.parentNode==m&&m.removeChild(H),H.rotate=!0,H.src=h[1],H.type="tile",g=f.getBBox(1),H.position=g.x+" "+g.y,f._.fillpos=[g.x,g.y],b._preload(h[1],function(){
                f._.fillsize=[this.offsetWidth,this.offsetHeight]}
              )):(h=b.getRGB(A.fill),
H.color=h.hex,H.src="",H.type="solid",h.error&&(f.type in{
                circle:1,ellipse:1}
              ||"r"!=a(A.fill).charAt())&&G(f,A.fill,H)?(O.fill="none",O.gradient=A.fill,H.rotate=!1):"opacity"in h&&!("fill-opacity"in A)&&(e=h.opacity)));
              if(-1!==e||"fill-opacity"in A||"opacity"in A)h=((+O["fill-opacity"]+1||2)-1)*((+O.opacity+1||2)-1)*((+e+1||2)-1),h=z(d(h,0),1),H.opacity=h,H.src&&(H.color="none");
              m.appendChild(H);
              H=m.getElementsByTagName("stroke")&&m.getElementsByTagName("stroke")[0];
              e=!1;
              !H&&(e=H=w("stroke"));
              if(A.stroke&&
"none"!=A.stroke||A["stroke-width"]||null!=A["stroke-opacity"]||A["stroke-dasharray"]||A["stroke-miterlimit"]||A["stroke-linejoin"]||A["stroke-linecap"])H.on=!0;
              "none"!=A.stroke&&null!==A.stroke&&null!=H.on&&0!=A.stroke&&0!=A["stroke-width"]||(H.on=!1);
              h=b.getRGB("stroke"in A?A.stroke:O.stroke);
              H.on&&A.stroke&&(H.color=h.hex);
              h=((+O["stroke-opacity"]+1||2)-1)*((+O.opacity+1||2)-1)*((+h.opacity+1||2)-1);
              g=.75*(c(A["stroke-width"])||1);
              h=z(d(h,0),1);
              null==A["stroke-width"]&&(g=O["stroke-width"]);
              A["stroke-width"]&&
(H.weight=g);
              g&&1>g&&(h*=g)&&(H.weight=1);
              H.opacity=h;
              A["stroke-linejoin"]&&(H.joinstyle=A["stroke-linejoin"])||e&&(e.joinstyle="miter");
              H.miterlimit=A["stroke-miterlimit"]||8;
              A["stroke-linecap"]&&(H.endcap="butt"==A["stroke-linecap"]?"flat":"square"==A["stroke-linecap"]?"square":"round");
              A["stroke-dasharray"]&&(h={
                "-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"}
              ,H.dashstyle=
h.hasOwnProperty(A["stroke-dasharray"])?h[A["stroke-dasharray"]]:A["stroke-dasharray"].join&&A["stroke-dasharray"].join(" ")||"");
              e&&m.appendChild(H)}
            if("text"==f.type){
              f.paper.canvas.style.display="";
              m=f.paper.span;
              H=O.font&&O.font.match(/\d+(?:\.\d*)?(?=px)/);
              h=O["line-height"]&&(O["line-height"]+"").match(/\d+(?:\.\d*)?(?=px)/);
              e=m.style;
              O.font&&(e.font=O.font);
              O["font-family"]&&(e.fontFamily=O["font-family"]);
              O["font-weight"]&&(e.fontWeight=O["font-weight"]);
              O["font-style"]&&(e.fontStyle=O["font-style"]);
              
H=c(O["font-size"]||H&&H[0])||10;
              e.fontSize=100*H+"px";
              h=c(O["line-height"]||h&&h[0])||12;
              O["line-height"]&&(e.lineHeight=100*h+"px");
              b.is(A.text,"array")&&(A.text=f.textpath.string=A.text.join("\n").replace(/<br\s*?\/?>/ig,"\n"));
              f.textpath.string&&(m.innerHTML=a(f.textpath.string).replace(/</g,"&#60;
              ").replace(/&/g,"&#38;
              ").replace(/\n/g,"<br>"));
              m=m.getBoundingClientRect();
              f.W=O.w=(m.right-m.left)/100;
              f.H=O.h=(m.bottom-m.top)/100;
              f.X=O.x;
              f.Y=O.y;
              switch(O["vertical-align"]){
                case "top":f.bby=f.H/
2;
                break;
                case "bottom":f.bby=-f.H/2;
                break;
                default:f.bby=0}
              ("x"in A||"y"in A||void 0!==f.bby)&&(f.path.v=b.format("m{
                0}
              ,{
                1}
              l{
                2}
              ,{
                1}
              ",s(21600*O.x),s(21600*(O.y+(f.bby||0))),s(21600*O.x)+1));
              m="x y text font font-family font-weight font-style font-size line-height".split(" ");
              H=0;
              for(e=m.length;
              H<e;
              H++)if(m[H]in A){
                f._.dirty=1;
                break}
              switch(O["text-anchor"]){
                case "start":f.textpath.style["v-text-align"]="left";
                f.bbx=f.W/2;
                break;
                case "end":f.textpath.style["v-text-align"]="right";
                f.bbx=-f.W/2;
                break;
                default:f.textpath.style["v-text-align"]=
"center",f.bbx=0}
              f.textpath.style["v-text-kern"]=!0}
            }
          }
        ,G=function(f,s,d){
          f.attrs=f.attrs||{
            }
          ;
          var z=Math.pow,m="linear",O=".5 .5";
          f.attrs.gradient=s;
          s=a(s).replace(b._radial_gradient,function(a,b){
            m="radial";
            b=b&&b.split(",")||[];
            var f=b[3],s=b[4];
            f&&s&&(f=c(f),s=c(s),.25<z(f-.5,2)+z(s-.5,2)&&(s=A(.25-z(f-.5,2))*(2*(.5<s)-1)+.5),O=f+" "+s);
            return""}
          );
          s=s.split(/\s*\-\s*/);
          if("linear"==m){
            var r=s.shift(),r=-c(r);
            if(isNaN(r))return null}
          s=b._parseDots(s);
          if(!s)return null;
          f=f.shape||f.node;
          if(s.length){
            d.parentNode==
f&&f.removeChild(d);
            d.on=!0;
            d.method="none";
            d.color=s[0].color;
            d.color2=s[s.length-1].color;
            for(var e=[],g=1,h=void 0===s[0].opacity?1:s[0].opacity,H=0,E=s.length;
            H<E;
            H++)s[H].offset&&e.push(s[H].offset+" "+s[H].color),void 0!==s[H].opacity&&(g=s[H].opacity);
            d.colors=e.length?e.join():"0% "+d.color;
            d.opacity=g;
            d["o:opacity2"]=h;
            "radial"==m?(d.type="gradientTitle",d.focus="100%",d.focussize="0 0",d.focusposition=O,d.angle=0):(d.type="gradient",d.angle=(270-r)%360);
            f.appendChild(d)}
          return 1}
        ,p=function(a,
c,f){
          f=f||c;
          var s;
          f.canvas&&f.canvas.appendChild(a);
          s=w("skew");
          s.on=!0;
          a.appendChild(s);
          this.skew=s;
          this.node=this[0]=a;
          a.raphael=!0;
          a.raphaelid=this.id=b._oid++;
          this.Y=this.X=0;
          this.attrs=this.attrs||{
            }
          ;
          this.followers=this.followers||[];
          this.paper=c;
          this.ca=this.customAttributes=this.customAttributes||new c._CustomAttributes;
          this.matrix=b.matrix();
          this._={
            transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1}
          ;
          this.parent=f;
          !f.bottom&&(f.bottom=this);
          (this.prev=f.top)&&(f.top.next=this);
          f.top=
this;
          this.next=null}
        ,f=b.el;
        p.prototype=f;
        f.constructor=p;
        f.transform=function(c){
          if(null==c)return this._.transform;
          var f=this.paper._viewBoxShift,s=f?"s"+[f.scale,f.scale]+"-1-1t"+[f.dx,f.dy]:"",d;
          f&&(d=c=a(c).replace(/\.{
            3}
          |\u2026/g,this._.transform||""));
          b._extractTransform(this,s+c);
          var f=this.matrix.clone(),z=this.skew;
          c=this.node;
          var s=~a(this.attrs.fill).indexOf("-"),A=!a(this.attrs.fill).indexOf("url(");
          f.translate(-.5,-.5);
          A||s||"image"==this.type?(z.matrix="1 0 0 1",z.offset="0 0",z=f.split(),
s&&z.noRotation||!z.isSimple?(c.style.filter=f.toFilter(),f=this.getBBox(),s=this.getBBox(1),A=f.x2&&s.x2&&"x2"||"x",z=f.y2&&s.y2&&"y2"||"y",A=f[A]-s[A],f=f[z]-s[z],c.coordorigin=-21600*A+" "+-21600*f,I(this,1,1,A,f,0)):(c.style.filter="",I(this,z.scalex,z.scaley,z.dx,z.dy,z.rotate))):(c.style.filter="",z.matrix=a(f),z.offset=f.offset());
          d&&(this._.transform=d);
          return this}
        ;
        f.rotate=function(b,f,s){
          if(this.removed)return this;
          if(null!=b){
            b=a(b).split(r);
            b.length-1&&(f=c(b[1]),s=c(b[2]));
            b=c(b[0]);
            
null==s&&(f=s);
            if(null==f||null==s)s=this.getBBox(1),f=s.x+s.width/2,s=s.y+s.height/2;
            this._.dirtyT=1;
            this.transform(this._.transform.concat([["r",b,f,s]]));
            return this}
          }
        ;
        f.translate=function(b,f){
          if(this.removed)return this;
          b=a(b).split(r);
          b.length-1&&(f=c(b[1]));
          b=c(b[0])||0;
          f=+f||0;
          this._.bbox&&(this._.bbox.x+=b,this._.bbox.y+=f);
          this.transform(this._.transform.concat([["t",b,f]]));
          return this}
        ;
        f.scale=function(b,f,s,d){
          if(this.removed)return this;
          b=a(b).split(r);
          b.length-1&&(f=c(b[1]),s=c(b[2]),
d=c(b[3]),isNaN(s)&&(s=null),isNaN(d)&&(d=null));
          b=c(b[0]);
          null==f&&(f=b);
          null==d&&(s=d);
          if(null==s||null==d)var z=this.getBBox(1);
          s=null==s?z.x+z.width/2:s;
          d=null==d?z.y+z.height/2:d;
          this.transform(this._.transform.concat([["s",b,f,s,d]]));
          this._.dirtyT=1;
          return this}
        ;
        f.hide=function(a){
          !this.removed&&(this.node.style.display="none");
          return this}
        ;
        f.show=function(a){
          !this.removed&&(this.node.style.display="");
          return this}
        ;
        f._getBBox=function(){
          return this.removed?{
            }
          :{
            x:this.X+(this.bbx||0)-this.W/
2,y:this.Y+(this.bby||0)-this.H/2,width:this.W,height:this.H}
          }
        ;
        f.remove=function(){
          if(!this.removed&&this.parent.canvas){
            var a=b._engine.getNode(this),c=this.paper,f=this.shape;
            c.__set__&&c.__set__.exclude(this);
            O.unbind("raphael.*.*."+this.id);
            f&&f.parentNode.removeChild(f);
            for(a.parentNode&&a.parentNode.removeChild(a);
            a=this.followers.pop();
            )a.el.remove();
            for(;
            a=this.bottom;
            )a.remove();
            this._drag&&this.undrag();
            if(this.events)for(;
            a=this.events.pop();
            )a.unbind();
            this.removeData();
            delete c._elementsById[this.id];
            
b._tear(this,this.parent);
            for(a in this)this[a]="function"===typeof this[a]?b._removedFactory(a):null;
            this.removed=!0}
          }
        ;
        f.attr=function(a,c){
          if(this.removed)return this;
          if(null==a){
            var f={
              }
            ,s;
            for(s in this.attrs)this.attrs.hasOwnProperty(s)&&(f[s]=this.attrs[s]);
            f.gradient&&"none"==f.fill&&(f.fill=f.gradient)&&delete f.gradient;
            f.transform=this._.transform;
            f.visibility="none"===this.node.style.display?"hidden":"visible";
            return f}
          if(null==c&&b.is(a,"string")){
            if("fill"==a&&"none"==this.attrs.fill&&
this.attrs.gradient)return this.attrs.gradient;
            if("visibility"==a)return"none"===this.node.style.display?"hidden":"visible";
            var f=a.split(r),d={
              }
            ,z=0;
            for(s=f.length;
            z<s;
            z++)a=f[z],a in this.attrs?d[a]=this.attrs[a]:b.is(this.ca[a],"function")?d[a]=this.ca[a].def:d[a]=b._availableAttrs[a];
            return s-1?d:d[f[0]]}
          if(this.attrs&&null==c&&b.is(a,"array")){
            d={
              }
            ;
            z=0;
            for(s=a.length;
            z<s;
            z++)d[a[z]]=this.attr(a[z]);
            return d}
          null!=c&&(f={
            }
          ,f[a]=c);
          null==c&&b.is(a,"object")&&(f=a);
          for(z in f)O("raphael.attr."+
z+"."+this.id,this,f[z],z);
          if(f){
            var A={
              }
            ;
            for(z in this.ca)if(this.ca[z]&&f.hasOwnProperty(z)&&b.is(this.ca[z],"function")&&!this.ca["_invoked"+z]){
              this.ca["_invoked"+z]=!0;
              s=this.ca[z].apply(this,[].concat(f[z]));
              delete this.ca["_invoked"+z];
              for(d in s)s.hasOwnProperty(d)&&(f[d]=s[d]);
              this.attrs[z]=f[z];
              !1===s&&(A[z]=f[z],delete f[z])}
            "text"in f&&"text"==this.type&&(b.is(f.text,"array")&&(f.text=f.text.join("\n")),this.textpath.string=f.text.replace(/<br\s*?\/?>/ig,"\n"));
            K(this,f);
            var m,z=0;
            for(s=
this.followers.length;
            z<s;
            z++)m=this.followers[z],m.cb&&!m.cb.call(m.el,f,this)||m.el.attr(f);
            for(d in A)f[d]=A[d]}
          return this}
        ;
        f.blur=function(a){
          var c=this.node.runtimeStyle,f=c.filter,f=f.replace(h,"");
          0!==+a?(this.attrs.blur=a,c.filter=f+"  progid:DXImageTransform.Microsoft.Blur(pixelradius="+(+a||1.5)+")",c.margin=b.format("-{
            0}
          px 0 0 -{
            0}
          px",s(+a||1.5))):(c.filter=f,c.margin=0,delete this.attrs.blur);
          return this}
        ;
        f.on=function(a,c){
          if(this.removed)return this;
          this.node["on"+a]=function(){
            var a=
b._g.win.event;
            a.target=a.srcElement;
            c(a)}
          ;
          return this}
        ;
        b._engine.getNode=function(a){
          a=a.node||a[0].node;
          return a.clipRect||a}
        ;
        b._engine.getLastNode=function(a){
          a=a.node||a[a.length-1].node;
          return a.clipRect||a}
        ;
        b._engine.group=function(a,c,f){
          var s=b._g.doc.createElement("div"),d=new p(s,a,f);
          s.style.cssText="position:absolute;
          left:0;
          top:0;
          width:1px;
          height:1px";
          d._id=c||"";
          c&&(s.className="raphael-group-"+d.id+"-"+c);
          (f||a).canvas.appendChild(s);
          d.type="group";
          d.canvas=d.node;
          d.transform=b._engine.group.transform;
          
d.top=null;
          d.bottom=null;
          return d}
        ;
        b._engine.group.transform=function(f){
          if(null==f)return this._.transform;
          var s=this.node.style,d=this.clip,z=this.paper._viewBoxShift,A=z?"s"+[z.scale,z.scale]+"-1-1t"+[z.dx,z.dy]:"";
          z&&(f=a(f).replace(/\.{
            3}
          |\u2026/g,this._.transform||""));
          b._extractTransform(this,A+f);
          f=this.matrix;
          A=f.offset();
          z=c(A[0])||0;
          A=c(A[1])||0;
          s.left=z+"px";
          s.top=A+"px";
          s.zoom=(this._.tzoom=f.get(0))+"";
          d&&(s.clip=b.format("rect({
            1}
          px {
            2}
          px {
            3}
          px {
            0}
          px)",[d[0]-z,d[1]-A,d[2]-z,d[3]-A]));
          
return this}
        ;
        b._engine.path=function(a,b,c){
          var f=w("shape");
          f.style.cssText="position:absolute;
          left:0;
          top:0;
          width:1px;
          height:1px";
          f.coordsize="21600 21600";
          f.coordorigin=a.coordorigin;
          a=new p(f,a,c);
          a.type=b.type||"path";
          a.path=[];
          a.Path="";
          b.type&&delete b.type;
          K(a,b);
          Ia(a,b);
          return a}
        ;
        b._engine.rect=function(a,c,f){
          var s=b._rectPath(c.x,c.y,c.w,c.h,c.r);
          c.path=s;
          c.type="rect";
          a=a.path(c,f);
          c=a.attrs;
          a.X=c.x;
          a.Y=c.y;
          a.W=c.width;
          a.H=c.height;
          c.path=s;
          return a}
        ;
        b._engine.ellipse=function(a,b,c){
          b.type=
"ellipse";
          a=a.path(b,c);
          b=a.attrs;
          a.X=b.x-b.rx;
          a.Y=b.y-b.ry;
          a.W=2*b.rx;
          a.H=2*b.ry;
          return a}
        ;
        b._engine.circle=function(a,b,c){
          b.type="circle";
          a=a.path(b,c);
          b=a.attrs;
          a.X=b.x-b.r;
          a.Y=b.y-b.r;
          a.W=a.H=2*b.r;
          return a}
        ;
        b._engine.image=function(a,c,f){
          var s=b._rectPath(c.x,c.y,c.w,c.h);
          c.path=s;
          c.type="image";
          c.stroke="none";
          a=a.path(c,f);
          f=a.attrs;
          var s=a.node,d=s.getElementsByTagName("fill")[0];
          f.src=c.src;
          a.X=f.x=c.x;
          a.Y=f.y=c.y;
          a.W=f.width=c.w;
          a.H=f.height=c.h;
          d.parentNode==s&&s.removeChild(d);
          d.rotate=
!0;
          d.src=f.src;
          d.type="tile";
          a._.fillpos=[f.x,f.y];
          a._.fillsize=[f.w,f.h];
          s.appendChild(d);
          I(a,1,1,0,0,0);
          return a}
        ;
        b._engine.text=function(c,f,d){
          var z=w("shape"),A=w("path"),m=w("textpath");
          x=f.x||0;
          y=f.y||0;
          text=f.text;
          A.v=b.format("m{
            0}
          ,{
            1}
          l{
            2}
          ,{
            1}
          ",s(21600*f.x),s(21600*f.y),s(21600*f.x)+1);
          A.textpathok=!0;
          m.string=a(f.text).replace(/<br\s*?\/?>/ig,"\n");
          m.on=!0;
          z.style.cssText="position:absolute;
          left:0;
          top:0;
          width:1px;
          height:1px";
          z.coordsize="21600 21600";
          z.coordorigin="0 0";
          c=new p(z,c,d);
          c.shape=
z;
          c.path=A;
          c.textpath=m;
          c.type="text";
          c.attrs.text=a(f.text||"");
          c.attrs.x=f.x;
          c.attrs.y=f.y;
          c.attrs.w=1;
          c.attrs.h=1;
          K(c,f);
          Ia(c,f);
          z.appendChild(m);
          z.appendChild(A);
          return c}
        ;
        b._engine.setSize=function(a,c){
          var f=this.canvas.style;
          this.width=a;
          this.height=c;
          a==+a&&(a+="px");
          c==+c&&(c+="px");
          f.width=a;
          f.height=c;
          f.clip="rect(0 "+a+" "+c+" 0)";
          this._viewBox&&b._engine.setViewBox.apply(this,this._viewBox);
          return this}
        ;
        b._engine.setViewBox=function(a,b,c,f,s){
          O("raphael.setViewBox",this,this._viewBox,
[a,b,c,f,s]);
          var z=this.width,A=this.height,m=1/d(c/z,f/A),r,e;
          s&&(r=A/f,e=z/c,c*r<z&&(a-=(z-c*r)/2/r),f*e<A&&(b-=(A-f*e)/2/e));
          this._viewBox=[a,b,c,f,!!s];
          this._viewBoxShift={
            dx:-a,dy:-b,scale:m}
          ;
          this.forEach(function(a){
            a.transform("...")}
          );
          return this}
        ;
        var w;
        b._engine.initWin=function(c){
          var f=c.document;
          f.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");
          try{
            !f.namespaces.rvml&&f.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),w=b._createNode=function(b,c){
              var s=f.createElement("<rvml:"+
b+' class="rvml">'),d;
              for(d in c)s[d]=a(c[d]);
              return s}
            }
          catch(s){
            w=b._createNode=function(b,c){
              var s=f.createElement("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">'),d;
              for(d in c)s[d]=a(c[d]);
              return s}
            }
          }
        ;
        b._engine.initWin(b._g.win);
        b._engine.create=function(){
          var a=b._getContainer.apply(0,arguments),c=a.container,f=a.height,s=a.width,d=a.x,a=a.y;
          if(!c)throw Error("VML container not found.");
          var z=new b._Paper,A=z.canvas=b._g.doc.createElement("div"),m=A.style,d=d||0,a=a||0,s=s||512,f=
f||342;
          z.width=s;
          z.height=f;
          s==+s&&(s+="px");
          f==+f&&(f+="px");
          z.coordsize="21600000 21600000";
          z.coordorigin="0 0";
          A.id="raphael-paper-"+z.id;
          z.span=b._g.doc.createElement("span");
          z.span.style.cssText="position:absolute;
          left:-9999em;
          top:-9999em;
          padding:0;
          margin:0;
          line-height:1;
          ";
          A.appendChild(z.span);
          m.cssText=b.format("top:0;
          left:0;
          width:{
            0}
          ;
          height:{
            1}
          ;
          display:inline-block;
          cursor:default;
          position:relative;
          clip:rect(0 {
            0}
           {
            1}
           0);
          overflow:hidden",s,f);
          1==c?(b._g.doc.body.appendChild(A),m.left=d+"px",
m.top=a+"px",m.position="absolute"):c.firstChild?c.insertBefore(A,c.firstChild):c.appendChild(A);
          z.renderfix=function(){
            }
          ;
          return z}
        ;
        b.prototype.clear=function(){
          var a;
          for(O("raphael.clear",this);
          a=this.bottom;
          )a.remove();
          this.canvas.innerHTML="";
          this.span=b._g.doc.createElement("span");
          this.span.style.cssText="position:absolute;
          left:-9999em;
          top:-9999em;
          padding:0;
          margin:0;
          line-height:1;
          display:inline;
          ";
          this.canvas.appendChild(this.span);
          this.bottom=this.top=null}
        ;
        b.prototype.remove=function(){
          var a;
          
for(O("raphael.remove",this);
          a=this.bottom;
          )a.remove();
          this.canvas.parentNode.removeChild(this.canvas);
          for(a in this)this[a]="function"==typeof this[a]?b._removedFactory(a):null;
          return!0}
        ;
        var M=b.st,aa;
        for(aa in f)f.hasOwnProperty(aa)&&!M.hasOwnProperty(aa)&&(M[aa]=function(a){
          return function(){
            var b=arguments;
            return this.forEach(function(c){
              c[a].apply(c,b)}
            )}
          }
        (aa))}
      }
    )();
    oa?v.win.Raphael=b:Raphael=b;
    return b}
  ,!0)}
  )();
  e.Raphael=u;
  e.Raphael.desc="";
  k&&k!==u?window.Raphael=k:window.Raphael===u&&(window.Raphael=
void 0)}
  ]);
  FusionCharts.register("module",["private","fusioncharts.redraphael.helper",function(){
  var e={
    }
  ;
  this.hcLib.Raphael.fn._elementFromEvent=function(k){
    if(!k||this.removed)return null;
    var u=k.srcElement||k.target||(k=k.originalEvent)&&(k.srcElement||k.target)||e;
    "tspan"===u.nodeName&&(u=u.parentNode);
    return this.getById(u.raphaelid)}
  }
  ]);
  
FusionCharts.register("module",["private","fusioncharts.redraphael.css",function(){
  var e=this.hcLib.Raphael,k=e.eve,u=e._g,q=e.fn,D=e.el,b=/[, ]+/,N=/\B([A-Z]{
    1}
  )/g,J,c;
  J=function(b){
    this.rules={
      }
    ;
    this.ns=b||""}
  ;
  c=J.prototype;
  c.getSheet=function(){
    var b=this.node;
    b||(b=this.node=u.doc.createElement("style"),this.node.setAttribute("id",e.format("raphael-stylesheet-{
      0}
    ",e._oid++)),this.node.setAttribute("type","text/css"),(u.doc.head||u.doc.getElementsByTagName("head")[0]).appendChild(this.node));
    return b}
  ;
  
c.setCssText=function(b){
    var a=this.node;
    if(!a)if(b)a=this.getSheet();
    else return;
    a.styleSheet?a.styleSheet.cssText=b||"":(a.innerHTML="",b&&a.appendChild(u.doc.createTextNode(b)))}
  ;
  c.destroy=function(){
    this.node&&this.node.parentNode&&this.node.parentNode.removeChild(this.node);
    delete this.rules}
  ;
  c.clear=function(){
    this.setCssText("");
    this.rules={
      }
    }
  ;
  c.add=function(b,a){
    var c=this.rules[b]||(this.rules[b]={
      }
    ),e;
    for(e in a)c[e]=a[e]}
  ;
  c.render=function(){
    this.setCssText(this.toString())}
  ;
  c.toString=
function(b){
    var a=b?"":"\n",c=b?"":"\t";
    b=b?":":": ";
    var e=a,k,g;
    for(k in this.rules){
      e+=k.replace(/(^|\,)/g,"$1"+this.ns+" ")+" {
        "+a;
        k=this.rules[k];
        for(g in k)k[g]&&(e+=c+g.replace(N,"-$1").toLowerCase()+b+k[g]+";
        "+a);
        e+="}
      "+a}
    return e}
  ;
  k.on("raphael.new",function(){
    this._stylesheet=this._stylesheet||new J;
    this.cssNamespace("")}
  );
  k.on("raphael.remove",function(){
    this._stylesheet&&this._stylesheet.destroy();
    delete this._stylesheet}
  );
  q.cssNamespace=function(b){
    arguments.length&&(this._stylesheet.ns=
e.format("{
      0}
    #raphael-paper-{
      1}
    ",b&&b+" "||"",this.id));
    return this._stylesheet.ns}
  ;
  q.cssAddRule=function(b,a){
    if(1===arguments.length&&"object"===typeof b){
      for(var c in b)this.cssAddRule(c,b[c]);
      return this}
    return this._stylesheet.add(b,a),this}
  ;
  q.cssRender=function(){
    return e.svg&&this._stylesheet.render(),this}
  ;
  q.cssClear=function(){
    return this._stylesheet.clear(),this}
  ;
  e._availableAttrs["class"]="";
  e.svg&&k.on("raphael.attr.class",function(b){
    var a=this.node;
    b=b||"";
    a.setAttribute("class","group"===
this.type&&this._id?"raphael-group-"+this.id+"-"+this._id+" "+b:b)}
  );
  e.vml&&k.on("raphael.attr.class",function(b){
    var a=this.paper,c="."+b,a=a._stylesheet&&a._stylesheet.rules,e=this.parent,k=this.attrs,g={
      }
    ,d;
    this.node.className="group"===this.type?b&&this._id+" "+b||this._id:"rvml "+b;
    if(c&&a){
      b=a[c];
      for(d in b)"color"===d&&"text"===this.type&&(d="fill"),!k[d]&&(g[d]=b[d]);
      for(;
      e&&e.attr;
      ){
        if(b=e.attr("class"))for(d in c="."+b+" "+c,b=a[c],b)"color"===d&&"text"===this.type&&(d="fill"),k[d]||g[d]||
(g[d]=b[d]);
        e=e.parent}
      this.css(g)}
    }
  );
  D.css=function(c,a){
    var t,q,F,g;
    if(this.removed)return this;
    this.styles||(this.styles={
      }
    );
    if(null==a&&e.is(c,"string")){
      t=c.split(b);
      q={
        }
      ;
      g=0;
      for(F=t.length;
      g<F;
      g++)c=t[g],c in this.styles&&(q[c]=this.styles[c]);
      return F-1?q:q[t[0]]}
    if(null==a&&e.is(c,"array")){
      q={
        }
      ;
      g=0;
      for(F=c.length;
      g<F;
      g++)q[c[g]]=this.styles(c[g]);
      return q}
    null!=a?(t={
      }
    ,t[c]=a):null!=c&&e.is(c,"object")&&(t=c);
    q={
      }
    ;
    for(g in t)F=g.replace(/\B([A-Z]{
      1}
    )/g,"-$1").toLowerCase(),e._availableAttrs.hasOwnProperty(F)||
"color"===F?("color"===F&&"text"===this.type&&(F="fill"),q[F]=t[g],q.dirty=!0):(k("raphael.css."+F+"."+this.id,this,t[g],F),this.node.style[F]=t[g],this.styles[F]=t[g]);
    g=0;
    for(F=this.followers.length;
    g<F;
    g++)this.followers[g].el.attr(t);
    q.hasOwnProperty("dirty")&&(delete q.dirty,this.attr(q));
    return this}
  }
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-raphaelexport",function(){
  var e=this.hcLib,k=e.Raphael,u=e.pluckNumber,q=e.pluck,D=k._availableAttrs,b=/^matrix\(|\)$/g,N=/\,/g,J=/\n|<br\s*?\/?>/ig,c=/[^\d\.]/ig,p=/[\%\(\)\s,\xb0#]/g,a=/group/ig,t=/&/g,U=/"/g,F=/'/g,g=/</g,d=/>/g,h=0;
  (function(e){
    var k=Math,P=parseFloat,n=k.max,C=k.abs,w=k.pow,R=String,v=/[, ]+/,oa=[{
      reg:/xmlns\=\"http\:\/\/www.w3.org\/2000\/svg\"/ig,repStr:""}
    ,{
      reg:/^.*<svg /,repStr:'<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" '}
    ,
{
      reg:/\/svg>.*$/,repStr:"/svg>"}
    ,{
      reg:/<desc\>[^<]*<\/desc\>/,repStr:""}
    ,{
      reg:/zIndex="[^"]+"/g,repStr:""}
    ,{
      reg:/url\((\\?[\'\"])[^#]+#/g,repStr:"url($1#"}
    ,{
      reg:/ href=/g,repStr:" xlink:href="}
    ,{
      reg:/(id|class|width|height)=([^" >]+)/g,repStr:'$1="$2"'}
    ,{
      reg:/:(path|rect)/g,repStr:"$1"}
    ,{
      reg:/<ima?ge? ([^\>]+?[^\/])\>/gi,repStr:"<image $1 />"}
    ,{
      reg:/<\/ima?ge?\>/g,repStr:""}
    ,{
      reg:/style="([^"]+)"/g,repStr:function(a){
        return a.toLowerCase()}
      }
    ],ea={
      blur:function(){
        }
      ,transform:function(){
        }
      ,src:function(a,
b){
        b.attrSTR+=' xlink:href="'+b.attrs.src+'"'}
      ,path:function(a,b){
        var c=b.attrs.path,c=e._pathToAbsolute(c||"");
        b.attrSTR+=' d="'+(c.toString&&c.toString()||"").replace(N," ")+'"'}
      ,gradient:function(a,b,c){
        var d=a.attrs.gradient,g="linear",h,v,G,t=.5,q=.5,r=v="",B="",ga,Z,F,T;
        h=d.replace(p,"_");
        if(!c[h]){
          d=R(d).replace(e._radial_gradient,function(a,b){
            var c,d,r,e,h,B,n;
            b=b&&b.split(",")||[];
            g="radial";
            c=b[0];
            d=b[1];
            r=b[2];
            e=b[3];
            h=b[4];
            T=b[5];
            n=c&&d;
            r&&(F=/\%/.test(r)?r:P(r));
            if("userSpaceOnUse"===
T)return n&&(t=c,q=d),e&&h&&(ga=e,Z=h,n||(t=ga,q=Z)),"";
            n&&(t=P(c),q=P(d),c=2*(.5<q)-1,.25<(B=w(t-.5,2))+w(q-.5,2)&&.25>B&&(q=k.sqrt(.25-B)*c+.5)&&.5!==q&&(q=q.toFixed(5)-1E-5*c));
            e&&h&&(ga=P(e),Z=P(h),c=2*(.5<Z)-1,.25<(B=w(ga-.5,2))+w(Z-.5,2)&&.25>B&&(Z=k.sqrt(.25-B)*c+.5)&&.5!==Z&&(Z=Z.toFixed(5)-1E-5*c),n||(t=ga,q=Z));
            return""}
          );
          d=d.split(/\s*\-\s*/);
          if("linear"===g){
            v=d.shift();
            v=-P(v);
            if(isNaN(v))return null;
            G=[0,0,k.cos(e.rad(v)),k.sin(e.rad(v))];
            v=1/(n(C(G[2]),C(G[3]))||1);
            G[2]*=v;
            G[3]*=v;
            
0>G[2]&&(G[0]=-G[2],G[2]=0);
            0>G[3]&&(G[1]=-G[3],G[3]=0)}
          d=e._parseDots(d);
          if(!d)return null;
          "radial"===g?(v='<radialGradient fx = "'+t+'" fy = "'+q+'" cy = "'+Z+'" cx = "'+ga+'" r = "'+F+'" gradientUnits = "'+T+'" id = "'+h+'">',r="</radialGradient>"):(v='<linearGradient x1 = "'+G[0]+'" y1 = "'+G[1]+'" x2 = "'+G[2]+'" y2 = "'+G[3]+'" gradientTransform ="matrix('+a.matrix.invert()+')" id = "'+h+'">',r="</linearGradient>");
          a=0;
          for(G=d.length;
          a<G;
          a++)B+='<stop offset="'+(d[a].offset?d[a].offset:a?"100%":
"0%")+'" stop-color="'+(d[a].color||"#fff")+'" stop-opacity="'+(void 0===d[a].opacity?1:d[a].opacity)+'" />';
          c[h]=!0;
          c.str+=v+B+r}
        b.attrSTR+=" fill=\"url('#"+h+"')\""}
      ,fill:function(a,b){
        var c=b.attrs,d=c.fill,g;
        a.attrs.gradient||(d=e.color(d),g=d.opacity,"text"===a.type?b.styleSTR+="fill:"+d+";
         stroke-opacity:0;
         ":(b.attrSTR+=' fill="'+d+'"',c["fill-opacity"]||!g&&0!==g||(b.attrSTR+=' fill-opacity="'+g+'"')))}
      ,stroke:function(a,b){
        var c=b.attrs,d,g;
        d=e.color(c.stroke);
        g=d.opacity;
        "text"!==a.type&&
(b.attrSTR+=' stroke="'+d+'"',c["stroke-opacity"]||!g&&0!==g||(b.attrSTR+=' stroke-opacity="'+g+'"'))}
      ,"clip-rect":function(a,c,d){
        var e=R(c.attrs["clip-rect"]),g=e.split(v),e=e.replace(p,"_")+"__"+h++;
        4===g.length&&(d[e]||(d[e]=!0,d.str+='<clipPath id="'+e+'"><rect x="'+g[0]+'" y="'+g[1]+'" width="'+g[2]+'" height="'+g[3]+'" transform="matrix('+a.matrix.invert().toMatrixString().replace(b,"")+')"/></clipPath>'),c.attrSTR+=' clip-path="url(#'+e+')"')}
      ,cursor:function(a,b){
        var c=b.attrs.cursor;
        c&&
(b.styleSTR+="cursor:"+c+";
         ")}
      ,font:function(a,b){
        b.styleSTR+="font:"+b.attrs.font.replace(/\"/ig," ")+";
         "}
      ,"font-size":function(a,b){
        var d=q(b.attrs["font-size"],"10");
        d&&d.replace&&(d=d.replace(c,""));
        b.styleSTR+="font-size:"+d+"px;
         "}
      ,"font-weight":function(a,b){
        b.styleSTR+="font-weight:"+b.attrs["font-weight"]+";
         "}
      ,"font-family":function(a,b){
        b.styleSTR+="font-family:"+b.attrs["font-family"]+";
         "}
      ,"line-height":function(){
        }
      ,"clip-path":function(){
        }
      ,visibility:function(){
        }
      ,"vertical-align":function(){
        }
      ,
"text-anchor":function(a,b){
        var c=b.attrs["text-anchor"]||"middle";
        "text"===a.type&&(b.attrSTR+=' text-anchor="'+c+'"')}
      ,title:function(){
        }
      ,text:function(a,b){
        var e=b.attrs,h=e.text,n=q(e["font-size"],e.font,"10"),l=q(e["line-height"]),w,G,k;
        n&&n.replace&&(n=n.replace(c,""));
        n=u(n);
        l&&l.replace&&(l=l.replace(c,""));
        l=u(l,n&&1.2*n);
        w=n?.85*n:.75*l;
        n=e.x;
        G=q(e["vertical-align"],"middle").toLowerCase();
        h=R(h).split(J);
        k=h.length;
        e=0;
        for(w="top"===G?w:"bottom"===G?w-l*k:w-l*k*.5;
        e<k;
        e++)b.textSTR+="<tspan ",
G=(h[e]||"").replace(t,"&amp;
        ").replace(U,"&quot;
        ").replace(F,"&#39;
        ").replace(g,"&lt;
        ").replace(d,"&gt;
        "),b.textSTR=e?b.textSTR+('dy="'+l+'" x="'+n+'" '):b.textSTR+('dy="'+w+'"'),b.textSTR+=">"+G+"</tspan>"}
      }
    ,$=function(c,d){
      var e="",g={
        attrSTR:"",styleSTR:"",textSTR:"",attrs:c.attr()}
      ,h=c.isShadow,n="",l="",w,k,p=g.attrs;
      if("none"===c.node.style.display||h)c.next&&(e+=$(c.next,d));
      else{
        for(w in p)if("gradient"!==w&&(void 0!==D[w]||ea[w])&&void 0!==p[w])if(ea[w])ea[w](c,g,d);
        else g.attrSTR+=" "+
w+'="'+p[w]+'"';
        c.attrs.gradient&&ea.gradient(c,g,d);
        "rect"===c.type&&p.r&&(g.attrSTR+=' rx="'+p.r+'" ry="'+p.r+'"');
        for(k in c.styles)g.styleSTR+=k+":"+c.styles[k]+";
         ";
        "image"===c.type&&(g.attrSTR+=' preserveAspectRatio="none"');
        if("text"===c.type&&!p["text-anchor"])ea["text-anchor"](c,g);
        c.bottom&&(n=$(c.bottom,d));
        c.next&&(l=$(c.next,d));
        h=c.type;
        h.match(a)&&(h="g");
        e+="<"+h+' transform="matrix('+c.matrix.toMatrixString().replace(b,"")+')" style="'+g.styleSTR+'"'+g.attrSTR+">"+g.textSTR+n+"</"+
h+">"+l}
      return e}
    ;
    e.fn.toSVG=function(a){
      var b="",c={
        str:""}
      ,d=0,g=oa.length,h="";
      if(e.svg){
        if(this.canvas&&this.canvas.parentNode){
          for(b=this.canvas.parentNode.innerHTML;
          d<g;
          d+=1)c=oa[d],b=b.replace(c.reg,c.repStr);
          this._stylesheet&&(b=b.replace(/^(<svg\s[\s\S]*?>)/ig,'$1<style type="text/css">'+this._stylesheet.toString(!0)+"</style>"))}
        }
      else b='<svg style="overflow: hidden;
       position: relative;
      " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+this.width+'" version="1.1" height="'+
this.height+'">',this.bottom&&(h=$(this.bottom,c)),b+="<defs>"+c.str+"</defs>"+h+"</svg>";
      a||(b=b.replace(/<image [^\>]*\>/gi,""));
      return b}
    }
  )(k)}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-raphaelshadow",function(){
  var e=this.window,k=e.Math.sqrt,u=e.parseFloat,q=e.parseInt,e=e.SVGFilterElement||e.SVGFEColorMatrixElement&&2===e.SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE,D=this.hcLib.Raphael,b={
    "drop-shadow":"drop-shadow",stroke:"stroke",fill:"fill","stroke-width":"stroke-width","stroke-opacity":"stroke-opacity","stroke-linecap":"stroke-linecap","stroke-linejoin":"stroke-linejoin","shape-rendering":"shape-rendering",
transform:"transform"}
  ,N=D._createNode,J;
  D.svg?(e&&(D.el.dropshadow=function(b,e,a,t){
    var q=this.node,F=this._.shadowFilter,g=this.paper.cacheShadows||(this.paper.cacheShadows={
      }
    ),d="drop-shadow"+[b,e,a,t].join(" "),h;
    if("none"===b){
      if(F){
        --F.use;
        this.node.removeAttribute("filter");
        if(!F.use){
          d=F.hash;
          for(h in F)b=F[h],b.parentNode&&b.parentNode.removeChild(b),delete F[h];
          delete g[d]}
        delete this._.shadowFilter}
      }
    else F&&g[d]===F||(F=this.paper.defs.appendChild(N("filter",{
      id:D.createUUID(),width:"200%",
height:"200%"}
    )),t=D.color(t),t.error&&(t=D.color("rgba(0,0,0,1)")),h=D.pick(t.opacity,1),this._.shadowFilter=g[d]={
      use:1,filter:F,hash:d,offset:F.appendChild(N("feOffset",{
        result:"offOut","in":"SourceGraphic",dx:u(b),dy:u(e)}
      )),matrix:F.appendChild(N("feColorMatrix",{
        result:"matrixOut","in":"offOut",type:"matrix",values:"0 0 0 0 "+t.r/255+" 0 0 0 0 "+t.g/255+" 0 0 0 0 "+t.b/255+" 0 0 0 "+h+" 0"}
      )),blur:F.appendChild(N("feGaussianBlur",{
        result:"blurOut","in":"matrixOut",stdDeviation:k(u(a))}
      )),blend:F.appendChild(N("feComposite",
{
        "in":"SourceGraphic",in2:"blurOut",operator:"over"}
      ))}
    ,q.setAttribute("filter",'url("'+D._url+"#"+F.id+'")'));
    return this}
  ),J=function(c,e){
    var a=this.__shadowscale,k={
      }
    ,q,F;
    for(F in c)switch(b[F]&&(k[F]=c[F],delete c[F]),F){
      case "transform":q=e.matrix.clone();
      q.translate(this.__shadowx,this.__shadowy);
      this.transform(q.toTransformString());
      break;
      case "stroke-width":c[F]=((k[F]||1)+6-2*this.__shadowlevel)*a}
    this.attr(c);
    for(F in k)c[F]=k[F]}
  ,D.ca["drop-shadow"]=function(b,e,a,k,u,F){
    a=this._.shadows||
(this._.shadows=[]);
    var g,d,h,l,L;
    if(!this.__shadowblocked)if("none"===b)for(;
    d=a.pop();
    )d.remove();
    else for(k=D.color(k),k.error&&(k=D.color("rgba(0,0,0,1)")),u instanceof Array?(g=u[0],u=u[1]):g=u,g=1/D.pick(g,1),u=1/D.pick(u,1),b=D.pick(b,1)*g,e=D.pick(e,1)*g,g=.05*D.pick(k.opacity,1),h=q(this.attr("stroke-width")||1,10)+6,l=this.matrix.clone(),l.translate(b,e),L=1;
    3>=L;
    L++)d=(a[L-1]||this.clone().follow(this,J,!F&&"before")).attr({
      stroke:k.hex,"stroke-opacity":g*L,"stroke-width":(h-2*L)*u,transform:l.toTransformString(),
"stroke-linecap":"round","stroke-linejoin":"round",fill:"none"}
    ),d.__shadowlevel=L,d.__shadowscale=u,d.__shadowx=b,d.__shadowy=e,F&&F.appendChild(d),a.push(d);
    return!1}
  ,D.el.shadow=function(b,e,a,k){
    var q;
    a&&a.constructor===D.el.constructor&&(k=a,a=void 0);
    "object"===typeof b&&(e&&e.constructor===D.el.constructor&&(k=e),e=b.opacity,a=b.scalefactor,q=!!b.useFilter,b=void 0===b.apply?!!e:b.apply);
    void 0===e&&(e=1);
    if(this.dropshadow){
      if(q)return b&&this.dropshadow(1,1,3,"rgb(64,64,64)")||this.dropshadow("none"),
this;
      this._.shadowFilter&&this.dropshadow("none")}
    return this.attr("drop-shadow",b?[1,1,3,"rgba(64,64,64,"+e+")",a,k]:"none")}
  ):D.vml?(D.ca["drop-shadow"]=function(b,e,a,k,q,F){
    var g=this._.shadow,d,h;
    if(this.isShadow)return!1;
    "none"===b?g&&(this._.shadow=g.remove()):(g||(g=this._.shadow=this.clone(),F&&F.appendChild(g.follow(this))||g.follow(this,void 0,"before"),g.attr({
      fill:"none","fill-opacity":.5,"stroke-opacity":1}
    ).isShadow=!0,0>=g.attr("stroke-width")&&g.attr("stroke-width",1)),F=g.node.runtimeStyle,
d=F.filter.replace(/ progid:\S+Blur\([^\)]+\)/g,""),k=D.color(k),k.error&&(k=D.color("rgba(0,0,0,1)")),h=D.pick(k.opacity,1)/5,q=1/D.pick(q,1),b=D.pick(b,1)*q,e=D.pick(e,1)*q,g.translate(b,e),F.filter=d+" progid:DXImageTransform.Microsoft.Blur(pixelRadius="+u(.4*a)+" makeShadow=True Color="+k.hex+' shadowOpacity="'+h+'");
    ');
    return!1}
  ,D.el.shadow=function(b,e,a,k){
    a&&a.constructor===D.el.constructor&&(k=a,a=void 0);
    "object"===typeof b&&(e&&"group"===e.type&&(k=e),e=b.opacity,a=b.scalefactor,b=void 0===
b.apply?!!e:b.apply);
    void 0===e&&(e=1);
    return this.attr("drop-shadow",b||!e?[1,1,5,"rgba(64,64,64,"+e+")",a,k]:"none")}
  ):D.canvas&&(D.el.shadow=function(){
    return this}
  )}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-raphaelshapes",function(){
  var e=this.window,k="createTouch"in e.document,u=/msie/i.test(e.navigator.userAgent)&&!e.opera,q=e.Math,D=q.cos,b=q.sin,N=q.abs,J=q.pow,c=q.atan2,p=q.tan,a=q.acos,t=q.min,U=q.round,F=q.PI,g=q.sqrt,d=2*F,h=e.parseInt,l=e.parseFloat,L=String,P=Array.prototype.slice,n=J(2,-24),C="rgba(192,192,192,"+(u?.002:1E-6)+")",w=this.hcLib.Raphael,R=w.eve,v=w._createNode,oa=w._setFillAndStroke,ea=w.el.constructor,$={
    speed:"optimizeSpeed",
crisp:"crispEdges",precision:"geometricPrecision"}
  ,W={
    enabled:!1,"false":!1,0:!1,disabled:!0,"true":!0,1:!0}
  ,pa={
    Q:"L",Z:"X",q:"l",z:"x",",":" "}
  ,Ca=/,?([achlmqrstvxz]),?/gi,fa=/\s*\,\s*/g,la,Q=function(){
    return this.join(",").replace(Ca,la)}
  ,ya,G,S=w._cacher(function(a,b,c,d){
    return g(J(c-a,2)+J(d-b,2))}
  ),ba=w._cacher(function(a,b,c,d,e){
    var g=c-a,h=d-b;
    c=S(a,b,c,d);
    return{
      x:a+g/c*e,y:b+h/c*e}
    }
  );
  if(w.svg)R.on("raphael.attr.shape-rendering",function(a,b){
    var c=this.node;
    this.attrs[b]=a=$[a]||a||"auto";
    
c.setAttribute(b,a);
    c.style.shapeRendering=a}
  );
  else if(w.vml)R.on("raphael.attr.shape-rendering",function(a){
    this.node.style.antialias="crisp"!==a}
  );
  w.define&&w.define([{
    name:"polypath",polypath:function(){
      return this.path(void 0,w._lastArgIfGroup(arguments))}
    ,ca:{
      polypath:function(a,c,d,e,g,n){
        var k,G,v;
        k=[];
        a=h(a,10)||0;
        c=l(c)||0;
        d=l(d)||0;
        e=l(e)||0;
        g=null===g||isNaN(g)?.5*F:w.rad(g);
        n=null===n||isNaN(n)?0:l(n);
        G=g;
        if(2<a)switch(g=2*F/a,n){
          case 0:for(n=0;
          n<a;
          n++)k.push("L",c+e*D(-G),d+e*b(-G)),
G+=g;
          k[0]="M";
          k.push("Z");
          break;
          case 1:for(n=0;
          n<a;
          n++)k.push("M",c,d,"L",c+e*D(-G),d+e*b(-G)),G+=g;
          break;
          default:g*=.5;
          v=e*D(g)*(1-n);
          for(n=0;
          n<a;
          n++)k.push("L",c+e*D(-G),d+e*b(-G)),G+=g,k.push("L",c+v*D(-G),d+v*b(-G)),G+=g;
          k[0]="M";
          k.push("Z")}
        else 0===e?k.push("M",c,d,"L",c,d,"Z"):k.push("M",c-e,d,"A",e,e,0,0,0,c+e,d,"A",e,e,0,0,0,c-e,d,"Z");
        return{
          path:k}
        }
      ,r:function(a){
        var b=this.attrs.polypath;
        b[3]=a;
        this.attr("polypath",b);
        return!1}
      }
    }
  ,{
    name:"ringpath",ringpath:function(){
      return this.path(void 0,
w._lastArgIfGroup(arguments))}
    ,ca:function(a,c,e,g,h,l){
      var k=l%d-h%d,w=l-h,G,v,p,t,C;
      this._.ringangle=.5*(h+l);
      N(w)<n?(w=D(h),h=b(h),e=["M",a+e*w,c+e*h,"L",a+g*w,c+g*h,"Z"]):(N(w)>n&&N(w)%d<n?(e=["M",a-e,c,"A",e,e,0,0,0,a+e,c,"A",e,e,0,0,0,a-e,c],0!==g&&(e=e.concat(["M",a-g,c,"A",g,g,0,0,1,a+g,c,"A",g,g,0,0,1,a-g,c]))):(w=D(h),h=b(h),G=D(l),l=b(l),k%=d,0>k&&(k+=d),k=k<F?0:1,v=a+e*w,t=c+e*h,p=a+e*G,C=c+e*l,G=a+g*G,l=c+g*l,.01>N(v-p)&&.01>N(t-C)&&(t=C+.01),e=["M",v,t,"A",e,e,0,k,1,p,C,"L",G,l],0!==
g&&(a+=g*w,c+=g*h,.01>N(G-a)&&.01>N(l-c)&&(c=l+.01),e.push("A",g,g,0,k,0,a,c))),e.push("Z"));
      return{
        path:e}
      }
    }
  ,{
    name:"cubepath",cubepath:function(){
      var a={
        "stroke-linejoin":"round","shape-rendering":"precision",stroke:"none"}
      ,b=arguments,c=b.length-1,d=b[c],e,g;
      d&&d.constructor===w.el.constructor?b[c]=void 0:d=void 0;
      c=this.path(a,d);
      e=this.path(a,d);
      a=this.path(a,d);
      a._.cubetop=c.follow(a,void 0,"before");
      a._.cubeside=e.follow(a,void 0,"before");
      for(g in w.fn.cubepath.ca)a.ca[g]=w.fn.cubepath.ca[g];
      
return a.attr("cubepath",[b[0],b[1],b[2],b[3],b[4],b[5]])}
    ,fn:{
      _getBBox2:function(){
        var a=this._.cubeside.getBBox(),b=this._.cubetop.getBBox(),c=this.getBBox();
        return{
          x:c.x+b.height,y:c.y-a.width,width:c.width,height:c.height}
        }
      }
    ,ca:{
      cubepath:function(a,b,c,d,e,g){
        var h=this._.cubetop,n=this._.cubeside;
        a=a||0;
        b=b||0;
        c=c||0;
        d=d||0;
        e=e||0;
        g=g||0;
        this.attr("path",["M",a+c,b,"l",0,d,-c,0,0,-d,"z"]);
        h.attr("path",["M",a,b,"l",1,1,c-1,0,0,-1,e,-g,-c,0,"z"]);
        n.attr("path",["M",a+c-1,b+1,"l",0,d-1,1,0,e,-g,
0,-d,-e,g]);
        return!1}
      ,"stroke-linejoin":function(){
        return{
          "stroke-linejoin":"round"}
        }
      ,"drop-shadow":function(a,b,c,d){
        var e=this._.cubetop,g=this._.cubeside;
        this.dropshadow&&(e.dropshadow(a,-b,c,d),g.dropshadow(a,-b,c,d));
        return!1}
      ,fill:function(a,b){
        var d=this._.cubetop,e=this._.cubeside,g=this.attr("cubepath")||[0,0,0,0,0,0],h=g[2],n=g[4],g=g[5],l;
        a=w.color(a);
        b?(this.attr("fill",a),d.attr("fill",w.tintshade(a,-.78).rgba),e.attr("fill",w.tintshade(a,-.65).rgba)):(l="opacity"in a?"rgba("+[a.r,a.g,
a.b,a.opacity]+")":"rgb("+[a.r,a.g,a.b]+")",this.attr("fill",[270,w.tintshade(l,.55).rgba,w.tintshade(l,-.65).rgba].join("-")),e.attr("fill",[270,w.tintshade(l,-.75).rgba,w.tintshade(l,-.35).rgba].join("-")),d.attr("fill",[45+w.deg(c(g,n+h)),w.tintshade(l,-.78).rgba,w.tintshade(l,.22).rgba].join("-")));
        return!1}
      }
    }
  ,{
    name:"scroller",scroller:function(a,b,c,d,e,g,h){
      var n=this.group("scroller",h),k=n.attrs,G=n._.scroller={
        }
      ;
      e=e&&"horizontal"||"vertical";
      var v,p={
        }
      ,t,C,q;
      G.track=this.rect(n).mousedown(function(a){
        var b=
k["scroll-position"];
        a="horizontal"===k["scroll-orientation"]?a.layerX||a.x:a.layerY||a.y;
        a=(a-G.anchorOffset)/G.trackLength;
        v=w.animation({
          "scroll-position":a}
        ,2E3*N(b-a),"easeIn");
        n.animate(v);
        R("raphael.scroll.start."+n.id,n,b)}
      ).mouseup(G._mouseupTrack=function(){
        this.stop(v);
        R("raphael.scroll.end."+this.id,this,k["scroll-position"])}
      ,n,!0);
      G.anchor=this.rect(n).drag(function(){
        p["scroll-position"]=t+arguments[C]/G.trackLength;
        n.animate(p,0)}
      ,function(a,b,c){
        C="horizontal"===k["scroll-orientation"]?
0:1;
        R("raphael.scroll.start."+n.id,n,t=k["scroll-position"]);
        c.stopPropagation()}
      ,function(){
        R("raphael.scroll.end."+n.id,n,t=k["scroll-position"])}
      );
      for(q in w.fn.scroller.fn)n[q]=w.fn.scroller.fn[q];
      for(q in w.fn.scroller.ca)n.ca[q]=w.fn.scroller.ca[q];
      k["scroll-orientation"]=e;
      k["stroke-width"]=1;
      n.ca["scroll-repaint"]=n.ca["scroll-repaint-"+e];
      !w.is(g,"object")&&(g={
        }
      );
      return n.attr({
        ishot:!0,"scroll-display-buttons":g.showButtons&&"arrow"||"none","scroll-display-style":g.displayStyleFlat&&"flat"||
"3d","scroll-ratio":l(g.scrollRatio)||1,"scroll-position":l(g.scrollPosition)||0,"scroll-repaint":[a,b,c,d]}
      )}
    ,fn:{
      scroll:function(a,b){
        var c=this._.scroller;
        b=b||this;
        c.callback=function(){
          return a.apply(b,arguments)}
        ;
        return this}
      ,remove:function(){
        var a=this._.scroller,b;
        this.attr("scroll-display-buttons","none");
        a.track.unmouseup(a._mouseupTrack);
        for(b in a)a[b]&&a[b].remove&&a[b].remove(),a[b]=null;
        delete this._.scroller;
        w.el.remove.apply(this,arguments)}
      }
    ,ca:{
      "stroke-width":function(){
        return!1}
      ,
"drop-shadow":function(a,b,c,d,e,g){
        this._.scroller.track.attr("drop-shadow",[a,b,c,d,e,g]);
        return!1}
      ,"scroll-display-style":function(a){
        var b=this.attrs,c=b["scroll-display-style"],d=b.fill;
        a={
          flat:"flat","3d":"3d",transparent:"transparent"}
        [a]||c;
        d&&a!==c&&(b["scroll-display-style"]=a,this.attr("fill",d));
        return{
          "scroll-display-style":a}
        }
      ,"scroll-display-buttons":function(a){
        var b=this,c=b.paper,d=b._.scroller,e=b.attrs,g=e["scroll-display-buttons"],h=e["scroll-repaint"],n,l;
        void 0===g&&(g="none");
        
a={
          none:"none",arrow:"arrow"}
        [a]||g;
        a!==g&&(e["scroll-display-buttons"]=a,"none"===a&&d.start?(d.arrowstart.remove(),delete d.arrowstart,d.arrowend.remove(),delete d.arrowend,d.start.unmouseup(d._mouseupStart),d.start.remove(),delete d.start,d.end.unmouseup(d._mouseupEnd),d.end.remove(),delete d.end):(d.arrowstart=c.polypath(b),d.arrowend=c.polypath(b),d.start=c.rect(b).mousedown(function(){
          var a;
          0!==(a=e["scroll-position"])&&(b.animate({
            "scroll-position":a-.1}
          ,100).animate(n=w.animation({
            "scroll-position":0}
          ,
4500*a,"easeIn")),R("raphael.scroll.start."+b.id,b,a))}
        ).mouseup(d._mouseupStart=function(){
          b.stop(n);
          R("raphael.scroll.end."+b.id,b,e["scroll-position"])}
        ,b,!0),d.end=c.rect(b).mousedown(function(){
          var a;
          1!==(a=e["scroll-position"])&&(b.animate({
            "scroll-position":a+.1}
          ,100).animate(l=w.animation({
            "scroll-position":1}
          ,4500*(1-a),"easeIn")),R("raphael.scroll.start."+b.id,b,a))}
        ).mouseup(d._mouseupEnd=function(){
          b.stop(l);
          R("raphael.scroll.end."+b.id,b,e["scroll-position"])}
        ,b,!0),e.fill&&b.attr("fill",
e.fill)),h&&b.attr("scroll-repaint",h));
        return{
          "scroll-display-buttons":a}
        }
      ,"scroll-orientation":function(a){
        var b=this.attrs,c=b["scroll-repaint"],d=b["scroll-orientation"];
        a={
          horizontal:"horizontal",vertical:"vertical"}
        [a]||d;
        d!==a&&(this.ca["scroll-repaint"]=this.ca["scroll-repaint-"+a],c&&(c[2]+=c[3],c[3]=c[2]-c[3],c[2]-=c[3],this.attr("scroll-repaint",c)),b.fill&&this.attr("fill",b.fill));
        return{
          "scroll-orientation":a}
        }
      ,"scroll-ratio":function(a){
        var b=this.attrs,c=b["scroll-ratio"],d=b["scroll-repaint"];
        
a=1<a?1:.01>a?.01:l(a);
        d&&a!==c&&(b["scroll-ratio"]=a,this.attr("scroll-repaint",d));
        return{
          "scroll-ratio":a}
        }
      ,"scroll-position":function(a,b){
        var c=this.attrs,d="horizontal"===c["scroll-orientation"],e=c["scroll-repaint"],g=c["scroll-position"],h=this._.scroller,n=h.anchor;
        a=1<a?1:0>a?0:l(a);
        isNaN(a)&&(a=g);
        e&&(g!==a||b)&&(g=h.start&&h.start.attr(d&&"width"||"height")||0,d&&n.attr("x",e[0]+g+(e[2]-2*g-n.attr("width"))*a+.5)||n.attr("y",e[1]+g+(e[3]-2*g-n.attr("height"))*a+.5),!b&&1>c["scroll-ratio"]&&
(R("raphael.scroll.change."+this.id,this,a),h.callback&&h.callback(a)));
        return{
          "scroll-position":a}
        }
      ,r:function(a){
        var b=this._.scroller;
        b.track.attr("r",a);
        b.anchor.attr("r","none"===this.attrs["scroll-display-buttons"]&&a||0);
        return!1}
      ,"scroll-repaint-horizontal":function(a,b,c,d){
        var e=this.attrs,g=this._.scroller,h=e["scroll-ratio"],n=e["scroll-position"],l=0,k=c*h,e="none"===e["scroll-display-buttons"];
        c&&--c;
        a&&(a+=.5);
        d&&--d;
        b&&(b+=.5);
        g.track.attr({
          width:c,height:d,y:b,x:a}
        ).crisp();
        e||(l=
t(d,.5*c),k-=2*l*h,g.start.attr({
          width:l,height:d,x:a,y:b}
        ),g.arrowstart.attr("polypath",[3,a+.5*l,b+.5*d,.25*l,180]),g.end.attr({
          width:l,height:d,x:a+c-l,y:b}
        ),g.arrowend.attr("polypath",[3,a+c-.5*l,b+.5*l,.25*l,0]));
        g.trackLength=c-2*l-k;
        g.trackOffset=a+l+.5;
        g.anchorOffset=g.trackOffset+.5*(k-1);
        g.anchor.attr({
          height:d,width:k-1,y:b,x:g.trackOffset+g.trackLength*n}
        ).crisp()}
      ,"scroll-repaint-vertical":function(a,b,c,d){
        var e=this.attrs,g=this._.scroller,h=e["scroll-ratio"],n=e["scroll-position"],
l=0,k=d*h,e="none"===e["scroll-display-buttons"];
        c&&--c;
        a&&(a+=.5);
        d&&--d;
        b&&(b+=.5);
        g.track.attr({
          width:c,height:d,y:b,x:a}
        ).crisp();
        e||(l=t(c,.5*d),k-=2*l*h,g.start.attr({
          width:c,height:l,x:a,y:b}
        ),g.arrowstart.attr("polypath",[3,a+.5*c,b+.5*l,.25*l,90]),g.end.attr({
          width:c,height:l,x:a,y:b+d-l}
        ),g.arrowend.attr("polypath",[3,a+.5*c,b+d-.5*l,.25*l,-90]));
        g.trackLength=d-2*l-k;
        g.trackOffset=b+l+.5;
        g.anchorOffset=g.trackOffset+.5*(k-1);
        g.anchor.attr({
          height:k-1,width:c,y:g.trackOffset+g.trackLength*
n,x:a}
        ).crisp()}
      ,fill:function(a){
        var b=this.attrs,c=this._.scroller,d=b["scroll-repaint"],e="flat"===b["scroll-display-style"],g="horizontal"===b["scroll-orientation"],h={
          stroke:"none"}
        ,n;
        k&&d&&3<(n=16-d[g&&3||2])&&(h.stroke=C,h["stroke-width"]=n);
        a=w.color(a);
        a.error&&(a="#000000");
        a="opacity"in a?"rgba("+[a.r,a.g,a.b,a.opacity]+")":"rgb("+[a.r,a.g,a.b]+")";
        h.fill=e&&a||[90*g,w.tintshade(a,.15).rgba,a].join("-");
        h.stroke=w.tintshade(a,-.75).rgba;
        c.track.attr(h);
        h.fill=e&&w.tintshade(a,-.6).rgba||
[270*g,w.tintshade(a,.3).rgba+":40",w.tintshade(a,-.7).rgba].join("-");
        h.stroke=w.tintshade(a,-.6).rgba;
        c.anchor.attr(h);
        h.stroke="none";
        "none"!==b["scroll-display-buttons"]&&(h.fill=C,c.start.attr(h),c.end.attr(h),h.fill=w.tintshade(a,-.4).rgba,c.arrowstart.attr(h),c.arrowend.attr(h));
        return!1}
      }
    }
  ,{
    name:"button",button:function(a,b,c,d,e,g){
      g=this.group("button",g);
      var h;
      g._.button={
        bound:this.rect(g),tracker:this.rect(g).attr({
          fill:C,stroke:C,cursor:"pointer"}
        ).data("compositeButton",g)}
      ;
      !w.is(e,
"object")&&(e={
        }
      );
      for(h in w.fn.button.fn)g[h]=w.fn.button.fn[h];
      for(h in w.fn.button.ca)g.ca[h]=w.fn.button.ca[h];
      return g.attr({
        ishot:!0,"button-padding":[e.horizontalPadding,e.verticalPadding],"button-label":c,"button-symbol":d,"button-disabled":e.disabled||"false","button-symbol-position":e.symbolPosition,"button-symbol-padding":e.symbolPadding}
      ).attr("button-repaint",[a,b,e.width,e.height,e.r])}
    ,data:{
      hoverin:function(){
        var a=this._.button.hoverbackIn;
        a&&!1===a()||(this.attr("fill","hover").hovered=
!0)}
      ,hoverout:function(){
        var a=this._.button.hoverbackOut;
        a&&!1===a()||(this.attr("fill",(this.pressed||this.active)&&"active"||"normal").hovered=!1)}
      ,mousedown:function(){
        this.attr("fill","active").pressed=!0}
      ,mouseup:function(){
        var a=this._.button.callback;
        this.attr("fill",this.hovered&&"hover"||this.active&&"active"||"normal").pressed=!1;
        a()}
      }
    ,fn:{
      tooltip:function(){
        w.el.tooltip&&w.el.tooltip.apply(this._.button.tracker,arguments);
        return this}
      ,buttonclick:function(a,b){
        var c=this._.button;
        b=b||
this;
        c.callback=function(){
          return a.apply(b,arguments)}
        ;
        return this}
      ,labelcss:function(){
        var a=this._.button,b=a.label;
        a.cssArg=arguments;
        b&&b.css.apply(b,arguments);
        return this.attr("button-repaint",this.attrs["button-repaint"])}
      ,buttonhover:function(a,b,c,d){
        var e=this._.button;
        c=c||this;
        d=d||this;
        e.hoverbackIn=function(){
          return a.apply(c,arguments)}
        ;
        e.hoverbackOut=function(){
          return b.apply(d,arguments)}
        ;
        return this}
      ,remove:function(){
        var a=this._.button,b;
        this.attr("button-disabled","true");
        for(b in a)a[b]&&
a[b].remove&&a[b].remove(),a[b]=null;
        delete this._.button;
        w.el.remove.apply(this,arguments)}
      }
    ,ca:{
      "button-active":function(a){
        this.attr("fill",(this.active=!!a)?"active":this.hovered&&"hover"||"normal")}
      ,"button-disabled":function(a){
        var b=this._.button.tracker,c=this.attrs["button-disabled"],d=this.paper.button.data;
        a=W[a];
        c=W[c];
        if(void 0!==a&&a!==c)switch(a){
          case !0:b.attr("fill","rgba(204,204,205,.5)").unmousedown(d.mousedown).unmouseup(d.mouseup).unhover(d.hoverin,d.hoverout);
          break;
          case !1:b.attr("fill",
C).mousedown(d.mousedown,this).mouseup(d.mouseup,this,!0).hover(d.hoverin,d.hoverout,this,this)}
        }
      ,"button-label":function(a){
        var b=this._.button,c=this.attrs,d=b.label,e=b.cssArg,g=this.attrs["button-repaint"];
        a=L(a||"");
        "none"===a?d&&(b.label=d.remove()):a&&(!d&&(d=b.label=this.paper.text(this).insertBefore(b.tracker)),d.attr({
          text:a,"text-anchor":"middle","vertical-align":"middle"}
        ),e&&e.length&&d.css.apply(d,e));
        g&&c["button-label"]!==a&&this.attr("button-repaint",g)}
      ,"button-symbol":function(a){
        var b=
this.attrs,c=this._.button,d=c.symbol,e=this.attrs["button-repaint"];
        a=L(a||"");
        "none"===a?d&&(c.symbol=d.remove()):a&&!d&&(c.symbol=this.paper.symbol(this).insertAfter(c.bound));
        e&&b["button-symbol"]!==a&&this.attr("button-repaint",e)}
      ,"button-symbol-position":function(a){
        return{
          "button-symbol-position":{
            top:"top",right:"right",bottom:"bottom",left:"left",none:"none"}
          [L(a).toLowerCase()]||"none"}
        }
      ,"button-symbol-padding":function(a){
        return{
          "button-symbol-padding":l(a)}
        }
      ,"button-padding":function(a,
b){
        return{
          "button-padding":[null==a&&(a=5)||l(a),null==b&&a||l(b)]}
        }
      ,"button-repaint":function(a,b,c,d,e){
        var g=this._.button,h=g.bound,n=g.label,l=g.symbol,k=this.attrs,G=k["button-padding"],v=G[0],p=G[1],C,q;
        void 0===a&&(a=0);
        void 0===b&&(b=0);
        if(void 0===c||void 0===d)C=n&&n.getBBox()||{
          width:0,height:0}
        ,void 0===c&&(c=2*v+C.width),void 0===d&&(d=2*p+C.height);
        h=w.crispBound(a,b,c,d,h.attr("stroke-width"));
        h.r=w.pick(e,U(.1*t(d,c)));
        a=h.x;
        b=h.y;
        c=h.width;
        d=h.height;
        n&&n.attr({
          x:a+c/2,y:b+d/2}
        );
        
if(l){
          !w.is(q=k["button-symbol-padding"],"finite")&&(q=.2*d);
          e=d-p;
          C=.5*e;
          switch(k["button-symbol-position"]+(n&&"+"||"-")){
            case "right+":a=a+(c+(2*C+p))-C-v;
            b+=.5*d;
            n.attr("transform",["t",-(e+q),0]);
            break;
            case "left+":a=a+v+C;
            b+=.5*d;
            n.attr("transform",["t",e+q,0]);
            break;
            case "top+":a+=.5*c;
            b=b+G[1]+C;
            n.attr("transform",["t",0,e+q]);
            break;
            case "bottom+":a+=.5*c;
            b=b+(d+(2*C+q))-p-C;
            n.attr("transform",["t",0,-(e+q)]);
            break;
            default:a+=.5*c,b+=.5*d}
          l.attr("symbol",[k["button-symbol"],a,b,C])}
        g.bound.attr(h);
        
g.tracker.attr(h)}
      ,fill:function(a,b,c,d){
        var e=this._.button,g=e.bound,h=e.symbol,n=e.label,l={
          normal:e.gradient,active:e.gradientActive,hover:e.gradientHover}
        [a];
        l||(a=w.getRGB(a),a.error&&(a=w.color("#cccccc")),a="opacity"in a?"rgba("+[a.r,a.g,a.b,a.opacity]+")":"rgb("+[a.r,a.g,a.b]+")",e.gradient=[90,w.tintshade(a,-.8).rgba+":0",w.tintshade(a,.8).rgba+":100"].join("-"),e.gradientActive=[270,w.tintshade(a,-.8).rgba+":0",w.tintshade(a,.8).rgba+":100"].join("-"),d=w.getRGB(d),d.error&&(d=a)||(d=
"opacity"in d?"rgba("+[d.r,d.g,d.b,d.opacity]+")":"rgb("+[d.r,d.g,d.b]+")"),e.gradientHover=[90,w.tintshade(d,-.9).rgba+":0",w.tintshade(d,.7).rgba+":100"].join("-"),c=c||w.tintshade(a,.2).rgba,b=b||w.tintshade(a,-.2).rgba,e.symbolFill=c,e.labelFill=b,l=(this.pressed||this.active)&&e.gradientActive||this.hovered&&e.gradienthover||e.gradient);
        g.attr("fill",l);
        h&&h.attr("fill",e.symbolFill);
        n&&n.attr("fill",e.labelFill);
        return!1}
      ,stroke:function(a,b){
        var c=this._.button,d=c.symbol;
        a=w.color(a);
        a.error&&
(a=w.color("#999999"));
        c.bound.attr("stroke",a);
        d&&d.attr("stroke",b||a);
        return!1}
      ,"stroke-width":function(a,b){
        var c=this._.button,d=c.symbol;
        c.bound.attr("stroke-width",a);
        c.tracker.attr("stroke-width",a);
        d&&d.attr("stroke-width",b);
        return!1}
      }
    }
  ,{
    name:"trianglepath",trianglepath:function(){
      var a=arguments,b=w._lastArgIfGroup(a);
      return this.path(b).attr("trianglepath",[a[0],a[1],a[2],a[3],a[4],a[5],a[6]||0,a[7]||0,a[8]||0])}
    ,fn:{
      sides:function(){
        var a=this._args;
        return[S(a[0],a[1],a[2],a[3]),S(a[2],
a[3],a[4],a[5]),S(a[4],a[5],a[0],a[1])]}
      ,enclosedAngles:function(){
        var b=this._sides;
        return[a((J(b[0],2)+J(b[2],2)-J(b[1],2))/(2*b[0]*b[2])),a((J(b[0],2)+J(b[1],2)-J(b[2],2))/(2*b[0]*b[1])),a((J(b[2],2)+J(b[1],2)-J(b[0],2))/(2*b[2]*b[1]))]}
      ,semiperimeter:function(){
        var a=this._sides||this.sides();
        return(a[0]+a[1]+a[2])/2}
      }
    ,ca:{
      trianglepath:function(a,b,c,d,e,h,n,l,k){
        if(n||l||k){
          this._args=arguments;
          this._sides=this.sides();
          var G=this.enclosedAngles(),w;
          w=this.semiperimeter();
          w=g(w*(w-this._sides[0])*
(w-this._sides[1])*(w-this._sides[2]))/w;
          G=[t(n,w)/p(G[0]/2),t(l,w)/p(G[1]/2),t(k,w)/p(G[2]/2)];
          G=[ba(a,b,e,h,G[0]),ba(a,b,c,d,G[0]),ba(c,d,a,b,G[1]),ba(c,d,e,h,G[1]),ba(e,h,c,d,G[2]),ba(e,h,a,b,G[2])];
          this.attr({
            path:["M",G[0].x,G[0].y,"Q",a,b,G[1].x,G[1].y,"L",G[2].x,G[2].y,"Q",c,d,G[3].x,G[3].y,"L",G[4].x,G[4].y,"Q",e,h,G[5].x,G[5].y,"L",G[0].x,G[0].y]}
          )}
        else this.attr({
          path:["M",a,b,"L",c,d,e,h,"Z"]}
        )}
      }
    }
  ]);
  w.ca["text-bound"]=function(a,b,c,d,e,g){
    d=this.paper;
    var h=this._.textbound;
    if("text"===
this.type){
      if(!(b&&"none"!==b||a&&"none"!==a))return this._.textbound=h&&h.unfollow(this).remove(),!1;
      c&&w.is(c,"finite")||(c=0);
      e&&w.is(e,"finite")||(e=0);
      !h&&(h=this._.textbound=d.rect(0,0,0,0,this.group).follow(this,w.ca["text-bound"].reposition,"before"));
      h.attr({
        stroke:b,"stroke-width":c,fill:a,"shape-rendering":1===c&&"crisp"||"",r:e}
      );
      g&&h.attr("stroke-dasharray",g);
      w.ca["text-bound"].reposition.call(h,this.attr(),this);
      return!1}
    }
  ;
  w.ca["text-bound"].reposition=function(a,b){
    var c={
      }
    ,d,e,g,
h,n;
    a.hasOwnProperty("visibility")&&this.attr("visibility",a.visibility);
    if(a.hasOwnProperty("text-bound")||a.hasOwnProperty("x")||a.hasOwnProperty("y")||a.hasOwnProperty("text")||a.hasOwnProperty("text-anchor")||a.hasOwnProperty("text-align")||a.hasOwnProperty("font-size")||a.hasOwnProperty("line-height")||a.hasOwnProperty("vertical-align")||a.hasOwnProperty("transform")||a.hasOwnProperty("rotation"))d=b.attrs["text-bound"],e=L(d&&d[3]||"0").split(fa),d=l(e[0])||0,e=w.pick(l(e[1]),d),g=b.getBBox(),
h=g.width,n=g.height,isNaN(h)||(c.x=g.x-d,c.y=g.y-e,c.width=h+2*d,c.height=n+2*e),this.attr(c)}
  ;
  w.fn.symbol=function(){
    var a=arguments,b=a.length-1,c=a[b];
    c&&c.constructor===w.el.constructor?a[b]=void 0:c=void 0;
    b=this.path(void 0,c);
    b.ca.symbol=w.fn.symbol.ca.symbol;
    return a.length===!!c+0?b:b.attr("symbol",a)}
  ;
  w.fn.symbol.cache={
    "":w._cacher(function(a,b,c,d){
      return 3<arguments.length?["M",a,b,"h",c,"v",d,"h",-c,"v",-d,"z"]:["M",a-c,b-c,"h",c*=2,"v",c,"h",-c,"v",-c,"z"]}
    )}
  ;
  w.fn.symbol.ca={
    symbol:function(a){
      var b=
w.is(a,"object")&&1===arguments.length&&!w.is(a,"function")?a:arguments,c;
      b===a&&(a=b[0]);
      b=(c=w.is(a,"function")&&a||w.fn.symbol.cache[a]||w.fn.symbol.cache[""])&&c.apply(w,P.call(b,1));
      w.is(b,"array")||w.is(b,"string")?this.attr("path",b):b&&this.attr(b)}
    }
  ;
  w.addSymbol=function(a,b){
    var c=w.is(b,"function")&&(c={
      }
    ,c[a]=b,c)||a,d=w.fn.symbol.cache,e=[],g;
    for(g in c)b=c[g],d[g]=w.is(b,"function")&&w._cacher(b,w)||(e.push(g),b);
    for(;
    g=e.pop();
    )d[g]=d[d[g]]}
  ;
  w.svg?(la="$1",ya=function(a){
    a?"string"===
typeof a?a=a.replace(Ca,la):a.toString=Q:a="M0,0";
    this.node.setAttribute("d",a.toString());
    return this}
  ,w._engine.litepath=function(a,b,c,d){
    a=v("path");
    (d||b).canvas.appendChild(a);
    b=new ea(a,b,d);
    b.type="litepath";
    b.id=a.raphaelid=w._oid++;
    a.raphael=!0;
    oa(b,{
      fill:"none",stroke:"#000"}
    );
    return b}
  ,w._getPath.litepath=function(a){
    return w.parsePathString(a.node.getAttribute("d"))}
  ):w.vml&&(la=function(a,b){
    return pa[b]||b}
  ,G=function(){
    this._transform.apply(this,arguments);
    this._.bcoord&&(this.node.coordsize=
this._.bcoord);
    return this}
  ,ya=function(a){
    a?"string"===typeof a?a=a.replace(Ca,la):a.toString=Q:a="M0,0";
    this.node.path=a;
    return this}
  ,w._engine.litepath=function(a,b,c,d){
    a=v("shape");
    var e=a.style,g=new ea(a,b,d);
    e.cssText="position:absolute;
    left:0;
    top:0;
    width:21600px;
    height:21600px;
    ";
    c=l(c);
    isNaN(c)?a.coordsize="21600 21600":(g._.bzoom=c,e.width="1px",e.height="1px",a.coordsize=g._.bcoord=c+" "+c);
    a.coordorigin=b.coordorigin;
    g.type="litepath";
    g.id=a.raphaelid=w._oid++;
    a.raphael=!0;
    g._transform=
g.transform;
    g.transform=G;
    w._setFillAndStroke(g,{
      fill:"none",stroke:"#000"}
    );
    (d||b).canvas.appendChild(a);
    b=v("skew");
    b.on=!0;
    a.appendChild(b);
    g.skew=b;
    return g}
  ,w._getPath.litepath=function(a){
    return w.parsePathString(a.node.path||"")}
  );
  w.fn.litepath=function(a,b,c){
    b&&b.constructor===ea&&(c=b,b=void 0);
    a&&a.constructor===ea&&(c=a,a="");
    b=w._engine.litepath(a,this,b,c);
    b.ca.litepath=ya;
    a&&b.attr("litepath",w.is(a,"array")?[a]:a);
    return this.__set__&&this.__set__.push(b),this._elementsById[b.id]=
b}
  }
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-htmlrenderer",function(){
  var e=this.hcLib,k=e.Raphael,u=e.dem,q=this.window,D=q.document,b=/msie/i.test(q.navigator.userAgent)&&!q.opera,N="VML"===k.type,J=e.hasTouch,c={
    cursor:"cursor"}
  ,p={
    x:"left",y:"top",strokeWidth:"borderThickness","stroke-width":"borderThickness",width:"width",height:"height"}
  ,a={
    fill:"backgroundColor",stroke:"borderColor",color:"color"}
  ,t={
    left:0,top:0,padding:0,border:"none",margin:0,outline:"none","-webkit-apperance":"none",position:"absolute",
zIndex:20}
  ,U,F=function(a,b,c,e){
    a=D.createElement(a);
    for(var g in b)p[g]?a.style[g]=b[g]:a.setAttribute(g,b[g]);
    for(g in c)a.style[g]=c[g];
    e&&e.appendChild&&e.appendChild(a);
    return a}
  ,g;
  g=function(a,b,c){
    b&&b instanceof g&&(b=b.element);
    (this.element=F(a,c,t,b)).ishot="true";
    this.nodeName=a.toLowerCase();
    this.added=Boolean(b)}
  ;
  g.prototype={
    attr:function(d){
      var e=this.element,g={
        }
      ,k,t,n,C,w,q,v;
      if("object"!==typeof d){
        if(!(g=this[d])){
          if("string"===typeof d)e&&e.getAttribute&&(C=e.getAttribute(d));
          
else if(void 0!==d&&null!==d&&"object"===typeof d)for(n in d)e.setAttribute(n,d[n]);
          g=C}
        return g}
      for(k in d){
        n=d[k];
        if(c[k]){
          switch(k){
            case "cursor":"pointer"===n&&N&&(n="hand")}
          e.style[c[k]]=n;
          t=!0}
        else if(p[k])e.style[p[k]]=n+"px",t=!0;
        else if(a[k])e.style[a[k]]=n&&n.replace(/^#?([a-f0-9]+)/ig,"#$1")||"none",t=!0;
        else if(/^visibility$/i.test(k))t="hidden"===n,e.style.display=t?"none":"",this.hidden=t,t=!0;
        else if(/^opacity$/i.test(k))e.style.opacity=n,b&&(t=100*Number(n),e.style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity="+
t+")"),t=!0;
        else if(/^innerhtml$/i.test(k)){
          if(N&&"select"==e.nodeName.toLowerCase()){
            for(t=n.match(/<option\s?[\s\S]*?(\/>|><\/option>|>[\s\S]*?<\/option>)/ig);
            e.firstChild;
            )e.removeChild(e.firstChild);
            w=0;
            for(q=t.length;
            w<q;
            w+=1)C=t[w],v=D.createElement("option"),/<option\s([\s\S]*[\'\"])\s*?(\/>|>[\s\S]*<\/option>)/ig.test(C)&&(v.value=C.replace(/<option\s([\s\S]*[\'\"])\s*?(\/>|>[\s\S]*<\/option>)/ig,"$1").replace(/[\s\S]*value\s*\=\s*[\'\"]([\s\S]*)[\'\"]/,"$1")),v.text=C.replace(/<option\s*[\s\S]*[\'\"]?\s*?[\/>|\>]([\s\S]*)<\/option>/ig,
"$1 "),e.options.add(v)}
          else"input"!==e.nodeName.toLowerCase()&&void 0!==n&&(e.innerHTML=n||"");
          t=!0}
        else/^text$/i.test(k)?("input"!==e.nodeName.toLowerCase()&&(e.innerHTML="",void 0!==n&&e.appendChild(D.createTextNode(n))),t=!0):/^type$/i.test(k)&&b&&this.added&&(t=!0);
        t&&(g[k]=n,delete d[k],t=!1)}
      for(k in d)e.setAttribute(k,d[k]);
      for(k in g)this[k]=d[k]=g[k],delete g[k];
      return this}
    ,val:function(a){
      var b=this.element,c=void 0===a;
      return"input"===this.nodeName&&"checkbox"===b.getAttribute("type")?
c?this.checked()?1:0:this.checked(a):c?b.value:(b.value=a,this)}
    ,checked:function(a){
      var b=this.element;
      return void 0===a?b.checked:(a?b.setAttribute("checked","checked"):b.removeAttribute("checked"),this)}
    ,css:function(a,b){
      var c=this.element.style,e;
      if("object"===typeof a)for(e in a)c[e]=a[e];
      else e&&void 0!==b&&(c[e]=b);
      return this}
    ,translate:function(a,b){
      var c=this.element;
      void 0!==a&&(c.style.left=a+"px");
      void 0!==b&&(c.style.top=b+"px");
      return this}
    ,add:function(a,b){
      var c=this.element,e=a.element;
      
b?e.insertBefore(c,e.firstChild):e.appendChild(c);
      this.added=!0;
      return this}
    ,hide:function(){
      this.element.style.display="none";
      return this}
    ,show:function(){
      this.element.style.display="";
      return this}
    ,focus:function(){
      "function"===typeof this.element.focus?this.element.focus():e.dem.fire(this.element,"focus")}
    ,destroy:function(){
      var a=this.element||{
        }
      ;
      a.onclick=a.onmouseout=a.onmouseover=a.onmousemove=a.onblur=a.onfocus=null;
      U||(U=F("div"));
      a&&U.appendChild(a);
      U.innerHTML="";
      delete this.element;
      return null}
    ,
on:N?function(a,b){
      this.element["on"+a]=function(){
        var a=q.event;
        a.target=a.srcElement;
        b(a)}
      ;
      return this}
    :function(a,b){
      var c=b;
      J&&"click"===a&&(a="touchstart",c=function(a){
        a.preventDefault();
        b()}
      );
      this.element["on"+a]=c;
      return this}
    ,bind:function(a,b,c){
      u.listen(this.element,a,b,c);
      return this}
    ,unbind:function(a,b){
      u.unlisten(this.element,a,b);
      return this}
    ,trigger:function(a,b){
      u.fire(this.element,a,b);
      return this}
    ,fadeIn:function(a,b){
      var c="fast"===a?400:1E3;
      this.show();
      this.attr({
        opacity:0}
      );
      
e.danimate.animate(this.element,{
        opacity:1}
      ,c,"linear",b)}
    }
  ;
  g.prototype.constructor=g;
  k.fn.html=function(a,b,c,e){
    var k={
      }
    ,n;
    b&&"type"in b&&(k.type=b.type,delete b.type);
    a=(new g(a,e,k)).css(c).attr(b);
    for(n in k)b[n]=k[n];
    return a}
  }
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-raphaeltooltip",function(){
  var e=this,k=e.window,u=k.document,q=u.body||u.getElementsByTagName("body")[0],D=e.hcLib,b=D.Raphael,N=b.eve,J=D.createElement,c=D.addEvent,p=D.removeEvent,a=D.getPosition,t=D.hasTouch,U=D.getTouchEvent,F=k.Math,g=F.ceil,d=F.floor,h={
    }
  ,l=k.screen.availHeight,L=k.screen.availWidth,P={
    "":1,moz:1,webkit:1,o:1,ms:1}
  ,n={
    borderRadius:"borderRadius",boxShadow:"boxShadow"}
  ,C=/\-([a-z])/ig,w=function(a,b){
    return b.toUpperCase()}
  ,
R=function(a){
    var c=v.forbiddenStyle,d,e,g;
    for(d in a)e=C.test(d)?d.replace(C,w):d,void 0!==a[d]&&!c[e]&&(this[e]=a[d]),b.vml&&/color/ig.test(e)&&(this[e]=b.getRGB(this[e]).toString());
    for(d in n)if(this[d])for(g in P)this[g+d]=this[d]}
  ,v=D.toolTip={
    elementId:"fusioncharts-tooltip-element",element:null,lastTarget:null,currentTarget:null,currentPaper:null,pointeroffset:12,prevented:!1,defaultStyle:D.extend2(R.prototype,{
      backgroundColor:"#ffffee",borderColor:"#000000",borderWidth:"1px",color:"#000000",
fontSize:"10px",lineHeight:"12px",padding:"3px",borderStyle:"solid"}
    ),defaultContainerStyle:{
      position:"absolute",textAlign:"left",margin:"0",zIndex:"99999",pointer:"default",display:"block"}
    ,forbiddenStyle:{
      }
    }
  ,oa=function(a){
    !0===v._oobready?v._oobready=!1:(p(q,"touchstart",oa),!v.hidden&&v.currentTarget&&(a=a.srcElement||a.target||h,a.raphael&&v.currentTarget.paper.getById(a.raphaelid)===v.currentTarget||v.hide()))}
  ;
  b.svg&&(v.defaultContainerStyle.pointerEvents="none",v.defaultStyle.borderRadius=
"0",v.defaultStyle.boxShadow="none");
  b.vml&&(v.forbiddenStyle.borderRadius=!0,v.forbiddenStyle.boxShadow=!0,v.defaultStyle.filter="");
  v.setup=function(){
    var a=v.container,c=v.textElement,d=v.style,g=v.defaultContainerStyle,h=v.forbiddenStyle,n;
    a||(a=v.element=J("span"),(u.body||u.getElementsByTagName("body")[0]).appendChild(a),a.setAttribute("id",v.elementId),d=v.containerStyle=a.style,c=v.textElement=J("span"),a.appendChild(c),v.style=b.vml?c.runtimeStyle:c.style,v.style.overflow="hidden",v.style.display=
"block",v.hidden=!1,v.hide());
    for(n in g)!h[n]&&(d[n]=g[n]);
    v.scatted=!0;
    N.on("raphael.drag.start.*",function(){
      v.scatted&&(v.waitingScat=!0)}
    );
    N.on("raphael.drag.move.*",function(){
      v.waitingScat&&(v.block(),v.waitingScat=!1)}
    );
    N.on("raphael.drag.end.*",function(){
      v.waitingScat=!1;
      v.scatted&&v.unblock(!0)}
    );
    N.on("raphael.remove",function(){
      if(v.currentPaper===this||v.currentTarget&&v.currentTarget.paper===this)v.hide(),v.currentTarget=v.currentPaper=null}
    );
    e.addEventListener("LinkedChartInvoked",
function(a){
      v.currentPaper===a.sender.jsVars.hcObj.paper&&v.hide()}
    );
    e.addEventListener("realTimeUpdateComplete",function(a){
      v.currentPaper===a.sender.jsVars.hcObj.paper&&v.hide()}
    )}
  ;
  v.restyle=function(a){
    var b=v.style,c;
    for(c in a)b[c]=a[c]}
  ;
  v.onelement=function(b){
    if(!b.__tipProcessed){
      var d=this.paper,e="group"===this.type?d&&d._elementFromEvent(b):this,g=d.__tipStyle;
      e&&g&&e.__tipNeeded&&((b.originalEvent||b).FusionChartsPreventEvent&&v.preventTooltip(),v.hiding&&(v.hiding=clearTimeout(v.hiding)),
v.currentPaper!==d&&(d.__tipCp=d.canvas&&a(d.canvas.parentNode,!0)||{
        }
      ,v.restyle(d.__tipStyle),v.currentPaper=d),v.lastTarget=v.currentTarget,v.currentTarget=e,v.scatted=e.__tipScatted,v.onredraw.call(this,b),b.__tipProcessed=!0,t&&(v._oobready=!0,c(q||(q=u.body||u.getElementsByTagName("body")[0]),"touchstart",oa)))}
    }
  ;
  v.onredraw=function(a){
    a.__tipProcessed||(a.__tipProcessed=!0,(this.paper&&this.paper._elementFromEvent(a))===v.currentTarget&&(a=U(a),v.x=d(a.pageX||a.clientX+u.body.scrollLeft+u.documentElement.scrollLeft||
0),v.y=d(a.pageY||a.clientY+u.body.scrollTop+u.documentElement.scrollTop||0),v.redraw()))}
  ;
  v.onhide=function(a){
    a.__tipProcessed||(a.__tipProcessed=!0,(this.paper&&this.paper._elementFromEvent(a))===v.currentTarget&&(v.hiding=setTimeout(v.hide,200)))}
  ;
  v.redraw=function(){
    if(!v.prevented&&!v.blocked&&v.currentTarget&&v.currentTarget.__tipNeeded){
      var a=v.currentTarget,b=a.paper,c=v.textElement,d=v.containerStyle,e=v.style,h=a.__tipText,a=v.pointeroffset,n=b.__tipCp,k=u.documentElement||u.body,w=k.scrollLeft,
k=k.scrollTop,G=v.x,p=v.y,t,r=b.width,B=b.height,b=b.__tipConstrain;
      if(100>r||100>B)b=!1;
      v.hidden&&(v.containerStyle.top="-999em",v.show());
      h!==v.text&&(v.text=h,d.width=d.height="",c.innerHTML=h,e.whiteSpace="nowrap",h=g(e.pixelWidth||c.offsetWidth||0),t=g(e.pixelHeight||c.offsetHeight||0),(v.textWidthOverflow=G+h>n.left+r)?(d.width=(r>h?h+2*a:r-2*a||0)+"px",e.whiteSpace="normal"):d.width="",(v.textHeightOverflow=t>B)?(d.height=(B||0)-2*a+"px",e.whiteSpace="normal"):d.height="");
      h=g(e.pixelWidth||
c.offsetWidth||0);
      t=g(e.pixelHeight||c.offsetHeight||0);
      b?(v.textWidthOverflow?G=(G-h<n.left?n.left:G-h)-w:G+a+h>n.left-w+r-a&&(G=G-h-a),v.textHeightOverflow?p=n.top-k:p+a+t>n.top-k+B-a&&(p=p-t-1.5*a)):(w+L<G+a+h&&(G=G-h-a),k+l<p+a+t&&(p=p-t-1.5*a));
      d.left=(G+a||0)+"px";
      d.top=(p+a||0)+"px";
      v.hidden&&v.show()}
    }
  ;
  v.hide=function(){
    v.hiding&&(v.hiding=clearTimeout(v.hiding));
    v.containerStyle.display="none";
    v.hidden=!0;
    v.prevented=!1}
  ;
  v.show=function(){
    v.blocked||(v.hiding&&(v.hiding=clearTimeout(v.hiding)),
v.containerStyle.display="inline",v.hidden=!1)}
  ;
  v.preventTooltip=function(){
    v.prevented=!0}
  ;
  v.block=function(){
    v.blocked=!0;
    v.containerStyle.display="none"}
  ;
  v.unblock=function(a){
    v.blocked=!1;
    a&&(v.containerStyle.display=v.hidden&&"none"||"inline")}
  ;
  b.fn.tooltip=function(c,d,e){
    d&&(d=.4*(void 0===d.opacity?1:d.opacity),b.svg?c.boxShadow="1px 1px 3px rgba(64,64,64,"+d+")":c.filter='progid:DXImageTransform.Microsoft.Shadow(Strength=2, Direction=135, Color="#404040", shadowOpacity="'+d/2+'")');
    this.__tipStyle=
new R(c);
    this.__tipCp=this.canvas&&a(this.canvas.parentNode,!0)||{
      }
    ;
    this.__tipConstrain=Boolean(e);
    return this}
  ;
  b.el.trackTooltip=function(a){
    var b=!!this.__tiptracking;
    if(void 0===a||(a=!!a)===b)return this;
    a?t?this.touchstart(v.onelement):(this.mouseover(v.onelement),this.mousemove(v.onredraw),this.mouseout(v.onhide)):t?this.untouchstart(v.onelement):(this.unmouseover(v.onelement),this.unmousemove(v.onredraw),this.unmouseout(v.onhide));
    this.__tiptracking=a;
    return this}
  ;
  b.el.tooltip=function(a,c,
d,e,g){
    v.setup();
    b.el.tooltip=function(a,b,c,d,e){
      b=!1===a||void 0===a||""===a;
      this.__tipScatted=void 0===d?this.__tipScatted:!d;
      void 0===this.__tipScatted&&(this.__tipScatted=!0);
      null!==e&&(this.__tip_blocked=e);
      b^!this.__tipText&&(this.__tipNeeded=!b);
      this.__tipText=a;
      if(v.currentTarget===this&&a!==v.text&&!v.hidden)v[b?"hide":"redraw"]();
      return this}
    ;
    return b.el.tooltip.call(this,a,c,d,e,g)}
  ;
  e.core._setTooltipZIndex=function(a){
    a=parseInt(a,10);
    v&&!isNaN(a)&&(v.defaultContainerStyle.zIndex=a,v.containerStyle&&
(v.containerStyle.zIndex=a))}
  }
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-smartlabel",function(){
  var e=this.hcLib,k=e.isIE,u=e.hasSVG,q=Math.max,D=this.window,b=/ HtmlUnit/.test(D.navigator.userAgent),N=D.document,J=/ AppleWebKit\//.test(D.navigator.userAgent),c=!!N.createElement("canvas").getContext,p=!(!c||!N.createElement("canvas").getContext("2d").measureText),D=function(){
    function a(a,b,c){
      if(!a||!a.length)return 0;
      var d=c.getWidthFunction(),e=0,g=0,g=d(a),h=g/a.length;
      c=b;
      e=Math.ceil(b/h);
      if(g<b)return a.length-
1;
      e>a.length&&(c=b-g,e=a.length);
      for(;
      0<c;
      )if(c=b-d(a.substr(0,e)),g=Math.floor(c/h))e+=g;
      else return e;
      for(;
      0>c;
      )if(c=b-d(a.substr(0,e)),g=Math.floor(c/h))e+=g;
      else break;
      return e}
    function t(a,b){
      b=5<b?b:5;
      this.maxContainers=20>b?b:20;
      this.last=this.first=null;
      this.containers={
        }
      ;
      this.length=0;
      this.rootNode=a;
      if(R){
        var c=N.createElementNS("http://www.w3.org/2000/svg","svg");
        c.setAttributeNS("http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink");
        c.setAttributeNS("http://www.w3.org/2000/svg",
"height","0");
        c.setAttributeNS("http://www.w3.org/2000/svg","width","0");
        this.svgRoot=c;
        this.rootNode.appendChild(c)}
      }
    function D(a,c,e){
      if("undefined"!==typeof a&&"object"!==typeof a){
        this.id=a;
        var g;
        "string"===typeof c&&(c=N.getElementById(c));
        a:{
          if(c&&(c.offsetWidth||c.offsetHeight)){
            if(c.appendChild){
              c.appendChild(c=N.createElement("div"));
              c.className="fusioncharts-smartlabel-container";
              c.setAttribute("aria-hidden","true");
              c.setAttribute("role","presentation");
              a=c;
              break a}
            }
          else if((a=N.getElementsByTagName("body")[0])&&
a.appendChild){
            c=N.createElement("div");
            c.className="fusioncharts-smartlabel-container";
            c.setAttribute("aria-hidden","true");
            c.setAttribute("role","presentation");
            a.appendChild(c);
            a=c;
            break a}
          a=void 0}
        a=this.parentContainer=a;
        a.innerHTML="WgI";
        if(b||!a.offsetHeight&&!a.offsetWidth)R=!0;
        a.innerHTML="";
        for(g in d)a.style[g]=d[g];
        this.containerManager=new t(a,10);
        this.showNoEllipses=!e;
        this.init=!0;
        this.style={
          }
        ;
        this.setStyle()}
      }
    var F=e.supportedStyle,g={
      fontWeight:1,"font-weight":1,fontStyle:1,"font-style":1,
fontSize:1,"font-size":1,fontFamily:1,"font-family":1}
    ,d={
      position:"absolute",top:"-9999em",left:"-9999em",whiteSpace:"nowrap",padding:"0px",width:"1px",height:"1px",overflow:"hidden"}
    ,h=J?0:4.5,l=0,L=/\b_SmartLabel\b/,P=/\b_SmartLabelBR\b/,n=/(<[^<\>]+?\>)|(&(?:[a-z]+|#[0-9]+);
    |.)/ig,C=RegExp("\\<span[^\\>]+?_SmartLabel[^\\>]{
      0,}
    \\>(.*?)\\<\\/span\\>","ig"),w=/<[^>][^<]*[^>]+>/i,R=!1,v=0,oa=0,ea,$,W;
    N.getElementsByClassName?(ea="getElementsByClassName",$="_SmartLabel",W=!0):(ea="getElementsByTagName",
$="span",W=!1);
    t.prototype={
      get:function(a){
        var b=this.containers,c=this.length,d=this.maxContainers,e,g="",h="",h=this.getCanvasFont(a);
        for(e in F)void 0!==a[e]&&(g+=F[e]+":"+a[e]+";
        ");
        if(!g)return!1;
        if(b[g])g=b[g],this.first!==g&&(g.prev&&(g.prev.next=g.next),g.next&&(g.next.prev=g.prev),g.next=this.first,g.next.prev=g,this.last===g&&(this.last=g.prev),g.prev=null,this.first=g);
        else{
          if(c>=d)for(a=c-d+1;
          a--;
          )this.removeContainer(this.last);
          g=this.addContainer(g,h)}
        return g}
      ,getCanvasFont:function(a){
        var b,
d=[];
        if(!c||!p)return!1;
        for(b in g)void 0!==a[b]&&d.push(a[b]);
        return d.join(" ")}
      ,setMax:function(a){
        var b=this.length;
        a=5<a?a:5;
        a=20>a?a:20;
        if(a<b){
          for(b-=a;
          b--;
          )this.removeContainer(this.last);
          this.length=a}
        this.maxContainers=a}
      ,addContainer:function(a,b){
        var c,d;
        this.containers[a]=d={
          next:null,prev:null,node:null,ellipsesWidth:0,lineHeight:0,dotWidth:0,avgCharWidth:4,keyStr:a,canvasStr:b,charCache:{
            }
          }
        ;
        d.next=this.first;
        d.next&&(d.next.prev=d);
        this.first=d;
        this.last||(this.last=d);
        this.length+=
1;
        c=d.node=N.createElement("div");
        this.rootNode.appendChild(c);
        k&&!u?c.style.setAttribute("cssText",a):c.setAttribute("style",a);
        c.setAttribute("aria-hidden","true");
        c.setAttribute("role","presentation");
        c.style.display="inline-block";
        c.innerHTML="WgI";
        d.lineHeight=c.offsetHeight;
        d.avgCharWidth=c.offsetWidth/3;
        R?(c=d.svgText=N.createElementNS("http://www.w3.org/2000/svg","text"),c.setAttribute("style",a),this.svgRoot.appendChild(c),c.textContent="WgI",d.lineHeight=c.getBBox().height,d.avgCharWidth=
(c.getBBox().width-h)/3,c.textContent="...",d.ellipsesWidth=c.getBBox().width-h,c.textContent=".",d.dotWidth=c.getBBox().width-h):b?(c=d.canvas=N.createElement("canvas"),c.style.height=c.style.width="0px",this.rootNode.appendChild(c),d.context=c=c.getContext("2d"),c.font=b,d.ellipsesWidth=c.measureText("...").width,d.dotWidth=c.measureText(".").width):(c.innerHTML="...",d.ellipsesWidth=c.offsetWidth,c.innerHTML=".",d.dotWidth=c.offsetWidth,c.innerHTML="");
        return d}
      ,removeContainer:function(a){
        var b=
a.keyStr;
        b&&this.length&&a&&(--this.length,a.prev&&(a.prev.next=a.next),a.next&&(a.next.prev=a.prev),this.first===a&&(this.first=a.next),this.last===a&&(this.last=a.prev),a.node.parentNode.removeChild(a.node),a.canvas&&a.canvas.parentNode.removeChild(a.canvas),delete this.containers[b])}
      ,dispose:function(){
        var a,b=this.containers;
        this.maxContainers=null;
        for(a in b)this.removeContainer(b[a]);
        this.rootNode.parentNode.removeChild(this.rootNode);
        this.last=this.first=this.rootNode=null}
      }
    ;
    t.prototype.constructor=
t;
    D.prototype={
      dispose:function(){
        this.init&&(this.containerManager.dispose(),delete this.container,delete this.context,delete this.cache,delete this.containerManager,delete this.containerObj,delete this.id,delete this.style,delete this.parentContainer,delete this.showNoEllipses)}
      ,useEllipsesOnOverflow:function(a){
        this.init&&(this.showNoEllipses=!a)}
      ,getWidthFunction:function(){
        var a=this.context,b=this.container,c=this.containerObj.svgText;
        return c?function(a){
          var b;
          c.textContent=a;
          a=c.getBBox();
          
b=a.width-h;
          1>b&&(b=a.width);
          return b}
        :a?function(b){
          return a.measureText(b).width}
        :function(a){
          b.innerHTML=a;
          return b.offsetWidth}
        }
      ,getSmartText:function(b,c,d,e){
        if(!this.init)return!1;
        if(void 0===b||null===b)b="";
        var g={
          text:b,maxWidth:c,maxHeight:d,width:null,height:null,oriTextWidth:null,oriTextHeight:null,oriText:b,isTruncated:!1}
        ,h=!1,k,p,t=0,r,B,F,u=-1,D=h=-1;
        p=this.container;
        var J=this.context,U=0;
        F=0;
        var va,qa,Na;
        Na=[];
        var ha=0,Sa=this.showNoEllipses?"":"...";
        B=this.lineHeight;
        var ka,U=
[],u=k=-1;
        ka=function(a){
          a=a.replace(/^\s\s*/,"");
          for(var b=/\s/,c=a.length;
          b.test(a.charAt(--c));
          );
          return a.slice(0,c+1)}
        ;
        h=-1;
        qa=this.getWidthFunction();
        if(p){
          if(!R){
            p.innerHTML=b;
            g.oriTextWidth=h=p.offsetWidth;
            g.oriTextHeight=F=p.offsetHeight;
            if(F<=d&&h<=c)return g.width=g.oriTextWidth=h,g.height=g.oriTextHeight=F,g;
            if(B>d)return g.text="",g.width=g.oriTextWidth=0,g.height=g.oriTextHeight=0,g}
          b=ka(b).replace(/(\s+)/g," ");
          h=w.test(b);
          B=this.showNoEllipses?c:c-l;
          if(h){
            t=b.replace(n,"$2");
            b=b.replace(n,
'$1<span class="_SmartLabel">$2</span>');
            b=b.replace(/(<br\s*\/*\>)/g,'<span class="_SmartLabel _SmartLabelBR">$1</span>');
            p.innerHTML=b;
            ha=p[ea]($);
            J=0;
            for(qa=ha.length;
            J<qa;
            J+=1)if(b=ha[J],W||L.test(b.className))ka=b.innerHTML,""!==ka&&(" "===ka?u=U.length:"-"===ka&&(k=U.length),U.push({
              spaceIdx:u,dashIdx:k,elem:b}
            ),Na.push(ka));
            ha=0;
            k=U.length;
            v=U[0].elem.offsetWidth;
            if(v>c)return g.text="",g.width=g.oriTextWidth=g.height=g.oriTextHeight=0,g;
            v>B&&!this.showNoEllipses&&(B=c-2*oa,B>v?Sa="..":(B=
c-oa,B>v?Sa=".":(B=0,Sa="")));
            Na=U[0].elem.offsetLeft;
            J=U[0].elem.offsetTop;
            if(e)for(;
            ha<k;
            ha+=1)b=U[ha].elem,qa=b.offsetLeft-Na+b.offsetWidth,qa>B&&(va||(va=ha),p.offsetWidth>c&&(r=ha,ha=k));
            else for(;
            ha<k;
            ha+=1)b=U[ha].elem,ka=b.offsetHeight+(b.offsetTop-J),qa=b.offsetLeft-Na+b.offsetWidth,e=null,qa>B?(va||(va=ha),qa>c&&(h=U[ha].spaceIdx,u=U[ha].dashIdx,h>D?(U[h].elem.innerHTML="<br/>",D=h):u>D?(U[u].elem.innerHTML=u===ha?"<br/>-":"-<br/>",D=u):b.parentNode.insertBefore(e=N.createElement("br"),
b),b.offsetHeight+b.offsetTop>d?(e?e.parentNode.removeChild(e):D===u?U[u].elem.innerHTML="-":U[h].elem.innerHTML=" ",r=ha,ha=k):va=null)):ka>d&&(r=ha,ha=k);
            if(r<k){
              g.isTruncated=!0;
              va=va?va:r;
              for(ha=k-1;
              ha>=va;
              --ha)b=U[ha].elem,b.parentNode.removeChild(b);
              for(;
              0<=ha;
              --ha)b=U[ha].elem,P.test(b.className)?b.parentNode.removeChild(b):ha=0}
            g.text=p.innerHTML.replace(C,"$1");
            g.isTruncated&&(g.text+=Sa,g.tooltext=t)}
          else{
            Na=b.split("");
            k=Na.length;
            p="";
            r=[];
            va=Na[0];
            this.cache[va]?v=this.cache[va].width:
(v=qa(va),this.cache[va]={
              width:v}
            );
            if(B>v)r=b.substr(0,a(b,B,this)).split(""),ha=r.length;
            else{
              if(v>c)return g.text="",g.width=g.oriTextWidth=g.height=g.oriTextHeight=0,g;
              Sa&&(B=c-2*oa,B>v?Sa="..":(B=c-oa,B>v?Sa=".":(B=0,Sa="")))}
            U=qa(r.join(""));
            F=this.lineHeight;
            if(e){
              for(;
              ha<k;
              ha+=1)if(va=r[ha]=Na[ha],this.cache[va]?v=this.cache[va].width:(v=qa(va),this.cache[va]={
                width:v}
              ),U+=v,U>B&&(p||(p=r.slice(0,-1).join("")),U>c))return g.text=ka(p)+Sa,g.tooltext=g.oriText,g.width=qa(g.text),g.height=this.lineHeight,
g;
              g.text=r.join("");
              g.width=U;
              g.height=this.lineHeight}
            else{
              for(;
              ha<k;
              ha+=1)if(va=r[ha]=Na[ha]," "!==va||J||(va="&nbsp;
              "),this.cache[va]?v=this.cache[va].width:(v=qa(va),this.cache[va]={
                width:v}
              ),U+=v,U>B&&(p||(p=r.slice(0,-1).join("")),U>c)){
                h=b.substr(0,r.length).lastIndexOf(" ");
                u=b.substr(0,r.length).lastIndexOf("-");
                h>D?(U=qa(r.slice(D+1,h).join("")),r.splice(h,1,"<br/>"),D=h,e=h+1):u>D?(u===r.length-1?(U=qa(r.slice(D+1,h).join("")),r.splice(u,1,"<br/>-")):(U=qa(r.slice(D+1,h).join("")),r.splice(u,
1,"-<br/>")),D=u,e=u+1):(r.splice(r.length-1,1,"<br/>"+Na[ha]),h=r.length-2,U=qa(r.slice(D+1,h+1).join("")),D=h,e=ha);
                F+=this.lineHeight;
                if(F>d)return g.text=ka(p)+Sa,g.tooltext=g.oriText,g.width=c,g.height=F-this.lineHeight,g;
                t=q(t,U);
                p=null;
                va=a(b.substr(e),B,this);
                U=qa(b.substr(e,va||1));
                r.length<e+va&&(r=r.concat(b.substr(r.length,e+va-r.length).split("")),ha=r.length-1)}
              t=q(t,U);
              g.text=r.join("");
              g.width=t;
              g.height=F}
            return g}
          g.height=p.offsetHeight;
          g.width=p.offsetWidth}
        else g.error=Error("Body Tag Missing!");
        
return g}
      ,setStyle:function(a){
        if(!this.init)return!1;
        if(a!==this.style||this.styleNotSet){
          a||(a=this.style);
          var b=a,c=b.fontSize=b.fontSize||"12px";
          b.lineHeight=b.lineHeight||b["line-height"]||1.2*parseInt(c,10)+"px";
          this.style=a;
          (this.containerObj=a=this.containerManager.get(a))?(this.container=a.node,this.context=a.context,this.cache=a.charCache,this.lineHeight=a.lineHeight,l=a.ellipsesWidth,oa=a.dotWidth,this.styleNotSet=!1):this.styleNotSet=!0}
        }
      ,getTextSize:function(a,b,c){
        if(!this.init)return!1;
        
var d={
          text:a,width:null,height:null,oriTextWidth:null,oriTextHeight:null,isTruncated:!1}
        ,e=this.container;
        e&&(e.innerHTML=a,d.oriTextWidth=e.offsetWidth,d.oriTextHeight=e.offsetHeight,d.width=Math.min(d.oriTextWidth,b),d.height=Math.min(d.oriTextHeight,c),d.width<d.oriTextWidth||d.height<d.oriTextHeight)&&(d.isTruncated=!0);
        return d}
      ,getOriSize:function(a){
        if(!this.init)return!1;
        var b={
          text:a,width:null,height:null}
        ,c=this.container,d=this.getWidthFunction(),e=0;
        if(R){
          a=a.split(/(<br\s*\/*\>)/g);
          
c=a.length;
          for(b.height=this.lineHeight*c;
          c--;
          )e=q(e,d(a[c]));
          b.width=e}
        else c&&(c.innerHTML=a,b.width=c.offsetWidth,b.height=c.offsetHeight);
        return b}
      }
    ;
    return D.prototype.constructor=D}
  ();
  e.SmartLabelManager=D}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-numberformatter",function(){
  var e=this,k=e.hcLib,u=k.pluckNumber,q=k.extend2,D=k.getValidValue,b=k.pluck,N=k.getFirstValue,J=Math.abs,c=Math.pow,p=Math.round,a=function(a){
    return a&&a.replace(/[-[\]{
      }
    ()*+?.,\\^$|#\s]/g,"\\$&")}
  ,t={
    }
  ,U=function(a){
    var b=[],c;
    for(c in a)b.push(c+"_"+a[c]);
    b.sort();
    return b.join(",")}
  ,F=function(a){
    var b={
      }
    ,c;
    for(c in a)b[c.toLowerCase()]=a[c];
    return b}
  ;
  k.NumberFormatter=function(){
    function e(a,b,d){
      var g;
      
if(0>=b)return p(a)+"";
      if(isNaN(b))return a+="",12<a.length&&-1!=a.indexOf(".")&&(b=12-a.split(".")[0].length,g=c(10,b),a=p(a*g)/g+""),a;
      g=c(10,b);
      a=p(a*g)/g+"";
      if(1==d)for(-1==a.indexOf(".")&&(a+=".0"),d=a.split("."),b-=d[1].length,d=1;
      d<=b;
      d++)a+="0";
      return a}
    function d(a,b,c,d,e){
      var g=Number(a),h="",k=!1,l="",p="",t=l=0;
      if(isNaN(g))return"";
      if(1E15<g)return g.toExponential(e?1:14);
      l=0;
      t=a.length;
      -1!=a.indexOf(".")&&(h=a.substring(a.indexOf(".")+1,a.length),t=a.indexOf("."));
      0>g&&(k=!0,l=1);
      l=
a.substring(l,t);
      a=l.length;
      e=d.length-1;
      g=d[e];
      if(a<g)p=l;
      else for(;
      a>=g;
      )p=(a-g?c:"")+l.substr(a-g,g)+p,a-=g,g=0>=--e?d[0]:d[e],a<g&&(p=l.substring(a,0)+p);
      ""!=h&&(p=p+b+h);
      !0===k&&(p="-"+p);
      return p}
    var h,k={
      formatnumber:"1",formatnumberscale:"1",defaultnumberscale:"",numberscaleunit:["K","M"],numberscalevalue:[1E3,1E3],numberprefix:"",numbersuffix:"",decimals:"",forcedecimals:"0",yaxisvaluedecimals:"2",decimalseparator:".",thousandseparator:",",thousandseparatorposition:[3],indecimalseparator:"",
inthousandseparator:"",sformatnumber:"1",sformatnumberscale:"0",sdefaultnumberscale:"",snumberscaleunit:["K","M"],snumberscalevalue:[1E3,1E3],snumberprefix:"",snumbersuffix:"",sdecimals:"2",sforcedecimals:"0",syaxisvaluedecimals:"2",xFormatNumber:"0",xFormatNumberScale:"0",xDefaultNumberScale:"",xNumberScaleUnit:["K","M"],xNumberScaleValue:[1E3,1E3],xNumberPrefix:"",xNumberSuffix:""}
    ,t={
      mscombidy2d:{
        formatnumberscale:"1"}
      }
    ,F=function(c,d,e){
      var g,h,p,F,P,J,U,Ca,fa,la=d.name,Q=q({
        }
      ,k),ya,G,S,ba,r,
B,ga,Z,Da,T,xa;
      (p=t[la])&&(Q=q(Q,p));
      this.csConf=Q;
      this.chartAPI=d;
      D(c.numberscaleunit)&&(g=c.numberscaleunit.split(","));
      if(h=D(c.snumberscaleunit,c.numberscaleunit))h=h.split(",");
      if(p=D(c.xnumberscaleunit,c.numberscaleunit))p=p.split(",");
      if(F=D(c.ticknumberscaleunit,c.numberscaleunit))F=F.split(",");
      if(P=D(c.ynumberscaleunit,c.numberscaleunit))P=P.split(",");
      D(c.numberscalevalue)&&(J=c.numberscalevalue.split(","));
      if(G=D(c.snumberscalevalue,c.numberscalevalue))G=G.split(",");
      if(U=D(c.xnumberscalevalue,
c.numberscalevalue))U=U.split(",");
      if(Ca=D(c.ticknumberscalevalue,c.numberscalevalue))Ca=Ca.split(",");
      if(fa=D(c.ynumberscalevalue,c.numberscalevalue))fa=fa.split(",");
      if(D(c.thousandseparatorposition))for(ya=c.thousandseparatorposition.split(","),S=ya.length,r=k.thousandseparatorposition[0];
      S--;
      )ba=parseInt(ya[S],10),0>=ba&&(ba=r),r=ya[S]=ba;
      d||(d={
        }
      );
      S=u(c.scalerecursively,0);
      ba=u(c.sscalerecursively,S);
      r=u(c.xscalerecursively,S);
      B=u(c.maxscalerecursion,-1);
      ga=u(c.smaxscalerecursion,B);
      Z=u(c.xmaxscalerecursion,
B);
      Da=D(c.scaleseparator," ");
      T=D(c.sscaleseparator,Da);
      xa=D(c.xscaleseparator,Da);
      B||(B=-1);
      this.baseConf=g={
        cacheStore:[],formatnumber:b(c.formatnumber,d.formatnumber,Q.formatnumber),formatnumberscale:b(c.formatnumberscale,d.formatnumberscale,Q.formatnumberscale),defaultnumberscale:N(c.defaultnumberscale,d.defaultnumberscale,Q.defaultnumberscale),numberscaleunit:b(g,d.numberscaleunit,Q.numberscaleunit).concat(),numberscalevalue:b(J,d.numberscalevalue,Q.numberscalevalue).concat(),numberprefix:N(c.numberprefix,
d.numberprefix,Q.numberprefix),numbersuffix:N(c.numbersuffix,d.numbersuffix,Q.numbersuffix),decimalprecision:parseInt("auto"===c.decimals?Q.decimalprecision:b(c.decimals,c.decimalprecision,d.decimals,Q.decimals,d.decimalprecision,Q.decimalprecision),10),forcedecimals:b(c.forcedecimals,d.forcedecimals,Q.forcedecimals),decimalseparator:b(c.decimalseparator,d.decimalseparator,Q.decimalseparator),thousandseparator:b(c.thousandseparator,d.thousandseparator,Q.thousandseparator),thousandseparatorposition:b(ya,
d.thousandseparatorposition,Q.thousandseparatorposition),indecimalseparator:N(c.indecimalseparator,d.indecimalseparator,Q.indecimalseparator),inthousandseparator:N(c.inthousandseparator,d.inthousandseparator,Q.inthousandseparator),scalerecursively:S,maxscalerecursion:B,scaleseparator:Da}
      ;
      D(g.inthousandseparator)&&(this.baseConf._REGinthousandseparator=new RegExp(a(g.inthousandseparator),"g"));
      D(g.indecimalseparator)&&(this.baseConf._REGindecimalseparator=new RegExp(a(g.indecimalseparator)));
      this.Y=
[];
      e||(e={
        cacheStore:[],formatnumber:g.formatnumber,formatnumberscale:g.formatnumberscale,defaultnumberscale:g.defaultnumberscale,numberscaleunit:g.numberscaleunit.concat(),numberscalevalue:g.numberscalevalue.concat(),numberprefix:g.numberprefix,numbersuffix:g.numbersuffix,decimalprecision:g.decimalprecision,forcedecimals:g.forcedecimals,decimalseparator:g.decimalseparator,thousandseparator:g.thousandseparator,thousandseparatorposition:g.thousandseparatorposition,indecimalseparator:g.indecimalseparator,
inthousandseparator:g.inthousandseparator,scalerecursively:S,maxscalerecursion:B,scaleseparator:Da}
      ,d.useScaleRecursively&&(e.numberscalevalue&&e.numberscalevalue.length)==(e.numberscaleunit&&e.numberscaleunit.length)||(e.scalerecursively=S=0),J={
        cacheStore:[],formatnumber:e.formatnumber,formatnumberscale:e.formatnumberscale,defaultnumberscale:e.defaultnumberscale,numberscaleunit:e.numberscaleunit.concat(),numberscalevalue:e.numberscalevalue.concat(),numberprefix:e.numberprefix,numbersuffix:e.numbersuffix,
decimalprecision:parseInt(b(c.yaxisvaluedecimals,e.decimalprecision,2),10),forcedecimals:b(c.forceyaxisvaluedecimals,e.forcedecimals),decimalseparator:e.decimalseparator,thousandseparator:e.thousandseparator,thousandseparatorposition:e.thousandseparatorposition.concat(),indecimalseparator:e.indecimalseparator,inthousandseparator:e.inthousandseparator,scalerecursively:S,maxscalerecursion:B,scaleseparator:Da}
      ,G={
        cacheStore:[],formatnumber:b(c.sformatnumber,d.sformatnumber,k.sformatnumber),formatnumberscale:b(c.sformatnumberscale,
d.sformatnumberscale,k.sformatnumberscale),defaultnumberscale:N(c.sdefaultnumberscale,d.sdefaultnumberscale,e.defaultnumberscale),numberscaleunit:b(h,d.snumberscaleunit,k.snumberscaleunit).concat(),numberscalevalue:b(G,d.snumberscalevalue,k.snumberscalevalue).concat(),numberprefix:N(c.snumberprefix,d.snumberprefix,k.snumberprefix),numbersuffix:N(c.snumbersuffix,d.snumbersuffix,k.snumbersuffix),decimalprecision:parseInt(b(c.syaxisvaluedecimals,c.sdecimals,c.decimals,d.sdecimals,k.sdecimals),10),forcedecimals:b(c.forcesyaxisvaluedecimals,
c.sforcedecimals,c.forcedecimals,d.sforcedecimals,k.sforcedecimals),decimalseparator:b(c.decimalseparator,d.decimalseparator,k.decimalseparator),thousandseparator:b(c.thousandseparator,d.thousandseparator,k.thousandseparator),thousandseparatorposition:e.thousandseparatorposition.concat(),indecimalseparator:b(c.indecimalseparator,d.indecimalseparator,k.indecimalseparator),inthousandseparator:b(c.inthousandseparator,d.inthousandseparator,k.inthousandseparator),scalerecursively:ba,maxscalerecursion:ga,
scaleseparator:T}
      ,h=q({
        }
      ,G),h.decimalprecision=parseInt(b(c.sdecimals,c.decimals,c.syaxisvaluedecimals,d.sdecimals,k.sdecimals),10),h.forcedecimals=b(c.sforcedecimals,c.forcedecimals,c.forcesyaxisvaluedecimals,d.sforcedecimals,k.sforcedecimals),h.cacheStore=[],d.useScaleRecursively&&(G.numberscalevalue&&G.numberscalevalue.length)==(G.numberscaleunit&&G.numberscaleunit.length)||(G.scalerecursively=ba=0),/^(bubble|scatter|selectscatter)$/.test(la)&&(J.formatnumber=b(c.yformatnumber,J.formatnumber),
J.formatnumberscale=b(c.yformatnumberscale,J.formatnumberscale),J.defaultnumberscale=N(c.ydefaultnumberscale,J.defaultnumberscale),J.numberscaleunit=b(P,J.numberscaleunit),J.numberscalevalue=b(fa,J.numberscalevalue),J.numberprefix=b(c.ynumberprefix,J.numberprefix),J.numbersuffix=b(c.ynumbersuffix,J.numbersuffix),e.formatnumber=b(c.yformatnumber,e.formatnumber),e.formatnumberscale=b(c.yformatnumberscale,e.formatnumberscale),e.defaultnumberscale=N(c.ydefaultnumberscale,e.defaultnumberscale),e.numberscaleunit=
b(c.ynumberscaleunit,e.numberscaleunit.concat()),e.numberscalevalue=b(c.ynumberscalevalue,e.numberscalevalue.concat()),e.numberprefix=b(c.ynumberprefix,e.numberprefix),e.numbersuffix=b(c.ynumbersuffix,e.numbersuffix)),/^(mscombidy2d|mscombidy3d)$/.test(la)&&(G.formatnumberscale=u(c.sformatnumberscale)),/^(pie2d|pie3d|doughnut2d|doughnut3d|marimekko|pareto2d|pareto3d)$/.test(la)&&(e.decimalprecision=b(c.decimals,"2")),S&&(e.numberscalevalue.push(1),e.numberscaleunit.unshift(e.defaultnumberscale),J.numberscalevalue.push(1),
J.numberscaleunit.unshift(J.defaultnumberscale)),ba&&(G.numberscalevalue.push(1),G.numberscaleunit.unshift(G.defaultnumberscale),h.numberscalevalue.push(1),h.numberscaleunit.unshift(h.defaultnumberscale)),this.Y[0]={
        yAxisLabelConf:J,dataLabelConf:e}
      ,this.Y[1]={
        yAxisLabelConf:G,dataLabelConf:h}
      ,this.paramLabels=e,this.param1=J,this.param2=G,this.paramLabels2=h);
      this.paramX={
        cacheStore:[],formatnumber:b(c.xformatnumber,g.formatnumber),formatnumberscale:b(c.xformatnumberscale,g.formatnumberscale),defaultnumberscale:N(c.xdefaultnumberscale,
g.defaultnumberscale),numberscaleunit:b(p,g.numberscaleunit.concat()),numberscalevalue:b(U,g.numberscalevalue.concat()),numberprefix:b(c.xnumberprefix,g.numberprefix),numbersuffix:b(c.xnumbersuffix,g.numbersuffix),decimalprecision:parseInt(b(c.xaxisvaluedecimals,c.xaxisvaluesdecimals,g.decimalprecision,2),10),forcedecimals:b(c.forcexaxisvaluedecimals,0),decimalseparator:g.decimalseparator,thousandseparator:g.thousandseparator,thousandseparatorposition:g.thousandseparatorposition.concat(),indecimalseparator:g.indecimalseparator,
inthousandseparator:g.inthousandseparator,scalerecursively:r,maxscalerecursion:Z,scaleseparator:xa}
      ;
      this.paramLegend=q(q({
        }
      ,g),{
        cacheStore:[],decimalprecision:parseInt(u(c.legendvaluedecimals,g.decimalprecision,2),10),forcedecimals:u(c.legendvalueforcedecimals,g.forcedecimals,0),formatnumberscale:b(c.legendvalueformatnumberscale,g.formatnumberscale),formatnumber:b(c.legendvalueformatnumber,g.formatnumber)}
      );
      d.useScaleRecursively&&(this.paramX.numberscalevalue&&this.paramX.numberscalevalue.length)==
(this.paramX.numberscaleunit&&this.paramX.numberscaleunit.length)||(this.paramX.scalerecursively=r=0);
      r&&(this.paramX.numberscalevalue.push(1),this.paramX.numberscaleunit.unshift(this.paramX.defaultnumberscale));
      this.paramScale={
        cacheStore:[],formatnumber:b(c.tickformatnumber,g.formatnumber),formatnumberscale:b(c.tickformatnumberscale,g.formatnumberscale),defaultnumberscale:N(c.tickdefaultnumberscale,g.defaultnumberscale),numberscaleunit:b(F,g.numberscaleunit.concat()),numberscalevalue:b(Ca,g.numberscalevalue.concat()),
numberprefix:b(c.ticknumberprefix,g.numberprefix),numbersuffix:b(c.ticknumbersuffix,g.numbersuffix),decimalprecision:parseInt(b(c.tickvaluedecimals,g.decimalprecision,"2"),10),forcedecimals:b(c.forcetickvaluedecimals,g.forcedecimals,0),decimalseparator:g.decimalseparator,thousandseparator:g.thousandseparator,thousandseparatorposition:g.thousandseparatorposition.concat(),indecimalseparator:g.indecimalseparator,inthousandseparator:g.inthousandseparator,scalerecursively:S,maxscalerecursion:B,scaleseparator:Da}
      ;
      
S&&(this.paramScale.numberscalevalue.push(1),this.paramScale.numberscaleunit.unshift(this.paramScale.defaultnumberscale));
      this.timeConf={
        inputDateFormat:b(c.inputdateformat,c.dateformat,"mm/dd/yyyy"),outputDateFormat:b(c.outputdateformat,c.inputdateformat,c.dateformat,"mm/dd/yyyy"),days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),months:"January February March April May June July August September October November December".split(" "),daySuffix:" st nd rd th th th th th th th th th th th th th th th th th st nd rd th th th th th th th st".split(" ")}
      ;
      
this.cleaneValueCacheStore={
        }
      ;
      this.percentStrCacheStore={
        }
      }
    ;
    F.prototype={
      cleaneValueCacheStore:{
        }
      ,percentStrCacheStore:{
        }
      ,dispose:function(){
        this.Y&&delete this.Y;
        this.cleaneValueCacheStore&&delete this.cleaneValueCacheStore;
        this.percentStrCacheStore&&delete this.percentStrCacheStore;
        this.paramLabels&&delete this.paramLabels;
        this.param1&&delete this.param1;
        this.param2&&delete this.param2;
        this.paramLabels2&&delete this.paramLabels2;
        this.csConf&&delete this.csConf;
        this.chartAPI&&delete this.chartAPI;
        
this.baseConf&&delete this.baseConf;
        this.timeConf&&delete this.timeConf;
        this.paramX&&delete this.paramX;
        this.paramScale&&delete this.paramScale}
      ,parseMLAxisConf:function(a,c){
        var d=this.baseConf,e=this.csConf,g=this.chartAPI,h=u(a.scalerecursively,d.scalerecursively),p=u(a.maxscalerecursion,d.maxscalerecursion),t=D(a.scaleseparator,d.scaleseparator),q,F,L,P,U,Q;
        c=u(c,this.Y.length);
        D(a.numberscaleunit)&&(q=a.numberscaleunit.split(","));
        D(a.numberscalevalue)&&(F=a.numberscalevalue.split(","));
        p||(p=
-1);
        if(D(a.thousandseparatorposition))for(L=a.thousandseparatorposition.split(","),P=L.length,Q=k.thousandseparatorposition[0];
        P--;
        )(U=u(J(L[P])))?Q=U:U=Q,L[P]=U;
        d={
          cacheStore:[],formatnumber:b(a.formatnumber,d.formatnumber),formatnumberscale:b(a.formatnumberscale,d.formatnumberscale),defaultnumberscale:N(a.defaultnumberscale,d.defaultnumberscale),numberscaleunit:b(q,d.numberscaleunit).concat(),numberscalevalue:b(F,d.numberscalevalue).concat(),numberprefix:N(a.numberprefix,d.numberprefix),numbersuffix:N(a.numbersuffix,
d.numbersuffix),forcedecimals:b(a.forcedecimals,d.forcedecimals),decimalprecision:parseInt("auto"===a.decimals?e.decimalprecision:b(a.decimals,d.decimalprecision),10),decimalseparator:b(a.decimalseparator,d.decimalseparator),thousandseparator:b(a.thousandseparator,d.thousandseparator),thousandseparatorposition:b(L,d.thousandseparatorposition),indecimalseparator:N(a.indecimalseparator,d.indecimalseparator),inthousandseparator:N(a.inthousandseparator,d.inthousandseparator),scalerecursively:h,maxscalerecursion:p,
scaleseparator:t}
        ;
        g.useScaleRecursively&&(d.numberscalevalue&&d.numberscalevalue.length)==(d.numberscaleunit&&d.numberscaleunit.length)||(d.scalerecursively=h=0);
        g={
          cacheStore:[],formatnumber:d.formatnumber,formatnumberscale:d.formatnumberscale,defaultnumberscale:d.defaultnumberscale,numberscaleunit:d.numberscaleunit.concat(),numberscalevalue:d.numberscalevalue.concat(),numberprefix:d.numberprefix,numbersuffix:d.numbersuffix,decimalprecision:parseInt(b(a.yaxisvaluedecimals,d.decimalprecision,2),10),
forcedecimals:b(a.forceyaxisvaluedecimals,d.forcedecimals),decimalseparator:d.decimalseparator,thousandseparator:d.thousandseparator,thousandseparatorposition:d.thousandseparatorposition.concat(),indecimalseparator:d.indecimalseparator,inthousandseparator:d.inthousandseparator,scalerecursively:h,maxscalerecursion:p,scaleseparator:t}
        ;
        h&&(d.numberscalevalue.push(1),d.numberscaleunit.unshift(d.defaultnumberscale),g.numberscalevalue.push(1),g.numberscaleunit.unshift(g.defaultnumberscale));
        this.Y[c]={
          dataLabelConf:d,
yAxisLabelConf:g}
        }
      ,percentValue:function(a){
        var b=this.percentStrCacheStore[a];
        void 0===b&&(b=isNaN(this.paramLabels.decimalprecision)?"2":this.paramLabels.decimalprecision,b=this.percentStrCacheStore[a]=d(e(a,b,this.paramLabels.forcedecimals),this.paramLabels.decimalseparator,this.paramLabels.thousandseparator,this.paramLabels.thousandseparatorposition)+"%");
        return b}
      ,getCleanValue:function(a,b){
        var c=this.cleaneValueCacheStore[a];
        if(void 0===c){
          var d=this.baseConf,c=a+"";
          d._REGinthousandseparator&&
(c=c.replace(d._REGinthousandseparator,""));
          d._REGindecimalseparator&&(c=c.replace(d._REGindecimalseparator,"."));
          c=parseFloat(c);
          c=isFinite(c)?c:NaN;
          this.cleaneValueCacheStore[a]=c=isNaN(c)?null:b?J(c):c}
        return c}
      ,dataLabels:function(a,b){
        var c=this.Y[b]||(b?this.Y[1]:this.Y[0]),d,c=c&&c.dataLabelConf||this.baseConf;
        d=c.cacheStore[a];
        void 0===d&&(d=c.cacheStore[a]=h(a,c));
        return d}
      ,yAxis:function(a,b){
        var c=this.Y[b]||(b?this.Y[1]:this.Y[0]),d,c=c&&c.yAxisLabelConf||this.baseConf;
        d=c.cacheStore[a];
        
void 0===d&&(d=c.cacheStore[a]=h(a,c,!0));
        return d}
      ,xAxis:function(a){
        var b=this.paramX.cacheStore[a];
        void 0===b&&(b=this.paramX.cacheStore[a]=h(a,this.paramX,!0));
        return b}
      ,sYAxis:function(a){
        var b=this.Y[1],c,b=b&&b.yAxisLabelConf||this.baseConf;
        c=b.cacheStore[a];
        void 0===c&&(c=b.cacheStore[a]=h(a,b));
        return c}
      ,scale:function(a){
        var b=this.paramScale.cacheStore[a];
        void 0===b&&(b=this.paramScale.cacheStore[a]=h(a,this.paramScale));
        return b}
      ,getCleanTime:function(a){
        var b;
        this.timeConf.inputDateFormat&&
Date.parseExact&&(b=Date.parseExact(a,this.timeConf.inputDateFormat));
        return b&&b.getTime()}
      ,legendValue:function(a){
        var b=this.paramLegend.cacheStore[a];
        void 0===b&&(b=this.paramLegend.cacheStore[a]=h(a,this.paramLegend));
        return b}
      ,legendPercentValue:function(a){
        var b=this.percentStrCacheStore[a],c=this.paramLegend;
        void 0===b&&(b=isNaN(c.decimalprecision)?"2":c.decimalprecision,b=this.percentStrCacheStore[a]=d(e(a,b,c.forcedecimals),c.decimalseparator,c.thousandseparator,c.thousandseparatorposition)+
"%");
        return b}
      ,getDateValue:function(a){
        var b,c,d;
        a&&!/\//.test(this.timeConf.inputDateFormat)&&(a=a.replace(new RegExp(this.timeConf.inputDateFormat.replace(/[a-z]/ig,"").slice(0,1),"g"),"/"));
        a=/^dd/.test(this.timeConf.inputDateFormat)&&a&&a.replace(/(\d{
          1,2}
        )\/(\d{
          1,2}
        )\/(\d{
          2,4}
        )/,"$2/$1/$3")||a;
        b=new Date(a);
        c=b.getTime();
        !c&&a&&/\:/.test(a)&&(a=a.split(":"),c=u(a[0],0),d=u(a[1],0),a=u(a[2],0),c=23<c?24===c&&0===d&&0===a?c:23:c,d=59<d?59:d,a=59<a?59:a,b=new Date,b.setHours(c),b.setMinutes(d),
b.setSeconds(a),c=b.getTime());
        return{
          ms:c,date:b}
        }
      ,getFormattedDate:function(a,c){
        var d="object"===typeof a&&a||new Date(a),e=this.timeConf,g=b(c,e.outputDateFormat),h=d.getFullYear(),k=d.getMonth(),l=d.getDate(),p=d.getDay(),t=d.getMinutes(),q=d.getSeconds(),d=d.getHours(),t=9<t?""+t:"0"+t,q=9<q?""+q:"0"+q,d=9<d?""+d:"0"+d;
        g.match(/dnl/)&&(g=g.replace(/dnl/ig,e.days[p]));
        g.match(/dns/)&&(g=g.replace(/dns/ig,e.days[p]&&e.days[p].substr(0,3)));
        g.match(/dd/)&&(g=g.replace(/dd/ig,l));
        g.match(/mnl/)&&
(g=g.replace(/mnl/ig,e.months[k]));
        g.match(/mns/)&&(g=g.replace(/mns/ig,e.months[k]&&e.months[k].substr(0,3)));
        g.match(/mm/)&&(g=g.replace(/mm/ig,k+1));
        g.match(/yyyy/)&&(g=g.replace(/yyyy/ig,h));
        g.match(/yy/)&&(g=g.replace(/yy/ig,(h%1E3%100+"").replace(/^(\d)$/,"0$1")));
        g.match(/hh12/)&&(g=g.replace(/hh12/ig,d%12||12));
        g.match(/hh/)&&(g=g.replace(/hh/ig,d));
        g.match(/mn/)&&(g=g.replace(/mn/ig,t));
        g.match(/ss/)&&(g=g.replace(/ss/ig,q));
        g.match(/ampm/)&&(g=g.replace(/ampm/ig,12>d?"AM":"PM"));
        g.match(/ds/)&&
(g=g.replace(/ds/ig,e.daySuffix[l]));
        return g}
      }
    ;
    F.prototype.constructor=F;
    h=function(a,c,h){
      if(null!==a){
        a=Number(a);
        var k=a+"",l,p,t,q,F;
        l=1==c.formatnumberscale?c.defaultnumberscale:"";
        F=(F=k.split(".")[1])?F.length:c.forcedecimals?"2":"";
        if(1==c.formatnumberscale){
          k=a;
          p=c.numberscalevalue;
          a=c.numberscaleunit;
          l={
            }
          ;
          var L=c.defaultnumberscale;
          t=0;
          var D=[],J=[];
          if(c.scalerecursively){
            for(t=0;
            t<p.length;
            t++)if(q=u(p[t])||1E3,Math.abs(Number(k))>=q&&t<p.length-1)L=k%q,k=(k-L)/q,0!==L&&(D.push(L),J.push(a[t]));
            
else{
              D.push(k);
              J.push(a[t]);
              break}
            D.reverse();
            J.reverse();
            l.value=D;
            l.scale=J}
          else{
            if(p.length===a.length)for(t=0;
            t<p.length;
            t++)if(q=u(p[t])||1E3,Math.abs(Number(k))>=q)L=a[t]||"",k=Number(k)/q;
            else break;
            l.value=k;
            l.scale=L}
          p=l;
          a=k=p.value;
          l=p.scale}
        if(c.scalerecursively&&0!==c.formatnumberscale&&"0"!==c.formatnumberscale){
          h=p.value;
          p=p.scale;
          a=-1==c.maxscalerecursion?h.length:Math.min(h.length,c.maxscalerecursion);
          if(1==c.formatnumber)for(k="",q=0;
          q<a;
          q++)l=0===q?h[q]:Math.abs(h[q]),t=l+"",q==
a-1&&(t=e(l,b(c.decimalprecision,F),c.forcedecimals)),k=k+d(t,c.decimalseparator,c.thousandseparator,c.thousandseparatorposition)+p[q]+(q<a-1?c.scaleseparator:"");
          else for(k="",q=0;
          q<a;
          q++)k=k+(0===q?h[q]:Math.abs(h[q])+"")+p[q]+(q<a-1?c.scaleseparator:"");
          k=(c.numberprefix||"")+k+(c.numbersuffix||"")}
        else 1==c.formatnumber&&(k=e(a,b(c.decimalprecision,F),c.forcedecimals),k=d(k,c.decimalseparator,c.thousandseparator,c.thousandseparatorposition,h)),k=(c.numberprefix||"")+k+l+(c.numbersuffix||"");
        return k}
      }
    ;
    
return F}
  ();
  e.extend(e.core,{
    formatNumber:function(a,b){
      b=b&&F(b)||{
        }
      ;
      var c=U(b),e;
      t[c]?e=t[c]:t[c]=e=new k.NumberFormatter(b,{
        useScaleRecursively:!0}
      );
      return e.dataLabels(a)}
    }
  ,!1);
  e.extend(e.core,{
    formatNumber:function(a,b,c,l){
      c=c&&F(c)||{
        }
      ;
      var p=this.jsVars.instanceAPI||{
        }
      ,u=p.numberFormatter,n;
      ""===U(c)?u?n=u:(u=this.getChartData(e.dataFormats.JSON,!0),u=u.data||{
        }
      ,u=u.chart||{
        }
      ,c=U(u),t[c]?n=t[c]:t[c]=n=new k.NumberFormatter(u,p)):(u=this.getChartData(e.dataFormats.JSON,!0),u=u.data||{
        }
      ,u=u.chart||
{
        }
      ,u=q(q({
        }
      ,u),c),c=U(u),t[c]?n=t[c]:t[c]=n=new k.NumberFormatter(u,p));
      switch((b&&b.toLowerCase?b:"").toLowerCase()){
        case "yaxisvalues":a=n.yAxis(a,l);
        break;
        case "xaxisvalues":a=n.xAxis(a);
        break;
        case "scale":a=n.scale(a);
        break;
        default:a=n.dataLabels(a,l)}
      return a}
    }
  ,!0)}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-dom",function(){
  var e=this.hcLib,k=this.window,u=k.document,q=e.extend2,D="ontouchstart"in k;
  (function(b){
    var e=function(){
      var b={
        }
      ,e;
      b.pointerdrag={
        start:["mousedown"],end:["mouseup"],onStart:["mousemove"],postHandlers:{
          }
        ,preHandlers:{
          }
        }
      ;
      b.pointerhover={
        start:["mouseover"],end:["mouseout"]}
      ;
      b.click={
        start:["click"]}
      ;
      b.escape={
        start:["keydown"],preHandlers:{
          start:function(a){
            a=a||k.event;
            return a.keyCode&&27===a.keyCode?!0:!1}
          }
        }
      ;
      D&&(e=
b.pointerdrag,e.start.push("touchstart"),e.end.push("touchend"),e.onStart.push("touchmove"),e.postHandlers.onStart=function(a){
        a.preventDefault?a.preventDefault():a.returnValue=!1}
      );
      return b}
    (),J;
    J=q({
      }
    ,e);
    b.dem=new function(){
      var b={
        }
      ,e={
        }
      ,a=u.addEventListener?function(a,b,c){
        a.addEventListener(b,c,!1)}
      :function(a,b,c){
        a.attachEvent("on"+b,c)}
      ,t=u.removeEventListener?function(a,b,c){
        a.removeEventListener(b,c,!1)}
      :function(a,b,c){
        a.detachEvent("on"+b,c)}
      ,D=function(a,b,c){
        var e=[],g,p,t;
        t=J[b];
        c.start=
function(b){
          b=b||k.event;
          for(var e=t.onStart,g=t.end,h=[],p=[],n=e&&e.length||0;
          n--;
          )h.push(F(a,e[n],c,"onStart"));
          for(n=g&&g.length||0;
          n--;
          )p.push(F(a,g[n],c,"end"));
          c.startUn=c.startUn?c.startUn.concat(h):h;
          c.endUn=c.endUn?c.endUn.concat(p):p;
          c.state="start";
          c.closure(b)}
        ;
        c.onStart=function(a){
          a=a||k.event;
          c.state="on";
          if(c.gDef&&c.gDef.preHandlers&&"function"===typeof c.gDef.preHandlers.onStart)c.gDef.preHandlers.onStart(a);
          c.closure(a);
          if(c.gDef&&c.gDef.postHandlers&&"function"===typeof c.gDef.postHandlers.onStart)c.gDef.postHandlers.onStart(a)}
        ;
        
c.end=function(a){
          a=a||k.event;
          for(var b=c.startUn,d=c.endUn,e=b&&b.length||0;
          e--;
          )b[e]();
          delete c.startUn;
          c.startUn=[];
          for(e=d&&d.length||0;
          e--;
          )d[e]();
          delete c.endUn;
          c.endUn=[];
          c.state="end";
          c.closure(a)}
        ;
        if(t)for(b=t.start,p=b.length;
        p--;
        )(g=b[p])&&e.push(F(a,g,c,"start"));
        return e}
      ,F=function(b,c,e,g){
        g=g||"closure";
        a(b,c,e[g]);
        return function(){
          t(b,c,e[g])}
        }
      ,g=function(a){
        return function(b){
          b=b||k.event;
          a.handler.call(a.context||a.elem,{
            data:a.data,type:a.type,state:a.state,isGesture:a.isGesture,
target:b.target||b.srcElement,originalEvent:b}
          )}
        }
      ;
      return{
        listen:function(a,h,k,t,q){
          var n=this;
          h="string"===typeof h?h.split(" "):h;
          var C=h.length,w=[],N=function(a,b,c){
            w.push(function(){
              n.unlisten(a,b,c)}
            )}
          ,v,oa,ea,$,W;
          if(a.ownerDocument&&a.ownerDocument===u)for(;
          C--;
          )oa=h[C],$=Boolean(J[oa]),W="function"===typeof k?k:k[C],ea={
            handler:W,elem:a,type:oa,isGesture:$,gDef:$?J[oa]:null,data:t,context:q,start:[],end:[],links:{
              prev:null,next:null}
            }
          ,ea.closure=g(ea),$?((v=e[oa])||(v=e[oa]=[]),v.push(ea),
D(a,oa,ea)):((v=b[oa])||(v=b[oa]=[]),v.push(ea),F(a,oa,ea)),N(a,oa,W);
          else for(;
          C--;
          )oa=h[C],W="function"===typeof k?k:k[C],ea={
            handler:W,elem:a,type:oa,isGesture:$,data:t,context:q,start:[],end:[],links:{
              prev:null,next:null}
            }
          ,ea.closure=g(ea),(v=b[oa])||(v=b[oa]=[]),v.push(ea),F(a,oa,ea),N(a,oa,W);
          return{
            unlisten:function(){
              for(var a=w.length;
              a--;
              )w[a]();
              w.length=0;
              w=null}
            }
          }
        ,unlisten:function(a,g,k){
          var q,F=!1,n,u;
          if(Boolean(J[g]))for(n=(q=e[g])&&q.length||0;
          n--;
          ){
            if(u=q[n],u.handler===k&&u.elem===
a){
              var F=a,w=void 0,D=void 0,v=void 0,w=void 0;
              if(w=J[g])for(w=w.start,v=w.length;
              v--;
              )(D=w[v])&&t(F,D,u.start);
              q.splice(n,1);
              F=!0}
            }
          else for(n=(q=b[g])&&q.length||0;
          n--;
          )u=q[n],u.handler===k&&u.elem===a&&(t(a,g,u.closure),q.splice(n,1),F=!0);
          return F}
        ,fire:function(a,e,g,k){
          var p;
          if(a.ownerDocument&&a.ownerDocument===u)u.createEvent?(p=u.createEvent("HTMLEvents"),p.initEvent(e,!0,!0),g&&(g.originalEvent?g.originalEvent=p:q(p,g)),"function"===typeof a[e]&&a[e].call(a),a.dispatchEvent(p)):(p=u.createEventObject(),
p.eventType=e,g&&(g.originalEvent?g.originalEvent=p:q(p,g)),"function"===typeof a[e]&&a[e].call(a),a.fireEvent("on"+e,p)),k&&!p.returnValue&&k(p);
          else for(k=(e=b[e])&&e.length||0;
          k--;
          )p=e[k],p.elem===a&&p.closure(g)}
        }
      }
    }
  )(e||k);
  (function(b){
    function e(a,b){
      var c="";
      u.defaultView&&u.defaultView.getComputedStyle?c=u.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){
        return b.toUpperCase()}
      ),c=a.currentStyle[b]);
      c=parseInt(c,10);
      return isNaN(c)?
0:c}
    function D(b,c,e,g,d,h,k,q){
      var u=c/40,n=p[h||"linear"](g-e,u),J=0,w=function(){
        var c;
        J<u?(c=n[J],b.style[d]=e+c+q,a&&"opacity"===d&&(c=100*Number(c),b.style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity="+c+")"),J+=1,setTimeout(w,40)):k&&k()}
      ;
      q=q||"";
      setTimeout(w,40)}
    var c={
      width:{
        suffix:"px"}
      ,height:{
        suffix:"px"}
      ,opacity:!0,top:{
        suffix:"px"}
      ,left:{
        suffix:"px"}
      }
    ,p={
      linear:function(a,b){
        for(var c=[],e=a/b,d=0;
        d<b;
        d+=1)c[d]=e*(d+1);
        return c}
      }
    ,a=/msie/i.test(k.navigator.userAgent)&&!k.opera;
    
b.danimate=q({
      animate:function(a,b,k,g,d){
        g={
          }
        ;
        var h={
          }
        ,l=function(){
          q+=1;
          q===p&&"function"===typeof d&&d()}
        ,p=0,q=0,n,u;
        if(40>k){
          for(u in b)a.style[u]=b[u];
          d&&d()}
        else for(u in b)c[u]&&(p+=1,g[u]=b[u],h[u]=e(a,u),n="object"===typeof c[u]&&c[u].suffix,D(a,k,h[u],g[u],u,"linear",l,n))}
      }
    ,{
      }
    )}
  )(e||k)}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-colormanager",function(){
  var e=this.hcLib,k=e.pluckNumber,u=e.graphics.getDarkColor,q=e.graphics.getLightColor,D="AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "),b="8BBA00 F6BD0F FF654F AFD8F8 FDB398 CDC309 B1D0D2 FAD1B9 B8A79E D7CEA5 C4B3CE E9D3BE EFE9AD CEA7A2 B2D9BA".split(" "),N=e.defaultPaletteOptions={
    paletteColors:[D,
D,D,D,D],bgColor:["CBCBCB,E9E9E9","CFD4BE,F3F5DD","C5DADD,EDFBFE","A86402,FDC16D","FF7CA0,FFD1DD"],bgAngle:[270,270,270,270,270],bgRatio:["0,100","0,100","0,100","0,100","0,100"],bgAlpha:["50,50","60,50","40,20","20,10","30,30"],canvasBgColor:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],canvasBgAngle:[0,0,0,0,0],canvasBgAlpha:["100","100","100","100","100"],canvasBgRatio:["","","","",""],canvasBorderColor:["545454","545454","415D6F","845001","68001B"],canvasBorderAlpha:[100,100,100,90,100],showShadow:[0,
1,1,1,1],divLineColor:["717170","7B7D6D","92CDD6","965B01","68001B"],divLineAlpha:[40,45,65,40,30],altHGridColor:["EEEEEE","D8DCC5","99C4CD","DEC49C","FEC1D0"],altHGridAlpha:[50,35,10,20,15],altVGridColor:["767575","D8DCC5","99C4CD","DEC49C","FEC1D0"],altVGridAlpha:[10,20,10,15,10],anchorBgColor:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],toolTipBgColor:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],toolTipBorderColor:["545454","545454","415D6F","845001","68001B"],baseFontColor:["555555","60634E",
"025B6A","A15E01","68001B"],borderColor:["767575","545454","415D6F","845001","68001B"],borderAlpha:[50,50,50,50,50],legendBgColor:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],legendBorderColor:["545454","545454","415D6F","845001","D55979"],plotGradientColor:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],plotBorderColor:["333333","8A8A8A","FFFFFF","FFFFFF","FFFFFF"],plotFillColor:["767575","D8DCC5","99C4CD","DEC49C","FEC1D0"],bgColor3D:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],bgAlpha3D:["100",
"100","100","100","100"],bgAngle3D:[90,90,90,90,90],bgRatio3D:["","","","",""],canvasBgColor3D:["DDE3D5","D8D8D7","EEDFCA","CFD2D8","FEE8E0"],canvasBaseColor3D:["ACBB99","BCBCBD","C8A06C","96A4AF","FAC7BC"],divLineColor3D:["ACBB99","A4A4A4","BE9B6B","7C8995","D49B8B"],divLineAlpha3D:[100,100,100,100,100],legendBgColor3D:["F0F3ED","F3F3F3","F7F0E8","EEF0F2","FEF8F5"],legendBorderColor3D:["C6CFB8","C8C8C8","DFC29C","CFD5DA","FAD1C7"],toolTipbgColor3D:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],toolTipBorderColor3D:["49563A",
"666666","49351D","576373","681C09"],baseFontColor3D:["49563A","4A4A4A","49351D","48505A","681C09"],anchorBgColor3D:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"]}
  ,D=e.colorManager=function(b,c){
    var p=b.chart,a=e.extend2({
      }
    ,N),t=c.defaultPaletteOptions||{
      }
    ,D;
    a||(a={
      }
    );
    for(D in t)a[D]=t[D];
    a=this.paletteOptions=a;
    t=this.themeEnabled=p.palettethemecolor;
    this.paletteIndex=(0<p.palette&&6>p.palette?p.palette:k(c.paletteIndex,1))-1;
    this.iterator=0;
    this.paletteColors=a.paletteColors[this.themeEnabled?0:
this.paletteIndex];
    D=p.palettecolors;
    void 0!==D&&null!==D&&""!==p.palettecolors&&(this.paletteColors=p.palettecolors.split(/\s*\,\s*/));
    this.paletteLen=this.paletteColors.length;
    this.useFlatColors=k(p.useflatdataplotcolor,c.useFlatColor,0);
    t&&(this.paletteIndex=5,a.bgColor.push(q(t,35)+","+q(t,10)),a.bgAngle.push(270),a.bgRatio.push("0,100"),a.bgAlpha.push("50,50"),a.canvasBgColor.push("FFFFFF"),a.canvasBgAngle.push(0),a.canvasBgAlpha.push("100"),a.canvasBgRatio.push(""),a.canvasBorderColor.push(u(t,
80)),a.canvasBorderAlpha.push(100),a.showShadow.push(1),a.divLineColor.push(u(t,20)),a.divLineAlpha.push(40),a.altHGridColor.push(q(t,20)),a.altHGridAlpha.push(15),a.altVGridColor.push(q(t,80)),a.altVGridAlpha.push(10),a.anchorBgColor.push("FFFFFF"),a.toolTipBgColor.push("FFFFFF"),a.toolTipBorderColor.push(u(t,80)),a.baseFontColor.push(t.split&&t.split(",")[0]),a.borderColor.push(u(t,60)),a.borderAlpha.push(50),a.legendBgColor.push("FFFFFF"),a.legendBorderColor.push(u(t,80)),a.plotGradientColor.push("FFFFFF"),
a.plotBorderColor.push(u(t,85)),a.plotFillColor.push(u(t,85)),a.bgColor3D.push("FFFFFF"),a.bgAlpha3D.push("100"),a.bgAngle3D.push(90),a.bgRatio3D.push(""),a.canvasBgColor3D.push(q(t,20)),a.canvasBaseColor3D.push(q(t,40)),a.divLineColor3D.push(u(t,20)),a.divLineAlpha3D.push(40),a.legendBgColor3D.push("FFFFFF"),a.legendBorderColor3D.push(u(t,80)),a.toolTipbgColor3D.push("FFFFFF"),a.toolTipBorderColor3D.push(u(t,80)),a.baseFontColor3D.push(t.split&&t.split(",")[0]),a.anchorBgColor3D.push("FFFFFF"),a.tickColor&&
a.tickColor.push(u(t,90)),a.trendDarkColor&&a.trendDarkColor.push(u(t,90)),a.trendLightColor&&a.trendLightColor.push(q(t,a.TrendLightShadeOffset)),a.msgLogColor&&a.msgLogColor.push(q(t,80)),a.dialColor&&a.dialColor.push(u(t,95)+",FFFFFF,"+u(t,95)),a.dialBorderColor&&a.dialBorderColor.push(u(t,95)+",FFFFFF,"+u(t,95)),a.pivotColor&&a.pivotColor.push(q(t,95)+",FFFFFF,"+q(t,95)),a.pivotBorderColor&&a.pivotBorderColor.push(u(t,95)+",FFFFFF,"+u(t,95)),a.pointerBorderColor&&a.pointerBorderColor.push(u(t,
75)),a.pointerBgColor&&a.pointerBgColor.push(u(t,75)),a.thmBorderColor&&a.thmBorderColor.push(u(t,90)),a.thmFillColor&&a.thmFillColor.push(q(t,55)),a.cylFillColor&&a.cylFillColor.push(q(t,55)),a.periodColor&&a.periodColor.push(q(t,10)),a.winColor&&a.winColor.push("666666"),a.lossColor&&a.lossColor.push("CC0000"),a.drawColor&&a.drawColor.push("666666"),a.scorelessColor&&a.scorelessColor.push("FF0000"),a.gridColor&&a.gridColor.push(q(t,30)),a.categoryBgColor&&a.categoryBgColor.push(q(t,10)),a.dataTableBgColor&&
a.dataTableBgColor.push(q(t,10)),a.gridResizeBarColor&&a.gridResizeBarColor.push(u(t,90)),a.scrollBarColor&&a.scrollBarColor.push(q(t,50)))}
  ;
  D.prototype={
    getColor:function(b){
      return this.paletteOptions[b][this.paletteIndex]}
    ,getPlotColor:function(b){
      var c=this.paletteColors;
      b=this.useFlatColors?this.getColor("plotFillColor"):c[b%this.paletteLen];
      b||(this.iterator===this.paletteLen&&(this.iterator=0),b=c[this.iterator],this.iterator+=1);
      return b}
    ,parseColorMix:function(b,c){
      var e=[],a,k,D,F,g,d,h,
l,L,N;
      c=c.replace(/\s/g,"");
      c=c.toLowerCase();
      if(""===c||null===c||void 0===c)e=[b];
      else for(k=c.split(","),D=b.split(","),F=Math.max(k.length,D.length,1),g=k[0],d=D[0],L=/[\{
        \}
      ]/ig,N=0;
      N<F;
      N++)h=(k[N]||g).replace(L,""),l=D[N]||d,"color"==h?e.push(l):"light"==h.substr(0,5)?(a=h.indexOf("-"),a=-1==a?1:h.substr(a+1,h.length-a),a=100-a,e.push(q(l,a))):"dark"==h.substr(0,4)?(a=h.indexOf("-"),a=-1==a?1:h.substr(a+1,h.length-a),a=100-a,e.push(u(l,a))):e.push(h);
      return e}
    ,parseAlphaList:function(b,c){
      var e=
b.split(","),a=[],t,q=100,F;
      for(F=0;
      F<c;
      F++)t=k(e[F]),void 0!==t&&null!==t&&(q=t),a[F]=q;
      return a.join()}
    ,parseRatioList:function(b,c){
      var e=b.split(","),a=[],k=0,q,F;
      for(F=0;
      F<c;
      F++)q=e[F],q=isNaN(q)||void 0===q?0:Math.abs(Number(q)),q=100<q?100:q,a[F]=q,k+=q;
      k=100<k?100:k;
      if(e.length<c)for(F=e.length;
      F<c;
      F++)a[F]=(100-k)/(c-e.length);
      a[-1]=0;
      return a.join()}
    }
  ;
  D.prototype.constructor=D;
  e.defaultGaugePaletteOptions={
    paletteColors:[b,b,b,b,b],bgColor:["CBCBCB,E9E9E9","CFD4BE,F3F5DD","C5DADD,EDFBFE",
"A86402,FDC16D","FF7CA0,FFD1DD"],bgAngle:[270,270,270,270,270],bgRatio:["0,100","0,100","0,100","0,100","0,100"],bgAlpha:["50,50","60,50","40,20","20,10","30,30"],toolTipBgColor:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],toolTipBorderColor:["545454","545454","415D6F","845001","68001B"],baseFontColor:["555555","60634E","025B6A","A15E01","68001B"],tickColor:["333333","60634E","025B6A","A15E01","68001B"],trendDarkColor:["333333","60634E","025B6A","A15E01","68001B"],trendLightColor:["f1f1f1","F3F5DD",
"EDFBFE","FFF5E8","FFD1DD"],pointerBorderColor:["545454","60634E","415D6F","845001","68001B"],pointerBgColor:["545454","60634E","415D6F","845001","68001B"],canvasBgColor:["FFFFFF","FFFFFF","FFFFFF","FFFFFF","FFFFFF"],canvasBgAngle:[0,0,0,0,0],canvasBgAlpha:["100","100","100","100","100"],canvasBgRatio:["","","","",""],canvasBorderColor:["545454","545454","415D6F","845001","68001B"],canvasBorderAlpha:[100,100,100,90,100],altHGridColor:["EEEEEE","D8DCC5","99C4CD","DEC49C","FEC1D0"],altHGridAlpha:[50,
35,10,20,15],altVGridColor:["767575","D8DCC5","99C4CD","DEC49C","FEC1D0"],altVGridAlpha:[10,20,10,15,10],borderColor:["767575","545454","415D6F","845001","68001B"],borderAlpha:[50,50,50,50,50],legendBgColor:["ffffff","ffffff","ffffff","ffffff","ffffff"],legendBorderColor:["545454","545454","415D6F","845001","D55979"],plotFillColor:["767575","D8DCC5","99C4CD","DEC49C","FEC1D0"],plotBorderColor:["999999","8A8A8A","6BA9B6","C1934D","FC819F"],msgLogColor:["717170","7B7D6D","92CDD6","965B01","68001B"],
TrendLightShadeOffset:30}
  }
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-annotations",function(){
  var e=this,k=e.core,u=e.hcLib,q=e.window,D=/msie/i.test(q.navigator.userAgent)&&!q.opera,b=u.addEvent,N=u.removeEvent,J=u.hasTouch,c=q.Number,p=J?6:5,a="rgba(192,192,192,"+(D?.002:1E-6)+")",D=q.Math,t=D.min,U=D.max,F=D.sin,g=D.cos,d=D.PI,h=d/180,l=e.extend,L=u.pluck,P=u.pluckNumber,n=u.graphics.convertColor,C=u.getValidValue,w=u.parseUnsafeString,R=u.setImageDisplayMode,v=u.graphics.parseColor,oa=u.setLineHeight,
ea=u.getMouseCoordinate,$={
    style:{
      }
    }
  ,W=u.toRaphaelColor,pa=function(a,b){
    return{
      start:-b,end:-a,angle:a-b}
    }
  ,Ca=function(a,b,d,e,g){
    var h,k,l=0,p=0;
    k=void 0===b||null===b?1:b;
    var n;
    if(!a||!a.toString)return{
      value:d,hasDynamicMacros:!1}
    ;
    a=a.toString();
    a=a.toLowerCase().replace(/\s/g,"");
    if(d=a.match(/^[\+\-]?\d+(\.\d+)?|[\+\-]\d+(\.\d+)?/g)){
      for(b=0;
      b<d.length;
      b+=1)l+=Number(d[b])||0;
      l*=k}
    if(d=a.match(/^[\+\-]?(\$[a-z0-9\.]+)|[\+\-](\$[a-z0-9\.]+)/g))for(b=0;
    b<d.length;
    b+=1){
      h=d[b];
      var q=e,t=g,v=h.split("."),
w=void 0,F=void 0,u=0;
      for(k=void 0;
      w=v.shift();
      )switch(typeof(F=q[w])){
        case "object":q=F[w];
        break;
        case "function":F=F(v,t),"-"===h.charAt()&&(F*=-1),k=!0;
        default:u+=c(F)||0,v.length=0}
      h=u;
      k&&(n=!0);
      p+=h}
    if(d=a.match(/^[\+\-]?\$\d+(\.\d+)?|[\+\-]\$\d+(\.\d+)?/g))for(b=0;
    b<d.length;
    b+=1)p=p+Number(d[b].replace("$",""))||0;
    return{
      value:l+p,hasDynamicMacros:n}
    }
  ,fa=function(a,b,c){
    if(!b.removed){
      b=b.data("annotation");
      var d=b.getRenderer(),g=ea(d.container,c),h=g.annotationOptions=b.options,k=g.groupOptions=
b.group.options;
      g._shape=b;
      "id"in h&&(g.annotationId=h.id);
      "id"in k&&(g.groupId=k.id);
      e.raiseEvent(a,g,d.fusionCharts,c)}
    }
  ,la,Q,ya;
  Q=function(a,b,c,d,e){
    this.options=a;
    this.attrs={
      }
    ;
    this.css={
      }
    ;
    this.bounds={
      }
    ;
    this.shared=b;
    this.snaps=c||{
      }
    ;
    this.annotations=e;
    this.items=b=[];
    this._idstore=d;
    a.id&&(this._id=a.id,d[a.id]=this);
    if(a=a.items)for(d=0,c=a.length;
    d<c;
    d+=1)b.push(new ya(a[d],this))}
  ;
  l(Q.prototype,{
    scaleImageX:1,scaleImageY:1,scaleText:1,scaleValue:1,scaleValueComplement:1,scaleX:1,scaleY:1}
  );
  
Q.prototype.setup=function(){
    var a=this.options,b=this.shared,c=this.getRenderer();
    c&&(this.isBelow=0!==P(a.showbelow,a.showbelowchart,b.showbelow),this.useTracker=!this.isBelow&&c.layers.tracker&&this.shared.useTracker,this.raiseOwnEvents=b.interactionevents)}
  ;
  Q.prototype.scale=function(){
    var a=this.options,b=this.shared,c=this.bounds,d=this.snaps,e=this.getRenderer(),g=b.rootxscale,h=b.rootyscale,k=c.xs=P(a.xscale,b.xscale,100)/100,l=c.ys=P(a.yscale,b.yscale,100)/100,p,n,q;
    e&&(this.scaleText*=l,
this.scaleImageX*=k,this.scaleImageY*=l,0!==P(a.autoscale,b.autoscale)&&(k=P(a.origw,b.origw),l=P(a.origh,b.origh),k=e.chartWidth/k,l=e.chartHeight/l,e=0!==P(a.constrainedscale,b.constrainedscale),p=k<l?k:l,n=e?p:k,q=e?p:l,this.scaleValue=Q.prototype.scaleValue*p,this.scaleValueComplement=Q.prototype.scaleValueComplement*(e?p:k<l?l:k),this.scaleX=Q.prototype.scaleX*n,this.scaleY=Q.prototype.scaleX*q,c.xs*=n,c.ys*=q,g*=n,h*=q,"1"==L(a.scaletext,b.scaletext)&&(this.scaleText=Q.prototype.scaleText*q),
"1"==L(a.scaleimages,b.scaleimages)&&(this.scaleImageX=Q.prototype.scaleImageX*n,this.scaleImageY=Q.prototype.scaleImageY*q)),c.x=Ca(L(a.x,a.xpos),g,0,d,this.isBelow).value+P(a.grpxshift,b.grpxshift,0),c.y=Ca(L(a.y,a.ypos),h,0,d,this.isBelow).value+P(a.grpyshift,b.grpyshift,0),this.xshift=P(a.xshift,b.xshift,0),this.yshift=P(a.yshift,b.yshift,0))}
  ;
  Q.prototype.draw=function(){
    var a=this.getRenderer(),b=this.options,c=this.bounds,d=this.items,e=a&&a.layers.dataset,g=this.wrapper;
    if(a){
      g||(this.wrapper=
g=a.paper.group("annotations"),e&&(this.isBelow?g.insertBefore(e):g.insertAfter(a.layers.datalabels||e)));
      this.wrapper.attr({
        x:0,y:0,visibility:P(b.visible,1)?"":"hidden"}
      ).translate(c.x,c.y);
      b=0;
      for(c=d.length;
      b<c;
      b+=1)a=d[b],a.scale(!0),a.queueDraw?a.queue():(a.setup(),a.draw());
      return this}
    }
  ;
  Q.prototype.destroy=function(){
    for(var a=this.wrapper,b=this.items,c;
    c=b.shift();
    )c.destroy();
    a&&(this.wrapper=a.remove());
    this._idstore[this._id]===this&&delete this._idstore[this._id]}
  ;
  Q.prototype.addItem=
function(a,b){
    var c;
    this.items.push(c=new ya(a,this,this._idstore));
    b&&null!==this.getRenderer()&&(c.scale(),c.setup(),c.draw());
    return c}
  ;
  Q.prototype.removeItem=function(a){
    for(var b=this.items,c=b.length;
    c--;
    )if(a===b[c]._id)return b.splice(c,1)}
  ;
  Q.prototype.getRenderer=function(){
    return this.annotations&&this.annotations.getRenderer()||null}
  ;
  ya=function(a,b){
    var c=!1,d;
    this.options=a;
    this.group=b;
    this.args=[];
    this.attrs={
      }
    ;
    this.attrsTracker={
      }
    ;
    this.style={
      }
    ;
    this.bounds={
      }
    ;
    this._idstore=b._idstore;
    
a.id&&(this._id=a.id,b._idstore[a.id]=this);
    this.type=a.type&&a.type.toLowerCase&&a.type.toLowerCase();
    for(d in ya.eventNames)"function"===typeof a[d]&&(this[d]=a[d],c=!0);
    this.hasEvents=c;
    "function"===typeof a.onload&&(this.onload=a.onload)}
  ;
  e.extend(ya.prototype,{
    getAbsoluteBounds:function(){
      var a=this.bounds,b=a.x1,c=a.y1,d=a.x2,e=a.y2,g=t(b,d),h=t(c,e),b=U(b,d)-g,c=U(c,e)-h;
      return{
        x:g,width:b,y:h,height:c,r:a.r,unscaled:{
          width:b/a.xs,height:c/a.ys}
        }
      }
    ,queue:function(){
      this.group.annotations.shapesToDraw.push(this)}
    ,
scale:function(a){
      var b=this,c=b.group,d=c.bounds,e=b.bounds,g=b.options,h=c.snaps,k=L(g.x,g.xpos),l=L(g.y,g.ypos),p=L(g.tox,g.toxpos),n=L(g.toy,g.toypos),q=e.xs=d.xs,d=e.ys=d.ys,t=P(g.xshift,c.xshift,0),v=P(g.yshift,c.yshift,0),w;
      w=function(d,e,g,h){
        d=Ca(d,e,g,h,c.isBelow);
        d.hasDynamicMacros&&a&&(b.queueDraw=!0);
        return d.value}
      ;
      b.hasDimension=!0;
      b.hasDimensionX=!0;
      b.hasDimensionY=!0;
      e.x1=w(k,q,0,h)+t;
      void 0===p?(b.hasDimension=!1,b.hasDimensionX=!1,e.x2=e.x1):e.x2=w(p,q,0,h)+t;
      e.y1=w(l,d,0,h)+v;
      
void 0===n?(b.hasDimension=!1,b.hasDimensionY=!1,e.y2=e.y1):e.y2=w(n,d,0,h)+v;
      ya.angularShapeTypes[b.type]&&(e.angles=pa(w(g.startangle,1,0,h),w(g.endangle,1,360,h)));
      e.r=w(g.radius,c.scaleValue,0,h)}
    ,setup:function(){
      var b=this.options,c=this.group,d=c.options,e=this.attrs,g=this.style,h=c.scaleValue,k=P(d.fillalpha,d.alpha,100),p=this.fillAlpha=L(b.fillalpha,b.alpha,k),q=this.fillColor=L(b.fillcolor,b.color,d.color),t=this.fillPattern=L(b.fillpattern&&b.fillpattern.toLowerCase&&b.fillpattern.toLowerCase(),
d.fillpattern&&d.fillpattern.toLowerCase&&d.fillpattern.toLowerCase()),v=this.bordered=P(b.showborder,ya.borderedShapeTypes[this.type],!!C(b.bordercolor)),F=this.borderColor=L(b.bordercolor,d.bordercolor,q),k=this.borderAlpha=P(b.borderalpha,b.alpha,d.borderalpha,k),u=this.dashed=!!P(b.dashed,0),D=P(b.borderthickness,b.thickness,2)*h;
      this.link=L(b.link,d.link);
      this.shadow="1"==L(b.showshadow,d.showshadow);
      void 0===q&&(q=ya.borderedShapeTypes[this.type]&&"none"||"#ff0000",void 0===F&&(F="#ff0000"));
      
v&&D?(e.stroke=n(F,k),e["stroke-linecap"]="round",e["stroke-width"]=D,u&&(e["stroke-dasharray"]=[P(b.dashlen,5)*h,P(b.dashgap,3)*h])):e.stroke="none";
      this.fillOptions={
        gradientUnits:"objectBoundingBox",color:q,alpha:p,ratio:L(b.fillratio,d.fillratio),angle:360-P(b.fillangle,0),radialGradient:"radial"===t}
      ;
      this.link&&(g.cursor="pointer",g._cursor="hand");
      e.visibility=P(b.visible,1)?"":"hidden";
      this.useTracker=c.useTracker;
      this.toolText=w(L(b.tooltext,d.tooltext));
      if(this.useTracker||this.link||this.toolText)l(this.attrsTracker,
{
        stroke:a,fill:a}
      ),this.link&&(this.attrsTracker.ishot=+new Date);
      this.raiseOwnEvents=c.raiseOwnEvents}
    ,draw:function(){
      var a=this.getRenderer(),c=this.type,d=this.attrs,e=this.style,g=a&&a.paper,h=ya.types[c]&&ya.types[c].call&&ya.types[c].call(this,a),k=ya.imageShapeTypes[h],l=ya.textShapeTypes[h],p=k||l||ya.trackerShapeTypes[h],n=this.link||this.toolText,q=this.wrapper,c=this.tracker,t=a&&a.layers.tracker||this.group.wrapper,v=!1,w=c||q,F=ya.eventNames,u=ya.ownEvents,D,L;
      if(a){
        if(h){
          if(q)if(q.elemType!==
h){
            if(this.ownEventsAttached){
              for(L in u)w["un"+L].apply(q,u[L]);
              this.ownEventsAttached=!1}
            q=q.remove()}
          else if(this.hasEvents)for(D in F)(L=this[D])&&L.eventAttached&&(N(w.node,F[D],L),L.eventAttached=!1);
          k||(d.fill=W(this.fillOptions));
          q?q.attr(d).css(e):(this.args.push(this.group.wrapper),q=this.wrapper=g[h].apply(g,this.args).attr(d).css(e),q.elemType=h,q.data("annotation",this),v=!0,this.args.pop());
          !this.shadow||this.shadowAdded||k||l?q.shadow(this.shadowAdded=!1):q.shadow(this.shadowAdded=
!0,U(this.borderAlpha,this.fillOptions.alpha)/100);
          n?this.useTracker&&(c||(this.args.push(t),c=this.tracker=p?g.rect(0,0,0,0,0,t):g[h].apply(g,this.args),this.args.pop()),c.attr(d).attr(this.attrsTracker)):c&&(c=c.remove());
          w=c||q;
          if(this.raiseOwnEvents&&!this.ownEventsAttached){
            for(L in u)w[L].apply(q,u[L]);
            this.ownEventsAttached=!0}
          this.link&&w.click(a.linkClickFN,this);
          this.toolText&&(w.tooltip(this.toolText||""),this.group.wrapper.trackTooltip(!0));
          if(this.hasEvents)for(D in F)(L=this[D])&&!L.eventAttached&&
(b(w.node,F[D],L,this),L.eventAttached=!0);
          k||(c&&p&&(a=q.getBBox(),c.attr({
            x:a.x,y:a.y,width:a.width,height:a.height}
          )),v&&this.onload&&this.onload(d))}
        return this}
      }
    ,destroy:function(){
      var a=this.wrapper,b=this.tracker,c=b||a,d=ya.eventNames,e=ya.ownEvents,g,h;
      if(a){
        if(this.ownEventsAttached){
          for(h in e)c["un"+h].apply(a,e[h]);
          this.ownEventsAttached=!1}
        if(this.hasEvents)for(g in d)(h=this[g])&&h.eventAttached&&(N(c.node,d[g],h),h.eventAttached=!1);
        b&&(this.tracker=b.remove());
        this.wrapper=a.remove()}
      this._idstore[this._id]===
this&&delete this._idstore[this._id]}
    ,getRenderer:function(){
      return this.group&&this.group.getRenderer()||null}
    }
  );
  e.extend(ya,{
    imageShapeTypes:{
      image:!0}
    ,angularShapeTypes:{
      circle:!0,arc:!0}
    ,textShapeTypes:{
      text:!0}
    ,trackerShapeTypes:{
      image:!0,text:!0}
    ,borderedShapeTypes:{
      path:!0,line:!0}
    ,eventNames:{
      onmouseover:J?"touchstart":"mouseover",onmouseout:"mouseout",onmousemove:J?"touchmove":"mousemove",onclick:"click"}
    ,ownEvents:{
      click:[function(a){
        fa("annotationClick",this,a)}
      ],hover:[function(a){
        fa("annotationRollOver",
this,a)}
      ,function(a){
        fa("annotationRollOut",this,a)}
      ]}
    ,textAlignOptions:{
      left:"start",right:"end",center:"middle"}
    ,textVerticalAlignOptions:{
      top:"bottom",middle:"middle",bottom:"top"}
    ,textRotationOptions:{
      0:"0",1:"270",right:"90",cw:"90",left:"270",ccw:"270"}
    ,types:{
      rectangle:function(){
        var a=this.args,b=this.attrs,c=this.getAbsoluteBounds(),d=.5*c.width;
        c.r>d&&(c.r=d);
        a[0]=b.x=c.x;
        a[1]=b.y=c.y;
        a[2]=b.width=c.width;
        a[3]=b.height=c.height;
        a[4]=b.r=c.r;
        return"rect"}
      ,line:function(){
        var a=this.attrs,
b=this.bounds;
        this.args[0]=a.path=["M",b.x1,b.y1,"L",b.x2,b.y2];
        1===a["stroke-width"]&&(a["shape-rendering"]="crisp");
        a["stroke-width"]<p&&(this.attrsTracker["stroke-width"]=p);
        this.bordered&&this.dashed&&(this.attrsTracker["stroke-dasharray"]="solid");
        return"path"}
      ,path:function(){
        var a=this.attrs,b=this.bounds;
        this.args[0]=a.path=this.options.path;
        a.transform=["T",b.x1,b.y1,"S",b.xs,b.ys,b.x1,b.y1];
        1===a["stroke-width"]&&(a["shape-rendering"]="crisp");
        return"path"}
      ,polygon:function(){
        var a=this.args,
b=this.attrs,c=this.options,d=this.bounds,e=this.group,g=e.snaps;
        a[0]=Ca(c.sides,1,5,g,e.isBelow).value;
        a[1]=d.x1;
        a[2]=d.y1;
        a[3]=d.r;
        a[4]=Ca(c.startangle,1,0,g,e.isBelow).value;
        a[5]=0;
        b.polypath=a.slice(0);
        return"polypath"}
      ,circle:function(a){
        var b=this.args,c=this.attrs,e=this.options,k=this.bounds,l=a.chartWidth,p=a.chartHeight,n=this.group.scaleValueComplement,q=this.group.snaps,t=k.angles,w=this.group;
        a=k.r;
        L(e.radius)||(k.r=l<p?l*k.xs:p*k.ys,k.r=a=.3*k.r);
        e=Ca(e.yradius,n,a,q,w.isBelow).value;
        
this.fillPattern||(this.fillOptions.radialGradient=!0,this.fillPattern="radial");
        "radial"===this.fillPattern&&(this.fillOptions.cx=this.fillOptions.cy=.5);
        l=t.angle%360;
        if(!l&&a===e)return b[0]=c.cx=k.x1,b[1]=c.cy=k.y1,b[2]=c.r=k.r,"circle";
        l||(t.start-=.001);
        p=t.start*h;
        l=t.end*h;
        t=t.angle*h;
        n=k.x1;
        q=k.y1;
        k=n+g(p)*a;
        p=q+F(p)*e;
        n+=g(l)*a;
        l=q+F(l)*e;
        b[0]=c.path=["M",k,p,"A",a,e,0,0,t>=d?0:1,n,l,"Z"];
        return"path"}
      ,arc:function(a){
        var b=this.options,c=this.args,d=this.attrs,e=this.bounds,g=a.chartWidth;
        
a=a.chartHeight;
        var k=this.group,l=k.scaleValue,p=e.angles;
        L(b.radius)||(e.r=g<a?g*e.xs:a*e.ys,e.r*=.3);
        e.innerR=Ca(b.innerradius,l,.8*e.r,this.group.snaps,k.isBelow).value;
        e.innerR>e.r&&(e.innerR+=e.r,e.r=e.innerR-e.r,e.innerR-=e.r);
        this.fillPattern||(this.fillOptions.radialGradient=!0,this.fillPattern="radial");
        "radial"===this.fillPattern&&(this.fillOptions.cx=this.fillOptions.cy=.5);
        c[0]=e.x1;
        c[1]=e.y1;
        c[2]=e.r;
        c[3]=e.innerR;
        c[4]=p.start*h;
        c[5]=p.end*h;
        d.ringpath=c.slice(0);
        return"ringpath"}
      ,text:function(a){
        var b=
this.args,c=this.style,d=this.attrs,e=this.group,g=this.bounds,h=this.options,k=this.getAbsoluteBounds(),p=L(h.align,e.options.textalign,"center").toLowerCase(),n=L(h.valign,e.options.textvalign,"middle").toLowerCase(),q=w(L(h.text,h.label)),t=a.logic.smartLabel,F=P(h.wrap,e.options.wraptext,1),u,D,J=L(h.rotatetext,e.options.rotatetext,"0").toLowerCase(),J=ya.textRotationOptions[J],C="0"!==J?"y":"x",N=a.options.orphanStyles;
        a=l({
          }
        ,N.defaultStyle.style||{
          }
        );
        N=e.id&&N[e.id.toLowerCase()]||$;
        a=l(a,N.style);
        
var N=parseFloat(a.fontSize),R=L(h.font,e.options.font,a.fontFamily),e=P(h.fontsize,e.options.fontsize,N)*e.scaleText;
        F&&(u=P(h.wrapwidth,this.hasDimensionX?k.width/g.xs:void 0),D=P(h.wrapheight,this.hasDimensionY?k.height/g.ys:void 0),u&&(u*=g.xs),D&&(D*=g.ys));
        c.fontFamily=R;
        c.fontWeight=P(h.bold,h.isbold,0)?"bold":"normal";
        P(h.italic,h.isitalic,0)&&(c.fontStyle="italic");
        h.bgcolor&&(!d["text-bound"]&&(d["text-bound"]=[]),d["text-bound"][0]=v(h.bgcolor));
        h.bordercolor&&(!d["text-bound"]&&(d["text-bound"]=
[]),d["text-bound"][1]=v(h.bordercolor),d["text-bound"][2]=P(h.borderthickness,1),d["text-bound"][3]=P(h.padding,1));
        h.fontcolor&&(d.fill=v(h.fontcolor),this.fillOptions&&(this.fillOptions.color=d.fill));
        c.fontSize=e+"px";
        e===N?c.lineHeight=a.lineHeight:oa(c);
        d["text-anchor"]=ya.textAlignOptions[p]||ya.textAlignOptions.center;
        t.setStyle(c);
        c=t.getSmartText(q,u,D,!1);
        d["vertical-align"]=ya.textVerticalAlignOptions[n]||ya.textVerticalAlignOptions.middle;
        d["text-anchor"]===ya.textAlignOptions.left?k[C]+=
P(h.leftmargin,0):d["text-anchor"]===ya.textAlignOptions.center&&(k[C]+=.5*P(h.leftmargin,0));
        "0"!==J&&(d.rotation=[parseFloat(J),k.x,k.y]);
        b[0]=d.x=k.x;
        b[1]=d.y=k.y;
        b[2]=d.text=c.text;
        c.tooltext&&(d.title=c.tooltext);
        delete d.stroke;
        delete d["stroke-weight"];
        return"text"}
      ,image:function(a){
        var b=this,c=b.style,d=a.chartWidth,e=a.chartHeight;
        a=b.options;
        var g=b.attrs,h=b.args,k=C(a.url),p=b.group.scaleImageX*L(Number(a.xscale),100)/100,n=b.group.scaleImageY*L(Number(a.yscale),100)/100,t=b.getAbsoluteBounds(),
w={
          width:1,height:1}
        ,v;
        if(!k)return h[0]=g.x=t.x,h[1]=g.y=t.y,h[2]=g.width=t.width,h[3]=g.height=t.height,h[4]=g.r=t.r,"rect";
        v=new q.Image;
        v.onload=function(){
          w=R("none","top","left",100,0,d,e,v);
          delete w.x;
          delete w.y;
          w=l(w,{
            width:(b.hasDimensionX?t.unscaled.width:w.width)*p,height:(b.hasDimensionY?t.unscaled.height:w.height)*n}
          );
          setTimeout(function(){
            var a,d,e;
            if(a=b.wrapper){
              a.attr(w);
              if(d=b.tracker)e=a.getBBox(),d.attr({
                x:e.x,y:e.y,width:e.width,height:e.height}
              );
              a.css({
                opacity:c.opacity=U(P(b.fillAlpha,
b.borderAlpha),b.borderAlpha)/100}
              )}
            b.onload&&b.onload(w)}
          ,0)}
        ;
        v.src=k;
        h[0]=g.src=k;
        h[1]=g.x=t.x;
        h[2]=g.y=t.y;
        h[3]=g.width=(b.hasDimensionX?t.unscaled.width:w.width)*p;
        h[4]=g.height=(b.hasDimensionY?t.unscaled.height:w.height)*n;
        c.opacity=U(P(b.fillAlpha,b.borderAlpha),b.borderAlpha)/100;
        delete g.stroke;
        delete g.fill;
        delete g["stroke-linecap"];
        return"image"}
      }
    }
  );
  la=function(){
    this.groups=[];
    this._idstore={
      }
    ;
    this._options={
      }
    }
  ;
  u.Annotations=la;
  e.extend(la.prototype,{
    reset:function(a,b,c){
      var d=this.groups,
e;
      this.clear();
      if(c){
        e={
          }
        ;
        for(var g in c)switch(typeof c[g]){
          case "object":case "function":e["-$"+g]=e["$"+g]=e["+$"+g]=c[g];
          break;
          default:e["$"+g]=e["+$"+g]=c[g],e["-$"+g]=-1*c[g]}
        e=this._literals=e}
      b&&(this._options=b);
      if(a&&a.groups&&d)for(c=0;
      c<a.groups.length;
      c+=1)d.push(new Q(a.groups[c],b,e,this._idstore,this))}
    ,getRenderer:function(){
      return this._renderer}
    ,addGroup:function(a){
      var b=this.getRenderer();
      this.groups.push(a=new Q(a,this._options,this._literals,this._idstore,this));
      b&&(a.setup(),
a.scale(),a.draw());
      return a}
    ,addItem:function(a,b,c){
      var d,g=this.getRenderer();
      "string"===typeof a?d=this._idstore[a]:(c=b,b=a);
      if(d&&d.addItem){
        if(!g&&c){
          e.raiseWarning(this,"04031411430","run","Annotations~addItem()","Cannot draw the shapeif the group has not been drawn. Use Annotations~draw() to draw the group and pass the renderer to it.");
          return}
        a=d.addItem(b,c)}
      else a=this.addGroup({
        }
      ).addItem(b,c);
      return a}
    ,draw:function(a){
      var b=this.groups,c,d;
      if(b&&(this._renderer=a||this._renderer))for(c=
0,d=b.length;
      c<d;
      c++)a=b[c],a.setup(),a.scale(),a.draw()}
    ,clear:function(){
      var a=this.groups,b;
      if(a){
        for(;
        b=a.shift();
        )b.destroy();
        this.shapesToDraw=[]}
      }
    ,dispose:function(){
      var a;
      this.disposing=!0;
      this.clear();
      for(a in this)delete this[a];
      this.disposed=!0}
    ,hide:function(a){
      if(a=this._idstore[a])return a.attrs.visibility="hidden",a.wrapper&&a.wrapper.hide(),a}
    ,show:function(a){
      if(a=this._idstore[a])return a.attrs.visibility="",a.wrapper&&a.wrapper.show(),a}
    ,update:function(a,b,c){
      a=this._idstore[a];
      
var d;
      if(a&&b){
        if("object"===typeof b)for(d in b.id&&delete b.id,b.type&&delete b.type,b)a.options[(d+"").toLowerCase()]=b[d]+"";
        else a.options[(b+"").toLowerCase()]=c+"";
        a.wrapper&&(a.scale(),a.setup(),a.draw());
        return a}
      }
    ,destroy:function(a){
      var b=this._idstore[a],c=b.group;
      b&&"function"===typeof b.destroy&&(c&&c.removeItem(a),b.destroy())}
    ,shapesToDraw:[]}
  );
  e.core.addEventListener("beforeinitialize",function(a){
    "javascript"===a.sender.options.renderer&&(a.sender.annotations=new la)}
  );
  e.core.addEventListener("disposed",
function(a){
    a.sender.annotations&&a.sender.annotations.dispose()}
  );
  e.addEventListener("internal.animationComplete",function(a){
    var b=(a=a.sender.annotations)&&a.shapesToDraw,c=b&&b.length,d,e;
    if(c){
      for(e=0;
      e<c;
      e++)d=b[e],d.queueDraw=!1,d.scale(),d.setup(),d.draw();
      a.shapesToDraw=[]}
    }
  );
  k.addEventListener("rendered",function(a,b){
    if("javascript"===b.renderer){
      var c=a.sender,d=c.jsVars||{
        }
      ,e=d.instanceAPI;
      d.hcObj&&e&&e.drawAnnotations?(c.showAnnotation||(c.showAnnotation=function(){
        c.annotations.show.apply(c.annotations,
arguments)}
      ),c.hideAnnotation||(c.hideAnnotation=function(){
        c.annotations.hide.apply(c.annotations,arguments)}
      )):(delete c.showAnnotation,delete c.hideAnnotation)}
    }
  )}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-base",function(){
  var e=this,k=e.hcLib,u=k.Raphael,q=e.window,D=q.document,b=k.BLANKSTRING,N=k.createTrendLine,J="https:"===q.location.protocol?"https://export.api3.fusioncharts.com/":"http://export.api3.fusioncharts.com/",c=k.pluck,p=k.getValidValue,a=k.pluckNumber,t=k.getFirstValue,U=k.getDefinedColor,F=k.parseUnsafeString,g=k.FC_CONFIG_STRING,d=k.extend2,h=k.getDashStyle,l=k.parseTooltext,L=k.toPrecision,P=k.regex.dropHash,n=k.HASHSTRING,
C=k.getSentenceCase,w=k.addEvent,R=function(a){
    return void 0!==a&&null!==a}
  ,v=q.Math,oa=k.TOUCH_THRESHOLD_PIXELS,ea=k.CLICK_THRESHOLD_PIXELS,$=v.min,W=v.max,pa=v.abs,Ca=v.ceil,fa=v.floor,la=v.log,Q=v.pow,ya=v.sqrt,G=v.round,S=k.graphics.getColumnColor,ba=k.getFirstColor,r=k.setLineHeight,B=k.pluckFontSize,ga=k.getFirstAlpha,Z=k.graphics.getDarkColor,Da=k.graphics.getLightColor,T=k.graphics.convertColor,xa=k.COLOR_TRANSPARENT,va=k.POSITION_CENTER,qa=k.POSITION_TOP,Na=k.POSITION_BOTTOM,ha=k.POSITION_RIGHT,
Sa=k.POSITION_LEFT,ka=k.parsexAxisStyles,sa=k.chartAPI,Ra=k.graphics.mapSymbolName,hb=sa.singleseries,La=sa.multiseries,za=k.COMMASTRING,ab=k.STRINGUNDEFINED,Ea=k.ZEROSTRING,db=k.ONESTRING,$a=k.HUNDREDSTRING,Ga=k.PXSTRING,Xb=k.COMMASPACE,Kb=q.navigator.userAgent.match(/(iPad|iPhone|iPod)/g),Ub={
    left:"start",right:"end",center:"middle"}
  ,kb=k.BLANKSTRINGPLACEHOLDER,nb=k.BGRATIOSTRING,gb=k.COLOR_WHITE,m=k.TESTSTR,M=k.graphics.getAngle,E=k.axisLabelAdder,K=k.falseFN,V=k.NumberFormatter,Y=k.getLinkAction,
da=k.getAxisLimits,ja=k.createDialog,na=function(a,b){
    return 0<a?la(a)/la(b||10):null}
  ,Xa=k.hasTouch=void 0!==D.documentElement.ontouchstart,ca=k.fireEvent=function(a,b,c,d){
    k.dem.fire(a,b,c,d)}
  ,Va={
    1:"bold",0:"normal"}
  ,Ka={
    1:"italic",0:"normal"}
  ,ra={
    1:"underline",0:"none"}
  ,ta={
    font:function(a,b){
      b.style.fontFamily=a}
    ,size:function(a,b){
      a&&(b.style.fontSize=B(a)+Ga)}
    ,color:function(a,c,d){
      c.style.color=a&&a.replace&&a.replace(P,n)||b;
      d&&(c.color=c.style.color)}
    ,bgcolor:function(a,c){
      c.style.backgroundColor=
a&&a.replace&&a.replace(P,n)||b}
    ,bordercolor:function(a,c){
      c.style.border="1px solid";
      c.style.borderColor=a&&a.replace&&a.replace(P,n)||b}
    ,ishtml:b,leftmargin:function(b,c){
      c.style.marginLeft=a(b,0)+Ga}
    ,letterspacing:function(b,c){
      c.style.letterSpacing=a(b,0)+Ga}
    ,bold:function(a,b){
      b.style.fontWeight=Va[a]||""}
    ,italic:function(a,b){
      b.style.fontStyle=Ka[a]||""}
    ,underline:function(a,b){
      b.style.textDecoration=ra[a]||""}
    }
  ,mb=k.chartPaletteStr={
    chart2D:{
      bgColor:"bgColor",bgAlpha:"bgAlpha",bgAngle:"bgAngle",
bgRatio:"bgRatio",canvasBgColor:"canvasBgColor",canvasBaseColor:"canvasBaseColor",divLineColor:"divLineColor",legendBgColor:"legendBgColor",legendBorderColor:"legendBorderColor",toolTipbgColor:"toolTipbgColor",toolTipBorderColor:"toolTipBorderColor",baseFontColor:"baseFontColor",anchorBgColor:"anchorBgColor"}
    ,chart3D:{
      bgColor:"bgColor3D",bgAlpha:"bgAlpha3D",bgAngle:"bgAngle3D",bgRatio:"bgRatio3D",canvasBgColor:"canvasBgColor3D",canvasBaseColor:"canvasBaseColor3D",divLineColor:"divLineColor3D",divLineAlpha:"divLineAlpha3D",
legendBgColor:"legendBgColor3D",legendBorderColor:"legendBorderColor3D",toolTipbgColor:"toolTipbgColor3D",toolTipBorderColor:"toolTipBorderColor3D",baseFontColor:"baseFontColor3D",anchorBgColor:"anchorBgColor3D"}
    }
  ,Ha=function(){
    var a={
      }
    ,b,c=function(){
      var d,f,g,m,h=0,k,E,l=parseInt(e.core.options.resizeTrackingInterval,10)||300,p;
      for(d in a)h+=1,f=a[d],g=f.jsVars,k=f.ref,!f.disposed&&(m=k&&k.parentNode)&&(E=k.style)&&(/\%/g.test(E.width)||/\%/g.test(E.height))?(k=m.offsetWidth,p=m.offsetHeight,!g.resizeLocked&&
(k&&g._containerOffsetW!==k||p&&g._containerOffsetH!==p)&&(f.resizeTo&&f.resizeTo(),g._containerOffsetW=k,g._containerOffsetH=p)):(delete a[d],--h);
      b=h?setTimeout(c,l):clearTimeout(b)}
    ;
    return function(d,f){
      var g=d.jsVars,m=f||d.ref&&d.ref.parentNode||{
        }
      ;
      g._containerOffsetW=m.parentNode.offsetWidth;
      g._containerOffsetH=m.parentNode.offsetHeight;
      a[d.id]=d;
      b||(b=setTimeout(c,parseInt(e.core.options.resizeTrackingInterval,10)||300))}
    }
  (),ma={
    getExternalInterfaceMethods:function(){
      var a=sa[this.jsVars.type],
a=a&&a.eiMethods,b="saveAsImage,print,exportChart,getXML,hasRendered,signature,cancelExport,getSVGString,lockResize,showChartMessage,",c;
      if("string"===typeof a)b+=a+za;
      else if(void 0!==a||null!==a)for(c in a)b+=c+za;
      return b.substr(0,b.length-1)}
    ,drawOverlayButton:function(a){
      var b=this.jsVars,c=b.overlayButton,d,f;
      if(a&&a.show){
        c||(c=b.overlayButton=D.createElement("span"),k.dem.listen(c,"click",function(){
          e.raiseEvent("OverlayButtonClick",a,b.fcObj)}
        ));
        for(d=a.message?a.message:"Back";
        c.firstChild;
        )c.removeChild(c.firstChild);
        
c.appendChild(D.createTextNode(d));
        b.overlayButtonMessage=d;
        d={
          border:"1px solid "+(a.borderColor?a.borderColor.replace(P,n):"#7f8975"),backgroundColor:a.bgColor?a.bgColor.replace(P,n):"#edefec",fontFamily:a.font?a.font:"Verdana,sans",color:"#"+a.fontColor?a.fontColor:"49563a",fontSize:(a.fontSize?a.fontSize:"10")+Ga,padding:(a.padding?a.padding:"3")+Ga,fontWeight:0===parseInt(a.bold,10)?"normal":"bold",position:"absolute",top:"0",right:"0",_cursor:"hand",cursor:"pointer"}
        ;
        for(f in d)c.style[f]=d[f];
        
b.hcObj.container.appendChild(c);
        b.overlayButtonActive=!0}
      else c&&(b.overlayButton=c.parentNode.removeChild(c),b.overlayButtonActive=!1,delete b.overlayButtonMessage)}
    ,print:function(a){
      return this.jsVars.hcObj&&this.jsVars.hcObj.hasRendered&&this.jsVars.hcObj.print(a)}
    ,exportChart:function(a){
      var b=this.jsVars.hcObj;
      return b&&b.options&&b.options.exporting&&b.options.exporting.enabled?b.exportChart(a):!1}
    ,getSVGString:function(){
      return this.jsVars&&this.jsVars.hcObj&&this.jsVars.hcObj.paper&&this.jsVars.hcObj.paper.toSVG()}
    ,
resize:function(){
      var a=this.jsVars,b=a.container,c=a.hcObj;
      c&&(c&&c.destroy&&c.destroy(),k.createChart(a.fcObj,b,a.type,void 0,void 0,!1,!0),delete a.isResizing)}
    ,lockResize:function(a){
      return"boolean"!==typeof a?!!this.jsVars.resizeLocked:this.jsVars.resizeLocked=a}
    ,showChartMessage:function(a,b,c){
      var d=this.jsVars,f=d.hcObj,e=d.fcObj,g=e.options;
      d.msgStore[a]&&(a=d.msgStore[a]);
      b&&f&&f.hasRendered?a?f.showMessage(a,c):f.hideLoading():(f&&f.destroy&&f.destroy(),e._chartMessageImageStyle={
        imageHAlign:g.baseChartMessageImageHAlign,
imageVAlign:g.baseChartMessageImageVAlign,imageAlpha:g.baseChartMessageImageAlpha,imageScale:g.baseChartMessageImageScale}
      ,e._chartMessageStyle={
        color:g.baseChartMessageColor,fontFamily:g.baseChartMessageFont,fontSize:g.baseChartMessageFontSize}
      ,k.createChart(d.fcObj,d.container,d.type,void 0,a));
      return a}
    ,signature:function(){
      return"FusionCharts/3.4.0 (XT)"}
    }
  ,Ma=k.HCstub=function(c,d,e,g){
    c=c.chart;
    var f=a(c.showborder,1)?a(c.borderthickness,1):0,m=a(c.charttopmargin,g.charttopmargin,15)+f,h=a(c.chartrightmargin,
g.chartrightmargin,15)+f,H=a(c.chartbottommargin,g.chartbottommargin,15)+f,f=a(c.chartleftmargin,g.chartleftmargin,15)+f,E=m+H,l=f+h;
    e*=.7;
    d*=.7;
    E>e&&(m-=(E-e)*m/E,H-=(E-e)*H/E);
    l>d&&(f-=(l-d)*f/l,h-=(l-d)*h/l);
    d={
      _FCconf:{
        0:{
          stack:{
            }
          }
        ,1:{
          stack:{
            }
          }
        ,x:{
          stack:{
            }
          }
        ,oriCatTmp:[],isSpline:-1!==g.chartInstance.options.chartType.search(/spline/i),noWrap:!1,marginLeftExtraSpace:0,marginRightExtraSpace:0,marginBottomExtraSpace:0,marginTopExtraSpace:0,marimekkoTotal:0}
      ,chart:{
        alignTicks:!1,ignoreHiddenSeries:!1,
events:{
          }
        ,reflow:!1,spacingTop:m,spacingRight:h,spacingBottom:H,spacingLeft:f,marginTop:m,marginRight:h,marginBottom:H,marginLeft:f,borderRadius:0,plotBackgroundColor:"#FFFFFF",textDirection:"1"===c.hasrtltext?"rtl":"",style:{
          }
        ,animation:a(c.defaultanimation,c.animation,1)?{
          duration:500*a(c.animationduration,1)}
        :!1}
      ,colors:"AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "),credits:{
        href:k.CREDIT_HREF,
text:k.CREDIT_STRING,enabled:!1}
      ,global:{
        }
      ,labels:{
        items:[]}
      ,lang:{
        }
      ,legend:{
        enabled:!0,symbolWidth:12,borderRadius:1,backgroundColor:"#FFFFFF",initialItemX:0,title:{
          text:b,x:0,y:0,padding:2}
        ,scroll:{
          }
        ,itemStyle:{
          }
        }
      ,loading:{
        }
      ,plotOptions:{
        series:{
          pointPadding:0,borderColor:"#333333",events:{
            }
          ,animation:a(c.animation,c.defaultanimation,1)?{
            duration:1E3*a(c.animationduration,1)}
          :!1,states:{
            hover:{
              enabled:!1}
            ,select:{
              enabled:!1}
            }
          ,dataLabels:{
            enabled:!0,color:"#555555",style:{
              }
            ,formatter:function(){
              return this.point.showPercentValues?
g.numberFormatter.percentValue(this.percentage):this.point.displayValue}
            }
          ,point:{
            events:{
              }
            }
          }
        ,area:{
          states:{
            hover:{
              enabled:!1}
            }
          ,marker:{
            lineWidth:1,radius:3,states:{
              hover:{
                enabled:!1}
              ,select:{
                enabled:!1}
              }
            }
          }
        ,radar:{
          states:{
            hover:{
              enabled:!1}
            }
          ,marker:{
            lineWidth:1,radius:3,states:{
              hover:{
                enabled:!1}
              ,select:{
                enabled:!1}
              }
            }
          }
        ,areaspline:{
          states:{
            hover:{
              enabled:!1}
            }
          ,marker:{
            lineWidth:1,radius:3,states:{
              hover:{
                enabled:!1}
              ,select:{
                enabled:!1}
              }
            }
          }
        ,line:{
          shadow:!0,states:{
            hover:{
              enabled:!1}
            }
          ,marker:{
            lineWidth:1,
radius:3,states:{
              hover:{
                enabled:!1}
              ,select:{
                enabled:!1}
              }
            }
          }
        ,scatter:{
          states:{
            hover:{
              enabled:!1}
            }
          ,marker:{
            lineWidth:1,radius:3,states:{
              hover:{
                enabled:!1}
              ,select:{
                enabled:!1}
              }
            }
          }
        ,bubble:{
          states:{
            hover:{
              enabled:!1}
            }
          ,marker:{
            lineWidth:1,radius:3,states:{
              hover:{
                enabled:!1}
              ,select:{
                enabled:!1}
              }
            }
          }
        ,spline:{
          states:{
            hover:{
              enabled:!1}
            }
          ,marker:{
            lineWidth:1,radius:3,states:{
              hover:{
                enabled:!1}
              ,select:{
                enabled:!1}
              }
            }
          }
        ,pie:{
          size:"80%",allowPointSelect:!0,cursor:"pointer",point:{
            events:{
              legendItemClick:c.interactivelegend===
Ea?K:function(){
                this.slice()}
              }
            }
          }
        ,pie3d:{
          size:"80%",allowPointSelect:!0,cursor:"pointer",point:{
            events:{
              legendItemClick:c.interactivelegend===Ea?K:function(){
                this.slice()}
              }
            }
          }
        ,column:{
          }
        ,floatedcolumn:{
          }
        ,column3d:{
          }
        ,bar:{
          }
        ,bar3d:{
          }
        }
      ,point:{
        }
      ,series:[],subtitle:{
        text:b,style:{
          }
        }
      ,symbols:[],title:{
        text:b,style:{
          }
        }
      ,toolbar:{
        }
      ,tooltip:{
        style:{
          }
        }
      ,xAxis:{
        steppedLabels:{
          style:{
            }
          }
        ,labels:{
          x:0,style:{
            }
          ,enabled:!1}
        ,lineWidth:0,plotLines:[],plotBands:[],title:{
          style:{
            }
          ,text:b}
        ,tickWidth:0,scroll:{
          enabled:!1}
        }
      ,
yAxis:[{
        startOnTick:!1,endOnTick:!1,title:{
          style:{
            }
          ,text:b}
        ,tickLength:0,labels:{
          x:0,style:{
            }
          }
        ,plotBands:[],plotLines:[]}
      ,{
        tickLength:0,gridLineWidth:0,startOnTick:!1,endOnTick:!1,title:{
          style:{
            }
          ,text:b}
        ,labels:{
          x:0,style:{
            }
          ,enabled:!1,formatter:function(){
            return this.value!==kb?this.value:b}
          }
        ,opposite:!0,plotBands:[],plotLines:[]}
      ],exporting:{
        buttons:{
          exportButton:{
            }
          ,printButton:{
            enabled:!1}
          }
        }
      }
    ;
    c.palettecolors&&"string"===typeof c.palettecolors&&(d.colors=c.palettecolors.split(/\s*\,\s*/));
    return g.hcJSON=
d}
  ,Jb=function(a,b,c,d,f){
    var e=[],g=!1;
    d=d||0;
    for(f=f||{
      max:Number.MIN_VALUE,min:Number.MAX_VALUE}
    ;
    d<a.length;
    ++d)if(g)if(isNaN(a[d].y)||null===a[d].y){
      if(!c)break}
    else e.push({
      index:d,y:a[d].y}
    );
    else isNaN(a[d].y)||null===a[d].y||(g=!0,e.push({
      index:d,y:a[d].y}
    ));
    if(2<e.length){
      var g=f,m={
        }
      ,h,k,E;
      for(k=0;
      k<e.length;
      ++k)h=e[k].index,m["D"+h]=0;
      for(h=0;
      10>h;
      ++h)for(k=0;
      k<e.length;
      ++k)E=0===k?(3*(e[k+1].y-e[k].y)-m["D"+e[k+1].index])/2:k===e.length-1?(3*(e[k].y-e[k-1].y)-m["D"+e[k-1].index])/2:(3*
(e[k+1].y-e[k-1].y)-m["D"+e[k+1].index]-m["D"+e[k-1].index])/4,m["D"+e[k].index]=E;
      h=G(b/(e.length-1));
      for(k=1;
      k<e.length;
      ++k){
        E=g;
        for(var l=void 0,p=void 0,I=void 0,r=void 0,K=p=void 0,n=void 0,M=void 0,q=void 0,q=void 0,l=m["D"+e[0].index],p=m["D"+e[k].index],I=e[0].y,r=3*(e[k].y-e[0].y)-2*l-p,p=2*(e[0].y-e[k].y)+l+p,K=E.max,n=E.min,M=0;
        M<=h;
        M++)q=M/h,q=I+l*q+r*q*q+p*q*q*q,q<n&&(n=q),q>K&&(K=q);
        E.max=K;
        E.min=n}
      }
    d<a.length&&!c&&Jb(a,b,c,d,f);
    return f}
  ,Wa=k.placeVerticalAxis=function(c,d,e,h,f,k,
E,H,l,r){
    var K=e[g],n=K.smartLabel,M,I,q,t,w=0,v=K.marginRightExtraSpace,V=K.marginLeftExtraSpace,F={
      }
    ,Y={
      }
    ,u={
      }
    ,B=c.plotLines,da=c.plotBands,K=d.verticalAxisValuesPadding,G=isNaN(d.fixedValuesPadding)?0:d.fixedValuesPadding,D=K-G,L=d.verticalAxisValuesPadding,na=d.verticalAxisNamePadding,ja=d.verticalAxisNameWidth,Va=d.rotateVerticalAxisName&&String(d.rotateVerticalAxisName).toLowerCase(),J="none"!==Va,Xa=c.offset?c.offset:0,C=0,N=0,ca=0,Ha=0,Ka=0,ra=0,P=0,Wa,mb,ta,Ma,K=2,P=E?v+5:V+4,rb=W(a(e.chart.plotBorderWidth,
1),0),ma=c.showLine?c.lineThickness:rb,ia=function(a,b){
      var c,f;
      a&&a.label&&void 0!==p(a.label.text)&&(ta=a.label,ta.style&&ta.style!==mb&&(mb=ta.style,n.setStyle(mb)),M=n.getOriSize(a.label.text),f=(c=M.width)?c+2:0,a.isGrid?(F[b]={
        width:c,height:M.height,label:ta}
      ,Ha<=f&&(Ha=f,d.lYLblIdx=b)):a.isTrend&&(E&&ta.textAlign===Sa||ta.textAlign===ha?(Y[b]={
        width:c,height:M.height,label:ta}
      ,Ka=W(Ka,f)):(u[b]={
        width:c,height:M.height,label:ta}
      ,ra=W(ra,f))))}
    ,wb=function(a,d){
      var e,g=d?w:w+a;
      e=c.title.style;
      
I=I||{
        }
      ;
      if(0<g)return J?(g<I.height&&(n.setStyle(e),I=n.getSmartText(c.title.text,f,g)),e=I.height):(g<I.width&&(n.setStyle(e),I=n.getSmartText(c.title.text,g,f)),e=I.width),c.title._actualWidth=e,c.title.text=I.text,I.tooltext&&(c.title.originalText=I.tooltext),d?g-e+a:g-e;
      c.title.text=b;
      return 0}
    ,R=function(a,b,c){
      for(var f in a)a[f].label.x=b,a[f].label.y=c}
    ,ca=0;
    for(Wa=da.length;
    ca<Wa;
    ca+=1)ia(da[ca],ca);
    ca=0;
    for(Wa=B.length;
    ca<Wa;
    ca+=1)ia(B[ca],ca);
    c.title&&c.title.text!=b&&(mb=c.title.style,
n.setStyle(mb),q=n.getOriSize(m).height,c.title._originalText=c.title.text,J?(c.title.rotation="cw"===Va?90:270,I=n.getSmartText(c.title.text,f,k),w=I.height,t=q):(c.title.rotation=0,I=n.getSmartText(c.title.text,void 0!==ja?ja:k,f),w=I.width,t=20));
    0<ra&&(N=ra+L);
    l&&(h=a(h.chart.maxlabelwidthpercent,0),1<=h&&100>=h&&(l=h*l/100,Ha>l&&(Ha=l)));
    C=W(Ka,Ha);
    C+=C?D+G:0;
    0<w&&(C+=w+na+P);
    (function(){
      if(N+C>k){
        Ma=N+C-k;
        if(N){
          if(L>=Ma){
            L-=Ma;
            return}
          Ma-=L;
          L=0}
        if(D+na>=Ma)na>=Ma?na-=Ma:(D-=Ma-na,na=0);
        else{
          Ma-=
D+na;
          na=D=0;
          if(20<ra)if(Ka>Ha){
            if(ra-Ka>=Ma){
              ra-=Ma;
              return}
            if(Ka-ra>=Ma){
              Ka-=Ma;
              return}
            Ka>ra?(Ma-=Ka-ra,Ka=ra):(Ma-=ra-Ka,ra=Ka);
            if(2*(Ka-Ha)>=Ma){
              ra-=Ma/2;
              Ka-=Ma/2;
              return}
            Ma-=2*(Ka-Ha);
            ra=Ka=Ha}
          else{
            if(ra-20>=Ma){
              ra-=Ma;
              return}
            Ma-=ra-20;
            ra=20}
          if(Ka>Ha){
            if(Ka-Ha>=Ma){
              Ka-=Ma;
              return}
            Ma-=Ka-Ha;
            Ka=Ha}
          w-t>=Ma?w-=Ma:(Ma-=w-t,w=t,ra>=Ma?ra=0:(Ma-=ra,ra=0,w>=Ma?w=0:(Ma-=w,w=0,Ha>=Ma&&(Ka=Ha-=Ma))))}
        }
      }
    )();
    ca=function(a,c){
      var d,e=0,s=c?ra-2:ra+a-2,g;
      if(0<ra){
        for(g in u)ta=u[g].label,u[g].width>s?(ta.style&&
ta.style!==mb&&(mb=ta.style,n.setStyle(mb)),d=n.getSmartText(ta.text,s,f,!0),ta.text=d.text,d.tooltext&&(ta.originalText=d.tooltext),u[g].height=d.height,e=W(e,d.width)):e=W(e,u[g].width);
        return c?s-e+a:s-e}
      for(g in u)u[g].label.text=b;
      return 0}
    (0,!0);
    ca=wb(ca,!0);
    ca=function(a){
      var c=0,d=W(Ha,Ka)+a-2,e;
      if(0<d){
        for(e in F)ta=F[e].label,F[e].width>d?(ta.style&&ta.style!==mb&&(mb=ta.style,n.setStyle(mb)),a=n.getSmartText(ta.text,d,f,!0),ta.text=a.text,a.tooltext&&(ta.originalText=a.tooltext),F[e].height=
a.height,c=W(c,a.width)):c=W(c,F[e].width);
        for(e in Y)ta=Y[e].label,Y[e].width>d?(ta.style&&ta.style!==mb&&(mb=ta.style,n.setStyle(mb)),a=n.getSmartText(ta.text,d,f,!0),ta.text=a.text,a.tooltext&&(ta.originalText=a.tooltext),Y[e].height=a.height,c=W(c,a.width)):c=W(c,Y[e].width);
        return d-c}
      for(e in F)F[e].label.text=b;
      for(e in Y)Y[e].label.text=b;
      return 0}
    (ca);
    ca=wb(ca);
    l=d.verticalAxisNamePadding-na;
    ca&&l&&(ca>l?(na+=l,ca-=l):(na+=ca,ca=0));
    l=d.verticalAxisValuesPadding-(D+G);
    ca&&l&&(ca>l?(D+=l,
ca-=l):(D+=ca,ca=0));
    l=d.verticalAxisValuesPadding-L;
    ca&&l&&(ca>l?(L+=l,ca-=l):(L+=ca,ca=0));
    0<ra&&(N=ra+L);
    C=W(Ka,Ha);
    C+=C?D+G:0;
    0<w&&(C+=w+na+P);
    l=W(Ka,Ha);
    l+=0<l?D+G:0;
    0<w?(J?w<I.height&&(I=n.getSmartText(c.title.text,f,w)):(w<I.width&&(I=n.getSmartText(c.title.text,w,f)),c.title.y=-((I.height-q)/2)),c.title.text=I.text,I.tooltext&&(c.title.originalText=I.tooltext),c.title.margin=l+na+P+(J?w-q:w/2)):c.title.text=b;
    q=-(D+G+Xa+V+2);
    v=v+L+Xa+2;
    P=W(Ka,Ha);
    c.labels.style&&(K=.35*parseInt(c.labels.style.fontSize,
10));
    E?(0<ra&&R(u,q,K),0<P&&(R(F,v,K),R(Y,v,K))):(0<ra&&R(u,v,K),0<P&&(R(F,q,K),R(Y,q,K)));
    c.labels._textY=K;
    c.labels._righttX=v;
    c.labels._leftX=q;
    C=C||ma;
    N=N||(H?0:rb);
    r?(e.chart.marginLeft+=E?N:C-r,e.chart.marginRight+=E?C-r:N):(e.chart.marginLeft+=E?N:C,e.chart.marginRight+=E?C:N);
    return N+C}
  ,Eb=k.titleSpaceManager=function(c,d,e,m){
    var f=this.snapLiterals||(this.snapLiterals={
      }
    ),h=d.chart,k=F(h.caption);
    d=F(h.subcaption);
    var H=h=a(h.captionpadding,10),E=c[g],l=this.smartLabel||E.smartLabel,p=
!1,n=0,K,I,r=0,M=0,q=0,t=0,w=c.title,v=c.subtitle,V=W(a(c.chart.plotBorderWidth,1),0),Y=0,u=0;
    if(3<m){
      h<V&&(h=V+2);
      k!==b&&(K=w.style,q=Ca(a(parseFloat(K.fontHeight,10),parseFloat(K.lineHeight,10),12)));
      d!==b&&(I=v.style,t=a(parseInt(I.fontHeight,10),parseInt(I.lineHeight,10),12));
      if(0<q||0<t)m=W(m,0),n=q+t+h,n>m?(r=m-n,p=!0,r<h?h=W(r,5):(r-=h,h=0,t>r?(M=t-r+10,t=0,v._originalText=v.text,v.text=""):(r-=t,t=0,q>r&&(M=q-r)))):M=m-n,0<q&&(l.setStyle(K),q+=M,m=l.getSmartText(k,e,q),M=q-m.height,w.height=
q=m.height,w.text=m.text,m.tooltext&&(w.originalText=m.tooltext),Y=m.width),0<t&&(l.setStyle(I),t+=M,e=l.getSmartText(d,e,t),M=t-e.height,t=e.height,v.text=e.text,v.height=e.height,e.tooltext&&(v.originalText=e.tooltext),u=e.width),p&&0<M&&(h+=$(H-h,M)),n=q+t+h;
      n=n||V;
      w.isOnTop?(f.captionstarty=c.chart.marginTop,c.chart.marginTop+=n):(c.chart.marginBottom+=n,f.captionstarty=w.y=E.height-c.chart.marginBottom+h,c.chart.marginTop+=5,n+=5);
      w._captionWidth=Y;
      v._subCaptionWidth=u;
      w._lineHeight=q;
      v._lineHeight=
t}
    else v&&(v.text=""),w&&(w.text="");
    return n}
  ,wb=k.stepYAxisNames=function(a,c,d,e,f,m){
    var h=0,k=e.plotLines,E=[],l,p=e.plotLines.length;
    c=c[g].smartLabel;
    for(var n=parseFloat(B(d.basefontsize,10)),K;
    h<p;
    h+=1)d=k[h],d.isGrid&&d.label&&d.label.text&&(E.push(d),0===d.value&&(l=E.length-1));
    if(p=E.length)if(e.labels.style?c.setStyle(e.labels.style):E[0].label&&E[0].label.style&&c.setStyle(e.labels.style),h=c.getOriSize("W").height,m||(h+=.4*n),a/=p-1,a<h){
      m=W(1,Ca(h/a));
      for(h=a=l;
      h<p;
      h+=1)d=E[h],h===
f&&((h-a)%m&&K&&(K.label.text=""),a=f),d&&d.label&&((h-a)%m?d.label.text=b:K=d);
      for(h=a=l;
      0<=h;
      --h)d=E[h],h===f&&((a-h)%m&&K&&(K.label.text=""),a=f),d&&d.label&&((a-h)%m?d.label.text=b:K=d)}
    }
  ,rb=k.placeHorizontalAxis=function(c,d,e,m,f,h,k){
    var H=e[g],E=m&&m.chart||{
      }
    ,l,n,K,r,I,M,q,t,w,v,V,F,Y=0,u=0,B=10,da=1,G=0,D=0,na=0,L=0,ja=!1,ca=!1,C=!1,J=a(E.labelstep,0),Va=a(E.xaxisminlabelwidth,0),Xa=a(E.maxlabelheight,h),N=d.labelDisplay,Ha=d.rotateLabels,ra=d.horizontalLabelPadding,Ka=H.marginBottomExtraSpace,
ta=e.chart.marginLeft,Ma=e.chart.marginRight,P=H.smartLabel,Wa=H.plotBorderThickness,mb=d.catCount,rb=d.slantLabels,ma=f/(c.max-c.min),ia=0,R=0,wb=0,Fa=0,Q=m&&m.chart||{
      }
    ,S=1E3*a(Q.updateinterval,Q.refreshinterval),U=Q.datastreamurl,ea=Boolean(this.realtimeEnabled&&S&&void 0!==U),Jb,T,Tb,Aa,oa,Ua,ub,Ob,Eb,Fb,ba,vb,Z,Mb,Ba,pa,ka,ga,sa,la,Da,qa,xa,Ra,lb,Ga=null,za=null,Qa,Ea,$a,ec,La,hb,db,kb,Zb,ua,Yb,fc,Pa=[],Lb=[],ob,Bb=0,Cb=0,$b,nb,tb,gc,jc,gb,fb,kc=d.horizontalAxisNamePadding,zb=0,Za=d.staggerLines,
Nb=ia,Ub=!1,Kb=!1,Xb=0,lc,Db,Pb,Wb,sd,Sc,td,$c,ad,Cc,Tc,bd,nc,Mc,Uc,Ec,cd,Nc,Vc,vc;
    Yb=c.plotLines;
    B=ua=0;
    for(fb=Yb.length;
    ua<fb;
    ua+=1)(n=Yb[ua])&&n.label&&!n.isTrend&&B<parseInt(n.label.style.lineHeight,10)&&(B=parseInt(n.label.style.lineHeight,10),M=n.label.style);
    if(M||c.labels.style)M=M||c.labels.style,P.setStyle(M),t=P.getOriSize("W"),B=P.lineHeight,q=t.width+4,F=P.getOriSize("WWW").width+4;
    c.title&&c.title.text!=b&&(M=c.title.style,P.setStyle(M),D=P.getOriSize("W").height,c.title.rotation=0,
r=P.getSmartText(c.title.text,f,h),u=r.height);
    ta!=parseInt(E.chartleftmargin,10)&&(db=!0);
    Ma!=parseInt(E.chartrightmargin,10)&&(kb=!0);
    void 0!==E.canvaspadding&&""!==E.canvaspadding&&(Kb=!0);
    Zb=f-k;
    switch(N){
      case "none":ja=C=!0;
      Ha&&(Y=rb?300:270,t=B,B=q,q=t);
      break;
      case "rotate":Y=rb?300:270;
      t=B;
      B=q;
      q=t;
      ja=!0;
      break;
      case "stagger":ca=ja=!0;
      w=fa((h-D)/B);
      w<Za&&(Za=w);
      break;
      default:Ha&&(Y=rb?300:270,t=B,B=q,q=t)}
    H.isBar&&(ja=!0);
    ua=0;
    Yb=c.plotLines;
    if(typeof e._FCconf.isXYPlot!==ab||H.isBar){
      Jb={
        }
      ;
      Ua=
oa=0;
      Fb=Eb=null;
      ga={
        }
      ;
      Ub=!0;
      ma=f/(c.max-c.min);
      Wb=function(a,f,d){
        var g,z,m,h,O,k;
        k=a.plotObj;
        O=a.labelTextWidth;
        O||(I=k.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),O=P.getOriSize(I.text).width+4,a.oriWidth=O,O>T&&(O=T),a.labelTextWidth=O,a.leftEdge=k.value*ma-O/2,a.rightEdge=k.value*ma+O/2,d&&(O=$(O,2*(n.value-c.min)*ma+e.chart.marginLeft),a.labelTextWidth=O));
        if(typeof f!==ab){
          if(d=f.plotObj,I=d.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),f.oriWidth?m=f.oriWidth:(m=P.getOriSize(I.text).width+
4,f.oriWidth=m),m>T&&(m=T),f.labelTextWidth=m,f.leftEdge=d.value*ma-m/2,f.rightEdge=d.value*ma+m/2,g=k.value*ma,z=g+O/2,h=d.value*ma,m=h-m/2,m<z)if(g+q<h-q)z-=m,g=h-g,a.labelTextWidth=z>g?$(O,g):W(q,O-z/2),f.labelTextWidth=2*(g-a.labelTextWidth/2),a.leftEdge=k.value*ma-a.labelTextWidth/2,a.rightEdge=k.value*ma+a.labelTextWidth/2,f.leftEdge=d.value*ma-f.labelTextWidth/2,f.rightEdge=d.value*ma+f.labelTextWidth/2;
          else return f.labelTextWidth=0,d.label.text=b,!1}
        else d&&(O=$(O,2*(c.max-n.value)*ma+e.chart.marginRight),
a.labelTextWidth=O,a.leftEdge=k.value*ma-O/2,a.rightEdge=k.value*ma+O/2);
        a.nextCat=f;
        return!0}
      ;
      ca?Za>nb?Za=nb:2>Za&&(Za=2):Za=1;
      for(fb=Yb.length;
      ua<fb;
      ua+=1)(n=Yb[ua])&&n.label&&typeof n.label.text!==ab&&(n.isGrid?(Aa={
        plotObj:n}
      ,n.isCat&&(Ob=ua%Za,Jb[Ob]||(Jb[Ob]=[]),Eb?(Fb=Aa,Jb[Ob].push(Fb)):(Fb=Eb=Aa,Jb[Ob].push(Eb))),Pa.push(Aa)):n.isTrend&&Lb.push({
        plotObj:n}
      ));
      fc=c.plotBands;
      ua=0;
      for(fb=fc.length;
      ua<fb;
      ua+=1)(n=fc[ua])&&n.isTrend&&n.label&&typeof n.label.text!==ab&&Lb.push({
        plotObj:n}
      );
      if(Pa.length)if(!C&&
!Y)if(H.distributedColumns)for(ua=0,fb=Pa.length;
      ua<fb;
      ua+=1)pa=Pa[ua],ka=ua%Za,n=pa.plotObj,n.label&&n.isCat&&(0<=ua-Za?(vb=Pa[ua-Za],xa=vb.plotObj.value*ma+vb.plotObj._weight*ma/2):(vb=null,xa=c.min*ma-ta),ua+Za<fb?(ba=Pa[ua+Za],Ra=ba.plotObj.value*ma-ba.plotObj._weight*ma/2):(ba=null,Ra=c.max*ma+Ma),I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),Z=n.value*ma,ad=Z-n._weight*ma/2,$c=Z+n._weight*ma/2,1<Za?(la=ad-xa,Da=$c+Ra,lb=$c-ad+$(la,Da)):lb=$c-ad,I=n.label,I.style&&I.style!==M&&P.setStyle(I.style),
lb<q&&q<P.getOriSize(I.text).width?(n.label.text=b,pa.labelTextWidth=0):(pa.labelTextWidth=lb,l=P.getSmartText(I.text,lb-4,h,ja),lb=l.width+4,pa.labelTextWidth=lb,Fa=W(Fa,l.height)));
      else{
        nb=Pa.length;
        $b=Pa.length-1;
        (ob=(Pa[$b].plotObj.value-Pa[0].plotObj.value)*ma)?(T=.1*ob,Tb=W(.2*ob,ob/nb)):Tb=T=f;
        for(K in Jb)for(ua=0,Mb=Jb[K].length;
        ua<Mb;
        ){
          for(ub=ua+1;
          !Wb(Jb[K][ua],Jb[K][ub]);
          )ub+=1;
          ua=ub}
        Eb&&(Ua=(Eb.plotObj.value-c.min)*ma+ta-Eb.labelTextWidth/2);
        n=Pa[0].plotObj;
        Eb&&n===Eb.plotObj||(I=n.label,
I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),V=P.getOriSize(I.text).width+4,Z=(n.value-c.min)*ma+ta,Eb&&(Qa=Ua-Z,V=Qa<V&&Qa>q/2?2*Qa:0),Pa[0].labelTextWidth=V,0<V&&(t=Z-V/2),t<Ua&&(Ua=t));
        Fb&&(V=Fb.labelTextWidth,oa=(c.max-Fb.plotObj.value)*ma+Ma-V/2);
        n=Pa[$b].plotObj;
        Fb&&n===Fb.plotObj||(I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),V=P.getOriSize(I.text).width+4,Z=(c.max-n.value)*ma+Ma,Fb&&(Qa=Z-oa,V=Qa<V&&Qa>q/2?2*Qa:0),Pa[$b].labelTextWidth=V,0<V&&(t=Z-V/2),t<oa&&(oa=t));
        Bb=0>Ua?
-Ua:0;
        Cb=0>oa?-oa:0;
        gb=Bb+Cb;
        if(0<gb)for(K in Zb>gb?(Ba=(Ba=Cb*f/(Cb+f))?Ba+4:0,e.chart.marginRight+=Ba,f-=Ba,Ba=(Ba=Bb*f/(Bb+f))?Ba+4:0,e.chart.marginLeft+=Ba,f-=Ba,ma=f/(c.max-c.min)):Bb<Cb?Zb>=Cb&&kb?(Ba=(Ba=Cb*f/(Cb+f))?Ba+4:0,e.chart.marginRight+=Ba,f-=Ba,ma=f/(c.max-c.min)):db&&(Ba=(Ba=Bb*f/(Bb+f))?Ba+4:0,e.chart.marginLeft+=Ba,f-=Ba,ma=f/(c.max-c.min)):Zb>=Bb&&db?(Ba=(Ba=Bb*f/(Bb+f))?Ba+4:0,e.chart.marginLeft+=Ba,f-=Ba,ma=f/(c.max-c.min)):kb&&(Ba=(Ba=Cb*f/(Cb+f))?Ba+4:0,e.chart.marginRight+=
Ba,f-=Ba,ma=f/(c.max-c.min)),Ma=e.chart.marginRight,ta=e.chart.marginLeft,ob=(Pa[$b].plotObj.value-Pa[0].plotObj.value)*ma,T=.1*ob,Tb=W(.2*ob,ob/nb),Jb){
          ua=0;
          for(Mb=Jb[K].length;
          ua<Mb;
          ){
            for(ub=ua+1;
            !Wb(Jb[K][ua],Jb[K][ub],!0);
            )ub+=1;
            ua=ub}
          K+=1}
        ua=0;
        for(fb=Pa.length;
        ua<fb;
        ua+=1)if(pa=Pa[ua],ka=ua%Za,n=pa.plotObj,n.label)if(n.isCat)pa.labelTextWidth&&(ga[ka]=pa);
        else{
          ba=(vb=ga[ka])?vb.nextCat:Jb[ka]?Jb[ka][0]:null;
          sa=null;
          if(ua>=Za)for(za=ua-Za,sa=Pa[za];
          !sa.labelTextWidth;
          )if(za>=Za)za-=Za,sa=Pa[za];
          
else{
            sa=null;
            break}
          xa=sa?sa.rightEdge:c.min*ma-ta;
          Ra=ba?ba.leftEdge:c.max*ma+Ma;
          I=n.label;
          I.style&&I.style!==M&&(M=I.style,P.setStyle(M));
          V=P.getOriSize(I.text).width+4;
          hb=n.value*ma-V/2;
          if(H.isBar&&ua==fb-1&&sa)xa>hb&&(sa.plotObj.label.text=b,sa.labelTextWidth=0,xa=sa.leftEdge);
          else if(xa>hb||Ra<hb+V){
            n.label.text=b;
            pa.labelTextWidth=0;
            continue}
          xa=W(xa,hb);
          Z=n.value*ma;
          lb=2*$(Z-xa,Ra-Z);
          lb.toFixed&&(lb=lb.toFixed(2));
          I=n.label;
          I.style&&I.style!==M&&P.setStyle(I.style);
          lb<q&&q<P.getOriSize(I.text).width?
(n.label.text=b,pa.labelTextWidth=0):(pa.labelTextWidth=lb,l=P.getSmartText(I.text,lb-4,h,ja),lb=l.width+4,pa.labelTextWidth=lb,pa.leftEdge=Z-lb/2,pa.rightEdge=Z+lb/2,Fa=W(Fa,l.height))}
        sa=qa=null;
        ua=0;
        for(fb=Pa.length;
        ua<fb;
        ua+=1)if(pa=Pa[ua],n=pa.plotObj,ka=ua%Za,n.isCat&&pa.labelTextWidth){
          sa=qa=null;
          Z=n.value*ma;
          if(ua>=Za)for(za=ua-Za,sa=Pa[za];
          !sa.labelTextWidth;
          )if(za>Za)za-=Za,sa=Pa[za];
          else{
            sa=null;
            break}
          la=sa?Z-sa.rightEdge:Z-c.min*ma+e.chart.marginLeft;
          if(ua+Za<fb)for(Ga=ua+Za,qa=Pa[Ga];
          !qa.labelTextWidth;
          )if(Ga+
Za<fb-1)Ga+=Za,qa=Pa[Ga];
          else{
            qa=null;
            break}
          Da=qa?qa.leftEdge-Z:c.max*ma+e.chart.marginRight-Z;
          lb=2*$(la,Da);
          lb>Tb&&(lb=Tb);
          lb>pa.oriWidth&&(lb=pa.oriWidth);
          pa.labelTextWidth=lb;
          I=n.label;
          I.style&&I.style!==M&&P.setStyle(I.style);
          l=P.getSmartText(I.text,lb-4,h,ja);
          pa.labelTextWidth=l.width+4;
          Fa=W(Fa,l.height);
          pa.rightEdge=Z+pa.labelTextWidth/2}
        }
      else if(Y)for(ua=0,fb=Pa.length;
      ua<fb;
      ua+=1)if((n=Pa[ua].plotObj)&&n.label&&n.label.text){
        I=n.label;
        I.style&&I.style!==M&&(M=I.style,P.setStyle(M));
        K=1;
        if(ua+
K<fb)for(Cc=Pa[K+ua].plotObj;
        Cc&&(Cc.value-n.value)*ma<q;
        )if(n.isCat){
          if(Cc.label){
            Cc.label.text=b;
            K+=1;
            if(K+ua>=fb-1)break;
            Cc=Yb[K+ua].plotObj}
          }
        else if(Cc.isCat){
          n.label.text=b;
          n=Cc;
          ua+=K-1;
          I=n.label;
          I.style&&I.style!==M&&(M=I.style,P.setStyle(M));
          break}
        wb=W(wb,P.getOriSize(I.text).width+4)}
      K=0;
      for(fb=Lb.length;
      K<fb;
      K+=1)(n=Lb[K].plotObj)&&n.label&&void 0!==p(n.label.text)&&(I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),l=P.getOriSize(I.text),I.verticalAlign===Na?ia=W(ia,l.height):R=
W(R,l.height))}
    else{
      for(fb=Yb.length;
      ua<fb;
      ua+=1)(n=Yb[ua])&&(n.isGrid?Pa.push(n):n.isTrend&&Lb.push(n));
      fc=c.plotBands;
      ua=0;
      for(fb=fc.length;
      ua<fb;
      ua+=1)(n=fc[ua])&&Lb.push(n);
      $b=Pa.length-1;
      nb=Pa.length;
      ca&&(Za>nb?Za=nb:2>Za&&(Za=2));
      if(nb)for(c.scroll&&c.scroll.viewPortMin&&c.scroll.viewPortMax?(ec=c.scroll.viewPortMin,La=c.scroll.viewPortMax,kb=db=!1):(ec=c.min,La=c.max),ob=(Pa[$b].value-Pa[0].value)*ma,tb=sd=ob/(mb-1),gc=(Pa[0].value-ec)*ma,jc=(La-Pa[$b].value)*ma,"auto"===N?tb<F&&(Y=rb?300:
270,t=B,B=q,q=t,ja=!0):"stagger"===N&&(tb*=Za),"line"!==this.defaultSeriesType&&("area"===this.defaultSeriesType?H.drawFullAreaBorder&&(Wa>gc&&(ec=c.min-=Wa/(2*ma),gc+=(Pa[0].value-ec)*ma),Wa>jc&&(La=c.max+=Wa/(2*ma),jc+=(La-Pa[$b].value)*ma)):(Wa>gc&&(ec=c.min-=Wa/(2*ma),gc+=(Pa[0].value-ec)*ma),Wa>jc&&(La=c.max+=Wa/(2*ma),jc+=(La-Pa[$b].value)*ma))),q<Va&&(q=Va),da=ca||C?W(1,J):W(1,J,Ca(q/tb)),H.x&&(H.x.stepValue=da),tb*=da,v=2*(gc+ta),(I=Yb[0].label)&&I.text&&(I.style&&P.setStyle(I.style),V=270===
Y?$(tb,P.getOriSize(I.text).height+4):$(tb,P.getOriSize(I.text).width+4),V>v&&(C||(Bb=(V-v)/2),db||(Kb&&(Bb=0),tb-=Bb/(mb-1),Pb=tb*(mb-1),ma=tb,lc=(ob-Pb)/ma,La=c.max+=lc,ec=c.min-=lc,Bb=0,ob=Pb,gc=(Pa[0].value-ec)*ma,jc=(La-Pa[$b].value)*ma))),v=2*(jc+Ma),(I=Yb[$b].label)&&I.text&&(I.style&&P.setStyle(I.style),V=270===Y?$(tb,P.getOriSize(I.text).height+4):$(tb,P.getOriSize(I.text).width+4),V>v&&(C||(Cb=(V-v)/2),kb||(Kb&&(Cb=0),tb-=Cb/(mb-1),Pb=tb*(mb-1),ma=tb,lc=(ob-Pb)/ma,Cb=0,ob=Pb,gc=(Pa[0].value-
ec)*ma,jc=(La-Pa[$b].value)*ma))),gb=Bb+Cb,0<gb&&(Zb>gb?(Ba=(Ba=Cb*f/(Cb+f))?Ba+4:0,e.chart.marginRight+=Ba,f-=Ba,Ba=(Ba=Bb*f/(Bb+f))?Ba+4:0,e.chart.marginLeft+=Ba,f-=Ba,ma=f/(c.max-c.min)):Bb<Cb?Zb>=Cb&&kb?(Ba=(Ba=Cb*f/(Cb+f))?Ba+4:0,e.chart.marginRight+=Ba,f-=Ba,ma=f/(c.max-c.min)):db&&(Ba=(Ba=Bb*f/(Bb+f))?Ba+4:0,e.chart.marginLeft+=Ba,f-=Ba,ma=f/(c.max-c.min)):Zb>=Bb&&db?(Ba=(Ba=Bb*f/(Bb+f))?Ba+4:0,e.chart.marginLeft+=Ba,f-=Ba,ma=f/(c.max-c.min)):kb&&(Ba=(Ba=Cb*f/(Cb+f))?Ba+4:0,e.chart.marginRight+=
Ba,f-=Ba,ma=f/(c.max-c.min)),ob=(Pa[$b].value-Pa[0].value)*ma,tb=ob/(mb-1),ca&&(tb*=Za),da=ca||C?W(1,J):Y?W(1,J,Ca(B/tb)):W(1,J,Ca(q/tb)),H.x&&(H.x.stepValue=da),tb*=da),K=0;
      K<nb;
      K+=1){
        n=Pa[K];
        if(K%da&&n.label){
          if(n.stepped=!0,n.label.style=c.steppedLabels.style,!ea)continue}
        else n.stepped=!1;
        n&&n.label&&void 0!==p(n.label.text)&&(I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),Y&&C?(l=P.getOriSize(I.text),wb=W(wb,l.width+4),Fa=W(Fa,l.height)):C||(l=Y||ca?P.getOriSize(I.text):P.getSmartText(I.text,
tb-4,h,ja),wb=W(wb,l.width+4),Fa=W(Fa,l.height)))}
      K=0;
      for(fb=Lb.length;
      K<fb;
      K+=1)(n=Lb[K])&&n.label&&void 0!==p(n.label.text)&&(I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),l=P.getOriSize(I.text),I.verticalAlign===Na?ia=W(ia,l.height):R=W(R,l.height));
      c.scroll&&c.scroll.enabled&&!Y&&!C&&(lc=wb/2,e.chart.marginLeft<lc&&(Db=lc-e.chart.marginLeft,Zb>Db&&(f-=Db,Zb-=Db,e.chart.marginLeft+=Db)),e.chart.marginRight<lc&&(Db=lc-e.chart.marginRight,Zb>Db&&(f-=Db,Zb-=Db,e.chart.marginRight+=Db)))}
    C?
(zb=B,Y&&(zb=wb)):zb=Y?wb:ca?Za*Fa:Fa;
    0<zb&&(zb+ra>Xa&&(zb=Xa-ra,Za=Math.floor(zb/Fa)),Nb+=ra+zb);
    0<u&&(Nb+=u+kc);
    Ea=ra-4;
    $a=R+Nb+2;
    t=0;
    $a>h&&(Qa=$a-h,kc>Qa?(kc-=Qa,Qa=0):(Qa-=kc,kc=0,Ea>Qa?(Ea-=Qa,Qa=0):(Qa-=Ea,Ea=0),ra=Ea+4),R>Qa?(R-=Qa,Qa=0):(0<R&&(Qa-=R,R=0),0<Qa&&(ia>Qa?(ia-=Qa,Qa=0):(0<ia&&(Qa-=ia,ia=0),0<Qa&&((t=u-D)>Qa?(u-=Qa,Qa=0):(Qa-=t,u=D,0<Qa&&((t=zb-B)>Qa?(zb-=Qa,Qa=0):(Qa-=t,zb=B,0<Qa&&(Qa-=u+kc,u=0,0<Qa&&(Qa-=zb,zb=0,0<Qa&&(ra-=Qa)))))))))));
    ra+=Ka;
    Tc=H.is3d?-e.chart.xDepth:0;
    bd=zb+
ra;
    Ec=Tc;
    cd=.5*B;
    G=B+ra;
    fb=Pa.length;
    na=0;
    if(Ub)if(Y)for(vc=ha,nc=rb?ra+8:ra+4,fb=Pa.length,K=0;
    K<fb;
    K+=1)(n=Pa[K].plotObj)&&n.label&&void 0!==p(n.label.text)&&(I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),ua=1,l=P.getSmartText(I.text,zb-4,q,ja),I.text=l.text,l.tooltext&&(I.originalText=l.tooltext),Ec=Tc+cd/2,I.y=nc,I.x=Ec,I.rotation=Y,I.textAlign=vc,na+=1);
    else for(Mc=zb,vc=va,nc=G,K=0;
    K<fb;
    K+=da)n=Pa[K].plotObj,B=parseInt(n.label.style.lineHeight,10),n&&n.label&&void 0!==p(n.label.text)&&
(I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),C||(l=P.getSmartText(I.text,Pa[K].labelTextWidth-4,Mc,ja),I.text=l.text,l.tooltext&&(I.originalText=l.tooltext),ca&&(nc=G+na%Za*B)),I.y=nc,I.x=Ec,I.rotation=Y,I.textAlign=vc,na+=1);
    else{
      Y?(Mc=tb,Uc=zb-4,vc=ha,nc=rb?ra+8:ra+4):ca?(Uc=tb-4,vc=va):(Mc=zb,Uc=tb-4,vc=va,nc=G);
      for(K=0;
      K<fb;
      K+=da)n=Pa[K],B=Ca(parseFloat(n.label.style.lineHeight)),cd=.5*B,G=B+ra,n&&n.label&&void 0!==p(n.label.text)&&(I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),
C||(ca&&(Mc=B),Sc=ta+(K-ec)*sd-e.chart.spacingLeft,td=300===Y?$(ya(2.999*Sc*Sc+Sc*Sc)-ra,Uc):Uc,l=P.getSmartText(I.text,td,Mc,ja),Xb=W(Xb,Y?l.width:l.height),I.text=l.text,l.tooltext&&(I.originalText=l.tooltext),ca&&(nc=G+na%Za*B)),Y?Ec=Tc+.5*B:ca||(nc=B+ra),I.y=nc,I.x=Ec,I.rotation=Y,I.textAlign=vc,na+=1);
      300===Y&&(zb=Xb,bd=zb+ra);
      d._labelY=G;
      d._labelX=Tc;
      d._yShipment=nc;
      d._isStagger=ca;
      d._rotation=Y;
      d._textAlign=vc;
      d._adjustedPx=cd;
      d._staggerLines=Za;
      d._labelHeight=B}
    fb=Lb.length;
    for(K=Vc=Nc=0;
    K<
fb;
    K+=1)(n=Lb[K].plotObj?Lb[K].plotObj:Lb[K])&&n.label&&void 0!==p(n.label.text)&&(I=n.label,I.style&&I.style!==M&&(M=I.style,P.setStyle(M)),I.verticalAlign===Na?(l=P.getSmartText(I.text,f,ia,!0),Vc=W(Vc,l.height),I.text=l.text,l.tooltext&&(I.originalText=l.tooltext),I.y=bd+P.getOriSize(I.text).height,I.x=Ec):(l=P.getSmartText(I.text,f,R,!0),Nc=W(Nc,l.height),I.text=l.text,l.tooltext&&(I.originalText=l.tooltext),I.y=-(R-P.getOriSize("W").height+ra+2)));
    0<u&&(P.setStyle(c.title.style),r=P.getSmartText(c.title.text,
f,u),c.title.text=r.text,r.tooltext&&(c.title.originalText=r.tooltext),c.title.margin=bd+Vc+kc);
    Nb=Vc;
    0<zb&&(H.horizontalAxisHeight=ra+zb-Ka,Nb+=H.horizontalAxisHeight);
    0<u&&(Nb+=L=u+kc);
    Nb=Nb||ra-Ka;
    e.chart.marginBottom+=Nb;
    0<Nc&&(e.chart.marginTop+=Nc,Nb+=Nc);
    if(c.opposite)for(c.title.margin-=zb-(r&&r.height||0)+ra,Nb-=L,e.chart.marginTop+=Nb,e.chart.marginBottom-=Nb,e.xAxis.opposite=1,fb=Yb.length,ua=0;
    ua<fb;
    ua+=1)(n=Yb[ua])&&n.isGrid&&(I=n.label)&&void 0!==I.text&&(I.textAlign=Sa,I.y-=nc+ra+4);
    
return Nb}
  ,Tb=k.configureLegendOptions=function(d,e,g,m,f){
    m=d.legend;
    var h=d.chart,k=h.is3D?mb.chart3D:mb.chart2D,H=h.useRoundEdges,E=a(e.legendiconscale,1),n=(parseInt(m.itemStyle.fontSize,10)||10)+1,l=this.colorManager,K;
    if(0>=E||5<E)E=1;
    m.padding=4;
    0>=n&&(n=1);
    K=3*E;
    n=$(n*E,f-8);
    0>=n&&(K=n=0);
    m.symbolWidth=n;
    m.symbolPadding=K;
    m.textPadding=4;
    m.legendHeight=f=n+2*K;
    m.rowHeight=W(parseInt(m.itemStyle.lineHeight,10)||12,f);
    g?(m.align=ha,m.verticalAlign="middle",m.layout="vertical"):m.x=(h.marginLeft-
h.spacingLeft-h.marginRight+h.spacingRight)/2;
    g=c(e.legendbordercolor,l.getColor(k.legendBorderColor));
    f=a(e.legendborderalpha,100);
    h=a(e.legendbgalpha,100);
    m.backgroundColor=T(c(e.legendbgcolor,l.getColor(k.legendBgColor)),h);
    m.borderColor=T(g,f);
    m.borderWidth=a(e.legendborderthickness,!H||e.legendbordercolor?1:0);
    m.shadow=Boolean(a(e.legendshadow,1));
    m.symbol3DLighting=Boolean(a(e.use3dlighting,e.useplotgradientcolor,1));
    m.shadow&&(m.shadow={
      enabled:m.shadow,opacity:W(f,h)/100}
    );
    m.reversed=Boolean(a(e.reverselegend,
0)-a(this.reverseLegend,0));
    m.style={
      padding:4}
    ;
    Boolean(a(e.interactivelegend,1))?m.symbolStyle={
      _cursor:"hand",cursor:"pointer"}
    :(d.legend.interactiveLegend=!1,m.itemStyle.cursor="default",m.itemHoverStyle={
      cursor:"inherit"}
    );
    m.borderRadius=a(e.legendborderradius,H?3:0);
    m.legendAllowDrag=Boolean(a(e.legendallowdrag,0));
    m.title.text=F(t(e.legendcaption,b));
    m.legendScrollBgColor=ba(c(e.legendscrollbgcolor,e.scrollcolor,l.getColor("altHGridColor")));
    m.legendScrollBarColor=c(e.legendscrollbarcolor,g);
    
m.legendScrollBtnColor=c(e.legendscrollbtncolor,g)}
  ,vb=k.placeLegendBlockRight=function(c,d,e,m,f){
    this.configureLegendOptions(c,d.chart,!0,f,e);
    var h=this.snapLiterals||(this.snapLiterals={
      }
    ),k=0,H=c.series,E,n=c[g],l=this.smartLabel||n.smartLabel,K=c.chart.spacingRight,p=c.legend,M,r=p.textPadding,q=p.title.padding,t=p.symbolWidth,w=p.symbolPadding,v=t+2*w,V=2*m,Y=0,F=a(d.chart.legendpadding,7);
    d=F+p.borderWidth/2+a(d.chart.canvasborderthickness,1);
    var u=2*p.padding,B=u,da=!1,G=[];
    e-=u+F;
    f&&(H=
H&&H[0]&&H[0].data);
    if(typeof H===ab||typeof H.length===ab)return 0;
    f=H.length;
    for(k=0;
    k<f;
    k+=1)(E=H[k])&&!1!==E.showInLegend&&(E.__i=k,G.push(E));
    G.sort(function(a,b){
      return a.legendIndex-b.legendIndex||a.__i-b.__i}
    );
    f=G.length;
    M=e-v-F-r;
    0>M&&(M=0);
    l.setStyle(p.itemStyle);
    p.reversed&&G.reverse();
    for(k=0;
    k<f;
    k+=1)E=G[k],da=!0,E._legendX=0,E._legendY=B,0===M?(B+=E._legendH=v,E.name=b,E._totalWidth=t+w):(H=l.getSmartText(E.name,M,V),E.name=H.text,H.tooltext&&(E.originalText=H.tooltext),H.height<v&&
(E._legendTestY=(v-H.height)/2),E._totalWidth=t+w+r+H.width+F,B+=E._legendH=W(H.height,v),Y=W(H.width,Y));
    if(da)return p.itemWidth=Y+v+F+r,p.width=p.itemWidth+u,p.title.text!==b&&(l.setStyle(p.title.style),H=l.getSmartText(p.title.text,e,V),p.title.text=H.text,H.tooltext&&(p.title.originalText=H.tooltext),k=H.width+u,p.width<k&&(p.initialItemX=(k-p.width)/2,p.width=k),p.initialItemY=H.height+q,B+=p.initialItemY),p.height=p.totalHeight=B,p.height>m&&(p.height=m,p.scroll.enabled=!0,p.scroll.flatScrollBars=
n.flatScrollBars,p.scroll.scrollBar3DLighting=n.scrollBar3DLighting,p.width+=(p.scroll.scrollBarWidth=10)+(p.scroll.scrollBarPadding=2)),h.legendstartx=n.width-K-p.width,h.legendwidth=p.width,h.legendendx=h.legendstartx+h.legendwidth,h.legendheight=p.height,d=$(p.width+d,e),c.chart.marginRight+=d+F,d;
    p.enabled=!1;
    return 0}
  ,Fa=k.placeLegendBlockBottom=function(c,d,e,h,f){
    this.configureLegendOptions(c,d.chart,!1,f,e);
    var k=this.snapLiterals||(this.snapLiterals={
      }
    ),E=0,H=c.series,n=c[g],l=n.smartLabel||
this.smartLabel,K=c.chart,p=K.spacingBottom,M=K.spacingLeft,K=K.spacingRight,I=c.legend,r,q=I.textPadding,t=I.title.padding,w,v=I.symbolWidth,V=I.symbolPadding,Y=I.legendHeight,B=d.chart;
    w=0;
    var u=2*h,da=I.rowHeight,G=.05*da,D=[];
    r=a(B.minimisewrappinginlegend,0);
    var B=a(parseInt(B.legendnumcolumns,10),0),na=0,L=0,ja=0,ca=E=0,C=0,J=0,Va=I.padding,Xa=2*Va,Va=q+V+Va;
    d=a(d.chart.legendpadding,7)+I.borderWidth/2+1;
    var N=Xa,P=!1,ra,Ha=[],Ka=!1,ma=0,ta=0;
    0>B&&(B=0);
    e-=Xa;
    l.setStyle(I.itemStyle);
    E=l.getOriSize(m).height;
    
d=$(d,h-E-8);
    h-=d;
    f&&(H=H&&H[0]&&H[0].data);
    if(typeof H===ab||typeof H.length===ab)return 0;
    f=H.length;
    for(E=0;
    E<f;
    E+=1)(ra=H[E])&&!1!==ra.showInLegend&&(ra.__i=E,Ha.push(ra));
    Ha.sort(function(a,b){
      return a.legendIndex-b.legendIndex||a.__i-b.__i}
    );
    f=Ha.length;
    l.setStyle(I.itemStyle);
    for(E=0;
    E<f;
    E+=1)P=!0,Ha[E].name=F(Ha[E].name),H=l.getOriSize(Ha[E].name),na=W(na,H.width),C=W(C,$(H.height,u)),L+=H.width,ja+=1;
    E=L/ja;
    Y=Y+G+q+V+Xa;
    L+=Y*ja;
    if(P){
      E+=Y;
      na+=Y;
      0<B&&ja<B&&(B=ja);
      L<=e&&(0>=B||B===ja)?(B=ja,
ca=E=L/ja,Ka=!0,C>da&&(J=(C-da)/2,da=C)):0<B&&(ca=e/B)>E?ca>na&&(ca=na):e>na&&(r||1.5*E>na)?(B=fa(e/na),ja<B&&(B=ja),ca=na):e>=2*E?(B=fa(e/E),ja<B&&(B=ja),ca=fa(e/B),ca>na&&(ca=na)):(B=1,ca=e);
      I.itemWidth=ca;
      r=ca-Y;
      0>r&&(V=r=q=0);
      I.symbolPadding=V;
      I.textPadding=q;
      I.width=ca*B-G;
      I.title.text!==b&&(l.setStyle(I.title.style),H=l.getSmartText(I.title.text,e,u),I.title.text=H.text,H.tooltext&&(I.title.originalText=H.tooltext),w=H.width+Xa,I.width<w&&(I.initialItemX=(w-I.width)/2,I.width=w),I.initialItemY=
w=H.height+t);
      l.setStyle(I.itemStyle);
      I.reversed&&Ha.reverse();
      for(E=0;
      E<f;
      E+=1){
        e=Ha[E];
        0===r&&(D[ma]=!0,e.name=b,t=1,q=parseInt(ma/B,10),G=ma%B,e._legendX=G*ca,e._legendY=q*da+Xa,e._legendH=t*da,e._totalWidth=v+V);
        if(Ka)H=l.getOriSize(e.name),H.height<da&&(e._legendTestY=(da-H.height)/2),e._markerYGutter=J,e._legendX=ta,e._legendY=Xa,e._legendH=da,e._totalWidth=v+Va+H.width,ta+=H.width+Y;
        else{
          H=l.getSmartText(e.name,r,u);
          e.name=H.text;
          for(H.tooltext&&(e.originalText=H.tooltext);
          !0===D[ma];
          )ma+=
1;
          q=H.height/da;
          G=ma;
          for(t=0;
          t<q;
          t+=1,G+=B)D[G]=!0;
          H.height<da&&(e._legendTestY=(da-H.height)/2);
          q=parseInt(ma/B,10);
          G=ma%B;
          e._legendX=G*ca;
          e._legendY=q*da+Xa;
          e._legendH=t*da;
          e._totalWidth=v+Va+H.width}
        ma+=1}
      l=Ka?1:Ca(D.length/B);
      I.height=I.totalHeight=N+(l*da+w);
      I.rowHeight=da;
      I.legendNumColumns=B;
      I.height>h&&(I.height=h,I.scroll.enabled=!0,I.scroll.flatScrollBars=n.flatScrollBars,I.scroll.scrollBar3DLighting=n.scrollBar3DLighting,I.width+=(I.scroll.scrollBarWidth=10)+(I.scroll.scrollBarPadding=
2));
      k.legendstartx=M+.5*(n.width-M-K-I.width)+(I.x||0);
      k.legendwidth=I.width;
      k.legendendx=k.legendstartx+k.legendwidth;
      k.legendstarty=n.height-p-I.height;
      k.legendheight=I.height;
      k.legendendy=k.legendstarty+k.legendheight;
      d+=I.height;
      c.chart.marginBottom+=d;
      return d}
    I.enabled=!1;
    return 0}
  ,Fb=function(a,b){
    return a.value-b.value}
  ,Ob=function(a,b,c){
    var d=b._originalText;
    a=a[g].smartLabel;
    b.text=b.rotation?a.getSmartText(d,c,b._actualWidth).text:a.getSmartText(d,b._actualWidth,c).text;
    b.centerYAxisName=
!0}
  ,Mb=k.adjustVerticalAxisTitle=function(a,b,c){
    if(b&&b.text){
      var d=b.text,f=a[g].smartLabel,e=2*$(a.chart.marginTop,a.chart.marginBottom)+c,m=c+a.chart.marginTop+a.chart.marginBottom;
      b.style&&f.setStyle(b.style);
      d=f.getOriSize(d);
      void 0===b.centerYAxisName&&(b.centerYAxisName=!0);
      b.rotation?d.width>e&&(b.y=m/2-(c/2+a.chart.marginTop),b.centerYAxisName=!1):d.height>e&&(b.y=(m/2-(c/2+a.chart.marginTop))/2,b.centerYAxisName=!1)}
    }
  ,Ua=k.adjustVerticalCanvasMargin=function(b,c,d,e){
    var f=c.chart,g=c=
0,m=0,h=a(f.canvastopmargin,0),f=a(f.canvasbottommargin,0),k=h/(h+f),E=b.chart.marginTop,n=b.chart.marginBottom;
    f>n&&(c+=f-n);
    h>E&&(c+=h-E);
    c>d?h>E&&f>n?(g=d*k,m=d*(1-k)):h>E?g=d:m=d:0<c&&(f>n&&(m=f-n),h>E&&(g=h-E));
    g&&(b.chart.marginTop+=g);
    m&&(b.chart.marginBottom+=m,e&&e.title&&(e.title.margin+=m));
    return g+m}
  ,Aa=k.adjustHorizontalCanvasMargin=function(b,c,d,e,f){
    var g=c.chart;
    c=a(g.canvasleftmargin,0);
    var g=a(g.canvasrightmargin,0),m=c/(c+g),h=0,k=b.chart.marginLeft,E=b.chart.marginRight,n=0,
l=0;
    c>k&&(h+=c-k);
    g>E&&(h+=g-E);
    h>d?c>k&&g>E?(n=d*m,l=d*(1-m)):g>E?l=d:n=d:0<h&&(c>k&&(n=c-k),g>E&&(l=g-E));
    n&&(b.chart.marginLeft+=n,e&&e.title&&(e.title.margin+=n));
    l&&(b.chart.marginRight+=l,f&&f.title&&(f.title.margin+=l));
    return l+n}
  ,ub=function(a,b){
    return a-b}
  ,ia=k.getDataParser={
    column:function(b,d,e){
      var m=b[g],f=d.borderWidth;
      return function(g,k,E){
        var n=d.plotgradientcolor,l=d.is3d,K=d.isRoundEdges,p=d.plotBorderColor,M=c(g.color,d.color),r=c(g.ratio,d.ratio),q=ga(d.plotBorderAlpha),t=
a(g.dashed,d.dashed),w=c(g.dashlen,d.dashLen),v=c(g.dashgap,d.dashGap),V=d.use3DLighting,Y=ga(c(g.alpha,d.alpha)).toString(),B={
          opacity:Y/100}
        ,F=d.isBar,u=d.fillAangle,da=0>E?F?180-u:360-u:u,u=S(M+za+n,Y,r,da,K,p,$(Y,q).toString(),F,l),G=t?h(w,v,f):"none";
        k=e.getPointStub(g,E,m.oriCatTmp[k],b,d,d.showValues,d.yAxis);
        g=e.pointHoverOptions(g,d,{
          plotType:"column",is3d:l,isBar:F,use3DLighting:V,isRoundEdged:K,color:M,gradientColor:n,alpha:Y,ratio:r,angle:da,borderWidth:f,borderColor:p,borderAlpha:q,borderDashed:t,
borderDashGap:v,borderDashLen:w,shadow:B}
        );
        k.y=E;
        k.shadow=B;
        k.color=u[0];
        k.borderColor=u[1];
        k.borderWidth=f;
        k.use3DLighting=V;
        k.dashStyle=G;
        k.tooltipConstraint=e.tooltipConstraint;
        k.hoverEffects=g.enabled&&g.options;
        k.rolloverProperties=g.enabled&&g.rolloverOptions;
        return k}
      }
    ,line:function(b,d,e){
      var m=b[g];
      return function(f,g,k){
        var E=a(f.alpha,d.lineAlpha),n={
          opacity:E/100}
        ,l=a(f.anchorsides,d.anchorSides,0),K=a(f.anchorborderthickness,d.anchorBorderThickness,1),p=ba(c(f.anchorbordercolor,d.anchorBorderColor)),
M=ba(c(f.anchorbgcolor,d.anchorBgColor)),r=a(f.anchorstartangle,d.anchorStartAngle,90),q=c(f.anchoralpha,d.anchorAlpha),t=c(f.anchorbgalpha,q),w=a(f.anchorradius,d.anchorRadius),v=Boolean(a(f.anchorshadow,d.anchorShadow,0));
        g=e.getPointStub(f,k,m.oriCatTmp[g],b,d,d.showValues,d.yAxis);
        var V=c(f.anchorimageurl,d.imageUrl),Y=c(f.anchorimagescale,d.imageScale),B=c(f.anchorimagealpha,d.imageAlpha);
        g.y=k;
        g.shadow=n;
        g.anchorShadow=d.anchorShadow;
        g.dashStyle=a(f.dashed,d.lineDashed)?h(d.lineDashLen,d.lineDashGap,
d.lineThickness):null;
        g.color={
          FCcolor:{
            color:ba(c(f.color,d.lineColor)),alpha:E}
          }
        ;
        g.valuePosition=c(f.valueposition,d.valuePosition);
        k=e.pointHoverOptions(f,d,{
          plotType:"anchor",anchorBgColor:M,anchorAlpha:q,anchorBgAlpha:t,anchorAngle:r,anchorBorderThickness:K,anchorBorderColor:p,anchorBorderAlpha:q,anchorSides:l,anchorRadius:w,imageUrl:V,imageScale:Y,imageAlpha:B,shadow:n}
        );
        g.marker={
          enabled:void 0===d.drawAnchors?0!==E:!!d.drawAnchors,shadow:v&&{
            opacity:q/100}
          ,fillColor:{
            FCcolor:{
              color:ba(c(f.anchorbgcolor,
d.anchorBgColor)),alpha:(c(f.anchorbgalpha,d.anchorBgAlpha)*q/100).toString()}
            }
          ,lineColor:{
            FCcolor:{
              color:ba(c(f.anchorbordercolor,d.anchorBorderColor)),alpha:q}
            }
          ,imageUrl:V,imageScale:Y,imageAlpha:B,lineWidth:a(f.anchorborderthickness,d.anchorBorderThickness),radius:a(f.anchorradius,d.anchorRadius),symbol:Ra(a(f.anchorsides,d.anchorSides)),startAngle:c(f.anchorstartangle,d.anchorAngle)}
        ;
        g.hoverEffects=k.enabled&&k.options;
        g.rolloverProperties=k.enabled&&k.rolloverOptions;
        return g}
      }
    ,area:function(b,
d,e){
      var m=b[g];
      return function(f,g,h){
        var k=c(f.alpha,d.fillAlpha),E={
          opacity:W(k,d.lineAlpha)/100,inverted:!0}
        ,n=a(f.anchorsides,d.anchorSides,0),l=a(f.anchorborderthickness,d.anchorBorderThickness,1),K=ba(c(f.anchorbordercolor,d.anchorBorderColor)),p=ba(c(f.anchorbgcolor,d.anchorBgColor)),M=a(f.anchorstartangle,d.anchorStartAngle,90),r=c(f.anchoralpha,d.anchorAlpha),q=c(f.anchorbgalpha,r),t=a(f.anchorradius,d.anchorRadius),w=Boolean(a(f.anchorshadow,d.anchorShadow,0));
        g=e.getPointStub(f,h,m.oriCatTmp[g],
b,d,d.showValues,d.yAxis);
        var v=c(f.anchorimageurl,d.imageUrl),V=c(f.anchorimagescale,d.imageScale),Y=c(f.anchorimagealpha,d.imageAlpha);
        g.y=h;
        g.shadow=E;
        g.anchorShadow=d.anchorShadow;
        g.color={
          FCcolor:{
            color:ba(c(f.color,d.fillColor)),alpha:k}
          }
        ;
        g.valuePosition=c(f.valueposition,d.valuePosition);
        h=e.pointHoverOptions(f,d,{
          plotType:"anchor",anchorBgColor:p,anchorAlpha:r,anchorBgAlpha:q,anchorAngle:M,anchorBorderThickness:l,anchorBorderColor:K,anchorBorderAlpha:r,anchorSides:n,anchorRadius:t,imageUrl:v,
imageScale:V,imageAlpha:Y,shadow:E}
        );
        g.marker={
          enabled:d.drawAnchors,shadow:w&&{
            opacity:r/100}
          ,fillColor:{
            FCcolor:{
              color:ba(c(f.anchorbgcolor,d.anchorBgColor)),alpha:(c(f.anchorbgalpha,d.anchorBgAlpha)*r/100).toString()}
            }
          ,lineColor:{
            FCcolor:{
              color:ba(c(f.anchorbordercolor,d.anchorBorderColor)),alpha:r}
            }
          ,imageUrl:v,imageScale:V,imageAlpha:Y,lineWidth:a(f.anchorborderthickness,d.anchorBorderThickness),radius:t,symbol:Ra(a(f.anchorsides,d.anchorSides)),startAngle:c(f.anchorstartangle,d.anchorAngle)}
        ;
        
g.hoverEffects=h.enabled&&h.options;
        g.rolloverProperties=h.enabled&&h.rolloverOptions;
        g.events={
          click:d.getLink}
        ;
        return g}
      }
    }
  ;
  e.core.options.resizeTrackingInterval=300;
  e.core.options.preventTrackResize=!1;
  e.core.options.SVGDefinitionURL="relative";
  k.createChart=function(b,d,g,m,f,h,E){
    var H=b.jsVars,n,l,K=sa[g||(g=b.chartType())],p,M=H.hasNativeMessage,r=b.options,q=b.args,t;
    t=function(a){
      var c={
        renderer:"javascript"}
      ,f=H.fcObj,h=f.width,n=f.height,l=K&&K.eiMethods,r=H.overlayButton,q;
      d.jsVars=b.jsVars;
      
H.container=d;
      H.hcObj=a;
      H.type=g;
      H.width=d.offsetWidth;
      H.height=d.offsetHeight;
      H.instanceAPI=p;
      if(a.hasRendered){
        e.extend(d,ma);
        if(l&&"string"!==typeof l)for(q in l)d[q]=l[q];
        H.overlayButtonActive&&r&&(r.innerHTML="",r.appendChild(D.createTextNode(H.overlayButtonMessage)),a.container.appendChild(r))}
      (/\%/g.test(h)||/\%/g.test(n))&&d&&d.parentNode&&!e.core.options.preventTrackResize&&Ha(f,d);
      m&&(m({
        success:a.hasRendered,ref:d,id:b.id}
      ),a.hasRendered&&(k.raiseEvent("loaded",{
        type:g,renderer:"javascript"}
      ,
b,[b.id]),M||(f.__state.firstRenderNotified=!0,setTimeout(function(){
        k.raiseEvent("rendered",{
          renderer:"javascript"}
        ,f,[f.id])}
      ,0))));
      a.hasRendered&&H.previousDrawCount<H.drawCount&&(c.width=H.width,c.height=H.height,c.drawCount=H.drawCount,c.displayingMessage=M,c.renderer=f.options.renderer,k.raiseEvent("drawcomplete",c,f,[f.id]),M||E||setTimeout(function(){
        f.__state&&!f.__state.firstRenderNotified&&k.raiseEvent("rendered",{
          renderer:"javascript"}
        ,f,[f.id]);
        e.raiseEvent("renderComplete",c,f)}
      ,0))}
    ;
    
H.instanceAPI&&H.instanceAPI.dispose&&H.instanceAPI.dispose();
    p=K?new sa(g):new sa("stub");
    p.chartInstance=b;
    p.origRenderWidth=b.__state.renderedWidth;
    p.origRenderHeight=b.__state.renderedHeight;
    void 0!==f?"string"===typeof f&&(f=new ja(d,f,b),M=H.hasNativeMessage=!0):!K||!K.init||K&&"stub"===K.name?(b._chartMessageImageStyle={
      imageHAlign:c(q.typeNotSupportedMessageImageHAlign,r.baseChartMessageImageHAlign).toLowerCase(),imageVAlign:c(q.typeNotSupportedMessageImageVAlign,r.baseChartMessageImageVAlign).toLowerCase(),
imageAlpha:a(q.typeNotSupportedMessageImageAlpha,r.baseChartMessageImageAlpha),imageScale:a(q.typeNotSupportedMessageImageScale,r.baseChartMessageImageScale)}
    ,b._chartMessageStyle={
      color:q.typeNotSupportedMessageColor||r.baseChartMessageColor,fontFamily:q.typeNotSupportedMessageFont||r.baseChartMessageFont,fontSize:q.typeNotSupportedMessageFontSize||r.baseChartMessageFontSize}
    ,f=new ja(d,r.typeNotSupportedMessage,b),M=H.hasNativeMessage=!0):H.message?(f=new ja(d,H.message,b),M=H.hasNativeMessage=
!0):H.loadError?(b._chartMessageImageStyle={
      imageHAlign:c(q.dataLoadErrorMessageImageHAlign,r.baseChartMessageImageHAlign).toLowerCase(),imageVAlign:c(q.dataLoadErrorMessageImageVAlign,r.baseChartMessageImageVAlign).toLowerCase(),imageAlpha:a(q.dataLoadErrorMessageImageAlpha,r.baseChartMessageImageAlpha),imageScale:a(q.dataLoadErrorMessageImageScale,r.baseChartMessageImageScale)}
    ,b._chartMessageStyle={
      color:q.dataLoadErrorMessageColor||r.baseChartMessageColor,fontFamily:q.dataLoadErrorMessageFont||
r.baseChartMessageFont,fontSize:q.dataLoadErrorMessageFontSize||r.baseChartMessageFontSize}
    ,f=new ja(d,r.dataLoadErrorMessage,b),M=H.hasNativeMessage=!0):H.stallLoad?(b._chartMessageImageStyle={
      imageHAlign:c(q.dataLoadStartMessageImageHAlign,r.baseChartMessageImageHAlign).toLowerCase(),imageVAlign:c(q.dataLoadStartMessageImageVAlign,r.baseChartMessageImageVAlign).toLowerCase(),imageAlpha:a(q.dataLoadStartMessageImageAlpha,r.baseChartMessageImageAlpha),imageScale:a(q.dataLoadStartMessageImageScale,
r.baseChartMessageImageScale)}
    ,b._chartMessageStyle={
      fontFamily:q.dataLoadStartMessageFont||r.baseChartMessageFont,fontSize:q.dataLoadStartMessageFontSize||r.baseChartMessageFontSize,color:q.dataLoadStartMessageColor||r.baseChartMessageColor}
    ,f=new ja(d,r.dataLoadStartMessage,b),M=H.hasNativeMessage=!0):(e.raiseEvent("internal.drawStart",{
      chartType:g,logicName:p.name,logicBase:p.base&&p.base.name,defaultSeriesType:p.defaultSeriesType}
    ,b),n=b.jsVars&&b.jsVars.themeObject&&b.jsVars.themeObject.getThemedJSONData()||
b.getChartData(e.dataFormats.JSON,!0),l=n.data,n.error instanceof Error?(b._chartMessageImageStyle={
      imageHAlign:c(q.dataInvalidMessageImageHAlign,r.baseChartMessageImageHAlign).toLowerCase(),imageVAlign:c(q.dataInvalidMessageImageVAlign,r.baseChartMessageImageVAlign).toLowerCase(),imageAlpha:a(q.dataInvalidMessageImageAlpha,r.baseChartMessageImageAlpha),imageScale:a(q.dataInvalidMessageImageScale,r.baseChartMessageImageScale)}
    ,b._chartMessageStyle={
      fontFamily:q.dataInvalidMessageFont||r.baseChartMessageFont,
fontSize:q.dataInvalidMessageFontSize||r.baseChartMessageFontSize,color:q.dataInvalidMessageColor||r.baseChartMessageColor}
    ,f=new ja(d,r.dataInvalidMessage,b),M=H.hasNativeMessage=!0,b.__state.dataReady=!1,E||e.raiseEvent("dataInvalid",{
      error:n.error}
    ,H.fcObj,void 0,function(){
      k.raiseEvent("dataxmlinvalid",{
        }
      ,b,[b.id])}
    )):(E||k.raiseEvent("dataloaded",{
      }
    ,b,[b.id]),f=p.init(d,l,b,t),p.inited=!0,H.previousDrawCount=H.drawCount,H.drawCount+=1,0===f.series.length?(b._chartMessageImageStyle={
      imageHAlign:c(q.dataEmptyMessageImageHAlign,
r.baseChartMessageImageHAlign).toLowerCase(),imageVAlign:c(q.dataEmptyMessageImageVAlign,r.baseChartMessageImageVAlign).toLowerCase(),imageAlpha:a(q.dataEmptyMessageImageAlpha,r.baseChartMessageImageAlpha),imageScale:a(q.dataEmptyMessageImageScale,r.baseChartMessageImageScale)}
    ,b._chartMessageStyle={
      fontFamily:q.dataEmptyMessageFont||r.baseChartMessageFont,fontSize:q.dataEmptyMessageFontSize||r.baseChartMessageFontSize,color:q.dataEmptyMessageColor||r.baseChartMessageColor}
    ,f=new ja(d,r.dataEmptyMessage,
b),M=H.hasNativeMessage=!0,b.__state.dataReady=!1,E||k.raiseEvent("nodatatodisplay",{
      }
    ,b,[b.id])):(b.__state.dataReady=!0,M=H.hasNativeMessage=!1,delete H.message)));
    f||(b._chartMessageImageStyle={
      imageHAlign:r.baseChartMessageImageHAlign,imageVAlign:r.baseChartMessageImageVAlign,imageAlpha:r.baseChartMessageImageAlpha,imageScale:r.baseChartMessageImageScale}
    ,b._chartMessageStyle={
      fontFamily:r.baseChartMessageFont,fontSize:r.baseChartMessageFontSize,color:r.baseChartMessageColor}
    ,f=new ja(d,"Error rendering chart {
      0x01}
    ",
b),M=H.hasNativeMessage=!0);
    M&&!p.inited&&p.init(d,l,b,t);
    f.chart=f.chart||{
      }
    ;
    f.credits=f.credits||{
      }
    ;
    f.credits.enabled=K&&!0===K.creditLabel?!0:!1;
    !1===h&&(f.chart.animation=!1,f.plotOptions||(f.plotOptions={
      }
    ),f.plotOptions.series||(f.plotOptions.series={
      }
    ),f.plotOptions.series.animation=!1);
    d.style&&(f.chart.containerBackgroundColor=k.getContainerBackgroundColor(b));
    return p.draw(f,t)}
  ;
  sa("base",{
    useScaleRecursively:!0,tooltipConstraint:"chart",rendererId:"root",canvasPaddingModifiers:["anchor",
"anchorlabel"],drawAnnotations:!0,draw:function(a,b){
      var c=this.renderer;
      c||(c=this.renderer=new sa("renderer."+this.rendererId));
      this.updateDefaultAnnotations();
      return c.init(this,a,b)}
    ,init:function(g,m,A){
      var h=this.chartInstance||A,f=h.jsVars;
      A=f._reflowData||(f._reflowData={
        }
      );
      var E=f._reflowClean,n=h.options,H=n.args,l,K;
      /^\s*absolute\s*$/i.test(e.core.options.SVGDefinitionURL)&&(u._url=(u._g&&u._g.win||q).location.href.replace(/#.*?$/,b));
      this.dataObj=m=d({
        }
      ,m);
      K=m.chart=m.chart||m.graph||
m.map||{
        }
      ;
      delete m.graph;
      delete m.map;
      A&&!this.stateless&&(l=A.hcJSON,delete A.hcJSON,d(this,A,!0),this.preReflowAdjustments&&this.preReflowAdjustments.call(this),A.hcJSON=l);
      this.containerElement=g;
      this.config={
        }
      ;
      this.smartLabel=f.smartLabel;
      this.smartLabel.useEllipsesOnOverflow(a(K.useellipseswhenoverflow,K.useellipsewhenoverflow,1));
      this.colorManager=new k.colorManager(m,this);
      this.linkClickFN=Y(m,h);
      this.numberFormatter=new V(m.chart,this);
      if(!this.standaloneInit)return h._chartMessageImageStyle=
{
        imageHAlign:c(H.typeNotSupportedMessageImageHAlign,n.baseChartMessageImageHAlign).toLowerCase(),imageVAlign:c(H.typeNotSupportedMessageImageVAlign,n.baseChartMessageImageVAlign).toLowerCase(),imageAlpha:a(H.typeNotSupportedMessageImageAlpha,n.baseChartMessageImageAlpha),imageScale:a(H.typeNotSupportedMessageImageScale,n.baseChartMessageImageScale)}
      ,h._chartMessageStyle={
        fontFamily:H.typeNotSupportedMessageFont||n.baseChartMessageFont,fontSize:H.typeNotSupportedMessageFontSize||n.baseChartMessageFontSize,
color:H.typeNotSupportedMessageColor||n.baseChartMessageColor}
      ,new k.createDialog(g,n.typeNotSupportedMessage,h);
      g=this.chart(g.offsetWidth||parseFloat(g.style.width),g.offsetHeight||parseFloat(g.style.height),h);
      A&&!this.stateless&&(A.hcJSON&&d(g,A.hcJSON,!0),this.postReflowAdjustments&&this.postReflowAdjustments.call(this),E&&this.cleanedData&&(this.cleanedData(this,E),this.cleanedData(A,E)));
      return g}
    ,postSpaceManager:function(){
      var b=this.hcJSON,c=b._FCconf,d=b.chart,e=d.marginLeft,f=d.spacingLeft,
g=d.spacingRight,m=c.width-e-d.marginRight,h=b.title,b=b.subtitle,k=c.width,E=h.align,c=h.x,n=h.horizontalPadding,l=h.alignWithCanvas,K=(G(e)||0)+a(m,k)/2,e=this.snapLiterals||(this.snapLiterals={
        }
      ),m=h._captionWidth,p=b._subCaptionWidth,r=h._lineHeight,M=b._lineHeight,q=h.text;
      if(void 0===c){
        switch(E){
          case ha:c=l?k-d.marginRight-n:k-n;
          break;
          case Sa:c=l?d.marginLeft+n:n;
          break;
          default:c=l?K:f+.5*(k-f-g)||k/2}
        h.align===Sa?(g=f=0,h.align="start"):h.align===ha?(f=m,g=p,h.align="end"):(f=m/2,g=p/2,h.align=
"middle");
        h.x=c;
        h.y=h.y||d.spacingTop||0;
        b.y=q?h.y+r+2:h.y||d.spacingTop||0;
        e.captionstartx=c-f-2;
        e.captionwidth=m+4;
        e.captionendx=e.captionstartx+e.captionwidth;
        e.captionstarty=h.y||0;
        e.captionheight=r+2;
        e.captionendy=e.captionstarty+e.captionheight;
        e.subcaptionstartx=c-g-2;
        e.subcaptionwidth=p+4;
        e.subcaptionendx=e.subcaptionstartx+e.subcaptionwidth;
        e.subcaptionstarty=b.y||0;
        e.subcaptionheight=M+2;
        e.subcaptionendy=e.subcaptionstarty+e.subcaptionheight}
      }
    ,chart:function(s,m){
      var A=this.name,k=this.dataObj,
f=k.chart,n=this.colorManager,l,H,K,w,v,V,Y,I=this.defaultSeriesType,u,da,G,na,D,L,ca,ja,C,J,N,P,ra,Ha,ma,Ka,ta,Wa,ia,R,rb,wb,Fa,Jb,Q,S,U,Tb,Aa,Ua,ub,$,Eb,Fb,Ob,vb,sa,Mb,ka,fa,ga,la,xa,ya,Ca,Ra,La,Ta,Hb,Ab,sb,hb,kb,qb,Ba,Vb,qc,ab,gb,ic,rc,tc,yc,Kb,lb,zc,Dc,Qa,Bc,hd,ec,id,uc,jd,Yc,Zb,ua,Yb,fc,Pa,Lb,ob,Bb,Cb,$b,kd,tb,gc,jc,rd,fb,kc,zb,Za,Nb,Rc,Zc,ld,lc,Db,Pb,Wb;
      l=Ma(k,s,m,this);
      C=l.chart;
      ja=l.xAxis;
      u=l[g];
      this.snapLiterals||(this.snapLiterals={
        }
      );
      N=this.snapLiterals;
      N.chartstartx=0;
      N.chartstarty=0;
      
N.chartwidth=s;
      N.chartheight=m;
      N.chartendx=s;
      N.chartendy=m;
      N.chartcenterx=s/2;
      N.chartcentery=m/2;
      N.chartbottommargin=C.spacingBottom;
      N.chartleftmargin=C.spacingLeft;
      N.chartrightmargin=C.spacingRight;
      N.charttopmargin=C.spacingTop;
      this.updateSnapPoints&&this.updateSnapPoints();
      this.postHCJSONCreation&&this.postHCJSONCreation.call(this,l);
      e.raiseEvent("internal.postlogic",this,this.chartInstance);
      l.labels.smartLabel=V=u.smartLabel=this.smartLabel;
      u.width=s;
      u.height=m;
      G=l.plotOptions;
      u.isDual=this.isDual;
      
u.numberFormatter=this.numberFormatter;
      u.axisGridManager=new E(I,f);
      u.tooltext=f.plottooltext;
      u.trendLineToolText=f.trendlinetooltext;
      C.is3D=H=u.is3d=/3d$/.test(I);
      C.isBar=da=u.isBar=this.isBar;
      Y=/^pie/.test(I);
      ca=1==f.useroundedges;
      L=H?mb.chart3D:mb.chart2D;
      C.events.click=l.plotOptions.series.point.events.click=this.linkClickFN;
      C.defaultSeriesType=I;
      Ka=0<f.palette&&6>f.palette?f.palette:a(this.paletteIndex,1);
      --Ka;
      C.paletteIndex=Ka;
      C.usePerPointLabelColor=f.colorlabelsfromplot==db;
      C.syncLabelWithAnchor=
a(f.synclabelwithanchoronhover,1);
      C.useRoundEdges=ca&&!H&&!this.distributedColumns&&"pie"!==this.defaultSeriesType;
      void 0!==c(f.clickurl)&&(C.link=f.clickurl,C.style.cursor="pointer",l.plotOptions.series.point.events.click=function(){
        C.events.click.call({
          link:f.clickurl}
        )}
      );
      ta=c(f.basefont,"Verdana,sans");
      Wa=B(f.basefontsize,10);
      ia=c(f.basefontcolor,n.getColor(L.baseFontColor));
      R=c(f.outcnvbasefont,ta);
      rb=B(f.outcnvbasefontsize,Wa);
      wb=rb+Ga;
      Fa=c(f.outcnvbasefontcolor,ia).replace(/^#?([a-f0-9]+)/ig,
"#$1");
      S=Wa;
      Wa+=Ga;
      ia=ia.replace(/^#?([a-f0-9]+)/ig,"#$1");
      u.trendStyle=u.outCanvasStyle={
        fontFamily:R,color:Fa,fontSize:wb}
      ;
      Jb=r(u.trendStyle);
      u.inCanvasStyle={
        fontFamily:ta,fontSize:Wa,color:ia}
      ;
      Q=r(u.inCanvasStyle);
      u.divlineStyle={
        fontFamily:ta,fontSize:Wa,color:ia,lineHeight:Q}
      ;
      ja.labels.style={
        fontFamily:c(f.labelfont,R),fontSize:a(f.labelfontsize,rb)+Ga,color:c(f.labelfontcolor,Fa)}
      ;
      ja.labels.style.lineHeight=r(ja.labels.style);
      ja.steppedLabels.style={
        fontFamily:R,fontSize:wb,lineHeight:Jb,
color:Fa,visibility:"hidden"}
      ;
      l.yAxis[0].labels.style={
        fontFamily:R,fontSize:wb,lineHeight:Jb,color:Fa}
      ;
      l.yAxis[1].labels.style={
        fontFamily:R,fontSize:wb,lineHeight:Jb,color:Fa}
      ;
      Tb=c(f.legenditemfont,R);
      Aa=B(f.legenditemfontsize,rb);
      Ua=c(f.legenditemfontcolor,Fa).replace(/^#?([a-f0-9]+)/ig,"#$1");
      ub=Va[a(f.legenditemfontbold,0)]||"";
      U=B(f.legendcaptionfontsize,rb)+Ga;
      Aa+=Ga;
      l.legend.itemStyle={
        fontFamily:Tb,fontSize:Aa,color:Ua,fontWeight:ub}
      ;
      r(l.legend.itemStyle);
      l.legend.itemHiddenStyle={
        fontFamily:Tb,
fontSize:Aa,color:c(f.legenditemhiddencolor,"cccccc").replace(/^#?([a-f0-9]+)/ig,"#$1"),fontWeight:ub}
      ;
      r(l.legend.itemHiddenStyle);
      l.legend.itemHoverStyle={
        color:c(f.legenditemhoverfontcolor,Ua).replace(/^#?([a-f0-9]+)/ig,"#$1")}
      ;
      l.legend.title.style={
        fontFamily:c(f.legendcaptionfont,Tb),fontSize:U,color:c(f.legendcaptionfontcolor,Fa).replace(/^#?([a-f0-9]+)/ig,"#$1"),fontWeight:Va[a(f.legendcaptionfontbold,1)]||""}
      ;
      r(l.legend.title.style);
      l.legend.title.align=Ub[f.legendcaptionalignment&&f.legendcaptionalignment.toLowerCase()||
va]||Ub.center;
      J=(J=t(f.valuebordercolor,b))?T(J,a(f.valueborderalpha,f.valuealpha,100)):b;
      l.plotOptions.series.dataLabels.style={
        fontFamily:c(f.valuefont,ta),fontSize:c(f.valuefontsize,parseInt(Wa,10))+Ga,lineHeight:Q,color:T(c(f.valuefontcolor,ia),a(f.valuefontalpha,f.valuealpha,100)),fontWeight:a(f.valuefontbold)?"bold":"normal",fontStyle:a(f.valuefontitalic)?"italic":"normal",border:J||f.valuebgcolor?a(f.valueborderthickness,1)+"px solid":"",borderColor:J,borderThickness:a(f.valueborderthickness,
1),borderPadding:a(f.valueborderpadding,2),borderRadius:a(f.valueborderradius,0),backgroundColor:f.valuebgcolor?T(f.valuebgcolor,a(f.valuebgalpha,f.valuealpha,100)):b,borderDash:a(f.valueborderdashed,0)?h(a(f.valueborderdashlen,4),a(f.valueborderdashgap,2),a(f.valueborderthickness,1)):void 0}
      ;
      r(l.plotOptions.series.dataLabels.style);
      l.plotOptions.series.dataLabels.color=l.plotOptions.series.dataLabels.style.color;
      l.tooltip.style={
        fontFamily:ta,fontSize:Wa,lineHeight:Q,color:ia}
      ;
      l.title.style={
        fontFamily:c(f.captionfont,
R),color:c(f.captionfontcolor,Fa).replace(/^#?([a-f0-9]+)/ig,"#$1"),fontSize:a(f.captionfontsize,rb+3)+Ga,fontWeight:0===a(f.captionfontbold)?"normal":"bold"}
      ;
      l.title.align=c(f.captionalignment,va);
      l.title.isOnTop=a(f.captionontop,1);
      l.title.alignWithCanvas=a(f.aligncaptionwithcanvas,this.alignCaptionWithCanvas,1);
      l.title.horizontalPadding=a(f.captionhorizontalpadding,l.title.alignWithCanvas?0:15);
      r(l.title.style);
      l.subtitle.style={
        fontFamily:c(f.subcaptionfont,f.captionfont,R),color:c(f.subcaptionfontcolor,
f.captionfontcolor,Fa).replace(/^#?([a-f0-9]+)/ig,"#$1"),fontSize:a(f.subcaptionfontsize,a(W(a(f.captionfontsize)-3,-1),rb)+a(this.subTitleFontSizeExtender,1))+Ga,fontWeight:0===a(f.subcaptionfontbold,this.subTitleFontWeight,f.captionfontbold)?"normal":"bold"}
      ;
      l.subtitle.align=l.title.align;
      l.subtitle.isOnTop=l.title.isOnTop;
      l.subtitle.alignWithCanvas=l.title.alignWithCanvas;
      l.subtitle.horizontalPadding=l.title.horizontalPadding;
      r(l.subtitle.style);
      J=(J=t(f.xaxisnamebordercolor,b))?T(J,a(f.xaxisnameborderalpha,
f.xaxisnamealpha,100)):b;
      ja.title.style={
        fontFamily:c(f.xaxisnamefont,R),fontSize:c(f.xaxisnamefontsize,parseInt(wb,10))+Ga,color:T(c(f.xaxisnamefontcolor,Fa),a(f.xaxisnamefontalpha,f.xaxisnamealpha,100)),fontWeight:a(f.xaxisnamefontbold,1)?"bold":"normal",fontStyle:a(f.xaxisnamefontitalic)?"italic":"normal",border:J||f.xaxisnamebgcolor?a(f.xaxisnameborderthickness,1)+"px solid":void 0,borderColor:J,borderThickness:a(f.xaxisnameborderthickness,1),borderPadding:a(f.xaxisnameborderpadding,2),borderRadius:a(f.xaxisnameborderradius,
0),backgroundColor:f.xaxisnamebgcolor?T(f.xaxisnamebgcolor,a(f.xaxisnamebgalpha,f.xaxisnamealpha,100)):b,borderDash:a(f.xaxisnameborderdashed,0)?h(a(f.xaxisnameborderdashlen,4),a(f.xaxisnameborderdashgap,2),a(f.xaxisnameborderthickness,1)):void 0}
      ;
      r(ja.title.style);
      J=(J=c(f.pyaxisnamebordercolor,f.yaxisnamebordercolor,b))?T(J,a(f.pyaxisnameborderalpha,f.yaxisnameborderalpha,f.pyaxisnamealpha,f.yaxisnamealpha,100)):b;
      l.yAxis[0].title.style={
        fontFamily:c(f.pyaxisnamefont,f.yaxisnamefont,R),fontSize:c(f.pyaxisnamefontsize,
f.yaxisnamefontsize,parseInt(wb,10))+Ga,color:T(c(f.pyaxisnamefontcolor,f.yaxisnamefontcolor,Fa),a(f.pyaxisnamefontalpha,f.yaxisnamefontalpha,f.pyaxisnamealpha,f.yaxisnamealpha,100)),fontWeight:a(f.pyaxisnamefontbold,f.yaxisnamefontbold,1)?"bold":"normal",fontStyle:a(f.pyaxisnamefontitalic,f.yaxisnamefontitalic)?"italic":"normal",border:J||f.pyaxisnamebgcolor||f.yaxisnamebgcolor?a(f.pyaxisnameborderthickness,f.yaxisnameborderthickness,1)+"px solid":void 0,borderColor:J,borderThickness:a(f.pyaxisnameborderthickness,
f.yaxisnameborderthickness,1),borderPadding:a(f.pyaxisnameborderpadding,f.yaxisnameborderpadding,2),borderRadius:a(f.pyaxisnameborderradius,f.yaxisnameborderradius,0),backgroundColor:f.pyaxisnamebgcolor||f.yaxisnamebgcolor?T(c(f.pyaxisnamebgcolor,f.yaxisnamebgcolor),a(f.pyaxisnamebgalpha,f.yaxisnamebgalpha,f.pyaxisnamealpha,f.yaxisnamealpha,100)):b,borderDash:a(f.pyaxisnameborderdashed,f.yaxisnameborderdashed,0)?h(a(f.pyaxisnameborderdashlen,f.yaxisnameborderdashlen,4),a(f.pyaxisnameborderdashgap,
f.yaxisnameborderdashgap,2),a(f.pyaxisnameborderthickness,f.yaxisnameborderthickness,1)):void 0}
      ;
      r(l.yAxis[0].title.style);
      l.yAxis[1].title.style={
        fontFamily:R,color:Fa,fontSize:wb,lineHeight:void 0,fontWeight:"bold"}
      ;
      J=(J=c(f.syaxisnamebordercolor,f.yaxisnamebordercolor,b))?T(J,a(f.syaxisnameborderalpha,f.yaxisnameborderalpha,f.syaxisnamealpha,f.yaxisnamealpha,100)):b;
      l.yAxis[1].title.style={
        fontFamily:c(f.syaxisnamefont,f.yaxisnamefont,R),fontSize:c(f.syaxisnamefontsize,f.yaxisnamefontsize,parseInt(wb,
10))+Ga,color:T(c(f.syaxisnamefontcolor,f.yaxisnamefontcolor,Fa),a(f.syaxisnamefontalpha,f.yaxisnamefontalpha,f.syaxisnamealpha,f.yaxisnamealpha,100)),fontWeight:a(f.syaxisnamefontbold,f.yaxisnamefontbold,1)?"bold":"normal",fontStyle:a(f.syaxisnamefontitalic,f.yaxisnamefontitalic)?"italic":"normal",border:J||f.syaxisnamebgcolor||f.yaxisnamebgcolor?a(f.syaxisnameborderthickness,f.yaxisnameborderthickness,1)+"px solid":void 0,borderColor:J,borderThickness:a(f.syaxisnameborderthickness,f.yaxisnameborderthickness,
1),borderPadding:a(f.syaxisnameborderpadding,f.yaxisnameborderpadding,2),borderRadius:a(f.syaxisnameborderradius,f.yaxisnameborderradius,0),backgroundColor:f.syaxisnamebgcolor||f.yaxisnamebgcolor?T(c(f.syaxisnamebgcolor,f.yaxisnamebgcolor),a(f.syaxisnamebgalpha,f.yaxisnamebgalpha,f.syaxisnamealpha,f.yaxisnamealpha,100)):b,borderDash:a(f.syaxisnameborderdashed,f.yaxisnameborderdashed,0)?h(a(f.syaxisnameborderdashlen,f.yaxisnameborderdashlen,4),a(f.syaxisnameborderdashgap,f.yaxisnameborderdashgap,2),
a(f.syaxisnameborderthickness,f.yaxisnameborderthickness,1)):void 0}
      ;
      r(l.yAxis[1].title.style);
      C.overlapColumns=a(f[da&&"overlapbars"||"overlapcolumns"],H?0:1);
      l.orphanStyles={
        defaultStyle:{
          style:d({
            }
          ,u.inCanvasStyle)}
        ,connectorlabels:{
          style:d({
            }
          ,l.plotOptions.series.dataLabels)}
        ,vyaxisname:{
          style:d({
            }
          ,l.yAxis[0].title.style)}
        }
      ;
      l.plotOptions.series.dataLabels.tlLabelStyle={
        fontFamily:p(f.tlfont,ta),color:ba(p(f.tlfontcolor,ia)),fontSize:B(f.tlfontsize,S)+"px"}
      ;
      r(l.plotOptions.series.dataLabels.tlLabelStyle);
      
l.plotOptions.series.dataLabels.trLabelStyle={
        fontFamily:p(f.trfont,ta),color:ba(p(f.trfontcolor,ia)),fontSize:B(f.trfontsize,S)+"px"}
      ;
      r(l.plotOptions.series.dataLabels.trLabelStyle);
      l.plotOptions.series.dataLabels.blLabelStyle={
        fontFamily:p(f.blfont,ta),color:ba(p(f.blfontcolor,ia)),fontSize:B(f.blfontsize,S)+"px"}
      ;
      r(l.plotOptions.series.dataLabels.blLabelStyle);
      l.plotOptions.series.dataLabels.brLabelStyle={
        fontFamily:p(f.brfont,ta),color:ba(p(f.brfontcolor,ia)),fontSize:B(f.brfontsize,S)+"px"}
      ;
      
r(l.plotOptions.series.dataLabels.brLabelStyle);
      this.parseStyles(l);
      delete l.xAxis.labels.style.backgroundColor;
      delete l.xAxis.labels.style.borderColor;
      delete l.yAxis[0].labels.style.backgroundColor;
      delete l.yAxis[0].labels.style.borderColor;
      delete l.yAxis[1].labels.style.backgroundColor;
      delete l.yAxis[1].labels.style.borderColor;
      u.showTooltip=a(f.showtooltip,this.showtooltip,1);
      u.tooltipSepChar=c(f.tooltipsepchar,this.tooltipsepchar,Xb);
      u.showValues=a(f.showvalues,this.showValues,1);
      u.seriesNameInToolTip=
a(f.seriesnameintooltip,1);
      u.showVLines=a(f.showvlines,1);
      u.showVLinesOnTop=a(f.showvlinesontop,0);
      u.showVLineLabels=a(f.showvlinelabels,this.showVLineLabels,1);
      u.showVLineLabelBorder=a(f.showvlinelabelborder,1);
      u.rotateVLineLabels=a(f.rotatevlinelabels,0);
      u.vLineColor=c(f.vlinecolor,"333333");
      u.vLineLabelColor=c(f.vlinelabelcolor);
      u.vLineThickness=c(f.vlinethickness,1);
      u.vLineAlpha=a(f.vlinealpha,80);
      u.vLineLabelBgColor=c(f.vlinelabelbgcolor,"ffffff");
      u.vLineLabelBgAlpha=a(f.vlinelabelbgalpha,H?
50:100);
      u.trendlineColor=c(f.trendlinecolor,"333333");
      u.trendlineThickness=c(f.trendlinethickness,1);
      u.trendlineAlpha=a(f.trendlinealpha);
      u.showTrendlinesOnTop=c(f.showtrendlinesontop,0);
      u.trendlineValuesOnOpp=c(f.trendlinevaluesonopp,f.trendlinevaluesonright,0);
      u.trendlinesAreDashed=a(f.trendlinesaredashed,0);
      u.trendlinesDashLen=a(f.trendlinedashlen,5);
      u.trendlinesDashGap=a(f.trendlinedashgap,2);
      u.showTrendlines=a(f.showtrendlines,1);
      u.showTrendlineLabels=a(f.showtrendlinelabels,this.showTrendlineLabels,
1);
      u.flatScrollBars=a(f.flatscrollbars,0);
      u.scrollBar3DLighting=a(f.scrollbar3dlighting,1);
      C.anchorTrackingRadius=a(f.anchortrackingradius,Xa?oa:ea);
      l.plotOptions.series.connectNullData=a(f.connectnulldata,0);
      C.backgroundColor={
        FCcolor:{
          color:c(f.bgcolor,n.getColor(L.bgColor)),alpha:c(f.bgalpha,n.getColor(L.bgAlpha)),angle:c(f.bgangle,n.getColor(L.bgAngle)),ratio:c(f.bgratio,n.getColor(L.bgRatio))}
        }
      ;
      C.rotateValues=a(f.rotatevalues,0);
      C.placeValuesInside=a(f.placevaluesinside,0);
      C.valuePosition=c(f.valueposition,
"auto");
      C.valuePadding=a(f.valuepadding,2);
      C.managePlotOverflow=a(f.manageplotoverflow,1);
      C.borderColor=T(c(f.bordercolor,H?"#666666":n.getColor("borderColor")),c(f.borderalpha,H?"100":n.getColor("borderAlpha")));
      na=a(f.showborder,H?0:1);
      C.borderWidth=na?a(f.borderthickness,1):0;
      C.borderRadius=a(f.borderradius,0);
      C.borderDashStyle=a(f.borderdashed,0)?h(a(f.borderdashlen,4),a(f.borderdashgap,2),C.borderWidth):void 0;
      C.plotBorderColor=T(c(f.canvasbordercolor,n.getColor("canvasBorderColor")),c(f.canvasborderalpha,
n.getColor("canvasBorderAlpha")));
      "0"!==f.showcanvasborder&&(D=Boolean(c(f.canvasborderthickness,ca?0:1)),"1"!==f.showaxislines&&"1"!==f.showxaxisline&&"1"!==f.showyaxisline&&"1"!==f.showsyaxisline||"1"===f.showcanvasborder||(D=0));
      C.plotBorderWidth=H||!D?0:a(f.canvasborderthickness,this.canvasborderthickness,C.useRoundEdges?1:2);
      C.bgSWF=c(f.bgimage,f.bgswf);
      C.bgSWFAlpha=a(f.bgimagealpha,f.bgswfalpha,100);
      $=c(f.bgimagedisplaymode,"none").toLowerCase();
      Eb=p(f.bgimagevalign,b).toLowerCase();
      Fb=p(f.bgimagehalign,
b).toLowerCase();
      "tile"==$||"fill"==$||"fit"==$?(Eb!=qa&&"middle"!=Eb&&Eb!=Na&&(Eb="middle"),Fb!=Sa&&"middle"!=Fb&&Fb!=ha&&(Fb="middle")):(Eb!=qa&&"middle"!=Eb&&Eb!=Na&&(Eb=qa),Fb!=Sa&&"middle"!=Fb&&Fb!=ha&&(Fb=Sa));
      C.bgImageDisplayMode=$;
      C.bgImageVAlign=Eb;
      C.bgImageHAlign=Fb;
      C.bgImageScale=a(f.bgimagescale,100);
      C.logoURL=p(f.logourl);
      C.logoPosition=c(f.logoposition,"tl").toLowerCase();
      C.logoAlpha=a(f.logoalpha,100);
      C.logoLink=p(f.logolink);
      C.logoScale=a(f.logoscale,100);
      C.logoLeftMargin=a(f.logoleftmargin,
0);
      C.logoTopMargin=a(f.logotopmargin,0);
      Ob=C.toolbar={
        button:{
          }
        }
      ;
      vb=Ob.button;
      vb.scale=a(f.toolbarbuttonscale,1.15);
      vb.width=a(f.toolbarbuttonwidth,15);
      vb.height=a(f.toolbarbuttonheight,15);
      vb.radius=a(f.toolbarbuttonradius,2);
      vb.spacing=a(f.toolbarbuttonspacing,5);
      vb.fill=T(c(f.toolbarbuttoncolor,"ffffff"));
      vb.labelFill=T(c(f.toolbarlabelcolor,"cccccc"));
      vb.symbolFill=T(c(f.toolbarsymbolcolor,"ffffff"));
      vb.hoverFill=T(c(f.toolbarbuttonhovercolor,"ffffff"));
      vb.stroke=T(c(f.toolbarbuttonbordercolor,
"bbbbbb"));
      vb.symbolStroke=T(c(f.toolbarsymbolbordercolor,"9a9a9a"));
      vb.strokeWidth=a(f.toolbarbuttonborderthickness,1);
      vb.symbolStrokeWidth=a(f.toolbarsymbolborderthickness,1);
      sa=vb.symbolPadding=a(f.toolbarsymbolpadding,5);
      vb.symbolHPadding=a(f.toolbarsymbolhpadding,sa);
      vb.symbolVPadding=a(f.toolbarsymbolvpadding,sa);
      Mb=Ob.position=c(f.toolbarposition,"tr").toLowerCase();
      switch(Mb){
        case "tr":case "rt":case "top right":case "right top":Mb="tr";
        break;
        case "br":case "rb":case "bottom right":case "right bottom":Mb=
"br";
        break;
        case "tl":case "lt":case "top left":case "left top":Mb="tl";
        break;
        case "bl":case "lb":case "bottom left":case "left bottom":Mb="bl";
        break;
        default:Mb="tr"}
      ka=Ob.hAlign="left"===(b+f.toolbarhalign).toLowerCase()?"l":Mb.charAt(1);
      fa=Ob.vAlign="bottom"===(b+f.toolbarvalign).toLowerCase()?"b":Mb.charAt(0);
      Ob.hDirection=a(f.toolbarhdirection,"r"===ka?-1:1);
      Ob.vDirection=a(f.toolbarvdirection,"b"===fa?-1:1);
      Ob.vMargin=a(f.toolbarvmargin,6);
      Ob.hMargin=a(f.toolbarhmargin,10);
      Ob.x=a(f.toolbarx,"l"===
ka?0:s);
      Ob.y=a(f.toolbary,"t"===fa?0:m);
      ga=c(f.divlinecolor,n.getColor(L.divLineColor));
      la=c(f.divlinealpha,H?n.getColor("divLineAlpha3D"):n.getColor("divLineAlpha"));
      xa=a(f.divlinethickness,1);
      ya=Boolean(a(f.divlinedashed,f.divlineisdashed,this.divLineIsDashed,0));
      Ca=a(f.divlinedashlen,4);
      Ra=a(f.divlinedashgap,2);
      l.yAxis[0].gridLineColor=T(ga,la);
      l.yAxis[0].gridLineWidth=xa;
      l.yAxis[0].gridLineDashStyle=ya?h(Ca,Ra,xa):"none";
      l.yAxis[0].alternateGridColor=da?T(c(f.alternatevgridcolor,n.getColor("altVGridColor")),
1===a(f.showalternatevgridcolor,1)?c(f.alternatevgridalpha,n.getColor("altVGridAlpha")):Ea):T(c(f.alternatehgridcolor,n.getColor("altHGridColor")),"0"===f.showalternatehgridcolor?0:c(f.alternatehgridalpha,n.getColor("altHGridAlpha")));
      ic=a(f.vdivlinethickness,1);
      rc=Boolean(a(f.vdivlinedashed,f.vdivlineisdashed,0));
      tc=a(f.vdivlinedashlen,4);
      yc=a(f.vdivlinedashgap,2);
      ja.gridLineColor=T(c(f.vdivlinecolor,n.getColor(L.divLineColor)),c(f.vdivlinealpha,n.getColor("divLineAlpha")));
      ja.gridLineWidth=ic;
      ja.gridLineDashStyle=
rc?h(tc,yc,ic):"none";
      ja.alternateGridColor=T(c(f.alternatevgridcolor,n.getColor("altVGridColor")),"1"===f.showalternatehgridcolor?c(f.alternatevgridalpha,n.getColor("altVGridAlpha")):0);
      Ta=c(f.canvasbgcolor,n.getColor(L.canvasBgColor));
      Ab=c(f.canvasbgalpha,n.getColor("canvasBgAlpha"));
      c(f.showcanvasbg,db)==Ea&&(Ab="0");
      l.plotOptions.series.shadow=a(f.showshadow,f.showcolumnshadow,this.defaultPlotShadow,n.getColor("showShadow"));
      this.inversed&&(l.yAxis[0].reversed=!0,l.yAxis[1].reversed=!0);
      this.isStacked&&
(this.distributedColumns?(u.showStackTotal=Boolean(a(f.showsum,1)),v=a(f.usepercentdistribution,1),La=a(f.showpercentvalues,0),Hb=a(f.showpercentintooltip,v,0),u.showXAxisPercentValues=a(f.showxaxispercentvalues,1)):(u.showStackTotal=Boolean(a(this.showSum,f.showsum,0)),v=a(this.stack100percent,f.stack100percent,0),La=a(f.showpercentvalues,v,0),Hb=a(f.showpercentintooltip,La)),u.showPercentValues=La,u.showPercentInToolTip=Hb,v?(u.isValueAbs=!0,G[I].stacking="percent",u[0].stacking100Percent=!0):G[I].stacking=
"normal");
      this.isDual&&("0"===f.primaryaxisonleft&&(l.yAxis[0].opposite=!0,l.yAxis[1].opposite=!1),l.yAxis[0].showAlways=!0,l.yAxis[1].showAlways=!0);
      C.useRoundEdges&&(l.plotOptions.series.shadow=a(f.showshadow,f.showcolumnshadow,1),l.plotOptions.series.borderRadius=1,l.tooltip.style.borderRadius="2px",C.plotBorderRadius=3,D||(C.plotBorderWidth=0),C.plotShadow=l.plotOptions.series.shadow?{
        enabled:!0,opacity:Ab/100}
      :0);
      1===a(f.use3dlighting,1)&&(l.legend.lighting3d=!0);
      l.plotOptions.series.userMaxColWidth=
da?f.maxbarheight:a(f.maxcolwidth,this.maxColWidth);
      l.plotOptions.series.maxColWidth=pa(a(l.plotOptions.series.userMaxColWidth,50))||1;
      l.title.text=F(f.caption);
      l.subtitle.text=F(f.subcaption);
      0===a(f.showtooltip,this.showtooltip)&&(l.tooltip.enabled=!1);
      sb=l.tooltip.style;
      sb.backgroundColor=T(c(sb.backgroundColor,f.tooltipbgcolor,n.getColor("toolTipBgColor")),c(f.tooltipbgalpha,100));
      sb.borderColor=T(c(sb.borderColor,f.tooltipbordercolor,n.getColor("toolTipBorderColor")),c(f.tooltipborderalpha,100));
      
l.tooltip.shadow=a(f.showtooltipshadow,f.showshadow,1)?{
        enabled:!0,opacity:W(a(f.tooltipbgalpha,100),a(f.tooltipborderalpha,100))/100}
      :!1;
      l.tooltip.constrain=a(f.constraintooltip,1);
      sb.borderWidth=a(f.tooltipborderthickness,1)+"px";
      f.tooltipborderradius&&(sb.borderRadius=a(f.tooltipborderradius,1)+"px");
      sb.padding=a(f.tooltippadding,this.tooltippadding,3)+"px";
      f.tooltipcolor&&(sb.color=ba(f.tooltipcolor));
      u.userPlotSpacePercent=l.plotOptions.series.userPlotSpacePercent=f.plotspacepercent;
      hb=a(f.plotspacepercent,
20)%100;
      u.plotSpacePercent=l.plotOptions.series.groupPadding=hb/200;
      H&&!Y?(C.series2D3Dshift="mscombi3d"===A?!0:Boolean(a(f.use3dlineshift,0)),C.canvasBaseColor3D=c(f.canvasbasecolor,n.getColor("canvasBaseColor3D")),C.canvasBaseDepth=a(f.canvasbasedepth,10),C.canvasBgDepth=a(f.canvasbgdepth,3),C.showCanvasBg=Boolean(a(f.showcanvasbg,1)),C.showCanvasBase=Boolean(a(f.showcanvasbase,1)),da?(C.xDepth=5,C.yDepth=5,C.showCanvasBg&&(u.marginTopExtraSpace+=C.canvasBgDepth),u.marginLeftExtraSpace+=C.yDepth+
(C.showCanvasBase?C.canvasBaseDepth:0),u.marginBottomExtraSpace+=5):(C.xDepth=10,C.yDepth=10,C.showCanvasBg&&(u.marginRightExtraSpace+=C.canvasBgDepth),u.marginBottomExtraSpace+=C.yDepth+(C.showCanvasBase?C.canvasBaseDepth:0)),Ta=Ta.split(za)[0],Ab=Ab.split(za)[0],C.use3DLighting=Boolean(a(f.use3dlighting,1)),C.plotBackgroundColor=C.use3DLighting?{
        FCcolor:{
          color:Z(Ta,85)+za+Da(Ta,55),alpha:Ab+za+Ab,ratio:nb,angle:M(s-(C.marginLeft+C.marginRight),m-(C.marginTop+C.marginBottom),1)}
        }
      :T(Ta,Ab),C.canvasBgColor=
T(Z(Ta,80),Ab),K=c(f.zeroplanecolor,f.divlinecolor,n.getColor(L.divLineColor)),w=c(f.zeroplanealpha,f.divlinealpha,n.getColor("divLineAlpha")),C.zeroPlaneColor=T(K,w),C.zeroPlaneBorderColor=T(c(f.zeroplanebordercolor,K),a(f.zeroplaneshowborder,1)?w:0),C.zeroPlaneShowBorder=a(f.zeroplaneshowborder,1)):(C.is3D=!1,C.plotBackgroundColor={
        FCcolor:{
          color:Ta,alpha:Ab,angle:c(f.canvasbgangle,n.getColor("canvasBgAngle")),ratio:c(f.canvasbgratio,n.getColor("canvasBgRatio"))}
        }
      );
      this.parseExportOptions(l);
      this.parseHoverEffectOptions(C);
      
this.preSeriesAddition&&this.preSeriesAddition(l,k,s,m);
      this.series&&this.series(k,l,A,s,m);
      this.postSeriesAddition(l,k,s,m);
      this.spaceManager(l,k,s,m);
      this.postSpaceManager&&this.postSpaceManager(l,k,s,m);
      kb=a(f.drawquadrant,0);
      u.isXYPlot&&kb&&(qb=ja.min,Ba=ja.max,Vb=l.yAxis[0].min,qc=l.yAxis[0].max,ab=a(f.quadrantxval,(qb+Ba)/2),gb=a(f.quadrantyval,(Vb+qc)/2),gb>=Vb&&gb<=qc&&ab>=qb&&ab<=Ba&&(Kb=T(c(f.quadrantlinecolor,C.plotBorderColor),c(f.quadrantlinealpha,$a)),lb=a(f.quadrantlinethickness,C.plotBorderWidth),
zc=a(f.quadrantlinedashed,f.quadrantlineisdashed,0),Dc=a(f.quadrantlinedashLen,4),Qa=a(f.quadrantlinedashgap,2),Bc=p(f.quadrantlabeltl,b),hd=p(f.quadrantlabeltr,b),ec=p(f.quadrantlabelbl,b),id=p(f.quadrantlabelbr,b),uc=a(f.quadrantlabelpadding,3),jd=zc?h(Dc,Qa,lb):"none",ja.plotLines.push({
        color:Kb,value:ab,width:lb,dashStyle:jd,zIndex:3}
      ),l.yAxis[0].plotLines.push({
        color:Kb,value:gb,width:lb,dashStyle:jd,zIndex:3}
      ),Yc=s-C.marginRight-C.marginLeft,Zb=m-C.marginTop-C.marginBottom,ob=u.inCanvasStyle,
ua=Yc/(Ba-qb)*(ab-qb),Yb=Yc-ua,Pa=Zb/(qc-Vb)*(gb-Vb),fc=Zb-Pa,ua-=uc,Yb-=uc,fc-=uc,Pa-=uc,Bb=uc+Ga,Cb=Zb-uc+Ga,$b=uc+Ga,kd=Yc-uc+Ga,V.setStyle(ob),0<fc&&(Bc!==b&&0<ua&&(J=t(f.quadrantlabeltlbordercolor,f.quadrantlabelbordercolor,b),Db=c(f.quadrantlabeltlbgcolor,f.quadrantlabelbgcolor),Pb=a(f.quadrantlabeltlborderthickness,f.quadrantlabelborderthickness,1),J=J?T(J,a(f.quadrantlabeltlborderalpha,f.quadrantlabelborderalpha,f.quadrantlabeltlalpha,f.quadrantlabelalpha,100)):b,Wb={
        left:$b,top:Bb,fontSize:c(a(f.quadrantlabeltlfontsize,
f.quadrantlabelfontsize),parseInt(ob.fontSize,10))+Ga,lineHeight:ob.lineHeight,fontFamily:c(f.quadrantlabeltlfont,f.quadrantlabelfont,ob.fontFamily),color:T(c(f.quadrantlabeltlfontcolor,f.quadrantlabelfontcolor,ob.color),a(f.quadrantlabeltlfontalpha,f.quadrantlabelfontalpha,100)),fontWeight:a(f.quadrantlabeltlfontbold,f.quadrantlabelfontbold)?"bold":"normal",fontStyle:a(f.quadrantlabeltlfontitalic,f.quadrantlabelfontitalic)?"italic":"normal",border:J||Db?Pb+"px solid":b,borderColor:J,borderThickness:Pb,
borderPadding:a(f.quadrantlabeltlborderpadding,f.quadrantlabelborderpadding,2),borderRadius:a(f.quadrantlabeltlborderradius,f.quadrantlabelborderradius,0),backgroundColor:Db?T(Db,a(f.quadrantlabeltlbgalpha,f.quadrantlabelbgalpha,f.quadrantlabeltlalpha,f.quadrantlabelalpha,100)):b,borderDash:a(f.quadrantlabeltlborderdashed,f.quadrantlabelborderdashed,0)?h(a(f.quadrantlabeltlborderdashlen,f.quadrantlabelborderdashlen,4),a(f.quadrantlabeltlborderdashgap,f.quadrantlabelborderdashgap,2),Pb):void 0}
      ,r(Wb),
V.setStyle(Wb),Lb=V.getSmartText(Bc,ua,fc),l.labels.items.push({
        html:Lb.text,title:Lb.title,zIndex:3,vAlign:qa,style:Wb}
      )),hd!==b&&0<Yb&&(J=t(f.quadrantlabeltrbordercolor,f.quadrantlabelbordercolor,b),Db=c(f.quadrantlabeltrbgcolor,f.quadrantlabelbgcolor),Pb=a(f.quadrantlabeltrborderthickness,f.quadrantlabelborderthickness,1),J=J?T(J,a(f.quadrantlabeltrborderalpha,f.quadrantlabelborderalpha,f.quadrantlabeltralpha,f.quadrantlabelalpha,100)):b,Wb={
        left:kd,top:Bb,fontSize:c(a(f.quadrantlabeltrfontsize,
f.quadrantlabelfontsize),parseInt(ob.fontSize,10))+Ga,lineHeight:ob.lineHeight,fontFamily:c(f.quadrantlabeltrfont,f.quadrantlabelfont,ob.fontFamily),color:T(c(f.quadrantlabeltrfontcolor,f.quadrantlabelfontcolor,ob.color),a(f.quadrantlabeltrfontalpha,f.quadrantlabelfontalpha,100)),fontWeight:a(f.quadrantlabeltrfontbold,f.quadrantlabelfontbold)?"bold":"normal",fontStyle:a(f.quadrantlabeltrfontitalic,f.quadrantlabelfontitalic)?"italic":"normal",border:J||Db?Pb+"px solid":b,borderColor:J,borderThickness:Pb,
borderPadding:a(f.quadrantlabeltrborderpadding,f.quadrantlabelborderpadding,2),borderRadius:a(f.quadrantlabeltrborderradius,f.quadrantlabelborderradius,0),backgroundColor:Db?T(Db,a(f.quadrantlabeltrbgalpha,f.quadrantlabelbgalpha,f.quadrantlabeltralpha,f.quadrantlabelalpha,100)):b,borderDash:a(f.quadrantlabeltrborderdashed,f.quadrantlabelborderdashed,0)?h(a(f.quadrantlabeltrborderdashlen,f.quadrantlabelborderdashlen,4),a(f.quadrantlabeltrborderdashgap,f.quadrantlabelborderdashgap,2),Pb):void 0}
      ,r(Wb),
V.setStyle(Wb),Lb=V.getSmartText(hd,ua,fc),l.labels.items.push({
        html:Lb.text,textAlign:ha,title:Lb.title,zIndex:3,vAlign:qa,style:Wb}
      ))),0<Pa&&(ec!==b&&0<ua&&(J=t(f.quadrantlabelblbordercolor,f.quadrantlabelbordercolor,b),Db=c(f.quadrantlabelblbgcolor,f.quadrantlabelbgcolor),Pb=a(f.quadrantlabelblborderthickness,f.quadrantlabelborderthickness,1),J=J?T(J,a(f.quadrantlabelblborderalpha,f.quadrantlabelborderalpha,f.quadrantlabelblalpha,f.quadrantlabelalpha,100)):b,Wb={
        left:$b,top:Cb,fontSize:c(a(f.quadrantlabelblfontsize,
f.quadrantlabelfontsize),parseInt(ob.fontSize,10))+Ga,lineHeight:ob.lineHeight,fontFamily:c(f.quadrantlabelblfont,f.quadrantlabelfont,ob.fontFamily),color:T(c(f.quadrantlabelblfontcolor,f.quadrantlabelfontcolor,ob.color),a(f.quadrantlabelblfontalpha,f.quadrantlabelfontalpha,100)),fontWeight:a(f.quadrantlabelblfontbold,f.quadrantlabelfontbold)?"bold":"normal",fontStyle:a(f.quadrantlabelblfontitalic,f.quadrantlabelfontitalic)?"italic":"normal",border:J||Db?Pb+"px solid":b,borderColor:J,borderThickness:Pb,
borderPadding:a(f.quadrantlabelblborderpadding,f.quadrantlabelborderpadding,2),borderRadius:a(f.quadrantlabelblborderradius,f.quadrantlabelborderradius,0),backgroundColor:Db?T(Db,a(f.quadrantlabelblbgalpha,f.quadrantlabelbgalpha,f.quadrantlabelblalpha,f.quadrantlabelalpha,100)):b,borderDash:a(f.quadrantlabelblborderdashed,f.quadrantlabelborderdashed,0)?h(a(f.quadrantlabelblborderdashlen,f.quadrantlabelborderdashlen,4),a(f.quadrantlabelblborderdashgap,f.quadrantlabelborderdashgap,2),Pb):void 0}
      ,r(Wb),
V.setStyle(Wb),Lb=V.getSmartText(ec,ua,fc),l.labels.items.push({
        html:Lb.text,textAlign:Sa,title:Lb.title,zIndex:3,vAlign:Na,style:Wb}
      )),id!==b&&0<Yb&&(J=t(f.quadrantlabelbrbordercolor,f.quadrantlabelbordercolor,b),Db=c(f.quadrantlabelbrbgcolor,f.quadrantlabelbgcolor),Pb=a(f.quadrantlabelbrborderthickness,f.quadrantlabelborderthickness,1),J=J?T(J,a(f.quadrantlabelbrborderalpha,f.quadrantlabelborderalpha,f.quadrantlabelbralpha,f.quadrantlabelalpha,100)):b,Wb={
        left:kd,top:Cb,fontSize:c(a(f.quadrantlabelbrfontsize,
f.quadrantlabelfontsize),parseInt(ob.fontSize,10))+Ga,lineHeight:ob.lineHeight,fontFamily:c(f.quadrantlabelbrfont,f.quadrantlabelfont,ob.fontFamily),color:T(c(f.quadrantlabelbrfontcolor,f.quadrantlabelfontcolor,ob.color),a(f.quadrantlabelbrfontalpha,f.quadrantlabelfontalpha,100)),fontWeight:a(f.quadrantlabelbrfontbold,f.quadrantlabelfontbold)?"bold":"normal",fontStyle:a(f.quadrantlabelbrfontitalic,f.quadrantlabelfontitalic)?"italic":"normal",border:J||Db?Pb+"px solid":b,borderColor:J,borderThickness:Pb,
borderPadding:a(f.quadrantlabelbrborderpadding,f.quadrantlabelborderpadding,2),borderRadius:a(f.quadrantlabelbrborderradius,f.quadrantlabelborderradius,0),backgroundColor:Db?T(Db,a(f.quadrantlabelbrbgalpha,f.quadrantlabelbgalpha,f.quadrantlabelbralpha,f.quadrantlabelalpha,100)):b,borderDash:a(f.quadrantlabelbrborderdashed,f.quadrantlabelborderdashed,0)?h(a(f.quadrantlabelbrborderdashlen,f.quadrantlabelborderdashlen,4),a(f.quadrantlabelbrborderdashgap,f.quadrantlabelborderdashgap,2),Pb):void 0}
      ,r(Wb),
V.setStyle(Wb),Lb=V.getSmartText(id,ua,fc),l.labels.items.push({
        html:Lb.text,textAlign:ha,vAlign:Na,title:Lb.title,zIndex:3,style:Wb}
      )))));
      if(this.hasVDivLine&&(tb=a(f.showvdivlines,0),gc=a(f.numvdivlines,0)+1,tb&&(gc=u.x.catCount-1),1<gc)){
        fb=ja.min;
        kc=u.x.catCount-1;
        zb=ja.max;
        Nb=kc/gc;
        Rc=!0;
        Zc=fb;
        ja.scroll&&!isNaN(ja.scroll.viewPortMax)&&(zb=ja.scroll.viewPortMax);
        jc=c(f.vdivlinecolor,ga);
        rd=a(f.vdivlinealpha,la);
        ic=a(f.vdivlinethickness,xa);
        rc=a(f.vdivlinedashed,f.vdivlineisdashed,ya);
        tc=a(f.vdivlinedashlen,
Ca);
        yc=a(f.vdivlinedashgap,Ra);
        (lc=a(f.showalternatevgridcolor,0))&&(ld=T(c(f.alternatevgridcolor,n.getColor("altVGridColor")),c(f.alternatevgridalpha,n.getColor("altVGridAlpha"))));
        for(Za=Nb;
        Za<kc;
        Za+=Nb,Rc=!Rc)Rc&&lc&&ja.plotBands.push({
          isNumVDIV:!0,color:ld,from:Zc,to:Za,zIndex:1}
        ),ja.plotLines.push({
          isNumVDIV:!0,width:ic,color:T(jc,rd),dashStyle:rc?h(tc,yc,ic):"none",value:Za,zIndex:1}
        ),Zc=Za;
        Rc&&lc&&ja.plotBands.push({
          isNumVDIV:!0,color:ld,from:Zc,to:zb,zIndex:1}
        )}
      P=C.marginTop;
      ra=C.marginBottom;
      
Ha=C.marginLeft;
      ma=C.marginRight;
      N.canvasstartx=Ha;
      N.canvasstarty=P;
      N.canvasendx=s-ma;
      N.canvasendy=m-ra;
      N.canvaswidth=N.canvasendx-N.canvasstartx;
      N.canvasheight=N.canvasendy-N.canvasstarty;
      l.legend&&l.legend.enabled&&"vertical"===l.legend.layout&&(N.legendstarty=P+.5*(u.height-ra-P-N.legendheight)+(l.legend.y||0),N.legendendy=N.legendstarty+N.legendheight);
      H&&C.xDepth>C.marginLeft&&(C.marginLeft=C.xDepth);
      q.console&&q.console.log&&q.FC_DEV_ENVIRONMENT&&console.log(l);
      return l}
    ,parseHoverEffectOptions:function(b){
      var d=
this.dataObj.chart,e;
      b.showHoverEffect=d.showhovereffect;
      b.plotHoverEffect=a(d.plothovereffect,d.anchorhovereffect,b.showHoverEffect);
      e=b.plotHoverEffects={
        enabled:b.plotHoverEffect}
      ;
      e.highlight=a(d.highlightonhover,d.highlightplotonhover,b.plotHoverEffect);
      e.columnHighlight=a(e.highlight,d.highlightcolumnonhover,d.highlightbaronhover);
      e.anchorHighlight=a(e.highlight,d.highlightanchoronhover);
      e.imageHighlight=a(e.highlight,d.highlightanchorimageonhover);
      e.anchorImageHoverAlpha=c(d.anchorimagehoveralpha);
      
e.anchorImageHoverScale=c(d.anchorimagehoverscale);
      e.bubbleHighlight=a(e.highlight,d.highlightbubbleonhover);
      e.color=c(d.plotfillhovercolor,d.columnhovercolor,d.barhovercolor,d.bubblehovercolor);
      e.alpha=c(d.plotfillhoveralpha,d.columnhoveralpha,d.barhoveralpha,d.bubblehoveralpha);
      e.scale=c(d.plothoverscale,d.columnhoverscale,d.barhoverscale,d.bubblehoverscale);
      e.gradientColor=d.plothovergradientcolor;
      e.ratio=d.plothoverratio;
      e.angle=d.plothoverangle;
      e.borderColor=d.plotborderhovercolor;
      e.borderAlpha=
d.plotborderhoveralpha;
      e.borderThickness=d.plotborderhoverthickness;
      e.borderDashed=d.plotborderhoverdashed;
      e.borderDashGap=d.plotborderhoverdashgap;
      e.borderDashLen=d.plotborderhoverdashlen;
      e.shadow=d.plothovershadow;
      e.anchorScale=d.anchorhoverscale;
      e.anchorSides=d.anchorhoversides;
      e.anchorRadius=d.anchorhoverradius;
      e.anchorAlpha=d.anchorhoveralpha;
      e.anchorBgColor=c(d.anchorbghovercolor,d.anchorhovercolor);
      e.anchorBgAlpha=d.anchorbghoveralpha;
      e.anchorBorderColor=d.anchorborderhovercolor;
      e.anchorBorderAlpha=
d.anchorborderhoveralpha;
      e.anchorBorderThickness=d.anchorborderhoverthickness;
      e.anchorStartAngle=d.anchorhoverstartangle;
      e.anchorDip=a(d.anchorhoverdip);
      e.anchorAnimation=a(d.anchorhoveranimation,1);
      e.negativeColor=c(d.negativehovercolor,d.negativecolor);
      e.is3DBubble=a(d.is3donhover)}
    ,parseExportOptions:function(e){
      var g=this.chartInstance,m=this.dataObj.chart;
      d(e.exporting,{
        enabled:a(m.exportenabled,0),bgcolor:g.jsVars.transparent||0===a(g.options.containerBackgroundOpacity,1)?b:g.options.containerBackgroundColor||
"#ffffff",bgalpha:(g.jsVars.transparent?0:a(g.options.containerBackgroundOpacity,1))+b,exporttargetwindow:c(m.exporttargetwindow,Kb?"_blank":"_self"),exportaction:m.exportaction&&"save"===m.exportaction.toString().toLowerCase()&&"save"||"download",exportfilename:c(m.exportfilename,"FusionCharts"),exporthandler:c(m.html5exporthandler,m.exporthandler,J),exportparameters:c(m.exportparameters,b),exportformat:c(m.exportformat,"PNG"),exportcallback:c(m.exportcallback,b),exportwithimages:a(m.exportwithimages,
0),buttons:{
          printButton:{
            enabled:!!a(m.printshowbutton,m.showprintmenuitem,0)}
          ,exportButton:{
            enabled:!(!a(m.exportenabled,0)||!a(m.exportshowbutton,m.exportshowmenuitem,1))}
          }
        }
      );
      var g=e.exporting,h;
      m=m.exportformats;
      e=C(e.exporting.exportaction);
      e={
        JPG:e+" as JPEG image",PNG:e+" as PNG image",PDF:e+" as PDF document",SVG:e+" as SVG vector image"}
      ;
      var f,k,E;
      if(m){
        m=m.split(/\s*?\|\s*?/);
        for(E=0;
        E<m.length;
        E++)k=(f=m[E].split(/\s*?=\s*?/))&&f[0].toUpperCase()||b,f=f&&f[1]||b,e[k]&&(h||(h={
          }
        ))&&(h[k]=
f||e[k]);
        h=h||e}
      else h=e;
      g.exportformats=h}
    ,defaultSeriesType:b,paletteIndex:1,creditLabel:!1,titleSpaceManager:Eb,placeLegendBlockBottom:Fa,configureLegendOptions:Tb,placeLegendBlockRight:vb,placeHorizontalAxis:rb,placeVerticalAxis:Wa,placeHorizontalCanvasMarginAdjustment:Aa,placeVerticalCanvasMarginAdjustment:Ua,placeHorizontalXYSpaceManager:function(b,d,e,m){
      var f=b[g],h,k,E,l,n=d.chart,K,p,r,M,q,t,w,V=b.chart,v=f.marginLeftExtraSpace,u=f.marginTopExtraSpace,Y=f.marginBottomExtraSpace,B=f.marginRightExtraSpace;
      
l=e-(v+B+V.marginRight+V.marginLeft);
      var F=m-(Y+V.marginBottom+V.marginTop),C=.3*l;
      e=.3*F;
      var da=b.xAxis.showLine?b.xAxis.lineThickness:0;
      E=b.yAxis[0].showLine?b.yAxis[0].lineThickness:0;
      h=l-C;
      m=F-e;
      K=c(n.legendposition,Na).toLowerCase();
      b.legend.enabled&&K===ha&&(h-=this.placeLegendBlockRight(b,d,h/2,F));
      q=a(n.xaxisnamepadding,5);
      t=a(n.labelpadding,4);
      w=c(n.rotatexaxisname,"ccw");
      w=w===Ea?"none":w;
      p=c(n.showplotborder,f.is3d?Ea:db)===db;
      p=f.plotBorderThickness=p?f.is3d?1:a(n.plotborderthickness,
1):0;
      r=W(a(V.plotBorderWidth,1),0);
      !f.isDual&&V.marginRight<r&&void 0===n.chartrightmargin&&(k=r-V.marginRight,l>C+k&&(V.marginRight=r,l-=k,C=.3*l,h=l-C));
      k=f.x;
      M=W(r,p/2);
      t<M&&(t=M);
      k.verticalAxisNamePadding=q;
      k.verticalAxisValuesPadding=t+da;
      k.rotateVerticalAxisName=w;
      k.verticalAxisNameWidth=a(n.xaxisnamewidth);
      h-=Wa(b.xAxis,k,b,d,F,h,!1,!1,l);
      b.xAxis.lineEndExtension=E;
      h-=Aa(b,d,h,b.xAxis);
      l=h+C;
      b.legend.enabled&&K!==ha&&(m-=this.placeLegendBlockBottom(b,d,l,m/2));
      m-=this.titleSpaceManager(b,d,
l,m/2);
      k=f[0];
      k.horizontalAxisNamePadding=a(n.yaxisnamepadding,5);
      k.horizontalLabelPadding=W(a(n.yaxisvaluespadding,4))+E;
      k.labelDisplay="auto";
      k.staggerLines=a(n.staggerlines,2);
      k.slantLabels=a(n.slantlabels,0);
      k.horizontalLabelPadding=k.horizontalLabelPadding<r?r:k.horizontalLabelPadding;
      this.xAxisMinMaxSetter(b,d,l);
      E=b.xAxis;
      q=E.plotLines;
      h=m/(E.max-E.min);
      q&&q.length&&(r=(q[0].value-E.min)*h,q=(E.max-q[q.length-1].value)*h,f.isBar&&(p>r&&(E.min-=(p-r)/(2*h)),p>q&&(E.max+=(p-q)/(2*h))));
      m-=this.placeHorizontalAxis(b.yAxis[0],
k,b,d,l,m,C);
      m-=Ua(b,d,m,b.yAxis[0]);
      wb(e+m,b,n,b.xAxis,f.x.lYLblIdx,!0);
      Mb(b,b.xAxis.title,m);
      b.legend.enabled&&K===ha&&(b=b.legend,d=e+m,b.height>d&&(b.height=d,b.scroll.enabled=!0,d=(b.scroll.scrollBarWidth=10)+(b.scroll.scrollBarPadding=2),b.width+=d,V.marginRight+=d),b.y=20);
      V.marginLeft+=v;
      V.marginTop+=u;
      V.marginBottom+=Y;
      V.marginRight+=B}
    ,placeVerticalXYSpaceManager:function(b,d,e,m){
      var f=b[g],h,k,E=!0;
      h=0;
      var l=d.chart,n=!1,K,p,r,q,M=b.chart,t,w,V,v=f.marginLeftExtraSpace,u=f.marginTopExtraSpace,
Y=f.marginBottomExtraSpace,B=f.marginRightExtraSpace;
      q=e-(v+B+M.marginRight+M.marginLeft);
      var F=m-(Y+M.marginBottom+M.marginTop),C=.3*q;
      m=.3*F;
      var da=q-C;
      e=F-m;
      h=f.drawFullAreaBorder=a(l.drawfullareaborder,1);
      var G=c(l.legendposition,Na).toLowerCase();
      t=b.xAxis.showLine?b.xAxis.lineThickness:0;
      w=b.yAxis[0].showLine?b.yAxis[0].lineThickness:0;
      V=f.isDual&&b.yAxis[1].showLine?b.yAxis[1].lineThickness:0;
      K=a(l.yaxisnamepadding,5);
      p=a(l.yaxisvaluespadding,l.labelypadding,4);
      k=c(l.showplotborder,f.is3d?
Ea:db)===db;
      k=f.plotBorderThickness=k?f.is3d?1:a(l.plotborderthickness,1):0;
      r=W(a(M.plotBorderWidth,1),0);
      k=W(r,k/2);
      "area"!==this.defaultSeriesType||h||(k=r);
      p<r&&(p=r);
      !f.isDual&&M.marginRight<r&&void 0===l.chartrightmargin&&(h=r-b.chart.marginRight,q>C+h&&(q-=h,C=.3*q,da=q-C));
      b.legend.enabled&&G===ha&&(da-=this.placeLegendBlockRight(b,d,da/2,F));
      f.isDual&&(n=!0,h=f[1],E=b.yAxis[1].opposite,r=c(l.rotateyaxisname,E?"cw":"ccw"),r=r===Ea?"none":r,h.verticalAxisNamePadding=K,h.verticalAxisValuesPadding=
p+V,h.rotateVerticalAxisName=r,h.verticalAxisNameWidth=a(l.syaxisnamewidth),da-=Wa(b.yAxis[1],h,b,d,F,da/2,E,n));
      h=f[0];
      E=!E;
      r=c(l.rotateyaxisname,E?"cw":"ccw");
      r=r===Ea?"none":r;
      h.verticalAxisNamePadding=K;
      h.verticalAxisValuesPadding=p+w;
      h.rotateVerticalAxisName=r;
      h.verticalAxisNameWidth=a(n?l.pyaxisnamewidth:l.yaxisnamewidth);
      da-=Wa(b.yAxis[0],h,b,d,F,da,E,n,q);
      da-=Aa(b,d,da,b.yAxis[0],b.yAxis[1]);
      E=da+C;
      b.legend.enabled&&G!==ha&&(e-=this.placeLegendBlockBottom(b,d,E,e/2));
      e-=this.titleSpaceManager(b,
d,E,e/2);
      h=f.x;
      h.horizontalAxisNamePadding=a(l.xaxisnamepadding,5);
      h.horizontalLabelPadding=a(l.labelpadding,l.labelxpadding,4)+t;
      h.labelDisplay=c(l.labeldisplay,"auto").toLowerCase();
      h.rotateLabels=a(l.rotatelabels,l.rotatexaxislabels,0);
      h.staggerLines=a(l.staggerlines,2);
      h.slantLabels=a(l.slantlabels,l.slantlabel,0);
      b.yAxis[0].opposite?(b.xAxis.lineEndExtension=w,b.xAxis.lineStartExtension=V):(b.xAxis.lineEndExtension=V,b.xAxis.lineStartExtension=w);
      h.horizontalLabelPadding<k&&(h.horizontalLabelPadding=
k);
      q={
        left:0,right:0}
      ;
      q=M.managePlotOverflow&&this.canvasPaddingModifiers&&this.calculateCanvasOverflow(b,!0)||q;
      t=q.left+q.right;
      w=.6*E;
      t>w&&(V=q.left/t,q.left-=V*(t-w),q.right-=(1-V)*(t-w));
      this.xAxisMinMaxSetter(b,d,E,q.left,q.right);
      e-=this.placeHorizontalAxis(b.xAxis,h,b,d,E,e,C);
      e-=Ua(b,d,e,b.xAxis);
      b.title.alignWithCanvas||("left"===b.title.align&&b.yAxis[0].title.text&&Ob(b,b.yAxis[0].title,m+e),"right"===b.title.align&&n&&b.yAxis[1].title.text&&Ob(b,b.yAxis[1].title,m+e));
      n&&(wb(m+e,b,l,
b.yAxis[1],f[1].lYLblIdx),Mb(b,b.yAxis[1].title,m+e));
      wb(m+e,b,l,b.yAxis[0],f[0].lYLblIdx);
      Mb(b,b.yAxis[0].title,m+e);
      b.legend.enabled&&G===ha&&(b=b.legend,d=m+e,b.height>d&&"gradient"!==b.type&&(b.height=d,b.scroll.enabled=!0,d=(b.scroll.scrollBarWidth=10)+(b.scroll.scrollBarPadding=2),b.width+=d,M.marginRight+=d));
      M.marginLeft+=v;
      M.marginTop+=u;
      M.marginBottom+=Y;
      M.marginRight+=B}
    ,placeVerticalAxisTitle:Mb,calculateCanvasOverflow:function(a,c){
      for(var d=this.canvasPaddingModifiers,e=a.chart,f=this.smartLabel,
g=0,m=0,h=0,k=0,E=g=!1,l=!1,n=d&&d.length||0,K,r,p,q,M;
      n--;
      )switch(m=d[n],m){
        case "anchor":E=r=g=!0;
        break;
        case "anchorlabel":p=r=g=!0;
        break;
        case "errorbar":l=g=!0}
      if(g&&(n=(d=a.series)&&d.length||0,c))for(;
      n--;
      )K=d[n],r&&(g=K&&K.data||[],1<g.length&&(q=g[0],M=g[g.length-1],E&&(g=q&&q.marker&&q.marker.enabled&&(q.marker.radius||0)+(q.marker.lineWidth||0)||0,m=M&&M.marker&&M.marker.enabled&&(M.marker.radius||0)+(M.marker.lineWidth||0)||0,h=W(g+2,h),k=W(m+2,k)),p&&(f.setStyle(a.plotOptions.series.dataLabels.style),
e.rotateValues?(m=f.getOriSize(q&&q.displayValue||b),g=m.height/2,m=f.getOriSize(M&&M.displayValue||b),m=m.height/2):(m=f.getOriSize(q&&q.displayValue||b),g=m.width/2,m=f.getOriSize(M&&M.displayValue||b),m=m.width/2),h=W(g+2,h),k=W(m+2,k)))),l&&(m=g=K.errorBarWidth/2+K.errorBarThickness||0,h=W(g+2,h),k=W(m+2,k));
      return{
        left:h,right:k}
      }
    ,spaceManager:function(){
      return this.placeVerticalXYSpaceManager.apply(this,arguments)}
    ,axisMinMaxSetter:function(b,c,d,e,f,g,m,h){
      d=c.stacking100Percent?da(99,1,100,
0,f,g,m,h):da(a(c.max,d),a(c.min,e),d,e,f,g,m,h);
      b.min=Number(L(d.Min,10));
      b.max=Number(L(d.Max,10));
      b.tickInterval=Number(L(d.divGap,10));
      c.numdivlines=v.round((b.max-b.min)/b.tickInterval)-1;
      2>=d.Range/d.divGap&&(b.alternateGridColor=xa);
      this.highValue=c.max;
      this.lowValue=c.min;
      delete c.max;
      delete c.min}
    ,configurePlotLines:function(d,e,m,h,f,k,E,l,n,K,r){
      var p=m.min,q=m.max,M=m.tickInterval,t=K?"xAxis":h.stacking100Percent?"percentValue":"yAxis",w=p,V=1,v=m.gridLineColor,u=m.gridLineWidth,Y=m.gridLineDashStyle,
B=0>p&&0<q?!0:!1,F=0===p,C=0===q,da=0===a(h.showzeroplanevalue,d.showzeroplanevalue),G=!0,na,D=1,ja=0<a(d.numdivlines,0),J=e[g].axisGridManager,ca=this.colorManager,N=this.is3D,Xa=a(d.showaxislimitgridlines,this.showAxisLimitGridLines),N=a(Xa,N||e.chart.plotBorderWidth?0:1),Va=this.inversed;
      e=e.xAxis;
      r=a(r,n?1:0);
      delete m._altGrid;
      delete m._lastValue;
      K&&!h.catOccupied&&(h.catOccupied={
        }
      );
      !B||K&&h.catOccupied[0]||(K?(G=a(d.showvzeroplane,1),na=a(d.showvzeroplanevalue,k),ja=a(d.vzeroplanethickness,
1),ca=c(d.vzeroplanealpha,d.vdivlinealpha,ca.getColor("divLineAlpha")),d=0<ja?T(c(d.vzeroplanecolor,v),ca):xa):(ca=a(d.divlinealpha,ca.getColor("divLineAlpha")),na=a(h.showzeroplanevalue,d.showzeroplanevalue,k),!1===this.defaultZeroPlaneHighlighted?(G=a(h.showzeroplane,d.showzeroplane,!(this.defaultZeroPlaneHidden&&!ja)),ja=u):(ja=1===u?2:u,D=5,ca=$(2*ca,100)),ja=a(h.zeroplanethickness,d.zeroplanethickness,ja),ca=c(h.zeroplanealpha,d.zeroplanealpha,ca),d=0<ja?T(c(h.zeroplanecolor,d.zeroplanecolor,
v),ca):xa),G&&(na=na?l[t](0,r):b,(D=J.addAxisGridLine(m,0,na,ja,Y,d,D,K))&&(D.isZeroPlane=!0)),m.effectiveZeroPlaneThickness=G&&parseInt(ca,10)&&ja);
      K&&h.catOccupied[p]||(na=!f||F&&da?b:l[t](p,r),(D=Xa||N&&(Va||!e.showLine)?J.addAxisGridLine(m,p,na,u,Y,v||xa,2,K):J.addAxisGridLine(m,p,na,.1,void 0,xa,2,K))&&(D.isMinLabel=!0));
      0>=u&&(u=.1,v=xa);
      for(p=Number(L(w+M,10));
      p<q;
      p=Number(L(p+M,10)),V+=1)B&&0>w&&0<p&&!n&&(J.addAxisAltGrid(m,0),V+=1),0===p||K&&h.catOccupied[p]||(na=1===k&&0===V%E?l[t](p,r):
b,J.addAxisGridLine(m,p,na,u,Y,v,2,K)),w=p,n||J.addAxisAltGrid(m,p);
      n||J.addAxisAltGrid(m,q);
      0!==V%E||K&&h.catOccupied[q]||(na=!f||C&&da?b:l[t](q,r),(D=Xa||N&&(!Va||!e.showLine)?J.addAxisGridLine(m,q,na,u,Y,v||xa,2,K):J.addAxisGridLine(m,q,na,.1,Y,xa,2,K))&&(D.isMaxLabel=!0));
      this.realtimeEnabled&&(m.labels._enabled=m.labels.enabled,m._gridLineWidth=m.gridLineWidth,m._alternateGridColor=m.alternateGridColor);
      m.labels.enabled=!1;
      m.gridLineWidth=0;
      m.alternateGridColor=xa;
      m.plotLines.sort(Fb)}
    ,xAxisMinMaxSetter:function(b,
c,d,e,f){
      var m=b[g],h=m.x,k=c.chart,E=h.min=a(h.min,0),l=h.max=a(h.max,h.catCount-1),n=0,K=0,p=b.chart.defaultSeriesType,r=/^(column|column3d|bar|bar3d|floatedcolumn|sparkwinloss|boxandwhisker2d|dragcolumn)$/.test(p),q=/^(line|area|spline|areaspline)$/.test(p),p=/^(scatter|bubble|candlestick|dragnode)$/.test(p),M=b.xAxis,t=M.scroll,w=t&&t.enabled,V=a(k.canvaspadding),v=R(V),u=Ca($(a(V,e,0),d/2-10)),V=Ca($(a(V,f,0),d/2-10)),Y,B,F,C;
      h.adjustMinMax&&(Y=a(k.setadaptivexmin,1),l=E=!Y,B=a(this.numVDivLines,
k.numvdivlines,4),F=k.adjustvdiv!==Ea,C=a(k.showxaxisvalues,k.showxaxisvalue,1),Y=a(k.showvlimits,C),C=a(k.showvdivlinevalue,k.showvdivlinevalues,C),this.axisMinMaxSetter(M,h,k.xaxismaxvalue,k.xaxisminvalue,E,l,B,F),E=M.min,l=M.max,h.requiredAutoNumericLabels&&(B=a(parseInt(k.xaxisvaluesstep,10),1),this.configurePlotLines(k,b,M,h,Y,C,1>B?1:B,m.numberFormatter,!1,!0)),M.plotLines.sort(Fb));
      M.labels.enabled=!1;
      M.gridLineWidth=0;
      M.alternateGridColor=xa;
      (r||m.isScroll)&&!m.hasNoColumn&&!v&&R(e)&&R(f)&&
(K=d/(l-E+1)*.5,u=0<K-e?0:u,V=0<K-f?0:V,n=0<K-e?.5:0,K=0<K-f?.5:0);
      r&&!m.hasNoColumn&&(K=n=.5);
      m.is3d&&(u+=a(b.chart.xDepth,0));
      b=(d-(u+V))/((w?t.vxLength:l)-E+(n+K));
      M.min=E-(n+u/b);
      M.max=l+(K+V/b);
      w&&(n=t.vxLength,b=M.max-M.min,t.viewPortMin=M.min,t.viewPortMax=M.max,t.scrollRatio=n/b,t.flatScrollBars=m.flatScrollBars,t.scrollBar3DLighting=m.scrollBar3DLighting,M.max=M.min+n);
      q&&M.min===M.max&&(M.min-=.65,M.max+=.65);
      p&&c.vtrendlines&&N(c.vtrendlines,M,m,!1,!0,!0)}
    ,postSeriesAddition:function(b){
      var e=
b[g],m=e.isBar,h=e.is3d,f=b.chart.rotateValues&&!m?270:0,k=e[0],E=k&&k.stacking100Percent,n,K,p,r,M,q,t,V,w,v,u,Y,B,F,C,da,G,na,D,ja,L,J,ca;
      if(this.isStacked)for(p in n=e.plotSpacePercent,K=b.chart.defaultSeriesType,n=1-2*n,da=b.series,G=this.numberFormatter,L=d({
        }
      ,b.plotOptions.series.dataLabels.style),J=parseFloat(L.fontSize),ca=!k.stacking100Percent,L.color=b.plotOptions.series.dataLabels.color,r=k.stack,r){
        k=r[p].length;
        M=n/k;
        t=-(n-M)/2;
        F=[];
        Y=0;
        for(V=da.length;
        Y<V;
        Y+=1)w=da[Y],w.yAxis||c(w.type,
K)!==p||F.push(w);
        for(q=0;
        q<k;
        q+=1,t+=M){
          u=r[p][q];
          C=[];
          Y=0;
          for(V=F.length;
          Y<V;
          Y+=1)w=F[Y],a(w.columnPosition,0)===q&&C.push(w.data);
          if(u&&u.length)for(v=0,w=u.length;
          v<w;
          v+=1)if(Y=u[v])for(B=(Y.n||0)+(Y.p||0),e.showStackTotal&&(V=v,V+=t,Y=0>B?Y.n:Y.p,b.xAxis.plotLines.push({
            value:V,width:0,isVline:ca,isTrend:!ca,zIndex:4,_isStackSum:1,_catPosition:v,_stackIndex:q,label:{
              align:va,textAlign:h||270!==f?m?0>B?ha:Sa:va:0>B?ha:Sa,offsetScale:ca?Y:void 0,offsetScaleIndex:0,rotation:f,style:L,verticalAlign:qa,
y:m?0:0>B?270===f?4:J:-4,x:0,text:e.numberFormatter.yAxis(B)}
            }
          )),Y=0,V=C.length;
          Y<V;
          Y+=1)if(D=C[Y][v])if(ja=B&&(D.y||0)/B*100,na=G.percentValue(ja),D.toolText=l(D.toolText,[14,24,25,112],{
            percentValue:na,sum:G.dataLabels(B),unformattedSum:B}
          ),D.y||0===D.y)E&&(D.y=ja,D.previousY||0===D.previousY)&&(D.previousY=D.previousY/B*100),D.showPercentValues&&(D.displayValue=na)}
        }
      }
    ,styleMapForFont:ta,styleApplicationDefinition_font:function(a,b,c){
      var d,f,e=!1,m,h,k=this.styleMapForFont;
      switch(b){
        case "caption":d=
a.title;
        break;
        case "datalabels":d=a.xAxis.labels;
        break;
        case "datavalues":d=a.plotOptions.series.dataLabels;
        e=!0;
        break;
        case "tldatavalues":d={
          style:a.plotOptions.series.dataLabels.tlLabelStyle}
        ;
        break;
        case "trdatavalues":d={
          style:a.plotOptions.series.dataLabels.trLabelStyle}
        ;
        break;
        case "bldatavalues":d={
          style:a.plotOptions.series.dataLabels.blLabelStyle}
        ;
        break;
        case "brdatavalues":d={
          style:a.plotOptions.series.dataLabels.brLabelStyle}
        ;
        break;
        case "subcaption":d=a.subtitle;
        break;
        case "tooltip":d=a.tooltip;
        
break;
        case "trendvalues":d={
          style:a[g].trendStyle}
        ;
        break;
        case "xaxisname":d=a.xAxis.title;
        break;
        case "yaxisname":case "pyaxisname":case "axistitle":d=[];
        b=0;
        for(m=a.yAxis.length;
        b<m;
        b+=1)d.push(a.yAxis[b].title);
        break;
        case "yaxisvalues":d=[];
        b=0;
        for(m=a.yAxis.length;
        b<m;
        b+=1)d.push(a.yAxis[b].labels);
        break;
        case "vlinelabels":d={
          style:a[g].divlineStyle}
        ;
        break;
        case "legend":d={
          style:a.legend.itemStyle}
        ;
        break;
        default:(d=a.orphanStyles[b])||(a.orphanStyles[b]=d={
          text:"",style:{
            }
          }
        )}
      if("object"===typeof d)if(d instanceof
Array)for(b=0,m=d.length;
      b<m;
      b+=1){
        h=d[b];
        for(f in c)if(a=f.toLowerCase(),"function"===typeof k[a])k[a](c[f],h,e);
        r(h.style)}
      else{
        for(f in c)if(a=f.toLowerCase(),"function"===typeof k[a])k[a](c[f],d,e);
        r(d.style)}
      }
    ,parseStyles:function(a){
      var b,c,d,f={
        }
      ,e,g=this.dataObj;
      if(g.styles&&g.styles.definition instanceof Array&&g.styles.application instanceof Array){
        for(b=0;
        b<g.styles.definition.length;
        b+=1)c=g.styles.definition[b],c.type&&c.name&&this["styleApplicationDefinition_"+c.type.toLowerCase()]&&
(f[c.name.toLowerCase()]=c);
        for(b=0;
        b<g.styles.application.length;
        b+=1)for(c=g.styles.application[b].styles&&g.styles.application[b].styles.split(za)||[],e=0;
        e<c.length;
        e+=1)if(d=c[e].toLowerCase(),f[d]&&g.styles.application[b].toobject)this["styleApplicationDefinition_"+f[d].type.toLowerCase()](a,g.styles.application[b].toobject.toLowerCase(),f[d])}
      }
    ,updateDefaultAnnotations:function(){
      var b=this.renderer,d=this.dataObj,e=this.chartInstance,g=d&&d.annotations||{
        }
      ,f={
        }
      ,m;
      if(this.drawAnnotations&&
e.dataReady()&&d&&d.chart&&a(d.chart.showannotations,1)){
        m=a(g.scaleonresize,d.chart.scaleonresize,1);
        var b={
          interactionevents:c(this.annotationInteractionEvents,!0),showbelow:c(g.showbelow,g.showbelowchart),autoscale:g.autoscale,scaletext:g.scaletext,scaleimages:g.scaleimages,constrainedscale:g.constrainedscale,scaleonresize:m,origw:c(g.origw,d.chart.origw,m?this.origRenderWidth:b.chartWidth),origh:c(g.origh,d.chart.origh,m?this.origRenderHeight:b.chartHeight),xshift:g.xshift,yshift:g.yshift,grpxshift:g.grpxshift,
grpyshift:g.grpyshift,xscale:g.xscale,yscale:g.yscale,rootxscale:a(g.xscale,100)/100,rootyscale:a(g.yscale,100)/100}
        ,h;
        b||(b={
          }
        );
        for(h in f)b[h]=f[h];
        e.annotations.reset(g,b,this.snapLiterals)}
      else e.annotations.clear()}
    ,dispose:function(){
      var a;
      this.disposing=!0;
      this.renderer&&this.renderer.dispose();
      this.numberFormatter&&this.numberFormatter.dispose();
      this.hcJSON&&this.hcJSON.chart&&this.hcJSON.chart.renderTo&&delete this.hcJSON.chart.renderTo;
      for(a in this)delete this[a];
      delete this.disposing;
      
this.disposed=!0}
    }
  );
  sa("stub",{
    init:function(a,b,c){
      this.containerElement=a;
      this.smartLabel=c.jsVars.smartLabel}
    ,standaloneInit:!0}
  ,sa.base);
  sa("barbase",{
    spaceManager:function(){
      return this.placeHorizontalXYSpaceManager.apply(this,arguments)}
    }
  ,sa.base);
  sa("singleseries",{
    series:function(a,b,c){
      var d=a.data||a.dataset&&a.dataset[0]&&a.dataset[0].data,f;
      d&&0<d.length&&d instanceof Array&&(f={
        data:[],hoverEffects:this.parseSeriesHoverOptions(a,b,{
          }
        ,c),colorByPoint:!0}
      ,b.legend.enabled=!1,c=this.point(c,
f,d,a.chart,b),c instanceof Array?b.series=b.series.concat(c):b.series.push(c),this.configureAxis(b,a),a.trendlines&&N(a.trendlines,b.yAxis,b[g],!1,this.isBar))}
    ,defaultSeriesType:b,configureAxis:function(b,d){
      var e=b[g],m=b.xAxis,f=d.chart,h=b.chart.is3D,k,E,l,n,K,p,r,M,q,t,V,w,v=0,u,Y,B,C,da,G,D,na=this.numberFormatter,ja=a(f.syncaxislimits,0),L;
      m.title.text=F(f.xaxisname);
      L=a(parseInt(f.yaxisvaluesstep,10),parseInt(f.yaxisvaluestep,10),1);
      L=1>L?1:L;
      k=b.yAxis[0];
      E=e[0];
      if(e.isDual)l=na.getCleanValue(f.pyaxismaxvalue),
n=na.getCleanValue(f.pyaxisminvalue),k.title.text=F(f.pyaxisname),ja&&!E.stacking100Percent?(w=e[1],V=a(w.max),w=a(w.min),void 0!==V&&void 0!==w&&(E.min=$(E.min,w),E.max=W(E.max,V)),V=na.getCleanValue(f.syaxismaxvalue),w=na.getCleanValue(f.syaxisminvalue),null!==w&&(n=null!==n?$(n,w):w),null!==V&&(l=null!==l?W(l,V):V)):ja=0;
      else{
        l=na.getCleanValue(f.yaxismaxvalue);
        n=na.getCleanValue(f.yaxisminvalue);
        if(e.isSpline)for(w=0;
        w<b.series.length;
        w++)V=Jb(b.series[w].data,e.width,b.plotOptions.series.connectNullData),
E.min=$(E.min,V.min),E.max=W(E.max,V.max);
        k.title.text=F(f.yaxisname)}
      r=a(this.isStacked?0:this.setAdaptiveYMin,f.setadaptiveymin,this.defSetAdaptiveYMin,0);
      p=K=!r;
      M=a(e.numdivlines,f.numdivlines,this.numdivlines,4);
      q=f.adjustdiv!==Ea;
      t=a(this.showYAxisValues,f.showyaxisvalues,f.showyaxisvalue,1);
      V=a(f.showyaxislimits,f.showlimits,t);
      w=a(f.showdivlinevalue,f.showdivlinevalues,t);
      h||(v=a(f.showaxislines,f.drawAxisLines,0),B=a(f.axislinethickness,1),da=a(f.axislinealpha,100),100<da&&(da=100),Y=T(c(f.axislinecolor,
"#000000"),da),k.showLine=a(f.showyaxisline,v),u=m.showLine=a(f.showxaxisline,v),C=m.lineThickness=a(f.xaxislinethickness,B),k.lineThickness=a(f.yaxislinethickness,B),G=m.lineAlpha=a(f.xaxislinealpha,da),100<G&&(G=m.lineAlpha=100),D=k.lineAlpha=a(f.yaxislinealpha,da),100<D&&(D=k.lineAlpha=100),m.lineColor=T(c(f.xaxislinecolor,Y),G),k.lineColor=T(c(f.yaxislinecolor,Y),D),b.chart.xAxisLineVisible=u&&!!C&&0<G);
      this.axisMinMaxSetter(k,E,l,n,K,p,M,q);
      this.configurePlotLines(f,b,k,E,V,w,L,e.numberFormatter,
!1);
      k.reversed&&0<=k.min&&(b.plotOptions.series.threshold=k.max);
      e.isDual&&(k=b.yAxis[1],E=e[1],V=a(f.showsecondarylimits,V),w=a(f.showdivlinesecondaryvalue,t),ja?(m=b.yAxis[0],k.min=m.min,k.max=m.max,k.tickInterval=m.tickInterval,delete E.max,delete E.min):(l=na.getCleanValue(f.syaxismaxvalue),n=na.getCleanValue(f.syaxisminvalue),r=a(f.setadaptivesymin,r),p=K=!r,this.axisMinMaxSetter(k,E,l,n,K,p,M,q)),h||(k.showLine=a(f.showsyaxisline,v),k.lineThickness=a(f.syaxislinethickness,B),h=k.lineAlpha=a(f.syaxislinealpha,
da),100<h&&(h=100),k.lineColor=T(c(f.syaxislinecolor,Y),h)),this.configurePlotLines(f,b,k,E,V,w,L,e.numberFormatter,!0),k.title.text=F(f.syaxisname))}
    ,pointValueWatcher:function(b,d,e,m,f,h,k){
      b=b[g];
      var E;
      if(null!==d)return e=a(e,0),b[e]||(b[e]={
        }
      ),e=b[e],m&&(this.distributedColumns&&(b.marimekkoTotal+=d),m=e.stack,f=a(f,0),h=a(h,0),k=c(k,ab),m[k]||(m[k]=[]),k=m[k],k[h]||(k[h]=[]),h=k[h],h[f]||(h[f]={
        }
      ),f=h[f],0<=d?f.p?(E=f.p,d=f.p+=d):f.p=d:f.n?(E=f.n,d=f.n+=d):f.n=d),e.max=e.max>d?e.max:d,e.min=
e.min<d?e.min:d,E}
    ,parseSeriesHoverOptions:function(b,d,e){
      b=d.chart.plotHoverEffects;
      d={
        enabled:c(e.showhovereffect,e.hovereffect,b.enabled)}
      ;
      d.highlight=a(e.highlightonhover,e.highlightplotonhover,b.highlight);
      d.columnHighlight=a(d.highlight,e.highlightcolumnonhover,e.highlightbaronhover,b.columnHighlight);
      d.anchorHighlight=a(d.highlight,e.highlightanchoronhover,b.anchorHighlight);
      d.anchorHighlight=a(d.highlight,e.highlightimageonhover,b.imageHighlight);
      d.bubbleHighlight=a(d.highlight,e.highlightbubbleonhover,
e.highlightbaronhover,b.bubbleHighlight);
      d.imageHoverAlpha=c(e.anchorimagehoveralpha,b.anchorImageHoverAlpha);
      d.imageHoverScale=c(e.anchorimagehoverscale,b.anchorImageHoverScale);
      d.color=c(e.hovercolor,e.bubblehovercolor,b.color);
      d.alpha=c(e.hoveralpha,b.alpha);
      d.scale=c(e.hoverscale,e.bubblehoverscale,b.scale);
      d.gradientColor=void 0!==e.hovergradientcolor?e.hovergradientcolor:b.gradientColor;
      d.ratio=c(e.hoverratio,b.ratio);
      d.angle=c(e.hoverangle,b.angle);
      d.borderColor=c(e.borderhovercolor,b.borderColor);
      
d.borderAlpha=c(e.borderhoveralpha,b.borderAlpha);
      d.borderThickness=a(e.borderhoverthickness,b.borderThickness);
      d.borderDashed=a(e.borderhoverdashed,b.borderDashed);
      d.borderDashGap=a(e.borderhoverdashgap,b.borderDashGap);
      d.borderDashLen=a(e.borderhoverdashlen,b.borderDashLen);
      d.shadow=c(e.hovershadow,b.shadow);
      d.anchorSides=c(e.anchorhoversides,b.anchorSides);
      d.anchorRadius=c(e.anchorhoverradius,b.anchorRadius);
      d.anchorScale=c(e.anchorhoverscale,b.anchorScale);
      d.anchorAlpha=c(e.anchorhoveralpha,e.hoveralpha,
b.anchorAlpha);
      d.anchorBgColor=c(e.anchorbghovercolor,e.anchorhovercolor,b.anchorBgColor);
      d.anchorBgAlpha=c(e.anchorbghoveralpha,b.anchorBgAlpha);
      d.anchorBorderColor=c(e.anchorborderhovercolor,b.anchorBorderColor);
      d.anchorBorderAlpha=c(e.anchorborderhoveralpha,b.anchorBorderAlpha);
      d.anchorBorderThickness=a(e.anchorborderhoverthickness,b.anchorBorderThickness);
      d.anchorStartAngle=c(e.anchorhoverstartangle,b.anchorStartAngle);
      d.anchorDip=c(e.anchorhoverdip,b.anchorDip);
      d.anchorAnimation=a(e.anchorhoveranimation,
b.anchorAnimation,1);
      d.negativeColor=c(e.negativehovercolor,b.negativeColor);
      d.is3DBubble=a(e.is3donhover,b.is3DBubble);
      return d}
    ,pointHoverOptions:function(d,e,g){
      var m,f,k,E={
        }
      ;
      m=e.hoverEffects;
      e=a(d.hovereffect,m&&m.enabled);
      f=!1;
      var l={
        enabled:e}
      ,n=g&&b+g.plotType.toLowerCase();
      if(void 0===e)if(this.forceHoverEnable)f=e=l.enabled=!0;
      else{
        "anchor"==n&&(f=g.imageUrl?e=l.enabled=void 0!==c(d.anchorimagehoveralpha,m.imageHoverAlpha,d.anchorimagehoverscale,m.imageHoverScale,void 0):e=l.enabled=void 0!==
c(d.hovercolor,d.anchorhovercolor,d.anchorbghovercolor,m.anchorBgColor,m.color,d.hoveralpha,d.anchorhoveralpha,m.anchorAlpha,d.bghoveralpha,d.anchorbghoveralpha,m.anchorBgAlpha,d.anchorborderhovercolor,d.borderhovercolor,m.anchorBorderColor,d.anchorborderhoverthickness,d.borderhoverthickness,m.anchorBorderThickness,d.anchorborderhoveralpha,d.borderhoveralpha,m.anchorBorderAlpha,d.hoverdip,d.anchorhoverdip,m.anchorDip,d.anchorhoverstartangle,m.anchorStartAngle,d.hoversides,d.anchorhoversides,m.anchorSides,
d.hoverradius,d.anchorhoverradius,m.anchorRadius,void 0));
        if("column"==n||"bubble"==n)f=e=l.enabled=void 0!==c(d.hoveralpha,m.alpha,d.hovergradientcolor,m.gradientColor,d.borderhovercolor,m.borderColor,d.borderhoverthickness,m.borderThickness,d.hoverratio,m.ratio,d.hoverangle,m.angle,d.borderhoveralpha,m.borderAlpha,d.borderhoverdashed,m.borderDashed,d.borderhoverdashgap,m.borderDashGap,d.borderhoverdashlen,m.borderDashLen,d.hovercolor,m.color,void 0);
        f||"bubble"!=n||(f=e=l.enabled=void 0!==c(d.negativehovercolor,
m.negativeColor,d.is3donhover,m.is3DBubble,d.hoverscale,m.scale,void 0));
        "pie"==n&&(f=e=l.enabled=void 0!==c(d.hovercolor,m.color,d.hoveralpha,m.alpha,d.borderhovercolor,m.borderColor,d.borderhoverthickness,m.borderThickness,d.borderhoveralpha,m.borderAlpha,void 0))}
      if(e){
        l.highlight=a(d.highlightonhover,m.highlight);
        l.columnHighlight=a(l.highlight,d.highlightcolumnonhover,d.highlightbaronhover);
        l.anchorHighlight=a(l.highlight,d.highlightanchoronhover);
        l.bubbleHighlight=a(l.highlight,d.highlightbubbleonhover);
        
l.alpha=c(d.hoveralpha,m.alpha,g.alpha);
        l.scale=c(d.hoverscale,m.scale,1);
        l.gradientColor=void 0===d.hovergradientcolor?m.gradientColor:d.hovergradientcolor;
        l.borderColor=c(d.borderhovercolor,m.borderColor,g.borderColor);
        l.borderThickness=a(d.borderhoverthickness,m.borderThickness,g.borderWidth);
        l.ratio=c(d.hoverratio,m.ratio,g.ratio);
        l.angle=c(d.hoverangle,m.angle,g.angle);
        l.borderAlpha=c(d.borderhoveralpha,m.borderAlpha,g.borderAlpha);
        l.borderDashed=a(d.borderhoverdashed,m.borderDashed,g.borderDashed,
0);
        l.borderDashGap=a(d.borderhoverdashgap,m.borderDashGap,g.borderDashGap);
        l.borderDashLen=a(d.borderhoverdashlen,m.borderDashLen,g.borderDashLen);
        l.shadow=c(d.hovershadow,m.shadow,0);
        l.color=c(d.hovercolor,m.color);
        "anchor"==n&&(g.imageUrl?(l.imageHoverAlpha=a(d.anchorimagehoveralpha,m.imageHoverAlpha,100),l.imageHoverScale=g.imageScale*pa(a(d.anchorimagehoverscale,m.imageHoverScale,110))*.01,l.anchorAnimation=a(d.anchorhoveranimation,m.anchorAnimation,1)):(l.anchorColor=ba(c(d.hovercolor,d.anchorhovercolor,
d.anchorbghovercolor,m.anchorBgColor,m.color,g.anchorBgColor)),l.anchorAlpha=c(d.hoveralpha,d.anchorhoveralpha,m.anchorAlpha,g.anchorAlpha),l.anchorBgAlpha=c(d.bghoveralpha,d.anchorbghoveralpha,m.anchorBgAlpha,l.anchorAlpha,g.anchorBgAlpha),l.anchorBorderColor=c(d.anchorborderhovercolor,d.borderhovercolor,m.anchorBorderColor,g.anchorBorderColor),l.anchorBorderThickness=c(d.anchorborderhoverthickness,d.borderhoverthickness,m.anchorBorderThickness,g.anchorBorderThickness),l.anchorBorderAlpha=a(d.anchorborderhoveralpha,
d.borderhoveralpha,m.anchorBorderAlpha,l.anchorAlpha,g.anchorBorderAlpha),l.anchorDip=a(d.hoverdip,d.anchorhoverdip,m.anchorDip),l.startAngle=c(d.anchorhoverstartangle,m.anchorStartAngle,g.anchorAngle),l.anchorSides=a(d.hoversides,d.anchorhoversides,m.anchorSides,g.anchorSides),l.anchorRadius=a(d.hoverradius,d.anchorhoverradius,m.anchorRadius),l.anchorScale=a(d.hoverscale,d.anchorhoverscale,m.anchorScale),l.anchorAnimation=a(d.anchorhoveranimation,m.anchorAnimation,1),void 0===l.anchorRadius&&(l.anchorRadius=
!f||l.anchorHighlight?g.anchorRadius&&g.anchorRadius+1:g.anchorRadius)));
        if(f||(l.columnHighlight||l.bubbleHighlight)&&l.color&&1==l.highlight)l.highlight=0;
        "column"==n&&(l.color=(c(l.color,g.color)+za+(void 0===l.gradientColor?g.gradientColor:l.gradientColor)).replace(/,+?$/,""));
        "pie"===n&&(l.color=c(l.color,g.color).replace(/,+?$/,""));
        "bubble"==n&&(l.negativeColor=c(d.negativehovercolor,m.negativeColor,g.negativeColor),l.is3d=a(d.is3donhover,m.is3DBubble,g.is3d),l.color=l.negativeColor&&0>d.z?
l.negativeColor:l.color||g.color,k="string"==typeof l.color,l.color=ba(k?l.color:l.color.FCcolor.color),l.color=l.is3d?sa.bubble.getPointColor(l.color,l.alpha):{
          FCcolor:{
            color:l.color,alpha:l.alpha}
          }
        );
        if(1==l.highlight&&"anchor"!==n){
          d=(k="string"==typeof l.color)?l.color.split(/\s{
            0,}
          ,\s{
            0,}
          /):l.color.FCcolor.color.split(/\s{
            0,}
          ,\s{
            0,}
          /);
          m=d.length;
          for(f=0;
          f<m;
          f++)d[f]=Da(d[f],70);
          k?l.color=d.join(","):l.color.FCcolor.color=d.join(",")}
        "pie"===n&&(E={
          color:this.getPointColor(l.color,l.alpha,g.radius3D),
alpha:l.alpha,borderColor:T(l.borderColor,l.borderAlpha),borderWidth:l.borderThickness}
        );
        "column"==n&&(l.colorArr=S(l.color,l.alpha,l.ratio,l.angle,g.isRoundEdged,l.borderColor,$(l.alpha,l.borderAlpha).toString(),g.isBar,g.is3d),l.dashStyle=l.borderDashed?h(l.borderDashLen,l.borderDashGap,l.borderThickness):"none",E={
          shadow:l.shadow,color:l.colorArr[0],borderColor:l.colorArr[1],borderWidth:l.borderThickness,use3DLighting:g.use3DLighting,dashStyle:l.dashStyle}
        );
        "anchor"==n&&(E=g.imageUrl?{
          animation:l.anchorAnimation,
imageHoverAlpha:l.imageHoverAlpha,imageHoverScale:l.imageHoverScale}
        :{
          animation:l.anchorAnimation,shadow:l.shadow,fillColor:{
            FCcolor:{
              color:l.anchorColor,alpha:l.anchorBgAlpha*l.anchorAlpha/100+b}
            }
          ,lineColor:{
            FCcolor:{
              color:l.anchorBorderColor,alpha:l.anchorBorderAlpha}
            }
          ,lineWidth:l.anchorBorderThickness,radius:l.anchorRadius,symbol:Ra(l.anchorSides),startAngle:l.startAngle,sides:l.anchorSides,scale:l.anchorScale,dip:l.anchorDip}
        );
        "bubble"==n&&(E={
          symbol:l.seriesAnchorSymbol,shadow:l.shadow,scale:l.scale,
fillColor:l.color,lineColor:{
            FCcolor:{
              color:l.borderColor,alpha:l.alpha}
            }
          ,lineWidth:l.borderThickness}
        )}
      return{
        enabled:e,options:l,rolloverOptions:E}
      }
    ,getPointStub:function(d,e,m,h){
      var f=this.dataObj.chart;
      h=h[g];
      e=null===e?e:h.numberFormatter.dataLabels(e);
      var k=p(F(c(d.tooltext,h.tooltext))),E=p(F(d.displayvalue)),f=h.showTooltip?void 0!==k?l(k,[1,2,3,5,6,7],{
        formattedValue:e,label:m,yaxisName:F(f.yaxisname),xaxisName:F(f.xaxisname)}
      ,d,f):null===e?!1:m!==b?m+h.tooltipSepChar+e:e:b;
      h=a(d.showvalue,
h.showValues)?void 0!==E?E:e:b;
      d=c(d.link);
      return{
        displayValue:h,categoryLabel:m,toolText:f,link:d}
      }
    ,updateSnapPoints:function(){
      var a=this,b=a.snapLiterals,c=function(a,b){
        var c=0;
        switch(a){
          case "startx":c=b.x;
          break;
          case "starty":c=b.y;
          break;
          case "x":case "middlex":case "centerx":c=b.x+b.width/2;
          break;
          case "y":case "middley":case "centery":c=b.y+b.height/2;
          break;
          case "endx":c=b.x+b.width;
          break;
          case "endy":c=b.y+b.height;
          break;
          default:c=0}
        return c}
      ;
      b.dataset=function(b,d){
        var e=a.renderer&&a.renderer.plots,
g,m,h,k;
        h=a.is3D;
        if(!e||!e.length)return 0;
        isNaN(b[0])?g=0:(g=Number(b[0]),b=b.slice(1));
        m=b[0];
        if("set"===m){
          isNaN(b[1])?(k=0,b=b.slice(1)):(k=Number(b[1]),b=b.slice(2));
          m=b[0];
          e=(e=e[g]&&e[g].items[k])&&e.graphic;
          if(!e)return 0;
          h=d&&h?e._getBBox2():e.getBBox();
          k=c(m,h)}
        return k}
      ;
      b.xaxis=function(b){
        var d=a.renderer&&a.renderer.xAxis&&a.renderer.xAxis[0]&&a.renderer.xAxis[0].labels,e,g;
        if(!d||!d.length)return 0;
        g=b[0];
        if("label"===g){
          isNaN(b[1])?(e=0,b=b.slice(1)):(e=Number(b[1]),b=b.slice(2));
          g=
b[0];
          b=d[e];
          if(!b)return 0;
          b=b.getBBox();
          e=c(g,b)}
        return e}
      ;
      b.yaxis=function(b){
        var d=a.renderer&&a.renderer.yAxis,e,g;
        if(!d||!d.length)return 0;
        isNaN(b[0])?e=0:(e=Number(b[0]),b=b.slice(1));
        e=d[e];
        if(!e)return 0;
        d=b[0];
        if("label"===d){
          g=e.labels;
          isNaN(b[1])?(e=0,b=b.slice(1)):(e=Number(b[1]),b=b.slice(2));
          d=b[0];
          b=g[e];
          if(!b)return 0;
          b=b.getBBox();
          g=c(d,b)}
        return g}
      }
    }
  ,sa.base);
  sa("multiseries",{
    series:function(b,c,d){
      var e,f,m=c[g],h,k;
      c.legend.enabled=Boolean(a(b.chart.showlegend,1));
      if(b.dataset&&
0<b.dataset.length){
        this.categoryAdder(b,c);
        e=0;
        for(f=b.dataset.length;
        e<f;
        e+=1)h=b.dataset[e],k={
          hoverEffects:this.parseSeriesHoverOptions(b,c,h,d),visible:!a(h.initiallyhidden,0),data:[]}
        ,this.isStacked||(k.numColumns=f),h=this.point(d,k,h,b.chart,c,m.oriCatTmp.length,e),h instanceof Array?c.series=c.series.concat(h):c.series.push(h);
        this.configureAxis(c,b);
        b.trendlines&&!this.isLog&&N(b.trendlines,c.yAxis,m,!1,this.isBar,void 0,this.inversed)}
      }
    ,categoryAdder:function(c,d){
      var e,m=0,f=d[g],h=f.axisGridManager,
k=c.chart,l=d.xAxis,E,f=f.x,n,K,p,M;
      if(c.categories&&c.categories[0]&&c.categories[0].category)for(c.categories[0].font&&(d.xAxis.labels.style.fontFamily=c.categories[0].font),void 0!==(e=a(c.categories[0].fontsize))&&(1>e&&(e=1),d.xAxis.labels.style.fontSize=e+Ga,r(d.xAxis.labels.style)),c.categories[0].fontcolor&&(d.xAxis.labels.style.color=c.categories[0].fontcolor.split(za)[0].replace(/^\#?/,"#")),K=d[g].oriCatTmp,p=c.categories[0].category,e=0;
      e<p.length;
      e+=1)p[e].vline?h.addVline(l,p[e],m,d):
(n=a(p[e].showlabel,k.showlabels,1),M=c.categories[0].category[e],E=F(t(M.label,M.name)),h.addXaxisCat(l,m,m,n?E:b,{
        }
      ,M,k),K[m]=t(F(M.tooltext),E),m+=1);
      f.catCount=m}
    ,getPointStub:function(d,e,m,h,f,k,E,n,K,r){
      var M=this.dataObj.chart,q=this.isDual,w=this.isXY,V=this.isMLAxis,v=this.isStacked,u=this.isErrorChart,Y;
      h=h[g];
      var B,C,da=null===e?e:this.numberFormatter.dataLabels(e,E),G,na=p(F(c(d.tooltext,f.plottooltext,h.tooltext))),D=h.tooltipSepChar,ja,L={
        }
      ,J,ca,N,Xa,Va,P,ra,Ha,ma;
      u&&(ca=null===n?n:
this.numberFormatter.dataLabels(n,E),P=null===e?b:this.numberFormatter.percentValue(n/e*100),ja=[1,2,3,4,5,6,7,99,100,101,102],e={
        yaxisName:Xa=F(q?E?M.syaxisname:M.pyaxisname:M.yaxisname),xaxisName:Va=F(M.xaxisname),formattedValue:da,label:m,errorDataValue:ca,errorPercentValue:P}
      ,w?(N=null===K?K:this.numberFormatter.xAxis(K),ra=null===r?b:this.numberFormatter.percentValue(K/r*100),ja.push(103,104,105,106,107,108,109,110),ma=c(d.horizontalerrorvalue,d.errorvalue),e.errorValue=Ha=c(d.verticalerrorvalue,
d.errorvalue),r=p(F(c(d.verticalerrorplottooltext,d.errorplottooltext,f.verticalerrorplottooltext,f.errorplottooltext,M.verticalerrorplottooltext,M.errorplottooltext))),null!==n&&(e.verticalErrorDataValue=ca,e.verticalErrorPercentValue=P,e.verticalErrorValue=Ha),null!==K&&(e.horizontalErrorDataValue=N,e.horizontalErrorPercentValue=ra,e.horizontalErrorValue=ma),J=p(F(c(d.horizontalerrorplottooltext,d.errorplottooltext,f.horizontalerrorplottooltext,f.errorplottooltext,M.horizontalerrorplottooltext,
M.errorplottooltext))),L._hErrortoolText=h.showTooltip?void 0!==J?l(J,ja,{
        yaxisName:Xa=F(q?E?M.syaxisname:M.pyaxisname:M.yaxisname),xaxisName:Va=F(M.xaxisname),formattedValue:da,label:m,errorDataValue:N,errorPercentValue:ra,errorValue:ma,verticalErrorDataValue:ca,verticalErrorPercentValue:P,verticalErrorValue:Ha,horizontalErrorDataValue:N,horizontalErrorPercentValue:ra,horizontalErrorValue:ma}
      ,d,M,f):null===n?!1:N:!1):(r=p(F(c(d.errorplottooltext,f.errorplottooltext,M.errorplottooltext))),e.errorValue=
Ha=c(d.errorvalue)),L._errortoolText=h.showTooltip?void 0!==r?l(r,ja,e,d,M,f):null===n?!1:ca:!1);
      h.showTooltip?void 0!==na?(v=[4,5,6,7],E={
        yaxisName:Xa||F(q?E?M.syaxisname:M.pyaxisname:V?f._yAxisName:M.yaxisname),xaxisName:Va||F(M.xaxisname)}
      ,w?(v.push(8,9,10,11),E.yDataValue=da,E.xDataValue=m,u&&(v.push(103,104,105,106,107,108,109,110),null!==n&&(E.verticalErrorDataValue=ca,E.verticalErrorPercentValue=P,E.verticalErrorValue=Ha),null!==K&&(E.horizontalErrorDataValue=N,E.horizontalErrorPercentValue=
ra,E.horizontalErrorValue=ma))):(v.push(1,2,3),E.formattedValue=da,E.label=m,u&&(v.push(99,100,101,102),E.errorValue=Ha,null!==n&&(E.errorDataValue=ca,E.errorPercentValue=P))),f=l(na,v,E,d,M,f)):null===da?f=!1:(h.seriesNameInToolTip&&(G=t(f&&f.seriesname)),f=G?G+D:b,f+=m?m+D:b,h.showPercentInToolTip&&v?(C=!0,f+="$percentValue"):f+=da):f=!1;
      a(d.showvalue,k)?void 0!==p(d.displayvalue)?Y=F(d.displayvalue):h.showPercentValues?B=!0:Y=da:Y=b;
      L.link=c(d.link);
      L.displayValue=Y;
      L.categoryLabel=m;
      L.toolText=
f;
      L.showPercentValues=B;
      L.showPercentInToolTip=C;
      return L}
    }
  ,sa.singleseries);
  sa("xybase",{
    hideRLine:function(){
      var a=this.chart.series[this.index+1];
      a&&a.hide&&a.hide()}
    ,showRLine:function(){
      var a=this.chart.series[this.index+1];
      a&&a.show&&a.show()}
    ,getRegressionLineSeries:function(a,b,c){
      var d,f,e,g;
      g=a.sumXY;
      var m=a.sumX,h=a.sumY;
      f=a.xValues;
      e=a.sumXsqure;
      d=a.yValues;
      a=a.sumYsqure;
      b?(f.sort(ub),d=f[0],f=f[f.length-1],g=(c*g-m*h)/(c*e-Q(m,2)),e=isNaN(g)?h/c:g*(d-m/c)+h/c,c=isNaN(g)?h/c:g*(f-m/c)+
h/c,c=[{
        x:d,y:e}
      ,{
        x:f,y:c}
      ]):(d.sort(ub),e=d[0],d=d[d.length-1],g=(c*g-m*h)/(c*a-Q(h,2)),f=isNaN(g)?m/c:g*(e-h/c)+m/c,c=isNaN(g)?m/c:g*(d-h/c)+m/c,c=[{
        x:f,y:e}
      ,{
        x:c,y:d}
      ]);
      return c}
    ,pointValueWatcher:function(a,b,c,d){
      var f=a[g];
      null!==b&&(a=f[0],a.max=a.max>b?a.max:b,a.min=a.min<b?a.min:b);
      null!==c&&(a=f.x,a.max=a.max>c?a.max:c,a.min=a.min<c?a.min:c);
      d&&(c=c||0,b=b||0,d.sumX+=c,d.sumY+=b,d.sumXY+=c*b,d.sumXsqure+=Q(c,2),d.xValues.push(c),d.sumYsqure+=Q(b,2),d.yValues.push(b))}
    }
  ,sa.multiseries);
  sa("scrollbase",
{
    postSeriesAddition:function(){
      var b=this.hcJSON,d=b.xAxis.scroll,e=b[g],m=e.width,f=e.x.catCount,h=this.dataObj.chart,k=this.colorManager,l,E,n,K,M,p;
      e.isScroll=!0;
      b.chart.hasScroll=!0;
      if(this.isStacked)l=1;
      else{
        E=l=0;
        K=b.series;
        p=b.chart.defaultSeriesType;
        for(n=K.length;
        E<n;
        E++)M=c(K[E].type,p),"column"===M&&(l+=1);
        1>l&&(l=1)}
      f*=l;
      m=a(h.numvisibleplot,fa(m/this.avgScrollPointWidth));
      d&&2<=m&&m<f&&(d.enabled=!0,d.vxLength=m/l,d.startPercent=$(1,W(0,parseFloat(h.scrolltoend)||0)),d.padding=a(h.scrollpadding,
0),d.height=a(h.scrollheight,16),d.showButtons=!!a(h.scrollshowbuttons,1),d.buttonPadding=a(h.scrollbtnpadding,0),d.color=ba(c(h.scrollcolor,k.getColor("altHGridColor"))),e.marginBottomExtraSpace+=d.padding+d.height);
      if(Xa||a(h.enabletouchscroll,0))b.chart.zoomType="x",b.chart.nativeZoom=!1,b.chart.selectionMarkerFill="rgba(255,255,255,0)",(b.callbacks||(b.callbacks=[])).push(function(a){
        w(a,"selectionstart selectiondrag",sa.scrollbase.performTouchScroll,{
          }
        )}
      )}
    ,performTouchScroll:function(a){
      var b=
this.xAxis[0].scroller,c=b.config,c=c.trackLength/(c.width/c.scrollRatio)*(a.chartX||1);
      !0!==a.isOutsidePlot&&ca(b.elements.anchor.element,"selectionstart"===a.type?"dragstart":"drag",{
        pageX:-c,pageY:-a.chartY}
      )}
    }
  ,sa.multiseries);
  sa("logbase",{
    isLog:!0,isValueAbs:!0,configureAxis:function(e,m){
      var h=e[g],k=h.axisGridManager,f=this.numberFormatter,l=e.series,E=e.xAxis,n=e.yAxis[0],K=h[0],M=m.chart,p=!a(M.showyaxislimits,M.showlimits,M.showyaxisvalues,1),r=!a(M.showdivlinevalues,M.showyaxisvalues,1),
q=a(M.base,M.logbase,10),t=a(M.yaxismaxvalue),w=a(M.yaxisminvalue),V=this.colorManager,v=1===a(M.showminordivlinevalues),u=c(M.minordivlinecolor,n.gridLineColor,V.getColor("divLineColor")),Y=a(M.minordivlinealpha,M.divlinealpha,V.getColor("divLineAlpha")),V=[n,void 0,void 0,a(M.divlinethickness,2),n.gridLineDashStyle,n.gridLineColor,2],u=[n,void 0,void 0,a(M.minordivlinethickness,1),n.gridLineDashStyle,T(c(M.minordivlinecolor,u),a(M.minordivlinealpha,Y/2)),2],Y=v||Y&&u[3],B=a(M.showaxislimitgridlines,
this.showAxisLimitGridLines),C=a(B,this.is3D||e.chart.plotBorderWidth?0:1),da,G;
      0>=q&&(q=10);
      0>=t&&(t=void 0);
      0>=w&&(w=void 0);
      t=this.getLogAxisLimits(K.max||q,K.min||1,t,w,q,Y?M.numminordivlines:0);
      E.title.text=F(M.xaxisname);
      E.showLine=a(M.showxaxisline,M.showaxislines,0);
      E.lineThickness=a(M.xaxislinethickness,M.axislinethickness,1);
      E.lineAlpha=a(M.xaxislinealpha,M.axislinealpha,100);
      E.lineColor=T(c(M.xaxislinecolor,M.axislinecolor,"000"));
      d(n,{
        title:{
          text:F(M.yaxisname)}
        ,labels:{
          enabled:!1}
        ,gridLineWidth:0,
alternateGridColor:xa,reversed:"1"===M.invertyaxis,max:na(t.Max,q),min:na(t.Min,q),showLine:a(M.showyaxisline,M.showaxislines,0),lineThickness:a(M.yaxislinethickness,M.axislinethickness,1),lineAlpha:a(M.yaxislinealpha,M.axislinealpha,100),lineColor:T(c(M.yaxislinecolor,M.axislinecolor,"000"))}
      );
      for(M=l.length;
      M--;
      )if(w=l[M])for(w.threshold=n.min,G=(w=w.data)&&w.length||0;
      G--;
      )da=w[G],da.y=na(da.y,q);
      delete K.max;
      delete K.min;
      K.isLog=!0;
      n.reversed&&0<=n.min&&(e.plotOptions.series.threshold=n.max);
      
m.trendlines&&N(m.trendlines,[{
        max:t.Max,min:t.Min,plotLines:n.plotLines,plotBands:n.plotBands,title:n.title}
      ],h);
      for(M=n.plotLines.length;
      M--;
      )da=n.plotLines[M],da.value&&(da.value=na(da.value,q)),da.from&&(da.from=na(da.from,q)),da.to&&(da.to=na(da.to,q));
      for(M=n.plotBands.length;
      M--;
      )da=n.plotBands[M],da.from&&(da.from=na(da.from,q)),da.to&&(da.to=na(da.to,q));
      for(M=t.divArr.length;
      M--;
      ){
        da=t.divArr[M];
        if(da.ismajor)V[1]=na(da.value,q),V[2]=f.yAxis(da.value),k.addAxisGridLine.apply(k,V);
        else if(Y||
da.isextreme)u[1]=na(da.value,q),u[2]=v||da.isextreme?f.yAxis(da.value):b,k.addAxisGridLine.apply(k,u);
        w=n.plotLines[n.plotLines.length-1];
        da.isextreme?(w.width=B||C&&(!da.isMin||!E.showLine)?w.width:.1,p&&(w.label.text=b)):r&&w.label&&(w.label.text=b)}
      }
    ,getLogAxisLimits:function(a,b,c,d,f,e){
      var g=function(a){
        return null===a||void 0===a||""===a||isNaN(a)?!1:!0}
      ,m=0,h=[],k,l,E,n,M,K,p,r;
      g(c)&&Number(c)>=a?a=Number(c):(c=1<f?Ca(la(a)/la(f)):fa(la(a)/la(f)),a=Q(f,c),l=c);
      l||(l=1<f?Ca(la(a)/la(f)):fa(la(a)/
la(f)));
      g(d)&&Number(d)<=b?b=Number(d):(c=1<f?fa(la(b)/la(f)):Ca(la(b)/la(f)),b=Q(f,c),k=c);
      k||(k=1<f?fa(la(b)/la(f)):Ca(la(b)/la(f)));
      d=Number(String(la(f)/la(10)));
      e=Number(e)||(fa(d)==d?8:4);
      1<f?(E=l,n=k):0<f&&1>f&&(E=k,n=l);
      d=l;
      for(k=E;
      k>=n;
      --k)if(E=Q(f,d),b<=E&&a>=E&&(h[m++]={
        value:E,ismajor:!0}
      ),k!=n){
        l=1<f?-1:1;
        E=Q(f,d)-Q(f,d+l);
        c=E/(e+1);
        for(g=1;
        g<=e;
        ++g)E=Q(f,d+l)+c*g,b<=E&&a>=E&&(h[m++]={
          value:E,ismajor:!1}
        );
        1<f?d--:d++}
      for(p in h)for(r in h[p])"value"==r&&(M||(M=h[p][r]==b&&(h[p].isextreme=
h[p].isMin=!0)),K||(K=h[p][r]==a&&(h[p].isextreme=h[p].isMax=!0)));
      M||(h[m++]={
        value:b,ismajor:!0,isMin:!0,isextreme:!0}
      );
      K||(h[m]={
        value:a,ismajor:!0,isMax:!0,isextreme:!0}
      );
      return{
        Max:a,Min:b,divArr:h}
      }
    ,pointValueWatcher:function(b,c,d){
      b=b[g];
      d=a(d,0);
      0<c&&(b[d]||(b[d]={
        }
      ),d=b[d],d.max=d.max>c?d.max:c,d.min=d.min<c?d.min:c)}
    }
  ,sa.mslinebase);
  hb=sa.singleseries;
  La=sa.multiseries;
  sa("column2dbase",{
    point:function(e,m,k,l,f){
      var E=k.length,n=f[g],M=n.axisGridManager,K=f.xAxis,n=n.x,p=this.colorManager,
r=/3d$/.test(f.chart.defaultSeriesType),q=this.isBar,w=/^spark/i.test(e);
      e=c(l.showplotborder,w||r?Ea:db)===db?r?1:a(l.plotborderthickness,1):0;
      var V=f.chart.useRoundEdges,v=a(l.plotborderalpha,l.plotfillalpha,100),u=c(l.plotbordercolor,p.getColor("plotBorderColor")).split(za)[0],w=w?"":a(l.useplotgradientcolor,1)?U(l.plotgradientcolor,p.getColor("plotGradientColor")):b,Y=0,B=Boolean(a(l.use3dlighting,1)),da=f[g].numberFormatter,C,G=a(l.plotborderdashed,0),na=a(l.plotborderdashlen,5),D=a(l.plotborderdashgap,
4),L,ja,ca,J,N,Xa,Va,P,ra,Ha,ma,Ka,ta,Wa;
      for(ca=0;
      ca<E;
      ca+=1)ta=k[ca],ta.vline?M.addVline(K,ta,Y,f):(ja=da.getCleanValue(ta.value),C=a(ta.showlabel,l.showlabels,1),J=F(t(ta.label,ta.name)),L=c(ta.color,p.getPlotColor()),N=c(ta.alpha,l.plotfillalpha,$a),Xa=c(ta.ratio,l.plotfillratio),Va=c(360-l.plotfillangle,q?180:90),P=c(ta.alpha,v),ra=a(ta.dashed,G),Ha=c(ta.dashgap,D),ma=c(ta.dashlen,na),M.addXaxisCat(K,Y,Y,C?J:b,ta,{
        }
      ,l,L),Y+=1,0>ja&&(Va=q?180-Va:360-Va),Wa={
        opacity:N/100}
      ,Ka=S(L+za+w.replace(/,+?$/,
""),N,Xa,Va,V,u,P+b,q,r),C=ra?h(ma,Ha,e):"none",L=this.pointHoverOptions(ta,m,{
        plotType:"column",is3d:r,isBar:q,use3DLighting:B,isRoundEdged:V,color:L,gradientColor:w,alpha:N,ratio:Xa,angle:Va,borderWidth:e,borderColor:u,borderAlpha:P,borderDashed:ra,borderDashGap:Ha,borderDashLen:ma,shadow:Wa}
      ),m.data.push(d(this.getPointStub(ta,ja,J,f),{
        y:ja,shadow:Wa,color:Ka[0],borderColor:Ka[1],borderWidth:e,use3DLighting:B,dashStyle:C,tooltipConstraint:this.tooltipConstraint,hoverEffects:L.enabled&&L.options,
rolloverProperties:L.enabled&&L.rolloverOptions}
      )),this.pointValueWatcher(f,ja));
      n.catCount=Y;
      return m}
    ,defaultSeriesType:"column"}
  ,hb);
  sa("linebase",{
    defaultSeriesType:"line",hasVDivLine:!0,defaultPlotShadow:1,point:function(e,m,k,l,f){
      var E,n,M,K,p,r,q,w,V,v,u,Y,B,da,C,G,na,D,L,ja,ca,J,N,Va,Xa,P;
      e=f.chart;
      var ra=k.length,Ha=f.xAxis;
      E=f[g];
      var ma=this.colorManager,ta,Ka=E.axisGridManager,Wa=0,Ma=E.x,mb=f[g].numberFormatter,ia,R,Fa;
      da=ba(c(l.linecolor,l.palettecolors,ma.getColor("plotFillColor")));
      
C=c(l.linealpha,$a);
      u=a(l.linethickness,this.lineThickness,4);
      Y=Boolean(a(l.linedashed,0));
      q=a(l.linedashlen,5);
      w=a(l.linedashgap,4);
      Xa=a(l.anchorshadow,0);
      m.color={
        FCcolor:{
          color:da,alpha:C}
        }
      ;
      m.lineWidth=u;
      m.anchorShadow=Xa;
      m.step=c(this.stepLine,m.step);
      m.drawVerticalJoins=Boolean(a(m.drawVerticalJoins,l.drawverticaljoins,1));
      m.useForwardSteps=Boolean(a(m.useForwardSteps,l.useforwardsteps,1));
      B=a(l.drawanchors,l.showanchors);
      for(n=0;
      n<ra;
      n+=1)K=k[n],K.vline?Ka.addVline(Ha,K,Wa,f):(E=mb.getCleanValue(K.value),
p=a(K.showlabel,l.showlabels,1),M=F(t(K.label,K.name)),Ka.addXaxisCat(Ha,Wa,Wa,p?M:b,K,{
        }
      ,l),Wa+=1,V=ba(c(K.color,da)),v=a(K.alpha,C),p=a(K.dashed,Y)?h(q,w,u):"none",r={
        opacity:v/100}
      ,na=a(K.anchorsides,l.anchorsides,0),Va=a(K.anchorstartangle,l.anchorstartangle,90),ja=a(K.anchorradius,l.anchorradius,this.anchorRadius,3),L=ba(c(K.anchorbordercolor,l.anchorbordercolor,da)),D=a(K.anchorborderthickness,l.anchorborderthickness,this.anchorBorderThickness,1),ca=ba(c(K.anchorbgcolor,l.anchorbgcolor,ma.getColor("anchorBgColor"))),
J=c(K.anchoralpha,l.anchoralpha,$a),N=c(K.anchorbgalpha,l.anchorbgalpha,J),ia=c(K.anchorimageurl,l.anchorimageurl),R=c(K.anchorimagescale,l.anchorimagescale,100),Fa=c(K.anchorimagealpha,l.anchorimagealpha,100),G=void 0===B?0!==v:!!B,P=Boolean(a(K.anchorshadow,Xa,0)),ta=this.pointHoverOptions(K,m,{
        plotType:"anchor",anchorBgColor:ca,anchorAlpha:J,anchorBgAlpha:N,anchorAngle:Va,anchorBorderThickness:D,anchorBorderColor:L,anchorBorderAlpha:J,anchorSides:na,anchorRadius:ja,imageUrl:ia,imageScale:R,imageAlpha:Fa,
shadow:r}
      ),m.data.push(d(this.getPointStub(K,E,M,f),{
        y:E,color:{
          FCcolor:{
            color:V,alpha:v}
          }
        ,shadow:r,dashStyle:p,valuePosition:c(K.valueposition,e.valuePosition),marker:{
          enabled:!!G,shadow:P&&{
            opacity:J/100}
          ,fillColor:{
            FCcolor:{
              color:ca,alpha:N*J/100+b}
            }
          ,lineColor:{
            FCcolor:{
              color:L,alpha:J}
            }
          ,lineWidth:D,radius:ja,startAngle:Va,symbol:Ra(na),imageUrl:ia,imageScale:R,imageAlpha:Fa}
        ,tooltipConstraint:this.tooltipConstraint,hoverEffects:ta.enabled&&ta.options,rolloverProperties:ta.enabled&&ta.rolloverOptions}
      )),
this.pointValueWatcher(f,E));
      Ma.catCount=Wa;
      return m}
    ,defaultZeroPlaneHighlighted:!1}
  ,hb);
  sa("area2dbase",{
    defaultSeriesType:"area",hasVDivLine:!0,parseAnchorVisibility:function(b,d,e){
      var g=a(b.drawanchors,d.drawanchors,d.showanchors);
      return R(g)?g:R(c(b.anchorsides,d.anchorsides,b.anchorstartangle,d.anchorstartangle,b.anchorradius,d.anchorradius,b.anchorbordercolor,d.anchorbordercolor,b.anchorborderthickness,d.anchorborderthickness,b.anchorbgcolor,d.anchorbgcolor,b.anchoralpha,d.anchoralpha,b.anchorbgalpha,
d.anchorbgalpha,b.anchorshadow,d.anchorshadow))||e}
    ,point:function(e,m,k,l,f){
      e=f.chart;
      var E=k.length,n=f.xAxis,M=f[g],K=M.axisGridManager,M=M.x,r=f[g].numberFormatter,q=this.colorManager,w=0,V,v,u,Y,B,da,C,G,na,D,L,ja,ca,J,N,Va,Xa,P,ra,Ha,ma,ta,Ka,Wa,Ma,mb,ia,R,Fa;
      B=c(l.plotfillcolor,l.areabgcolor,p(l.palettecolors)?q.getPlotColor(0):q.getColor("plotFillColor")).split(/\s*\,\s*/)[0];
      ma=za+(a(l.useplotgradientcolor,1)?U(l.plotgradientcolor,q.getColor("plotGradientColor")):b);
      da=c(l.plotfillalpha,
l.areaalpha,this.isStacked?$a:"90");
      C=a(l.plotfillangle,270);
      G=c(l.plotbordercolor,l.areabordercolor,p(l.palettecolors)?q.getPlotColor(0):q.getColor("plotBorderColor")).split(/\s*\,\s*/)[0];
      na=l.showplotborder==Ea?Ea:c(l.plotborderalpha,l.plotfillalpha,l.areaalpha,$a);
      V=a(l.plotborderangle,270);
      v=Boolean(a(l.plotborderdashed,0));
      u=a(l.plotborderdashlen,5);
      ca=a(l.plotborderdashgap,4);
      Xa=a(l.plotborderthickness,l.areaborderthickness,1);
      ta=m.fillColor={
        FCcolor:{
          color:B+ma.replace(/,+?$/,""),alpha:da,
ratio:nb,angle:C}
        }
      ;
      m.lineWidth=Xa;
      m.dashStyle=v?h(u,ca,Xa):"none";
      m.lineColor={
        FCcolor:{
          color:G,alpha:na,ratio:$a,angle:V}
        }
      ;
      m.step=c(this.stepLine,m.step);
      m.drawVerticalJoins=Boolean(a(m.drawVerticalJoins,l.drawverticaljoins,1));
      m.useForwardSteps=Boolean(a(m.useForwardSteps,l.useforwardsteps,1));
      Xa=Boolean(a(l.drawanchors,l.showanchors,1));
      Ma=Boolean(this.parseAnchorVisibility({
        }
      ,l,0));
      m.anchorShadow=Ka=a(l.anchorshadow,0);
      for(v=0;
      v<E;
      v+=1)ca=k[v],ca.vline?K.addVline(n,ca,w,f):(V=r.getCleanValue(ca.value),
Y=a(ca.showlabel,l.showlabels,1),u=F(t(ca.label,ca.name)),K.addXaxisCat(n,w,w,Y?u:b,ca,{
        }
      ,l),w+=1,Y=a(ca.anchorsides,l.anchorsides,0),ja=a(ca.anchorstartangle,l.anchorstartangle,90),D=a(ca.anchorradius,l.anchorradius,3),L=ba(c(ca.anchorbordercolor,l.anchorbordercolor,G)),P=a(ca.anchorborderthickness,l.anchorborderthickness,1),J=ba(c(ca.anchorbgcolor,l.anchorbgcolor,q.getColor("anchorBgColor"))),N=c(ca.anchoralpha,l.anchoralpha,this.anchorAlpha,Ma?$a:0),Va=c(ca.anchorbgalpha,l.anchorbgalpha,N),Wa=
Boolean(a(ca.anchorshadow,Ka,0)),ra=p(ca.color),Ha=a(ca.alpha),ra=void 0!==ra||void 0!==Ha?{
        FCcolor:{
          color:ra?ba(ra)+ma:B,alpha:void 0===Ha?ga(Ha)+b:da,ratio:nb,angle:C}
        }
      :ta,mb=c(ca.anchorimageurl,l.anchorimageurl),ia=c(ca.anchorimagescale,l.anchorimagescale,100),R=c(ca.anchorimagealpha,l.anchorimagealpha,100),Ha={
        opacity:W(Ha,na)/100,inverted:!0}
      ,Fa=this.pointHoverOptions(ca,m,{
        plotType:"anchor",anchorBgColor:J,anchorAlpha:N,anchorBgAlpha:Va,anchorAngle:ja,anchorBorderThickness:P,anchorBorderColor:L,
anchorBorderAlpha:N,anchorSides:Y,anchorRadius:D,imageUrl:mb,imageScale:ia,imageAlpha:R,shadow:Ha}
      ),m.data.push(d(this.getPointStub(ca,V,u,f),{
        y:V,shadow:Ha,color:ra,valuePosition:c(ca.valueposition,e.valuePosition),marker:{
          enabled:Xa,shadow:Wa&&{
            opacity:N/100}
          ,fillColor:{
            FCcolor:{
              color:J,alpha:Va*N/100+b}
            }
          ,lineColor:{
            FCcolor:{
              color:L,alpha:N}
            }
          ,lineWidth:P,radius:D,symbol:Ra(Y),startAngle:ja,imageUrl:mb,imageScale:ia,imageAlpha:R}
        ,tooltipConstraint:this.tooltipConstraint,previousY:this.pointValueWatcher(f,
V),hoverEffects:Fa.enabled&&Fa.options,rolloverProperties:Fa.enabled&&Fa.rolloverOptions}
      )));
      M.catCount=w;
      return m}
    }
  ,hb);
  sa("mscolumn2dbase",{
    point:function(d,e,m,h,f,l,k,E,n){
      d=a(h.ignoreemptydatasets,0);
      var M=!1,K=m.data||[],r=f[g],q=c(e.type,this.defaultSeriesType),t=c(e.isStacked,f.plotOptions[q]&&f.plotOptions[q].stacking),w=c(this.isValueAbs,r.isValueAbs,!1),V=a(e.yAxis,0),v=f[g].numberFormatter,u=this.colorManager,Y=u.getPlotColor(),B,da=f._FCconf.isBar,C=e.hoverEffects;
      t||(e.columnPosition=
a(n,E,k));
      e.name=p(m.seriesname);
      if(0===a(m.includeinlegend)||void 0===e.name)e.showInLegend=!1;
      e.color=c(m.color,Y).split(za)[0].replace(/^#?/g,"#");
      k=/3d$/.test(f.chart.defaultSeriesType);
      n=c(360-h.plotfillangle,da?180:90);
      0>B&&(n=360-n);
      m=e._dataParser=ia.column(f,{
        seriesname:e.name,plottooltext:m.plottooltext,color:c(m.color,Y),alpha:c(m.alpha,h.plotfillalpha,$a),plotgradientcolor:a(h.useplotgradientcolor,1)?U(h.plotgradientcolor,u.getColor("plotGradientColor")):b,ratio:c(m.ratio,h.plotfillratio),
fillAangle:n,isRoundEdges:f.chart.useRoundEdges,plotBorderColor:c(h.plotbordercolor,k?gb:u.getColor("plotBorderColor")).split(za)[0],plotBorderAlpha:h.showplotborder==Ea||k&&h.showplotborder!=db?Ea:c(h.plotborderalpha,$a),isBar:this.isBar,is3d:k,dashed:a(m.dashed,h.plotborderdashed,0),dashLen:a(m.dashlen,h.plotborderdashlen,5),dashGap:a(m.dashgap,h.plotborderdashgap,4),borderWidth:a(h.plotborderthickness,db),showValues:a(m.showvalues,r.showValues),yAxis:V,use3DLighting:a(h.use3dlighting,1),_sourceDataset:m,
hoverEffects:C}
      ,this);
      for(h=0;
      h<l;
      h+=1)(r=K[h])?(B=v.getCleanValue(r.value,w),null===B?e.data.push({
        y:null}
      ):(M=!0,r=m(r,h,B),e.data.push(r),r.previousY=this.pointValueWatcher(f,B,V,t,h,E,q))):e.data.push({
        y:null}
      );
      !d||M||this.realtimeEnabled||(e.showInLegend=!1);
      return e}
    ,defaultSeriesType:"column"}
  ,La);
  sa("mslinebase",{
    hasVDivLine:!0,point:function(d,e,m,h,f,l){
      d=a(h.ignoreemptydatasets,0);
      var k=!1,E=this.colorManager,n,M;
      n=f.chart;
      var K=m.data||[];
      M=f[g];
      var r=c(e.type,this.defaultSeriesType),
q=c(e.isStacked,f.plotOptions[r]&&f.plotOptions[r].stacking),t=c(this.isValueAbs,M.isValueAbs,!1),w=a(e.yAxis,0),V=this.numberFormatter,v=ba(c(m.color,h.linecolor,E.getPlotColor())),u=a(m.alpha,h.linealpha,$a),Y=a(h.showshadow,this.defaultPlotShadow,1),B=a(m.drawanchors,m.showanchors,h.drawanchors,h.showanchors),da=a(m.anchorsides,h.anchorsides,0),C=a(m.anchorstartangle,h.anchorstartangle,90),F=a(m.anchorradius,h.anchorradius,3),G=ba(c(m.anchorbordercolor,h.anchorbordercolor,v)),na=a(m.anchorborderthickness,
h.anchorborderthickness,1),E=ba(c(m.anchorbgcolor,h.anchorbgcolor,E.getColor("anchorBgColor"))),D=c(m.anchoralpha,h.anchoralpha,$a),L=c(m.anchorbgalpha,h.anchorbgalpha,D),ca=D&&c(m.anchorshadow,h.anchorshadow,0),ja=e.hoverEffects;
      e.name=p(m.seriesname);
      if(0===a(m.includeinlegend)||void 0===e.name||0===u&&1!==B)e.showInLegend=!1;
      e.marker={
        enabled:Boolean(a(B,1)),fillColor:{
          FCcolor:{
            color:E,alpha:L*D/100+b}
          }
        ,lineColor:{
          FCcolor:{
            color:G,alpha:D+b}
          }
        ,lineWidth:na,radius:F,symbol:Ra(da),startAngle:C}
      ;
      e.color=
{
        FCcolor:{
          color:v,alpha:u}
        }
      ;
      e.shadow=Y?{
        opacity:Y?u/100:0}
      :!1;
      e.anchorShadow=ca;
      e.step=c(this.stepLine,e.step);
      e.drawVerticalJoins=Boolean(a(e.drawVerticalJoins,h.drawverticaljoins,1));
      e.useForwardSteps=Boolean(a(e.useForwardSteps,h.useforwardsteps,1));
      e.lineWidth=a(m.linethickness,h.linethickness,2);
      n=e._dataParser=ia.line(f,{
        seriesname:e.name,plottooltext:m.plottooltext,lineAlpha:u,anchorAlpha:D,showValues:a(m.showvalues,M.showValues),yAxis:w,lineDashed:Boolean(a(m.dashed,h.linedashed,0)),lineDashLen:a(m.linedashlen,
h.linedashlen,5),lineDashGap:a(m.linedashgap,h.linedashgap,4),lineThickness:e.lineWidth,lineColor:v,valuePosition:c(m.valueposition,n.valuePosition),drawAnchors:B,anchorBgColor:E,anchorBgAlpha:L,anchorBorderColor:G,anchorBorderThickness:na,anchorRadius:F,anchorSides:da,anchorAngle:C,anchorShadow:e.anchorShadow,anchorStartAngle:a(m.anchorstartangle,h.anchorstartangle),_sourceDataset:m,hoverEffects:ja,imageUrl:c(m.anchorimageurl,h.anchorimageurl),imageScale:c(m.anchorimagescale,h.anchorimagescale,100),
imageAlpha:c(m.anchorimagealpha,h.anchorimagealpha,100)}
      ,this);
      for(h=0;
      h<l;
      h+=1)(M=K[h])?(m=V.getCleanValue(M.value,t),null===m?e.data.push({
        y:null}
      ):(k=!0,M=n(M,h,m),e.data.push(M),M.previousY=this.pointValueWatcher(f,m,w,q,h,0,r))):e.data.push({
        y:null}
      );
      !d||k||this.realtimeEnabled||(e.showInLegend=!1);
      return e}
    ,defaultSeriesType:"line",defaultPlotShadow:1,defaultZeroPlaneHighlighted:!1}
  ,La);
  sa("msareabase",{
    hasVDivLine:!0,point:function(d,e,m,l,f,k){
      d=a(l.ignoreemptydatasets,0);
      var E=!1,n=f.chart,
M=m.data||[],K=f[g],r=c(e.type,this.defaultSeriesType),p=c(e.isStacked,f.plotOptions[r]&&f.plotOptions[r].stacking),q=c(this.isValueAbs,K.isValueAbs,!1),t=a(e.yAxis,0),w=f[g].numberFormatter,V=this.colorManager,v=V.getPlotColor(),u=c(m.color,l.plotfillcolor,v).split(za)[0].replace(/^#?/g,"#").split(za)[0],Y=c(m.alpha,l.plotfillalpha,l.areaalpha,this.areaAlpha,70),B=a(l.plotfillangle,270),v=c(m.plotbordercolor,l.plotbordercolor,l.areabordercolor,this.isRadar?v:"666666").split(za)[0],da=c(m.showplotborder,
l.showplotborder)==Ea?Ea:c(m.plotborderalpha,l.plotborderalpha,m.alpha,l.plotfillalpha,l.areaalpha,"95"),C=a(l.plotborderangle,270),F=a(m.anchorsides,l.anchorsides,0),G=a(m.anchorstartangle,l.anchorstartangle,90),D=a(m.anchorradius,l.anchorradius,3),na=ba(c(m.anchorbordercolor,l.anchorbordercolor,u)),L=a(m.anchorborderthickness,l.anchorborderthickness,1),ca=ba(c(m.anchorbgcolor,l.anchorbgcolor,V.getColor("anchorBgColor"))),ja=Boolean(sa.area2dbase.parseAnchorVisibility(m,l,0)),ja=a(m.anchoralpha,
l.anchoralpha,this.anchorAlpha,ja?$a:0),J=a(m.anchorbgalpha,l.anchorbgalpha,ja),N=ja&&c(m.anchorshadow,l.anchorshadow,0),Xa=e.hoverEffects;
      this.isRadar||(u+=za+(a(l.useplotgradientcolor,1)?U(l.plotgradientcolor,V.getColor("plotGradientColor")):b),u=u.replace(/,+?$/,""));
      e.step=c(this.stepLine,e.step);
      e.drawVerticalJoins=Boolean(a(e.drawVerticalJoins,l.drawverticaljoins,1));
      e.useForwardSteps=Boolean(a(e.useForwardSteps,l.useforwardsteps,1));
      e.name=c(m.seriesname);
      if(0===a(m.includeinlegend)||void 0===
e.name)e.showInLegend=!1;
      e.fillColor={
        FCcolor:{
          color:u,alpha:Y,ratio:nb,angle:B}
        }
      ;
      e.color=u;
      e.shadow={
        opacity:a(l.showshadow,1)?da/100:0}
      ;
      e.anchorShadow=N;
      e.lineColor={
        FCcolor:{
          color:v,alpha:da,ratio:$a,angle:C}
        }
      ;
      e.lineWidth=c(m.plotborderthickness,l.plotborderthickness,1);
      e.dashStyle=Boolean(a(m.dashed,l.plotborderdashed,0))?h(a(m.dashlen,l.plotborderdashlen,5),a(m.dashgap,l.plotborderdashgap,4),e.lineWidth):void 0;
      e.marker={
        fillColor:{
          FCcolor:{
            color:ca,alpha:J*ja/100+b}
          }
        ,lineColor:{
          FCcolor:{
            color:na,
alpha:ja+b}
          }
        ,lineWidth:L,radius:D,symbol:Ra(F),startAngle:G}
      ;
      m=e._dataParser=ia.area(f,{
        seriesname:e.name,plottooltext:m.plottooltext,lineAlpha:da,anchorAlpha:ja,showValues:a(m.showvalues,K.showValues),yAxis:t,fillColor:u,fillAlpha:Y,valuePosition:c(m.valueposition,n.valuePosition),drawAnchors:Boolean(a(m.drawanchors,l.drawanchors,l.showanchors,1)),anchorBgColor:ca,anchorBgAlpha:J,anchorBorderColor:na,anchorBorderThickness:L,anchorRadius:D,anchorSides:F,anchorAngle:G,anchorShadow:e.anchorShadow,getLink:this.linkClickFN,
anchorStartAngle:a(m.anchorstartangle,l.anchorstartangle),_sourceDataset:m,hoverEffects:Xa,imageUrl:c(m.anchorimageurl,l.anchorimageurl),imageScale:c(m.anchorimagescale,l.anchorimagescale,100),imageAlpha:c(m.anchorimagealpha,l.anchorimagealpha,100)}
      ,this);
      for(n=0;
      n<k;
      n+=1)(K=M[n])?(l=K?w.getCleanValue(K.value,q):null,null===l?e.data.push({
        y:null}
      ):(E=!0,K=m(K,n,l),e.data.push(K),K.previousY=this.pointValueWatcher(f,l,t,p,n,0,r))):e.data.push({
        y:null}
      );
      !d||E||this.realtimeEnabled||(e.showInLegend=
!1);
      return e}
    ,defaultSeriesType:"area",defaultPlotShadow:0}
  ,La);
  sa("scatterbase",{
    showValues:0,defaultPlotShadow:0,rendererId:"cartesian",defaultSeriesType:"scatter",canvasPaddingModifiers:["anchorlabel"],point:function(d,e,m,l,f,k,E){
      d=a(l.ignoreemptydatasets,0);
      var n=this.colorManager,M=n.getPlotColor(),K,r,q,t,w,V,v,u,Y,B,da,C,F,G,D,na,L,ca,ja;
      k=!1;
      var J,N;
      w=a(m.drawline,l.drawlines,0);
      V=a(m.drawprogressioncurve,0);
      t=m.data||[];
      var Xa,Va,P,ra,Ha,ma=a(m.showvalues,f[g].showValues),ta=this.numberFormatter,
Ka,Wa=e._showRegression=a(m.showregressionline,l.showregressionline,0);
      e.zIndex=1;
      e.name=p(m.seriesname);
      if(0===a(m.includeinlegend)||void 0===e.name)e.showInLegend=!1;
      if(w||V)q=ba(c(m.color,M)),t=c(m.alpha,$a),w=a(m.linethickness,l.linethickness,2),V=Boolean(a(m.linedashed,m.dashed,l.linedashed,0)),v=a(m.linedashlen,l.linedashlen,5),u=a(m.linedashgap,l.linedashgap,4),e.color=T(c(m.linecolor,l.linecolor,q),a(m.linealpha,l.linealpha,t)),e.lineWidth=w,e.dashStyle=V?h(v,u,w):"none";
      w=Boolean(a(m.drawanchors,
m.showanchors,l.drawanchors,l.showanchors,1));
      E=a(m.anchorsides,l.anchorsides,E+3);
      V=a(m.anchorradius,l.anchorradius,3);
      q=ba(c(m.anchorbordercolor,m.color,l.anchorbordercolor,q,M));
      M=a(m.anchorborderthickness,l.anchorborderthickness,1);
      v=ba(c(m.anchorbgcolor,l.anchorbgcolor,n.getColor("anchorBgColor")));
      u=c(m.anchoralpha,m.alpha,l.anchoralpha,$a);
      da=c(m.anchorbgalpha,m.alpha,l.anchorbgalpha,u);
      J=c(m.anchorstartangle,l.anchorstartangle,90);
      e.anchorShadow=n=a(l.anchorshadow,0);
      e.marker={
        fillColor:this.getPointColor(v,
$a),lineColor:{
          FCcolor:{
            color:q,alpha:u+b}
          }
        ,lineWidth:M,radius:V,symbol:Ra(E)}
      ;
      t=m.data||[];
      Ha=t.length;
      Wa&&(e.events={
        hide:this.hideRLine,show:this.showRLine}
      ,Xa={
        sumX:0,sumY:0,sumXY:0,sumXsqure:0,sumYsqure:0,xValues:[],yValues:[]}
      ,ra=a(m.showyonx,l.showyonx,1),Va=ba(c(m.regressionlinecolor,l.regressionlinecolor,q)),P=a(m.regressionlinethickness,l.regressionlinethickness,M),K=ga(a(m.regressionlinealpha,l.regressionlinealpha,u)),Va=T(Va,K));
      for(r=0;
      r<Ha;
      r+=1)(Y=t[r])?(K=ta.getCleanValue(Y.y),ja=ta.getCleanValue(Y.x),
null===K?e.data.push({
        y:null,x:ja}
      ):(k=!0,N=this.getPointStub(Y,K,ta.xAxis(ja),f,m,ma),C=a(Y.anchorsides,E),F=a(Y.anchorradius,V),G=ba(c(Y.anchorbordercolor,q)),D=a(Y.anchorborderthickness,M),na=ba(c(Y.anchorbgcolor,v)),L=c(Y.anchoralpha,Y.alpha,u),ca=c(Y.anchorbgalpha,da),B=Boolean(a(Y.anchorshadow,n,0)),Ka=this.pointHoverOptions(Y,e,{
        plotType:"anchor",anchorBgColor:na,anchorAlpha:L,anchorBgAlpha:ca,anchorAngle:J,anchorBorderThickness:D,anchorBorderColor:G,anchorBorderAlpha:L,anchorSides:C,anchorRadius:F,
shadow:void 0}
      ),e.data.push({
        y:K,x:ja,displayValue:N.displayValue,toolText:N.toolText,link:N.link,marker:{
          enabled:w,shadow:B&&{
            opacity:L/100}
          ,fillColor:{
            FCcolor:{
              color:na,alpha:ca*L/100+b}
            }
          ,lineColor:{
            FCcolor:{
              color:G,alpha:L}
            }
          ,lineWidth:D,radius:F,symbol:Ra(C),startAngle:c(Y.anchorstartangle,m.anchorstartangle,l.anchorstartangle,90)}
        ,hoverEffects:Ka.enabled&&Ka.options,rolloverProperties:Ka.enabled&&Ka.rolloverOptions}
      ),this.pointValueWatcher(f,K,ja,Wa&&Xa))):e.data.push({
        y:null}
      );
      Wa&&(m=this.getRegressionLineSeries(Xa,
ra,Ha),this.pointValueWatcher(f,m[0].y,m[0].x),this.pointValueWatcher(f,m[1].y,m[1].x),f={
        type:"line",color:Va,showInLegend:!1,lineWidth:P,enableMouseTracking:!1,marker:{
          enabled:!1}
        ,data:m,zIndex:0}
      ,e=[e,f]);
      d&&!k&&(e.showInLegend=!1);
      return e}
    ,postSeriesAddition:function(b,c){
      for(var d=b.chart,e=c.chart,f=b.series,m=0,g=f.length;
      m<g;
      m+=1)f[m]._showRegression&&(f[m].relatedSeries=[m+1]);
      d.clipBubbles=a(e.clipbubbles,1)}
    ,categoryAdder:function(d,e){
      var m,l=0,f,k=e[g].x,E,n=e.xAxis,M,K,p=d.chart,q=
parseInt(p.labelstep,10),w=a(p.showlabels,1),V=c(p.xaxislabelmode,"categories").toLowerCase(),v=this.colorManager,u=e[g].numberFormatter,Y,B,da,C,G,D;
      e._FCconf.isXYPlot=!0;
      q=1<q?q:1;
      k.catOccupied={
        }
      ;
      if("auto"!==V&&d.categories&&d.categories[0]&&d.categories[0].category){
        K=d.categories[0];
        K.font&&(e.xAxis.labels.style.fontFamily=K.font);
        void 0!==(f=a(K.fontsize))&&(1>f&&(f=1),e.xAxis.labels.style.fontSize=f+Ga,r(e.xAxis.labels.style));
        K.fontcolor&&(e.xAxis.labels.style.color=K.fontcolor.split(za)[0].replace(/^\#?/,
"#"));
        m=c(K.verticallinecolor,v.getColor("divLineColor"));
        f=a(K.verticallinethickness,1);
        E=a(K.verticallinealpha,v.getColor("divLineAlpha"));
        v=a(K.verticallinedashed,0);
        Y=a(K.verticallinedashlen,4);
        B=a(K.verticallinedashgap,2);
        da=T(m,E);
        for(m=0;
        m<K.category.length;
        m+=1)C=K.category[m],E=u.getCleanValue(C.x),null===E||C.vline||(k.catOccupied[E]=!0,M=a(C.showlabel,C.showname,w),G=a(C.showverticalline,C.showline,C.sl,0),D=a(C.linedashed,v),M=0===M||0!==l%q?b:F(t(C.label,C.name)),n.plotLines.push({
          isGrid:!0,
isCat:!0,isDataLabel:!0,width:G?f:0,color:da,dashStyle:h(Y,B,f,D),value:E,label:{
            text:M,link:c(C.link,p.labellink),style:ka({
              }
            ,C,p,n.labels.style),align:va,verticalAlign:Na,textAlign:va,rotation:0,x:0,y:0}
          }
        ),this.pointValueWatcher(e,null,E),l+=1);
        "mixed"===V&&(k.requiredAutoNumericLabels=a(this.requiredAutoNumericLabels,1))}
      else k.requiredAutoNumericLabels=a(this.requiredAutoNumericLabels,1);
      k.adjustMinMax=!0}
    ,getPointColor:function(a,b){
      var c,d;
      a=ba(a);
      b=ga(b);
      c=Da(a,70);
      d=Z(a,50);
      return{
        FCcolor:{
          gradientUnits:"objectBoundingBox",
cx:.4,cy:.4,r:"100%",color:c+za+d,alpha:b+za+b,ratio:nb,radialGradient:!0}
        }
      }
    }
  ,sa.xybase);
  sa("mscombibase",{
    canvasPaddingModifiers:["anchor","anchorlabel"],series:function(b,d,e){
      var m,f,h,l,k=b.chart,E,n=[],K=[],M=[],r,p,q=d[g],w=this.isDual,V=0,v;
      d.legend.enabled=Boolean(a(b.chart.showlegend,1));
      if(b.dataset&&0<b.dataset.length){
        this.categoryAdder(b,d);
        l=q.oriCatTmp.length;
        m=0;
        for(f=b.dataset.length;
        m<f;
        m+=1)switch(h=b.dataset[m],r=w&&"s"===c(h.parentyaxis,"p").toLowerCase()?!0:!1,E={
          hoverEffects:this.parseSeriesHoverOptions(b,
d,h,e),visible:!a(h.initiallyhidden,0),legendIndex:m,data:[]}
        ,r?(E.yAxis=1,p=t(h.renderas,this.secondarySeriesType),this.secondarySeriesFilter&&(v=this.secondarySeriesFilter[p])):(p=t(h.renderas,this.defaultSeriesType),this.defaultSeriesFilter&&(v=this.defaultSeriesFilter[p])),p=p.toLowerCase(),p){
          case "line":case "spline":E.type=!0===v?p:"line";
          n.push(sa.mslinebase.point.call(this,e,E,h,k,d,l,m));
          break;
          case "area":case "splinearea":E.type=!0===v?p:"area";
          d.chart.series2D3Dshift=!0;
          M.push(sa.msareabase.point.call(this,
e,E,h,k,d,l,m));
          break;
          case "column":case "column3d":K.push(sa.mscolumn2dbase.point.call(this,e,E,b.dataset[m],k,d,l,m,void 0,V));
          V+=1;
          break;
          default:r?(E.type="line",n.push(sa.mslinebase.point.call(this,e,E,h,k,d,l,m))):(K.push(sa.mscolumn2dbase.point.call(this,e,E,b.dataset[m],k,d,l,m,void 0,V)),V+=1)}
        "0"!==k.areaovercolumns?(d.chart.areaOverColumns=!0,d.series=d.series.concat(K,M,n)):(d.chart.areaOverColumns=!1,d.series=d.series.concat(M,K,n));
        if(0===K.length&&1!==l)q.hasNoColumn=!0;
        else if(!this.isStacked)for(e=
0,m=K.length;
        e<m;
        e+=1)K[e].numColumns=m;
        this.configureAxis(d,b);
        b.trendlines&&N(b.trendlines,d.yAxis,d[g],w,this.isBar)}
      }
    }
  ,sa.mscolumn2dbase)}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-renderer",function(){
  function e(a,b,c,d){
    var e=b.paper,g=b.layers,h=c?"y-axis":"x-axis",l=this.layerAboveDataset=g.layerAboveDataset,k=this.layerBelowDataset=g.layerBelowDataset,g=l.bands||(l.bands=[]),n=g.length,r=k.bands||(k.bands=[]),p=r.length,q=l.lines||(l.lines=[]),t=q.length,w=k.lines||(k.lines=[]),v=w.length,l=l.labels||(l.labels=[]),u=l.length,k=k.labels||(k.labels=[]),B=k.length;
    this.renderer=b;
    this.axisData=a||{
      }
    ;
    this.globalOptions=
b.options;
    this.isVertical=c;
    this.topBandGroup=this.topBandGroup||e.group(h+"-bands",this.layerAboveDataset);
    this.belowBandGroup=this.belowBandGroup||e.group(h+"-bands",this.layerBelowDataset);
    g.push(this.topBandGroup);
    n&&g[n].insertAfter(g[n-1]);
    r.push(this.belowBandGroup);
    p&&r[p].insertAfter(r[p-1]);
    this.topLineGroup=this.topLineGroup||e.group(h+"-lines",this.layerAboveDataset);
    this.belowLineGroup=this.belowLineGroup||e.group(h+"-lines",this.layerBelowDataset);
    this.topLabelGroup=this.topLabelGroup||
e.group(h+"-labels",this.layerAboveDataset);
    this.belowLabelGroup=this.belowLabelGroup||e.group(h+"-labels",this.layerBelowDataset);
    q.push(this.topLineGroup);
    t&&q[t].insertAfter(q[t-1]);
    w.push(this.belowLineGroup);
    v&&w[v].insertAfter(w[v-1]);
    l.push(this.topLabelGroup);
    u&&l[u].insertAfter(l[u-1]);
    k.push(this.belowLabelGroup);
    B&&k[B].insertAfter(k[B-1]);
    this.isReverse=d;
    this.configure()}
  function k(a,b,c,d){
    return Sa(b-c[1]-d.top,a-c[0]-d.left)}
  function u(a,b){
    var c=b?360:$a;
    a=(a||0)%c;
    return 0>a?c+a:
a}
  var q=this,D=q.window,b=q.hcLib,N=b.Raphael,J=b.chartAPI,c=/msie/i.test(D.navigator.userAgent)&&!D.opera,p=D.document,a=D.Image,t="VML"===N.type,U=b.BLANKSTRING,F=b.getPosition,g="rgba(192,192,192,"+(c?.002:1E-6)+")",c=b.TOUCH_THRESHOLD_PIXELS,d=b.CLICK_THRESHOLD_PIXELS,h=b.stubFN,l={
    pageX:0,pageY:0}
  ,L=parseFloat,P=parseInt,n=b.extend2,C=b.addEvent,w=b.getMouseCoordinate,R=b.removeEvent,v=b.pluck,oa=b.pluckNumber,ea=b.toRaphaelColor,$=b.setImageDisplayMode,W=b.FC_CONFIG_STRING,pa=b.plotEventHandler,
Ca=b.isArray,fa=b.each=function(a,b,c,d){
    var e;
    c||(c=a);
    d||(d={
      }
    );
    if(Ca(a))for(e=0;
    e<a.length;
    e+=1){
      if(!1===b.call(c,a[e],e,a,d))return e}
    else if(null!==a&&void 0!==a)for(e in a)if(!1===b.call(c,a[e],e,a,d))return e}
  ,la=b.createElement,Q=b.createContextMenu,ya=b.hasTouch,G=ya?c:d,S=b.getSentenceCase,ba=b.getCrispValues,r=b.getValidValue,B=b.getFirstValue,ga=b.regex.dropHash,Z=b.HASHSTRING,Da=function(a){
    return a!==xa&&null!==a}
  ,T=function(a,b){
    a[1]===a[4]&&(a[1]=a[4]=ka(a[1])+b%2/2);
    a[2]===a[5]&&
(a[2]=a[5]=ka(a[2])+b%2/2);
    return a}
  ,xa,va=8===p.documentMode?"visible":"",qa=D.Math,Na=qa.sin,ha=qa.cos,Sa=qa.atan2,ka=qa.round,sa=qa.min,Ra=qa.max,hb=qa.abs,La=qa.ceil,za=qa.floor,ab=180/qa.PI,Ea=qa.PI,db=Ea/2,$a=2*Ea,Ga=Ea+db,Xb=b.getFirstColor,Kb=b.graphics.getLightColor,Ub=b.POSITION_TOP,kb=b.POSITION_BOTTOM,nb=b.POSITION_RIGHT,gb=b.POSITION_LEFT;
  N.ca.ishot=function(a){
    if(this.removed)return!1;
    var b=this.node;
    a=a||"";
    b.ishot=a;
    switch(this.type){
      case "group":for(b=this.bottom;
      b;
      )b.attr("ishot",
a),b=b.next;
      break;
      case "text":if(N.svg)for(b=b.getElementsByTagName("tspan")[0];
      b;
      )b.ishot=a,b=b.nextSibling}
    return!1}
  ;
  N.addSymbol({
    printIcon:function(a,b,c){
      var d=.75*c,e=.5*c,g=.33*c,h=ka(a-c)+.5,l=ka(b-c)+.5,k=ka(a+c)+.5;
      c=ka(b+c)+.5;
      var n=ka(a-d)+.5,r=ka(b-d)+.5,d=ka(a+d)+.5,p=ka(b+e)+.5,q=ka(a+e)+.5,t=ka(b+g)+.5;
      a=ka(a-e)+.5;
      g=ka(b+g+g)+.5;
      return["M",n,l,"L",d,l,d,r,n,r,"Z","M",h,r,"L",h,p,n,p,n,b,d,b,d,p,k,p,k,r,"Z","M",n,b,"L",n,c,d,c,d,b,"Z","M",q,t,"L",a,t,"M",q,g,"L",a,g]}
    ,exportIcon:function(a,
b,c){
      var d=.66*c,e=.5*d,g=ka(a-c)+.5,h=ka(b-c)+.5,l=ka(a+c)+.5;
      c=ka(b+c)-.5;
      var k=ka(a-e)+.5,n=b<c-3?c-3:ka(b)+.5,e=ka(a+e)-.5,r=ka(a+d)-.5,d=ka(a-d)+.5;
      return["M",g,n,"L",g,c,l,c,l,n,l,c,g,c,"Z","M",a,c-1,"L",d,b,k,b,k,h,e,h,e,b,r,b,"Z"]}
    }
  );
  b.rendererRoot=J("renderer.root",{
    standaloneInit:!1,isRenderer:!0,inited:!1,callbacks:[],init:function(a,b,c){
      var d=this,e=d.container=a&&a.containerElement||b.chart.renderTo,g=b.tooltip,h=d.layer,l,k;
      d.options=b;
      d.logic=a;
      d.definition=a.dataObj;
      d.smartLabel=
a.smartLabel;
      d.numberFormatter=a.numberFormatter;
      d.fusionCharts=a.chartInstance;
      d.linkClickFN=a.linkClickFN;
      k=(l=b.chart)&&l.animation&&l.animation.duration;
      d.animationCompleteQueue=[];
      e.innerHTML=U;
      e=d.paper=d.fusionCharts.jsVars.paper=new N(e,e.offsetWidth||a.width,e.offsetHeight||a.height);
      !1!==q.core.options._useSVGDescTag&&e._desc&&(l=a.friendlyName||"Vector image",d.definition&&d.definition.chart&&d.definition.chart.caption&&(l+=' with caption "'+d.definition.chart.caption+'"'),e._desc(l));
      
d.chartWidth=e.width;
      d.chartHeight=e.height;
      d.elements||(d.elements={
        }
      );
      h||(h=d.layers={
        }
      ,h.background=h.background||e.group("background"),h.dataset=h.dataset||e.group("dataset").insertAfter(h.background),h.tracker=h.tracker||e.group("hot").insertAfter(h.dataset));
      g&&!1!==g.enabled&&(e.tooltip(g.style,g.shadow,g.constrain),h.tracker.trackTooltip(!0),h.dataset.trackTooltip(!0));
      d.disposeChartStyleSheet();
      d.setMargins();
      d.drawBackground();
      d.drawButtons();
      d.drawGraph();
      b.legend&&b.legend.enabled&&d.drawLegend();
      
d.drawCaption();
      d.drawLogo();
      d.setChartEvents();
      d.drawLabels&&d.drawLabels();
      fa(b.callbacks,function(a){
        a.apply(d,this)}
      ,[a]);
      fa(d.callbacks,function(a){
        a.apply(d,this)}
      ,[a]);
      d.fusionCharts.annotations&&d.fusionCharts.annotations.draw(d);
      d.createChartStyleSheet();
      d.options.nativeMessage||k||q.raiseEvent("internal.animationComplete",{
        }
      ,d.fusionCharts);
      d.hasRendered=!0;
      c&&c(d)}
    ,disposeChartStyleSheet:function(){
      this.paper.cssClear()}
    ,createChartStyleSheet:function(){
      this.paper.cssRender()}
    ,addCSSDefinition:function(a,
b){
      var c=this.paper;
      b.color&&(b.fill=b.color);
      c.cssAddRule(a,b)}
    ,animationCompleteQueue:[],animationComplete:function(){
      var a,b,c,d;
      this.animatedElements=this.animatedElements?++this.animatedElements:1;
      if(this.animatedElements===this.animatingElementsCount){
        c=this.animationCompleteQueue;
        a=0;
        for(b=c.length;
        a<b;
        a++)d=c[a],d.fn&&d.fn.call(d.scope);
        this.animationCompleteQueue=[];
        q.raiseEvent("internal.animationComplete",{
          }
        ,this.fusionCharts)}
      }
    ,getAnimationCompleteFn:function(){
      var a=this;
      a.animatingElementsCount=
a.animatingElementsCount?++a.animatingElementsCount:1;
      return function(){
        a.animationComplete()}
      }
    ,reinit:function(a,b,c){
      this.hasRendered||this.init(b,c)}
    ,dispose:function(){
      var a=this.eventListeners,b=a&&a.length;
      this.disposing=!0;
      if(b)for(;
      b--;
      )a[b].unlisten();
      if(this.toolbar&&this.toolbar.length){
        for(;
        this.toolbar.length;
        )a=this.toolbar.pop(),a.remove();
        this.toolbar.add=null}
      if(this.menus&&this.menus.length)for(;
      this.menus.length;
      )a=this.menus.pop(),a.destroy();
      this.paper&&(this.paper.clear(),this.paper.remove(),
delete this.paper);
      this.exportIframe&&(this.exportIframe.parentNode.removeChild(this.exportIframe),delete this.exportIframe);
      delete this.disposing;
      this.container=null;
      this.disposed=!0}
    ,onContainerClick:function(a){
      var c=a.target||a.originalTarget||a.srcElement||a.relatedTarget||a.fromElement,d=a.data,e=d.fusionCharts;
      a=b.getMouseCoordinate(d.container,a.originalEvent);
      e.ref&&(e=n({
        height:e.args.height,width:e.args.width,pixelHeight:e.ref.offsetHeight,pixelWidth:e.ref.offsetWidth,id:e.args.id,renderer:e.args.renderer,
container:e.options.containerElement}
      ,a),q.raiseEvent("chartclick",e,d.logic.chartInstance),c&&c.ishot&&d||d.options.chart.link&&d.linkClickFN.call(d,d))}
    ,onContainerMouseMove:function(a){
      var c=a.data,d=c.fusionCharts;
      a=b.getMouseCoordinate(c.container,a.originalEvent);
      d.ref&&(d=n({
        height:d.args.height,width:d.args.width,pixelHeight:d.ref.offsetHeight,pixelWidth:d.ref.offsetWidth,id:d.args.id,renderer:d.args.renderer,container:d.options.containerElement}
      ,a),q.raiseEvent("chartMouseMove",d,c.logic.chartInstance))}
    ,
onContainerRollOver:function(a){
      var c=a.data,d=c.fusionCharts;
      a=b.getMouseCoordinate(c.container,a.originalEvent);
      d.ref&&(d=n({
        height:d.args.height,width:d.args.width,pixelHeight:d.ref.offsetHeight,pixelWidth:d.ref.offsetWidth,id:d.args.id,renderer:d.args.renderer,container:d.options.containerElement}
      ,a),q.raiseEvent("chartRollOver",d,c.logic.chartInstance))}
    ,onContainerRollOut:function(a){
      var c=a.chart,d=c.fusionCharts;
      a=b.getMouseCoordinate(c.container,a.event);
      d.ref&&(d=n({
        height:d.args.height,
width:d.args.width,pixelHeight:d.ref.offsetHeight,pixelWidth:d.ref.offsetWidth,id:d.args.id,renderer:d.args.renderer,container:d.options.containerElement}
      ,a),q.raiseEvent("chartRollOut",d,c.logic.chartInstance))}
    ,mouseStateIn:!1,winMouseHover:function(a){
      var b=a.originalEvent,b=b.target||b.originalTarget||b.srcElement||b.relatedTarget||b.fromElement,c=a.data,d=c.paper;
      a={
        chart:c,event:a.originalEvent}
      ;
      t?d.getById(b.parentNode.raphaelid)||(c.onContainerRollOut(a),c.mouseStateIn=!1,R(p,"mouseover",
c.winMouseHover)):b.viewportElement||(c.mouseStateIn=!1,c.onContainerRollOut(a),R(D,"mouseover",c.winMouseHover))}
    ,chartHoverManager:function(){
      return function(a){
        var b=a.type,c=a.data,d=c.eventListeners||(c.eventListeners=[]);
        "mouseover"!==b&&"touchstart"!==b||!1!==c.mouseStateIn||(c.mouseStateIn=!0,c.onContainerRollOver(a),d.push(C(t?p:D,"mouseover",c.winMouseHover,c)))}
      }
    (),setChartEvents:function(){
      var a=this.options,b=this.eventListeners||(this.eventListeners=[]),a=this.link=a.chart.link,c=this.container,
d=oa(this.definition&&this.definition.chart.enablechartmousemoveevent,0);
      R(c,"click",this.onContainerClick);
      b.push(C(c,"click",this.onContainerClick,this));
      R(this.paper.canvas,"mouseover",this.chartHoverManager,this);
      R(this.paper.canvas,"touchstart",this.chartHoverManager,this);
      R(this.paper.canvas,"mouseout",this.chartHoverManager,this);
      R(this.paper.canvas,"touchend",this.chartHoverManager,this);
      b.push(C(this.paper.canvas,"mouseover touchstart mouseout touchend",this.chartHoverManager,this));
      R(c,
"mousemove",this.onContainerMouseMove,this);
      R(c,"touchmove",this.onContainerMouseMove,this);
      d&&b.push(C(c,"mousemove touchmove",this.onContainerMouseMove,this));
      this.paper.canvas.style.cursor=N.svg?a&&"pointer"||"default":a&&"hand"||"default"}
    ,onOverlayMessageClick:function(){
      var a=this.elements;
      N.animation({
        opacity:0}
      ,1E3);
      a.messageText&&a.messageText.hide();
      a.messageVeil&&a.messageVeil.hide()}
    ,showMessage:function(a,b){
      var c=this.paper,d=this.options.chart,e=this.elements,g=e.messageText,h=e.messageVeil,
l=c.width,k=c.height;
      h||(h=e.messageVeil=c.rect(0,0,l,k).attr({
        fill:"rgba(0,0,0,0.2)",stroke:"none"}
      ));
      h.show().toFront().attr("cursor",b?"pointer":"default")[b?"click":"unclick"](this.onOverlayMessageClick,this);
      g||(g=e.messageText=c.text(l/2,k/2,U).attr({
        fill:"rgba(255,255,255,1)","font-family":"Verdana,sans","font-size":10,"line-height":14,direction:d.textDirection,ishot:!0}
      ));
      a=a||U;
      this.smartLabel.setStyle({
        "line-height":"14px","font-family":"Verdana,sans","font-size":"10px"}
      );
      c=this.smartLabel.getSmartText(a,
l-(d.spacingRight||0)-(d.spacingLeft||0),k-(d.spacingTop||0)-(d.spacingBotton||0));
      g.attr({
        text:c.text,ishot:!0,cursor:b?"pointer":"default"}
      )[b?"click":"unclick"](this.onOverlayMessageClick,this).show().toFront()}
    ,drawButtons:function(){
      var a=this,b=a.logic,c="zoomline"===b.rendererId,d=a.paper,e=a.elements,g=a.toolbar||(a.toolbar=[]),h=a.menus||(a.menus=[]),l=a.layers,k=a.options,n=k[W],b=n&&n.outCanvasStyle||b.outCanvasStyle||{
        }
      ,n=k.chart.toolbar||{
        }
      ,r=n.hDirection,p=c?1:n.vDirection,q=n.button||
{
        }
      ,t=q.scale,w=q.width*q.scale,v=q.height*q.scale,u=r*(q.spacing*q.scale+w),B=q.radius,C=(k=k.exporting)&&k.buttons||{
        }
      ,F=C.exportButton&&!1!==C.exportButton.enabled,C=C.printButton&&!1!==C.printButton.enabled,G,D=l.buttons||(l.buttons=d.group("buttons").trackTooltip(!0));
      g.y||(g.y=(c?0:n.y)+n.vMargin*p+sa(0,v*p));
      g.x||(g.x=n.x+n.hMargin*r-Ra(0,w*r));
      g.count=0;
      g.add=function(a,b,c){
        c="string"===typeof c?{
          tooltip:c}
        :c||{
          }
        ;
        var e=0===g.count?u-r*q.spacing*q.scale:u,e=c.x||(g.x+=e),m=c.tooltip||"";
        g.push(a=
d.button(e,c.y||g.y,xa,a,{
          width:w,height:v,r:B,id:g.count++,verticalPadding:q.symbolHPadding*t,horizontalPadding:q.symbolHPadding}
        ,D).attr({
          ishot:!0,fill:[q.fill,q.labelFill,q.symbolFill,q.hoverFill],stroke:[q.stroke,q.symbolStroke],"stroke-width":[q.strokeWidth,q.symbolStrokeWidth]}
        ).tooltip(m).buttonclick(b));
        return a}
      ;
      F&&(h.push(G=e.exportMenu=Q({
        chart:a,basicStyle:b,items:function(b){
          var c=[],d=function(b){
            return function(){
              a.logic.chartInstance.exportChart({
                exportFormat:b}
              )}
            }
          ,e;
          for(e in b)c.push({
            text:b[e],
onclick:d(e)}
          );
          return c}
        (k.exportformats)}
      )),e.exportButton=g.add("exportIcon",function(a,b){
        return function(){
          G.visible?G.hide():G.show({
            x:a,y:b+1}
          )}
        }
      (g.x+w,g.y+v),{
        tooltip:"Export chart"}
      ));
      C&&(e.printButton=g.add("printIcon",function(){
        a.print()}
      ,{
        tooltip:"Print chart"}
      ))}
    ,setMargins:function(){
      var a=this.paper,b=this.options.chart||{
        }
      ,c=ka;
      this.canvasBorderWidth=b.plotBorderWidth||0;
      this.canvasTop=c(b.marginTop)||0;
      this.canvasLeft=c(b.marginLeft)||0;
      this.canvasWidth=c(a.width-(b.marginLeft||0)-
(b.marginRight||0));
      this.canvasHeight=c(a.height-(b.marginTop||0)-(b.marginBottom||0));
      this.canvasRight=this.canvasLeft+this.canvasWidth;
      this.canvasBottom=this.canvasTop+this.canvasHeight}
    ,drawBackground:function(){
      var b=this,c=b.paper,d=b.layers,e=b.elements,g=d.background,h=e.background,l=e.chartborder,k=b.options.chart||{
        }
      ,n=L(k.borderWidth)||0,r=.5*n,p=2*n,t=k.borderWidth||0,w=b.chartHeight,v=b.chartWidth,u=e.backgroundImage,B=k.bgSWF,C=k.bgSWFAlpha/100,F=k.bgImageDisplayMode,G=k.bgImageVAlign,
D=k.bgImageHAlign,J=k.bgImageScale,N=t+","+t+","+(v-2*t)+","+(w-2*t),P,R,Q,S,Fa,U,T;
      c.canvas.style.backgroundColor=k.containerBackgroundColor;
      !g&&(g=d.background=c.group("background"));
      d={
        x:n,y:n,width:c.width-p,height:c.height-p,stroke:"none",fill:ea(k.backgroundColor)}
      ;
      h?h.attr(d):h=e.background=c.rect(d,g);
      d={
        x:r,y:r,width:c.width-n,height:c.height-n,stroke:k.borderColor,"stroke-width":n,"stroke-dasharray":k.borderDashStyle,fill:"none",r:k.borderRadius||0}
      ;
      l?l.attr(d):l=e.chartborder=c.rect(d,
g);
      B&&(P=new a,Fa=Q=1,u=[],P.onload=function(){
        R=$(F,G,D,J,t,v,w,P);
        R["clip-rect"]=N;
        if(R.tileInfo)for(Q=R.tileInfo.xCount,Fa=U=R.tileInfo.yCount,T=R.y,delete R.tileInfo;
        Q&&R.width&&R.height;
        )--U,S?(u[void 0]=S.clone().attr({
          x:R.x,y:R.y}
        ),g.appendChild(u[void 0])):u[void 0]=S=c.image(B,g).attr(R).css({
          opacity:C}
        ),R.y+=R.height,0===U&&(U=Fa,--Q,R.x+=R.width,R.y=T);
        else{
          if(b.disposed||c.disposed)return;
          u[0]=c.image(B,g);
          u[0].attr(R).css({
            opacity:C}
          ).attr({
            visibility:va,"clip-rect":N}
          )}
        q.raiseEvent("BackgroundLoaded",
{
          url:B,bgImageAlpha:100*C,bgImageDisplayMode:F,bgImageVAlign:G,bgImageHAlign:D,bgImageScale:J,imageWidth:P.width,imageHeight:P.height}
        ,b.logic.chartInstance)}
      ,P.onerror=function(a){
        q.raiseEvent("BackgroundLoadError",{
          url:B,bgImageAlpha:100*C,error:a,bgImageDisplayMode:F,bgImageVAlign:G,bgImageHAlign:D,bgImageScale:J}
        ,b.logic.chartInstance)}
      ,P.src=B,e.backgroundImage=u)}
    ,drawGraph:function(){
      var a=this,b=a.paper,c=a.plots=a.elements.plots,d=a.logic,e=a.layers,g=a.options,h=a.elements,l=g.chart,g=a.datasets=
g.series,k=B(l.rendererId,l.defaultSeriesType),r=e.background,q=e.dataset=e.dataset||b.group("dataset").insertAfter(r),p,t,r=function(a,b){
        return function(e){
          var g=c[a],m,h={
            hcJSON:{
              series:[]}
            }
          ,l=h.hcJSON.series[a]||(h.hcJSON.series[a]={
            }
          ),k=d.chartInstance.jsVars._reflowData;
          m=(e=B(e,!g.visible))?"visible":"hidden";
          fa(g.graphics,function(a){
            !0!==a.data("alwaysInvisible")&&a.attr("visibility",m)}
          );
          g.visible=e;
          b.visible=e;
          l.visible=e;
          n(k,h,!0)}
        }
      ,w=function(b){
        return function(d,e){
          a["legendClick"+k]&&
a["legendClick"+k](c[b],d,e)||a.legendClick&&a.legendClick(c[b],d,e)}
        }
      ,u=function(b){
        return function(){
          return a.getEventArgs&&a.getEventArgs(c[b])}
        }
      ,C=function(b,d,e){
        return function(g,h){
          d.call(a,c[b],e,{
            numUpdate:g,hasAxisChanged:h}
          )}
        }
      ;
      e.tracker=e.tracker||b.group("hot").insertAfter(q);
      a.drawCanvas();
      a.drawAxes();
      c||(c=a.plots=a.plots||[],h.plots=c);
      e=0;
      for(h=g.length;
      e<h;
      e++)b=g[e]||{
        }
      ,q=b.updatePlot="updatePlot"+S(v(b.type,b.plotType,k)),q=a[q],p=b.drawPlot="drawPlot"+S(v(b.type,b.plotType,k)),
p=a[p]||a.drawPlot,(t=c[e])||(c.push(t={
        index:e,items:[],data:b.data||[],name:b.name,userID:b.userID,setVisible:r(e,b),legendClick:w(e),getEventArgs:u(e),realtimeUpdate:C(e,q||p,b)}
      ),b.plot=t,b.legendClick=t.legendClick,b.getEventArgs=t.getEventArgs,b.setVisible=t.setVisible),p.call(a,t,b);
      l.hasScroll&&(a.drawScroller(),a.finalizeScrollPlots())}
    ,drawPlot:h,drawCanvas:h,drawAxes:h,drawScroller:function(){
      }
    ,drawLegend:function(){
      var a=this,b=a.options,c=a.paper,d=b.chart||{
        }
      ,e=b.legend,g=e.scroll,b=
{
        elements:{
          }
        }
      ,h=b.elements,l=a.layers.legend,k=h.box,r=h.caption,q=h.elementGroup,p="vertical"===e.layout,t=d.marginBottom,w=d.spacingBottom,v=d.spacingLeft,u=d.spacingRight,B=c.width,C=c.height,F=a.canvasTop,G=e.width,D=e.height,L=e.borderRadius,J=e.backgroundColor,P=e.borderColor,R=e.borderWidth||0,Q=.5*R,Fa=.5*R+2,T=oa(e.padding,4),ea=.5*T,W,Ua,Aa,$,ia,s,z,A;
      A=g&&g.enabled;
      p?(p=B-u-G,t=F+.5*(C-t-F-D)+(e.y||0)):(p=v+.5*(B-v-u-G)+(e.x||0),t=C-w-D);
      w=N.crispBound(p,t,G,D,R);
      p=w.x;
      t=w.y;
      G=w.width;
      
D=w.height;
      l||(l=a.layers.legend=c.group("legend").insertBefore(a.layers.tracker).translate(p,t).attr("class","fusioncharts-legend"));
      a.addCSSDefinition(".fusioncharts-legend .fusioncharts-caption",n({
        "text-anchor":e.title.align}
      ,e.title.style));
      e.legendAllowDrag&&(a.addCSSDefinition(".fusioncharts-legend",{
        cursor:"move"}
      ),Ua=p,Aa=t,l.drag(function(a,b){
        $=s+a;
        ia=z+b;
        $+G+Fa>B&&($=B-G-Fa);
        ia+D+Fa>C&&(ia=C-D-Fa);
        $<Fa&&($=Fa);
        ia<Fa&&(ia=Fa);
        l.translate($-Ua,ia-Aa);
        Ua=$;
        Aa=ia}
      ,function(){
        s=Ua;
        z=Aa}
      ));
      
L={
        x:0,y:0,width:G,height:D,r:L,stroke:P,"stroke-width":R,fill:J||"none",ishot:e.legendAllowDrag}
      ;
      k?k.attr(L):k=h.box=c.rect(L,l);
      k.shadow(e&&e.shadow);
      A?(W=D-T,k=","+G+","+W,q=h.elementGroup=c.group("legenditems",l).attr({
        "clip-rect":"0,"+ea+k}
      ),g=h.scroller||(h.scroller=c.scroller(G-10+ea-R,Q,10,D-R,!1,{
        scrollPosition:g.scrollPosition||0,scrollRatio:(W+T)/e.totalHeight,showButtons:!1,displayStyleFlat:g.flatScrollBars}
      ,l)),g.attr("fill",e.legendScrollBgColor).scroll(function(b){
        q.transform(["T",
0,(W-e.totalHeight)*b]);
        n(a.fusionCharts.jsVars._reflowData,{
          hcJSON:{
            legend:{
              scroll:{
                position:b}
              }
            }
          }
        ,!0)}
      )):q=h.elementGroup=l;
      if(e.title&&e.title.text!==U){
        switch(e.title.align){
          case "start":A=T;
          break;
          case "end":A=G-T-(A?10:0);
          break;
          default:A=.5*G}
        L={
          "class":"fusioncharts-caption","text-anchor":e.title.align,text:e.title.text,title:e.title.originalText||"",x:A,y:T,fill:e.title.style.color,"vertical-align":"top",direction:d.textDirection,"line-height":e.title.style.lineHeight}
        ;
        r?r.attr(L):r=h.caption=
c.text(L,q).attr("class","fusioncharts-caption")}
      this["draw"+S(e.type||"point")+"LegendItem"](b)}
    ,drawPointLegendItem:function(a){
      var b=this,c=b.paper,d=b.options,e=d.series,h=d.chart,l=h.defaultSeriesType,d=d.legend,k=d.legendHeight,r=d.symbolPadding,p=d.textPadding||2,t=oa(d.padding,4),h=h.textDirection,u=d.itemHoverStyle,B=d.itemHiddenStyle,C=d.itemStyle,F=C.color,B=B&&B.color||"#CCCCCC",G=u&&u.color||F,u=d.symbol3DLighting,D=d.symbolWidth,L=!1!==d.interactiveLegend,J=a.elements,N=J.elementGroup;
      
a=a.item=[];
      var J=J.item=[],P=[],R={
        line:!0,spline:!0,scatter:!0,bubble:!0,dragnode:!0,zoomline:!0}
      ,Q,S,T,U,Fa,W,$,Z,Ua,Aa,ub,ia,s,z,A,O,f,Ia,X,H,aa;
      ia=0;
      for(s=e.length;
      ia<s;
      ia+=1)if((Q=e[ia])&&!1!==Q.showInLegend)if(Z=Q.type||l,"point"===Q.legendType)for(Q=Q.data||[],Fa=0,W=Q.length;
      Fa<W;
      Fa+=1)T=Q[Fa]||{
        }
      ,!1!==T.showInLegend&&(T._legendType=Z,P.push(T));
      else switch(Q._legendType=Z,Z){
        case "pie":case "pie3d":case "funnel":case "pyramid":P=Q.data;
        break;
        default:P.push(Q)}
      P.sort(function(a,b){
        return(a.legendIndex||
0)-(b.legendIndex||0)||a.__i-b.__i}
      );
      d.reversed&&P.reverse();
      e=d.initialItemX||0;
      l=d.initialItemY||0;
      Fa=function(a){
        var c=this.data("legendItem"),d=c.getEventArgs?c.getEventArgs():{
          }
        ,e;
        a=w(b.logic.chartInstance.ref,a);
        d.chartX=a.chartX;
        d.chartY=a.chartY;
        d.pageX=a.pageX;
        d.pageY=a.pageY;
        d.preventDefaults=function(){
          e=!0}
        ;
        q.raiseEvent("LegendItemClicked",d,b.logic.chartInstance);
        L&&!e&&c.legendClick()}
      ;
      W=function(a){
        var c=this.data("legendItem"),d=c.getEventArgs?c.getEventArgs():{
          }
        ;
        a=w(b.logic.chartInstance.ref,
a);
        var e=!1!==c.visible,c=c.plot.legend.elements.legendItemText;
        d.chartX=a.chartX;
        d.chartY=a.chartY;
        d.pageX=a.pageX;
        d.pageY=a.pageY;
        e&&c&&c.attr({
          fill:G}
        );
        q.raiseEvent("LegendItemRollover",d,b.logic.chartInstance)}
      ;
      $=function(a){
        var c=this.data("legendItem"),d=c.getEventArgs?c.getEventArgs():{
          }
        ;
        a=w(b.logic.chartInstance.ref,a);
        var e=!1!==c.visible,c=c.plot.legend.elements.legendItemText;
        d.chartX=a.chartX;
        d.chartY=a.chartY;
        d.pageX=a.pageX;
        d.pageY=a.pageY;
        e&&c&&c.attr({
          fill:F}
        );
        q.raiseEvent("LegendItemRollout",
d,b.logic.chartInstance)}
      ;
      b.addCSSDefinition(".fusioncharts-legend .fusioncharts-legenditem",d.itemStyle);
      ia=0;
      for(s=P.length;
      ia<s;
      ia+=1)!1!==P[ia].showInLegend&&(aa={
        elements:{
          }
        ,hiddenColor:B,itemTextColor:F,hoverColor:G}
      ,a.push(aa),J.push(aa.elements),Q=P[ia],Ua=e+Q._legendX+t,Aa=l+Q._legendY-t,ub=Q._legendH,S=Q._legendType||Z,T=!1!==Q.visible,U=aa.itemLineColor=ea(Q.color||{
        }
      ),Q.plot.legend=aa,aa.elements.legendItemText=c.text({
        "class":"fusioncharts-legenditem",x:Ua+k+p-2,y:Aa+(Q._legendTestY||
0),text:Q.name,fill:T?F:B,"vertical-align":"top",direction:h,"text-anchor":"start",cursor:C.cursor||"pointer",ishot:L,"line-height":C.lineHeight,"font-size":C.fontSize}
      ,N).data("legendItem",Q),R[S]?(S=Aa+(Q._markerYGutter||0)+r+.5*D,Q.lineWidth&&(H=aa.elements.legendItemLine=c.path({
        "stroke-width":Q.lineWidth,stroke:T?U:B,cursor:C.cursor||"pointer",ishot:L,path:["M",Ua+r,S,"L",Ua+r+D,S]}
      ,N).data("legendItem",Q)),Q&&(f=Q.marker)&&!1!==f.enabled&&(aa.symbolStroke=ea(v((Ia=f.lineColor)&&(Ia.FCcolor&&
Ia.FCcolor.color.split(",")[0]||Ia),U)),u?f.fillColor&&f.fillColor.FCcolor?(S=n({
        }
      ,f.fillColor),S.FCcolor.alpha="100"):S=v(f.fillColor,U):S={
        FCcolor:{
          color:v((X=f.fillColor)&&(X.FCcolor&&X.FCcolor.color.split(",")[0]||X),U),angle:0,ratio:"0",alpha:"100"}
        }
      ,aa.symbolColor=ea(S),z=.5*D,U=Ua+r+z,S=Aa+(Q._markerYGutter||0)+r+z,H&&(z*=.6),A=f.symbol.split("_"),O="spoke"===A[0]?1:0,S=A[1]?aa.elements.legendItemSymbol=c.polypath(A[1],U,S,z,f.startAngle,O,N):aa.elements.legendItemSymbol=c.circle(U,S,z,N),
S.data("legendItem",Q).attr({
        cursor:C.cursor||"pointer",stroke:T?aa.symbolStroke:B,fill:T?aa.symbolColor:B,"stroke-width":1,ishot:L}
      ))):(S=b.getSymbolPath(Ua+r,Aa+(Q._markerYGutter||0)+r,D,D,S,Q,!u),aa.symbolColor=ea(S.color),aa.symbolStroke=ea(S.strokeColor),S=aa.elements.legendItemSymbol=c.path({
        path:S.path,"stroke-width":S.strokeWidth,stroke:T?aa.symbolStroke:B,fill:T?aa.symbolColor:B,cursor:C.cursor||"pointer",ishot:L}
      ,N).data("legendItem",Q)),aa.elements.legendItemBackground=c.rect({
        x:Ua,y:Aa,
width:Q._totalWidth,height:ub,r:0,fill:ea(Q.legendFillColor||g),"stroke-width":1,stroke:ea(Q.legendBorderColor||"none"),cursor:C.cursor||"pointer",ishot:L}
      ,N).click(Fa).mouseover(W).mouseout($).data("legendItem",Q));
      d.reversed&&P.reverse()}
    ,drawCaption:function(){
      var a=this.options.chart,b=this.options.title,c=this.options.subtitle,d=this.paper,e=this.smartLabel,g=this.elements,h=this.layers,l=h.caption,k=g.caption,n=g.subcaption,r=b.text,p=c&&c.text,q=b.x,t;
      !r&&!p||l||(l=h.caption=d.group("caption"),
h.tracker?l.insertBefore(h.tracker):l.insertAfter(h.dataset));
      r?(this.addCSSDefinition(".fusioncharts-caption",b.style),t={
        "class":"fusioncharts-caption",text:b.text,fill:b.style.color,x:q,y:b.y||a.spacingTop||0,"text-anchor":b.align||"middle","vertical-align":b.verticalAlign||"top",visibility:"visible",direction:a.textDirection,title:b.originalText||""}
      ,k?k.attr(t):k=g.caption=d.text(t,l).attr("class","fusioncharts-caption"),k.css(b.style),e?(e.setStyle(b.style),t=e.getOriSize(b.text).height):t=
10):k&&(k=g.caption=k.remove());
      p?(this.addCSSDefinition(".fusioncharts-subcaption",c.style),t={
        "class":"fusioncharts-subcaption",text:c.text,title:c.originalText||"",fill:c.style.color,x:q,y:r?k.attrs.y+t+2:b.y||a.spacingTop||0,"text-anchor":b.align||"middle","vertical-align":"top",direction:a.textDirection,visibility:"visible"}
      ,n?n.attr(t):n=g.subcaption=d.text(t,l).attr("class","fusioncharts-subcaption"),n.css(c.style)):n&&(g.subcaption=n.remove());
      r||p||!l||(h.caption=l.remove())}
    ,drawLogo:function(){
      var b=
this,c=b.paper,d=b.elements,e=b.options,g=e.credits,h=e.chart||{
        }
      ,l=h.borderWidth||0,k=b.chartHeight,n=b.chartWidth,r=d.logoImage,p=h.logoURL,v=h.logoAlpha/100,u=h.logoPosition,B=h.logoLink,C=h.logoScale,F=h.logoLeftMargin,G=h.logoTopMargin,e={
        tr:{
          vAlign:Ub,hAlign:nb}
        ,bl:{
          vAlign:kb,hAlign:gb}
        ,br:{
          vAlign:kb,hAlign:nb}
        ,cc:{
          vAlign:"middle",hAlign:"middle"}
        }
      ,L,J,N;
      b.logic&&g.enabled&&c.text().attr({
        text:g.text,x:6,y:k-4,"vertical-align":kb,direction:h.textDirection,"text-anchor":"start",fill:"rgba(0,0,0,0.5)",
title:g.title||""}
      ).css({
        fontSize:9,fontFamily:"Verdana,sans",cursor:"pointer",_cursor:"hand"}
      ).click(function(){
        try{
          D.open(g.href)}
        catch(a){
          (D.top||D).location.href=g.href}
        }
      );
      p&&(L=new a,(N=e[u])||(N={
        vAlign:Ub,hAlign:gb}
      ),L.onload=function(){
        b.disposed||c.disposed||(J=$("none",N.vAlign,N.hAlign,C,l,n,k,L),t&&(J.w=J.width||0,J.h=J.height||0),J.src=p,r=b.paper.image(J).translate(F,G).css("opacity",v),B&&r.css({
          cursor:"pointer",_cursor:"hand"}
        ),r.mouseover(function(a){
          a=w(b.logic.chartInstance.ref,
a);
          q.raiseEvent("LogoRollover",{
            logoURL:p,logoAlpha:100*v,logoPosition:u||"tl",logoScale:C,logoLink:B,chartX:a.chartX,chartY:a.chartY,pageX:a.pageX,pageY:a.pageY}
          ,b.logic.chartInstance)}
        ),r.mouseout(function(a){
          a=w(b.logic.chartInstance.ref,a);
          q.raiseEvent("LogoRollout",{
            logoURL:p,logoAlpha:100*v,logoPosition:u||"tl",logoScale:C,logoLink:B,chartX:a.chartX,chartY:a.chartY,pageX:a.pageX,pageY:a.pageY}
          ,b.logic.chartInstance)}
        ),r.click(function(a){
          a=w(b.logic.chartInstance.ref,a);
          q.raiseEvent("LogoClick",
{
            logoURL:p,logoAlpha:100*v,logoPosition:u||"tl",logoScale:C,logoLink:B,chartX:a.chartX,chartY:a.chartY,pageX:a.pageX,pageY:a.pageY}
          ,b.logic.chartInstance,void 0,function(){
            B&&h.events.click.call({
              link:B}
            )}
          )}
        ),q.raiseEvent("LogoLoaded",{
          logoURL:p,logoAlpha:100*v,logoPosition:u||"tl",logoScale:C,logoLink:B}
        ,b.logic.chartInstance))}
      ,L.onerror=function(a){
        q.raiseEvent("LogoLoadError",{
          logoURL:p,logoAlpha:100*v,logoPosition:u||"tl",logoScale:C,logoLink:B,error:a}
        ,b.logic.chartInstance)}
      ,L.src=p,d.logoImage=
r)}
    ,getEventArgs:function(a){
      a=a||{
        }
      ;
      return{
        datasetName:a.name,datasetIndex:a.index,id:a.userID,visible:a.visible}
      }
    ,legendClick:function(a,b){
      var c=a.legend,d=c&&c.elements,e=d&&d.legendItemText,g=d&&d.legendItemSymbol,d=d&&d.legendItemLine,h=c&&c.hiddenColor,l=c&&c.itemLineColor,k=c&&c.itemTextColor,n=c&&c.symbolColor,r=c&&c.symbolStroke,c=v(b,!a.visible);
      a.setVisible(b);
      c?(g&&g.attr({
        fill:n||l,stroke:r}
      ),e&&e.attr({
        fill:k}
      ),d&&d.attr({
        stroke:l}
      )):(g&&g.attr({
        fill:h,stroke:h}
      ),e&&e.attr({
        fill:h}
      ),
d&&d.attr({
        stroke:h}
      ));
      if((e=this.datasets&&this.datasets[a.index]&&this.datasets[a.index].relatedSeries)&&e instanceof Array&&0<e.length)for(g=e.length;
      g--;
      )d=parseFloat(e[g]),d=this.plots[d],d.legendClick.call(d,c,!1)}
    ,exportChart:function(c){
      var d=this,e=d.fusionCharts,g=d.options;
      c="object"===typeof c&&function(a){
        var b={
          }
        ,c;
        for(c in a)b[c.toLowerCase()]=a[c];
        return b}
      (c)||{
        }
      ;
      var h=n(n({
        }
      ,g.exporting),c),l=(h.exportformat||"png").toLowerCase(),k=h.exporthandler,r=(h.exportaction||U).toLowerCase(),
t=h.exporttargetwindow||U,w=h.exportfilename,v=h.exportparameters,u=h.exportcallback,B=h.exportwithimages;
      if(!g.exporting||!g.exporting.enabled||!k)return!1;
      q.raiseEvent("beforeExport",h,e,void 0,function(){
        function c(){
          var a;
          if("download"===r){
            /webkit/ig.test(D.navigator.userAgent)&&"_self"===t&&(t=F=m+"export_iframe",d.exportIframe||(d.exportIframe=G=la("IFRAME",{
              name:F,width:"1px",height:"1px"}
            ,p.body),G.style.cssText="position:absolute;
            left:-10px;
            top:-10px;
            "));
            L=la("form",{
              method:"POST",action:k,
target:t,style:"display:none;
              "}
            ,p.body);
            for(a in C)la("input",{
              type:"hidden",name:a,value:C[a]}
            ,L);
            L.submit();
            p.body.removeChild(L);
            L=void 0;
            return!0}
          J=new q.ajax(function(a){
            var c={
              }
            ;
            a.replace(RegExp("([^?=&]+)(=([^&]*))?","g"),function(a,b,d,e){
              c[b]=e}
            );
            u&&D[u]&&"function"===typeof D[u]&&D[u].call(D,c);
            b.raiseEvent("exported",c,e)}
          ,function(a){
            a={
              statusCode:0,statusMessage:"failure",error:a,DOMId:m,width:n.width,height:n.height}
            ;
            u&&D[u]&&"function"===typeof D[u]&&D[u].call(D,a);
            b.raiseEvent("exported",
a,e,[a])}
          );
          for(a in C)C.hasOwnProperty(a)&&(C[a]=encodeURIComponent(C[a]));
          J.post(k,C)}
        var g=d.layers.buttons,m=e.id,n=d.paper,K=q&&q.hcLib,C,F,G,L,J,N,K=K&&K.isCanvasElemSupported(),P,R,Q=0,S={
          }
        ,T,U,ea,W,$={
          }
        ;
        g&&g.attr("visibility","hidden");
        N=n.toSVG(B&&K&&"svg"!==l);
        g&&g.attr("visibility","visible");
        N=N.replace(/(\sd\s*=\s*["'])[M\s\d\.]*(["'])/ig,"$1M 0 0 L 0 0$2");
        C={
          charttype:e.chartType(),stream:N,stream_type:"svg",meta_bgColor:h.bgcolor||"",meta_bgAlpha:h.bgalpha||"1",meta_DOMId:e.id,meta_width:n.width,
meta_height:n.height,parameters:["exportfilename="+w,"exportformat="+l,"exportaction="+r,"exportparameters="+v].join("|")}
        ;
        -1!==N.indexOf("<image ")?K?(R=(P=N.match(/<image [^\>]*\>/gi))&&P.length,T=function(a){
          a=a&&a.split("/");
          a=a[a.length-1].split(".");
          return{
            name:a[0],type:a[1]||"png"}
          }
        ,U=function(b,c,d,e,g){
          var f=new a;
          f.onload=function(){
            var a="image/"+d,m=p.createElement("canvas"),h=m.getContext("2d"),l="";
            m.width=f.width;
            m.height=f.height;
            h.drawImage(f,0,0);
            l=m.toDataURL(a);
            $[b]=l;
            W(l,c,d,
e,g)}
          ;
          f.onerror=function(){
            ea()}
          ;
          f.src=b}
        ,W=function(a,b,c,d,e){
          S["image_"+Q]={
            name:b,type:c,encodedData:a,width:d,height:e}
          ;
          ea()}
        ,ea=function(){
          var a={
            }
          ,b,d,e,g,f,m=!1;
          Q<R?(b=P[Q].replace(/\"/g,""),b.split(" ").forEach(function(b){
            b=b.split("=");
            a[b[0]]=b[1]}
          ),a["xlink:href"]&&(b=(d=T(a["xlink:href"]))&&d.name||"temp_image_"+Q,e=d&&d.type||"png",g=parseInt(a.width,10),f=parseInt(a.height,10),d=b+"."+e,$[a["xlink:href"]]?m=!0:U(a["xlink:href"],b,e,g,f)),b='xlink:href="'+a["xlink:href"],N=N.replace(b,
'xlink:href="temp/'+d),Q+=1,m&&ea()):(C.encodedImgData=JSON.stringify(S),C.stream=N,c())}
        ,ea()):c():c();
        q.raiseEvent("exportDataReady",C,e)}
      ,function(){
        q.raiseEvent("exportCancelled",h,e)}
      )}
    ,print:function(a){
      var b=this,c=n({
        }
      ,a);
      if(b.isPrinting)return!1;
      q.raiseEvent("BeforePrint",c,b.logic.chartInstance,void 0,function(){
        var a=b.container,d=b.elements,e=d.printButton,g=d.exportButton,m=[],h=a.parentNode,d=p.body||p.getElementsByTagName("body")[0],l=d.childNodes;
        b.isPrinting=!0;
        fa(l,function(a,b){
          1==
a.nodeType&&(m[b]=a.style.display,a.style.display="none")}
        );
        !1!==c.hideButtons&&(e&&"hidden"!=e.attrs.visibility&&e.attr({
          visibility:"hidden"}
        ),g&&"hidden"!=g.attrs.visibility&&g.attr({
          visibility:"hidden"}
        ));
        d.appendChild(a);
        D.print();
        setTimeout(function(){
          e&&e.attr({
            visibility:"visible"}
          );
          g&&g.attr({
            visibility:"visible"}
          );
          h.appendChild(a);
          fa(l,function(a,b){
            1==a.nodeType&&(a.style.display=m[b])}
          );
          b.isPrinting=!1;
          q.raiseEvent("PrintComplete",c,b.logic.chartInstance)}
        ,1E3)}
      ,function(){
        q.raiseEvent("PrintCancelled",
c,b.logic.chartInstance)}
      )}
    ,getSymbolPath:function(a,b,c,d,e,g,h){
      var l=["M"],k,n,r;
      k=(g.color&&Xb("string"===typeof g.color?g.color:g.color.FCcolor.color)||U).replace(ga,"");
      r=Kb(k,60).replace(ga,Z);
      h?k={
        FCcolor:{
          color:k,angle:0,ratio:"0",alpha:"100"}
        }
      :(h=Kb(k,40),k={
        FCcolor:{
          color:k+","+k+","+h+","+k+","+k,ratio:"0,30,30,30,10",angle:0,alpha:"100,100,100,100,100"}
        }
      );
      switch(e){
        case "column":case "dragcolumn":case "column3d":g=.25*c;
        e=.5*g;
        h=.7*d;
        n=.4*d;
        l=l.concat([a,b+d,"l",0,-h,g,0,0,h,"z","m",
g+e,0,"l",0,-d,g,0,0,d,"z","m",g+e,0,"l",0,-n,g,0,0,n,"z"]);
        k.FCcolor.angle=270;
        break;
        case "bar":case "bar3d":g=.3*c;
        e=.6*c;
        h=d/4;
        n=h/2;
        l=l.concat([a,b,"L",a+e,b,a+e,b+h,a,b+h,"Z","M",a,b+h+n,"L",a+c,b+h+n,a+c,b+h+n+h,a,b+2*h+n,"Z","M",a,b+2*(h+n),"L",a+g,b+2*(h+n),a+g,b+d,a,b+d,"Z"]);
        break;
        case "area":case "area3d":case "areaspline":case "dragarea":h=.6*d;
        n=.2*d;
        d*=.8;
        l=l.concat([a,b+d,"L",a,b+h,a+.3*c,b+n,a+.6*c,b+h,a+c,b+n,a+c,b+d,"Z"]);
        k.FCcolor.angle=270;
        break;
        case "pie":case "pie3d":g=.5*c;
        
e=.9*g;
        c=a+g+1;
        d=b+g-1;
        a=a+g-1;
        b=b+g+1;
        l=l.concat(["M",c,d,"L",c,d-e+1,"A",e-1,e-1,0,0,1,c+e-1,d,"Z","M",a,b,"L",a,b-e,"A",e,e,0,1,0,a+e,b,"Z"]);
        k.FCcolor.radialGradient="1";
        k.FCcolor.ratio="0,0,0,100,0";
        break;
        case "boxandwhisker2d":l=l.concat([a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]);
        k=g.color;
        r="#000000";
        break;
        default:l=l.concat([a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]),k.FCcolor.angle=270,k.FCcolor.ratio="0,70,30"}
      return{
        path:l,color:k,strokeWidth:.5,strokeColor:r}
      }
    }
  );
  e.prototype={
    configure:function(){
      var a=
this.axisData,b=this.renderer,c=this.isVertical,d=this.isReverse,e=b.options,g=e.chart,h=g.marginBottom,g=g.marginRight,l=b.canvasTop,k=b.canvasLeft,n=this.min=a.min,n=this.span=(this.max=a.max)-n,k=this.startX=oa(a.startX,k),l=this.startY=oa(a.startY,l),r=this.endX=oa(a.endX,b.canvasRight),a=this.endY=oa(a.endY,b.canvasBottom),n=this.pixelRatio=c?(a-l)/n:(r-k)/n,p=this.relatedObj={
        }
      ;
      p.marginObj={
        top:l,right:g,bottom:h,left:k}
      ;
      p.canvasObj={
        x:k,y:l,w:r-k,h:a-l,toX:r,toY:a}
      ;
      this.startPixel=d?c?a:r:
c?l:k;
      this.pixelValueRatio=d?-n:n;
      this.primaryOffset=this.secondaryOffset=0;
      this.cache={
        lowestVal:0,highestVal:0,indexArr:[],hashTable:{
          }
        }
      ;
      this.elements=this.elements||{
        }
      ;
      this.belowBandGroup&&(b.elements.axes=b.elements.axes||{
        }
      ,b.elements.axes.belowBandGroup=this.belowBandGroup,e&&e.chart&&e.chart.hasScroll&&this.belowBandGroup.attr({
        "clip-rect":b.elements["clip-canvas"]}
      ));
      this.poi={
        }
      }
    ,draw:function(){
      var a=this.axisData,b=a&&a.plotLines||[],c=a&&a.plotBands||[],d=a&&a.showLine,e=a&&a.tickLength,
g=a&&a.tickWidth;
      a&&a.title&&this.drawAxisName();
      a&&a.labels&&(this.renderer.addCSSDefinition("."+a.labels.className+" .fusioncharts-label",a.labels.style),this.belowLabelGroup&&this.belowLabelGroup.attr("class",a.labels.className),this.topLabelGroup&&this.topLabelGroup.attr("class",a.labels.className));
      b&&0<b.length&&this.drawPlotLine();
      c&&0<c.length&&this.drawPlotBands();
      isNaN(e)||0===e||isNaN(g)||0===g||this.drawTicks();
      d&&this.drawLine()}
    ,scroll:function(){
      }
    ,setOffset:function(a,b){
      var c=this.primaryOffset=
a,d=this.secondaryOffset=b||this.secondaryOffset,e=this.isVertical,g,h,l,k=[this.topLabelGroup,this.belowLabelGroup,this.topLineGroup,this.belowLineGroup,this.topBandGroup,this.belowBandGroup],n,r;
      n=0;
      for(r=k.length;
      n<r;
      n+=1)if(l=k[n])g=e?d:c,h=e?c:d,l.attr({
        transform:"t"+g+","+h}
      );
      e||this.drawPlotLine&&this.drawPlotLine()}
    ,update:function(){
      }
    ,drawTicks:function(){
      var a=this.axisData,b=this.renderer.paper,c=this.min,d=this.max,e=this.isVertical,g=this.layerBelowDataset,g=this.tickGroup=this.tickGroup||
b.group("axis-ticks",g),h=this.relatedObj.canvasObj,l=a.offset,k=a.opposite,n=a.showAxis,r=a.tickInterval,p=a.tickLength,q=a.tickWidth,a=a.tickColor,t=c;
      if(e&&n)for(c=this.getAxisPosition(c),e=this.getAxisPosition(d),h=k?h.toX+l:h.x-l,b.path(["M",h,c,"L",h,e],g).attr({
        stroke:a,"stroke-width":q}
      );
      za(t)<=d;
      )l=this.getAxisPosition(t),c=k?h+p:h-p,b.path(["M",h,l,"L",c,l],g).attr({
        stroke:a,"stroke-width":q}
      ),t+=r}
    ,getAxisPosition:function(a,b){
      var c;
      b?c=(a-this.startPixel)/this.pixelValueRatio+this.min:
(a=this.axisData.reversed?this.min+(this.max-a):a,c=this.startPixel+(a-this.min)*this.pixelValueRatio);
      return c}
    ,drawPlotLine:function(){
      var a=this.renderer,b=a.paper,c=this.isVertical,d=+!c,e=this.lines=this.lines||[],h=this.labels=this.labels||[],l=this.relatedObj.canvasObj,k=this.globalOptions||{
        }
      ,n=this.elements||{
        }
      ,r=this.axisData.plotLines||[],p=this.primaryOffset,q=c?this.startY:this.startX,t=c?this.endY:this.endX,w=parseFloat(a.canvasBorderWidth)||0,v=Ra(r.length,Ra(e.length,h.length)),u=
a.layers.datalabels,B=this.belowLineGroup,C=this.topLineGroup,F=this.belowLabelGroup,D=this.topLabelGroup,L=!1!==(a.tooltip||{
        }
      ).enabled,J=function(b){
        return function(c){
          pa.call(this,a,c,b)}
        }
      ,N=k.chart.xDepth||0,k=k.chart.textDirection,P=[],R=0,Q,S,W,$,Z,Ua,Aa,ub,ia,s,z,A,O,f,Ia,X,H,aa,ba,sa,ha,ka,I,wa,Ja,fa,ga,la,xa,va,ya,qa,Da,Ca,za,Ya,Oa,Ga,cb,Na,Ea,La,jb;
      for(jb=0;
      jb<v;
      jb+=1){
        W=$=Z=null;
        W=e[jb];
        $=h[jb];
        if(Aa=r[jb])if(ub=Aa.width,ia=Aa.isVline,s=Aa.isTrend,z=Aa.isGrid,A=Aa.tooltext,O=Aa.value,f=
Aa.color,Ia=Aa.dashStyle,X=s?Aa.to:null,H=Aa._isStackSum,Q=3<Aa.zIndex?C:B,aa=Aa.label){
          ba=aa.style;
          sa=aa.text;
          ha=ba&&ba.color;
          ka=aa.offsetScaleIndex||0;
          I=aa.offsetScale;
          if(wa=ba&&ba.fontSize)Ja=wa,-1!==Ja.indexOf("px")&&(Ja=Ja.replace("px",""),Ja=parseFloat(Ja));
          S=ba&&ba.lineHeight;
          wa=ba?{
            fontFamily:ba.fontFamily,fontSize:ba.fontSize,lineHeight:ba.lineHeight,fontWeight:ba.fontWeight,fontStyle:ba.fontStyle}
          :null;
          S&&(fa=S,-1!==fa.indexOf("px")&&(fa=fa.replace("px",""),fa=parseFloat(fa)));
          ga=aa.rotation;
          
la=aa.x||0;
          xa=aa.y||0;
          va=aa.align;
          ya=aa.verticalAlign;
          qa=aa.textAlign;
          Da=oa(parseInt(aa.borderWidth,10),1);
          S=H?u:3<=Aa.zIndex?D:F;
          aa.backgroundColor&&(aa.labelBgClr=ea({
            color:aa.backgroundColor,alpha:100*aa.backgroundOpacity}
          ));
          aa.borderColor&&(aa.labelBorderClr=ea({
            color:aa.borderColor,alpha:"100"}
          ));
          Ca=Ja?.2*Ja:2;
          qa="left"===qa?"start":"right"===qa?"end":"middle"}
        Ua=Ea="visible";
        La=0>oa(I,O,0);
        c?(Ya=this.getAxisPosition(O),Ga=s?this.getAxisPosition(X)||Ya:Ya,cb=Ya!==Ga?!0:!1,Na=["M",l.x,Ya,"L",
l.toX,Ga],ia?a.logic.isBar&&(za=a.yAxis[ka],!H&&!isNaN(I)&&0<=I&&1>=I&&(I=za.min+(za.max-za.min)*I),Oa=za.getAxisPosition(oa(I,O))+la+Ca*(La?-1:1)):Oa=aa?za=this.axisData.isOpposite||"right"===va?l.toX+la:l.x+la:za=this.axisData.isOpposite?l.toX:l.x):(za=this.getAxisPosition(O)||0,Oa=s?this.getAxisPosition(X)||za:za,!s&&!ia&&0<N&&!a.logic.isBar&&(za+=N,Oa+=N,t+=N),cb=za!==Oa?!0:!1,Na=["M"+za,l.y,"L",Oa,l.toY],Ea=za+p<q||za+p>t?"hidden":Ea,ia?(za=a.yAxis[ka],!H&&!isNaN(I)&&0<=I&&1>=I&&(I=za.min+(za.max-
za.min)*(1-I)),Ya=za.getAxisPosition(oa(I,O))+xa,Ya-=(w+parseFloat(Da))*(xa&&(0<xa?-1:1))):this.axisData.opposite||"top"===ya&&!z?(Ya=l.y+xa,Ga="bottom"):Ya=l.toY+xa,Ga=Ya);
        Ua=c?Ua:Oa+p<q||Oa+p>t?"hidden":Ua;
        if(Aa&&"visible"===Ea&&.1<ub)cb={
          path:T(Na,ub),stroke:f,"stroke-width":ub,"shape-rendering":!cb&&1<=ub?"crisp":void 0,"stroke-dasharray":Ia?Ia:void 0,visibility:Ea}
        ,W?W.attr(cb):(W=e[jb]=b.path(cb,Q).css(Aa.style),n.lines=n.lines||[],n.lines.push(W)),L&&A&&ub<G&&Ea&&(Z=b.path({
          stroke:g,"stroke-width":G,
ishot:!0,path:Na,fill:g}
        ,a.layers.tracker)),Z=Z||W,L&&A&&Z.tooltip(A);
        else if(W||$)W&&W.remove(),W=null,e&&(e[jb]=null),n&&n.lines&&(n.lines[jb]=null);
        aa&&Aa&&!Aa.stepped&&"visible"===Ua&&aa.text!=U&&" "!=aa.text?(Ya=s?"left"===va?Ya:Ga:Ga,Z=Oa-+!ia*d*N+d*(la||0),H?(Ga=c||ga?"middle":"bottom",Ya+=c?0:Ja*(La?-.4:.4),ga&&(Ya+=La?4:-2,qa=La?"end":"start")):d&&this.axisData.opposite?(Ga=kb,qa=ga?"start":"middle"):Ga=ya,/\n|<br\s*?\/?>/ig.test(sa)&&z&&(ga?(Ga="middle",Z-=d*(la||0)):(Ga=d&&this.axisData.opposite&&
!ga?"middle":Ub,Ya-=fa)),cb={
          "class":"fusioncharts-label",text:sa,fill:wa?ha||f:null,title:aa&&(aa.originalText||U),cursor:aa.link?"pointer":U,x:Z,y:Ya,"text-anchor":qa,"vertical-align":Ga,direction:k,transform:" ","text-bound":[ba.backgroundColor||aa.labelBgClr,ba.borderColor||aa.labelBorderClr,ba.borderThickness||Da,ba.borderPadding||Ca,ba.borderRadius,ba.borderDash],visibility:Ua,"line-height":ba.lineHeight}
        ,$?$.attr(cb):($=h[jb]=b.text(cb,S).attr("class","fusioncharts-label"),W&&(W.label=$),n.labels=
n.labels||[],n.labels.push($),Aa.isDataLabel&&$.click(J("dataLabelClick")).hover(J("dataLabelRollOver"),J("dataLabelRollOut"))),wa&&$.css(wa),Aa.isDataLabel&&(Ua={
          text:sa,index:R,link:aa.link}
        ,R+=1,$.data("eventArgs",Ua)),ga&&$.attr("transform",["r",ga,Z,Ya]),H&&$&&P.push($)):$&&($.isRotationSet=!1,$.remove(),h&&(h[jb]=null),n&&n.labels&&(n.labels[jb]=null));
        !W&&!$||Aa&&null===Aa.value||(Aa&&Aa.isMinLabel?this.poi.min={
          label:$,index:jb,line:W}
        :Aa&&Aa.isMaxLabel?this.poi.max={
          label:$,index:jb,line:W}
        :
Aa&&Aa.isZeroPlane&&(this.poi.zero={
          label:$,index:jb,line:W}
        ));
        W=$=null}
      oa(a.options.plotOptions.series.animation.duration,0)}
    ,drawPlotBands:function(){
      var a=this.renderer,b=a.paper,c=this.isVertical,d=this.axisData.plotBands||[],e=this.bands=this.bands||[],g=this.bandLabels=this.bandLabels||[],h=this.relatedObj.canvasObj,l=this.primaryOffset,k=c?this.startY:this.startX,n=c?this.endY:this.endX,r=a.options.chart.hasScroll,p=this.belowBandGroup,q=this.topBandGroup,t=this.belowLabelGroup,w=this.topLabelGroup,
v=this.elements||{
        }
      ,u=a.options.chart.textDirection,a=!1!==(a.tooltip||{
        }
      ).enabled,B,C,F,G,D,L,J,N,P,R,Q,S,T,$,W,U,ia,s,z,A,O,f,Z,X,H,aa,ba,pa,sa,ha,I,wa,fa,ga,ka,la=Ra(d.length,e.length);
      for(ka=0;
      ka<la;
      ka+=1){
        ga="visible";
        wa=e[ka];
        fa=g[ka];
        if(B=d[ka])if(C=B.tooltext,F=B.to,G=B.from,D=B.value,L=B.width,J=B.color,ha=3<B.zIndex?q:p,N=B.label){
          if(P=N.style){
            if($=P.fontSize)R=$,-1!==R.indexOf("px")&&(R=R.replace("px",""),parseFloat(R));
            (R=P.lineHeight)&&-1!==R.indexOf("px")&&(R=R.replace("px",""),parseFloat(R));
            
z=P.color}
          (R=N.borderWidth)&&-1!==R.indexOf("px")&&R.replace("px","");
          Q=N.align;
          S=N.x;
          T=N.y;
          ia=N.text;
          s=N.originalText;
          W=N.backgroundColor;
          U=N.backgroundOpacity;
          W&&(O=N.labelBgClr=ea({
            color:W,alpha:100*U}
          ));
          if(W=N.borderColor)f=N.labelBorderClr=ea({
            color:W,alpha:"100"}
          );
          W=N.textAlign;
          W="left"===W?"start":"right"===W?"end":"middle";
          U=N.verticalAlign;
          A=N.borderType;
          I=3<B.zIndex?w:t}
        Z=this.getAxisPosition(oa(F,D));
        X=this.getAxisPosition(oa(G,D));
        H=c?h.x:X;
        aa=c?Z:h.y;
        ba=c?h.w:(this.axisData.reversed?
X-Z:Z-X)||L||1;
        X=c?X-Z||1:h.h;
        Z=H+ba;
        ba=hb(ba);
        0>X&&(X=hb(X),aa-=X);
        c||(ga=r?"hidden":H+l>n||Z+l<k?"hidden":ga);
        N&&(pa=c?"right"===Q?h.toX+S:h.x+S:H+ba/2,sa=c?aa+X/2:h.toY+T);
        if(!wa&&B&&"visible"===ga)B={
          x:H,y:aa,width:ba,height:X,fill:ea(J),"stroke-width":0}
        ,wa?wa.attr(B):(wa=e[ka]=b.rect(B,ha),v.bands=v.bands||[],v.bands[ka]=wa),a&&C&&wa.tooltip(C);
        else if(wa&&(!B||"hidden"===ga)){
          v.labels&&(g[ka]=v.labels[ka]=null);
          wa.label&&wa.label.remove();
          e[ka]=v.bands[ka]=null;
          wa.remove();
          continue}
        wa&&N&&
N.text&&(B={
          "class":"fusioncharts-label",text:ia,title:s||"",fill:z,"text-bound":[O,f,R,.2*$,"solid"===A?!1:!0],x:pa,y:sa,"text-anchor":W,direction:u,"vertical-align":U,"line-height":P.lineHeight}
        ,fa?fa.attr(B):(fa=g[ka]=wa.label=b.text(B,I).attr("class","fusioncharts-label"),P&&fa.css(P),v.labels=v.labels||[],v.labels[ka]=fa))}
      }
    ,drawAxisName:function(){
      var a=this.axisData,b=a.title||{
        }
      ,c=b&&b.style,d=b&&b.className,e=b.align,g=b.centerYAxisName||!1,h=this.renderer.paper,l=this.isVertical,k=this.relatedObj.canvasObj,
n=oa(a.offset,0)+oa(b.margin,0),r=b.text||"",p=this.name||void 0,a=a.opposite,q=this.layerBelowDataset,q=q.nameGroup=q.nameGroup||h.group("axis-name",q),t=oa(b.rotation,a?90:270),w=l?a?k.toX+n:k.x-n:(k.x+k.toX)/2,v={
        fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,fontWeight:c.fontWeight,fontStyle:c.fontStyle}
      ,u,g=l?"low"===e?k.toY:g?(k.y+k.toY)/2:this.renderer.chartHeight/2:k.toY+n;
      r?(!isNaN(t)&&t&&l&&(u=c.fontSize,u=-1!=u.indexOf("px")?u.replace("px",""):u,a?(w+=parseFloat(u),
u=270===t?"bottom":"top"):(w-=parseFloat(u),u=270===t?"top":"bottom")),this.renderer.addCSSDefinition("."+d,v),d={
        "class":d,x:0,y:0,text:r,fill:c.color,direction:this.renderer.options.chart.textDirection,"text-anchor":"low"===e?90==t?"end":"start":"middle","vertical-align":l?t?u:"middle":a?kb:"top",transform:l?"t"+w+","+g+"r"+t:"t"+w+","+g,"font-size":c.fontSize}
      ,b.originalText&&(d.title=b.originalText),p?p.attr(d):p=this.name=h.text(d,q),setTimeout(function(){
        p.attr({
          "line-height":c.lineHeight,"text-bound":[c.backgroundColor,
c.borderColor,c.borderThickness,c.borderPadding,c.borderRadius,c.borderDash]}
        )}
      ,0)):p&&p.remove();
      this.elements.name=p}
    ,drawLine:function(){
      var a=this.axisData,b=this.renderer.paper,c=this.min,d=this.max,e=this.isVertical,g=a.opposite,h=this.layerBelowDataset,h=this.lineGroup=this.lineGroup||b.group("axis-lines",h),l=a.lineColor,k=a.lineThickness,n=a.lineEndExtension||0,r=a.lineStartExtension||0,a=this.relatedObj.canvasObj;
      e?(c=this.getAxisPosition(c)-r,n=this.getAxisPosition(d)+n,d=e=g?a.toX+k/2:
a.x-k/2):(d=a.x-r,e=a.toX+n,c=n=g?a.y-k/2:a.toY+k/2);
      b=b.path({
        path:["M",d,c,"L",e,n],stroke:l,"stroke-width":k}
      ,h);
      this.elements.axisLine=b}
    ,realtimeUpdateX:function(a){
      if(0<a){
        for(var b=this.axisData.plotBands,c=this.min+a,d,e=b.length;
        e--;
        )(d=b[e])&&!d.isNumVDIV&&(d.value<c||d.from<c||d.to<c?b.splice(e,1):(void 0!==d.value&&(d.value-=a),void 0!==d.from&&(d.from-=a),void 0!==d.to&&(d.to-=a)));
        this.drawPlotLine();
        this.drawPlotBands()}
      }
    ,realtimeUpdateY:function(a,b){
      var c=this.axisData,d=this.min=
c.min=a,c=this.span=(this.max=c.max=b)-d,c=this.pixelRatio=this.isVertical?this.relatedObj.canvasObj.h/c:this.relatedObj.canvasObj.w/c;
      this.pixelValueRatio=this.isReverse?-c:c;
      this.drawPlotLine();
      this.drawPlotBands()}
    }
  ;
  e.prototype.constructor=e;
  J("renderer.cartesian",{
    drawCanvas:function(){
      var a=this.options.chart||{
        }
      ,b=a.plotBackgroundColor,c=this.paper,d=this.elements,e=d.canvas,g=d.canvas3DBase,h=d.canvas3dbaseline,g=d.canvasBorder,l=d.canvasBg,k=this.canvasTop,n=this.canvasLeft,r=this.canvasWidth,
p=this.canvasHeight,q=oa(a.plotBorderRadius,0),l=a.plotBorderWidth,w=.5*l,v=a.plotBorderColor,u=a.isBar,B=a.is3D,C=a.use3DLighting,F=a.showCanvasBg,G=a.canvasBgDepth,D=a.showCanvasBase,L=a.canvasBaseColor3D,J=a.canvasBaseDepth,P=a.plotShadow,R=t&&0===l&&P&&P.enabled,Q=a.xDepth||0,a=a.yDepth||0,S=this.layers,W=S.background,T=S.dataset;
      S.tracker=S.tracker||c.group("hot").insertAfter(T);
      S.datalabels=S.datalabels||c.group("datalabels").insertAfter(T);
      S=S.canvas=S.canvas||c.group("canvas").insertAfter(W);
      
g||(d.canvasBorder=c.rect({
        x:n-w,y:k-w,width:r+l,height:p+l,r:q,"stroke-width":l,stroke:v,"stroke-linejoin":2<l?"round":"miter"}
      ,S).shadow(P));
      d["clip-canvas"]=[Ra(0,n-Q),Ra(0,k-a),Ra(1,r+2*Q),Ra(1,p+2*a)];
      d["clip-canvas-init"]=[Ra(0,n-Q),Ra(0,k-a),1,Ra(1,p+2*a)];
      B&&(F&&(l=u?d.canvasBg=c.path(["M",n,",",k,"L",n+1.2*G,",",k-G,",",n+r-G,",",k-G,",",n+r,",",k,"Z"],S):d.canvasBg=c.path(["M",n+r,",",k,"L",n+r+G,",",k+1.2*G,",",n+r+G,",",k+p-G,",",n+r,",",k+p,"Z"],S),l.attr({
        "stroke-width":0,stroke:"none",
fill:ea(b)}
      )),D&&(g=u?d.canvas3DBase=c.cubepath(n-Q-J-1,k+a+1,J,p,Q+1,a+1,S):d.canvas3DBase=c.cubepath(n-Q-1,k+p+a+1,r,J,Q+1,a+1,S),g.attr({
        stroke:"none","stroke-width":0,fill:[L.replace(ga,Z),!C]}
      ),h||(h=d.canvas3dbaseline=c.path(void 0,S)),h.attr({
        path:u?["M",n,k,"V",p+k]:["M",n,k+p,"H",r+n],stroke:N.tintshade(L.replace(ga,Z),.05).rgba}
      )));
      !e&&b&&(d.canvas=c.rect({
        x:n,y:k,width:r,height:p,r:q,"stroke-width":0,stroke:"none",fill:ea(b)}
      ,S).shadow(R))}
    ,drawAxes:function(){
      var a=this.logic,b=this.options,
c=this.paper,d=this.layers,g=d.dataset,h=d.layerBelowDataset=d.layerBelowDataset||c.group("axisbottom").trackTooltip(!0),l=d.layerAboveDataset=d.layerAboveDataset||c.group("axistop").trackTooltip(!0),c=this.xAxis=[],d=this.yAxis=[];
      h.insertBefore(g);
      l.insertAfter(g);
      if(b.xAxis&&b.xAxis.length)for(g=0,h=b.xAxis.length;
      g<h;
      g+=1)c[g]=this.xAxis[g]=new e(b.xAxis[g],this,a.isBar);
      else c[0]=this.xAxis[0]=new e(b.xAxis,this,a.isBar);
      if(b.yAxis)for(g=0,h=b.yAxis.length;
      g<h;
      g+=1)d[g]=this.yAxis[g]=new e(b.yAxis[g],
this,!a.isBar,!a.isBar);
      g=0;
      for(h=d.length;
      g<h;
      g+=1)d[g].axisData&&(d[g].axisData.title&&(d[g].axisData.title.className="fusioncharts-yaxis-"+g+"-title"),d[g].axisData.labels&&(d[g].axisData.labels.className="fusioncharts-yaxis-"+g+"-gridlabels")),d[g].draw();
      g=0;
      for(h=c.length;
      g<h;
      g+=1)c[g].axisData&&(c[g].axisData.title&&(c[g].axisData.title.className="fusioncharts-xaxis-"+g+"-title"),c[g].axisData.labels&&(c[g].axisData.labels.className="fusioncharts-xaxis-"+g+"-gridlabels")),c[g].draw()}
    ,drawScroller:function(){
      var a=
this,b=a.options,c=a.paper,d=a.layers,e=a.xAxis["0"]||{
        }
      ,g=e.axisData||{
        }
      ,h=g.scroll||{
        }
      ,l=a.canvasTop,k=a.canvasLeft,r=a.canvasWidth,p=a.canvasHeight,t=a.canvasBorderWidth,w=t||(g.showLine?g.lineThickness:0),v=t||g.lineStartExtension,g=t||g.lineEndExtension,t=b.chart.useRoundEdges,u,B,C,F,G,D,L,J,P,R,Q,S,T,$,U,ea=d.dataset,Z=d.datalabels,ba=d.tracker;
      F=d.layerAboveDataset;
      var pa,ia;
      h.enabled&&(pa=d.scroll=d.scroll||c.group("scroll").insertAfter(F),F=h.scrollRatio,b=oa(b[W].xAxisScrollPos,h.startPercent),
G=h.viewPortMax,D=h.viewPortMin,B=h.vxLength,L=La(B),J=h.showButtons,P=h.height,R=h.padding,Q=h.color,S=h.flatScrollBars,B=h.windowedCanvasWidth=e.getAxisPosition(B),u=h.fullCanvasWidth=e.getAxisPosition(G-D)-B,C=ka(b*u),T=a.fusionCharts.jsVars._reflowData,$={
        hcJSON:{
          _FCconf:{
            xAxisScrollPos:0}
          }
        }
      ,U=$.hcJSON._FCconf,d.scroller=c.scroller(k-v,l+p+w+R-!!w,r+v+g,P,!0,{
        showButtons:J,displayStyleFlat:S,scrollRatio:F,scrollPosition:b}
      ,pa).data("fullCanvasWidth",u).data("windowedCanvasWidth",B).attr({
        "scroll-display-style":S,
fill:Q,r:t&&2||0}
      ).scroll(function(b){
        var c;
        C=-ka(b*u);
        ea&&ea.transform(["T",C,0]);
        Z&&Z.transform(["T",C,0]);
        ba&&ba.transform(["T",C,0]);
        e.setOffset&&e.setOffset(C);
        c={
          position:b,direction:b-h.lastPos||0,vxLength:L}
        ;
        U.xAxisScrollPos=h.lastPos=b;
        n(T,$,!0);
        if(0!==c.direction)for(ia=0;
        ia<a.datasets.length;
        ia++)a[a.datasets[ia].drawPlot+"Scroll"]&&a[a.datasets[ia].drawPlot+"Scroll"].call(a,a.plots[ia],a.datasets[ia],c)}
      ),function(){
        var b;
        N.eve.on("raphael.scroll.start."+d.scroller.id,function(c){
          b=c;
          
q.raiseEvent("scrollstart",{
            scrollPosition:c}
          ,a.logic.chartInstance)}
        );
        N.eve.on("raphael.scroll.end."+d.scroller.id,function(c){
          q.raiseEvent("scrollend",{
            prevScrollPosition:b,scrollPosition:c}
          ,a.logic.chartInstance)}
        )}
      ());
      return h.enabled}
    ,finalizeScrollPlots:function(){
      var a=this,c=a.container,d=a.elements,e=a.layers,g=e.scroller,h=e.dataset,k=e.datalabels,e=e.tracker,n,r={
        }
      ,p,t=a.xAxis["0"]||{
        }
      ,w=(t.axisData||{
        }
      ).scroll||{
        }
      ,v=oa(a.options[W].xAxisScrollPos,w.startPercent),u=w.fullCanvasWidth;
      w.enabled&&
(h.attr({
        "clip-rect":d["clip-canvas"]}
      ),k.attr({
        "clip-rect":d["clip-canvas"]}
      ),e.attr({
        "clip-rect":d["clip-canvas"]}
      ),d=function(c){
        var d=a.elements.canvas,e=n.left,h=n.top,k=c.state,E=ya&&b.getTouchEvent(c)||l;
        c=c.originalEvent;
        e=(c.clientX||c.pageX||E.pageX)-e;
        h=(c.clientY||c.pageY||E.pageY)-h;
        switch(k){
          case "start":p=d.isPointInside(e,h);
          r.ox=p&&e||null;
          if(!p)return!1;
          r.prevScrollPosition=g.attrs["scroll-position"];
          q.raiseEvent("scrollstart",{
            scrollPosition:r.prevScrollPosition}
          ,a.logic.chartInstance);
          
break;
          case "end":q.raiseEvent("scrollend",{
            prevScrollPosition:r.prevScrollPosition,scrollPosition:r.scrollPosition}
          ,a.logic.chartInstance);
          p=!1;
          r={
            }
          ;
          break;
          default:if(!p)break;
          d=e-r.ox;
          r.ox=e;
          r.scrollPosition=g.attrs["scroll-position"]-d/u;
          g.attr({
            "scroll-position":r.scrollPosition}
          )}
        }
      ,ya&&(n=F(c),c&&(R(c,"pointerdrag",d),C(c,"pointerdrag",d))),0<v&&(c=-ka(v*u),h&&h.transform(["T",c,0]),k&&k.transform(["T",c,0]),e&&e.transform(["T",c,0]),t.setOffset&&t.setOffset(c)))}
    ,drawPlotColumn:function(a,b,c){
      var d=
this,e=a.data,h=e.length,l=a.items,k=a.graphics||(a.graphics=[]),n=d.paper,r=d.smartLabel,p=d.logic,q=d.layers,t=d.options,w=d.elements,u=t.chart,B=!1!==(t.tooltip||{
        }
      ).enabled,C,F=d.definition.chart,D=t.plotOptions.series,J=D.dataLabels.style,R=d.xAxis[b.xAxis||0],Q=d.yAxis[b.yAxis||0],S=d.chartWidth,T=d.chartHeight,$=Q.axisData.reversed,U=p.isLog,Z=p.is3D,ba=p.isStacked,fa=p.isWaterfall,ga=p.isCandleStick,Ua=v(R.axisData.scroll,{
        }
      ),Aa=c||{
        }
      ,ha=Ua.enabled,ia=oa(Aa.position,t[W].xAxisScrollPos,Ua.startPercent),
s=Aa.vxLength||La(Ua.vxLength),z=Aa.scrollStart||Ra(0,ka((h-s)*ia)-1)||0,A=Aa.scrollEnd||sa(h,z+s+2)||h,O=u.canvasBorderOpacity=N.color(u.plotBorderColor).opacity,f=d.canvasBorderWidth,Ia=u.isCanvasBorder=0!==O&&0<f,X,H=c!==xa?0:isNaN(+D.animation)&&D.animation.duration||1E3*D.animation,aa=b.numColumns||1,la=b.columnPosition||0,yb=u.use3DLighting,va=!1===b.visible?"hidden":"visible",za=u.overlapColumns,I=R.getAxisPosition(0),wa=R.getAxisPosition(1)-I,Ja=F&&F.plotspacepercent,qa=oa(F&&F.plotpaddingpercent),
ya=D.groupPadding,Ca=D.maxColWidth,Ga=(1-.01*Ja)*wa||sa(wa*(1-2*ya),Ca*aa),Ea=Ga/2,Na=Ga/aa,Sa=sa(Na-1,1<aa?za||qa!==xa?0<qa?Na*qa/100:0:4:0),Xc=la*Na-Ea+Sa/2,$a=Q.max,ab=Q.min,Ya=0<$a&&0<=ab,Oa=0>=$a&&0>ab,kb=0<$a&&0>ab,cb=Oa||$&&Ya?$a:U||Ya?ab:0,db=Q.yBasePos=Q.getAxisPosition(cb),nb,Ib=oa(u.useRoundEdges,0),jb=q.dataset=q.dataset||n.group("dataset-orphan"),bb=q.datalabels=q.datalabels||n.group("datalabels").insertAfter(jb),eb=q.tracker,gb=d.canvasTop,Kb=d.canvasLeft,Ub=d.canvasWidth,Xb=d.canvasBottom,
Fc=d.canvasRight,sc,md,nd,Gc,cc,dc,Oc,Qb,bc,xb,pb,oc,Gb,wc,Rb,hc,Sb,ib,xc,Hc,Ta,Hb,Ab,sb,pc,Pc,qb,Ba,Vb,qc,Qc,Wc,ic,rc,tc,yc,Ic,lb,zc,Dc=function(a){
        pa.call(this,d,a)}
      ,Qa=function(a,b){
        return function(c){
          a.attr(b);
          pa.call(this,d,c,"DataPlotRollOver")}
        }
      ,Bc=function(a,b){
        return function(c){
          a.attr(b);
          pa.call(this,d,c,"DataPlotRollOut")}
        }
      ;
      d.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label",{
        fontFamily:J.fontFamily,fontSize:J.fontSize,lineHeight:J.lineHeight,fontWeight:J.fontWeight,fontStyle:J.fontStyle,
color:J.color}
      );
      bb.attr("class","fusioncharts-datalabels");
      H&&(!c&&bb.attr({
        transform:"...t"+S+","+T}
      ),d.animationCompleteQueue.push({
        fn:function(){
          bb.attr({
            transform:"...t"+-S+","+-T}
          )}
        ,scope:d}
      ));
      Na-=Sa;
      ha&&z>A-s-2&&(z=Ra(0,A-s-2));
      ba&&(yc=jb.shadows||(jb.shadows=n.group("shadows",jb).toBack()));
      Vb=jb.column||(jb.column=n.group("columns",jb));
      ga||Z||ha||Vb.attrs["clip-rect"]||Vb.attr({
        "clip-rect":w["clip-canvas"]}
      );
      fa&&Vb.toBack();
      if(Z)for(cc=u.xDepth||0,dc=u.yDepth||0,qc=Vb.negative=Vb.negative||
n.group("negative-values",Vb),ic=Vb.column=Vb.column||n.group("positive-values",Vb),Wc=Vb.zeroPlane,!Wc&&0>ab&&0<=$a&&(Wc=Vb.zeroPlane=n.group("zero-plane",Vb).insertBefore(ic),md=u.zeroPlaneColor,nd=u.zeroPlaneBorderColor,Gc=u.zeroPlaneShowBorder,w.zeroplane=n.cubepath(Kb-cc,db+dc,Ub,1,cc,dc,Wc).attr({
        fill:[md,!yb],stroke:nd||"none","stroke-width":Gc?1:0}
      )),(Qc=qc.data("categoryplots"))||(qc.data("categoryplots",Array(h)),Qc=qc.data("categoryplots")),(rc=ic.data("categoryplots"))||(ic.data("categoryplots",
Array(h)),rc=ic.data("categoryplots")),xb=0;
      xb<h;
      xb+=1)Qc[xb]=Qc[xb]||n.group(qc),rc[xb]=rc[xb]||n.group(ic);
      else tc=Vb;
      r.setStyle({
        fontFamily:J.fontFamily,fontSize:J.fontSize,lineHeight:J.lineHeight,fontWeight:J.fontWeight,fontStyle:J.fontStyle}
      );
      for(xb=z;
      xb<A;
      xb+=1){
        pb=e[xb];
        Rb=pb.y;
        C=pb.toolText;
        sc=a.index+"_"+xb;
        qb=Ba=null;
        if(null===Rb){
          if(bc=l[xb])qb=bc.graphic,Z||qb.attr({
            height:0}
          )}
        else{
          Oc=!1;
          wc=oa(pb.x,xb);
          oc=pb.link;
          Gb=L(pb.borderWidth)||0;
          Pc=pb._FCW*wa;
          Sb=R.getAxisPosition(pb._FCX)||R.getAxisPosition(wc)+
Xc;
          hc=pb.previousY;
          xc=Q.getAxisPosition(hc||cb);
          ib=Q.getAxisPosition(Rb+(hc||0));
          Ta=hb(ib-xc);
          Hb=Pc||Na;
          zc={
            index:xb,link:oc,value:pb.y,displayValue:pb.displayValue,categoryLabel:pb.categoryLabel,toolText:pb.toolText,id:a.userID,datasetIndex:a.index,datasetName:a.name,visible:a.visible}
          ;
          if(Z){
            0>Rb&&(ib=xc,Oc=!0);
            tc=0>Rb?Qc:rc;
            (bc=l[xb])||(bc=l[xb]={
              index:xb,value:Rb,graphic:n.cubepath(tc[xb]),dataLabel:null,tracker:null,hot:null}
            );
            qb=bc.graphic;
            sb=pc={
              }
            ;
            pb.hoverEffects&&(sb={
              fill:[ea(pb.color),!yb],
stroke:Gb&&ea(pb.borderColor)||"NONE","stroke-width":Gb}
            ,Ab=pb.rolloverProperties,pc={
              fill:[ea(Ab.color),!yb],stroke:Ab.borderWidth&&ea(Ab.borderColor)||"NONE","stroke-width":Ab.borderWidth}
            );
            qb.attr({
              cubepath:[Sb-cc,H?db+dc:ib+dc,Hb,H?0:Ta,cc,dc],fill:[ea(pb.color),!yb],stroke:Gb&&ea(pb.borderColor)||"NONE","stroke-width":Gb,visibility:va}
            ).shadow(D.shadow&&pb.shadow,yc).data("BBox",{
              height:Ta,width:Hb,x:Sb,y:ib}
            );
            H&&qb.animate({
              cubepath:[Sb-cc,ib+dc,Hb,Ta,cc,dc]}
            ,H,"normal",d.getAnimationCompleteFn());
            
if(oc||B)!ba&&Ta<G&&(ib-=(G-Ta)/2,Ta=G),bc.tracker||(bc.tracker=n.cubepath(eb)),Ba=bc.tracker,Ba.attr({
              cubepath:[Sb-cc,ib+dc,Hb,Ta,cc,dc],cursor:oc?"pointer":"",stroke:Gb&&g||"NONE","stroke-width":Gb,fill:g,ishot:!0,visibility:va}
            );
            (Ba||qb).data("eventArgs",zc).data("groupId",sc).click(Dc).hover(Qa(qb,pc),Bc(qb,sb)).tooltip(C);
            (Ba||qb)._.cubetop.data("eventArgs",zc).data("groupId",sc).click(Dc).hover(Qa(qb,pc),Bc(qb,sb)).tooltip(C);
            (Ba||qb)._.cubeside.data("eventArgs",zc).data("groupId",sc).click(Dc).hover(Qa(qb,
pc),Bc(qb,sb)).tooltip(C);
            ba&&Oc&&(qb.toBack(),Ba&&Ba.toBack())}
          else{
            Qb=!1;
            if(!U&&!$&&0>Rb||!U&&$&&0<Rb)ib=xc,Qb=!0;
            $&&!kb&&0<Rb&&(ib=xc-Ta,Qb=!1);
            fa&&0>Rb&&Da(hc)&&(ib-=Ta,Qb=!0);
            ga||ha||(P(ib)<=gb&&(Ta-=gb-ib-+Ia,ib=gb-+Ia),ka(ib+Ta)>=Xb&&(Ta-=ka(ib+Ta)-Xb+ +!!Gb+ +Ia,u.xAxisLineVisible&&!Ia&&(Ta+=1)),1>=Gb&&(ka(Sb)<=Kb&&(Hb+=Sb,Sb=Kb-Gb/2+ +!!Gb-+Ia,Hb-=Sb),ka(Sb+Hb)>=Fc&&(Hb=Fc-Sb+Gb/2-+!!Gb+ +Ia)));
            Ic=N.crispBound(Sb,ib,Hb,Ta,Gb);
            Sb=Ic.x;
            ib=Ic.y;
            Hb=Ic.width;
            Ta=Ic.height;
            if(!ga&&Ia&&(!Da(hc)||
fa&&hc===Rb&&Rb===pb._FCY))if(Oa&&!$)X=ib-(gb-Gb/2),Ta+=X,db=ib-=X;
            else if(U||Ya||$&&Oa)Ta=Xb-ib+Gb/2,db=ib+Ta;
            fa&&hc&&0<Gb&&0!==D.connectorOpacity&&1===D.connectorWidth&&D.connectorDashStyle&&(--Ta,0>Rb&&(ib+=1));
            1>Ta&&(ib+=0>Rb?1:0===Rb?0:-(1-Ta),Ta=1);
            b._columnWidth=Hb;
            if(!(bc=l[xb])){
              bc=l[xb]={
                index:xb,value:Rb,width:Hb,graphic:null,valueBelowPlot:Qb,dataLabel:null,tracker:null}
              ;
              nb=0;
              H||(db=ib,nb=Ta||1);
              sb=pc={
                }
              ;
              pb.hoverEffects&&(sb={
                fill:ea(pb.color),stroke:ea(pb.borderColor),"stroke-width":Gb,
"stroke-dasharray":pb.dashStyle}
              ,Ab=pb.rolloverProperties,pc={
                fill:ea(Ab.color),stroke:ea(Ab.borderColor),"stroke-width":Ab.borderWidth,"stroke-dasharray":Ab.dashStyle}
              );
              lb={
                x:Sb,y:db,width:Hb,height:nb,r:Ib,fill:ea(pb.color),stroke:ea(pb.borderColor),"stroke-width":Gb,"stroke-dasharray":pb.dashStyle,"stroke-linejoin":"miter",visibility:va}
              ;
              qb?qb.attr(lb):qb=bc.graphic=n.rect(lb,tc);
              qb.shadow(D.shadow&&pb.shadow,yc).data("BBox",Ic);
              H&&qb.animate({
                y:ib,height:Ta||1}
              ,H,"normal",d.getAnimationCompleteFn());
              
if(oc||B)!ba&&Ta<G&&(ib-=(G-Ta)/2,Ta=G),lb={
                x:Sb,y:ib,width:Hb,height:Ta,r:Ib,cursor:oc?"pointer":"",stroke:g,"stroke-width":Gb,fill:g,ishot:!0,visibility:va}
              ,(Ba=bc.tracker)?Ba.attr(lb):Ba=bc.tracker=n.rect(lb,eb);
              Ba=bc.tracker;
              (Ba||qb).data("eventArgs",zc).data("groupId",sc).click(Dc).hover(Qa(qb,pc),Bc(qb,sb)).tooltip(C)}
            }
          Hc=d.drawPlotColumnLabel(a,b,xb,Sb,ib)}
        Hc&&k.push(Hc);
        qb&&k.push(qb);
        Ba&&k.push(Ba);
        d.drawTracker&&d.drawTracker.call(d,a,b,xb)}
      a.visible=!1!==b.visible;
      return a}
    ,drawPlotColumnScroll:function(a,
b,c){
      var d=a.data.length,e=a.items,g;
      g=c.vxLength;
      var h=Ra(0,ka((d-g)*c.position)-1)||0,d=sa(d,h+g+2)||d;
      h>d-g-2&&(h=Ra(0,d-g-2));
      c.scrollEnd=d;
      for(g=h;
      g<d;
      g++)if(!e[g]){
        c.scrollStart=g;
        this.drawPlotColumn(a,b,c);
        break}
      }
    ,drawPlotColumnLabel:function(a,b,c,d,e,g){
      var h=this.options,l=this.logic;
      d=h.chart;
      var k=this.paper,n=this.smartLabel,r=this.layers,h=h.plotOptions.series.dataLabels.style,p=1===d.rotateValues?270:0,q=this.canvasHeight,t=this.canvasTop,w=a.data[c];
      a=a.items[c];
      var u=d.valuePadding+
2,B=a.graphic;
      c=a.dataLabel;
      var C=v(a.valueBelowPlot,0>w.y),F=l.isStacked,l=l.is3D,G=d.xDepth||0,D=d.yDepth||0,L=w.displayValue;
      b=!1===b.visible?"hidden":"visible";
      var J=d.placeValuesInside,N;
      g=g||r.datalabels;
      Da(L)&&L!==U&&null!==w.y?(a._state&&a._state.labelWidth||(n=n.getOriSize(L),a._state=p?{
        labelWidth:n.height,labelHeight:n.width}
      :{
        labelWidth:n.width,labelHeight:n.height}
      ),B=B.data("BBox"),r=B.height,n=N=a._state.labelHeight+u,u=.5*N+u,B=B.x+.5*B.width,N=C?t+q-(e+r):e-t,F?(e=sa(t+q-.5*n,e+.5*
r+(D||0)),e=Ra(t+.5*n,e),B-=G):J?r>=n?(e+=C?r-u:u,w._valueBelowPoint=1,l&&(B-=G,e+=D)):N>=n?(e+=C?r+u:-u,l&&C&&(B-=G,e+=D)):(e+=C?r-u:u,w._valueBelowPoint=1,l&&(B-=G,e+=D)):N>=n?(e+=C?r+u:-u,l&&(C?(B-=G,e+=D):B-=G/2)):(e+=C?r-u:u,w._valueBelowPoint=1,l&&(B-=G,e+=D)),c?c.attr({
        x:B,y:e,visibility:b}
      ):c=a.dataLabel=k.text({
        text:L,"class":"fusioncharts-label",x:B,y:e,fill:h.color,"font-size":h.fontSize,direction:d.textDirection,visibility:b}
      ,g).attr({
        "line-height":h.lineHeight,"text-bound":[h.backgroundColor,
h.borderColor,h.borderThickness,h.borderPadding,h.borderRadius,h.borderDash]}
      ),p&&c.attr("transform","T0,0,R"+p)):c&&c.attr({
        text:U}
      );
      return c}
    ,drawPlotFloatedcolumn:function(a,b){
      this.drawPlotColumn.call(this,a,b)}
    ,drawPlotColumn3d:function(a,b){
      this.drawPlotColumn.call(this,a,b)}
    ,drawPlotBar:function(a,b){
      var c=this,d=a.data,e=d.length,h=a.items,l=a.graphics=[],k=c.paper,n=c.logic,r=c.layers,p=c.options,q=c.elements,t=p.chart,w=!1!==(p.tooltip||{
        }
      ).enabled,u,v=c.definition.chart,p=p.plotOptions.series,
B=p.dataLabels.style,C={
        fontFamily:B.fontFamily,fontSize:B.fontSize,lineHeight:B.lineHeight,fontWeight:B.fontWeight,fontStyle:B.fontStyle}
      ,B=c.xAxis[b.xAxis||0],F=c.yAxis[b.yAxis||0],D=n.is3D,n=n.isStacked,J=t.canvasBorderOpacity=N.color(t.plotBorderColor).opacity,R=c.canvasBorderWidth,J=t.isCanvasBorder=0!==J&&0<R,R=isNaN(+p.animation)&&p.animation.duration||1E3*p.animation,Q=b.numColumns||1,S=b.columnPosition||0,T=t.use3DLighting,$=!1===b.visible?"hidden":"visible",W=t.overlapColumns,U=B.getAxisPosition(0),
U=B.getAxisPosition(1)-U,Z=v&&v.plotspacepercent,v=oa(v&&v.plotpaddingpercent),ba=p.groupPadding,Ua=p.maxColWidth,Z=(1-.01*Z)*U||sa(U*(1-2*ba),Ua*Q),U=Z/2,Z=Z/Q,W=sa(Z-1,1<Q?W||v!==xa?0<v?Z*v/100:0:4:0),Q=Z-W,S=S*Z-U+W/2,Aa=F.max,fa=F.min,W=F.getAxisPosition(0>Aa&&0>fa?Aa:0<Aa&&0<fa?fa:0),v=oa(t.useRoundEdges,0),ia=c.canvasTop,U=c.canvasLeft,s=c.canvasHeight,Z=c.canvasRight,z=c.chartWidth,A=c.chartHeight,O,f,Ia,X,H,aa,ga,ha,la,va,ba=F.axisData.effectiveZeroPlaneThickness;
      ga=r.dataset=r.dataset||k.group("dataset-orphan");
      
var I=r.datalabels=r.datalabels||k.group("datalabels").insertAfter(ga),r=r.tracker,wa,Ja,qa,za,ya,Ca,Ua=function(a){
        pa.call(this,c,a)}
      ,Da=function(a,b){
        return function(d){
          a.attr(b);
          pa.call(this,c,d,"DataPlotRollOver")}
        }
      ,Ga=function(a,b){
        return function(d){
          a.attr(b);
          pa.call(this,c,d,"DataPlotRollOut")}
        }
      ,Ra;
      c.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label",C);
      I.attr("class","fusioncharts-datalabels");
      R&&(c.animationCompleteQueue.push({
        fn:function(){
          I.attr({
            transform:"...t"+-z+","+-A}
          )}
        ,
scope:c}
      ),I.attr({
        transform:"...t"+z+","+A}
      ));
      n&&(ya=ga.shadows||(ga.shadows=k.group("shadows",ga).toBack()));
      ha=ga.column=ga.column||k.group("bars",ga);
      if(D)for(O=t.xDepth||0,f=t.yDepth||0,C=ha.negative=ha.negative||k.group("negative-values",ha),ga=ha.column=ha.column||k.group("positive-values",ha),qa=ha.zeroPlane,!qa&&0>fa&&0<=Aa&&(qa=ha.zeroPlane=k.group("zero-plane",ha).insertBefore(ga),va=t.zeroPlaneColor,Aa=t.zeroPlaneBorderColor,fa=t.zeroPlaneShowBorder,q.zeroplane=k.cubepath(W-O,ia+f,1,s,
O,f,qa).attr({
        fill:[va,!T],stroke:Aa||"none","stroke-width":fa?1:0}
      )),(qa=C.data("categoryplots"))||(C.data("categoryplots",Array(e)),qa=C.data("categoryplots")),(va=ga.data("categoryplots"))||(ga.data("categoryplots",Array(e)),va=ga.data("categoryplots")),q=0;
      q<e;
      q+=1)qa[q]=qa[q]||k.group(C),va[q]=va[q]||k.group(ga);
      else ha.attrs["clip-rect"]||ha.attr({
        "clip-rect":q["clip-canvas"]}
      ),za=ha;
      q=0;
      for(C=e-1;
      q<e;
      q+=1,--C){
        ia=d[q];
        fa=ia.y;
        wa=s=null;
        if(null===fa){
          if(aa=h[q])wa=aa.graphic,D||wa.attr({
            width:0}
          )}
        else{
          ha=
oa(ia.x,q);
          ga=ia.link;
          u=ia.toolText;
          Aa=L(ia.borderWidth)||0;
          ha=B.getAxisPosition(ha)+S;
          aa=(Ia=ia.previousY)?F.getAxisPosition(Ia):W;
          la=F.getAxisPosition(fa+(Ia||0));
          Ia=hb(la-aa);
          0<fa&&(la=aa);
          Ja={
            index:q,link:ga,value:ia.y,displayValue:ia.displayValue,categoryLabel:ia.categoryLabel,toolText:ia.toolText,id:a.userID,datasetIndex:a.index,datasetName:a.name,visible:a.visible}
          ;
          if(D){
            za=0>fa?qa:va;
            (aa=h[q])||(aa=h[q]={
              index:q,value:fa,graphic:k.cubepath(za[C]),dataLabel:null,tracker:null}
            );
            wa=aa.graphic;
            
H=X={
              }
            ;
            ia.hoverEffects&&(H={
              fill:[ea(ia.color),!T],stroke:Aa&&ea(ia.borderColor)||"NONE","stroke-width":Aa}
            ,X=ia.rolloverProperties,X={
              fill:[ea(X.color),!T],stroke:X.borderWidth&&ea(X.borderColor)||"NONE","stroke-width":X.borderWidth}
            );
            wa.attr({
              cubepath:[R?W-O:la-O,ha+f,R?0:Ia,Q,O,f],fill:[ea(ia.color),!T],stroke:Aa&&ea(ia.borderColor)||"NONE","stroke-width":Aa,"stroke-dasharray":ia.dashStyle,cursor:ga?"pointer":"",visibility:$}
            ).shadow(p.shadow&&ia.shadow,ya).data("BBox",{
              height:Q,width:Ia,x:la,
y:ha}
            );
            R&&wa.animate({
              cubepath:[la-O,ha+f,Ia,Q,O,f]}
            ,R,"normal",c.getAnimationCompleteFn());
            if(ga||w)!n&&Ia<G&&(la-=(G-Ia)/2,Ia=G),aa.tracker||(aa.tracker=k.cubepath(r)),s=aa.tracker,s.attr({
              cubepath:[la-O,ha+f,Ia,Q,O,f],cursor:ga?"pointer":"",stroke:Aa&&g||"NONE","stroke-width":Aa,fill:g,ishot:!0}
            );
            (s||wa).data("eventArgs",Ja).click(Ua).hover(Da(wa,X),Ga(wa,H)).tooltip(u);
            (s||wa)._.cubetop.data("eventArgs",Ja).click(Ua).hover(Da(wa,X),Ga(wa,H));
            (s||wa)._.cubeside.data("eventArgs",Ja).click(Ua).hover(Da(wa,
X),Ga(wa,H));
            if(!n||n&&0>fa)wa.toBack(),s&&s.toBack()}
          else{
            P(la)<=U&&(Ia+=la,la=U+Aa/2+.2,t.xAxisLineVisible&&!J&&--la,Ia-=la);
            ka(la+Ia)>=Z&&(Ia=Z-la-Aa/2-.2);
            Ca=N.crispBound(la,ha,Ia,Q,Aa);
            la=Ca.x;
            ha=Ca.y;
            Ia=Ca.width;
            Ra=Ca.height;
            1>=Ia&&(Ia=1,la+=0>fa?-Ia:0===fa?0:1<ba?Ia:0);
            (aa=h[q])||(aa=h[q]={
              index:q,value:fa,height:Ra,graphic:null,dataLabel:null,tracker:null}
            );
            wa=aa.graphic;
            H=X={
              }
            ;
            ia.hoverEffects&&(H={
              fill:ea(ia.color),stroke:ea(ia.borderColor),"stroke-width":Aa,"stroke-dasharray":ia.dashStyle}
            ,
X=ia.rolloverProperties,X={
              fill:ea(X.color),stroke:ea(X.borderColor),"stroke-width":X.borderWidth,"stroke-dasharray":X.dashStyle}
            );
            fa={
              x:R?W:la,y:ha,width:R?0:Ia||1,height:Ra,r:v,fill:ea(ia.color),stroke:ea(ia.borderColor),"stroke-width":Aa,"stroke-dasharray":ia.dashStyle,"stroke-linejoin":"miter",cursor:ga?"pointer":"",visibility:$}
            ;
            wa?wa.attr(fa):wa=aa.graphic=k.rect(fa,za);
            wa.shadow(p.shadow&&ia.shadow,ya).data("BBox",Ca);
            R&&wa.animate({
              x:la,width:Ia||1}
            ,R,"normal",c.getAnimationCompleteFn());
            
if(ga||w)!n&&Ia<G&&(la-=(G-Ia)/2,Ia=G),s=aa.tracker,fa={
              x:la,y:ha,width:Ia,height:Q,r:v,cursor:ga?"pointer":"",stroke:g,"stroke-width":Aa,fill:g,ishot:!0}
            ,s?s.attr(fa):s=aa.tracker=k.rect(fa,r),s.data("eventArgs",Ja);
            (s||wa).data("eventArgs",Ja).click(Ua).hover(Da(wa,X),Ga(wa,H)).tooltip(u)}
          u=c.drawPlotBarLabel(a,b,q,la,ha)}
        u&&l.push(u);
        wa&&l.push(wa);
        s&&l.push(s);
        c.drawTracker&&c.drawTracker.call(c,a,b,q)}
      a.visible=!1!==b.visible;
      return a}
    ,drawPlotBarLabel:function(a,b,c,d,e,g){
      var h=this.options,
l=this.logic,k=h.chart,n=this.paper,r=this.layers,p=h.plotOptions.series.dataLabels.style,h=this.canvasLeft,q=this.canvasWidth,t=a.data[c],w=a.items[c];
      a=k.valuePadding+2;
      var u=w.graphic;
      c=w.dataLabel;
      var v=0>t.y,B=l.isStacked,l=l.is3D,C=k.xDepth||0,F=k.yDepth||0,G=t.displayValue;
      b=!1===b.visible?"hidden":"visible";
      var D=k.placeValuesInside;
      g=g||r.datalabels;
      if(Da(G)&&G!==U&&null!==t.y){
        c||(c=w.dataLabel=n.text({
          "class":"fusioncharts-label",text:G,"font-size":p.fontSize,title:t.originalText||"",fill:p.color,
direction:k.textDirection,x:0,y:0,"line-height":p.lineHeight}
        ,g).attr("text-bound",[p.backgroundColor,p.borderColor,p.borderThickness,p.borderPadding,p.borderRadius,p.borderDash]));
        r=c.getBBox();
        g=u.data("BBox");
        p=g.height;
        n=g.width;
        g=B?"middle":v?D?"start":"end":D?"end":"start";
        k=v?d-h:h+q-(d+n);
        r=r.width;
        r+=a;
        p=e+.5*p;
        t=d+(v?0:n);
        e=v?d-h:h+q-(d+n);
        if(B)t=Ra(h+.5*r,t+.5*(v?n:-n)),t=sa(h+q-.5*r,t),t-=l?C:0,p+=l?F:0;
        else if(D?n>=r?(t+=v?a:-a,l&&(p+=F,t-=C)):r<k?(t+=v?-a:a,g=v?"end":"start",l&&v&&(t-=
C)):(v?(t=d+n+Ra(r-d-n+h,0)-a,g="end",t-=l?C:0):(t=d-Ra(r-(h+q-d),0)+a,g="start"),l&&(t-=C,p+=F)):e>=r?(t+=v?-a:a,l&&v&&(t-=C,p+=C)):(t+=v?a+r:-(a+r),l&&(t-=C,p+=F)),t>h+q||t<h)t=h+4,g="start";
        c.attr({
          x:t,y:p,"text-anchor":g,visibility:b}
        )}
      else c&&c.attr({
        text:U}
      );
      return c}
    ,drawPlotBar3d:function(a,b){
      this.drawPlotBar.call(this,a,b)}
    ,drawPlotLine:function(b,c){
      var d=this,e=d.paper,h=d.elements,l=d.options,k=l.chart,n=d.logic,r=l.plotOptions.series,p=b.items,q=b.graphics=b.graphics||[],t,w=d.xAxis[c.xAxis||
0],u=d.yAxis[c.yAxis||0],v=n.multisetRealtime||n.dragExtended,B=n.isWaterfall,C,F,G,D,J,P=0,R=!1!==(l.tooltip||{
        }
      ).enabled,Q,S=isNaN(+r.animation)&&r.animation.duration||1E3*r.animation,W,U=r.dataLabels.style,T={
        fontFamily:U.fontFamily,fontSize:U.fontSize,lineHeight:U.lineHeight,fontWeight:U.fontWeight,fontStyle:U.fontStyle}
      ,$=k.xDepth||0,Z=k.yDepth||0,fa=k.series2D3Dshift,ha=c.step,ga=c.drawVerticalJoins,ia=c.useForwardSteps,s=b.data,z=!1===c.visible?"hidden":"visible",A,O=s.length,f=w.getAxisPosition(0),
la=w.getAxisPosition(1)-f,X=la*O,H=w.axisData.scroll||{
        }
      ,aa=k.hasScroll||!1,ka,va=r.connectNullData,qa=d.chartWidth,za=d.chartHeight,I=function(){
        hc.attr({
          "clip-rect":null}
        );
        Rb.show();
        wc.show();
        Sb.show();
        Fc.attr({
          transform:"...t"+-qa+","+-za}
        )}
      ,wa,Ja,xa,ya,Ca,Da,Ga,Na=null,Ea,La,Sa=r.connectorWidth=L(c.lineWidth),$a=c.color,Ya,Oa,db=r.connectorDashStyle=c.dashStyle,cb,ab,nb,Ib,jb,bb,eb,gb,hb,kb=d.layers,Kb=kb.dataset=kb.dataset||e.group("dataset-orphan"),Fc=kb.datalabels=kb.datalabels||e.group("datalabels").insertAfter(Kb),
sc=kb.tracker,Xb=h["clip-canvas-init"].slice(0),Ub=h["clip-canvas"].slice(0),Gc=u.axisData.reversed,cc=u.max,dc=u.min,Oc=u.getAxisPosition(0<cc&&0<dc?Gc?cc:dc:0>cc&&0>dc?Gc?dc:cc:Gc?cc:0)+(fa?Z:0),Qb=[],bc=k.anchorTrackingRadius,xb=/drag/ig.test(d.logic.rendererId),pb,oc,Gb,wc,Rb,hc,Sb,ib,xc,Hc,Ta,Hb,Ab=[],sb=function(a){
        pa.call(this,d,a)}
      ,pc=function(a){
        return function(b){
          d.hoverPlotAnchor(this,b,"DataPlotRollOver",a,d)}
        }
      ,Pc=function(a){
        return function(b){
          d.hoverPlotAnchor(this,b,"DataPlotRollOut",
a,d)}
        }
      ,qb=function(a,f,h,l,k,n,r,p){
        return function(){
          var s=h.imageUrl,t=h.imageScale,w=h.imageAlpha,u=r.imageHoverAlpha,v=r.imageHoverScale,A=this.height*t*.01,B=this.width*t*.01,C=this.width*v*.01;
          eb={
            x:a-this.width*t*.005,y:f-this.height*t*.005,width:B,height:A,alpha:w}
          ;
          gb={
            x:a-this.width*v*.005,y:f-this.height*v*.005,width:C,height:this.height*v*.01,alpha:u}
          ;
          u=C>B?gb:eb;
          xb&&(u={
            cx:a,cy:f,r:.5*Ra(A,B)}
          );
          (l.graphic=Ib=e.image(s,Sb).attr(eb).css({
            opacity:.01*w}
          ).data("alwaysInvisible",!t).data("setRolloverProperties",
r).data("setRolloverAttr",gb).data("setRolloutAttr",eb).data("anchorRadius",t).data("anchorHoverRadius",v))&&q.push(Ib);
          if(Ja||R||r)jb=l.tracker=(xb?e.circle(sc):e.rect(sc)).attr(u).attr({
            cursor:Ja?"pointer":"",stroke:g,"stroke-width":h.lineWidth,fill:g,ishot:!0,visibility:z}
          ).data("eventArgs",k).data("groupId",pb).click(sb).hover(pc(l),Pc(l)).tooltip(n);
          d.drawTracker&&d.drawTracker.call(d,b,c,p);
          (Ta=l.dataLabel=d.drawPlotLineLabel(b,c,p,a,f))&&q.push(Ta)}
        }
      ,Ba=function(a,e,f,g,h,l,k,n){
        return function(){
          (Ta=
g.dataLabel=d.drawPlotLineLabel(b,c,n,a,e))&&q.push(Ta)}
        }
      ;
      d.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label",T);
      Fc.attr("class","fusioncharts-datalabels");
      r.connectorOpacity=N.color($a).opacity;
      u.yBasePos=Oc;
      B&&(C=(F=d.definition.chart)&&F.plotspacepercent,G=r.groupPadding,D=r.maxColWidth,J=(1-.01*C)*la||sa(la*(1-2*G),1*D),P=J/2);
      Fc.attr({
        transform:"...t"+qa+","+za}
      );
      S&&d.animationCompleteQueue.push({
        fn:I,scope:d}
      );
      Gb=Kb.line||(Kb.line=e.group("line-connector",Kb));
      wc=b.lineShadowLayer||
(b.lineShadowLayer=e.group("connector-shadow",Gb));
      Rb=b.anchorShadowLayer||(b.anchorShadowLayer=e.group("anchor-shadow",Gb));
      hc=b.lineLayer||(b.lineLayer=e.group("connector",Gb));
      Sb=b.anchorLayer||(b.anchorLayer=e.group("anchors",Gb));
      Sb.hide();
      wc.hide();
      Rb.hide();
      for(A=0;
      A<O;
      A+=1){
        wa=s[A];
        Ca=wa.y;
        Da=wa.previousY||0;
        Q=wa.toolText;
        pb=b.index+"_"+A;
        hb=Ta=Ib=jb=null;
        t=p[A]={
          index:A,value:null,graphic:null,connector:null,dataLabel:null,shadowGroup:Rb,tracker:null}
        ;
        if(null===Ca)Ab.length=0,0===va&&(Na=
null);
        else{
          ya=oa(wa.x,A);
          Ja=wa.link;
          "boxandwhisker"===c.relatedSeries&&c.pointStart&&(ya+=c.pointStart);
          La=u.getAxisPosition(Ca+Da)+(fa?Z:0);
          Ea=w.getAxisPosition(ya)-$;
          Ea=ba(Ea,Sa,Sa).position;
          La=ba(La,Sa,Sa).position;
          if((cb=wa.marker)&&cb.enabled)if(ab=cb.symbol.split("_"),nb="spoke"===ab[0]?1:0,xa=cb.radius,ib=cb.shadow,oc={
            index:A,link:Ja,value:wa.y,displayValue:wa.displayValue,categoryLabel:wa.categoryLabel,toolText:wa.toolText,id:b.userID,datasetIndex:b.index,datasetName:b.name,visible:b.visible}
          ,
eb=gb={
            }
          ,bb=wa.rolloverProperties,cb.imageUrl)Hb=new a,Hb.onload=qb(Ea,La,cb,t,oc,Q,bb,A),Hb.onerror=Ba(Ea,La,cb,t,oc,Q,bb,A),Hb.src=cb.imageUrl;
          else{
            bb&&(eb={
              polypath:[ab[1]||2,Ea,La,xa,cb.startAngle,nb],fill:ea(cb.fillColor),"stroke-width":cb.lineWidth,stroke:ea(cb.lineColor)}
            ,gb={
              polypath:[bb.sides||2,Ea,La,bb.radius,bb.startAngle,bb.dip],fill:ea(bb.fillColor),"stroke-width":bb.lineWidth,stroke:ea(bb.lineColor)}
            );
            Ib=t.graphic=e.polypath(ab[1]||2,Ea,La,xa,cb.startAngle,nb,Sb).attr({
              fill:ea(cb.fillColor),
"stroke-width":cb.lineWidth,stroke:ea(cb.lineColor),cursor:Ja?"pointer":"",visibility:xa?z:"hidden"}
            ).data("alwaysInvisible",!xa).data("setRolloverProperties",bb).data("setRolloverAttr",gb).data("setRolloutAttr",eb).data("anchorRadius",xa).data("anchorHoverRadius",bb&&bb.radius).shadow(ib||!1,Rb);
            if(Ja||R||bb)xa=Ra(xa,bb&&bb.radius||0,bc),jb=t.tracker=e.circle({
              cx:Ea,cy:La,r:xa,cursor:Ja?"pointer":"",stroke:g,"stroke-width":cb.lineWidth,fill:g,ishot:!0,visibility:z}
            ,sc);
            (jb||Ib).data("eventArgs",
oc).data("groupId",pb).click(sb).hover(pc(t),Pc(t)).tooltip(Q);
            d.drawTracker&&d.drawTracker.call(d,b,c,A)}
          xc=Hc!==[ea(wa.color||$a),wa.dashStyle||db].join(":");
          if(null!==Na){
            if(Ab.length&&(Qb=Qb.concat(Ab),Ab.length=0),(v||B||!Qb.join(""))&&Qb.push("M",Ga,Na),B&&Qb.push("m",-P,0),ha?ia?(Qb.push("H",Ea),B&&Qb.push("h",P),ga?Qb.push("V",La):Qb.push("m",0,La-Na)):(ga&&Qb.push("V",La),Qb.push("M",Ga,La,"H",Ea)):Qb.push("L",Ea,La),v||xc)hb=t.connector=e.path(Qb,hc).attr({
              "stroke-dasharray":Oa,"stroke-width":Sa,
stroke:Ya,"stroke-linecap":"round","stroke-linejoin":2<Sa?"round":"miter",visibility:z}
            ).shadow(r.shadow&&wa.shadow,wc),Qb=[]}
          else!v&&Ab.push("M",Ea,La);
          cb&&cb.imageUrl||(Ta=t.dataLabel=d.drawPlotLineLabel(b,c,A,Ea,La));
          Ga=Ea;
          Na=La;
          Ya=ea(wa.color||$a);
          Oa=wa.dashStyle||db;
          Hc=[Ya,Oa].join(":")}
        Ta&&q.push(Ta);
        Ib&&q.push(Ib);
        hb&&q.push(hb);
        jb&&q.push(jb)}
      !v&&Qb.join("")&&(hb=e.path(Qb,hc).attr({
        "stroke-dasharray":Oa,"stroke-width":Sa,stroke:Ya,"stroke-linecap":"round","stroke-linejoin":2<Sa?"round":"miter",
visibility:z}
      ).shadow(r.shadow&&wa.shadow,wc))&&q.push(hb);
      aa&&(ka=H.startPercent,Ub[2]=X+Xb[0],1===ka&&(Xb[0]=Ub[2],Ub[0]=0));
      S?(W=N.animation({
        "clip-rect":Ub}
      ,S,aa?"easeIn":"normal",d.getAnimationCompleteFn()),hc.attr({
        "clip-rect":Xb}
      ).animate(B?W.delay(S):W)):(I&&I(),I=void 0);
      b.visible=!1!==c.visible;
      return b}
    ,hoverPlotAnchor:function(a,b,c,d,e){
      var g=d.graphic;
      d=d.dataLabel;
      var h=e.options.chart,l=1===h.rotateValues?270:0,k=g.data("setRolloverProperties"),n=g.data("isRealtime"),r=n&&g.attr("polypath"),
p=g.data("setRolloverAttr"),q="image"===g.type,t=g.data("setRolloutAttr"),w=d&&(d.data("isBelow")?1:-1)*(q?.5*(p.height-t.height):g.data("anchorHoverRadius")-g.data("anchorRadius")),u="DataPlotRollOver"==c?p:t,v={
        transform:"T0,"+("DataPlotRollOver"===c?w:0)+"R"+l}
      ,B={
        fill:u.fill,"stroke-width":u["stroke-width"],stroke:u.stroke}
      ,u=q?u:{
        polypath:u.polypath}
      ,h=h.syncLabelWithAnchor,C=g.data("anchorRadius"),F=g.data("anchorHoverRadius"),p=!(/,0\)$/.test(p.fill)&&/,0\)$/.test(t.fill))&&g.data("anchorHoverRadius")-
g.data("anchorRadius")&&k.animation&&50;
      d&&d.data("isMiddle")&&(v={
        transform:"T,"+("DataPlotRollOver"===c?w:0)+",0R"+l}
      );
      k&&(("DataPlotRollOver"==c&&0!==F||"DataPlotRollOut"==c&&0!==C)&&g.attr({
        visibility:"visible"}
      ),q?g.css({
        opacity:.01*u.alpha}
      ):g.attr(B),n&&!q&&(u.polypath[1]=r[1],u.polypath[2]=r[2]),g.stop(),g.animate(u,p,"easeOut",function(){
        ("DataPlotRollOver"==c&&!F||"DataPlotRollOut"==c&&!C)&&g.attr({
          visibility:"hidden"}
        )}
      ),d&&d.stop(),p&&h&&d&&d.animate(v,p,"easeOut"));
      pa.call(a,e,b,c)}
    ,
drawPlotArea:function(b,c){
      var d=this,e=d.paper,h=d.options,l=h.chart,k=d.logic,r=h.plotOptions.series,p=d.elements,q=b.items,t=b.graphics=b.graphics||[],w,u=d.xAxis[c.xAxis||0],v=d.yAxis[c.yAxis||0],B=v.axisData.reversed,C=l.xDepth||0,F=l.yDepth||0,k=k.isStacked,G=!1!==(h.tooltip||{
        }
      ).enabled,D,L,h=r.dataLabels.style,J={
        fontFamily:h.fontFamily,fontSize:h.fontSize,lineHeight:h.lineHeight,fontWeight:h.fontWeight,fontStyle:h.fontStyle,color:h.color}
      ,h=isNaN(+r.animation)&&r.animation.duration||1E3*
r.animation,N=l.series2D3Dshift,P="0"===d.definition.chart.drawfullareaborder,R=b.data,Q=!1===c.visible?"hidden":"visible",S=R.length,U=u.getAxisPosition(0),W=(u.getAxisPosition(1)-U)*S,T=u.axisData.scroll||{
        }
      ,U=l.hasScroll||!1,$=r.connectNullData,Z,ba,fa,ia,s,z=v.max,A=v.min,O=v.getAxisPosition(0<z&&0>A?0:!B&&0<z&&0<=A?A:z)+(N?F:0),f=d.chartWidth,ha=d.chartHeight,B=function(){
        $a.attr({
          "clip-rect":null}
        );
        cb.show();
        Oa.show();
        La.attr({
          transform:"...t"+-f+","+-ha}
        )}
      ,X=null,H,aa,z=c.lineWidth,A=c.dashStyle,
ga=ea(c.fillColor),la=ea(c.lineColor),ka=0,sa=/drag/ig.test(d.logic.rendererId),I,wa,va,qa,xa,za,ya=[],Ca=[],Da=null,Ga=[],Ea=d.layers;
      ia=Ea.dataset=Ea.dataset||e.group("dataset-orphan");
      var La=Ea.datalabels=Ea.datalabels||e.group("datalabels").insertAfter(ia),Na=Ea.tracker,Ea=p["clip-canvas-init"].slice(0),p=p["clip-canvas"].slice(0),l=l.anchorTrackingRadius,Ya,Oa,Sa,cb,$a,ab,db,jb,bb,eb,gb=function(a){
        pa.call(this,d,a)}
      ,hb=function(a){
        return function(b){
          d.hoverPlotAnchor(this,b,"DataPlotRollOver",
a,d)}
        }
      ,kb=function(a){
        return function(b){
          d.hoverPlotAnchor(this,b,"DataPlotRollOut",a,d)}
        }
      ,Da=function(a,f,h,l,k,r,p,q){
        return function(){
          var s=h.imageUrl,w=h.imageScale,u=h.imageAlpha,z=p.imageHoverAlpha,v=p.imageHoverScale,A=this.width*w*.01,B=this.width*v*.01;
          xa={
            x:a-this.width*w*.005,y:f-this.height*w*.005,width:A,height:this.height*w*.01,alpha:u}
          ;
          za={
            x:a-this.width*v*.005,y:f-this.height*v*.005,width:B,height:this.height*v*.01,alpha:z}
          ;
          z=B>A?za:xa;
          sa&&(z={
            cx:a,cy:f,r:.5*Ra(B,A)}
          );
          (l.graphic=
wa=e.image(s,cb).attr(xa).css({
            opacity:.01*u}
          ).data("alwaysInvisible",!w).data("setRolloverProperties",p).data("setRolloverAttr",za).data("setRolloutAttr",xa).data("anchorRadius",w).data("anchorHoverRadius",v))&&t.push(wa);
          if(ba||G||p)Ya=n({
            cursor:ba?"pointer":"",stroke:g,"stroke-width":h.lineWidth,fill:g,ishot:!0,visibility:Q}
          ,z),va=l.tracker=(sa?e.circle(Ya,Na):e.rect(Ya,Na)).data("eventArgs",k).click(gb).hover(hb(l),kb(l)).tooltip(r),d.drawTracker&&d.drawTracker.call(d,b,c,q);
          (eb=l.dataLabel=d.drawPlotLineLabel(b,
c,q,a,f))&&t.push(eb)}
        }
      ,nb=function(a,e,f,g,h,l,k,n){
        return function(){
          (eb=g.dataLabel=d.drawPlotLineLabel(b,c,n,a,e))&&t.push(eb)}
        }
      ;
      d.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label",J);
      La.attr("class","fusioncharts-datalabels");
      v.yBasePos=O;
      La.attr({
        transform:"...t"+f+","+ha}
      );
      h&&d.animationCompleteQueue.push({
        fn:B,scope:d}
      );
      J=ia;
      k&&(ab=J.shadows||(J.shadows=e.group("shadows",J).toBack()));
      $a=J.area=J.area||e.group("area",J);
      J=J.areaConnector||(J.areaConnector=e.group("area-connector",
J));
      b.lineShadowLayer||(b.lineShadowLayer=e.group("connector-shadow",J));
      Oa=b.anchorShadowLayer||(b.anchorShadowLayer=e.group("anchor-shadow",J));
      Sa=b.lineLayer||(b.lineLayer=e.group("connector",J));
      cb=b.anchorLayer||(b.anchorLayer=e.group("anchors",J));
      cb.hide();
      Oa.hide();
      J=ia;
      for(J=0;
      J<S;
      J+=1){
        Z=R[J];
        ia=Z.y;
        w=oa(Z.x,J);
        H=u.getAxisPosition(w)-C;
        wa=eb=va=null;
        w=q[J]={
          }
        ;
        if(null===ia)0===$&&(X=null,0<ka&&(1===ka?ya.splice(-8,8):(ya=ya.concat(Ca),ya.push("Z")),Ca=[])),w.chart=d,w.index=J,w.value=ia;
        
else{
          ba=Z.link;
          D=Z.toolText;
          L=Z.previousY;
          s=(s=v.getAxisPosition(L)||null)||O;
          aa=v.getAxisPosition(ia+(L||0))+(N?F:0);
          if((bb=Z.marker)&&bb.enabled)if(L={
            index:J,link:ba,value:Z.y,displayValue:Z.displayValue,categoryLabel:Z.categoryLabel,toolText:Z.toolText,id:b.userID,datasetIndex:b.index,datasetName:b.name,visible:b.visible}
          ,xa=za={
            }
          ,qa=Z.rolloverProperties,bb.imageUrl)fa=new a,fa.onload=Da(H,aa,bb,w,L,D,qa,J),fa.onerror=nb(H,aa,bb,w,L,D,qa,J),fa.src=bb.imageUrl;
          else{
            I=bb.symbol.split("_");
            fa=bb.radius;
            
jb=bb.shadow;
            qa&&(xa={
              polypath:[I[1]||2,H,aa,fa,bb.startAngle,0],fill:ea(bb.fillColor),"stroke-width":bb.lineWidth,stroke:ea(bb.lineColor)}
            ,qa=Z.rolloverProperties,za={
              polypath:[qa.sides||2,H,aa,qa.radius,qa.startAngle,qa.dip],fill:ea(qa.fillColor),"stroke-width":qa.lineWidth,stroke:ea(qa.lineColor)}
            );
            wa=w.graphic=e.polypath(I[1]||2,H,aa,fa,bb.startAngle,0,cb).attr({
              fill:ea(bb.fillColor),"stroke-width":bb.lineWidth,stroke:ea(bb.lineColor),cursor:ba?"pointer":"",visibility:fa?Q:"hidden"}
            ).data("alwaysInvisible",
!fa).data("setRolloverProperties",qa).data("setRolloverAttr",za).data("setRolloutAttr",xa).data("anchorRadius",fa).data("anchorHoverRadius",qa&&qa.radius).shadow(jb||!1,Oa);
            if(ba||G||qa)k||(fa=Ra(fa,qa&&qa.radius||0,l)),va=w.tracker=e.circle({
              cx:H,cy:aa,r:fa,cursor:ba?"pointer":"",stroke:g,"stroke-width":bb.lineWidth,fill:g,ishot:!0,visibility:Q}
            ,Na);
            (va||wa).data("eventArgs",L).click(gb).hover(hb(w),kb(w)).tooltip(D);
            d.drawTracker&&d.drawTracker.call(d,b,c,J)}
          null===X?(Ga.push("M",H,",",aa),ya.push("M",
H,",",s),ka=0):Ga.push("L",H,",",aa);
          ya.push("L",H,",",aa);
          Ca.unshift("L",H,",",s);
          ka++;
          X=aa;
          bb&&bb.imageUrl||(eb=w.dataLabel=d.drawPlotLineLabel(b,c,J,H,aa));
          w.chart=d;
          w.index=J;
          w.value=ia;
          w.dataLabel=eb}
        eb&&t.push(eb);
        wa&&t.push(wa);
        va&&t.push(va)}
      0<ka&&(1===ka?ya.splice(-8,8):(ya=ya.concat(Ca),ya.push("Z")));
      (Da=b.graphic=e.path(ya,$a).attr({
        fill:ga,"stroke-dasharray":A,"stroke-width":P?0:z,stroke:la,"stroke-linecap":"round","stroke-linejoin":2<z?"round":"miter",visibility:Q}
      ).shadow(r.shadow&&
Z.shadow,ab))&&t.push(Da);
      U&&(r=T.startPercent,p[2]=W+Ea[0],1===r&&(Ea[0]=p[2],p[0]=0));
      h?db=$a.attr({
        "clip-rect":Ea}
      ).animate({
        "clip-rect":p}
      ,h,U?"easeIn":"normal",d.getAnimationCompleteFn()):(B&&B(),B=void 0);
      ab&&(h?ab.attr({
        "clip-rect":Ea}
      ).animateWith($a,db,{
        "clip-rect":p}
      ,h,U?"easeIn":"normal",function(){
        ab.attr({
          "clip-rect":null}
        )}
      ):ab.attr({
        "clip-rect":null}
      ));
      P&&(r=b.connector=e.path(Ga,Sa).attr({
        "stroke-dasharray":A,"stroke-width":z,stroke:la,"stroke-linecap":"round","stroke-linejoin":2<
z?"round":"miter",visibility:Q}
      ),h?Sa.attr({
        "clip-rect":Ea}
      ).animateWith($a,db,{
        "clip-rect":p}
      ,h,U?"easeIn":"normal",function(){
        Sa.attr({
          "clip-rect":null}
        )}
      ):Sa.attr({
        "clip-rect":null}
      ),r&&t.push(r));
      b.visible=!1!==c.visible;
      return b}
    ,drawPlotScatter:function(a,b){
      var c=this,d=c.options,e=d.chart,h=d.plotOptions.series,l=c.paper,k=c.elements,n=a.items,r,p=a.graphics=a.graphics||[],q=c.xAxis[b.xAxis||0],t=c.yAxis[b.yAxis||0],w=a.data,u=!1===b.visible?"hidden":"visible",d=!1!==(d.tooltip||{
        }
      ).enabled,
v,B=h.dataLabels.style,C={
        fontFamily:B.fontFamily,fontSize:B.fontSize,lineHeight:B.lineHeight,fontWeight:B.fontWeight,fontStyle:B.fontStyle,color:B.color}
      ,B=isNaN(+h.animation)&&h.animation.duration||1E3*h.animation,F=c.chartWidth,G=c.chartHeight,D,J,L,N,P,R,Q,S,U,W=b.lineWidth,T=0<W,$=b.color,Z=b.dashStyle,ba=h.connectNullData,s=[],z,A,O,f,fa,X,H=c.layers,aa=H.dataset||(H.dataset=l.group("dataset-orphan")),ha=H.datalabels||(H.datalabels=l.group("datalabels").insertAfter(aa)),H=H.tracker,e=e.anchorTrackingRadius,
ga,oa,ka,I=function(a){
        pa.call(this,c,a)}
      ,la=function(a){
        return function(b){
          c.hoverPlotAnchor(this,b,"DataPlotRollOver",a,c)}
        }
      ,qa=function(a){
        return function(b){
          c.hoverPlotAnchor(this,b,"DataPlotRollOut",a,c)}
        }
      ;
      c.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label",C);
      ha.attr("class","fusioncharts-datalabels");
      B&&(c.animationCompleteQueue.push({
        fn:function(){
          ha.attr({
            transform:"...t"+-F+","+-G}
          )}
        ,scope:c}
      ),ha.attr({
        transform:"...t"+F+","+G}
      ));
      ga=aa.line||(aa.line=l.group("line-connector",
aa));
      a.lineShadowLayer=l.group("connector-shadow",ga);
      aa=a.anchorShadowLayer=l.group("anchor-shadow",ga);
      C=a.lineLayer=l.group("connector",ga);
      ga=a.anchorLayer=l.group("anchors",ga);
      D=0;
      for(J=w.length;
      D<J;
      D+=1){
        L=w[D];
        z=L.marker;
        S=U=f=v=fa=null;
        ka=a.index+"_"+D;
        R=L.y;
        P=L.x;
        if(null!==R&&null!==P){
          if(z&&z.enabled){
            N=L.link;
            v=L.toolText;
            O=z.radius;
            oa=z.shadow;
            U=t.getAxisPosition(R);
            S=q.getAxisPosition(P);
            A={
              index:D,link:N,y:L.y,x:L.x,displayValue:L.displayValue,categoryLabel:L.categoryLabel,toolText:L.toolText,
id:a.userID,datasetIndex:a.index,datasetName:a.name,visible:a.visible}
            ;
            f=z.symbol.split("_");
            r=n[D]={
              index:D,x:P,y:R,value:R}
            ;
            P=R={
              }
            ;
            L.hoverEffects&&(P={
              polypath:[f[1]||2,S,U,O,z.startAngle,0],fill:ea(z.fillColor),"stroke-width":z.lineWidth,stroke:ea(z.lineColor)}
            ,X=L.rolloverProperties,R={
              polypath:[X.sides||2,S,U,X.radius,X.startAngle,X.dip],fill:ea(X.fillColor),"stroke-width":X.lineWidth,stroke:ea(X.lineColor)}
            );
            f=r.graphic=l.polypath(f[1]||2,S,U,O,z.startAngle,0,ga).attr({
              fill:ea(z.fillColor),
"stroke-width":z.lineWidth,stroke:ea(z.lineColor),cursor:N?"pointer":"",visibility:O?u:"hidden"}
            ).data("alwaysInvisible",!O).data("setRolloverProperties",X).data("setRolloverAttr",R).data("setRolloutAttr",P).data("anchorRadius",O).data("anchorHoverRadius",X&&X.radius).shadow(oa||!1,aa);
            if(N||d||X)O=Ra(O,X&&X.radius||0,e),fa=r.tracker=l.circle({
              cx:S,cy:U,r:O,cursor:N?"pointer":"",stroke:g,"stroke-width":z.lineWidth,fill:g,ishot:!0,visibility:u}
            ,H);
            (fa||f).data("eventArgs",A).data("groupId",ka).click(I).hover(la(r),
qa(r)).tooltip(v)}
          T&&((void 0===Q||null===Q&&0===ba)&&S&&U&&s.push("M",S,",",U),S&&U&&s.push("L",S,",",U),Q=U);
          v=r.dataLabel=c.drawPlotLineLabel(a,b,D,S,U)}
        else T&&0===ba&&(Q=null),n[D]={
          chart:c,index:D,x:P,y:R}
        ;
        v&&p.push(v);
        f&&p.push(f);
        fa&&p.push(fa);
        c.drawTracker&&c.drawTracker.call(c,a,b,D)}
      s.length&&(h=a.graphic=l.path(s,C).attr({
        "stroke-dasharray":Z,"stroke-width":W,stroke:$,"stroke-linecap":"round","stroke-linejoin":2<W?"round":"miter",visibility:u}
      ).shadow(h.shadow&&L.shadow),C.attr({
        "clip-rect":k[B?
"clip-canvas-init":"clip-canvas"]}
      ),B&&C.animate({
        "clip-rect":k["clip-canvas"]}
      ,B,"normal"),p.push(h));
      B&&ga.attr({
        opacity:0}
      ).animate({
        opacity:1}
      ,B,"normal",c.getAnimationCompleteFn());
      a.visible=!1!==b.visible;
      return a}
    ,drawPlotLineLabel:function(a,b,c,d,e,g){
      var h=this.options,l=h.chart,k=this.paper,n=this.layers,p=h.plotOptions.series.dataLabels.style,h=1===l.rotateValues?270:0,q=this.canvasHeight,t=this.canvasTop,w=a.data,u=w[c],v=a.items[c],B=r(u.valuePosition,"auto").toLowerCase();
      a=this.logic.defaultSeriesType;
      
var C=v.graphic,F=u.marker,C=F&&F.enabled?C&&"image"==C.type&&.5*C.attr("height")||F&&F.radius-3:0,C=l.valuePadding+2+C;
      b=!1===b.visible?"hidden":"visible";
      F=v.dataLabel;
      g=g||n.datalabels;
      switch(B){
        case "above":c=0;
        break;
        case "below":c=1;
        break;
        default:n=w[c-1]||{
          }
        ,w=w[c+1]||{
          }
        ,c=c?n.y>u.y?1:(null==n.y&&w.y)>u.y?1:0:0}
      n=u.displayValue;
      Da(n)&&n!==U?(F?h&&F.attr("transform",["r",360-h]):F=v.dataLabel=k.text(g).attr({
        "class":"fusioncharts-label",text:n,fill:p.color,"text-bound":[p.backgroundColor,p.borderColor,
p.borderThickness,p.borderPadding,p.borderRadius,p.borderDash],direction:l.textDirection,"font-weight":p.fontWeight,"font-style":p.fontStyle,"font-family":p.fontFamily,"font-size":p.fontSize,"line-height":p.lineHeight}
      ),F.attr({
        title:u.originalText||"",fill:p.color}
      ),v._state&&v._state.labelWidth||(g=F.getBBox(),v._state={
        labelWidth:g.width,labelHeight:g.height}
      ),l=k=h?v._state.labelWidth:v._state.labelHeight,g=e-t,q=t+q-e,l=l+C+4,t=.5*k+C,/bubble/i.test(a)||(c?q>l?(e+=t,u._valueBelowPoint=1):g>l&&
(e-=t,u._valueBelowPoint=0):g>l?(e-=t,u._valueBelowPoint=0):q>l&&(e+=t,u._valueBelowPoint=1)),F.attr({
        x:d,y:e,visibility:b}
      ).data("isBelow",u._valueBelowPoint),h&&F.attr("transform","T0,0,R"+h)):F&&F.attr({
        text:U}
      );
      return F}
    ,drawLabels:function(){
      for(var a=this.paper,b=this.options,c=b.labels&&b.labels.items&&b.labels.items,d=c&&c.length,e=this.layers.layerAboveDataset,g=this.elements.quadran||(this.elements.quadran=[]),h=this.canvasTop,l=this.canvasLeft,b=b.chart.textDirection,k={
        right:"end",left:"start",
undefined:"start"}
      ,n,r,p;
      d--;
      )p=c[d],n=p.style,r={
        fontFamily:n.fontFamily,fontSize:n.fontSize,lineHeight:n.lineHeight,fontWeight:n.fontWeight,fontStyle:n.fontStyle,fill:n.color}
      ,Da(p.html)&&p.html!==U&&(g[d]=a.text({
        text:p.html}
      ,e).css(r).attr({
        x:parseInt(n.left,10)+l,y:parseInt(n.top,10)+h,"text-anchor":k[p.textAlign],"vertical-align":p.vAlign,direction:b,"text-bound":[n.backgroundColor,n.borderColor,n.borderThickness,n.borderPadding,n.borderRadius,n.borderDash]}
      ))}
    }
  ,J["renderer.root"]);
  J("renderer.piebase",
{
    isHovered:!1,getPlotData:function(a,b){
      var c=this.datasets[0],d=c.data[a],c=c.userData||(c.userData=[]),e,g;
      if(c[a])c=c[a];
      else{
        c=c[a]={
          }
        ;
        for(g in d)"object"!==typeof(e=d[g])&&"function"!==typeof e&&0!==g.indexOf("_")&&(c[g]=e);
        c.value=c.y;
        c.label=c.name;
        delete c.y;
        delete c.total;
        delete c.doNotSlice;
        delete c.name;
        delete c.centerAngle;
        delete c.showInLegend}
      c.sliced=b;
      return c}
    ,redrawDataLabels:function(a){
      var b=a.elements.plots[0];
      a.placeDataLabels(!0,b.items,b);
      return{
        }
      }
    ,sliceInOtherPies:function(a){
      var b=
this.options.series[0],c=b.plot.items,d=c.length,e=0,g;
      for(b.enableMultiSlicing=!0;
      d--;
      )d!==a&&(g=c[d]).sliced&&++e&&this.plotGraphicClick.call(g);
      b.enableMultiSlicing=!1;
      return!!e}
    ,plotGraphicClick:function(a){
      var b=this.graphic||this,c=b.plotItem||b.data("plotItem"),d=c.seriesData,e=c.chart,g=e.logic.chartInstance,h=c.index,l=b.data("eventArgs")||{
        }
      ,k=e.options.series[0].enableMultiSlicing,r=d.data[c.index].doNotSlice,p=c.slicedTranslation,t,w;
      !d.isRotating&&pa.call(b,e,a);
      if(!(d.isRotating||d.singletonCase||
r||(b=!k&&e.sliceInOtherPies(h),(a=c.sliced)&&b)))return b=c.graphic,d=c.connector,k=c.dataLabel,p="object"===typeof p?"t"+p:p,r=c.connectorPath,t=(a?-1:1)*c.transX,w=(a?-1:1)*c.transY,q.raiseEvent("slicingStart",{
        slicedState:a,dataIndex:"index"in l&&l.index,data:e.getPlotData(h,a)}
      ,g),b.animate({
        transform:a?"t0,0":p}
      ,200,"easeIn",function(){
        q.raiseEvent("slicingEnd",{
          slicedState:c.sliced,dataIndex:"index"in l&&l.index,data:e.getPlotData(h,c.sliced)}
        ,g)}
      ),k&&k.x&&k.animate({
        x:k.x+(a?0:t)}
      ,200,"easeIn"),
r&&(r[1]+=t,r[2]+=w,r[4]+=t,r[6]+=t,d.animate({
        path:r}
      ,200,"easeIn")),a=c.sliced=!a,b={
        hcJSON:{
          series:[]}
        }
      ,b.hcJSON.series[0]={
        data:p=[]}
      ,p[h]={
        sliced:a}
      ,n(g.jsVars._reflowData,b,!0),a}
    ,plotDragStart:function(a,b,c){
      var d=this.data("plotItem"),e=d.chart,d=d.seriesData,g=e.options.series,h=-e.datasets[0].startAngle*ab;
      d.isRotating=!1;
      if(g[0].enableRotation){
        g=e.container;
        e={
          left:0,top:0}
        ;
        if(g.getBoundingClientRect)g=g.getBoundingClientRect(),e.top=g.top+(D.pageYOffset||p.scrollTop||0)-(p.clientTop||
0),e.left=g.left+(D.pageXOffset||p.scrollLeft||0)-(p.clientLeft||0);
        else for(;
        g;
        )e.left+=g.offsetLeft||0,e.top+=g.offsetTop||0,g!==p.body&&g!==p.documentElement&&(e.left-=g.scrollLeft||0,e.top-=g.scrollTop||0),g=g.offsetParent;
        d.chartPosition=e;
        a=k.call(c,a,b,d.pieCenter,d.chartPosition);
        d.dragStartAngle=a;
        d.startingAngleOnDragStart=h}
      }
    ,plotDragEnd:function(a){
      var b=this.data("plotItem"),c=b.chart,d=b.seriesData,e=-c.datasets[0].startAngle*ab,g={
        hcJSON:{
          series:[{
            startAngle:e}
          ]}
        }
      ;
      c.disposed||(n(c.logic.chartInstance.jsVars._reflowData,
g,!0),c.rotate(d,c.options.series[0]));
      !d.isRotating&&c.plotGraphicClick.call(b,a);
      d.isRotating&&(setTimeout(function(){
        d.isRotating=!1}
      ,0),q.raiseEvent("RotationEnd",{
        startingAngle:u(e,!0),changeInAngle:e-d.startingAngleOnDragStart}
      ,c.logic.chartInstance));
      !c.isHovered&&c.onPlotHover(this,!1)}
    ,plotDragMove:function(a,b,c,d,e){
      a=this.data("plotItem");
      var g=a.chart,h=a.seriesData,l=g.options.series;
      l[0].enableRotation&&!h.singletonCase&&(c=k.call(e,c,d,h.pieCenter,h.chartPosition),h.isRotating||(h.dragStartAngle!==
c&&(h.isRotating=!0),q.raiseEvent("RotationStart",{
        startingAngle:u(h.startingAngleOnDragStart,!0)}
      ,g.logic.chartInstance)),l[0].startAngle+=c-h.dragStartAngle,h.dragStartAngle=c,h.moveDuration=0,c=(new Date).getTime(),!h._lastTime||h._lastTime+h.timerThreshold<c)&&(setTimeout(function(){
        g.rotate(h,l[0])}
      ,0),h._lastTime=c)}
    ,plotRollOver:function(a){
      var b=this.plotItem||this.data("plotItem"),c=b.chart,d,e;
      b.seriesData.isRotating||(pa.call(this,c,a,"DataPlotRollOver"),c.onPlotHover(this,!0));
      c.isHovered=
!0;
      (a=b.innerDiameter)&&(d=b.centerLabelConfig)&&(e=d.label)&&c.drawDoughnutCenterLabel(e,b.center[0],b.center[1],a,a,d,!1)}
    ,plotRollOut:function(a){
      var b=this.plotItem||this.data("plotItem"),c=b.chart,d=c.options.series[0],e,g;
      b.seriesData.isRotating||(pa.call(this,c,a,"DataPlotRollOut"),c.onPlotHover(this,!1));
      c.isHovered=!1;
      (a=b.innerDiameter)&&(e=d.centerLabelConfig)&&((g=e.label)||!g)&&c.drawDoughnutCenterLabel(g,b.center[0],b.center[1],a,a,e,!1)}
    ,onPlotHover:function(a,b){
      var c=a.data("plotItem"),
d=c.rolloverProperties,e=b?d.color:c.color,g=b?d.borderWidth:c.borderWidth,h=b?d.borderColor:c.borderColor;
      d&&c.graphic.attr({
        fill:ea(e),"stroke-width":g,stroke:h}
      )}
    ,getEventArgs:function(a){
      a=a||{
        }
      ;
      return{
        datasetName:a.label,datasetIndex:a.originalIndex,id:a.userID,visible:!0,label:a.label,value:a.value,percentValue:a.percentage,tooltext:a.toolText,link:a.link,sliced:a.sliced}
      }
    ,legendClick:function(a){
      var b=a.chart;
      b.elements.plots[0].isRotating=!1;
      b.plotGraphicClick.call(a)}
    ,placeDataLabels:function(){
      var a=
function(a,b){
        return a.point.value-b.point.value}
      ,b=function(a,b){
        return a.angle-b.angle}
      ,c=["start","start","end","end"],d=[-1,1,1,-1],e=[1,1,-1,-1];
      return function(g,h,l,k){
        var n=this.options.plotOptions,r=n.pie,p=this.canvasLeft+.5*this.canvasWidth,q=this.canvasTop+.5*this.canvasHeight,t=this.smartLabel,w=n.series.dataLabels,u=w.style,v=oa(La(parseFloat(u.lineHeight)),12),v=B(w.placeLabelsInside,1===h.length?!0:!1),n=w.skipOverlapLabels,C=w.manageLabelOverflow,F=w.connectorPadding,G=w.distance,
D=k&&k.metrics||[p,q,r.size,r.innerSize||0],L=D[1],J=D[0];
        k=.5*D[2];
        var N=[[],[],[],[]],P=this.canvasLeft,R=this.canvasTop,r=this.canvasWidth,G=l.labelsRadius||(l.labelsRadius=k+G),q=p=parseInt(u.fontSize,10),Q=q/2,F=[F,F,-F,-F];
        l=l.labelsMaxInQuadrant||(l.labelsMaxInQuadrant=za(G/q));
        var w=w.isSmartLineSlanted,D=D[3]/2,S,U,W,T,$,Z,ba,s,z,A,O,f,ea,X,H,aa,ga,ka,la,pa;
        g||t.setStyle(u);
        if(1==h.length&&!D&&v)T=h[0],(H=T.dataLabel)&&H.show(),T.slicedTranslation=[P,R],H&&(H.attr({
          visibility:va,align:"middle",
transform:["t",J,L]}
        ),H.x=J);
        else if(v)pa=D+(k-D)/2,fa(h,function(a){
          (H=a.dataLabel)&&H.show();
          H&&(ea=a.angle,f=L+pa*Na(ea),s=J+pa*ha(ea),H.x=s,H._x=s,H.y=f,a.sliced&&(la=a.slicedTranslation,ga=la[0]-P,ka=la[1]-R,s+=ga,f+=ka),H.attr({
            visibility:va,align:"middle",transform:["t",s,f]}
          ))}
        );
        else{
          fa(h,function(a){
            (H=a.dataLabel)&&H.show();
            H&&(ea=a.angle%$a,0>ea&&(ea=$a+ea),aa=0<=ea&&ea<db?1:ea<Ea?2:ea<Ga?3:0,N[aa].push({
              point:a,angle:ea}
            ))}
          );
          for(h=g=4;
          h--;
          ){
            if(n&&(v=N[h].length-l,0<v))for(N[h].sort(a),
u=N[h].splice(0,v),v=0,W=u.length;
            v<W;
            v+=1)T=u[v].point,T.dataLabel.attr({
              visibility:"hidden"}
            ),T.connector&&T.connector.attr({
              visibility:"hidden"}
            );
            N[h].sort(b)}
          v=Ra(N[0].length,N[1].length,N[2].length,N[3].length);
          X=Ra(sa(v,l)*q,G+q);
          N[1].reverse();
          for(N[3].reverse();
          g--;
          ){
            D=N[g];
            W=D.length;
            n||(q=W>l?X/W:p,Q=q/2);
            T=W*q;
            u=X;
            for(h=0;
            h<W;
            h+=1,T-=q)v=hb(X*Na(D[h].angle)),u<v?v=u:v<T&&(v=T),u=(D[h].oriY=v)-q;
            S=c[g];
            W=X-(W-1)*q;
            u=0;
            for(h=D.length-1;
            0<=h;
            --h,W+=q)if(T=D[h].point,ea=D[h].angle,$=T.sliced,
H=T.dataLabel,v=hb(X*Na(ea)),v<u?v=u:v>W&&(v=W),u=v+q,A=(v+D[h].oriY)/2,Z=J+e[g]*G*ha(qa.asin(A/X)),A*=d[g],A+=L,O=L+k*Na(ea),ba=J+k*ha(ea),(2>g&&Z<ba||1<g&&Z>ba)&&(Z=ba),s=Z+F[g],f=A-Q-2,z=s+F[g],H.x=z,H._x=z,C&&(U=1<g?z-this.canvasLeft:this.canvasLeft+r-z,t.setStyle(T.style),v=oa(La(parseFloat(T.style.lineHeight)),12)+2*La(oa(parseFloat(T.style.border),12),12),v=t.getSmartText(T.labelText,U,v),H.attr({
              text:v.text,title:v.tooltext||""}
            )),H.y=f,$&&(ga=T.transX,ka=T.transY,s+=ga,Z+=ga,ba+=ga,O+=ka,
z+=ga),H.attr({
              visibility:va,"text-anchor":S,vAlign:"middle",x:z,y:A}
            ),v=T.connector)T.connectorPath=T=["M",ba,O,"L",w?Z:ba,A,s,A],v.attr({
              path:T,visibility:va}
            )}
          }
        }
      }
    ()}
  ,J["renderer.root"])}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-interface",function(){
  var e=this,k=e.hcLib,u=e.renderer.getRenderer("javascript"),q=k.hasModule,D=k.loadModule,b=k.getMetaSentence,N=k.moduleCmdQueue,J=k.executeWaitingCommands,c=k.injectModuleDependency,p=k.moduleDependencies,a=k.getDependentModuleName,t,U;
  t=function(c){
    var g,d,h,l={
      }
    ,p;
    c=b(c);
    for(g in e.core.items)g=e.core.items[g],d=g.chartType(),h=g.options.chartTypeSourcePath+d,(d=g.jsVars)&&d.waitingModule&&g.__state.rendering&&
k.needsModule(c.predicate,h)&&(d.waitingModuleError=!0,d=a(h).concat(d.userModules),d.length&&(d=d[d.length-1],l[d]=k.moduleCmdQueue[d]));
    for(p in l)J(l[p]);
    e.raiseError(e.core,"11171116151","run","HC-interface~renderer.load","Unable to load required modules and resources: "+c.key)}
  ;
  U=function(a,b,c){
    var h=a.args,l=a.options;
    a._chartMessageImageStyle={
      imageHAlign:h.typeNotSupportedMessageImageHAlign||l.baseChartMessageImageHAlign,imageVAlign:h.typeNotSupportedMessageImageVAlign||l.baseChartMessageImageVAlign,
imageAlpha:h.typeNotSupportedMessageImageAlpha||l.baseChartMessageImageAlpha,imageScale:h.typeNotSupportedMessageImageScale||l.baseChartMessageImageScale}
    ;
    a._chartMessageStyle={
      color:h.typeNotSupportedMessageColor||l.baseChartMessageColor,fontFamily:h.typeNotSupportedMessageFont||l.baseChartMessageFont,fontSize:h.typeNotSupportedMessageFontSize||l.baseChartMessageFontSize}
    ;
    e.hcLib.createChart(a,b,"stub",c,l.typeNotSupportedMessage)}
  ;
  k.eventList=e.extend(e.legacyEventList,{
    loaded:"FC_Loaded",dataloaded:"FC_DataLoaded",
rendered:"FC_Rendered",drawcomplete:"FC_DrawComplete",dataxmlinvalid:"FC_DataXMLInvalid",nodatatodisplay:"FC_NoDataToDisplay",exported:"FC_Exported"}
  );
  k.raiseEvent=e.raiseEventWithLegacy;
  p.charts=e.extend(p.charts||{
    }
  ,{
    column2d:0,column3d:0,bar2d:0,bar3d:0,pie2d:0,pie3d:0,line:0,area2d:0,doughnut2d:0,doughnut3d:0,pareto2d:0,pareto3d:0,mscolumn2d:0,mscolumn3d:0,msline:0,msarea:0,msbar2d:0,msbar3d:0,stackedcolumn2d:0,marimekko:0,stackedcolumn3d:0,stackedarea2d:0,stackedcolumn2dline:0,stackedcolumn3dline:0,
stackedbar2d:0,stackedbar3d:0,msstackedcolumn2d:0,mscombi2d:0,mscombi3d:0,mscolumnline3d:0,mscombidy2d:0,mscolumn3dlinedy:0,stackedcolumn3dlinedy:0,msstackedcolumn2dlinedy:0,scatter:0,bubble:0,ssgrid:0,scrollcolumn2d:0,scrollcolumn3d:0,scrollline2d:0,scrollarea2d:0,scrollstackedcolumn2d:0,scrollcombi2d:0,scrollcombidy2d:0,zoomline:0}
  );
  p.powercharts=e.extend(p.powercharts||{
    }
  ,{
    spline:0,splinearea:0,msspline:0,mssplinearea:0,mssplinedy:0,multiaxisline:0,multilevelpie:0,waterfall2d:0,msstepline:0,inversemsline:0,
inversemscolumn2d:0,inversemsarea:0,errorbar2d:0,errorscatter:0,errorline:0,logmsline:0,logmscolumn2d:0,logstackedcolumn2d:0,radar:0,dragnode:0,candlestick:0,selectscatter:0,dragcolumn2d:0,dragline:0,dragarea:0,boxandwhisker2d:0,kagi:0,heatmap:0}
  );
  p.widgets=e.extend(p.widgets||{
    }
  ,{
    angulargauge:0,bulb:0,cylinder:0,drawingpad:0,funnel:0,hbullet:0,hled:0,hlineargauge:0,vlineargauge:0,pyramid:0,realtimearea:0,realtimecolumn:0,realtimeline:0,realtimelinedy:0,realtimestackedarea:0,realtimestackedcolumn:0,
sparkcolumn:0,sparkline:0,sparkwinloss:0,thermometer:0,vbullet:0,gantt:0,vled:0}
  );
  p.maps=e.extend(p.maps||{
    }
  ,{
    }
  );
  e.extend(u,{
    render:function(b,g){
      var d=this.chartType(),h=this.options.chartTypeSourcePath+d,l=this.jsVars,p=this.__state,t=k.chartAPI,n=this.options,C=this.args,w=this.options.showChartLoadingMessage,D,v;
      D=a(h).concat(l.userModules);
      l.isResizing&&(l.isResizing=clearTimeout(l.isResizing));
      l.hcObj&&l.hcObj.destroy&&l.hcObj.destroy();
      if(t[d]){
        if(t[p.lastRenderedType]&&p.lastRenderedType!==
d)for(v in e.raiseEvent("chartTypeChanged",{
          previousType:p.lastRenderedType,newType:d}
        ,this),t[p.lastRenderedType].eiMethods)delete this[v];
        p.lastRenderedType=d;
        p.lastRenderedSrc=this.src;
        !l.waitingModuleError&&k.raiseEvent("internal.loaded",{
          type:d,triggeredModuleLoad:l.drLoadAttempted||l.waitingModule}
        ,this,[this.id]);
        delete l.waitingModule;
        delete l.waitingModuleError;
        delete l.drLoadAttempted;
        e.hcLib.createChart(this,b,d,g)}
      else{
        if(d&&q(D)){
          if(l.drLoadAttempted){
            e.raiseError(this,11112822001,"run",
"HC-interface~renderer.render","Chart runtimes not loaded even when resource is present");
            U(this,b,g);
            return}
          c(h)&&(D=a(h).concat(l.userModules));
          l.drLoadAttempted=!0}
        else{
          if(!D.length){
            U(this,b,g);
            return}
          if(l.waitingModuleError){
            U(this,b,g);
            delete l.waitingModule;
            delete l.waitingModuleError;
            return}
          }
        (d=N[D[D.length-1]])?(d.push({
          cmd:"render",obj:this,args:arguments}
        ),l.waitingModule||(l=w?n.PBarLoadingText||n.loadMessage:"",this._chartMessageImageStyle={
          imageHAlign:C.loadMessageImageHAlign||n.baseChartMessageImageHAlign,
imageVAlign:C.loadMessageImageVAlign||n.baseChartMessageImageVAlign,imageAlpha:C.loadMessageImageAlpha||n.baseChartMessageImageAlpha,imageScale:C.loadMessageImageScale||n.baseChartMessageImageScale}
        ,this._chartMessageStyle={
          color:C.loadMessageColor||n.baseChartMessageColor,fontFamily:C.loadMessageFont||n.baseChartMessageFont,fontSize:C.loadMessageFontSize||n.baseChartMessageFontSize}
        ,e.hcLib.createChart(this,b,"stub",void 0,l),u.load.call(this,b,g))):(e.raiseError(this,12080515551,"run","HC-interface~renderer.render",
"Unregistered module in dependentModule definition."),this._chartMessageImageStyle={
          imageHAlign:C.renderErrorMessageImageHAlign||n.baseChartMessageImageHAlign,imageVAlign:C.renderErrorMessageImageVAlign||n.baseChartMessageImageVAlign,imageAlpha:C.renderErrorMessageImageAlpha||n.baseChartMessageImageAlpha,imageScale:C.renderErrorMessageImageScale||n.baseChartMessageImageScale}
        ,this._chartMessageStyle={
          color:C.renderErrorMessageColor||n.baseChartMessageColor,fontFamily:C.renderErrorMessageFont||n.baseChartMessageFont,
fontSize:C.renderErrorMessageFontSize||n.baseChartMessageFontSize}
        ,e.hcLib.createChart(this,b,"stub",void 0,n.renderErrorMessage))}
      }
    ,update:function(a){
      var b=this.ref,c=this.jsVars,h=c&&c.fcObj,h=c.container||h&&h.options&&h.options.containerElement&&h.options.containerElement.childNodes[0];
      c.hcObj&&c.hcObj.destroy&&c.hcObj.destroy();
      c.isResizing&&(c.isResizing=clearTimeout(c.isResizing));
      void 0===a.error?(delete c.stallLoad,delete c.loadError,this.isActive()?this.src!==this.__state.lastRenderedSrc?
this.render():e.hcLib.createChart(this,h):this.__state.rendering&&!c.waitingModule&&e.hcLib.createChart(this,h)):(this.isActive()&&"function"===typeof b.showChartMessage&&b.showChartMessage("InvalidXMLText"),delete c.loadError)}
    ,resize:function(a){
      var b=this.ref,c,h=this.jsVars;
      b&&b.resize&&(h.isResizing&&(h.isResizing=clearTimeout(h.isResizing)),h.isResizing=setTimeout(function(){
        c=e.normalizeCSSDimension(a.width,a.height,b);
        void 0!==a.width&&(b.style.width=c.width);
        void 0!==a.height&&(b.style.height=
c.height);
        b.resize();
        delete h.isResizing}
      ,0))}
    ,dispose:function(){
      var a,b=this.jsVars;
      b.isResizing&&(b.isResizing=clearTimeout(b.isResizing));
      b.instanceAPI&&b.instanceAPI.dispose&&(b.instanceAPI.dispose(),delete b.instanceAPI);
      if(a=this.ref)e.purgeDOM(a),a.parentNode&&a.parentNode.removeChild(a);
      b.container=null;
      k.cleanupWaitingCommands(this)}
    ,load:function(b,c){
      var d=this.jsVars,h=this.chartType(),l=e.hcLib.chartAPI[h],h=a(h).concat(d.userModules),p=h[h.length-1];
      l||!h||h&&0===h.length?(delete d.waitingModule,
b&&U(this,b||this.ref,c)):d.waitingModule||(d.waitingModule=!0,delete d.waitingModuleError,D(h,function(){
        delete d.waitingModule;
        J(k.moduleCmdQueue[p])}
      ,t,this))}
    }
  )}
  ]);
  
FusionCharts.register("module",["private","modules.api.dynamicchartattributes",function(){
  var e=this;
  e.extend(e.core,{
    setChartAttribute:function(k,u){
      var q,D,b,N;
      if("string"===typeof k)q=k,k={
        }
      ,k[q]=u;
      else if(null===k||"object"!==typeof k)return;
      N=0;
      if(b=(q=this.getChartData(e.dataFormats.JSON))&&(q.chart||q.graph||q.map)){
        for(D in k)N+=1,null===k[D]?delete b[D.toLowerCase()]:b[D.toLowerCase()]=k[D];
        0<N&&("undefined"===typeof b.animation&&(b.animation="0"),this.setChartData(q,e.dataFormats.JSON))}
      else e.raiseError(this,
"2105141421","run","#setChartAttribute()","Could not retrieve attribute list. Is data ready?")}
    ,getChartAttribute:function(k){
      var u=this.getChartData(e.dataFormats.JSON),u=u&&(u.chart||u.graph||u.map),q,D;
      if(0===arguments.length||void 0===k||void 0===u)return u;
      if("string"===typeof k)q=u[k.toString().toLowerCase()];
      else if(k instanceof Array)for(q={
        }
      ,D=0;
      D<k.length;
      D+=1)q[k[D]]=u[k[D].toString().toLowerCase()];
      else e.raiseError(this,"25081429","param","~getChartAttribute()",'Unexpected value of "attribute"');
      
return q}
    }
  ,!0)}
  ]);
  
FusionCharts.register("module",["private","api.linkmanager",function(){
  var e=this,k=e.FusionChartsDOMInsertModes,u={
    }
  ,q=function(b,k){
    this.items={
      }
    ;
    this.root=b;
    this.parent=k;
    k instanceof e.core?this.level=this.parent.link.level+1:(u[b.id]=[{
      }
    ],this.level=0)}
  ,D=function(b,e){
    return(b.options.containerElement===e.options.containerElement||b.options.containerElementId===e.options.containerElementId)&&b.options.insertMode===k.REPLACE}
  ;
  e.policies.link=["link",void 0];
  q.prototype.configuration=function(){
    return u[this.root.id][this.level]||
(u[this.root.id][this.level]={
      }
    )}
  ;
  e.extend(e.core,{
    configureLink:function(b,k){
      var q;
      if(b instanceof Array){
        for(q=0;
        q<b.length;
        q+=1)"object"!==typeof u[this.link.root.id][q]&&(u[this.link.root.id][q]={
          }
        ),e.extend(u[this.link.root.id][q],b[q]);
        u[this.link.root.id].splice(b.length)}
      else"object"===typeof b?("number"!==typeof k&&(k=this.link.level),void 0===u[this.link.root.id][k]&&(u[this.link.root.id][k]={
        }
      ),e.extend(u[this.link.root.id][k],b)):e.raiseError(this,"25081731","param","~configureLink()",
"Unable to update link configuration from set parameters")}
    }
  ,!0);
  e.addEventListener("beforeInitialize",function(b){
    b.sender.link instanceof q?b.sender.link.parent instanceof e.core&&(b.sender.link.parent.link.items[b.sender.id]=b.sender):b.sender.link=new q(b.sender)}
  );
  e.addEventListener("linkedChartInvoked",function(b,k){
    var u=b.sender,c=u.clone({
      dataSource:k.data,dataFormat:k.linkType,link:new q(u.link.root,u)}
    ,!0),p=k.alias,a;
    p&&(!c.typeSource&&c.swfUrl&&(c.typeSource=c.swfUrl.replace(/(.*?)?[^\/]*\.swf.*?/ig,
"$1")),c.type=p);
    u.args&&0!==parseInt(u.args.animate,10)&&delete c.animate;
    e.extend(c,u.link.configuration());
    e.raiseEvent("beforeLinkedItemOpen",{
      level:u.link.level}
    ,u.link.root,void 0,function(){
      e.core.items[c.id]instanceof e.core&&e.core.items[c.id].dispose();
      a=new e.core(c);
      D(a,u)||u.options.overlayButton&&u.options.overlayButton.message||("object"!==typeof u.options.overlayButton&&(u.options.overlayButton={
        }
      ),u.options.overlayButton.message="Close");
      a.render();
      e.raiseEvent("linkedItemOpened",
{
        level:u.link.level,item:a}
      ,u.link.root)}
    )}
  );
  e.addEventListener("overlayButtonClick",function(b,k){
    if("LinkManager"===k.id){
      var q=b.sender,c=q.link.level-1,p=q.link.parent,a=q.link.root;
      e.raiseEvent("beforeLinkedItemClose",{
        level:c,item:q}
      ,a,q,function(){
        setTimeout(function(){
          e.core.items[q.id]&&q.dispose();
          e.raiseEvent("linkedItemClosed",{
            level:c}
          ,a)}
        ,0);
        p.disposed||p.isActive()||!D(q,p)||p.render()}
      )}
    }
  );
  e.addEventListener("Loaded",function(b){
    b=b.sender;
    var k;
    b&&void 0!==b.link&&b.link.root!==b&&
b.link.parent instanceof e.core&&(b.ref&&"function"===typeof b.ref.drawOverlayButton?(k=e.extend({
      show:!0,id:"LinkManager"}
    ,b.link.parent.options.overlayButton),e.extend(k,b.link.parent.link.configuration().overlayButton||{
      }
    ),b.ref.drawOverlayButton(k)):e.raiseWarning(b,"04091602","run","::LinkManager^Loaded","Unable to draw overlay button on object. -"+b.id))}
  );
  e.addEventListener("beforeDispose",function(b){
    var k=b.sender;
    k&&k.link instanceof q&&(k&&k.link&&k.link.parent instanceof e.core&&k.link.parent.link&&
k.link.parent.link.items&&delete k.link.parent.link.items[b.sender.id],delete u[k.id])}
  )}
  ]);
  
FusionCharts.register("module",["private","modules.renderer.js-thememanager",function(){
  var e=this,k,u,q,D=/\s+!important$/,b=/\\!important$/,N=function(a,b){
    for(var c=b.length,e=-1;
    c--;
    )if(a===b[c]){
      e=c;
      break}
    return e}
  ,J=function(a,b,c,e,k){
    var p,n,q,t;
    k?(e.push(a),k.push(b)):(e=[a],k=[b]);
    if(b instanceof Array)for(p=0;
    p<b.length;
    p+=1){
      try{
        n=a[p],q=b[p]}
      catch(u){
        continue}
      if("object"!==typeof q)c&&void 0===q||(a[p]=q);
      else{
        if(null===n||"object"!==typeof n)n=a[p]=q instanceof Array?[]:{
          }
        ;
        t=N(q,k);
        
-1!==t?n=a[p]=e[t]:J(n,q,c,e,k)}
      }
    else for(p in b){
      try{
        n=a[p],q=b[p]}
      catch(v){
        continue}
      if(null!==q&&"object"===typeof q)if(t=Object.prototype.toString.call(q),"[object Object]"===t){
        if(null===n||"object"!==typeof n)n=a[p]={
          }
        ;
        t=N(q,k);
        -1!==t?n=a[p]=e[t]:J(n,q,c,e,k)}
      else"[object Array]"===t?(null!==n&&n instanceof Array||(n=a[p]=[]),t=N(q,k),-1!==t?n=a[p]=e[t]:J(n,q,c,e,k)):a[p]=q;
      else a[p]=q}
    return a}
  ,c=function(a,b,c){
    if("object"!==typeof a&&"object"!==typeof b)return null;
    if("object"!==typeof b||
null===b)return a;
    "object"!==typeof a&&(a=b instanceof Array?[]:{
      }
    );
    J(a,b,c);
    return a}
  ,p=function(a){
    var c={
      important:!1,str:""}
    ;
    if(!a)return c;
    a=a.toString();
    D.test(a)?(a=a.replace(D,""),c.important=!0):(a=a.replace(b,"!imporant"),c.important=!1);
    c.str=a;
    return c}
  ,a=function(b,c){
    var e,l,k,p,n,q,u=0,D=0;
    for(e in b)if(l=b[e],l instanceof Array)for(q=l.length,n=0;
    n<q;
    n+=1){
      if(p=l[n],"object"===typeof p)if("category"===e)if("true"===p.vline){
        if(k=c.component("vline",u,p))t(p,k),u+=1}
      else{
        if(k=c.component("category",
D,p,q))t(p,k),D+=1}
      else if(k=c.component(e,n,p,q))t(p,k),a(p,k)}
    else"object"===typeof l&&(k=c.component(e,null,l))&&(t(l,k),a(l,k))}
  ,t=function(a,b){
    var c=b.getAll(),e,k;
    for(e in c)k=c[e].toString(),k=p(k),k.important?a[e.toLowerCase()]=k.str:void 0===a[e.toLowerCase()]&&(a[e.toLowerCase()]=k.str)}
  ,U=function(a,b){
    "geo"===b.defaultSeriesType&&F.call(this,a,b)}
  ,F=function(a,b){
    var c=a.sender,l=c.getChartData(e.dataFormats.JSON,!0),k;
    l.error||((k=l.data.chart.theme)?q.themify(k,c,c.chartType(),l.data,
"geo"===b.defaultSeriesType&&"geo"):c.jsVars.themeObject&&c.jsVars.themeObject.dispose())}
  ;
  k=function(){
    this.themeStore={
      }
    }
  ;
  k.prototype={
    constructor:k,add:function(a){
      for(var b=0,c=a.length,e;
      b<c;
      b+=1)(e=a[b].name)&&(this.themeStore[e]=a[b])}
    ,themify:function(a,b,c,l,k){
      var p=b.jsVars,n=a.split(","),q=[],t=n.length,D,v;
      if(t){
        for(v=0;
        v<t;
        v+=1){
          D=this.themeStore;
          var J;
          J=n[v];
          J=J.replace(/^\s\s*/,"");
          for(var N=/\s/,$=J.length;
          N.test(J.charAt(--$));
          );
          J=J.slice(0,$+1);
          (D=D[J])&&q.push(this.evaluateThemeJSON(D.theme,
b,c,k))}
        q.length?(p.themeObject=new u(q,b,!1,l),this.applyTheme(b),b.addEventListener("chartTypeChanged",F),b.addEventListener("internal.drawstart",U)):e.raiseWarning(b,"14051100501","run","api.themes~themify()",'The theme "'+a+'" requested has not been registered.')}
      }
    ,evaluateThemeJSON:function(a,b,e,l){
      var k={
        }
      ,p=b.jsVars,n=function(a){
        var b,d;
        for(b in a)d=a[b],k[b]=d instanceof Array?c(k[b]||[],d):"object"===typeof d?c(k[b]||{
          }
        ,d):d}
      ;
      e=e||b.chartType();
      p.themeObject&&a!==p.themeObject&&(p.themeObject.dispose(),
delete p.themeObject);
      n(a.base);
      l&&a[l]&&n(a[l]);
      e&&a[e]&&n(a[e]);
      return k}
    ,applyTheme:function(b){
      b=b.jsVars.themeObject;
      var c=b.getThemedJSONData().data;
      c&&a(c,b)}
    }
  ;
  u=function(a,b,e,l){
    this.themeArray=a;
    this.themeComponents={
      }
    ;
    this.base={
      }
    ;
    this.chartInstance=b;
    this.isChildInstance=Boolean(e);
    this.themedData=e?null:c({
      }
    ,l);
    this.length=a.length;
    b=0;
    for(e=a.length;
    b<e;
    b+=1)this.parse(a[b])}
  ;
  u.prototype={
    constructor:u,pushTheme:function(a){
      a&&(this.themeArray.push(a),this.parse(a),this.length+=1)}
    ,
popTheme:function(){
      }
    ,parse:function(a){
      var b=this.themeComponents,e=this.chartInstance,l=this.base,k,q,n;
      for(q in a)if("string"===typeof a[q]||"number"===typeof a[q])if(l[q]){
        if(k=p(a[q]),n=p(l[q]),k.important||!n.important)l[q]=a[q]}
      else l[q]=a[q];
      else b[q]||(b[q]=[]),k=b[q],a[q]instanceof Array?k.push(c([],a[q])):"object"===typeof a[q]?k.push(new u([a[q]],e,!0)):"function"===typeof a[q]&&k.push(a[q])}
    ,merge:function(a){
      var b=this.base,c=a.base,e=this.themeComponents,k=a.themeComponents,q,n,t;
      for(t in c)if(q=
p(b[t]),n=p(c[t]),!q.important||n.important)b[t]=c[t];
      for(t in k)e[t]=e[t]?e[t].concat(k[t]):[].concat(k[t]);
      this.length+=a.length}
    ,get:function(a){
      return this.base[a]}
    ,getAll:function(){
      return c({
        }
      ,this.base)}
    ,component:function(a,b,c,e){
      var k=this.themeComponents,p=this.chartInstance,n=new u([],p,!0),q,t,D;
      t=k[a];
      if(!t)return null;
      a=0;
      for(k=t.length;
      a<k;
      a+=1)D=t[a],"function"===typeof D?(b=b||0,n.pushTheme(D.call(p,b,c,e))):D instanceof Array?(b=b||0,q=D.length,b%=q,q=D[b],q instanceof u?n.merge(q):
"function"===typeof q?n.pushTheme(q.call(p,b,c,e)):n.pushTheme(q)):D instanceof u?n.merge(D):n.pushTheme(D);
      return n}
    ,getThemedJSONData:function(){
      return{
        data:this.themedData}
      }
    ,dispose:function(){
      var a=this.themeComponents,b=this.chartInstance,c,e;
      for(c in a)if(e=a[c].length){
        for(;
        e--;
        )a[c][e].dispose&&a[c][e].dispose();
        delete a[c]}
      this.isChildInstance||(b.removeEventListener("chartTypeChanged",F),b.removeEventListener("internal.drawstart",U));
      this.dataWithoutTheme=this.isChildInstance=this.themeArray=
this.base=this.chartInstance=this.themeComponents=null}
    }
  ;
  q=new k;
  e.registrars.theme=e.registerTheme=function(a){
    a&&("[object Array]"!==Object.prototype.toString.call(a)&&(a=[a]),q.add(a))}
  ;
  e.addEventListener("beforeDataUpdate",function(a,b){
    var c=a.sender,k=e.core.transcodeData(b.data,b.format,e.dataFormats.JSON),p=k.chart&&k.chart.theme;
    p?q.themify(p,c,c.args.type,k):c.jsVars.themeObject&&(c.jsVars.themeObject.dispose(),delete c.jsVars.themeObject)}
  )}
  ]);
  
FusionCharts.register("theme",{
  name:"default",theme:{
    base:{
      chart:{
        labelDisplay:"stagger !important",caption:"Theme Caption \\!important",canvasBgColor:"#56EF22",borderThickness:"5 !important",borderColor:"#E60539",baseFontColor:"#781129"}
      ,categories:[{
        fontColor:"#0F4F40",fontSize:15,category:function(e){
          return{
            showLabel:e%2?0:1}
          }
        ,vline:{
          color:"#000000",thickness:2}
        }
      ],dataset:[{
        color:"#8C3146",data:function(e,k){
          8==e&&(k.value="");
          return{
            color:32E3>Number(k.value)?"#8C3146":"#FF0000",alpha:"100"}
          }
        }
      ],
trendlines:[{
        line:function(e){
          return e?{
            color:"#ff0000",thickness:3}
          :{
            color:"#ffff00",thickness:3}
          }
        }
      ]}
    ,pie2d:{
      chart:{
        bgColor:"#FF0000"}
      }
    ,msline:{
      chart:{
        canvasBgColor:"#ff0000"}
      }
    ,geo:{
      chart:{
        canvasBgColor:"#0000ff"}
      }
    ,world:{
      chart:{
        canvasBgColor:"#00ff00"}
      }
    }
  }
  );
  
