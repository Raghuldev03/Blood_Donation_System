package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modal.Donation;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
	Donation findByDonorEmail(String donorEmail);
	List<Donation> findByStatus(String status);
	List<Donation> findByDonorEmailAndStatus(String donorEmail, String status);

}
