package com.familybakery.bakery_backend.services;

import com.familybakery.bakery_backend.model.bread.Bread;
import com.familybakery.bakery_backend.repository.BreadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BreadService {
    private final BreadRepository breadRepository;


    public Bread save(Bread b) { return breadRepository.save(b); }

    public Optional<Bread> find(Long id) {return breadRepository.findById(id);}

    public List<Bread> all() {return breadRepository.findAll();}

    public void delete(Long id) { breadRepository.deleteById(id);}
}
