package com.uxl.sites.pyfia.model.cache;

import java.util.TreeMap;

import com.uxl.sites.pyfia.model.fin.FincastResponse;


public class CacheFincastResponse extends TreeMap<String, FincastResponse> {

	public static final long serialVersionUID = 0L;
	
	public static final Object lock = new Object();
	
	protected static CacheFincastResponse instance = null;
	
	public static CacheFincastResponse getInstance() {
		if (instance==null) {
			synchronized(lock) {
				instance = new CacheFincastResponse();
			}
		}
		return instance;
	}
	
	public FincastResponse get(String requestId) {
		synchronized(lock) {
			return super.get(requestId);
		}
	}
	
	public FincastResponse put(String requestId, FincastResponse response) {
		synchronized(lock) {
			return super.put(requestId, response);
		}
	}
	
	public void setStatus(String requestId, String status) {
		CacheFincastResponse cacheFincastResponse = CacheFincastResponse.getInstance();
		FincastResponse response = cacheFincastResponse.get(requestId);
		if (response!=null) {
			synchronized(response) {
				response.setStatus(status);
			}
		}
	}
}
