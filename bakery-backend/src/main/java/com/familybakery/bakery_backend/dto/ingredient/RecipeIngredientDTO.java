package com.familybakery.bakery_backend.dto.ingredient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredientDTO {
    private long id;
    private long ingredientId;
    private String ingredientName;
    private double amount;
    private String unit;
}
