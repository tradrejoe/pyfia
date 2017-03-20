package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;

import org.lc.misc.DateUtils;

public class YFinCasePrices extends YFinCase {

	public YFinCasePrices() {
		super();
	}

	public YFinCasePrices(Date cse, Double val) {
		super(cse, val);
	}

	protected int getPriceColumn() {
		return 1;
	}
	
	public YFinCasePrices(String line) throws ParseException {
		if (line!=null) {
			String[] toks = line.split(",");
			if (toks!=null && toks.length>=7) {
				setCse(DateUtils.sdfmysql.parse(toks[0]));
				setVal(Double.parseDouble(toks[getPriceColumn()]));
			}
		}
	}

	public YFinCasePrices(ResultSet rs) throws SQLException {
		super(rs);
	}

}
