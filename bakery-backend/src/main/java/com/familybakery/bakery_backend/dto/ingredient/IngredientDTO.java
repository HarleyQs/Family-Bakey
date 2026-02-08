package com.familybakery.bakery_backend.dto.ingredient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngredientDTO {
    private long id;
    private String name;
    private String unit;
    private double unitPrice;
    private boolean active;
}
