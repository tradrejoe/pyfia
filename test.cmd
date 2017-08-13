@echo off

set OLD_CLASSPATH=%CLASSPATH%
set OLD_JAVA_HOME=%JAVA_HOME%
set OLD_PATH=%PATH%

rem set JAVA_HOME=C:\Progra~1\Java\jdk1.7.0_55
set PATH=%JAVA_HOME%\bin;%PATH%
set PHT=.\target
set AIC=pf
set AI=%PHT%\%AIC%
set V=%AI%-1.1
set CP=%V%\WEB-INF\lib
set JARS=
set CLASSPATH=
set LIB=.\lib

for %%i in (%LIB%\*.jar) do call cpappend.cmd %%i

rem for %%i in (%CP%\*.jar) do call cpappend.cmd %%i

rem for %%i in (%CATALINA_HOME%\lib\*.jar) do call cpappend.cmd %%i

set CLASSPATH=%JARS%;%PHT%\classes;
set CLASSPATH=%CLASSPATH%;%V%\WEB-INF\spring
set CLASSPATH=%CLASSPATH%;%V%
set CLASSPATH=%CLASSPATH%;%CP%\org.springframework.test-4.0.5.RELEASE.jar
set CLASSPATH=%CLASSPATH%;%CP%\spring-context-4.0.5.RELEASE.jar
set CLASSPATH=%CLASSPATH%;%CP%\spring-beans-4.0.5.RELEASE.jar
set CLASSPATH=%CLASSPATH%;%CP%\spring-core-4.0.5.RELEASE.jar
set CLASSPATH=%CLASSPATH%;%CP%\log4j-1.2.15.jar
set CLASSPATH=%CLASSPATH%;%CP%\commons-spring-1.0.13.jar
set CLASSPATH=%CLASSPATH%;%CP%\commons-lang-2.6.jar
set XARGS=

if "%1"=="correlation" goto correlation
if "%1"=="genfile" goto genfile
if "%1"=="prediction" goto prediction
if "%1"=="ma" goto ma
if "%1"=="matrade" goto matrade
if "%1"=="predictionma" goto predictionma
goto end

:correlation
set TEST_PROP=maven.test.correlation
goto main
:genfile
set TEST_PROP=maven.test.genfile
goto main
:prediction
set TEST_PROP=maven.test.prediction
set XARGS=-Dmaven.test.date=%2
goto main
:ma
set TEST_PROP=maven.test.ma
goto main
:matrade
set TEST_PROP=maven.test.ma.trade
goto main
:predictionma
set TEST_PROP=maven.test.prediction.ma
set XARGS=-Dmaven.test.date=%2
goto main

:main
echo %JAVA_HOME%\bin\java -Xmx2000m -Dlog4j.configuration="file:%V%\resources\log4j.properties" -D%TEST_PROP%=true -Dtest.libs="%LIB%,%CP%,%CATALINA_HOME%\lib" -Dspring.liveBeansView.mbeanDomain=dev %XARGS% -Dtest.xcludeJars="slf4j-log4j12-1.5.10.jar;com.springsource.slf4j.log4j-1.5.10.jar" -classpath %CLASSPATH% com.uxl.sites.pyfia.PyfiaTest
     %JAVA_HOME%\bin\java -Xmx2000m -Dlog4j.configuration="file:%V%\resources\log4j.properties" -D%TEST_PROP%=true -Dtest.libs="%LIB%,%CP%,%CATALINA_HOME%\lib" -Dspring.liveBeansView.mbeanDomain=dev %XARGS% -classpath %CLASSPATH% com.uxl.sites.pyfia.PyfiaTest

:end
set CLASSPATH=%OLD_CLASSPATH%
set JAVA_HOME=%OLD_JAVA_HOME%
set PATH=%OLD_PATH%

