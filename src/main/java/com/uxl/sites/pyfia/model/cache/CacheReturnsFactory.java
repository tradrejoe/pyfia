package com.uxl.sites.pyfia.model.cache;

import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.lc.model.CKey;

import com.uxl.sites.pyfia.model.fin.FinCaseList;

public class CacheReturnsFactory {

	static CacheReturns cacheFutureReturns = new CacheReturns();
	static CacheReturns cachePastReturns = new CacheReturns();
	static Lock lock = new ReentrantLock();
	
	public static List<FinCaseList> getFutureReturns(CKey key) {
		boolean locked = lock.tryLock();
		if (locked) {
			return cacheFutureReturns.get(key);
		} else {
			return null;
		}
	}
	
	public static List<FinCaseList> getPastReturns(CKey key) {
		boolean locked = lock.tryLock();
		if (locked) {
			return cachePastReturns.get(key);
		} else {
			return null;
		}		
	}
	
	public static void setFutureReturns(CKey key, List<FinCaseList> l) {
		boolean locked = lock.tryLock();
		if (locked) {
			cacheFutureReturns.put(key, l);
		}
	}
	
	public static void setPastReturns(CKey key, List<FinCaseList> l) {
		boolean locked = lock.tryLock();
		if (locked) {
			cachePastReturns.put(key, l);
		}
	}
}
