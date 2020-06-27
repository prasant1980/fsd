package com.stackroute.accountmanager.exception;

public class UserNotFoundException extends Exception {

	private static final long serialVersionUID = 523058943363187387L;

	public UserNotFoundException(String message) {
		super(message);
	}
}
