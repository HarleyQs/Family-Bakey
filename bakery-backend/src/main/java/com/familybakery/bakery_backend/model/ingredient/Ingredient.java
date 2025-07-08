package com.familybakery.bakery_backend.model.ingredient;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Ingredient {
    @Id @GeneratedValue
    private long id;

    private String name;
}
