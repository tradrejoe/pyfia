/**
 * 
 */
package com.uxl.sites.pyfia.model;

import java.io.Serializable;

/**
 * @author uxldata
 *
 */
public class GenericResponse implements Serializable {

	public static final long serialVersionUID = 0L;
	
	int code = 0;
	String msg = "";
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public GenericResponse() {
		
	}

	public GenericResponse(int code, String msg) {
		this.code = code;
		this.msg = msg;
	}

}
