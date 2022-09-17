package com.uxl.sites.pyfia.jdbc;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.lc.misc.DateUtils;
import org.lc.misc.ExceptionUtil;
import org.lc.model.CKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uxl.sites.pyfia.IClsDS;
import com.uxl.sites.pyfia.model.DbBatch;
import com.uxl.sites.pyfia.model.fin.FinCaseHList;
import com.uxl.sites.pyfia.model.fin.FinCaseLList;
import com.uxl.sites.pyfia.model.fin.FinCaseList;
import com.uxl.sites.pyfia.model.fin.FinCaseOList;
import com.uxl.sites.pyfia.model.fin.FinCaseSDList;

@Service
@Repository
@Transactional
@Component
public class ClsDS implements IClsDS {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private JdbcTemplate jdbcTemplate;

//	@Autowired
//	public void init(DataSource dataSource) {
//		this.jdbcTemplate = new JdbcTemplate(dataSource);
//	}

	public List<FinCaseList> getFinCaseList(String cls, Object... flags) {
		List<FinCaseList> ret = new ArrayList<FinCaseList>();
		FinCaseList out = new FinCaseList();
		String tabname = getTableName(out, cls);
		try {
			List<Map<String, Object>> rs = jdbcTemplate.queryForList(
				"select cse, val from " + tabname + " order by cse" 
			);
			for (Map<String, Object> r : rs) {
				out.put((Date)r.get("cse"), (Double)r.get("val"));
			}
		} catch(Exception e) {
			//TODO: log4j
			e.printStackTrace();
			logger.error("error", e);
			try {
				jdbcTemplate.execute(
					"create table " + tabname + " (cse date not null, val double not null, UNIQUE(cse, val))");
			} catch(Exception e2) {
				e.printStackTrace();
				logger.error("error", e);
			}
		}
		FinCaseSDList outsd = new FinCaseSDList();
		String tabnamesd = getTableName(outsd, cls);
		try {
			List<Map<String, Object>> rs = jdbcTemplate.queryForList(
				"select cse, val from " + tabnamesd + " order by cse" 
			);
			for (Map<String, Object> r : rs) {
				outsd.put((Date)r.get("cse"), (Double)r.get("val"));
			}
		} catch(Exception e) {
			//TODO: log4j
			e.printStackTrace();
			logger.error("error", e);
			try {
				jdbcTemplate.execute(
					"create table " + tabnamesd + " (cse date not null, val double not null, UNIQUE(cse, val))");
			} catch(Exception e2) {
				e.printStackTrace();
				logger.error("error", e2);
			}
		}
		ret.add(out);
		ret.add(outsd);
		if (flags.length>0 && flags[0] instanceof Boolean && (Boolean)flags[0]) {
			for (Class clist : new Class[]{FinCaseOList.class, FinCaseHList.class, FinCaseLList.class}) {
				String tabnameo = "";
				String sql = null;
				try {
					FinCaseList outo = (FinCaseList)clist.newInstance();
					tabnameo = getTableName(outo, cls);
					sql = "select cse, val from " + tabnameo + " order by cse";
					List<Map<String, Object>> rs = jdbcTemplate.queryForList(sql);
					for (Map<String, Object> r : rs) {
						outo.put((Date)r.get("cse"), (Double)r.get("val"));
					}	
					ret.add(outo);
				} catch(InstantiationException | IllegalAccessException iae) {
					logger.error(String.format("Cannot instantiate new instance of %1$s", clist.getName()));
					iae.printStackTrace();
				} catch(Exception e) {
					logger.error(String.format("Cannot retrieve data for %2$s of %1$s, sql: %3$s, stack trace:\n%4$s",
							clist.getName(), cls, sql, ExceptionUtil.getStack(e)));
					e.printStackTrace();
					try {
						jdbcTemplate.execute(
							"create table " + tabnameo + " (cse date not null, val double not null, UNIQUE(cse, val))");
					} catch(Exception e2) {
						e.printStackTrace();
						logger.error("error", e2);
					}					
				}
			}
		}
		return ret;
	}
	
	static DecimalFormat df = new DecimalFormat("#########.##");
	
	public void save(FinCaseList list, String cls) {
		String tabname = getTableName(list, cls);
		String[] stmn = new String[list.size()];
		int idx = 0;
		for (Date cse : list.keySet()) {
			Double val = list.get(cse);
			String scse = DateUtils.getDateMysql(cse);
			String s = "insert into " + tabname + 
				"(cse, val) select '"+scse+"', "+df.format(val)+" from dual where not exists (select 1 from "+
				tabname + " where cse = '"+scse+"')";
			//logger.debug("sql.stmn=" + s);
			stmn[idx++] = s;
		}
		try {
			jdbcTemplate.batchUpdate(stmn);
		} catch(Exception e) {
			e.printStackTrace();
			logger.error("error", e);
		}
		/*Connection conn = null;
		Statement stmn = null;
		try {
			conn = jdbcTemplate.getDataSource().getConnection();
			stmn = conn.createStatement();
			for (Date cse : list.keySet()) {
				Double val = list.get(cse);
				String scse = DateUtils.getDateMysql(cse);
				String s = "insert into " + tabname + 
					"(cse, val) select '"+scse+"', "+df.format(val)+" from dual where not exists (select 1 from "+
					tabname + " where cse = '"+scse+"')";
				logger.debug("sql.stmn=" + s);
				stmn.addBatch(s);
			}
			stmn.executeBatch();
		} catch(Exception e) {
			e.printStackTrace();
			logger.error("error", e);
		} finally {
			if (stmn!=null) {
				try {
					stmn.close();
					stmn = null;
				} catch(Exception e) {}
			}
			if (conn!=null) {
				try {
					conn.close();
					conn = null;
				} catch(Exception e) {}
			}			
		}*/
	}
	
	public void exec(DbBatch dbBatch) {
		try {
			if (dbBatch==null || dbBatch.size()==0) return;
			String[] b = new String[dbBatch.size()];
			for (int i=0; i<b.length; i++) {
				String cmd = dbBatch.get(i)+"";
				logger.debug("ClsDS::exec(), adding cmd " + cmd);
				b[i] = cmd;
			}
			jdbcTemplate.batchUpdate(b);
		} catch(Exception e) {
			e.printStackTrace();
			logger.error("error", e);
		}
	}
	
	public String getTableName(FinCaseList list, String cls) {
		String tmpcls = cls.replace("^", "_").replace("-", "_");
		String postfix = "";
		if (FinCaseOList.class.isInstance(list)) postfix = "_o";
		else if (FinCaseHList.class.isInstance(list)) postfix = "_h";
		else if (FinCaseLList.class.isInstance(list)) postfix = "_l";
		else if (FinCaseSDList.class.isInstance(list)) postfix = "_sd";
		return "clsfin_" + (tmpcls+"").trim().toLowerCase() + postfix;
	}
	
	private TreeMap<CKey, Double> _dfinCorr = null;
	private static Object lockDfinCorr = new Object();
	public TreeMap<CKey, Double> getDfinCorr() {
		if (_dfinCorr!=null) {
			return _dfinCorr;
		} else {
			synchronized(lockDfinCorr) {
				_dfinCorr = new TreeMap<CKey, Double>();
				try {
					List<Map<String, Object>> rs = jdbcTemplate.queryForList(
						"select * from dfin_corr" 
					);
					for (Map<String, Object> r : rs) {
						try {
							List al = new ArrayList();
							al.add((String)r.get("symbol"));
							al.add((String)r.get("idx"));
							al.add((Integer)r.get("lag"));
							al.add((Double)r.get("years"));
							CKey ck = new CKey(al);
							_dfinCorr.put(ck, (Double)r.get("correlation"));
						} catch(Exception x) {
							x.printStackTrace();
						}
					}
				} catch(Exception e) {
					e.printStackTrace();
					logger.error("error", e);
					return _dfinCorr;
				}
				return _dfinCorr;
			}
		}
	}
	
	public TreeMap<CKey, Double> setDfinCorr(CKey key, double corr) {
		TreeMap<CKey, Double> tmp = getDfinCorr();
		synchronized(lockDfinCorr) {
			tmp.put(key, corr);
		}
		return tmp;
	}

}
