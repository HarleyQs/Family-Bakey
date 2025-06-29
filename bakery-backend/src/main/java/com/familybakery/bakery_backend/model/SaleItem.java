package com.familybakery.bakery_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class SaleItem {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Sale sale;

    @ManyToOne
    private Bread bread;

    private int quantity;
}
