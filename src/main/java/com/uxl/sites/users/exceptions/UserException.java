/**
 *
 */
package com.uxl.sites.users.exceptions;

import com.uxl.sites.pyfia.model.GenericResponse;

/**
 * @author uxldata
 *
 */
public class UserException extends RuntimeException implements IException {

	int type;
	String msg;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public UserException() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 */
	public UserException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param cause
	 */
	public UserException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 */
	public UserException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public UserException(IException.ExceptionType type) {
		super(type.getMsg());
		this.type = type.getType();
		this.msg = type.getMsg();
	}

	public GenericResponse toResponse() {
		return new GenericResponse(this.type, this.msg);
	}

	public UserException(int type, String msg) {
		this.type = type;
		this.msg = msg;
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
