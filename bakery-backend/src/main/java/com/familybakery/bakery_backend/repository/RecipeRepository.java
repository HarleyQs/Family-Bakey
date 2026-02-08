package com.familybakery.bakery_backend.repository;

import com.familybakery.bakery_backend.model.ingredient.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
