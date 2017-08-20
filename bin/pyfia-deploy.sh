$CATALINA_HOME/bin/shutdown.sh
pyfia_home=/projects/pyfia
path_curr=`pwd`
cd $pyfia_home
mvn clean install -Pprod -Dmaven.test.skip=true
rm -rf $CATALINA_HOME/webapps/ROOT
cp $pyfia_home/target/ROOT.war $CATALINA_HOME/webapps
$CATALINA_HOME/bin/startup.sh
cd $path_curr
