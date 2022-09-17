package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;

import com.uxl.sites.pyfia.model.GenericCase;

public class FinCase<Date, Double> extends GenericCase {

		public FinCase() {
			super();
		}
		
		public FinCase(Date cse, Double val) {
			super();
			setCse(cse);
			setVal(val);
		}
		public FinCase(String line) throws ParseException {}
		
		//From database record.
		public FinCase(ResultSet rs) throws SQLException {}
}
