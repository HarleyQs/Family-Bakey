package com.familybakery.bakery_backend.services;

import com.familybakery.bakery_backend.model.ingredient.Recipe;
import com.familybakery.bakery_backend.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;

    public List<Recipe> all() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> find(Long id) {
        return recipeRepository.findById(id);
    }

    public Recipe save(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public void delete(Long id) {
        recipeRepository.deleteById(id);
    }
}
