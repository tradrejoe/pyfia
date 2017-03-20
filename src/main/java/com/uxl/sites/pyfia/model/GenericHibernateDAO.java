package com.uxl.sites.pyfia.model;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.LocalSessionFactoryBean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Repository
@Transactional
@Component
public class GenericHibernateDAO {

	protected static final Log log = LogFactory.getLog(GenericHibernateDAO.class);

	protected static SessionFactory sessionFactory;
	
	@Autowired
	@Resource
	public void init(LocalSessionFactoryBean sessionFactoryBean) {
		this.sessionFactory = sessionFactoryBean.getObject();
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}	
}
