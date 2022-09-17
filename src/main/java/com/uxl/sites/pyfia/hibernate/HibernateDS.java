package com.uxl.sites.pyfia.hibernate;

import java.util.Collection;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.uxl.sites.pyfia.ClassFinancial;
import com.uxl.sites.pyfia.IDS;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.service.internal.SessionFactoryServiceRegistryImpl;

/**
 * Hibernate implementation of the IDS interface.
 *
 * <p>The mappings are defined in "pyfia.hbm.xml", located in the root of the
 * class path.
 *
 * <p>Note that transactions are declared with annotations and that some methods
 * contain "readOnly = true" which is an optimization that is particularly
 * valuable when using Hibernate (to suppress unnecessary flush attempts for
 * read-only operations).
 *
 * @author Michael Zheng
 * @since 3.9.2012
 */
@Repository
@Transactional
public class HibernateDS implements IDS {

	private SessionFactory sessionFactory;
	
	public HibernateDS() {
	
	}
	
	@Autowired
	public HibernateDS(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public Collection<ClassFinancial> getClsFinIdx() {
		return sessionFactory.getCurrentSession().createQuery("from cls_Fin where attr0 = 1 order by disp").list();
	}

	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")	
	public Collection<ClassFinancial> findClsFin(String srch) {
		String lsrch = (srch+"").toLowerCase();
		return sessionFactory.getCurrentSession()
			.createQuery("from cls_Fin where lower(nm) like '%"+lsrch+"%' or lower(disp) like '%"+lsrch+"%' order by disp").list();
	}
	
	@Transactional(readOnly = true)
	public ClassFinancial loadClsFin(String nm) {
		return (ClassFinancial) sessionFactory.getCurrentSession().load(ClassFinancial.class, nm);
	}

}
