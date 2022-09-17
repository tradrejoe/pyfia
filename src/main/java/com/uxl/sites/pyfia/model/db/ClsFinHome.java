package com.uxl.sites.pyfia.model.db;

// Generated Jun 30, 2013 12:13:50 PM by Hibernate Tools 3.4.0.CR1

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uxl.sites.pyfia.model.GenericHibernateDAO;

/**
 * Home object for domain model class ClsFin.
 * @see com.uxl.sites.pyfia.model.db.ClsFin
 * @author Hibernate Tools
 */
@Service
@Repository
@Transactional
@Component
public class ClsFinHome extends GenericHibernateDAO {
	protected static final Log log = LogFactory.getLog(GenericHibernateDAO.class);

	protected SessionFactory sessionFactory;
	
	@Autowired
	@Resource
	public void init(LocalSessionFactoryBean sessionFactoryBean) {
		this.sessionFactory = sessionFactoryBean.getObject();
		System.err.println("GenericHibernateDAO::init(), sessionFactory="+this.sessionFactory);
	}

	
	public void persist(ClsFin transientInstance) {
		log.debug("persisting ClsFin instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(ClsFin instance) {
		log.debug("attaching dirty ClsFin instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(ClsFin instance) {
		log.debug("attaching clean ClsFin instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(ClsFin persistentInstance) {
		log.debug("deleting ClsFin instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public ClsFin merge(ClsFin detachedInstance) {
		log.debug("merging ClsFin instance");
		try {
			ClsFin result = (ClsFin) sessionFactory.getCurrentSession().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public ClsFin findById(java.lang.String id) {
		log.debug("getting ClsFin instance with id: " + id);
		try {
			ClsFin instance = (ClsFin) sessionFactory.getCurrentSession().get(
					"com.uxl.sites.pyfia.model.db.ClsFin", id);
			if (instance == null) {
				log.debug("get successful, no instance found");
			} else {
				log.debug("get successful, instance found");
			}
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
}
