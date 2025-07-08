package com.familybakery.bakery_backend.model.production;

import com.familybakery.bakery_backend.model.general.Branch;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ProductionBatch {
    @Id @GeneratedValue
    private long id;

    private LocalDate productionDate;

    @ManyToOne
    private Branch branch;

    @OneToMany(mappedBy = "productionBatch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductionBatchItem> productionBatchItemList = new ArrayList<>();
}
