package com.uxl.sites.pyfia.web.listeners;

import java.io.File;
import java.io.FilenameFilter;
import java.util.Set;
import java.util.TreeSet;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;

import com.uxl.sites.pyfia.web.PyfiaController;

public class SessionListener implements HttpSessionListener {

	public static final String KEY_LOGINS = "key.logins";
	Logger logger = Logger.getLogger(SessionListener.class);
	
	public static Set<String> getLogins(HttpSession session) {
		if (session==null) return null;
		ServletContext context = session.getServletContext();
        Set<String> logins = (Set<String>) context.getAttribute(KEY_LOGINS);
        if (logins==null) {
        	logins = new TreeSet<String>();
        	context.setAttribute(KEY_LOGINS, logins);
        }
        return logins;
	}
	
	public void sessionCreated(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		Set<String> logins = SessionListener.getLogins(session);
        if (logins!=null) {
        	String sid = session.getId();
        	logins.add(sid);
        	logger.info(String.format("Session %1$s added to logins", sid));
        }
	}

	public void sessionDestroyed(HttpSessionEvent event) {
		final HttpSession session = event.getSession();
		Set<String> logins = SessionListener.getLogins(session);
        if (logins!=null) {
        	final String sid = session.getId();
        	logins.remove(sid);
        	logger.info(String.format("Session %1$s removed to logins", sid));
        	Thread thread = new Thread(new Runnable() {
        		public void run() {
        			String imgpath = session.getServletContext().getRealPath(PyfiaController.IMG_PATH);
        			File imgdir = new File(imgpath);
        			File[] images = imgdir.listFiles(new FilenameFilter(){
        				public boolean accept(File file, String name) {
        					return name.startsWith(sid);
        				}
        			});
        			if (images!=null && images.length>0) {
        				for (File img : images) {
        					logger.info(String.format("Deleting image %1$s.", img.getName()));
        					img.delete();
        				}
        			}
        		}
        	});
        	thread.setDaemon(true);
        	thread.start();
        	
        }
	}

}
