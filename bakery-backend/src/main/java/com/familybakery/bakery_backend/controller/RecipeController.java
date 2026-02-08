package com.familybakery.bakery_backend.controller;

import com.familybakery.bakery_backend.dto.ingredient.RecipeDTO;
import com.familybakery.bakery_backend.dto.ingredient.RecipeIngredientDTO;
import com.familybakery.bakery_backend.model.ingredient.Ingredient;
import com.familybakery.bakery_backend.model.ingredient.Recipe;
import com.familybakery.bakery_backend.model.ingredient.RecipeIngredient;
import com.familybakery.bakery_backend.repository.IngredientRepository;
import com.familybakery.bakery_backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping
    public ResponseEntity<List<RecipeDTO>> getAllRecipes() {
        List<RecipeDTO> recipes = recipeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/active")
    public ResponseEntity<List<RecipeDTO>> getActiveRecipes() {
        List<RecipeDTO> recipes = recipeRepository.findAll().stream()
                .filter(Recipe::isActive)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipeById(@PathVariable long id) {
        return recipeRepository.findById(id)
                .map(recipe -> ResponseEntity.ok(convertToDTO(recipe)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RecipeDTO> createRecipe(@RequestBody RecipeDTO recipeDTO) {
        Recipe recipe = new Recipe();
        recipe.setName(recipeDTO.getName());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setFlourWeight(recipeDTO.getFlourWeight());
        recipe.setBreadYield(recipeDTO.getBreadYield());
        recipe.setUnit(com.familybakery.bakery_backend.enums.Unit.valueOf(recipeDTO.getUnit()));
        recipe.setTotalWeight(recipeDTO.getTotalWeight());
        recipe.setCategory(recipeDTO.getCategory());
        recipe.setActive(recipeDTO.isActive());
        recipe.setCreatedAt(LocalDateTime.now());
        recipe.setUpdatedAt(LocalDateTime.now());

        Recipe saved = recipeRepository.save(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(@PathVariable long id, @RequestBody RecipeDTO recipeDTO) {
        return recipeRepository.findById(id)
                .map(recipe -> {
                    recipe.setName(recipeDTO.getName());
                    recipe.setDescription(recipeDTO.getDescription());
                    recipe.setFlourWeight(recipeDTO.getFlourWeight());
                    recipe.setBreadYield(recipeDTO.getBreadYield());
                    recipe.setUnit(com.familybakery.bakery_backend.enums.Unit.valueOf(recipeDTO.getUnit()));
                    recipe.setTotalWeight(recipeDTO.getTotalWeight());
                    recipe.setCategory(recipeDTO.getCategory());
                    recipe.setActive(recipeDTO.isActive());
                    recipe.setUpdatedAt(LocalDateTime.now());

                    Recipe updated = recipeRepository.save(recipe);
                    return ResponseEntity.ok(convertToDTO(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable long id) {
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{recipeId}/ingredients")
    public ResponseEntity<RecipeDTO> addIngredientToRecipe(
            @PathVariable long recipeId,
            @RequestBody RecipeIngredientDTO ingredientDTO) {
        return recipeRepository.findById(recipeId)
                .flatMap(recipe -> ingredientRepository.findById(ingredientDTO.getIngredientId())
                        .map(ingredient -> {
                            RecipeIngredient recipeIngredient = new RecipeIngredient();
                            recipeIngredient.setRecipe(recipe);
                            recipeIngredient.setIngredient(ingredient);
                            recipeIngredient.setAmount(ingredientDTO.getAmount());
                            recipeIngredient.setUnit(com.familybakery.bakery_backend.enums.Unit.valueOf(ingredientDTO.getUnit()));

                            recipe.getIngredients().add(recipeIngredient);
                            recipe.setUpdatedAt(LocalDateTime.now());
                            Recipe updated = recipeRepository.save(recipe);
                            return ResponseEntity.ok(convertToDTO(updated));
                        }))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{recipeId}/ingredients/{ingredientId}")
    public ResponseEntity<RecipeDTO> removeIngredientFromRecipe(
            @PathVariable long recipeId,
            @PathVariable long ingredientId) {
        return recipeRepository.findById(recipeId)
                .map(recipe -> {
                    recipe.getIngredients().removeIf(ri -> ri.getIngredient().getId() == ingredientId);
                    recipe.setUpdatedAt(LocalDateTime.now());
                    Recipe updated = recipeRepository.save(recipe);
                    return ResponseEntity.ok(convertToDTO(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private RecipeDTO convertToDTO(Recipe recipe) {
        List<RecipeIngredientDTO> ingredientDTOs = recipe.getIngredients().stream()
                .map(ri -> new RecipeIngredientDTO(
                        ri.getId(),
                        ri.getIngredient().getId(),
                        ri.getIngredient().getName(),
                        ri.getAmount(),
                        ri.getUnit().toString()
                ))
                .collect(Collectors.toList());

        return new RecipeDTO(
                recipe.getId(),
                recipe.getName(),
                recipe.getDescription(),
                recipe.getFlourWeight(),
                recipe.getBreadYield(),
                recipe.getUnit().toString(),
                recipe.getTotalWeight(),
                recipe.getCategory(),
                recipe.isActive(),
                recipe.getCreatedAt(),
                recipe.getUpdatedAt(),
                ingredientDTOs
        );
    }
}
