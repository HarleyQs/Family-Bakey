package com.familybakery.bakery_backend.services;

import com.familybakery.bakery_backend.model.ingredient.Ingredient;
import com.familybakery.bakery_backend.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public Ingredient save(Ingredient i) { return ingredientRepository.save(i); }

    public Optional<Ingredient> find(Long id) { return ingredientRepository.findById(id); }

    public List<Ingredient> all() { return ingredientRepository.findAll(); }

    public void delete(Long id) { ingredientRepository.deleteById(id);}
    
}
