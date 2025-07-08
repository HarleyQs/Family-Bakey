package com.familybakery.bakery_backend.repository;

import com.familybakery.bakery_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
