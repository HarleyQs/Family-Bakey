package com.familybakery.bakery_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "localhost", allowedHeaders = "*")
public class AuthController {

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            jakarta.servlet.http.HttpSession session = ((jakarta.servlet.http.HttpServletRequest) org.springframework.web.context.request.RequestContextHolder.getRequestAttributes().resolveReference("request")).getSession();

            Map<String, Object> user = new HashMap<>();
            Map<String, Object> response = new HashMap<>();
            if ("admin@familybakery.com".equals(email) && "admin123".equals(password)) {
                user.put("id", "1");
                user.put("email", email);
                user.put("name", "Admin User");
                user.put("role", "admin");
                response.put("token", "mock-jwt-token-admin");
                response.put("user", user);
                session.setAttribute("user", user);
                System.out.println("Login success: admin");
                return ResponseEntity.ok(response);
            } else if ("manager@familybakery.com".equals(email) && "manager123".equals(password)) {
                user.put("id", "2");
                user.put("email", email);
                user.put("name", "Manager User");
                user.put("role", "manager");
                response.put("token", "mock-jwt-token-manager");
                response.put("user", user);
                session.setAttribute("user", user);
                System.out.println("Login success: manager");
                return ResponseEntity.ok(response);
            } else if ("staff@familybakery.com".equals(email) && "staff123".equals(password)) {
                user.put("id", "3");
                user.put("email", email);
                user.put("name", "Staff User");
                user.put("role", "staff");
                response.put("token", "mock-jwt-token-staff");
                response.put("user", user);
                session.setAttribute("user", user);
                System.out.println("Login success: staff");
                return ResponseEntity.ok(response);
            }

            // Default test user for any other credentials
            user.put("id", "1");
            user.put("email", email != null ? email : "user@example.com");
            user.put("name", "Test User");
            user.put("role", "customer");
            response.put("token", "mock-jwt-token");
            response.put("user", user);
            session.setAttribute("user", user);
            System.out.println("Login default: customer");
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
