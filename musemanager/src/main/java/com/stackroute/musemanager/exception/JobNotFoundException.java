package com.stackroute.musemanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Job with specified ID is not found")
public class JobNotFoundException extends Exception {

	private static final long serialVersionUID = 225596729516084123L;

	public JobNotFoundException(String message) {
		super(message);
	}
}
