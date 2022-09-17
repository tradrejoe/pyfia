package com.uxl.sites.pyfia.model.fin;

import java.io.BufferedReader;
import java.sql.ResultSet;
import java.util.Date;
import java.util.TreeSet;

import com.uxl.sites.pyfia.model.GenericCaseList;

public class FinCaseList extends GenericCaseList<Date, Double> {

	TreeSet<Double> uniqueValues = new TreeSet<Double>();
	Double min = null;
	Double max = null;
	
	public FinCaseList() {
		super();
	}
	
	public void populateList(BufferedReader in) throws Exception {
		String line;
		while ((line = in.readLine())!=null) {
			FinCase cse = getCase(line);
			put((Date)cse.getCse(), (Double)cse.getVal());
		}
	}
	
	public void populateList(ResultSet rs) throws Exception {
		while (rs.next()) {
			FinCase cse = getCase(rs);
			put((Date)cse.getCse(), (Double)cse.getVal());
		}
	}
	
	public FinCase getCase(String line) throws Exception {
		return new FinCase(line);
	}
	
	public FinCase getCase(ResultSet rs) throws Exception {
		return new FinCase(rs);
	}
	
	@Override
	public Double put(Date key, Double value) {
		if (key==null || value==null) return null;
		Double out = super.put(key, value);
		uniqueValues.add(value);
		if (min==null) {
			min = value;
		} else if (value < min) {
			min = value;
		}
		if (max==null) {
			max = value;
		} else if (value > max) {
			max = value;
		}
		
		return out;
	}
	
	public String uniqueValListString(Boolean... continuous) {
		String buf = " {";
		if (continuous!=null && continuous.length>0 && continuous[0]) {
			for (Double d=min; d<max; d+=0.001) {
				buf += d + ",";
			}
			buf += max;
		} else {
			for (Double d : uniqueValues) {
				buf += d + ",";
			}
			if (buf.endsWith(",")) 
				buf = buf.substring(0, buf.length()-1);
		}
		return buf + "}";
	}

	public TreeSet<Double> getUniqueValues() {
		return uniqueValues;
	}

	public void setUniqueValues(TreeSet<Double> uniqueValues) {
		this.uniqueValues = uniqueValues;
	}
	
}
