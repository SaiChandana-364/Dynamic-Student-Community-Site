package com.example.demo.controller;

import com.example.demo.LoginRequest;
import com.example.demo.ResetPasswordRequest;
import com.example.demo.UserService;
import com.example.demo.exception.UserNotFoundByEmail;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.web.server.Cookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import javax.servlet.http.HttpSession;


import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    private final Map<String, User> sessionStore = new ConcurrentHashMap<>();
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private HttpSession session;


    @PostMapping("/register")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @CrossOrigin("http://localhost:3000")
    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response, HttpServletRequest request) {
        try {
            User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            if (user != null) {
                HttpSession session = request.getSession();
                // Generate session ID
                String sessionId = UUID.randomUUID().toString();

                // Store session information (e.g., in a database or in-memory store)
                session.setAttribute("user", user);

                // Set session cookie
                Cookie cookie = new Cookie("SESSION_ID", sessionId);
                // Set cookie expiration time (optional)
                cookie.setMaxAge(3600); // 1 hour
                cookie.setHttpOnly(true); // Prevent client-side JavaScript access
                cookie.setSecure(true); // Send cookie only over HTTPS (optional)
                response.addCookie(cookie);

                return ResponseEntity.ok().body("Login successful"+user);
            } else {
                return ResponseEntity.badRequest().body("Invalid email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            // Retrieve user by email
            User user = userService.findByEmail(request.getEmail());

            // Validate password and confirm password
            if (!request.getPassword().equals(request.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("Passwords do not match");
            }

            // Update the user's password
            user.setPassword(request.getPassword());
            userRepository.save(user);

            return ResponseEntity.ok().body("Password reset successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Password reset failed: " + e.getMessage());
        }
    }
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@SessionAttribute("user") User user) {
        if (user == null) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if user is not logged in
        }
        return ResponseEntity.ok(user);
    }



    @DeleteMapping("/users/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
        // Check if the user exists by email
        if (!userRepository.existsByEmail(email)) {
            throw new UserNotFoundByEmail("User not found with email: " + email); // Custom exception if needed
        }

        // Delete user by email
        userRepository.deleteByEmail(email);
        return ResponseEntity.ok("User has been deleted successfully.");
    }

}