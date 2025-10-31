package com.servicehive.slotswapper.service;

import java.util.Optional;

import com.servicehive.slotswapper.model.User;

public interface UserService {
    
    User createUser(String name, String email, String password);
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findById(String id);
    
    boolean existsByEmail(String email);
    
    String generateToken(User user);
    
    User getCurrentUser();
}
