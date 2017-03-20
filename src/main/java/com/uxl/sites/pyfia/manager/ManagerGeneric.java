package com.uxl.sites.pyfia.manager;

import java.io.Serializable;

import javax.annotation.Resource;

import org.lc.crypto.SHA512;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uxl.sites.pyfia.model.db.Users;
import com.uxl.sites.pyfia.model.db.UsersAttrHome;
import com.uxl.sites.pyfia.model.db.UsersHome;
import com.uxl.sites.users.exceptions.IException;
import com.uxl.sites.users.exceptions.UserException;

@Service
@Repository
@Transactional
@Component
public class ManagerGeneric implements IManagerGeneric, Serializable {
	
	public static final long serialVersionUID = 0L;

	@Autowired
	@Resource
	UsersHome usersHome;
	
	@Autowired
	@Resource
	UsersAttrHome usersAttrHome;
		
	public int hashCode() {
		return 0;
	}
	
	public boolean equals(Object that) {
		return that!=null && that instanceof ManagerGeneric;
	}
		
	public void login(String loginName, String passwd) throws UserException {
				
		Users user = isRegistered(loginName);

		if (passwd==null || (passwd+"").trim().equals("")) 
			throw IException.ExceptionType.INVALID_PASSWORD.toUserException();
		
		try {
			user = usersHome.findById(loginName);
		} catch(Exception e) {
			throw IException.ExceptionType.INVALID_USERID.toUserException();
		}
		if (user==null) 
			throw IException.ExceptionType.INVALID_USERID.toUserException();
		String pwddg = user.getPassword();
		String tmpdg = null;
		try {			
			tmpdg = SHA512.digest(passwd);
		} catch(Exception e) {
			throw IException.ExceptionType.INVALID_PASSWORD.toUserException();
		}		
		if (tmpdg==null || !tmpdg.equals(pwddg)) 
			throw IException.ExceptionType.INVALID_PASSWORD.toUserException(); 
	}
	
	public void register(String loginName, String passwd) throws UserException {
		
		if (loginName==null || (loginName+"").trim().equals("")) 
			throw IException.ExceptionType.INVALID_USERID.toUserException();
		if (passwd==null) 
			throw IException.ExceptionType.INVALID_PASSWORD.toUserException();
		if ((passwd+"").trim().equals("")) 
			throw IException.ExceptionType.BLANK_PASSWORD.toUserException();
		Users user = null;
		try {
			user = usersHome.findById(loginName);
		} catch(Exception ignore) {}
		if (user!=null)
			throw IException.ExceptionType.USER_EXISTS.toUserException();
		String pwddg = null;
		try {
			pwddg = SHA512.digest(passwd);
		} catch(Exception e) {
			e.printStackTrace();
			throw IException.ExceptionType.CANNOT_ENCRYPT_PASSWORD.toUserException();
		}
		user = new Users(loginName, pwddg);
		try {
			usersHome.persist(user);
		} catch(Exception e) {
			e.printStackTrace();
			throw IException.ExceptionType.CANNOT_REGISTER.toUserException();
		}
	}

	public Users isRegistered(String loginName) throws UserException {
		
		if (loginName==null || (loginName+"").trim().equals("")) 
			throw IException.ExceptionType.INVALID_USERID.toUserException();
				
		Users user = null;
		try {
			user = usersHome.findById(loginName);
		} catch(Exception e) {
			throw IException.ExceptionType.INVALID_USERID.toUserException();
		}
		if (user==null) 
			throw IException.ExceptionType.INVALID_USERID.toUserException();
		return user;

	}

	public void subscribe() throws UserException {
		// TODO Auto-generated method stub

	}

	public void isSubscribed(String loginName) throws UserException {
		// TODO Auto-generated method stub

	}

}
