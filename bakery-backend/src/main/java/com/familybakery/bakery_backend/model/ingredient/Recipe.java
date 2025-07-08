package com.familybakery.bakery_backend.model.ingredient;

import com.familybakery.bakery_backend.enums.Unit;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Recipe {
    @Id @GeneratedValue
    private long id;

    private String name;

    private double flourWeight;

    private int breadYield;

    @Enumerated(EnumType.STRING)
    private Unit unit;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<RecipeIngredient> ingredients;

}
