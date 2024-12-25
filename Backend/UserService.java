package com.example.demo;

import com.example.demo.model.User;

public interface UserService {
    User authenticateUser(String email, String password);

    User findByEmail(String email);
}
