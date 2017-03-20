package com.uxl.sites.users.exceptions;

import java.io.Serializable;

public interface IException extends Serializable {

	public static enum ExceptionType {
		NOT_LOGGEDIN (0, "Not Logged In."),
		NOT_REGISTERED (1, "Not Registered."),
		NOT_SUBSCRIBED (2, "Not Subscribed."),
		INVALID_USERID (3, "Invalid user id."),
		INVALID_PASSWORD (4, "Invalid password."),
		BLANK_PASSWORD (5, "Password cannot be blank."),
		USER_EXISTS (6, "User already registered."),
		CANNOT_ENCRYPT_PASSWORD (7, "Cannot encrypt password."),
		CANNOT_REGISTER (8, "Cannot register user.");
		
		int type;
		String msg;
		
		public int getType() {
			return type;
		}
		public void setType(int type) {
			this.type = type;
		}
		public String getMsg() {
			return msg;
		}
		public void setMsg(String msg) {
			this.msg = msg;
		}
		ExceptionType(int type, String msg) {
			this.type = type;
			this.msg = msg;
		}
		public UserException toUserException() {
			return new UserException(this.getType(), this.getMsg());
		}
		public static ExceptionType lookup(int type) {
			for (ExceptionType t : ExceptionType.values()) {
				if (t.getType()==type) return t;
			}
			return null;
		}
	}
}
