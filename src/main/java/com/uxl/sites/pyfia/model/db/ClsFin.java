package com.uxl.sites.pyfia.model.db;

// Generated Jun 30, 2013 12:13:50 PM by Hibernate Tools 3.4.0.CR1

/**
 * ClsFin generated by hbm2java
 */
public class ClsFin implements java.io.Serializable {

	private String nm;
	private String nm2;
	private String disp;
	private Integer attr0;
	private Integer attr1;
	private Integer attr2;
	private Integer attr3;

	public ClsFin() {
	}

	public ClsFin(String nm, String nm2, String disp) {
		this.nm = nm;
		this.nm2 = nm2;
		this.disp = disp;
	}

	public ClsFin(String nm, String nm2, String disp, Integer attr0,
			Integer attr1, Integer attr2, Integer attr3) {
		this.nm = nm;
		this.nm2 = nm2;
		this.disp = disp;
		this.attr0 = attr0;
		this.attr1 = attr1;
		this.attr2 = attr2;
		this.attr3 = attr3;
	}

	public String getNm() {
		return this.nm;
	}

	public void setNm(String nm) {
		this.nm = nm;
	}

	public String getNm2() {
		return this.nm2;
	}

	public void setNm2(String nm2) {
		this.nm2 = nm2;
	}

	public String getDisp() {
		return this.disp;
	}

	public void setDisp(String disp) {
		this.disp = disp;
	}

	public Integer getAttr0() {
		return this.attr0;
	}

	public void setAttr0(Integer attr0) {
		this.attr0 = attr0;
	}

	public Integer getAttr1() {
		return this.attr1;
	}

	public void setAttr1(Integer attr1) {
		this.attr1 = attr1;
	}

	public Integer getAttr2() {
		return this.attr2;
	}

	public void setAttr2(Integer attr2) {
		this.attr2 = attr2;
	}

	public Integer getAttr3() {
		return this.attr3;
	}

	public void setAttr3(Integer attr3) {
		this.attr3 = attr3;
	}

}
