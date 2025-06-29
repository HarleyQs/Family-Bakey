package com.familybakery.bakery_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class IngredientStock {
    @Id @GeneratedValue
    private Long id;

    @OneToOne
    private Ingredient ingredient;

    private double quantity;
    private String unit;
}
