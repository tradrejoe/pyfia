package com.uxl.sites.pyfia.model.adapter;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uxl.sites.users.exceptions.IException;
import com.uxl.sites.users.exceptions.UserException;
import com.uxl.sites.pyfia.manager.IManager;
import com.uxl.sites.pyfia.manager.ManagerFactory;
import com.uxl.sites.pyfia.model.db.Users;
import com.uxl.sites.pyfia.model.db.UsersHome;
import com.uxl.sites.pyfia.web.PyfiaController;
import com.uxl.sites.users.IUsers;

@Service
@Repository
@Transactional
@Component
public class UsersAdapter implements IUsers {

	IManager manager = null;

	public UsersAdapter() {
		manager = ManagerFactory.getManager();
	}


	public void isLoginned() throws UserException {
		manager.isLoginned();
	}

	public void login(String loginName, String passwd) throws UserException {

		manager.login(loginName, passwd);
	}

	public Users isRegistered(String loginName) throws UserException {
		return manager.isRegistered(loginName);
	}

	public void register(String loginName, String passwd) throws UserException {
		manager.register(loginName, passwd);
	}

	public void isSubscribed(String loginName) throws UserException {
		manager.isSubscribed(loginName);
	}

	public void subscribe() throws UserException {
		manager.subscribe();
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
