#!/bin/sh

CATALINA_HOME=/c/apache-tomcat-9.0.21
$CATALINA_HOME/bin/shutdown.sh || 1
pyfia_home=/c/projects/pyfia
path_curr=`pwd`
cd $pyfia_home
mvn clean install -Djavax.net.ssl.trustStorePassword=changeit -Djdbc.url=jdbc:mysql://db-pyfia.cs4dek3qvvfe.us-east-1.rds.amazonaws.com:3306/pyfiadb -Djdbc.username=root
rm -rf $CATALINA_HOME/webapps/ROOT
rm -rf $CATALINA_HOME/work/Catalina
rm -f $CATALINA_HOME/logs/*
cp $pyfia_home/target/ROOT.war $CATALINA_HOME/webapps
$CATALINA_HOME/bin/startup.sh
cd $path_curr
