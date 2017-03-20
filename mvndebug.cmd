@echo off
@setlocal
rem mvn -Dmaven.surefire.debug="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000 -Xnoagent -Djava.compiler=NONE" test
rem mvn clean install -Pprofile -Dmaven.test.skip=true
rem mvn -Pdev.test -Dmaven.test.correlation=true -Dmaven.surefire.debug test
rem mvn -Pdev.test -Dmaven.test.users=true -Dmaven.surefire.debug="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005 -Xnoagent -Djava.compiler=NONE" test
mvn -Pdev.test -Dmaven.test.prediction=true -Dmaven.surefire.debug="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005 -Xnoagent -Djava.compiler=NONE" test
@endlocal
