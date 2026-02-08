package com.familybakery.bakery_backend.model.ingredient;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {
    @Id @GeneratedValue
    private long id;

    private String name;
    
    private String unit; // kg, g, ml, etc.
    
    private double unitPrice;
    
    private boolean active = true;
}
