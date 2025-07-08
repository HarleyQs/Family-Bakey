package com.familybakery.bakery_backend.repository;

import com.familybakery.bakery_backend.model.bread.Bread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreadRepository extends JpaRepository<Bread, Long> {
}

