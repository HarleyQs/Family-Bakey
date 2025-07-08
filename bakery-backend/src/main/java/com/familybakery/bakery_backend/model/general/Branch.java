package com.familybakery.bakery_backend.model.general;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Branch {
    @Id @GeneratedValue
    private long id;

    private String name;
}
