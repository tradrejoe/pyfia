package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;

public class YFinCaseO extends YFinCaseSD {

	public YFinCaseO() {
		// TODO Auto-generated constructor stub
	}

	public YFinCaseO(Date cse, Double val) {
		super(cse, val);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseO(String line) throws ParseException {
		super(line);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseO(ResultSet rs) throws SQLException {
		super(rs);
		// TODO Auto-generated constructor stub
	}

}
