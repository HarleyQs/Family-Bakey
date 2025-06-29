package com.familybakery.bakery_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class BreadIngredient {
    @Id @GeneratedValue
    private long id;

    @ManyToOne
    private Bread bread;

    @ManyToOne
    private Ingredient ingredient;

    private double amount;
}
