package com.uxl.sites.pyfia.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.StringTokenizer;
import java.util.TreeMap;
import java.util.UUID;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.security.Principal;
import java.text.SimpleDateFormat;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;
import org.lc.comm.mail.EmailSender;
import org.lc.frameworks.spring.SpringUtils;
import org.lc.graphics.mxgraph.RelationalDiagram;
import org.lc.misc.DateUtils;
import org.lc.misc.JsonUtil;
import org.lc.misc.StringUtil;
import org.lc.model.CKey;
import org.lc.web.annotations.MVCRequestHandler;
import org.lc.web.annotations.RestfulRequestHandler;
import org.lc.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;

import com.uxl.sites.pyfia.controller.FincastProcessor;
import com.uxl.sites.users.IUsersGeneric;
import com.uxl.sites.users.exceptions.UserException;
import com.uxl.sites.pyfia.model.EmailResponse;
import com.uxl.sites.pyfia.model.FincastResponseDTO;
import com.uxl.sites.pyfia.model.GAdParams;
import com.uxl.sites.pyfia.model.GenericResponse;
import com.uxl.sites.pyfia.model.adapter.UsersAdapter;
import com.uxl.sites.pyfia.model.db.Users;
import com.uxl.sites.pyfia.model.db.UsersHome;
import com.uxl.sites.pyfia.model.fin.FincastResponse;
import com.uxl.sites.pyfia.model.fin.ForecastRequest;

import org.springframework.mobile.device.Device;
import org.springframework.mobile.device.DeviceUtils;
import org.springframework.mobile.device.site.SitePreference;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.support.RequestContextUtils;


/**
 * Annotation-driven <em>MultiActionController</em> that handles all non-form
 * URL's.
 */
@Controller
public class PyfiaController extends BaseController {
	HttpEntity  utils;
	@Autowired
	private FincastProcessor proc;

	@Autowired
	@Resource
	UsersAdapter usersAdapter;
	
	@Autowired
	EmailSender emailSender;

	protected final Log logger = LogFactory.getLog(getClass());
	private static final SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
	public PyfiaController() {
	}
	
	private static final String KEY_DEVICE = "Device.Key";

	/**
	 * Custom handler for the welcome view.
	 * <p>
	 * Note that this handler relies on the RequestToViewNameTranslator to
	 * determine the logical view name based on the request URL: "/welcome.do"
	 * -&gt; "welcome".
	 */
	@RequestMapping("/")
	@MVCRequestHandler
	public String handleIndex(HttpServletRequest request) {
		Device device = DeviceUtils.getCurrentDevice(request);
		setSessionAttribute(KEY_DEVICE, device);
		HttpSession session = request.getSession(true);
		return "index_bootstrap";
	}
	
	@RequestMapping("/logout")
	@MVCRequestHandler
	public void hanleLogout(HttpServletRequest request) {
		request.getSession().invalidate();
	}

	@ModelAttribute("device")
	public String getDevice(HttpServletRequest request) {
		Device device = DeviceUtils.getCurrentDevice(request);
		if (device!=null) {
			if (device.isNormal()) {
				logger.info(String.format("device at %1$s is %2$s ", request.getRemoteAddr(), "normal"));
				return "normal";
			}
			if (device.isMobile()) {
				logger.info(String.format("device at %1$s is %2$s ", request.getRemoteAddr(), "mobile"));
				return "mobile";
			}
			if (device.isTablet()) {
				logger.info(String.format("device at %1$s is %2$s ", request.getRemoteAddr(), "tablet"));
				return "tablet";
			}
		}
		logger.info(String.format("device at %1$s is null", request.getRemoteAddr()));
		return "normal";
	}
	
	@RequestMapping("/channel")
	@MVCRequestHandler
	public String handleChannel() {
		return "channel";
	}

	@RequestMapping("/gad")
	@MVCRequestHandler
	public String handleGad(@RequestParam("colorFrom") String colorFrom,
		@RequestParam("colorTo") String colorTo, Model model) {
		GAdParams p = new GAdParams(colorFrom, colorTo);
		model.addAttribute("GAdParams", p);
		return "gad";
	}

	@RestfulRequestHandler
	@RequestMapping(value="/contactus", method=RequestMethod.POST)
	//public FincastResponse forecastHandler(@RequestBody ForecastRequest request) {
	public @ResponseBody EmailResponse handleContactUs(@RequestParam("from") String from,
			@RequestParam("subj") String subject,
			@RequestParam("msg") String msg) {
		EmailResponse resp = new EmailResponse();
		try {
			emailSender.sendEmail(from, subject, msg, new String[]{"tradrejoe@gmail.com", "mgzheng@yahoo.com"});
		} catch(Exception e) {
			resp.setMessage(e.getMessage());
		}
		return resp;
	}

	private static GenericResponse RESPONSE_OK = new GenericResponse();
	
	@RestfulRequestHandler
	@RequestMapping(value="/stat/{cmd}", method=RequestMethod.GET)
	public @ResponseBody GenericResponse handleStat(@PathVariable("cmd") String cmd) {
		CMD ecmd = CMD.valueOf(cmd);
		String loginName = SpringUtils.getSessionAttribute(IUsersGeneric.LOGIN_NAME)+"";
		try {
			switch(ecmd) {
				case IS_LOGIN:
					usersAdapter.isLoginned();
				case IS_REGISTERED:
					usersAdapter.isRegistered(loginName);
				case IS_SUBSCRIBED:
					usersAdapter.isSubscribed(loginName);
			}
		} catch(UserException e) {
			return e.toResponse();
		}
		return RESPONSE_OK;
	}

	@RestfulRequestHandler
	@RequestMapping(value="/forecast/{cls}/{attrib}/{dt}/{hist}/{sd}/{img}", method=RequestMethod.GET)
	//public FincastResponse forecastHandler(@RequestBody ForecastRequest request) {
	public @ResponseBody FincastResponseDTO handleRestfulPredict(@PathVariable("cls") String cls,
			@PathVariable("attrib") String attrib,
			@PathVariable("dt") String dt,
			@PathVariable("hist") Integer hist,
			@PathVariable("sd") String sd,
			@PathVariable("img") Integer img,
			HttpServletRequest request) {
		return _predict(cls, attrib, dt, hist, sd, img, request);
	}

	@RestfulRequestHandler
	@RequestMapping(value="/forecast", method=RequestMethod.POST)
	//public FincastResponse forecastHandler(@RequestBody ForecastRequest request) {
	public @ResponseBody FincastResponseDTO handlePredict(@RequestParam("cls") String cls,
			@RequestParam("attrib") String attrib,
			@RequestParam("dt") String dt,
			@RequestParam("hist") Integer hist,
			@RequestParam("sd") String sd,
			@RequestParam("img") Integer img,
			HttpServletRequest request) {

		return _predict(cls, attrib, dt, hist, sd, img, request);
	}
	
	static final String UNKNOWN = "unknown";
	
	public static final String IMG_PATH = "/resources/images/correlation/";
	
	protected FincastResponseDTO _predict(String icls, String iattrib, String idt, Integer hist, String sd, 
			Integer img, HttpServletRequest httpreq) {
		String dt = URLDecoder.decode(idt);
		String cls = StringUtil.urlDecode(icls);
		String attrib = StringUtil.urlDecode(iattrib);
		ForecastRequest request = new ForecastRequest(); //cls, attrib, odt, rng, hist * 252, osd);
		FincastResponse response = new FincastResponse();
		try {
			Date today = DateUtils.getDateNotime();
			Date odt = DateUtils.getDateNotime();
			try {
				odt = sdf.parse(dt);
			} catch(Throwable e) {
				e.printStackTrace();
				odt = DateUtils.getDateNotime();
			}
			Integer rng = DateUtils.getDiffTradingDays(today, odt);
			if (rng<=0)
				rng = DateUtils.getDiffDays(today, odt);
			Boolean osd = Boolean.parseBoolean(sd);
			attrib = attrib.equalsIgnoreCase(UNKNOWN)?"":attrib;
			logger.debug("attribxx=" + attrib);
			boolean attribHasClz = false;
			try {
				StringTokenizer atoks = new StringTokenizer(attrib, ",");
				while (atoks.hasMoreTokens()) {
					String tmpattr = atoks.nextToken().trim();
					if (tmpattr.equalsIgnoreCase(cls)) attribHasClz = true;
				}
				if (!attribHasClz) {
					if (attrib != null && !attrib.trim().equals("")) {
						attrib += "," + cls;
					} else {
						attrib = cls;
					}
				}
			} catch(Exception e) {}
			request.setAttributes(attrib);
			request.setClazz(cls);
			request.setCase(odt);
			request.setForecastRange(rng);
			request.setHistory(hist * FincastProcessor.TRADING_DAYS_YEAR);
			request.setSd(osd);
			request.setTarget(dt);
			HttpSession session = SpringUtils.session();
			request.setRequestId(session!=null ? session.getId() : UUID.randomUUID().toString());
			logger.debug("request=" + JsonUtil.serialize(request));
			response = proc.executeSingleThreadedRF(request, true);
			logger.debug("response=" + JsonUtil.serialize(response));
		} catch(Throwable ex) {
			response.setException(ex.getMessage());
			logger.error(ex.getMessage(), ex);
		}
		if (img != 1) return new FincastResponseDTO(response,  null);
		HttpSession sess = httpreq.getSession();
		String imgpath = sess.getServletContext().getRealPath(IMG_PATH);
		String imgfilename = sess.getId() + "_"+ GregorianCalendar.getInstance().getTime().getTime() + ".png";
		imgpath += (!imgpath.endsWith(File.separator) ? File.separator : "") + imgfilename;
		RelationalDiagram.drawBase64(response.getCorrGraphLinks(), imgpath);
		return new FincastResponseDTO(response,  IMG_PATH + imgfilename);
	}

	@MVCRequestHandler
	@RequestMapping(value = "/download/{type}", method = RequestMethod.GET)
	public void getFile(
	    @PathVariable("type") String fileName,
	    HttpServletResponse response, HttpServletRequest request) {

		//throw new RuntimeException("Not subscribed.");
	    try {

	      response.setContentType("text/csv");
	      response.addHeader("content-disposition", "attachment; filename=data.csv");
	      OutputStream out = response.getOutputStream();
	      int len = 0;
	      if (fileName!=null && fileName.equalsIgnoreCase("corr")) {
		      TreeMap<CKey, Double> dfinCorr = proc.getDfinCorr();
		      logger.debug("/download/corr, " + dfinCorr.keySet().size() + " records.");
		      String buf = "symbol,idx,lag,years,correlation";
		      byte[] b = buf.getBytes();
		      out.write(b, 0, b.length);
		      for (CKey key : dfinCorr.keySet()) {
		    	  Double val = dfinCorr.get(key);
		    	  buf = JsonUtil.toString(key);
		    	  buf += val + "\r\n";
		    	  //logger.debug("/download/corr, writing " + buf);
		    	  b = buf.getBytes();
		    	  out.write(b, 0, b.length);
		    	  len += b.length;
		      }
	      }
	      response.setContentLength(len);
	      out.flush();
	      out.close();
	      response.flushBuffer();
	    } catch (IOException ex) {
	      logger.info("Error writing file to output stream. Filename was '" + fileName + "'");
	      throw new RuntimeException("IOError writing file to output stream");
	    }

	}

	@RestfulRequestHandler
	@RequestMapping(value="/signin", method=RequestMethod.POST)
	public @ResponseBody GenericResponse signin(@RequestParam("uid") String uid, @RequestParam("pwd") String pwd) {
		return null;
	}

	public static enum CMD {
		IS_LOGIN (0),
		IS_REGISTERED(1),
		IS_SUBSCRIBED(2);
		int cmd;
		CMD(int stat) { this.cmd = cmd; }
		public int getValue() { return this.cmd; }
	}

	public static enum STAT_KEY {
		LOGIN_NAME (0);
		int key;
		STAT_KEY(int key) { this.key = key; }
		public int getValue() { return this.key; }
	}

	public static enum RESPONSES {
		OK (0, "OK"),
		NOT_LOGGED_IN (1, "Not logged in."),
		NOT_REGISTERED (2, "Not registered."),
		NOT_SUBSCRIBED (3, "Not subscribed.");
		int code; String msg;
		RESPONSES(int code, String msg) {
			this.code = code;
			this.msg = msg;
		}
		public int getCode() { return code; }
		public String getMsg() { return msg; }
		public GenericResponse getResponse() { return new GenericResponse(code, msg); }
	}

	@ModelAttribute("fullui")
	public boolean fullui() {
		return true;
	}
	
}
