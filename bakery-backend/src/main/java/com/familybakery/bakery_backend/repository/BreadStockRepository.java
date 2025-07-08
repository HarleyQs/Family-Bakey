package com.familybakery.bakery_backend.repository;

import com.familybakery.bakery_backend.model.bread.BreadStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreadStockRepository extends JpaRepository<BreadStock, Long> {
}
