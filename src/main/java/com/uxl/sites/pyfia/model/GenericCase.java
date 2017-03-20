package com.uxl.sites.pyfia.model;

import java.util.Date;

public class GenericCase<C, V> {
	public C getCse() {
		return cse;
	}
	public void setCse(C cse) {
		this.cse = cse;
	}
	public void setCse(Double cse) {
		this.cse = (C)cse;
	}
	public V getVal() {
		return val;
	}
	public void setVal(V val) {
		this.val = val;
	}
	public void setVal(Double val) {
		this.val = (V)val;
	}
	C cse;
	V val;
	public GenericCase() {
		
	}
	public GenericCase(C cse, V val) {
		this.cse = cse;
		this.val = val;
	}
}
