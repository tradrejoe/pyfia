package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;

public class YFinCaseHigh extends YFinCasePrices {

	public YFinCaseHigh() {
		// TODO Auto-generated constructor stub
	}

	public YFinCaseHigh(Date cse, Double val) {
		super(cse, val);
		// TODO Auto-generated constructor stub
	}

	protected int getPriceColumn() {
		return 2;
	}
	
	public YFinCaseHigh(String line) throws ParseException {
		super(line);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseHigh(ResultSet rs) throws SQLException {
		super(rs);
		// TODO Auto-generated constructor stub
	}

}
