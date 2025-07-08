package com.familybakery.bakery_backend.model.sale;

import com.familybakery.bakery_backend.model.general.Branch;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class BranchSale {
    @Id @GeneratedValue
    private long id;

    @ManyToOne
    private Branch branch;

    private LocalDate localDate;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BranchSaleItem> branchSaleItem = new ArrayList<>();
}
