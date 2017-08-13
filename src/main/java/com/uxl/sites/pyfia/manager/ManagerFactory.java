package com.uxl.sites.pyfia.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Repository
@Transactional
@Component
public class ManagerFactory {
	
	public static final String MAVEN_TEST_USERS = "maven.test.users";
	
	@Autowired
	static TestManager testManager;
	
	@Autowired
	static LiveManager liveManager;
	
	public static IManager getManager() {
		String testprop = System.getProperty(MAVEN_TEST_USERS);
		return (testprop!=null && testprop.trim().equalsIgnoreCase("true")) ?
				testManager : liveManager;
	}
}
