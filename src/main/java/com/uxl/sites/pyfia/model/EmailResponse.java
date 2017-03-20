package com.uxl.sites.pyfia.model;

import java.io.Serializable;

public class EmailResponse implements Serializable {
	
	public static final long serialVersionUID = 0L;
	
	private String message = "Done.";
	
	public EmailResponse() {}
	
	public EmailResponse(String msg) {
		this.message = msg;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
