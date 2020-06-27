package com.stackroute.accountmanager.service;

import com.stackroute.accountmanager.exception.UserAlreadyExistsException;
import com.stackroute.accountmanager.exception.UserNotFoundException;
import com.stackroute.accountmanager.model.User;

public interface UserAuthenticationService {

	public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;

	boolean saveUser(User user) throws UserAlreadyExistsException;

	User updateUser(String userId, User user) throws UserNotFoundException;

	boolean deleteUser(String userId) throws UserNotFoundException;

	User getUserById(String userId) throws UserNotFoundException;

}
