package com.uxl.sites.pyfia.model.db;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uxl.sites.pyfia.model.GenericHibernateDAO;

/**
 * Home object for domain model class UsersAttr.
 * @see com.uxl.sites.pyfia.model.db.UsersAttr
 * @author Hibernate Tools
 */
@Service
@Repository
@Transactional
@Component
public class UsersAttrHome extends GenericHibernateDAO {
	protected static final Log log = LogFactory.getLog(UsersAttrHome.class);

	@Transactional
	public void persist(UsersAttr transientInstance) {
		log.debug("persisting UsersAttr instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachDirty(UsersAttr instance) {
		log.debug("attaching dirty UsersAttr instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachClean(UsersAttr instance) {
		log.debug("attaching clean UsersAttr instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void delete(UsersAttr persistentInstance) {
		log.debug("deleting UsersAttr instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Transactional
	public UsersAttr merge(UsersAttr detachedInstance) {
		log.debug("merging UsersAttr instance");
		try {
			UsersAttr result = (UsersAttr) sessionFactory.getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Transactional
	public UsersAttr findById(com.uxl.sites.pyfia.model.db.UsersAttrId id) {
		log.debug("getting UsersAttr instance with id: " + id);
		try {
			UsersAttr instance = (UsersAttr) sessionFactory.getCurrentSession()
					.get("com.uxl.sites.pyfia.model.db.UsersAttr", id);
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
