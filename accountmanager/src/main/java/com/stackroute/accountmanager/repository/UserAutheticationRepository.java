package com.stackroute.accountmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.accountmanager.model.User;

@Repository
public interface UserAutheticationRepository extends JpaRepository<User, String> {

	User findByUserIdAndUserPassword(String userId, String userPassword);
}