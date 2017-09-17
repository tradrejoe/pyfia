package com.uxl.sites.pyfia.model.cache;

import java.io.ByteArrayInputStream;
import java.io.StreamTokenizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Set;
import java.util.TreeMap;

import org.apache.log4j.Logger;
import org.lc.misc.CollectionUtil;
import org.lc.misc.DateUtils;
import org.lc.misc.JsonUtil;
import org.lc.misc.StringUtil;
import org.lc.model.CKey;
import org.lc.web.controller.BaseController;

import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;

import com.uxl.sites.pyfia.IClsDS;
import com.uxl.sites.pyfia.exceptions.NoDataException;
import com.uxl.sites.pyfia.model.fin.FinCaseHList;
import com.uxl.sites.pyfia.model.fin.FinCaseLList;
import com.uxl.sites.pyfia.model.fin.FinCaseList;
import com.uxl.sites.pyfia.model.fin.FinCaseOList;
import com.uxl.sites.pyfia.model.fin.FinCaseSDList;
import com.uxl.sites.pyfia.model.fin.FincastRequest;
import com.uxl.sites.pyfia.model.fin.ForecastRequest;
import com.uxl.sites.pyfia.model.fin.RewindableByteArrayInputStream;
import com.uxl.sites.pyfia.model.fin.exceptions.NegativeLagException;
import com.uxl.sites.pyfia.model.fin.exceptions.NoPredictorsException;
import com.uxl.sites.pyfia.web.AbstractPriceDownloader;

public class CacheFinCls extends TreeMap<String, List<FinCaseList>> {
	
	public static final long serialVersionUID = 0L;
	
	Logger logger = Logger.getLogger(CacheFinCls.class);
	static CacheFinCls instance = null;
	static final Object lock = new Object();
	IClsDS clsDs;
	AbstractPriceDownloader pd = null;
	
	protected CacheFinCls() {
		super();
	}
	
	
		
	public static CacheFinCls getInstance(IClsDS clsDs, AbstractPriceDownloader pd) {
		synchronized(lock) {
			if (instance==null) {
				instance = new CacheFinCls();
			}
			instance.setClsDs(clsDs);
			instance.setPd(pd);			
		}
		return instance;
	}
	
	protected IClsDS getClsDs() {
		return clsDs;
	}



	protected void setClsDs(IClsDS clsDs) {
		this.clsDs = clsDs;
	}



	protected AbstractPriceDownloader getPd() {
		return pd;
	}



	protected void setPd(AbstractPriceDownloader pd) {
		this.pd = pd;
	}

	public List<FinCaseList> fetch(String cls, Object... flags) {
		boolean bcsdata = (flags.length>0 && flags[0] instanceof Boolean && (Boolean)flags[0]);
		Date dt = DateUtils.getDateNotime();
		List<FinCaseList> list = null;
		synchronized(lock) {
			list = instance.get(cls);
			//logger.debug("CacheFinCls::get('"+cls+"'), after mem qry, list=" + JsonUtil.serialize(list));
			if (list==null || list.size()==0 || list.get(0).size()==0 || bcsdata && list.size()<5) {
				//query db first
				logger.debug("Querying db for " + cls);
				list = clsDs.getFinCaseList(cls, flags);
				//logger.debug("CacheFinCls::get('"+cls+"'), after db qry, list=" + JsonUtil.serialize(list));
				//if not in db then go online then populate db
				if (list==null || list.size()==0 || list.get(0).size()==0 || bcsdata && list.size()<5) {
					logger.debug("Querying online for " + cls);
					list = pd.getFinCaseList(cls, flags);
					//logger.debug("CacheFinCls::get('"+cls+"'), after yf qry, list=" + JsonUtil.serialize(list));
					logger.debug("Saving data in db for " + cls);
					for (FinCaseList l : list) {
						clsDs.save(l, cls);
					}
				}
			}
			//logger.debug("CacheFinCls::get('"+cls+"'), after db query and pd, list=" + JsonUtil.serialize(list));
			List<FinCaseList> tmplist = null;
			for (FinCaseList l : list) {
				Date ldt = null;
				try {
					ldt = l.lastKey();
				} catch(Throwable e) {
					e.printStackTrace();
				}
				if (ldt==null) continue;
				Calendar lcal = GregorianCalendar.getInstance();
				lcal.setTime(ldt);
				if (ldt.compareTo(dt)==-1) {				
					//go online to get missing prices then persist to db and add to cache
					logger.debug("Data not current. Lastest date is " + dt + ". Querying online for " + cls);
					if (tmplist==null) tmplist = pd.getFinCaseList(cls, lcal, GregorianCalendar.getInstance(), flags);
					if (tmplist!=null && tmplist.size()>0 && tmplist.get(0).size()>0) {
						logger.debug("Saving latest data in db for " + cls);
						for (FinCaseList tl : tmplist) {
							logger.debug("Saving latest data in db for " + cls); // + ", tmp list tl=" + JsonUtil.serialize(tl));
							if (tl.getClass().equals(l.getClass())) {
								l.putAll(tl);
								clsDs.save(tl, cls);
							}
						}
					}
				}
			}
			instance.put(cls, list);
		}
		return list;
	}
	
	public List<FinCaseList> getPassReturns(String cls, int lag, Date start, int history, Boolean... flags) throws Exception {
		if (lag<0)
			throw new NegativeLagException();
		boolean sd = (flags.length>0 && flags[0]);
		boolean useCache = flags.length>1 && flags[1];
		CKey key = new CKey(cls, lag, start, history, sd);
		List<FinCaseList> out = null;
		List<FinCaseList> list = null;
		if (useCache) {
			list = CacheReturnsFactory.getPastReturns(key);
		}
		if (list!=null && list.size()>0 && list.get(0).size()>0) {
			out = list;
		} else {
			list = this.fetch(cls);
			out = new ArrayList<>();
			for (FinCaseList lst : list) {
				if (!sd && FinCaseSDList.class.isInstance(lst)) continue;
				FinCaseList tmp = (FinCaseSDList.class.isInstance(lst)) ? new FinCaseSDList() : new FinCaseList();
				out.add(tmp);
				Set<Date> keys = lst.keySet();
				Date[] dates = (Date[])keys.toArray(new Date[0]);
				for (int i=dates.length-1; i>=0; i--) {
					Date dt = dates[i];
					if (start!=null && dt.after(start))
						continue;
					Double cval = lst.get(dt);
					if (i-lag >=0 && cval != null) {
						Date pdt = dates[i-lag];
						Double pval = lst.get(pdt);
						if (pval != null && !pval.equals(0)) {
							Double ret = (cval.doubleValue() / pval.doubleValue()) - 1.0;
							tmp.put(dt, ret);
						}
					}
					if (tmp.size()>history) break;
				}
			}
			CacheReturnsFactory.setPastReturns(key, out);
		}
		return out;
	}
	
	public FinCaseList getFutureReturns(String cls, int lag, Date start, int history, Boolean... flags) throws Exception {
		if (lag<0)
			throw new NegativeLagException();
		FinCaseList out = null;
		CKey key = new CKey(cls, lag, start, history);
		List<FinCaseList> list = null;
		if (flags.length>0 && flags[0]) {
			list = CacheReturnsFactory.getFutureReturns(key);
		}
		if (list!=null && list.size()>0 && list.get(0).size()>0) {
			out = list.get(0);		
		} else {
			out = new FinCaseList();
			list = this.fetch(cls);
			//logger.debug("start=" + start + "; list=" + list);
			for (FinCaseList lst : list) {
				if (FinCaseSDList.class.isInstance(lst)) continue;
				Set<Date> keys = lst.keySet();
				Date[] dates = (Date[])keys.toArray(new Date[0]);
				for (int i=dates.length-1; i>=0; i--) {
					Date dt = dates[i];
					if (start!=null && dt.after(start))
						continue;
					Double cval = lst.get(dt);
					if (i+lag <dates.length && cval != null) {
						Date fdt = dates[i+lag];
						Double fval = lst.get(fdt);
						if (fval != null && !cval.equals(0)) {
							Double ret = (fval.doubleValue() / cval.doubleValue()) - 1.0;
							//out.put(dt, ret > 0 ? 1.0 : 0.0);
							out.put(dt, ret);
						}
					}
					if (out.size() > history) break;
				}
			}
			List<FinCaseList> tmpl = new ArrayList<>();
			tmpl.add(out);
			CacheReturnsFactory.setFutureReturns(key, tmpl);
		}
		return out;
	}
	
	public FincastRequest prepareFincastRequest(ForecastRequest in) throws Exception {
		
		CacheFincastResponse cacheFincastResponse = CacheFincastResponse.getInstance();
		String requestId = in.getRequestId();
		logger.debug("In CacheFinCls::prepareFincastRequest(), requestId=" + requestId);
		FincastRequest out = new FincastRequest(in);
		out.setRequestId(in.getRequestId());
		String bufTrain = "";
		String bufTest = "";
		
		String status = "Getting historical data for " + in.getClazz() + ".";
		cacheFincastResponse.setStatus(requestId, status);	
		logger.debug(status);
		FinCaseList fcl = getFutureReturns(in.getClazz(), out.getForecastRange(), in.getCase(), in.getHistory());
		if (fcl==null || fcl.size()==0) {
			String msg = "No price data found for symbol " + in.getClazz() + ".";
			logger.error(msg);
			throw new NoDataException(msg);
		}
		//streams
		String[] attra = (String[])out.getAttributesList().toArray(new String[0]);
		TreeMap<String, List<FinCaseList>> attrMap = new TreeMap<String, List<FinCaseList>>();
		//Header
		bufTrain += "@RELATION " + out.getClazz() + "\r\n";
		bufTest += "@RELATION " + out.getClazz() + "\r\n";
		for (int a=0; a<attra.length; a++) {
			String tmpa = attra[a];
			if (tmpa==null || tmpa.trim().equals("")) continue;
			status = "Getting historical data for " + tmpa + ".";
			cacheFincastResponse.setStatus(requestId, status);
			logger.debug(status);
			List<FinCaseList> tmpfcl = getPassReturns(tmpa, out.getForecastRange(), in.getCase(), in.getHistory(), in.isSd());
			if (tmpfcl!=null && tmpfcl.size()>0) {
				attrMap.put(tmpa, tmpfcl);		
				bufTrain += "@ATTRIBUTE " + tmpa + " REAL" + "\r\n";
				bufTest += "@ATTRIBUTE " + tmpa + " REAL" + "\r\n";				
			}
		}
		if (attrMap.size()==0) {
			String msg = "No predictors specified for " + out.getClazz() + ".";
			logger.error(msg);
			throw new NoPredictorsException(msg);
		}
		status = "Preparing forecast data.";
		cacheFincastResponse.setStatus(requestId, status);
		logger.debug(status);
		String strUniqueValues = fcl.uniqueValListString();
		bufTrain += "@ATTRIBUTE class " + strUniqueValues + " " + "\r\n";
		bufTest += "@ATTRIBUTE class " + strUniqueValues + " " + "\r\n";
		bufTrain += "\r\n" + "@DATA" + "\r\n";
		bufTest += "\r\n" + "@DATA" + "\r\n";
		//Generate Test Row
		Date[] datesCls = (Date[])(attrMap.get(attra[0])).get(0).keySet().toArray(new Date[0]);
		ArrayList<Date> arffCases = new ArrayList<Date>();
		arffCases.addAll(fcl.keySet());
		int startRowInFinCls = datesCls.length-1;
		Date dateTest = datesCls[startRowInFinCls];
		String bufTestRow = "";
		ArrayList<Double> arffArTestRow = new ArrayList<Double>();
		boolean hasWholeTestRow = true;
		for (startRowInFinCls=datesCls.length-1;startRowInFinCls>=0;startRowInFinCls--) {
			hasWholeTestRow = true;
			bufTestRow = "";
			arffArTestRow = new ArrayList<Double>();
			dateTest = datesCls[startRowInFinCls];	
			for (int a=0; a<attra.length && hasWholeTestRow;a++) {
				String tmpTrainTest = attra[a];
				List<FinCaseList> tmpFclTestList = attrMap.get(tmpTrainTest);
				for (FinCaseList tmpFclTest : tmpFclTestList) {
					Double tmpValTest = tmpFclTest.get(dateTest);
					if (tmpValTest==null) {
						hasWholeTestRow = false;
						arffCases.remove(dateTest);
						continue;
					}
					bufTestRow += tmpValTest + ",";
					arffArTestRow.add(tmpValTest);
				}
				if (!hasWholeTestRow) continue;
				
			}
			if (hasWholeTestRow) {
				arffArTestRow.add(0.0);	
				out.setCase(dateTest);
				out.setTestCases(arffCases);
				out.setTestData(arffArTestRow);
				bufTest += bufTestRow + "?" + "\r\n" + new Character((char)StreamTokenizer.TT_EOF);
				break;
			}
		}
		
		//Generate Training Rows
		ArrayList<ArrayList<Double>> aarffArTrain = new ArrayList<ArrayList<Double>>();
		for (int d=startRowInFinCls-1; d>=0; d--) {
			Date dateCls = datesCls[d];
			ArrayList<Double> arffArTrain = new ArrayList<Double>();
			String bufTrainRow = "";
			boolean hasWholeRow = true;
			for (int a=0; a<attra.length && hasWholeRow;a++) {
				String tmpAttrTrain = attra[a];
				List<FinCaseList> tmpFclTrainList = attrMap.get(tmpAttrTrain);
				for (FinCaseList tmpFclTrain : tmpFclTrainList) {
					Double tmpValTrain = tmpFclTrain.get(dateCls);
					if (tmpValTrain==null) {
						hasWholeRow = false;
						continue;
					}
					bufTrainRow += tmpValTrain + ",";	
					arffArTrain.add(tmpValTrain);
				}
				if (!hasWholeRow) continue;
			}
			if (hasWholeRow) {
				Double tmpRetTrain = fcl.get(dateCls);
				if (tmpRetTrain==null) {
					bufTrain += "\r\n";
					continue;
				}
				arffArTrain.add(tmpRetTrain);
				bufTrainRow += tmpRetTrain + "\r\n";
				bufTrain += bufTrainRow;
				aarffArTrain.add(arffArTrain);
			}
		}
		ArrayList<Double> tmpCaseValues = new ArrayList<Double>();
		List<FinCaseList> cvallist = this.fetch(in.getClazz());
		for (FinCaseList cval : cvallist) {
			if (FinCaseSDList.class.isInstance(cval)) continue;
			if (cval.get(out.getCase())!=null) {
				for (int i=0; i<arffCases.size(); i++) {
					Double tmpCaseValue = cval.get(arffCases.get(i));
					tmpCaseValues.add(tmpCaseValue);
				}
				tmpCaseValues.add(cval.get(out.getCase()));
			}
		}
		out.setCaseValues(tmpCaseValues);
		bufTrain += new Character((char)StreamTokenizer.TT_EOF);
		out.setTrainingData(aarffArTrain);
		out.setUniqueValues(fcl.getUniqueValues());
		out.setTrainingSet(new RewindableByteArrayInputStream(bufTrain.getBytes()));
		out.setTestSet(new RewindableByteArrayInputStream(bufTest.getBytes()));
		status = "Done preparing forecast data.";
//		logger.debug(status);
//		logger.debug("training data:");
//		logger.debug(bufTrain);
//		logger.debug("testing data:");
//		logger.debug(bufTest);
		cacheFincastResponse.setStatus(requestId, status);
		return out;
	}
	public FincastRequest prepareFincastRequestSvm(ForecastRequest in, Object...  args) throws Exception {
		
		boolean regression = (args!=null && args.length>0 && args[0] instanceof Boolean && ((Boolean)args[0]).booleanValue());
		CacheFincastResponse cacheFincastResponse = CacheFincastResponse.getInstance();
		String requestId = in.getRequestId();
		logger.debug("In CacheFinCls::prepareFincastRequestSvm(), requestId=" + requestId);
		FincastRequest out = new FincastRequest(in);
		out.setRequestId(in.getRequestId());
		String bufTrain = "";
		String bufTest = "";
		
		String status = "Getting historical data for " + in.getClazz() + ".";
		cacheFincastResponse.setStatus(requestId, status);	
		logger.debug(status);
		FinCaseList fcl = getFutureReturns(in.getClazz(), out.getForecastRange(), in.getCase(), in.getHistory());
		if (fcl==null || fcl.size()==0) {
			String msg = "No price data found for symbol " + in.getClazz() + ".";
			logger.error(msg);
			throw new NoDataException(msg);
		}
		//streams
		String[] attra = (String[])out.getAttributesList().toArray(new String[0]);
		TreeMap<String, List<FinCaseList>> attrMap = new TreeMap<String, List<FinCaseList>>();
		for (int a=0; a<attra.length; a++) {
			String tmpa = attra[a];
			status = "Getting historical data for " + tmpa + ".";
			cacheFincastResponse.setStatus(requestId, status);
			logger.debug(status);
			List<FinCaseList> tmpfcl = getPassReturns(tmpa, out.getForecastRange(), in.getCase(), in.getHistory(), in.isSd());
			if (!tmpa.equals("") && tmpfcl!=null && tmpfcl.size()>0) {
				attrMap.put(tmpa, tmpfcl);			
			}
		}
		if (attrMap.size()==0) {
			String msg = "No predictors specified for " + out.getClazz() + ".";
			logger.error(msg);
			throw new NoPredictorsException(msg);
		}
		status = "Preparing forecast data.";
		cacheFincastResponse.setStatus(requestId, status);
		logger.debug(status);

		//Generate Test Row
		Date[] datesCls = (Date[])(attrMap.get(attra[0])).get(0).keySet().toArray(new Date[0]);
		ArrayList<Date> arffCases = new ArrayList<Date>();
		arffCases.addAll(fcl.keySet());
		int startRowInFinCls = datesCls.length-1;
		Date dateTest = datesCls[startRowInFinCls];
		String bufTestRow = "";
		ArrayList<Double> arffArTestRow = new ArrayList<Double>();
		boolean hasWholeTestRow = true;
		for (startRowInFinCls=datesCls.length-1;startRowInFinCls>=0;startRowInFinCls--) {
			hasWholeTestRow = true;
			bufTestRow = "";
			arffArTestRow = new ArrayList<Double>();
			dateTest = datesCls[startRowInFinCls];
			int idx = 1;
			for (int a=0; a<attra.length && hasWholeTestRow;a++) {
				String testAttr = attra[a];
				List<FinCaseList> tmpFclTestList = attrMap.get(testAttr);
				for (FinCaseList tmpFclTest : tmpFclTestList) {
					Double tmpValTest = tmpFclTest.get(dateTest);
					if (tmpValTest==null) {
						hasWholeTestRow = false;
						arffCases.remove(dateTest);
						break;
					}
					bufTestRow += (idx++)+":"+tmpValTest + " ";
					arffArTestRow.add(tmpValTest);
				}
				if (!hasWholeTestRow) break;
			}
			if (hasWholeTestRow) {
				out.setCase(dateTest);
				out.setTestCases(arffCases);
				out.setTestData(arffArTestRow);
				bufTest += (regression ? "0.01 " : "+1 ") + bufTestRow + "\r\n";// + new Character((char)StreamTokenizer.TT_EOF);
				break;
			}
		}
		
		//Generate Training Rows
		ArrayList<ArrayList<Double>> aarffArTrain = new ArrayList<ArrayList<Double>>();
		for (int d=startRowInFinCls-1; d>=0; d--) {
			Date dateCls = datesCls[d];
			ArrayList<Double> arffArTrain = new ArrayList<Double>();
			String bufTrainRow = "";
			boolean hasWholeRow = true;
			int idx = 1;
			for (int a=0; a<attra.length && hasWholeRow;a++) {
				String tmpAttrTrain = attra[a];
				List<FinCaseList> tmpFclTrainList = attrMap.get(tmpAttrTrain);
				for (FinCaseList tmpFclTrain : tmpFclTrainList) {
					Double tmpValTrain = tmpFclTrain.get(dateCls);
					if (tmpValTrain==null) {
						hasWholeRow = false;
						break;
					}
					bufTrainRow += (idx++)+":"+tmpValTrain + " ";	
					arffArTrain.add(tmpValTrain);
				}
				if (!hasWholeRow) break;
			}
			if (hasWholeRow) {
				Double tmpRetTrain = fcl.get(dateCls);
				if (tmpRetTrain!=null) {
					arffArTrain.add(tmpRetTrain);
					if (regression) {
						bufTrain += tmpRetTrain + " " + bufTrainRow + "\r\n";
					} else {
						bufTrain += (tmpRetTrain>0.0 ? "+1" : "-1")  + " " + bufTrainRow + "\r\n";						
					}
					aarffArTrain.add(arffArTrain);
				}
			}
		}
		ArrayList<Double> tmpCaseValues = new ArrayList<Double>();
		List<FinCaseList> cvallist = this.fetch(in.getClazz());
		for (FinCaseList cval : cvallist) {
			if (FinCaseSDList.class.isInstance(cval)) continue;
			if (cval.get(out.getCase())!=null) {
				for (int i=0; i<arffCases.size(); i++) {
					Double tmpCaseValue = cval.get(arffCases.get(i));
					tmpCaseValues.add(tmpCaseValue);
				}
				tmpCaseValues.add(cval.get(out.getCase()));
			}
		}
		out.setCaseValues(tmpCaseValues);
		//bufTrain += new Character((char)StreamTokenizer.TT_EOF);
		out.setTrainingData(aarffArTrain);
		out.setUniqueValues(fcl.getUniqueValues());
		//out.setTrainingSet(new RewindableByteArrayInputStream(bufTrain.getBytes()));
		//out.setTestSet(new RewindableByteArrayInputStream(bufTest.getBytes()));
		out.setTrainingSet(new ByteArrayInputStream(bufTrain.getBytes()));
		out.setTestSet(new ByteArrayInputStream(bufTest.getBytes()));		
		status = "Done preparing forecast data.";
		logger.debug(status);
		logger.debug("training data:");
		logger.debug(bufTrain);
		logger.debug("testing data:");
		logger.debug(bufTest);
		cacheFincastResponse.setStatus(requestId, status);
		return out;
	}
	static String NL = System.getProperty("line.separator");
	public FincastRequest prepareFincastRequestRF(ForecastRequest in, Object... params) throws Exception {
		
		CacheFincastResponse cacheFincastResponse = CacheFincastResponse.getInstance();
		String requestId = in.getRequestId();
logger.debug(String.format("In CacheFinCls::prepareFincastRequestRF(), test date=%1$s", DateUtils.sdf.format(in.getCase())));
		FincastRequest out = new FincastRequest(in);
		out.setRequestId(in.getRequestId());
		
		String bufTrain = getRFArffHeader(out);
		String bufTest = getRFArffHeader(out);
		ArrayList<Attribute> wkattr = in.getAttributesWeka();
		Instances trainingInst = new Instances(in.getClazz(), wkattr, 0);
		trainingInst.setRelationName(in.getClazz());
		trainingInst.setClassIndex(wkattr.size()-1);
		Instances testInst = new Instances(in.getClazz(), wkattr, 0);
		testInst.setRelationName(in.getClazz());
		testInst.setClassIndex(wkattr.size()-1);		
		DataSource trainingSrc = new DataSource(trainingInst);
		DataSource testSrc = new DataSource(testInst);
		
		String status = "Getting historical data for " + in.getClazz() + ".";
		cacheFincastResponse.setStatus(requestId, status);	
		logger.debug(status);
		FinCaseList fcl = getFutureReturns(in.getClazz(), out.getForecastRange(), in.getCase(), in.getHistory());
logger.debug("CacheFinCls::prepareFincastRequestRF(), future returns for "+in.getClazz()+"=" + fcl);		
		if (fcl==null || fcl.size()==0) {
			String msg = "No price data found for symbol " + in.getClazz() + ".";
			logger.error(msg);
			throw new NoDataException(msg);
		}
		//streams
		String[] attra = (String[])out.getAttributesList().toArray(new String[0]);
		TreeMap<String, List<FinCaseList>> attrMap = new TreeMap<String, List<FinCaseList>>();
		for (int a=0; a<attra.length; a++) {
			String tmpa = attra[a];
			status = "Getting historical data for " + tmpa + ".";
			cacheFincastResponse.setStatus(requestId, status);
			logger.debug(status);
			List<FinCaseList> tmpfcl = getPassReturns(tmpa, out.getForecastRange(), in.getCase(), in.getHistory(), in.isSd());
logger.debug("CacheFinCls::prepareFincastRequestRF(), past returns for "+tmpa+"=" + tmpfcl.get(0));			
			if (!tmpa.equals("") && tmpfcl!=null && tmpfcl.size()>0) {
				attrMap.put(tmpa, tmpfcl);			
			}
		}
		if (attrMap.size()==0) {
			String msg = "No predictors specified for " + out.getClazz() + ".";
			logger.error(msg);
			throw new NoPredictorsException(msg);
		}
		status = "Preparing forecast data.";
		cacheFincastResponse.setStatus(requestId, status);
		logger.debug(status);

		//Generate Test Row
		Date[] datesCls = (Date[])(attrMap.get(attra[0])).get(0).keySet().toArray(new Date[0]);
		ArrayList<Date> arffCases = new ArrayList<Date>();
		arffCases.addAll(fcl.keySet());
		int startRowInFinCls = datesCls.length-1;
		Date dateTest = datesCls[startRowInFinCls];
		//test data
		ArrayList<Double> arffArTestRow = new ArrayList<Double>();
		boolean hasWholeTestRow = true;
		double[] instvalTestRow = new double[wkattr.size()];
		DenseInstance instTestRow = new DenseInstance(1.0, instvalTestRow);
		for (startRowInFinCls=datesCls.length-1;startRowInFinCls>=0;startRowInFinCls--) {
			hasWholeTestRow = true;
			String bufTestRow = "";
			arffArTestRow = new ArrayList<Double>();
			dateTest = datesCls[startRowInFinCls];
			int idx = 1;
			for (int a=0; a<attra.length && hasWholeTestRow;a++) {
				String testAttr = attra[a];
				List<FinCaseList> tmpFclTestList = attrMap.get(testAttr);
				for (FinCaseList tmpFclTest : tmpFclTestList) {
					Double tmpValTest = tmpFclTest.get(dateTest);
					if (tmpValTest==null) {
						hasWholeTestRow = false;
						arffCases.remove(dateTest);
						break;
					}
					bufTestRow += tmpValTest + ",";
					instvalTestRow[a] = tmpValTest;
					arffArTestRow.add(tmpValTest);
				}
				if (!hasWholeTestRow) break;
			}
			if (hasWholeTestRow) {
				out.setCase(dateTest);
				out.setTestData(arffArTestRow);
				bufTest += bufTestRow + "0.01" + NL + new Character((char)StreamTokenizer.TT_EOF);
				instvalTestRow[instvalTestRow.length-1] = 0.01;
				testInst.add(instTestRow);
				break;
			}
		}
		
		//Generate Training Rows
		ArrayList<ArrayList<Double>> aarffArTrain = new ArrayList<ArrayList<Double>>();
		for (int d=startRowInFinCls-1; d>=0; d--) {
			Date dateCls = datesCls[d];
			ArrayList<Double> arffArTrain = new ArrayList<Double>();
			String bufTrainRow = "";
			double[] instvalTrain = new double[wkattr.size()];
			DenseInstance instTrainRow = new DenseInstance(1.0, instvalTrain); 
			boolean hasWholeRow = true;
			int idx = 1;
			for (int a=0; a<attra.length && hasWholeRow;a++) {
				String tmpAttrTrain = attra[a];
				List<FinCaseList> tmpFclTrainList = attrMap.get(tmpAttrTrain);
				for (FinCaseList tmpFclTrain : tmpFclTrainList) {
					Double tmpValTrain = tmpFclTrain.get(dateCls);
					if (tmpValTrain==null) {
						hasWholeRow = false;
						break;
					}
					bufTrainRow += tmpValTrain + ",";
					instvalTrain[a] = tmpValTrain;
					arffArTrain.add(tmpValTrain);
				}
				if (!hasWholeRow) break;
			}
			if (hasWholeRow) {
				Double tmpRetTrain = fcl.get(dateCls);
				if (tmpRetTrain!=null) {
					arffArTrain.add(tmpRetTrain);
					bufTrain += bufTrainRow + tmpRetTrain + NL;
					instvalTrain[instvalTrain.length-1] = tmpRetTrain;
					aarffArTrain.add(arffArTrain);
					trainingInst.add(instTrainRow);
				}
			}
		}
		List<FinCaseList> cvallist = null;
		if (params.length>0 && params[0] instanceof Boolean && (Boolean)params[0])
			cvallist = this.fetch(in.getClazz(), true);
		else
			cvallist = this.fetch(in.getClazz());
		ArrayList<Double> tmpCaseValues = null;
		for (FinCaseList cval : cvallist) {
			Date[] tmpColDates = cval.keySet().toArray(new Date[0]);
			for (int d=tmpColDates.length-1;d>=0;d--) {
				if (tmpColDates[d].after(in.getCase()))
					cval.remove(tmpColDates[d]);
			}
			tmpCaseValues = new ArrayList<Double>();
			Collection<Double> tmpColValues = cval.values();
			tmpCaseValues.addAll(CollectionUtil.subset(tmpColValues, tmpColValues.size() - in.getHistory(), tmpColValues.size()));
			if (FinCaseOList.class.isInstance(cval)) out.setCaseValuesO(tmpCaseValues);
			else if (FinCaseHList.class.isInstance(cval)) out.setCaseValuesH(tmpCaseValues);
			else if (FinCaseLList.class.isInstance(cval)) out.setCaseValuesL(tmpCaseValues);
			else if (FinCaseSDList.class.isInstance(cval)) out.setCaseValuesSD(tmpCaseValues);
			else out.setCaseValues(tmpCaseValues);
		}
		ArrayList<Date> tmpCases = new ArrayList<Date>();
		Collection<Date> tmpColCases = cvallist.get(0).keySet();
		tmpCases.addAll(CollectionUtil.subset(tmpColCases, tmpColCases.size() - in.getHistory(), tmpColCases.size()));
		out.setTestCases(tmpCases);
		tmpCaseValues = out.getCaseValues();
		out.setCurVal(tmpCaseValues.get(tmpCaseValues.size()-1));
		bufTrain += new Character((char)StreamTokenizer.TT_EOF);
		out.setTrainingData(aarffArTrain);
		out.setUniqueValues(fcl.getUniqueValues());
		//out.setTrainingSet(new RewindableByteArrayInputStream(bufTrain.getBytes()));
		//out.setTestSet(new RewindableByteArrayInputStream(bufTest.getBytes()));
		out.setTrainingSet(new RewindableByteArrayInputStream(bufTrain.getBytes()));
		out.setTestSet(new RewindableByteArrayInputStream(bufTest.getBytes()));	
		out.setTrainingSrc(trainingSrc);
		out.setTestSrc(testSrc);
		status = "Done preparing forecast data.";
		logger.debug(status);
		logger.debug("training data:");
		logger.debug(bufTrain);
		logger.debug("testing data:");
		logger.debug(bufTest);
		cacheFincastResponse.setStatus(requestId, status);
		return out;
	}	
	
	String getRFArffHeader(FincastRequest r) {
		
		String[] attra = (String[])r.getAttributesList().toArray(new String[0]);
		String out = "@relation " + r.getClazz() +  NL;
		for (String attr : attra) {
			out += String.format("@attribute %1$s numeric%2$s", attr, NL);
		}
		out += String.format("@attribute class numeric%1$s@data%1$s", NL);
		return out;
	}
}
