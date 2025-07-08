package com.familybakery.bakery_backend.repository;

import com.familybakery.bakery_backend.model.ingredient.IngredientStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientStockRepository extends JpaRepository<IngredientStock, Long> {
}
