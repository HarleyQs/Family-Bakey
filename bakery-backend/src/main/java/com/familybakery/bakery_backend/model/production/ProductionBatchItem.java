package com.familybakery.bakery_backend.model.production;

import com.familybakery.bakery_backend.model.bread.Bread;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ProductionBatchItem {
    @Id @GeneratedValue
    private long id;

    @ManyToOne
    private ProductionBatch productionBatch;

    @ManyToOne
    private Bread bread;

    private int productionAmount;
}
