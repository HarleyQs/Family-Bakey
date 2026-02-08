package com.familybakery.bakery_backend.model;


import com.familybakery.bakery_backend.enums.Role;
import jakarta.persistence.*;

@Entity
public class User {
    @Id @GeneratedValue
    private Long id;

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

}
