package com.familybakery.bakery_backend.controller;

import com.familybakery.bakery_backend.dto.ingredient.IngredientDTO;
import com.familybakery.bakery_backend.model.ingredient.Ingredient;
import com.familybakery.bakery_backend.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping
    public ResponseEntity<List<IngredientDTO>> getAllIngredients() {
        List<IngredientDTO> ingredients = ingredientRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ingredients);
    }

    @GetMapping(value = "/active", produces = "application/json")
    public ResponseEntity<List<IngredientDTO>> getActiveIngredients() {
        List<IngredientDTO> ingredients = ingredientRepository.findAll().stream()
                .filter(Ingredient::isActive)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ingredients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientDTO> getIngredientById(@PathVariable long id) {
        return ingredientRepository.findById(id)
                .map(ingredient -> ResponseEntity.ok(convertToDTO(ingredient)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<IngredientDTO> createIngredient(@RequestBody IngredientDTO ingredientDTO) {
        Ingredient ingredient = convertToEntity(ingredientDTO);
        Ingredient saved = ingredientRepository.save(ingredient);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IngredientDTO> updateIngredient(@PathVariable long id, @RequestBody IngredientDTO ingredientDTO) {
        return ingredientRepository.findById(id)
                .map(ingredient -> {
                    ingredient.setName(ingredientDTO.getName());
                    ingredient.setUnit(ingredientDTO.getUnit());
                    ingredient.setUnitPrice(ingredientDTO.getUnitPrice());
                    ingredient.setActive(ingredientDTO.isActive());
                    Ingredient updated = ingredientRepository.save(ingredient);
                    return ResponseEntity.ok(convertToDTO(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable long id) {
        if (ingredientRepository.existsById(id)) {
            ingredientRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private IngredientDTO convertToDTO(Ingredient ingredient) {
        return new IngredientDTO(
                ingredient.getId(),
                ingredient.getName(),
                ingredient.getUnit(),
                ingredient.getUnitPrice(),
                ingredient.isActive()
        );
    }

    private Ingredient convertToEntity(IngredientDTO ingredientDTO) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(ingredientDTO.getName());
        ingredient.setUnit(ingredientDTO.getUnit());
        ingredient.setUnitPrice(ingredientDTO.getUnitPrice());
        ingredient.setActive(ingredientDTO.isActive());
        return ingredient;
    }
}
