package com.familybakery.bakery_backend.model.sale;

import com.familybakery.bakery_backend.model.bread.Bread;
import com.familybakery.bakery_backend.model.general.Branch;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class BranchSaleItem {
    @Id @GeneratedValue
    private long id;

    @ManyToOne
    private Bread bread;

    private int amountSold;


    @ManyToOne
    private BranchSale branchSale;
}
