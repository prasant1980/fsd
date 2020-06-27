package com.stackroute.accountmanager.exception;

public class UserAlreadyExistsException extends Exception {

	private static final long serialVersionUID = 3380650180002499726L;

	public UserAlreadyExistsException(String message) {
		super(message);
	}
}
