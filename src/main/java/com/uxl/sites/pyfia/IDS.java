package com.uxl.sites.pyfia;

import java.util.Collection;

import org.springframework.dao.DataAccessException;

/**
 * The high-level Pyfia business interface.
 *
 */
public interface IDS {

	Collection<ClassFinancial> getClsFinIdx() throws DataAccessException;

	Collection<ClassFinancial> findClsFin(String srch) throws DataAccessException;

	ClassFinancial loadClsFin(String nm) throws DataAccessException;

}
