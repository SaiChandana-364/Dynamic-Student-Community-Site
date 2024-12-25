package com.example.demo.exception;

public class UserNotFoundByEmail extends RuntimeException {
    public UserNotFoundByEmail(String message) {
        super(message);
    }
}
