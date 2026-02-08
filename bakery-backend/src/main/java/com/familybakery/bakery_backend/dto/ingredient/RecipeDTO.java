package com.familybakery.bakery_backend.dto.ingredient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDTO {
    private long id;
    private String name;
    private String description;
    private double flourWeight;
    private int breadYield;
    private String unit;
    private double totalWeight;
    private String category;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<RecipeIngredientDTO> ingredients;
}
