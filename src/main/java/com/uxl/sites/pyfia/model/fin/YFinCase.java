package com.uxl.sites.pyfia.model.fin;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.StringTokenizer;

import org.lc.misc.DateUtils;


public class YFinCase extends FinCase<Date, Double> {

	public YFinCase() {
		super();
	}
	
	public YFinCase(Date cse, Double val) {
		super(cse, val);		
	}
	
	//Construct for yahoo finance line
	public YFinCase(String line) throws ParseException {
		if (line!=null) {
			String[] toks = line.split(",");
			if (toks!=null && toks.length>=7) {
				setCse(DateUtils.sdfmysql.parse(toks[0]));
				setVal(Double.parseDouble(toks[6]));
			}
		}
	}
	
	//From database record.
	public YFinCase(ResultSet rs) throws SQLException {
		super(rs);
	}
	
}
