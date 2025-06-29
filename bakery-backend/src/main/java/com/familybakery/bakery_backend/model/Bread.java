package com.familybakery.bakery_backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Bread {
    @Id @GeneratedValue
    private long id;

    private String name;
    private double price;

    @OneToMany(mappedBy = "bread", cascade = CascadeType.ALL)
    private List<BreadIngredient> ingredients = new ArrayList<>();
}
