package com.familybakery.bakery_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");

            // Mock authentication - for testing only
            if ("admin@familybakery.com".equals(email) && "admin123".equals(password)) {
                Map<String, Object> response = new HashMap<>();
                response.put("token", "mock-jwt-token-admin");
                response.put("user", Map.of(
                        "id", "1",
                        "email", email,
                        "name", "Admin User",
                        "role", "ADMIN"
                ));
                return ResponseEntity.ok(response);
            } else if ("manager@familybakery.com".equals(email) && "manager123".equals(password)) {
                Map<String, Object> response = new HashMap<>();
                response.put("token", "mock-jwt-token-manager");
                response.put("user", Map.of(
                        "id", "2",
                        "email", email,
                        "name", "Manager User",
                        "role", "MANAGER"
                ));
                return ResponseEntity.ok(response);
            } else if ("staff@familybakery.com".equals(email) && "staff123".equals(password)) {
                Map<String, Object> response = new HashMap<>();
                response.put("token", "mock-jwt-token-staff");
                response.put("user", Map.of(
                        "id", "3",
                        "email", email,
                        "name", "Staff User",
                        "role", "STAFF"
                ));
                return ResponseEntity.ok(response);
            }

            // Default test user for any other credentials
            Map<String, Object> response = new HashMap<>();
            response.put("token", "mock-jwt-token");
            response.put("user", Map.of(
                    "id", "1",
                    "email", email != null ? email : "user@example.com",
                    "name", "Test User",
                    "role", "CUSTOMER"
            ));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Sign in failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
}
