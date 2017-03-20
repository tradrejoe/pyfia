@echo off
setlocal
del *.log*
time /t
rem mvn -Pdev.test clean install -Dmaven.test.prediction=true
mvn -Pdev.test clean install -Dmaven.test.users=true
time /t
endlocal
