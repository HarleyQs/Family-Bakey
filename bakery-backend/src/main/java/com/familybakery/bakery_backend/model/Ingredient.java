package com.familybakery.bakery_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Ingredient {
    @Id @GeneratedValue
    private long id;

    private String name;
    private String unit;
    private double thresholdAmount;
}
