#!/bin/sh

OLD_CLASSPATH=${CLASSPATH}
OLD_JAVA_HOME=$JAVA_HOME
OLD_PATH=$PATH
JAVA_HOME=/jdk1.8.0_25
PATH="$JAVA_HOME"/bin:$PATH
PF_HOME=/home/ec2-user/projects/pyfia
PHT="$PF_HOME"/target
AIC=pf
AI="$PHT"/"$AIC"
V="$AI"-1.1
CP="$V"/WEB-INF/lib
JARS=
CLASSPATH=
LIB="$PF_HOME"/lib

for i in `ls $LIB/*.jar` 
do 
	CLASSPATH="$CLASSPATH:$i"
done

CLASSPATH=${CLASSPATH}:${PHT}/classes
CLASSPATH=${CLASSPATH}:${V}/WEB-INF/spring
CLASSPATH=${CLASSPATH}:${V}
CLASSPATH=${CLASSPATH}:${CP}/org.springframework.test-4.0.5.RELEASE.jar
CLASSPATH=${CLASSPATH}:${CP}/spring-context-4.0.5.RELEASE.jar
CLASSPATH=${CLASSPATH}:${CP}/spring-beans-4.0.5.RELEASE.jar
CLASSPATH=${CLASSPATH}:${CP}/spring-core-4.0.5.RELEASE.jar
CLASSPATH=${CLASSPATH}:${CP}/log4j-1.2.15.jar
CLASSPATH=${CLASSPATH}:${CP}/commons-spring-1.0.13.jar
CLASSPATH=${CLASSPATH}:${CP}/commons-lang-2.6.jar

TEST_PROP=

case "$1" in
	"correlation") TEST_PROP=maven.test.correlation ;;
	"genfile") TEST_PROP=maven.test.genfile ;;
	"prediction") TEST_PROP=maven.test.prediction ;;
	"ma") TEST_PROP=maven.test.ma ;;
	"matrade") TEST_PROP=maven.test.ma.trade ;;
	"predictionma") TEST_PROP=maven.test.prediction.ma ;;
esac

#if [$1 = "correlation"]
#then
#	TEST_PROP=maven.test."maven.test.correlation"
#fi

echo $JAVA_HOME/bin/java -Dlog4j.configuration="file:${V}/resources/log4j.properties" -D"$TEST_PROP"=true -Dtest.libs="$LIB,$CP,$CATALINA_HOME/lib" -Dspring.liveBeansView.mbeanDomain=dev -Dtest.xcludeJars="slf4j-log4j12-1.5.10.jar;com.springsource.slf4j.log4j-1.5.10.jar" -classpath ${CLASSPATH} com.uxl.sites.pyfia.PyfiaTest
     $JAVA_HOME/bin/java -Dlog4j.configuration="file:${V}/resources/log4j.properties" -D"$TEST_PROP"=true -Dtest.libs="$LIB,$CP,$CATALINA_HOME/lib" -Dspring.liveBeansView.mbeanDomain=dev -classpath ${CLASSPATH} com.uxl.sites.pyfia.PyfiaTest

CLASSPATH=$OLD_CLASSPATH
JAVA_HOME=$OLD_JAVA_HOME
PATH=$OLD_PATH

