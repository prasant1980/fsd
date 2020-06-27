package com.stackroute.musemanager.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.musemanager.model.JobUser;

@Repository
public interface MuseRepository extends MongoRepository<JobUser, String> {

	JobUser findByUserId(String userId);
}
