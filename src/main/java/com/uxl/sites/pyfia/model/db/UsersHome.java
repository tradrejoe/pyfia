package com.uxl.sites.pyfia.model.db;

import org.hibernate.LockMode;
import org.hibernate.Session;
import org.lc.misc.JsonUtil;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uxl.sites.pyfia.model.GenericHibernateDAO;

/**
 * Home object for domain model class Users.
 * @see com.uxl.sites.pyfia.model.db.Users
 * @author Hibernate Tools
 */
@Service
@Repository
@Transactional
@Component
public class UsersHome extends GenericHibernateDAO {

	@Transactional
	public void persist(Users transientInstance) {
		log.debug("persisting Users instance");
		try {
			log.debug("UsersHome::persist(), BEGIN, sessionFactory=" + JsonUtil.serialize(sessionFactory));
			Session session = sessionFactory.getCurrentSession();
			log.debug("UsersHome::persist(), session=" + JsonUtil.serialize(session));
			session.persist(transientInstance);
			log.debug("persist successful");
			
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachDirty(Users instance) {
		log.debug("attaching dirty Users instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachClean(Users instance) {
		log.debug("attaching clean Users instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void delete(Users persistentInstance) {
		log.debug("deleting Users instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Transactional
	public Users merge(Users detachedInstance) {
		log.debug("merging Users instance");
		try {
			Users result = (Users) sessionFactory.getCurrentSession().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Users findById(java.lang.String id) {
		log.debug("getting Users instance with id: " + id);
		try {
			Users instance = (Users) sessionFactory.getCurrentSession().get(
					"com.uxl.sites.pyfia.model.db.Users", id);
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
