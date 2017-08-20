package com.uxl.sites.pyfia;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

/**
 * This example demonstrates the use of the {@link ResponseHandler} to simplify
 * the process of processing the HTTP response and releasing associated resources.
 */
public class YahooFinance201708Test {

    public final static void main(String[] args) throws Exception {
    	String symbol = "FB";
    	SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
    	Date d0 = sdf.parse("01/01/2015");
    	Date d1 = GregorianCalendar.getInstance().getTime();
    	String CRUMB_LABEL = "\"CrumbStore\":{\"crumb\":\"";
    	
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {
        	String templateYahooFinanceQuoteHistory = "https://finance.yahoo.com/quote/%1$s/history";
        	String templateYahooFinancePriceHistory = "https://query1.finance.yahoo.com/v7/finance/download/%1$s?period1=%2$d&period2=%3$d&interval=1d&events=history&crumb=%4$s";
        	String url = String.format(templateYahooFinanceQuoteHistory, symbol);
            HttpGet httpget = new HttpGet(url);

            System.out.println("Executing request " + httpget.getRequestLine());
            Cookie CookieB = null;
            String crumb = null;

            HttpClientContext context = HttpClientContext.create();
            CloseableHttpResponse response = httpclient.execute(httpget, context);
            try {
                CookieStore cookieStore = context.getCookieStore();
                List<Cookie> cookies = cookieStore.getCookies();
                for (Cookie c : cookies) {
                	System.out.println(String.format("cookie %1$s=%2$s", c.getName(), c.getValue()));
                	if (c.getName()!=null && c.getName().equals("B")) {
                		CookieB = c;
                		break;
                	}
                }
                HttpEntity entity = response.getEntity();
                String responseBody = EntityUtils.toString(entity);
                System.out.println("----------------------------------------");
                //System.out.println(responseBody);
                Pattern pcrmb = Pattern.compile("\"CrumbStore\":\\{\"crumb\":\"(?<crumb>[^\"]+)\"\\}");
                Matcher mcrmb = pcrmb.matcher(responseBody);
                if (mcrmb.find()) {
                	//"CrumbStore":{"crumb":"EJfWEpsiQ.1"}
                	String grpcrumb = mcrmb.group();
                	System.out.println("grpcrumb="+grpcrumb);
                	crumb = grpcrumb.substring(CRUMB_LABEL.length(), grpcrumb.length()-2);
                	System.out.println("crumb="+crumb);
                	
                }
            } finally {
                response.close();
            }
            
            url = String.format(templateYahooFinancePriceHistory, symbol, Math.round(d0.getTime()/1000), Math.round(d1.getTime()/1000), crumb);
            httpget = new HttpGet(url);
            response = httpclient.execute(httpget, context);
            try {
                HttpEntity entity = response.getEntity();
                String responseBody = EntityUtils.toString(entity);
                System.out.println("-------------------PRICE HISTORY ---------------------");
                System.out.println(responseBody);
            } finally {
                response.close();
            }
        } finally {
            httpclient.close();
        }
    }

}
