package com.uxl.sites.pyfia.model.db;

// Generated Jun 30, 2013 12:13:50 PM by Hibernate Tools 3.4.0.CR1

import java.util.Date;

/**
 * DfinCorrId generated by hbm2java
 */
public class DfinCorrId implements java.io.Serializable {

	private String symbol;
	private String idx;
	private int lag;
	private double years;
	private double correlation;
	private Date lastUpdated;

	public DfinCorrId() {
	}

	public DfinCorrId(String symbol, String idx, int lag, double years,
			double correlation, Date lastUpdated) {
		this.symbol = symbol;
		this.idx = idx;
		this.lag = lag;
		this.years = years;
		this.correlation = correlation;
		this.lastUpdated = lastUpdated;
	}

	public String getSymbol() {
		return this.symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getIdx() {
		return this.idx;
	}

	public void setIdx(String idx) {
		this.idx = idx;
	}

	public int getLag() {
		return this.lag;
	}

	public void setLag(int lag) {
		this.lag = lag;
	}

	public double getYears() {
		return this.years;
	}

	public void setYears(double years) {
		this.years = years;
	}

	public double getCorrelation() {
		return this.correlation;
	}

	public void setCorrelation(double correlation) {
		this.correlation = correlation;
	}

	public Date getLastUpdated() {
		return this.lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof DfinCorrId))
			return false;
		DfinCorrId castOther = (DfinCorrId) other;

		return ((this.getSymbol() == castOther.getSymbol()) || (this
				.getSymbol() != null && castOther.getSymbol() != null && this
				.getSymbol().equals(castOther.getSymbol())))
				&& ((this.getIdx() == castOther.getIdx()) || (this.getIdx() != null
						&& castOther.getIdx() != null && this.getIdx().equals(
						castOther.getIdx())))
				&& (this.getLag() == castOther.getLag())
				&& (this.getYears() == castOther.getYears())
				&& (this.getCorrelation() == castOther.getCorrelation())
				&& ((this.getLastUpdated() == castOther.getLastUpdated()) || (this
						.getLastUpdated() != null
						&& castOther.getLastUpdated() != null && this
						.getLastUpdated().equals(castOther.getLastUpdated())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getSymbol() == null ? 0 : this.getSymbol().hashCode());
		result = 37 * result
				+ (getIdx() == null ? 0 : this.getIdx().hashCode());
		result = 37 * result + this.getLag();
		result = 37 * result + (int) this.getYears();
		result = 37 * result + (int) this.getCorrelation();
		result = 37
				* result
				+ (getLastUpdated() == null ? 0 : this.getLastUpdated()
						.hashCode());
		return result;
	}

}
