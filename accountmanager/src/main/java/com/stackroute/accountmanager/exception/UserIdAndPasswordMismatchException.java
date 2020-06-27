package com.stackroute.accountmanager.exception;

public class UserIdAndPasswordMismatchException extends Exception {

	private static final long serialVersionUID = -4095253792001919692L;

	public UserIdAndPasswordMismatchException(String message) {
		super(message);
	}
}
