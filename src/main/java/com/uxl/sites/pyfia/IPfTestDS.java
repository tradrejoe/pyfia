package com.uxl.sites.pyfia;

import java.util.Date;

import com.uxl.sites.pyfia.jdbc.ClsDS;
import com.uxl.sites.pyfia.model.cache.CacheFinCls;
import com.uxl.sites.pyfia.web.AbstractPriceDownloader;

public interface IPfTestDS {
	
	public ClsDS getCFC();
	
	public AbstractPriceDownloader getPD();
	
	public Date getTestDate();
	
	public CacheFinCls getCacheFinCls();
	
}
