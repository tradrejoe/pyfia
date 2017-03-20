package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;

public class YFinCaseLow extends YFinCasePrices {

	public YFinCaseLow() {
		// TODO Auto-generated constructor stub
	}

	public YFinCaseLow(Date cse, Double val) {
		super(cse, val);
		// TODO Auto-generated constructor stub
	}
	
	protected int getPriceColumn() {
		return 3;
	}	

	public YFinCaseLow(String line) throws ParseException {
		super(line);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseLow(ResultSet rs) throws SQLException {
		super(rs);
		// TODO Auto-generated constructor stub
	}

}
