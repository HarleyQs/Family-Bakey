package com.familybakery.bakery_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class BreadStock {
    @Id @GeneratedValue
    private Long id;

    private Bread bread;

    private int quantity;
}
