package com.uxl.sites.pyfia.model.db;

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
 * Home object for domain model class DfinCorr.
 * @see com.uxl.sites.pyfia.model.db.DfinCorr
 * @author Hibernate Tools
 */
@Service
@Repository
@Transactional
@Component
public class DfinCorrHome extends GenericHibernateDAO {
	protected static final Log log = LogFactory.getLog(GenericHibernateDAO.class);

	protected SessionFactory sessionFactory;
	
	@Autowired
	@Resource
	public void init(LocalSessionFactoryBean sessionFactoryBean) {
		this.sessionFactory = sessionFactoryBean.getObject();
		System.err.println("GenericHibernateDAO::init(), sessionFactory="+this.sessionFactory);
	}

	
	public void persist(DfinCorr transientInstance) {
		log.debug("persisting DfinCorr instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(DfinCorr instance) {
		log.debug("attaching dirty DfinCorr instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(DfinCorr instance) {
		log.debug("attaching clean DfinCorr instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(DfinCorr persistentInstance) {
		log.debug("deleting DfinCorr instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public DfinCorr merge(DfinCorr detachedInstance) {
		log.debug("merging DfinCorr instance");
		try {
			DfinCorr result = (DfinCorr) sessionFactory.getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public DfinCorr findById(com.uxl.sites.pyfia.model.db.DfinCorrId id) {
		log.debug("getting DfinCorr instance with id: " + id);
		try {
			DfinCorr instance = (DfinCorr) sessionFactory.getCurrentSession()
					.get("com.uxl.sites.pyfia.model.db.DfinCorr", id);
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
