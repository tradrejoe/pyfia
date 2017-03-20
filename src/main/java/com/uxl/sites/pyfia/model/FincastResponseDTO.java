package com.uxl.sites.pyfia.model;

import java.io.Serializable;

import com.uxl.sites.pyfia.model.fin.FincastResponse;


public class FincastResponseDTO implements Serializable {

	public static final long serialVersionUID = 0L;
	
	FincastResponse response;
	public FincastResponse getResponse() {
		return response;
	}

	public void setResponse(FincastResponse response) {
		this.response = response;
	}

	public String getImgstr() {
		return imgstr;
	}

	public void setImgstr(String imgstr) {
		this.imgstr = imgstr;
	}

	String imgstr;
	
	public FincastResponseDTO() {
	}
	
	public FincastResponseDTO(FincastResponse response, String imgstr) {
		this.response = response;
		this.imgstr = imgstr;
	}

}
