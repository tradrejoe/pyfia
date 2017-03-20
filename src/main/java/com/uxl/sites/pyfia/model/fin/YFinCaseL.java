package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;

public class YFinCaseL extends YFinCaseSD {

	public YFinCaseL() {
		// TODO Auto-generated constructor stub
	}

	public YFinCaseL(Date cse, Double val) {
		super(cse, val);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseL(String line) throws ParseException {
		super(line);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseL(ResultSet rs) throws SQLException {
		super(rs);
		// TODO Auto-generated constructor stub
	}

}
