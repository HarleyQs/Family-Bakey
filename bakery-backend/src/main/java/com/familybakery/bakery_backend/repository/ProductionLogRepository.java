package com.familybakery.bakery_backend.repository;

import com.familybakery.bakery_backend.model.ProductionLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionLogRepository extends JpaRepository<ProductionLog, Long> {
}
