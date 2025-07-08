package com.familybakery.bakery_backend.services;

import com.familybakery.bakery_backend.repository.BreadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BreadIngredientService {
    private final BreadRepository breadRepository;


}
