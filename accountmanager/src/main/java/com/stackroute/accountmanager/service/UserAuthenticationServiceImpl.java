package com.stackroute.accountmanager.service;

import java.util.Date;
import java.util.Optional;

import org.hibernate.engine.jdbc.connections.internal.UserSuppliedConnectionProviderImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.accountmanager.exception.UserAlreadyExistsException;
import com.stackroute.accountmanager.exception.UserNotFoundException;
import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.repository.UserAutheticationRepository;

@Service
public class UserAuthenticationServiceImpl implements UserAuthenticationService {
	Logger log = LoggerFactory.getLogger(UserSuppliedConnectionProviderImpl.class);

	@Autowired
	private UserAutheticationRepository authenticationRepository;

	@Override
	public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
		log.info("UserAuthenticationServiceImpl : findByUserIdAndPassword : " + userId);
		User user = authenticationRepository.findByUserIdAndUserPassword(userId, password);
		if (user == null) {
			throw new UserNotFoundException("UserId and Password mismatch");
		}
		log.info("User found with matching User ID and Password for User Id " + userId);

		return user;
	}

	@Override
	public boolean saveUser(User user) throws UserAlreadyExistsException {
		log.info("UserAuthenticationServiceImpl : saveUser : " + user);
		boolean result = false;
		Optional<User> u1 = authenticationRepository.findById(user.getUserId());
		if (u1.isPresent()) {
			throw new UserAlreadyExistsException("User with Id already exists");
		}
		user.setUserAddedDate(new Date());
		User savedUsr = authenticationRepository.save(user);
		if (null != savedUsr) {
			log.info("User " + user.getUserId() + " registered successfully..");
			result = true;
		} else {
			result = false;
		}

		return result;
	}

	/*
	 * This method should be used to update a existing user.Call the corresponding
	 * method of Respository interface.
	 */

	public User updateUser(String userId, User user) throws UserNotFoundException {
		log.info("UserAuthenticationServiceImpl : updateUser : " + userId + " : " + user);
		User updatedUser = null;
		Optional<User> searchUser = authenticationRepository.findById(userId);
		if (searchUser.isPresent()) {
			user.setUserAddedDate(searchUser.get().getUserAddedDate());
			authenticationRepository.save(user);
			updatedUser = user;
		} else {
			log.error("User ID " + userId + " not found in database for update..");
			throw new UserNotFoundException("User ID " + userId + " not found for update..");
		}

		return updatedUser;
	}

	/*
	 * This method should be used to delete an existing user. Call the corresponding
	 * method of Respository interface.
	 */

	public boolean deleteUser(String userId) throws UserNotFoundException {
		log.info("UserAuthenticationServiceImpl : deleteUser : " + userId);
		boolean result = false;
		Optional<User> searchUser = authenticationRepository.findById(userId);
		if (searchUser.isPresent()) {
			authenticationRepository.deleteById(userId);
			result = true;
		} else {
			log.error("User ID " + userId + " not found in database for update..");
			throw new UserNotFoundException("User ID " + userId + " not found for update..");
		}

		return result;
	}

	/*
	 * This method should be used to get a user by userId.Call the corresponding
	 * method of Respository interface.
	 */

	public User getUserById(String userId) throws UserNotFoundException {
		log.info("UserAuthenticationServiceImpl : getUserById : " + userId);
		User result = null;
		Optional<User> searchResult = authenticationRepository.findById(userId);
		if (searchResult.isPresent()) {
			result = searchResult.get();
		} else {
			log.error("User ID " + userId + " not found in database for update..");
			throw new UserNotFoundException("User ID " + userId + " not found for update..");
		}

		return result;
	}

}