package com.uxl.sites.pyfia.model;

import java.io.BufferedReader;
import java.io.InputStream;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.TreeMap;


public abstract class  GenericCaseList<C, V> extends TreeMap<C, V> {

	public static final long serialVersionUID = 0L;
	
	public GenericCaseList() {
		super();
	}
	
	
	public abstract void populateList(BufferedReader in) throws Exception;
	
	public abstract void populateList(ResultSet rs) throws Exception;
	
	public abstract GenericCase getCase(String line) throws Exception;
	
	public abstract GenericCase getCase(ResultSet rs) throws Exception;
	
	public String toString() {
		String buf = "";
		for (Object k : this.keySet()) {
			buf += k.toString() + "," + this.get(k) + "\n";
		}
		return buf;
	}
	
}
