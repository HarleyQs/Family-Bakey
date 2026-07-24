package com.familybakery.bakery_backend.config;

import com.familybakery.bakery_backend.enums.Role;
import com.familybakery.bakery_backend.model.User;
import com.familybakery.bakery_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Seeds one test account per role on startup. Only runs against the H2
 * in-memory dev database (empty on every restart), so it's safe to keep
 * credentials here for now. Replace with real user management before
 * this ever points at the MySQL/prod datasource.
 */
@Component
@RequiredArgsConstructor
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        seed("admin@familybakery.com", "Admin User", "admin123", Role.ADMIN);
        seed("owner@familybakery.com", "Owner User", "owner123", Role.OWNER);
        seed("manager@familybakery.com", "Manager User", "manager123", Role.MANAGER);
        seed("accounting@familybakery.com", "Accounting User", "accounting123", Role.ACCOUNTING);
        seed("baker@familybakery.com", "Head Baker", "baker123", Role.BAKER);
        seed("cashier@familybakery.com", "Cashier User", "cashier123", Role.CASHIER);
    }

    private void seed(String email, String name, String rawPassword, Role role) {
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(role);
        userRepository.save(user);
    }
}
