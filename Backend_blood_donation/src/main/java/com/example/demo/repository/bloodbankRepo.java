package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modal.BloodBank;

public interface bloodbankRepo extends JpaRepository<BloodBank, Integer>{
	 List<BloodBank> findByApprovedFalse();
	 Optional<BloodBank> findByEmail(String email);
	  Optional<BloodBank> findByRegistrationNumber(String registrationNumber);
}
