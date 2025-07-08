package com.familybakery.bakery_backend.model.ingredient;

import com.familybakery.bakery_backend.enums.Unit;
import jakarta.persistence.*;

@Entity
public class IngredientStock {
    @Id @GeneratedValue
    private Long id;

    @OneToOne
    private Ingredient ingredient;

    private double quantity;

    private double thresholdAmount;

    @Enumerated(EnumType.STRING)
    private Unit unit;
}
