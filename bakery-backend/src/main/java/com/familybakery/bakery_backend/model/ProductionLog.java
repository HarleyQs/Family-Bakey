package com.familybakery.bakery_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class ProductionLog {
    @Id @GeneratedValue
    private Long id;

    private LocalDate date;

    @ManyToOne
    private Bread bread;

    private int producedAmount;
}
