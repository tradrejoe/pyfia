package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;

public class YFinCaseOpen extends YFinCasePrices {

	public YFinCaseOpen() {
		// TODO Auto-generated constructor stub
	}

	public YFinCaseOpen(Date cse, Double val) {
		super(cse, val);
		// TODO Auto-generated constructor stub
	}

	protected int getPriceColumn() {
		return 1;
	}
	
	public YFinCaseOpen(String line) throws ParseException {
		super(line);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseOpen(ResultSet rs) throws SQLException {
		super(rs);
		// TODO Auto-generated constructor stub
	}

}
