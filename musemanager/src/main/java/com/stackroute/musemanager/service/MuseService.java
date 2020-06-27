package com.stackroute.musemanager.service;

import java.util.List;

import com.stackroute.musemanager.exception.JobAlreadyExistsException;
import com.stackroute.musemanager.exception.JobNotFoundException;
import com.stackroute.musemanager.model.Job;

public interface MuseService {
	boolean saveJobToWishList(Job job) throws JobAlreadyExistsException;

	boolean deleteJobFromWishList(String userId, int id) throws JobNotFoundException;

	List<Job> getAllJobFromWishList(String userId) throws Exception;

	List<Job> getAllBookMarkedJob(String userId) throws Exception;

	boolean updateBookmark(Job job, String userId, int id);

}
