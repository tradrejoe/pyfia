@setlocal
@echo off
call mvn install:install-file -Dfile="mysql-connector-java-5.1.21-bin.jar" -DgroupId="com.mysql.jdbc" -DartifactId="com.springsource.com.mysql.jdbc" -Dversion="5.1.21" -Dpackaging=jar

call mvn install:install-file -Dfile="commons-math3-3.2.jar" -DgroupId="commons.math" -DartifactId="commons.math3" -Dversion="3.2" -Dpackaging=jar

call mvn install:install-file -Dfile="bcpg-jdk15-133.jar" -DgroupId="org.bouncycastle" -DartifactId=bcpg -Dversion="1.3.3" -Dpackaging=jar

call mvn install:install-file -Dfile="bcprov-jdk15-133.jar" -DgroupId="org.bouncycastle" -DartifactId=bcprov -Dversion="1.3.3" -Dpackaging=jar

call mvn install:install-file -Dfile="spring-test-4.0.5.RELEASE.jar" -DgroupId="org.springframework" -DartifactId="org.springframework.test" -Dversion="4.0.5.RELEASE" -Dpackaging=jar 

call mvn install:install-file -Dfile="spring-orm-4.0.5.RELEASE.jar" -DgroupId="org.springframework" -DartifactId="org.springframework.orm" -Dversion="4.0.5.RELEASE" -Dpackaging=jar 

call mvn install:install-file -Dfile="spring-oxm-4.0.5.RELEASE.jar" -DgroupId="org.springframework" -DartifactId="org.springframework.oxm" -Dversion="4.0.5.RELEASE" -Dpackaging=jar

call mvn install:install-file -Dfile="jgraphx.jar" -DgroupId="jgraphx" -DartifactId="jgraphx" -Dversion="1.0.0" -Dpackaging=jar

@endlocal