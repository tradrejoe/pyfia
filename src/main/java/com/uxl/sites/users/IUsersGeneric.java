package com.uxl.sites.users;

import com.uxl.sites.pyfia.model.db.Users;
import com.uxl.sites.users.exceptions.UserException;

public interface IUsersGeneric {
	
	public static final String LOGIN_NAME = "LOGIN_NAME";	

	public void login(String loginName, String passwd) throws UserException;

	public void register(String loginName, String passwd) throws UserException;

	public Users isRegistered(String loginName) throws UserException;

	public void subscribe() throws UserException;

	public void isSubscribed(String loginName) throws UserException;

}
