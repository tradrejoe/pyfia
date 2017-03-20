package com.uxl.sites.pyfia;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Comparator;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.TreeMap;
import java.util.UUID;
import java.util.Date;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;
import org.apache.log4j.Logger;
import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

import com.uxl.sites.pyfia.controller.FincastProcessor;
import com.uxl.sites.pyfia.model.DbBatch;
import com.uxl.sites.pyfia.model.DbCmd;
import com.uxl.sites.pyfia.model.adapter.UsersAdapter;
import com.uxl.sites.pyfia.model.cache.CacheFinCls;
import com.uxl.sites.pyfia.model.db.Users;
import com.uxl.sites.pyfia.model.db.UsersAttr;
import com.uxl.sites.pyfia.model.db.UsersAttrHome;
import com.uxl.sites.pyfia.model.db.UsersAttrId;
import com.uxl.sites.pyfia.model.db.UsersHome;
import com.uxl.sites.pyfia.model.fin.FinCaseList;
import com.uxl.sites.pyfia.model.fin.FincastResponse;
import com.uxl.sites.pyfia.model.fin.ForecastRequest;
import com.uxl.sites.pyfia.model.fin.Symbols;
import com.uxl.sites.pyfia.model.fin.TradeStat;
import com.uxl.sites.pyfia.jdbc.ClsDS;
import com.uxl.sites.pyfia.web.AbstractPriceDownloader;
import com.uxl.sites.pyfia.web.YPriceDownloader;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.uxl.sites.pyfia.JUnit4ClassRunner;
import com.uxl.sites.users.exceptions.IException;
import com.uxl.sites.users.exceptions.UserException;

import org.junit.runner.RunWith;
import org.lc.comm.mail.EmailSender;
import org.lc.crypto.SHA512;
import org.lc.frameworks.spring.ApplicationContextLoader;
import org.lc.misc.DateUtils;
import org.lc.misc.JsonUtil;
import org.lc.misc.Lib;
import org.lc.misc.StringUtil;
import org.lc.model.CKey;

import javax.annotation.Resource;

/**
 * @author uxlcorp
 *
 */
@RunWith(JUnit4ClassRunner.class)
//@ContextConfiguration
//@ContextConfiguration(locations={"classpath:*/PyfiaTest-config.xml"})
@ContextConfiguration(locations={"classpath:/PyfiaTest-context.xml"})
/*@ContextConfiguration(locations={
	"classpath:/applicationContext-hibernate.xml",
	"classpath:/applicationContext-jdbc.xml",
	"classpath:/PyfiaTest-config.xml",
	"classpath:/applicationContext-dataSource.xml"
	})*/
public class PyfiaTest extends AbstractJUnit4SpringContextTests implements IPfTestDS
{
	static boolean binit = false;
	static Logger logger = Logger.getLogger(PyfiaTest.class);
	public static String NL = System.getProperty("line.separator");

	ApplicationContext ctx = null;
	public void setApplicationCtx(ApplicationContext ctx) {
		this.ctx = ctx;
	}
	public ApplicationContext getApplicationCtx() {
		return ctx;
	}

	public ClsDS getCFC() {
		return this.clsDs;
	}

	public AbstractPriceDownloader getPD() {
		return this.pd;
	}

	public void init() {
		if (!binit) {
			System.out.println("init...");
			ApplicationContext ctx = this.getApplicationCtx();
			if (processor==null) {
				logger.debug("PyfiaTest::init(), loading processor");
				processor = ctx.getBean(FincastProcessor.class);
			}
			if (clsDs==null) {
				logger.debug("PyfiaTest::init(), loading clsDs");
				clsDs = ctx.getBean(ClsDS.class);
			}
			if (usersHome==null) {
				logger.debug("PyfiaTest::init(), loading usersHome");
				usersHome = ctx.getBean(UsersHome.class);
			}
			if (usersAttrHome==null) {
				logger.debug("PyfiaTest::init(), loading usersAttrHome");
				usersAttrHome = ctx.getBean(UsersAttrHome.class);
			}
			if (pd==null) {
				logger.debug("PyfiaTest::init(), loading pd");
				pd = ctx.getBean(YPriceDownloader.class);
			}
			if (usersAdapter==null) {
				logger.debug("PyfiaTest::init(), loading pd");
				usersAdapter = ctx.getBean(UsersAdapter.class);
			}
			binit = true;
		 }
	}

	@Autowired
	//@Resource
	ClsDS clsDs;

	@Autowired
	@Resource
	FincastProcessor processor;

	//@Autowired
	//@Resource
	UsersHome usersHome;

	//@Autowired
	//@Resource
	UsersAttrHome usersAttrHome;

	//@Autowired
	//@Resource
	YPriceDownloader pd;

	//@Autowired
	//@Resource
	UsersAdapter usersAdapter;

	static String[] symbols = Symbols.WEEKLIES_SELECTED;
	
	public PyfiaTest() {
	}

	/*@Test
	public void testForecast() {
		for (int s=0; s<symbols.length; s++) {
			String symbol = symbols[s];
			ForecastRequest request = new ForecastRequest();
			//request.setAttributes("^GSPC,OIL,GLD,^NDX,^IRX,^TNX,^VIX,FXE,EFA,"+symbol);
			request.setAttributes("^GSPC,OIL,GLD,"+symbol);
			//request.setCase(DateUtils.getDateNotime());
			try {
				request.setCase(DateUtils.sdf.parse("10/12/2012"));
			} catch(Exception e) {
				request.setCase(DateUtils.getDateNotime());
			}
			request.setClazz(symbol);
			request.setForecastRange(5);
			String requestId = UUID.randomUUID().toString();
			logger.debug("UUID based request id generated: " + requestId);
			request.setRequestId(requestId);
			if (processor==null) processor = new FincastProcessor();
			processor.setClsDs(clsDs);
			processor.setPd(pd);
			processor.execute(request);
			CacheFincastResponse cacheFincastResponse = CacheFincastResponse.getInstance();
			FincastResponse response = cacheFincastResponse.get(requestId);
			while (!response.getStatus().equals(FincastResponse.STATUS_DONE) &&
					!response.getStatus().startsWith("Error:")) {
				try {
					Thread.sleep(1000);
				} catch(InterruptedException e) {
					e.printStackTrace();
				}
				response = cacheFincastResponse.get(requestId);
			}
			System.out.println("Forecasting done:");
			System.out.println(response);
			logger.debug("Forecasting done:");
			logger.debug(response);

		}
	}*/

	public static final String MAVEN_TEST_CORRELATION = "maven.test.correlation";
	public static final String MAVEN_TEST_PREDICTION = "maven.test.prediction";
	public static final String MAVEN_TEST_MA = "maven.test.ma";
	public static final String MAVEN_TEST_MA_TRADE = "maven.test.ma.trade";
	public static final String MAVEN_TEST_USERS = "maven.test.users";
	public static final String MAVEN_TEST_FILES = "maven.test.genfile";
	public static final String MAVEN_TEST_DATE = "maven.test.date";
	public static final String MAVEN_TEST_SEND_PREDICTION = "maven.test.send.prediction";
	public static final String MAVEN_TEST_SEND_MA = "maven.test.send.ma";
	public static final String MAVEN_TEST_SEND_PREDICTION_MA = "maven.test.send.prediction.ma";
	public static final String MAVEN_TEST_PREDICTION_MA = "maven.test.prediction.ma";
	public static final int TEST_CORRELATION_SLEEP = 500;
	public static final double TEST_PREDICTION_CORR_THRESHOLD = 0.3;

//	public int[] forecast_ranges = new int[] {1,2,3,4,5,6,7,8,9,10,15,20};
	public int[] forecast_ranges = new int[] {1,2,3,4};
	public int[] history = new int[] {2};

	//public String[] indices = new String[]{"^GSPC"};

	private static List<Users> testUsersList = null;
	static {
		testUsersList = new ArrayList<Users>();
		testUsersList.add(new Users("tradrejoe@gmail.com", "abc123"));
		testUsersList.add(new Users("mgzheng@yahoo.com", "123123"));
		testUsersList.add(new Users("tradrejoe@gmail.com", ""));
		testUsersList.add(new Users("", "123123"));
		testUsersList.add(new Users("", ""));
		testUsersList.add(new Users("tradrejoe@gmail.com", "abc123"));
	}

	@Test
	public void testUsers() {
		if (System.getProperty(MAVEN_TEST_USERS)==null ||
			!(System.getProperty(MAVEN_TEST_USERS)+"").equalsIgnoreCase("true"))
			return;
		//init();
		for (Users user : testUsersList) {
			testSingleUser(user.getLogin(), user.getPassword());
		}

	}

	protected void testSingleUser(String userId, String pwd) {
		if (System.getProperty(MAVEN_TEST_USERS)==null ||
				!(System.getProperty(MAVEN_TEST_USERS)+"").equalsIgnoreCase("true"))
				return;
		String pwdenc = pwd;
		try {
			pwdenc = SHA512.digest(pwd);
		} catch(Exception e) {
			pwdenc = pwd;
		}
		logger.debug(String.format("Testing user id %1$s, password %2$s, encrypted password %3$s.", userId,
				pwd, pwdenc));
		boolean isLoginned = false;
		boolean isRegistered = false;
		try {
			usersAdapter.isLoginned();
			isLoginned = true;
		} catch(Exception e) {
			e.printStackTrace();
		}
		if (!isLoginned) {
			try {
				usersAdapter.login(userId, pwdenc);
				isRegistered = true;
				isLoginned = true;
			} catch(UserException ue) {
				ue.printStackTrace();
				IException.ExceptionType et = IException.ExceptionType.lookup(ue.getType());
				switch(et) {
					case INVALID_USERID:
					case INVALID_PASSWORD:
					default:
						logger.error(String.format("%1$s for user %2$s, password %3$s",et.getMsg(), userId, pwdenc));
				}
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
		if (!isRegistered) {
			try {
				usersAdapter.register(userId, pwdenc);
				isLoginned = true;
				isRegistered = true;
			} catch(UserException ue) {
				ue.printStackTrace();
				IException.ExceptionType et = IException.ExceptionType.lookup(ue.getType());
				switch(et) {
					case INVALID_USERID:
					case INVALID_PASSWORD:
					case BLANK_PASSWORD:
					case USER_EXISTS:
					case CANNOT_ENCRYPT_PASSWORD:
					case CANNOT_REGISTER:
					default:
						logger.error(String.format("%1$s for user %2$s, password %3$s",et.getMsg(), userId, pwdenc));
				}
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
//		Users tmp = usersHome.findById(userId);
//		if (tmp==null) {
//			usersHome.persist(user);
//		}
//		UsersAttrId attr = new UsersAttrId();
//		attr.setLogin(userId);
//		attr.setName("registration");
//		attr.setVal("12/31/2013");
//		if (usersAttrHome.findById(attr)==null) {
//			UsersAttr ua = new UsersAttr(attr, user);
//			usersAttrHome.persist(ua);
//		}
//		System.out.println("user=" + JsonUtil.serialize(user));
	}

	@Test
	public void testCorrelations() {
		if (System.getProperty(MAVEN_TEST_CORRELATION)==null ||
			!System.getProperty(MAVEN_TEST_CORRELATION).equalsIgnoreCase("true"))
			return;
		//init();
		logger.info(String.format("Testing correlation on %1$d symbols...", symbols.length));
		Calendar cal = GregorianCalendar.getInstance();
		cal.add(Calendar.DAY_OF_MONTH, -5);
//		Date dt = DateUtils.getDateNotime();
		Date dt = cal.getTime();
		CacheFinCls cacheFinCls = CacheFinCls.getInstance(this.clsDs, this.pd);
		PearsonsCorrelation ocorr = new PearsonsCorrelation();
		TreeMap<CKey, Double> dfinCorr = clsDs.getDfinCorr();
		for (int s=0; s<symbols.length; s++) {
			String cls = symbols[s];
			for (int r=0; r<forecast_ranges.length; r++) {
				int rng = forecast_ranges[r];
				for (int h=0; h<history.length; h++) {
					Double hist = new Double(history[h]);
					int histdays = history[h] * 252;
					FinCaseList tmpfrl = null;
					try {
						tmpfrl = cacheFinCls.getFutureReturns(cls, rng, dt, histdays);
					} catch(Exception e) {
						e.printStackTrace();
					}
					DbBatch dbBatch = new DbBatch();
					for (int i=0; i<indices.length; i++) {
						String index = indices[i];
						if (index.equalsIgnoreCase(cls)) continue;
						CKey ck = new CKey(cls, index, rng, hist);
						Double tmpc = null;
						try {
							tmpc = dfinCorr.get(ck);
						} catch(Exception e) {}
						if (tmpc!=null) {
							logger.debug("PyfiaTest::testCorrelations(), " + ck + " exists in db, continue...");
							continue;
						}
						List<FinCaseList> tmpfcl = null;
						try {
							tmpfcl = cacheFinCls.getPassReturns(index, rng, dt, histdays, false);
						} catch(Exception e2) {
							e2.printStackTrace();
						}
						if (tmpfrl!=null && tmpfrl.size()>0 && tmpfcl!=null && tmpfcl.get(0)!=null && tmpfcl.get(0).size()>0) {
							FinCaseList tmpfcl0 = tmpfcl.get(0);
							//logger.debug("tmpfrl=\n"+tmpfrl);
							//logger.debug("tmpfcl0=\n"+tmpfcl0);
							List<Double> af = new ArrayList<Double>();
							List<Double> ap = new ArrayList<Double>();
							for (Date key : tmpfrl.keySet()) {
								Double f = tmpfrl.get(key);
								Double p = tmpfcl0.get(key);
								if (f!=null && p!=null) {
									af.add(f);
									ap.add(p);
									//logger.debug(key + "," + f + "," + p);
								}
							}
							Double[] adf = af.toArray(new Double[]{});
							Double[] adp = ap.toArray(new Double[]{});
							double corr = 0.0;
							try {
									corr = ocorr.correlation(ArrayUtils.toPrimitive(adf), ArrayUtils.toPrimitive(adp));
									logger.info(String.format("correlation\t%1$s\t%2$s\t%3$d\t%4$f\t%5$f", cls, index, rng, hist, corr));
									DbCmd cmd = new DbCmd(FincastProcessor.CMD_DFIN_CORR, cls, index, rng, hist, corr);
									dbBatch.add(cmd);
							} catch(Exception e3) {
								e3.printStackTrace();
							}
							adf = null;
							adp = null;
						}
					}//for indices
					try {
						clsDs.exec(dbBatch);
					} catch(Exception e) {
						e.printStackTrace();
					}
					try {
						Thread.sleep(TEST_CORRELATION_SLEEP);
					} catch(InterruptedException e)  {}
					hist = null;
					dbBatch = null;
					tmpfrl = null;
				} //history
			} //range
			cls = null;
		} //symbol, done
		logger.info("done calculating correlation");
	}

	protected static final double DEFAULT_BTH = 0.5;
	protected static final double DEFAULT_STH = 0.5;

	@Test
	public Map<String, MARec> testMA() {
		if (System.getProperty(MAVEN_TEST_MA)==null ||
				!(System.getProperty(MAVEN_TEST_MA)+"").equalsIgnoreCase("true"))
				return null;
		Calendar now = GregorianCalendar.getInstance();
		logger.info("PyfiaTest::testMA(), start " + now.getTime());
		//init();
		Map<String, MARec> out = new TreeMap<String, MARec>(); 
		TreeMap<Double, MARec> tmpmap = new TreeMap<Double, MARec>(new Comparator() {
			public int compare(Object o1, Object o2) {
				return (o1==null || o2==null || !(o1 instanceof Double) || !(o2 instanceof Double)) ? 0 :
					-1 * (((Double)o1).compareTo((Double)o2));
			}
			public boolean equals(Object o) {
				return o!=null && (o instanceof Double) && this.compare(this, o) == 0;
			}
		});		
		try {
			for (int s=0; s<symbols.length; s++) {
				MARec rec = new MARec(symbols[s],
						DEFAULT_BTH,
						DEFAULT_STH,
						this);
				if (rec.getTrans()!=TradeStat.TRANS.NOOP) {
					tmpmap.put(rec.getRetMAAbs(), rec);
				}
			}
			String tmpdir = System.getProperty("java.io.tmpdir");
			String fs = System.getProperty("file.separator");
			if (!tmpdir.endsWith(fs)) tmpdir += fs;
			String tradelog = "ma_" +
					lsdf.format(GregorianCalendar.getInstance().getTime())+".csv";
			OutputStream os = new FileOutputStream(new File(tmpdir + tradelog));
			os.write((MARec.getHeader()+NL).getBytes());
			for (MARec rec : tmpmap.values()) {
				os.write((rec + NL).getBytes());
			}
			os.flush();
			os.close();
			if (System.getProperty(MAVEN_TEST_SEND_MA)!=null && 
					System.getProperty(MAVEN_TEST_SEND_MA).equalsIgnoreCase("true")) {
				Map<String, InputStream> am = new HashMap<String, InputStream>();
				am.put(tradelog, new FileInputStream(new File(tmpdir + tradelog)));
				new EmailSender().sendEmail("tradrejoe@gmail.com", tradelog, tradelog,
						new String[]{"tradrejoe@gmail.com", "mgzheng@yahoo.com"}, am);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		Calendar end = GregorianCalendar.getInstance();
		logger.info("PyfiaTest::testMA(), start " + end.getTime() + ", " +
		(end.getTime().getTime()-now.getTime().getTime()) + " milli-seconds.");
		for (Iterator i=tmpmap.values().iterator(); i.hasNext();) {
			MARec tmprec = (MARec)i.next();
			out.put(tmprec.getCls(), tmprec);
		}
		return out;
	}

	@Test
	public void testMATrade() {
		if (System.getProperty(MAVEN_TEST_MA_TRADE)==null ||
				!(System.getProperty(MAVEN_TEST_MA_TRADE)+"").equalsIgnoreCase("true"))
				return;
		Calendar now = GregorianCalendar.getInstance();
		logger.info("PyfiaTest::testMATrade(), start " + now.getTime());
		//init();
		try {
			List<MARec> recs = new ArrayList<MARec>();
			for (int s=0; s<symbols.length; s++) {
				MARec rec = new MARec(symbols[s],
						DEFAULT_BTH,
						DEFAULT_STH,
						this);
				rec.trade();
				recs.add(rec);
			}
			String tmpdir = System.getProperty("java.io.tmpdir");
			String fs = System.getProperty("file.separator");
			if (!tmpdir.endsWith(fs)) tmpdir += fs;
			String tradelog = "matrade_" +
					(new SimpleDateFormat("yyyyMMddHHmmss")).format(GregorianCalendar.getInstance().getTime())+".csv";
			OutputStream os = new FileOutputStream(new File(tmpdir + tradelog));
			os.write((MARec.getHeader()+NL).getBytes());
			for (Iterator i=recs.iterator(); i.hasNext();) {
				os.write((i.next() + NL).getBytes());
			}
			os.flush();
			os.close();
			Map<String, InputStream> am = new HashMap<String, InputStream>();
			am.put(tradelog, new FileInputStream(new File(tmpdir + tradelog)));
			new EmailSender().sendEmail("tradrejoe@gmail.com", tradelog, tradelog,
					new String[]{"tradrejoe@gmail.com", "mgzheng@yahoo.com"}, am);
		} catch(Exception e) {
			e.printStackTrace();
		}
		Calendar end = GregorianCalendar.getInstance();
		logger.info("PyfiaTest::testMA(), start " + end.getTime() + ", " +
		(end.getTime().getTime()-now.getTime().getTime()) + " milli-seconds.");
	}
	public static class MARec implements Serializable {

		public static final long serialVersionUID = 0L;
		public static final Double DEFAULT_TH_INC = 0.25;

		String cls;
		Double avg;
		Double stdev;
		Double last;
		Double lastMA;
		Double bth = DEFAULT_BTH;
		Double sth = DEFAULT_STH;
		TreeMap<Date, Double> ma = null;
		TreeMap<Date, Double> mad = null;
		TradeStat btradeStat = null;
		TradeStat stradeStat = null;
		FinCaseList lst = null;

		public String getCls() {
			return cls;
		}

		public void setCls(String cls) {
			this.cls = cls;
		}

		public FinCaseList getLst() {
			return lst;
		}

		public void setLst(FinCaseList lst) {
			this.lst = lst;
		}

		public TreeMap<Date, Double> getMa() {
			return ma;
		}

		public void setMa(TreeMap<Date, Double> ma) {
			this.ma = ma;
		}

		public TreeMap<Date, Double> getMad() {
			return mad;
		}

		public void setMad(TreeMap<Date, Double> mad) {
			this.mad = mad;
		}

		public TradeStat getBtradeStat() {
			return btradeStat;
		}

		public void setBtradeStat(TradeStat btradeStat) {
			this.btradeStat = btradeStat;
		}

		public TradeStat getStradeStat() {
			return stradeStat;
		}

		public void setStradeStat(TradeStat stradeStat) {
			this.stradeStat = stradeStat;
		}

		public Double getLastMA() {
			return lastMA;
		}

		public void setLastMA(Double lastMA) {
			this.lastMA = lastMA;
		}
		IPfTestDS ds;

		public static final String DEFAULT_SEP = ",";

		static String sep = DEFAULT_SEP;

		public String toString() {
			return cls + sep + avg + sep + stdev + sep + last + sep + lastMA + sep + getRetMA() + sep + getRetMAAbs() + sep +
					getBuyThreshold() +	sep + getSellThreshold() + sep + getTrans();
		}

		public static String getHeader() {
			return "symbol" + sep + "avg" + sep + "stdev" + sep + "last" + sep + "lastMA" + sep + "retMA" + sep + "retMAAbs" + sep +
					"bth" + sep + "sth" + sep + "trans";
		}

		public static class MARecException extends RuntimeException {

			public static final String DEFAULT_MSG = "No arg constructor not supported for MARec.";
			public MARecException(String msg) {
				super(msg);
			}

			public MARecException() {
				super(DEFAULT_MSG);
			}
		}


		protected Double getBuyThreshold() {
			return avg - bth * stdev;
		}

		protected Double getSellThreshold() {
			return avg + sth * stdev;
		}

		public Double getRetMA() {
			return (last/lastMA)-1.0;
		}

		public Double getRetMAAbs() {
			return Math.abs(getRetMA());
		}
		public TradeStat.TRANS getTrans() {
			double tmpret = getRetMA();
			if (tmpret <= getBuyThreshold()) return TradeStat.TRANS.BUY;
			if (tmpret >= getSellThreshold()) return TradeStat.TRANS.SELL;
			return TradeStat.TRANS.NOOP;
		}

		public MARec() {
			throw new MARecException();
		}

		public MARec(String cls,
			Double bth,
			Double sth,
			IPfTestDS ds) {

			this.cls = cls;
			this.ds = ds;
			CacheFinCls cfc = CacheFinCls.getInstance(ds.getCFC(), ds.getPD());
			lst = cfc.fetch(cls).get(0);
			Date[] acse = lst.keySet().toArray(new Date[]{});
			Double[] aval = lst.values().toArray(new Double[]{});
			Date testDate = ds.getTestDate();
			for (int d=acse.length-1;d>=0;d--) {
				if (acse[d].after(testDate)) {
					lst.remove(acse[d]);
				} else {
					break;
				}
			}
			acse = lst.keySet().toArray(new Date[]{});
			aval = lst.values().toArray(new Double[]{});
			if (acse[acse.length-1].before(testDate)) {
				last = ds.getPD().getLast(cls);
				Date[] acse2 = new Date[acse.length+1];
				System.arraycopy(acse, 0, acse2, 0, acse.length);
				acse2[acse2.length-1] = testDate;
				Double[] aval2 = new Double[aval.length+1];
				System.arraycopy(aval, 0, aval2, 0, aval.length);
				aval2[aval2.length-1] = last;
				aval = aval2;
				acse = acse2;
			}
			last = aval[aval.length-1];
			lastMA = (aval[aval.length-2]+aval[aval.length-3]) / 2.0;
			ma = new TreeMap<Date, Double>();
			mad = new TreeMap<Date, Double>();
			for (int d=acse.length-1; d>=0; d--) {
				Date cse = acse[d];
				if (cse.after(testDate)) continue;
				Double val = aval[d];
				if (d-2>=0) {
					Double tma = (aval[d-1]+aval[d-2])/2.0;
					ma.put(cse, tma);
					mad.put(cse, val/tma - 1.0);
				}
			}
			Double[] amad = mad.values().toArray(new Double[]{});
			DescriptiveStatistics stats = new DescriptiveStatistics();
			for( int i = 0; i < amad.length; i++) {
			        stats.addValue(amad[i]);
			}
			avg = stats.getMean();
			stdev = stats.getStandardDeviation();
			this.bth = TradeStat.getTh(cls, TradeStat.TRANS.BUY, TradeStat.STRATEGY.MA);
			if (this.bth==null) {
				this.bth = bth;
			} else {
				this.bth = (avg - this.bth) / stdev;
			}
			this.sth = TradeStat.getTh(cls, TradeStat.TRANS.SELL, TradeStat.STRATEGY.MA);
			if (this.sth==null) {
				this.sth = sth;
			} else {
				this.sth = (this.sth - avg) / stdev;
			}
		}


		public void trade() {
			//buy
			Double th = 0.0, pth = 0.0, p = 0.0, pp = 0.0, n = 0.0, pn = 0.0;
			Date[] acse = lst.keySet().toArray(new Date[]{});
			Double[] aval = lst.values().toArray(new Double[]{});
			for (int t=1; t<=12; t++) {
				p = n = 0.0;
				th = avg - t * DEFAULT_TH_INC * stdev;
				for (int c=acse.length-1; c>=0; c--) {
					Date d = acse[c];
					Double v = aval[c];
					Double tma = ma.get(d);
					if (c-2>=0) {
						Date d2 = acse[c-2];
						Double v2 = aval[c-2];
						Double tmad2 = mad.get(d2);
						if (tmad2!=null&&tmad2<=th) {
							p += (v - tma);
							n++;
						}
					}
				}
				if (p>pp) {
					pp = p;
					pn = n;
					pth = t * DEFAULT_TH_INC;
				}
			}
			btradeStat = new TradeStat(pp, pn, avg - pth * stdev, TradeStat.TRANS.BUY, cls);
			//logger.info(btradeStat);
			bth = (pp>0.0) ? pth : 3.0;
			//sell
			th = pth = p = pp = n = pn = 0.0;
			for (int t=1; t<=12; t++) {
				p = n = 0.0;
				th = avg + t * DEFAULT_TH_INC * stdev;
				for (int c=acse.length-1; c>=0; c--) {
					Date d = acse[c];
					Double v = aval[c];
					Double tma = ma.get(d);
					if (c-2>=0) {
						Date d2 = acse[c-2];
						Double v2 = aval[c-2];
						Double tmad2 = mad.get(d2);
						if (tmad2!=null&&tmad2>=th) {
							p += (tma - v);
							n++;
						}
					}
				}
				if (p>pp) {
					pp = p;
					pn = n;
					pth = t * DEFAULT_TH_INC;
				}
			}
			stradeStat = new TradeStat(pp, pn, avg + pth * stdev, TradeStat.TRANS.SELL, cls);
			//logger.info(stradeStat);
			sth = (pp>0.0) ? pth : 3.0;
		}

		public IPfTestDS getDs() {
			return ds;
		}

		public void setDs(IPfTestDS ds) {
			this.ds = ds;
		}

		public static String getSep() {
			return sep;
		}

		public static void setSep(String sep) {
			MARec.sep = sep;
		}

		public Double getAvg() {
			return avg;
		}
		public void setAvg(Double avg) {
			this.avg = avg;
		}
		public Double getStdev() {
			return stdev;
		}
		public void setStdev(Double stdev) {
			this.stdev = stdev;
		}
		public Double getBth() {
			return bth;
		}
		public void setBth(Double bth) {
			this.bth = bth;
		}
		public Double getSth() {
			return sth;
		}
		public void setSth(Double sth) {
			this.sth = sth;
		}
		public Double getLast() {
			return last;
		}
		public void setLast(Double last) {
			this.last = last;
		}
	}

	public static final String[] DEFAULT_PREDICTORS = new String[]{"^GSPC", "^NDX", "^TNX", "^NY", "GLD", "OIL", "FXE"};
	public static final int DEFUALT_PCOUNT = 8;
	public static final String MAVEN_TEST_CSVFILE = "MAVEN_TEST_CSVFILE";
	private static String DEFAULT_LOG_PREFIX  = "trading.log";
	static SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
	static SimpleDateFormat tsdf = new SimpleDateFormat("yyyyMMdd");
	static SimpleDateFormat lsdf = new SimpleDateFormat("yyyyMMddHHmmss");

	public Date getTestDate() {
		if (System.getProperty(MAVEN_TEST_DATE)!=null) {
			try {
				return sdf.parse(System.getProperty(MAVEN_TEST_DATE)+"");
			} catch(Exception e) { }
		}
		return DateUtils.getDateNotime();
	}
	@Test
	public TreeMap<String, ArrayList<FincastResponse.CCsvRec>> testForecastSingleThreaded() throws Exception {
		if (System.getProperty(MAVEN_TEST_PREDICTION)==null ||
				!(System.getProperty(MAVEN_TEST_PREDICTION)+"").equalsIgnoreCase("true"))
				return null;
		//init();
		Date today = getTestDate();
		ArrayList lr = new ArrayList();
//		int rsz = 5;
//		int[] rngs = new int[rsz];
//		for (int r =0; r<rsz; r++) {
//			rngs[r]=r+1;
//		}
		TreeMap<CKey, Double> dfincorr = clsDs.getDfinCorr();
		boolean sd = false;
		//TODO: new output file.
		String tradeLog = DEFAULT_LOG_PREFIX + "." + tsdf.format(today)+".csv";
		FileOutputStream mos = new FileOutputStream(new File(tradeLog));
		TreeMap<String, ArrayList<FincastResponse.CCsvRec>> mlist = new TreeMap<String, ArrayList<FincastResponse.CCsvRec>>();
		for (int r=0; r<forecast_ranges.length; r++) {
			int rng = forecast_ranges[r];
//			String csvfile = DEFAULT_TEST_CSVDIR + sep + tsdf.format(today)+"_" + rng + ".csv";
//			FileOutputStream os = new FileOutputStream(new File(csvfile));
			for (int s=0; s<symbols.length; s++) {
				try {
					String symbol = symbols[s];
					logger.info("processing " + symbol);
					ForecastRequest request = new ForecastRequest();
					//request.setAttributes("^GSPC,OIL,GLD,^NDX,^IRX,^TNX,^VIX,FXE,EFA,"+symbol);
					//request.setAttributes("^GSPC,OIL,GLD,"+symbol);
					//request.setCase(DateUtils.sdf.parse("12/12/2013"));
					request.setCase(today);
					request.setClazz(symbol);

					/*Date today = DateUtils.getDateNotime();
					Calendar cal = GregorianCalendar.getInstance();
					cal.setTime(today);
					cal.add(Calendar.DATE, 7);
					Date odt = cal.getTime();
					Integer rng = DateUtils.getDiffTradingDays(today, odt);
					logger.debug("DateUtils.getDiffTradingDays('" + sdf.format(today) + "','" + sdf.format(odt) + "')=" + rng);
					if (rng<=0) {
						rng = DateUtils.getDiffDays(today, odt);
						logger.debug("DateUtils.getDiffDays('" + sdf.format(today) + "','" + sdf.format(odt) + "')=" + rng);
					}
					request.setForecastRange(rng);*/
					int hist = sd ? 4 : 2;
					request.setForecastRange(rng);
					int ncases = 252 * hist;
					//long max_predictors = Math.round(ncases / (sd ? 40 : 20))-( sd ? 2 : 1);
					long max_predictors = (long)(Math.round(Math.log10(ncases)/Math.log10(5.0))-1);
					request.setHistory(ncases);
					TreeMap<Double, CKey> tmpattr = new TreeMap<Double, CKey>(new Comparator() {
						public int compare(Object o1, Object o2) {
							return (o1==null || o2==null || !(o1 instanceof Double) || !(o2 instanceof Double)) ? 0 :
								-1 * (((Double)o1).compareTo((Double)o2));
						}
						public boolean equals(Object o) {
							return o!=null && (o instanceof Double) && this.compare(this, o) == 0;
						}
					});
					for (int i = 0; i<indices.length; i++) {
						CKey ck = new CKey(symbol, indices[i], rng, new Double(hist));
						Double corr = dfincorr.get(ck);
						if (corr==null) continue;
						double abscorr = Math.abs(corr);
						tmpattr.put(abscorr, ck);
					}
					ArrayList<String> predictors = new ArrayList<String>();
					CacheFinCls cacheFinCls = CacheFinCls.getInstance(clsDs, pd);
					for (Double d : tmpattr.keySet()) {
						if (d<.1) continue;
						List kl = tmpattr.get(d).getKeys();
						if (kl!=null && kl.size()>=2) {
							String tmppredictor = kl.get(1) +"";

							predictors.add(tmppredictor);
							if (predictors.size()>= max_predictors) break;
						}
					}
					if (predictors.size()<max_predictors) {
						for (int i=0; i<DEFAULT_PREDICTORS.length&&predictors.size()<= max_predictors; i++) {
							if (!predictors.contains(DEFAULT_PREDICTORS[i])) predictors.add(DEFAULT_PREDICTORS[i]);
						}
					}
					String bufattr = "";
					for (int i=0; i<predictors.size();i++) {
						bufattr += predictors.get(i)+",";
					}
					bufattr += symbol;
					logger.debug(String.format("PyfiaTest::testForecastSingleThreaded(), symbol=%1$s;predictors=%2$s",symbol, bufattr));
					request.setAttributes(bufattr);
					request.setSd(sd);
					String requestId = UUID.randomUUID().toString();
					logger.debug("UUID based request id generated: " + requestId);
					request.setRequestId(requestId);
					if (processor==null) processor = new FincastProcessor();
					processor.setClsDs(clsDs);
					processor.setPd(pd);
					FincastResponse response = processor.executeSingleThreadedRF(request);
					logger.debug("Forecasting done:");
					logger.debug(JsonUtil.serialize(response));
					FincastResponse.CCsvRec csvrec = response.getCsvRec();
					ArrayList csvrecs = mlist.get(symbol);
					if (csvrecs==null) {
						csvrecs = new ArrayList<FincastResponse.CCsvRec>();
						mlist.put(symbol, csvrecs);
					}
					csvrecs.add(csvrec);
//					byte[] b = csvrec.toCsvRec().getBytes();
//					logger.debug("writing csv rec for sybmol=" + symbol + ";range=" + rngs[r] + ";data="+ b);
//					os.write(b);
				} catch(Exception e) {
					ByteArrayOutputStream outstream = new ByteArrayOutputStream();
					e.printStackTrace(new PrintStream(outstream));
					logger.error("Error predicting " + symbols[s] + ":" + outstream.toString());
					e.printStackTrace();
				}
			}
//			os.flush();
//			os.close();
		}

		StringBuffer buf = new StringBuffer();
		for (String moss : mlist.keySet()) {
			buf.append(moss+",");
			ArrayList<FincastResponse.CCsvRec> mosl = mlist.get(moss);
//			int scorep = 0;
//			double probp = 0.0, ret = 0.0;
//			for (int mosli=0; mosli<mosl.size(); mosli++) {
			for (int mosli=0; mosli<1; mosli++) {
				FincastResponse.CCsvRec moslr = mosl.get(mosli);
				buf.append(moslr.toCsvRecNoSymbol());
//				try { scorep += Integer.parseInt(moslr.getPredictedLabel()); } catch(Exception e) {}
//				try { probp += moslr.getPredictionProb()/mosl.size(); } catch(Exception e) {}
//				try { ret += Double.parseDouble(moslr.getPredictionString())/mosl.size(); } catch(Exception e) {}
			}
			//buf.append(","+scorep + "," + probp+","+ret+"\n");
			buf.append("\n");
		}
		String result = buf.toString();
		mos.write(result.getBytes());
		mos.flush();
		mos.close();
		if (System.getProperty(MAVEN_TEST_SEND_PREDICTION)!=null && 
				System.getProperty(MAVEN_TEST_SEND_PREDICTION).equalsIgnoreCase("true")) {
			Map<String, InputStream> am = new HashMap<String, InputStream>();
			am.put(tradeLog, new FileInputStream(new File(tradeLog)));
			new EmailSender().sendEmail("tradrejoe@gmail.com", "forecast result", result,
					new String[]{"tradrejoe@gmail.com", "mgzheng@yahoo.com"}, am);
		}
		return mlist;
	}

	@Test
	public void testPredictionMA() {
		if (System.getProperty(MAVEN_TEST_PREDICTION_MA)==null ||
				!System.getProperty(MAVEN_TEST_PREDICTION_MA).equalsIgnoreCase("true")) {
			return;
		}	
		System.setProperty(MAVEN_TEST_PREDICTION, "true");
		System.setProperty(MAVEN_TEST_MA, "true");
		System.setProperty(MAVEN_TEST_SEND_PREDICTION_MA, "true");
		try {
			TreeMap<String, ArrayList<FincastResponse.CCsvRec>> pm = testForecastSingleThreaded();
			Map<String, MARec> mm = testMA();
			if (pm==null || mm==null) throw new RuntimeException("No data.");
			String tmpdir = System.getProperty("java.io.tmpdir");
			String fs = System.getProperty("file.separator");
			if (!tmpdir.endsWith(fs)) tmpdir += fs;
			String tradelog = "lpm_" +
					lsdf.format(GregorianCalendar.getInstance().getTime())+".csv";
			OutputStream os = new FileOutputStream(new File(tmpdir + tradelog));
			boolean bheader = false;
			String buf = null;
			for (String cls : mm.keySet()) {
				MARec tmprec = mm.get(cls);
				List<FincastResponse.CCsvRec> lst = pm.get(cls);
				if (!bheader) {
					buf = MARec.getHeader();
					for (int l=0; l<lst.size(); l++) {
						buf += ","+lst.get(l).getCsvRecNoSymbolHeader();
					}
					os.write((buf+NL).getBytes());
					bheader = true;
				}
				buf = tmprec.toString();
				for (int l=0; l<lst.size(); l++) {
					buf += ","+lst.get(l).toCsvRecNoSymbol();
				}
				os.write((buf+NL).getBytes());				
			}
			os.flush();
			os.close();
			if (System.getProperty(MAVEN_TEST_SEND_PREDICTION_MA)!=null && 
					System.getProperty(MAVEN_TEST_SEND_PREDICTION_MA).equalsIgnoreCase("true")) {
				Map<String, InputStream> am = new HashMap<String, InputStream>();
				am.put(tradelog, new FileInputStream(new File(tmpdir + tradelog)));
				new EmailSender().sendEmail("tradrejoe@gmail.com", tradelog, tradelog,
						new String[]{"tradrejoe@gmail.com", "mgzheng@yahoo.com"}, am);
			}
		} catch(Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		System.setProperty(MAVEN_TEST_PREDICTION, "false");
		System.setProperty(MAVEN_TEST_MA, "false");
		System.setProperty(MAVEN_TEST_SEND_PREDICTION_MA, "false");		
	}
	
	@Test
	public void testGenfiles() throws Exception {
		if (System.getProperty(MAVEN_TEST_FILES)==null ||
				!(System.getProperty(MAVEN_TEST_FILES)+"").equalsIgnoreCase("true"))
				return;
		//init();
		Date today = DateUtils.getDateNotime();
		if (System.getProperty(MAVEN_TEST_DATE)!=null) {
			try {
				today = sdf.parse(System.getProperty(MAVEN_TEST_DATE)+"");
			} catch(Exception e) {
				today = DateUtils.getDateNotime();
			}
		}
		//for testing
		String[] symbols = new String[]{"GOOG"};
		ArrayList lr = new ArrayList();
		/*int rsz = 5;
		int[] rngs = new int[rsz];
		for (int r =0; r<rsz; r++) {
			rngs[r]=r+1;
		}*/
		int rngs[] = new int[]{5};
		String sep = System.getProperty("file.separator")==null?"/" : System.getProperty("file.separator");
		TreeMap<CKey, Double> dfincorr = clsDs.getDfinCorr();
		if (dfincorr==null || dfincorr.size()==0) {
			for (String s : symbols) {
				dfincorr.put(new CKey(s, "^GPSC", 5, 2.0), 0.51);
				dfincorr.put(new CKey(s, "^NDX", 5, 2.0), 0.52);
				dfincorr.put(new CKey(s, "^GLD", 5, 2.0), 0.53);
				dfincorr.put(new CKey(s, "^TNX", 5, 2.0), 0.54);
			}
		}
		boolean sd = false;
		for (int r=0; r<rngs.length; r++) {
			int rng = rngs[r];
//			String csvfile = DEFAULT_TEST_CSVDIR + sep + tsdf.format(today)+"_" + rng + ".csv";
//			FileOutputStream os = new FileOutputStream(new File(csvfile));
			for (int s=0; s<symbols.length; s++) {
				try {
					String symbol = symbols[s];
					ForecastRequest request = new ForecastRequest();
					//request.setAttributes("^GSPC,OIL,GLD,^NDX,^IRX,^TNX,^VIX,FXE,EFA,"+symbol);
					//request.setAttributes("^GSPC,OIL,GLD,"+symbol);
					//request.setCase(DateUtils.sdf.parse("12/12/2013"));
					request.setCase(today);
					request.setClazz(symbol);

					/*Date today = DateUtils.getDateNotime();
					Calendar cal = GregorianCalendar.getInstance();
					cal.setTime(today);
					cal.add(Calendar.DATE, 7);
					Date odt = cal.getTime();
					Integer rng = DateUtils.getDiffTradingDays(today, odt);
					logger.debug("DateUtils.getDiffTradingDays('" + sdf.format(today) + "','" + sdf.format(odt) + "')=" + rng);
					if (rng<=0) {
						rng = DateUtils.getDiffDays(today, odt);
						logger.debug("DateUtils.getDiffDays('" + sdf.format(today) + "','" + sdf.format(odt) + "')=" + rng);
					}
					request.setForecastRange(rng);*/
					int hist = sd ? 4 : 2;
					request.setForecastRange(rng);
					int ncases = 252 * hist;
					//long max_predictors = Math.round(ncases / (sd ? 40 : 20))-( sd ? 2 : 1);
					long max_predictors = Math.round(Math.log10(ncases)/Math.log10(5.0))-1;
					request.setHistory(ncases);
					TreeMap<Double, CKey> tmpattr = new TreeMap<Double, CKey>(new Comparator() {
						public int compare(Object o1, Object o2) {
							return (o1==null || o2==null || !(o1 instanceof Double) || !(o2 instanceof Double)) ? 0 :
								-1 * (((Double)o1).compareTo((Double)o2));
						}
						public boolean equals(Object o) {
							return o!=null && (o instanceof Double) && this.compare(this, o) == 0;
						}
					});
					for (int i = 0; i<indices.length; i++) {
						CKey ck = new CKey(symbol, indices[i], rng, new Double(hist));
						Double corr = dfincorr.get(ck);
						if (corr==null) continue;
						tmpattr.put(new Double(Math.abs(corr.doubleValue())), ck);
					}
					ArrayList<String> predictors = new ArrayList<String>();
					CacheFinCls cacheFinCls = CacheFinCls.getInstance(clsDs, pd);
					for (Double d : tmpattr.keySet()) {
						List kl = tmpattr.get(d).getKeys();
						if (kl!=null && kl.size()>=2) {
							String tmppredictor = kl.get(1) +"";

							predictors.add(tmppredictor);
							if (predictors.size()>= max_predictors) break;
						}
					}
					if (predictors.size()==0) {
						for (int i=0; i<DEFAULT_PREDICTORS.length; i++) {
							predictors.add(DEFAULT_PREDICTORS[i]);
						}
					}
					String bufattr = "";
					for (int i=0; i<predictors.size();i++) {
						bufattr += predictors.get(i)+",";
					}
					bufattr += symbol;
					logger.debug(String.format("PyfiaTest::testGenFile(), symbol=%1$s;predictors=%2$s",symbol, bufattr));
					request.setAttributes(bufattr);
					request.setSd(sd);
					String requestId = UUID.randomUUID().toString();
					logger.debug("UUID based request id generated: " + requestId);
					request.setRequestId(requestId);
					if (processor==null) processor = new FincastProcessor();
					processor.setClsDs(clsDs);
					processor.setPd(pd);
					processor.genFilesRF(request);
					logger.debug("files generated.");
				} catch(Exception e) {
					ByteArrayOutputStream outstream = new ByteArrayOutputStream();
					e.printStackTrace(new PrintStream(outstream));
					logger.error("Error generating training/test files for " + symbols[s] + ":" + outstream.toString());
					e.printStackTrace();
				}
			}
		}
	}

	/* For AbstractDependencyInjectionSpringContextTests or
	 * AbstractTransactionalDataSourceSpringContextTests
	 *
	 * protected String[] getConfigLocations() {
		this.setAutowireMode(AUTOWIRE_BY_NAME);
		this.setDependencyCheck(false);
		return new String[] {"file:C:/projects/pyfia/src/test/resources/com/uxl/sites/pyfia/PyfiaTest-config.xml"};
	}*/

	String[] indices = Symbols.INDICES;

	public static final String LIBS = "test.libs";
	public static void main(String[] args) {
		try {
			logger.debug("PyfiaTest::main()");
			if (System.getProperty(LIBS)!=null) {
				StringTokenizer ltoks = new StringTokenizer(System.getProperty(LIBS), ",");
				while(ltoks.hasMoreTokens()) {
					String lib = ltoks.nextToken();
					logger.debug(String.format("PyfiaTest::main(), loading jar and zip files from %1$s", lib));
					Lib.loadLibraries(lib);
				}
			}
			PyfiaTest t = new PyfiaTest();
			String configPath = "classpath:/PyfiaTest-context.xml";
			t.setApplicationCtx((new ApplicationContextLoader().load(t, configPath)).getApplicationContext());
			t.init();
			logger.debug(String.format("PyfiaTest::main(), loading %1$s", configPath));
			java.lang.reflect.Method[] ms = t.getClass().getMethods();
			for (Method m : ms) {
				logger.debug(String.format("PyfiaTest::main(), inspecting method %1$s", m.getName()));
				java.lang.annotation.Annotation[] as = m.getAnnotations();
				boolean ran = false;
				for (Annotation a : as) {
					logger.debug(String.format("PyfiaTest::main(), inspecting annotation %1$s on method %2$s", a.getClass().getName(), m.getName()));
					if (a instanceof Test) {
						logger.debug(String.format("Calling %1$s", m.getName()));
						m.invoke(t, new Object[]{});
						ran = true;
						break;
					}
				}
//				if (!ran && m.getName().startsWith("test")) {
//					logger.debug(String.format("Calling %1$s", m.getName()));
//					m.invoke(t, new Object[]{});
//				}
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

//	public static void main(String[] args) {
//		Properties prop = System.getProperties();
//		for (Object p : prop.keySet()) {
//			System.out.println(p+"="+prop.get(p));
//		}
//	}
}
