package com.uxl.sites.pyfia.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;
import org.apache.log4j.Logger;
import org.lc.misc.DateUtils;
import org.lc.misc.ExceptionUtil;
import org.lc.misc.FileUtil;
import org.lc.model.CKey;
import org.lc.model.CorrGraphLink;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.uxl.sites.pyfia.IClsDS;
import com.uxl.sites.pyfia.PyfiaTest;
import com.uxl.sites.pyfia.jdbc.ClsDS;
import com.uxl.sites.pyfia.model.DbBatch;
import com.uxl.sites.pyfia.model.DbCmd;
import com.uxl.sites.pyfia.model.cache.CacheFinCls;
import com.uxl.sites.pyfia.model.cache.CacheFincastResponse;
import com.uxl.sites.pyfia.model.fin.FinCaseList;
import com.uxl.sites.pyfia.model.fin.FincastRequest;
import com.uxl.sites.pyfia.model.fin.FincastResponse;
import com.uxl.sites.pyfia.model.fin.ForecastRequest;
import com.uxl.sites.pyfia.model.fin.IForecastRequest;
import com.uxl.sites.pyfia.model.spm.svm;
import com.uxl.sites.pyfia.web.AbstractPriceDownloader;
import com.uxl.sites.pyfia.web.YPriceDownloader;

import weka.classifiers.evaluation.Evaluation;
import weka.classifiers.trees.RandomForest;
import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;

//import weka.classifiers.Evaluation;
//import weka.classifiers.bayes.BayesNet;

@Component
public class FincastProcessor implements IForecastProcessor {

	@Autowired
	IClsDS clsDs;

	@Autowired
	YPriceDownloader pd;

	@Autowired
	CacheFinCls cacheFinCls;

	public static final String CMD_DFIN_CORR = "insert into dfin_corr select '%1$s', '%2$s', %3$d, %4$f, %5$f, now() from dual where not exists (select 1 from dfin_corr where symbol = '%1$s' and idx = '%2$s' and lag = %3$d and years = %4$f);";

	public static final int TRADING_DAYS_YEAR = 252;

	private Logger logger = Logger.getLogger(FincastProcessor.class);

	public FincastProcessor() {
	}

	public IClsDS getClsDs() {
		return clsDs;
	}

	public void setClsDs(ClsDS clsDs) {
		this.clsDs = clsDs;
	}

	public YPriceDownloader getPd() {
		return pd;
	}

	public void setPd(YPriceDownloader pd) {
		this.pd = pd;
	}

	@Deprecated
	public static String[] getOptions(FincastRequest request) {
		String strlstattr = "";
		int i = 1;
		int sz = request.getAttributesList().size();
		for (i = 1; i < sz; i++) {
			strlstattr += "," + i;
		}
		if (i == sz)
			strlstattr += i;
		return new String[] { "-k", "-p", strlstattr, "-Q", "weka.classifiers.bayes.net.search.local.K2", "--", "-P",
				"1", "-S", "BAYES", "-E", "weka.classifiers.bayes.net.estimate.SimpleEstimator", "--", "-A", "0.99" // "0.000001"
		};
	}

	@Deprecated
	public FincastResponse executeSingleThreaded(IForecastRequest request) {
		IClsDS clsDS = this.clsDs;
		AbstractPriceDownloader apd = this.pd;
		ForecastRequest req = (ForecastRequest) request;
		logger.debug("FincastProcessor::execute(), clsDS=" + clsDS + ";pd=" + pd);

		String requestId = req.getRequestId();
		logger.debug("Launching FincastProcessor::execute() thread for requestId=" + requestId);
		FincastResponse resp = null;
		try {
			FincastRequest freq = cacheFinCls.prepareFincastRequest(req);
			// TODO: restore later
			// resp = Evaluation.evaluateModel(new BayesNet(), freq, getOptions(freq));
			resp = null;
			resp.setStatus(FincastResponse.STATUS_DONE);
		} catch (Exception e) {
			logger.error(ExceptionUtil.getStack(e));
			logger.error("error", e);
		}
		return resp;
	}

	public static final int BUF_SIZE = 4096;

	@Deprecated
	public void genFilesSvm(IForecastRequest request) {
		IClsDS clsDS = this.clsDs;
		AbstractPriceDownloader apd = this.pd;
		ForecastRequest req = (ForecastRequest) request;
		logger.debug("FincastProcessor::genFilesSvm(), clsDS=" + clsDS + ";pd=" + pd);

		String requestId = req.getRequestId();
		logger.debug("Launching FincastProcessor::genFilesSvm() thread for requestId=" + requestId);
		FincastResponse resp = req.prepareResponse();
		String cls = req.getClazz();
		String attr = "," + req.getAttributes();
		attr = attr.replace(',', '_');
		attr = attr.replace('^', 'I');
		FincastRequest freqr = null;
		try {
			freqr = cacheFinCls.prepareFincastRequestSvm(req, true);

		} catch (Exception e) {
			logger.error(ExceptionUtil.getStack(e));
			logger.error("Cannot prepare request, error: " + e.getMessage() + ".", e);
			return;
		}
		try {
			FileUtil.writeFile("train_" + cls + attr + ".arff", freqr.getTrainingSet());
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Cannot generate training file, error: " + e.getMessage() + ".", e);
		}
		try {
			FileUtil.writeFile("test_" + cls + attr + ".arff", freqr.getTestSet());
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Cannot generate test file, error: " + e.getMessage() + ".", e);
		}
	}

	public void genFilesRF(IForecastRequest request) {
		IClsDS clsDS = this.clsDs;
		AbstractPriceDownloader apd = this.pd;
		ForecastRequest req = (ForecastRequest) request;
		logger.debug("FincastProcessor::genFilesRF(), clsDS=" + clsDS + ";pd=" + pd);

		String requestId = req.getRequestId();
		logger.debug("Launching FincastProcessor::genFilesSvm() thread for requestId=" + requestId);
		FincastResponse resp = req.prepareResponse();
		String cls = req.getClazz();
		String attr = "," + req.getAttributes();
		attr = attr.replace(',', '_');
		attr = attr.replace('^', 'I');
		FincastRequest freqr = null;
		try {
			freqr = cacheFinCls.prepareFincastRequestRF(req);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Cannot prepare request, error: " + e.getMessage() + ".", e);
			return;
		}
		try {
			FileUtil.writeFile("train_" + cls + attr + ".arff", freqr.getTrainingSet());
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Cannot generate training file, error: " + e.getMessage() + ".", e);
		}
		try {
			FileUtil.writeFile("test_" + cls + attr + ".arff", freqr.getTestSet());
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Cannot generate test file, error: " + e.getMessage() + ".", e);
		}
	}

	@Deprecated
	public FincastResponse executeSingleThreadedSvm(IForecastRequest request) {
		IClsDS clsDS = this.clsDs;
		AbstractPriceDownloader apd = this.pd;
		ForecastRequest req = (ForecastRequest) request;
		logger.debug("FincastProcessor::execute(), clsDS=" + clsDS + ";pd=" + pd);

		String requestId = req.getRequestId();
		logger.debug("Launching FincastProcessor::execute() thread for requestId=" + requestId);
		FincastResponse resp = req.prepareResponse();
		try {
			FincastRequest freq = cacheFinCls.prepareFincastRequestSvm(req);
			// logger.debug("FincastRequest=" + freq);
			// logger.debug("FincastRequest.Json=" + JsonUtil.serialize(freq));
			// resp = svm.exec(freq);
			resp = svm.exec(freq);
			FincastRequest freqr = cacheFinCls.prepareFincastRequestSvm(req, true);
			FincastResponse respr = svm.exec(freqr, true);
			// logger.debug("FincastResponse_R=" + respr);
			resp.setPredictionString(
					respr.getPredictionString().toLowerCase().indexOf("nan") > -1 ? "0" : respr.getPredictionString());
			resp.setCurVal(respr.getCurVal());
			resp.setPredVal(respr.getPredVal());
			resp.setStatus(FincastResponse.STATUS_DONE);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("error", e);
			resp.setException("Cannot process request, error: " + e.getMessage() + ".");
		}
		return resp;
	}

	public FincastResponse executeSingleThreadedRF(IForecastRequest request, Object... params) {
		IClsDS clsDS = this.clsDs;
		AbstractPriceDownloader apd = this.pd;
		ForecastRequest req = (ForecastRequest) request;
		logger.debug("FincastProcessor::executeSingleThreadedRF(), clsDS=" + clsDS + ";pd=" + pd);

		String requestId = req.getRequestId();
		logger.debug("Launching FincastProcessor::executeSingleThreadedRF() thread for requestId=" + requestId);
		FincastResponse resp = req.prepareResponse();
		FincastRequest freq = null;
		try {
			freq = cacheFinCls.prepareFincastRequestRF(req, params);
			resp = freq.prepareResponse();
			if ((System.getProperty(PyfiaTest.MAVEN_TEST_PREDICTION) + "").equalsIgnoreCase("true")) {
				FileUtil.writeFile("tmptrain.arff", freq.getTrainingSet());
				FileUtil.writeFile("tmptest.arff", freq.getTestSet());
			}
			String out = Evaluation.evaluateModel(new RandomForest(), new String[] { "-p", "0", "-z", "" },
					freq.getTrainingSrc(), freq.getTestSrc());
			resp.setPredictionProb(0.5);
			resp.setPredictionString(out);
			// logger.debug("FincastResponse_R=" + resp);
			resp.setPredictionString(
					resp.getPredictionString().toLowerCase().indexOf("nan") > -1 ? "0" : resp.getPredictionString());
			resp.setCurVal(freq.getCurVal());
			double dout = 0.0;
			double dret = 0.0;
			try {
				dret = Double.parseDouble(resp.getPredictionString());
				dout = resp.getCurVal() * (1.0 + dret);
			} catch (Exception e) {
				e.printStackTrace();
			}
			resp.setPredictionLabel(dret >= 0.0 ? 1 : -1);
			resp.setPredVal(dout);
			resp.setStatus(FincastResponse.STATUS_DONE);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("error", e);
			resp.setException((resp.getException() == null ? "" : resp.getException() + "<br>")
					+ "Cannot process request, error: " + e.getMessage() + ".");
		}
		// testCorrelations(String[] symbols, int[] forecast_ranges, int[] history,
		// String[] indices)
		// correlation graph links
		if (params.length == 0)
			return resp;
		try {
			List<CorrGraphLink> lnks = testCorrelations(new String[] { req.getClazz() },
					new int[] { req.getForecastRange() },
					new int[] { Math.round(req.getHistory() / FincastProcessor.TRADING_DAYS_YEAR) },
					freq.getAttributesList().toArray(new String[] {}), DateUtils.getDateNotime());
			resp.setCorrGraphLinks(lnks);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("error", e);
			resp.setException((resp.getException() == null ? "" : resp.getException() + "<br>")
					+ "Cannot get correlations, error: " + e.getMessage() + ".");
		}
		return resp;
	}

	public FincastResponse execute(IForecastRequest request) {

		CacheFincastResponse cacheFincastResponse = CacheFincastResponse.getInstance();
		FincastResponse response = cacheFincastResponse.get(request.getRequestId());
		if (response == null) {
			response = ((ForecastRequest) request).prepareResponse();
			cacheFincastResponse.put(request.getRequestId(), response);
			final IClsDS clsDS = this.clsDs;
			final AbstractPriceDownloader apd = this.pd;
			final ForecastRequest req = (ForecastRequest) request;
			logger.debug("FincastProcessor::execute(), clsDS=" + clsDS + ";pd=" + pd);
			Thread thread = new Thread(new Runnable() {
				public void run() {

					CacheFincastResponse cacheFincastResponse = CacheFincastResponse.getInstance();
					String requestId = req.getRequestId();
					logger.debug("Launching FincastProcessor::execute() thread for requestId=" + requestId);
					try {
						FincastRequest freq = cacheFinCls.prepareFincastRequest(req);
						FincastResponse resp = freq.prepareResponse();
						cacheFincastResponse.setStatus(requestId, "Forecasting.");
						// TODO: restore later with weka.jar 3.7
						// resp = Evaluation.evaluateModel(new BayesNet(), freq, getOptions(freq));
						resp = null;
						resp.setStatus(FincastResponse.STATUS_DONE);
						// logger.debug("After eval model, requestId= " + freq.getRequestId() + ";
						// resp=" + resp);
						if (resp != null)
							cacheFincastResponse.put(requestId, resp);
					} catch (Exception e) {
						e.printStackTrace();
						logger.error("error", e);
						cacheFincastResponse.setStatus(requestId,
								"Error: " + e.getMessage() + ". Stack: " + ExceptionUtil.getStack(e));
					}
				}
			});
			thread.setDaemon(true);
			thread.start();
		}
		return response;
	}

	public TreeMap<CKey, Double> getDfinCorr() {
		return clsDs.getDfinCorr();
	}

	public List<CorrGraphLink> testCorrelations(String[] symbols, int[] forecast_ranges, int[] history,
			String[] indices, Date dt) {
		logger.debug(String.format("FincastProcessor::testCorrelations() on %1$d symbols...", symbols.length));
		List<CorrGraphLink> out = new ArrayList<CorrGraphLink>();
		PearsonsCorrelation ocorr = new PearsonsCorrelation();
		TreeMap<CKey, Double> dfinCorr = clsDs.getDfinCorr();
		String index = "^GSPC";
		double corr = 0.0;
		for (int s = 0; s < symbols.length; s++) {
			String cls = symbols[s];
			for (int r = 0; r < forecast_ranges.length; r++) {
				int rng = forecast_ranges[r];
				for (int h = 0; h < history.length; h++) {
					Double hist = new Double(history[h]);
					int histdays = history[h] * 252;
					FinCaseList tmpfrl = null;
					try {
						tmpfrl = cacheFinCls.getFutureReturns(cls, rng, dt, histdays, true);
					} catch (Exception e) {
						e.printStackTrace();
					}
					DbBatch dbBatch = new DbBatch();
					Map<CKey, Double> lstCorr = new HashMap<CKey, Double>();
					List<CorrGraphLink> lstLinks = new ArrayList<CorrGraphLink>();
					for (int i = 0; i < indices.length; i++) {
						index = indices[i];
						// if (index.equalsIgnoreCase(cls)) continue;
						CKey ck = new CKey(cls, index, rng, hist);
						Double tmpc = null;
						try {
							tmpc = dfinCorr.get(ck);
						} catch (Exception e) {
						}
						if (tmpc != null) {
							logger.debug("PyfiaTest::testCorrelations(), " + ck + " exists in db, continue...");
							lstLinks.add(new CorrGraphLink(index, cls, tmpc));
							continue;
						}
						List<FinCaseList> tmpfcl = null;
						try {
							tmpfcl = cacheFinCls.getPassReturns(index, rng, dt, histdays, false, true);
						} catch (Exception e2) {
							e2.printStackTrace();
						}
						if (tmpfrl != null && tmpfrl.size() > 0 && tmpfcl != null && tmpfcl.get(0) != null
								&& tmpfcl.get(0).size() > 0) {
							FinCaseList tmpfcl0 = tmpfcl.get(0);
							// logger.debug("tmpfrl=\n"+tmpfrl);
							// logger.debug("tmpfcl0=\n"+tmpfcl0);
							List<Double> af = new ArrayList<Double>();
							List<Double> ap = new ArrayList<Double>();
							for (Date key : tmpfrl.keySet()) {
								Double f = tmpfrl.get(key);
								Double p = tmpfcl0.get(key);
								if (f != null && p != null) {
									af.add(f);
									ap.add(p);
									// logger.debug(key + "," + f + "," + p);
								}
							}
							Double[] adf = af.toArray(new Double[] {});
							Double[] adp = ap.toArray(new Double[] {});
							corr = 0.0;
							try {
								corr = ocorr.correlation(ArrayUtils.toPrimitive(adf), ArrayUtils.toPrimitive(adp));
								logger.info(String.format("correlation\t%1$s\t%2$s\t%3$d\t%4$f\t%5$f", cls, index, rng,
										hist, corr));
								DbCmd cmd = new DbCmd(CMD_DFIN_CORR, cls, index, rng, hist, corr);
								dbBatch.add(cmd);
								CKey key = new CKey(cls, index, rng, hist);
								lstCorr.put(key, corr);
								lstLinks.add(new CorrGraphLink(index, cls, corr));
							} catch (Exception e3) {
								e3.printStackTrace();
							}
							adf = null;
							adp = null;
						}
					} // for indices
					try {
						clsDs.exec(dbBatch);
						for (CKey key : lstCorr.keySet()) {
							clsDs.setDfinCorr(key, lstCorr.get(key));
						}
						out.addAll(lstLinks);
					} catch (Exception e) {
						e.printStackTrace();
					}
//					try {
//						Thread.sleep(TEST_CORRELATION_SLEEP);
//					} catch(InterruptedException e)  {}
					hist = null;
					dbBatch = null;
					tmpfrl = null;
				} // history
			} // range
			cls = null;
		} // symbol, done
		logger.info("done calculating correlation");
		return out;
	}

	@Deprecated
	public static class DataSourceWrapper {
		String relation;
		String[] attr;
		double[][] data;

		public DataSourceWrapper() {
		}

		public DataSourceWrapper(String relation, String[] attr, double[][] data) {
			this.relation = relation;
			this.attr = attr;
			this.data = data;
		}

		ArrayList<Attribute> getAttributes() {
			ArrayList<Attribute> out = new ArrayList<Attribute>();
			for (String a : attr) {
				out.add(new Attribute(a));
			}
			out.add(new Attribute("class"));
			return out;
		}

		public DataSource toDataSource() {
			ArrayList<Attribute> wkattr = getAttributes();
			Instances insts = new Instances(relation, wkattr, 0);
			DataSource out = new DataSource(insts);
			insts.setClassIndex(wkattr.size() - 1);
			for (double[] i : data) {
				DenseInstance inst = new DenseInstance(1.0, i);
				insts.add(inst);
			}
			return out;
		}
	}

	public static void main(String[] args) {
		try {
			DataSourceWrapper trainw = new DataSourceWrapper("AAPL", new String[] { "^IRX", "^NWX", "^SOX", "AAPL" },
					new double[][] { { 1.0, 0.024, 0.022, 0.018, -0.014 }, { -1.0, 0.034, 0.042, 0.041, -0.034 },
							{ 0.0, 0.018, 0.027, 0.02, -0.012 }, { 0.0, 0.004, 0.016, 0.031, 0.038 },
							{ 0.0, 0.014, 0.022, 0.053, 0.018 }, { 0.0, -0.002, 0.0, 0.047, 0.041 },
							{ -1.0, -0.014, 0.013, 0.047, 0.02 }, { -1.0, -0.017, -0.005, 0.038, 0.031 },
							{ -0.5, 0.001, -0.014, 0.026, 0.031 }, { -0.5, -0.004, -0.004, 0.015, 0.053 },
							{ 9.223372036854776E15, 0.005, -0.004, -0.001, 0.047 },
							{ 9.223372036854776E15, 0.03, -0.005, 0.014, 0.047 },
							{ 9.223372036854776E15, 0.031, 0.043, 0.02, 0.038 } });
			DataSourceWrapper testw = new DataSourceWrapper("AAPL", new String[] { "^IRX", "^NWX", "^SOX", "AAPL" },
					new double[][] { { -1.0, 0.009, 0.039, -0.014, 0.01 } });
			System.out.println(Evaluation.evaluateModel(new RandomForest(), new String[] { "-p", "0", "-z", "0" },
					trainw.toDataSource(), testw.toDataSource()));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
