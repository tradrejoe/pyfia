package com.uxl.sites.pyfia;

import java.io.FileNotFoundException;
import java.net.URL;

import org.apache.log4j.PropertyConfigurator;
import org.apache.log4j.helpers.Loader;
import org.junit.runners.model.InitializationError;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


public class JUnit4ClassRunner extends SpringJUnit4ClassRunner {
	  static {
		    try {
		      //Log4jConfigurer.initLogging( "classpath:/log4j.properties" );
		      
		      String prop = System.getProperty("log4j.configuration");
		      if (prop == null) prop = "log4j.properties";
		      URL log4jConfig = Loader.getResource(prop);
		      if (log4jConfig.getProtocol().equalsIgnoreCase("file")){
		          PropertyConfigurator.configureAndWatch(log4jConfig.getFile().substring(1), 10000);
		      }else{
		          // cannot monitor if file changed because URL is not a file
		      }
		    }
		    catch( Exception ex ) {
		      System.err.println( "Cannot Initialize log4j" );
		    }
		  }

	public JUnit4ClassRunner() throws InitializationError {
		this(PyfiaTest.class);
	}
	
	public JUnit4ClassRunner( Class<?> clazz ) throws InitializationError {
	    super( clazz );
	}

}
