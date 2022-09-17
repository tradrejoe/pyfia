package com.uxl.sites.pyfia.manager;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uxl.sites.users.UserTestHarness;
import com.uxl.sites.users.exceptions.IException;
import com.uxl.sites.users.exceptions.UserException;

@Service
@Repository
@Transactional
@Component
public class TestManager extends ManagerGeneric implements IManager {

	public int hashCode() {
		return 1;
	}
	
	public boolean equals(Object that) {
		return that!=null && that instanceof TestManager;
	}
	
	public void login(String loginName, String passwd) throws UserException {
		super.login(loginName, passwd);
		UserTestHarness.setCurrentLoginName(loginName);

	}

	public void isLoginned() throws UserException {
		if (UserTestHarness.getCurrentLoginName()==null) throw IException.ExceptionType.NOT_LOGGEDIN.toUserException();

	}
	
	public void register(String loginName, String passwd) throws UserException {
		super.register(loginName, passwd);
		this.login(loginName, passwd);
	}

}
