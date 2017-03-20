package com.uxl.sites.pyfia.model;

import java.io.Serializable;

public class GAdParams implements Serializable {

		String colorFrom;
		public String getColorFrom() {
			return colorFrom;
		}
		public void setColorFrom(String colorFrom) {
			this.colorFrom = colorFrom;
		}
		public String getColorTo() {
			return colorTo;
		}
		public void setColorTo(String colorTo) {
			this.colorTo = colorTo;
		}
		String colorTo;
		
		public GAdParams() {}
		
		public GAdParams(String colorFrom, String colorTo) {
			this.colorFrom = colorFrom;
			this.colorTo = colorTo;
		}
		
}
