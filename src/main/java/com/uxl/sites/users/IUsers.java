package com.uxl.sites.users;

import com.uxl.sites.users.exceptions.UserException;

public interface IUsers extends IUsersGeneric {

	public void isLoginned() throws UserException;

}
