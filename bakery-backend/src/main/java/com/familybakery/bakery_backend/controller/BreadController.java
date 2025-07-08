package com.familybakery.bakery_backend.controller;

import com.familybakery.bakery_backend.model.bread.Bread;
import com.familybakery.bakery_backend.services.BreadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/breads")
@RequiredArgsConstructor
public class BreadController {
    private final BreadService breadService;


    @GetMapping
    public List<Bread> list() {return  breadService.all();}

    @GetMapping("/{id}")
    public ResponseEntity<Bread> get(@PathVariable Long id) {
        return breadService.find(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Bread create (@RequestBody Bread bread)  {return breadService.save(bread);}

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {breadService.delete(id);}
}
