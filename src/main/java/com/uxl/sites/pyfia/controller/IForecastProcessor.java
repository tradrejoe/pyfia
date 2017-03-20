package com.uxl.sites.pyfia.controller;

import java.util.TreeMap;

import org.lc.model.CKey;

import com.uxl.sites.pyfia.model.fin.FincastResponse;
import com.uxl.sites.pyfia.model.fin.IForecastRequest;



public interface IForecastProcessor {
	
	public FincastResponse execute(IForecastRequest request);

	public TreeMap<CKey, Double> getDfinCorr();
}
