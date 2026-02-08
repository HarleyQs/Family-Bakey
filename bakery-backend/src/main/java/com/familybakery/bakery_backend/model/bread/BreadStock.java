package com.familybakery.bakery_backend.model.bread;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class BreadStock {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Bread bread;

    private int quantity;
}
