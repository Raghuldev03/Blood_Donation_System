package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modal.Admin_Details;

@Repository
public interface adminRepo extends JpaRepository<Admin_Details, Integer> {
    Admin_Details findByadminUsername(String adminUsername);
}
