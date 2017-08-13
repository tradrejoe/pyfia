package com.uxl.sites.pyfia.web;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.lc.misc.DateUtils;
import org.lc.misc.ExceptionUtil;
import org.springframework.stereotype.Component;

import com.uxl.sites.pyfia.model.fin.FinCaseHList;
import com.uxl.sites.pyfia.model.fin.FinCaseLList;
import com.uxl.sites.pyfia.model.fin.FinCaseList;
import com.uxl.sites.pyfia.model.fin.FinCaseOList;
import com.uxl.sites.pyfia.model.fin.FinCaseSDList;


@Component
public class YPriceDownloader extends AbstractPriceDownloader {

	public static final SimpleDateFormat SDF = new SimpleDateFormat("MM/dd/yyyy");
	
	public static final int HISTORY_YEARS = -50;
	Logger logger = Logger.getLogger(YPriceDownloader.class);

	public YPriceDownloader() {
	}

	public List<FinCaseList> getFinCaseList(String cls, Object... flags) {
		Calendar calto = GregorianCalendar.getInstance();
		Calendar calfrom = GregorianCalendar.getInstance();
		calfrom.add(Calendar.YEAR, HISTORY_YEARS);
		return getFinCaseList(cls, calfrom, calto, flags);
	}

	//public const string TemplateYFUri = "http://ichart.finance.yahoo.com/table.csv?s={0}&a={1}&b={2}&c={3}&d={4}&e={5}&f={6}&g=d&ignore";
	//return String.Format(TemplateYFUri, symbol, m0, d0, y0, m1, d1, y1);

	//public static final String TemplateYFUrl = "http://ichart.finance.yahoo.com/table.csv?s=%1$s&a=%2$tm&b=%2$td&c=%2$tY&d=%3$tm&e=%3$td&f=%3$tY&g=d&ignore";

	public static final String TemplateYFUrl = "http://ichart.finance.yahoo.com/table.csv?s=%1$s&d=%2$d&e=%3$d&f=%4$d&g=d&a=%5$d&b=%6$d&c=%7$d&ignore=.csv";

	public static final String TemplateYFLast = "http://finance.yahoo.com/d/quotes.csv?s=%1$s&f=l1";
	
	public static final String TemplateYahooFinanceQuoteHistory = "https://finance.yahoo.com/quote/%1$s/history";
	
	public static final String TemplateYahooFinancePriceHistory = "https://query1.finance.yahoo.com/v7/finance/download/%1$s?period1=%2$d&period2=%3$d&interval=1d&events=history&crumb=%4$s";

//	public static String getFinCaseListUrlYF(String cls, Calendar d0, Calendar d1) {
//		return String.format(TemplateYFUrl, cls, d0, d1);
//	}

	public static String getFinCaseListUrlYF(String cls, int m0, int dt0, int y0, int m1, int dt1, int y1) {
		return String.format(TemplateYFUrl, cls, m0, dt0, y0, m1, dt1, y1);
	}

	public List<FinCaseList> getFinCaseList(String cls, Calendar d0, Calendar d1, Object... flags) {
		List<FinCaseList> ret = new ArrayList<FinCaseList>();
		ret.add(new FinCaseList());
		ret.add(new FinCaseSDList());
		if (flags.length>0 && flags[0] instanceof Boolean && (Boolean)flags[0]) {
			for (Class clz : new Class[]{FinCaseOList.class, FinCaseHList.class, FinCaseLList.class}) {
				try {
					ret.add((FinCaseList)clz.newInstance());
				} catch(InstantiationException | IllegalAccessException iae) {
					logger.error(String.format("Cannot instantiate new instance of the %1$s class", clz.getName()));
				}
			}
		}
		//String url = getFinCaseListUrlYF(cls, d0, d1);
//		int m0 = d1.get(Calendar.MONTH);
//		int dt0 = d1.get(Calendar.DAY_OF_MONTH);
//		int y0 = d1.get(Calendar.YEAR);
//		int m1 = d0.get(Calendar.MONTH);
//		int dt1 = d0.get(Calendar.DAY_OF_MONTH);
//		int y1 = d0.get(Calendar.YEAR);
//		InputStream in = null;
//		URLConnection conn = null;
//		String pcls = cls;
//		try {
//			pcls = URLEncoder.encode(cls, "UTF-8");
//		} catch(Exception e) {}
//		String url = getFinCaseListUrlYF(pcls, m0, dt0, y0, m1, dt1, y1);
//		//HttpClient httpClient = new HttpClient();
//		logger.debug("url:"+url);
		
    	String symbol = "FB";
    	String CRUMB_LABEL = "\"CrumbStore\":{\"crumb\":\"";
        String responseBody = null;
        byte[] responseByteArray = null;
        CloseableHttpClient httpclient = HttpClients.createDefault();
        
        try {

        	String url = String.format(TemplateYahooFinanceQuoteHistory, symbol);
            HttpGet httpget = new HttpGet(url);

            logger.debug("Executing request " + httpget.getRequestLine());
            //Cookie CookieB = null;
            String crumb = null;
            CloseableHttpResponse response = null;
            HttpClientContext context = null;
            
            //Get Yahoo Finance B cookie
            try {
                context = HttpClientContext.create();
                response = httpclient.execute(httpget, context);
//                CookieStore cookieStore = context.getCookieStore();
//                List<Cookie> cookies = cookieStore.getCookies();
//                for (Cookie c : cookies) {
//                	logger.debug(String.format("cookie %1$s=%2$s", c.getName(), c.getValue()));
//                	if (c.getName()!=null && c.getName().equals("B")) {
//                		CookieB = c;
//                		break;
//                	}
//                }
                HttpEntity entity = response.getEntity();
                responseBody = EntityUtils.toString(entity);
                logger.debug("----------------------------------------");
                //logger.debug(responseBody);
                Pattern pcrmb = Pattern.compile("\"CrumbStore\":\\{\"crumb\":\"(?<crumb>[^\"]+)\"\\}");
                Matcher mcrmb = pcrmb.matcher(responseBody);
                if (mcrmb.find()) {
                	//"CrumbStore":{"crumb":"EJfWEpsiQ.1"}
                	String grpcrumb = mcrmb.group();
                	logger.debug("grpcrumb="+grpcrumb);
                	crumb = grpcrumb.substring(CRUMB_LABEL.length(), grpcrumb.length()-2);
                	logger.debug("crumb="+crumb);
                	
                }
            } catch(Exception e) {
            	logger.error("YPriceDownloader::getFinCaseList(), cannot get yahoo finance CrumbStore value for symbol"+symbol+".");
            	logger.error(ExceptionUtil.getStack(e));
            } finally {
            	try {
            		if (response!=null) response.close();
            	} catch(Exception e) {}
            }
            
            url = String.format(TemplateYahooFinancePriceHistory, symbol, Math.round(d0.getTime().getTime()/1000), Math.round(d1.getTime().getTime()/1000), URLEncoder.encode(crumb));
            httpget = new HttpGet(url);
            try {
                response = httpclient.execute(httpget, context);
                HttpEntity entity = response.getEntity();
                responseByteArray = EntityUtils.toByteArray(entity);
            } catch(Exception e) {
            	logger.error(String.format("YPriceDownloader::getFinCaseList(), cannot get yahoo finance price history for symbol %1$s for dates %2$s to %3$s.", 
            			symbol, SDF.format(d0.getTime()), SDF.format(d1.getTime())));
            	logger.error(ExceptionUtil.getStack(e));            	
            } finally {
            	try {
            		if (response!=null) response.close();
            	} catch(Exception e) {}
            }
        } finally {
        	try {
        		if (httpclient!=null) httpclient.close();
        	} catch(Exception e) {}
        }		
		
        //Download Yahoo Finance Price History
		try {
//			conn = (new URL(url)).openConnection();
//			in = conn.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(responseByteArray==null ? new byte[] {} : responseByteArray)));
			String line = reader.readLine();
			while ((line = reader.readLine()) != null) {
				Date cas = null;
				Double adjclose, vol, open, high, low;
				adjclose = vol = open = high = low = null;
				try {
					String[] toks = line.split(",");
					cas = DateUtils.sdfmysql.parse(toks[0]);
					adjclose = Double.parseDouble(toks[5]);
					vol = Double.parseDouble(toks[6]);
					if (flags.length>0 && flags[0] instanceof Boolean && (Boolean)flags[0]) {
						open = Double.parseDouble(toks[1]);
						high = Double.parseDouble(toks[2]);
						low = Double.parseDouble(toks[3]);
					}
				} catch(Exception e) {
					logger.error("Error parsing historical price for "+cls+", line="+line);
				}
				if (cas!=null) {
					if (adjclose!=null) ret.get(0).put(cas, adjclose);
					if (vol!=null) ret.get(1).put(cas, vol);
					if (flags.length>0 && flags[0] instanceof Boolean && (Boolean)flags[0]) {
						if (open!=null) ret.get(2).put(cas, open);
						if (high!=null) ret.get(3).put(cas, high);
						if (low!=null) ret.get(4).put(cas, low);
					}
				}
			}
		} catch(Exception e) {
			logger.error(ExceptionUtil.getStack(e));
			logger.error("Cannot get yahoo finance historical prices for " + cls, e);
		} finally {
//		    if (in != null) {
//		        try {
//		            in.close();
//		        } catch (IOException e) {
//		        }
//		    }
//		    if (conn != null) {
//		        try {
//		        	((HttpURLConnection)conn).disconnect();
//		        } catch(Exception e) {}
//		    }
		}
		return ret;
	}

	public double getLast(String cls) {
		double ret = 0.0;
		InputStream is = null;
		try {
			String url = String.format(TemplateYFLast, cls);
			URLConnection conn = (new URL(url)).openConnection();
			is = conn.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			String line = reader.readLine();
			return Double.parseDouble(line);
		} catch(Exception e) {
			logger.error(ExceptionUtil.getStack(e));
		} finally {
			try {
				if (is!=null) is.close();
			} catch(Exception e) {
				logger.error(ExceptionUtil.getStack(e));
			}
		}
		return ret;
	}
}
