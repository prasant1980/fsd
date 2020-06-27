package com.stackroute.musemanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Job already exists")
public class JobAlreadyExistsException extends Exception {

	private static final long serialVersionUID = 522443105936681476L;

	public JobAlreadyExistsException(String message) {
		super(message);
	}

}
