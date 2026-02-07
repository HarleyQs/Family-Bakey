package com.familybakery.bakery_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.familybakery.bakery_backend.model.sale.BranchSale;

public interface SaleRepository extends JpaRepository<BranchSale, Long> {
}
