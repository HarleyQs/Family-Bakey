package com.familybakery.bakery_backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SessionController {

    @GetMapping("/session")
    public ResponseEntity<?> getSession(HttpSession session) {
        Object user = session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(Map.of("user", user));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "No session"));
        }
    }
}
