package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;

import org.lc.misc.DateUtils;

public class YFinCaseSD extends YFinCase {

	public YFinCaseSD() {
		// TODO Auto-generated constructor stub
	}

	public YFinCaseSD(Date cse, Double val) {
		super(cse, val);
		// TODO Auto-generated constructor stub
	}

	public YFinCaseSD(String line) throws ParseException {
		if (line!=null) {
			String[] toks = line.split(",");
			if (toks!=null && toks.length>=6) {
				setCse(DateUtils.sdfmysql.parse(toks[0]));
				setVal(Double.parseDouble(toks[5]));
			}
		}
	}

	public YFinCaseSD(ResultSet rs) throws SQLException {
		super(rs);
		// TODO Auto-generated constructor stub
	}

}
