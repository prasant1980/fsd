package com.stackroute.accountmanager.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.accountmanager.exception.UserNotFoundException;
import com.stackroute.accountmanager.model.User;
import com.stackroute.accountmanager.service.UserAuthenticationService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
@CrossOrigin("*")
public class UserAuthenticationController {
	private Log log = LogFactory.getLog(getClass());

	/*
	 * Autowiring should be implemented for the UserAuthenticationService. (Use
	 * Constructor-based autowiring) Please note that we should not create an object
	 * using the new keyword
	 */

	long EXPIRATION_TIME = 9000000000L;

	private UserAuthenticationService authicationService;

	@Autowired
	public UserAuthenticationController(UserAuthenticationService authicationService) {
		this.authicationService = authicationService;
	}

	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the user created
	 * successfully. 2. 409(CONFLICT) - If the userId conflicts with any existing
	 * user
	 * 
	 * This handler method should map to the URL "/api/v1/auth/register" using HTTP
	 * POST method
	 */
	@PostMapping("/api/v1/auth/register")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		Map<String, String> map = new HashMap<>();
		try {
			user.setUserAddedDate(new Date());
			if (authicationService.saveUser(user)) {
				map.put("status", "Success");
				return new ResponseEntity<>(map, HttpStatus.CREATED);

			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("status", "Failure");
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.CONFLICT);

		}

		map.put("status", "Failure");
		return new ResponseEntity<>(map, HttpStatus.CONFLICT);

	}

	/*
	 * Define a handler method which will authenticate a user by reading the
	 * Serialized user object from request body containing the username and
	 * password. The username and password should be validated before proceeding
	 * ahead with JWT token generation. The user credentials will be validated
	 * against the database entries. The error should be return if validation is not
	 * successful. If credentials are validated successfully, then JWT token will be
	 * generated. The token should be returned back to the caller along with the API
	 * response. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If login is successful 2.
	 * 401(UNAUTHORIZED) - If login is not successful
	 * 
	 * This handler method should map to the URL "/api/v1/auth/login" using HTTP
	 * POST method
	 */

	@PostMapping("/api/v1/auth/login")
	public ResponseEntity<?> validateUser(@RequestBody User user) {
		Map<String, String> map = new HashMap<>();
		try {
			user.setUserAddedDate(new Date());
			if (authicationService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword()) != null) {
				String token = getToken(user.getUserId(), user.getUserPassword());
				map.clear();
				map.put("message", "user succesfully loggedin.");
				map.put("userId", user.getUserId());
				map.put("token", token);
				map.put("status", "Success");
				return new ResponseEntity<>(map, HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "User Name or Password is incorrect. Please try again");
			map.put("status", "Failure");
			return new ResponseEntity<>(map, HttpStatus.CONFLICT);
		}

		map.put("status", "Failure");
		map.put("message", "User Name or Password is incorrect. Please try again");

		return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
	}

	/*
	 * Define a handler method which will update a specific user by reading the
	 * Serialized object from request body and save the updated user details in a
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If the user updated successfully.
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP PUT
	 * method.
	 */
	@PutMapping("/api/v1/auth/{id}")
	public ResponseEntity<?> updateUser(@PathVariable("id") String id, @RequestBody User user) {

		log.info("updateUser : STARTED");
		HttpHeaders headers = new HttpHeaders();
		try {
			if (authicationService.updateUser(id, user) != null) {
				return new ResponseEntity<>(headers, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
			}
		} catch (UserNotFoundException e) {
			e.printStackTrace();
		}
		log.info("updateUser : ENDED");
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
	}

	/*
	 * Define a handler method which will delete a user from a database. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the user deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP
	 * Delete method" where "id" should be replaced by a valid userId without {}
	 */
	@DeleteMapping("/api/v1/auth/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") String id) {
		log.info("deleteUser : STARTED");
		HttpHeaders headers = new HttpHeaders();
		try {
			if (authicationService.deleteUser(id)) {
				return new ResponseEntity<>(headers, HttpStatus.OK);
			}
		} catch (UserNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
		}

		log.info("deleteUser : ENDED");
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);

	}
	
	/*
	 * Define a handler method which will show details of a specific user. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the user found successfully. 2. 404(NOT
	 * FOUND) - If the user with specified userId is not found. This handler method
	 * should map to the URL "/api/v1/user/{id}" using HTTP GET method where "id"
	 * should be replaced by a valid userId without {}
	 */

	@GetMapping("/api/v1/auth/{id}")
	public ResponseEntity<?> getUserById(@PathVariable("id") String id) {
		log.info("getUserById : STARTED");
		HttpHeaders headers = new HttpHeaders();
		try {
			User user = authicationService.getUserById(id);
			if (user != null) {
				return new ResponseEntity<>(headers, HttpStatus.OK);

			}
		} catch (UserNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
		}
		log.info("getUserById : ENDED");
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
	}

	// Generate JWT token
	private String getToken(String username, String password) throws Exception {
		// Builds the JWT and serializes it to a compact, URL-safe string
		return Jwts.builder().setSubject(username).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, "musekey").compact();
	}

}