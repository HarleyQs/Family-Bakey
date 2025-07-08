package com.familybakery.bakery_backend.model.bread;

import com.familybakery.bakery_backend.enums.Unit;
import com.familybakery.bakery_backend.model.ingredient.Ingredient;
import jakarta.persistence.*;

@Entity
public class BreadFilling {
    @Id @GeneratedValue
    private long id;

    @ManyToOne
    private Bread bread;

    @Enumerated(EnumType.STRING)
    private Unit unit;

    @ManyToOne
    private Ingredient ingredient;
}
