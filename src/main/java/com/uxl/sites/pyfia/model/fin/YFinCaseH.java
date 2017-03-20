package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;

public class YFinCaseH extends YFinCaseSD {

	public YFinCaseH() {
		// TODO Auto-generated constructor stub
	}

	public YFinCaseH(Date cse, Double val) {
		super(cse, val);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseH(String line) throws ParseException {
		super(line);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseH(ResultSet rs) throws SQLException {
		super(rs);
		// TODO Auto-generated constructor stub
	}

}
