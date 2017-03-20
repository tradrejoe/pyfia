package com.uxl.sites.users;

public class UserTestHarness {

	static String currentLoginName = null;

	public static String getCurrentLoginName() {
		return currentLoginName;
	}

	public static void setCurrentLoginName(String currentLoginName) {
		UserTestHarness.currentLoginName = currentLoginName;
	}
	
}
