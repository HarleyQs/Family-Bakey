package com.familybakery.bakery_backend.model.ingredient;

import com.familybakery.bakery_backend.enums.Unit;
import jakarta.persistence.*;

@Entity
public class RecipeIngredient {
    @Id @GeneratedValue
    private long id;

    @ManyToOne
    private Recipe recipe;

    @ManyToOne
    private Ingredient ingredient;

    private double amount;
    @Enumerated(EnumType.STRING)
    private Unit unit;
}
