package com.familybakery.bakery_backend.repository;

import com.familybakery.bakery_backend.model.ingredient.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
