package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modal.BloodQuantity;

public interface BloodQuantityRepository extends JpaRepository<BloodQuantity, Long> {
    Optional<BloodQuantity> findByBloodBank_RegistrationNumberAndBloodType(String registrationNumber, String bloodType);

    List<BloodQuantity> findByBloodBank_RegistrationNumber(String regNo);

    Optional<BloodQuantity> findByBloodType(String bloodType);

}
