package com.uxl.sites.pyfia;


import java.util.List;
import java.util.TreeMap;

import org.lc.model.CKey;

import com.uxl.sites.pyfia.model.DbBatch;
import com.uxl.sites.pyfia.model.fin.FinCaseList;

public interface IClsDS {

	public List<FinCaseList> getFinCaseList(String cls, Object... flags);
	
	public void save(FinCaseList list, String cls);
	
	public void exec(DbBatch dbBatch);
	
	public TreeMap<CKey, Double> getDfinCorr();
	
	public TreeMap<CKey, Double> setDfinCorr(CKey key, double corr);
}
