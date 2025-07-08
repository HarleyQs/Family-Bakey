package com.familybakery.bakery_backend.model.bread;

import com.familybakery.bakery_backend.model.ingredient.Recipe;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Bread {
    @Id @GeneratedValue
    private long id;

    private String name;
    private double price;

    @ManyToOne
    private Recipe recipe;

    private float breadMultiplier = 1;

    @OneToMany(mappedBy = "bread", cascade = CascadeType.ALL)
    private List<BreadFilling> breadFillings = new ArrayList<>();
}
