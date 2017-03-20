package com.uxl.sites.pyfia.manager;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Repository
@Transactional
@Component
public class ManagerFactory implements ApplicationContextAware {
	
	public static final String MAVEN_TEST_USERS = "maven.test.users";
	
	   private static ApplicationContext applicationContext;

	    public void setApplicationContext( ApplicationContext applicationContext ) throws BeansException {
	        this.applicationContext = applicationContext;
	    }
	
	
	public static IManager getManager() {
		String testprop = System.getProperty(MAVEN_TEST_USERS);
		return (testprop!=null && testprop.trim().equalsIgnoreCase("true")) ?
				applicationContext.getBean(TestManager.class) : applicationContext.getBean(LiveManager.class);
	}
}
