package com.example.demo.repository;

import com.example.demo.modal.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByRegistrationNumber(String registrationNumber);
}
