package com.uxl.sites.pyfia.web;

import java.util.Calendar;
import java.util.List;

import com.uxl.sites.pyfia.model.fin.FinCaseList;

public abstract class AbstractPriceDownloader {

	public AbstractPriceDownloader() {
	}
	
	public abstract List<FinCaseList> getFinCaseList(String cls, Object... flags);
	
	public abstract List<FinCaseList> getFinCaseList(String cls, Calendar d0, Calendar d1, Object... flags);
	
	public abstract double getLast(String cls);

}
