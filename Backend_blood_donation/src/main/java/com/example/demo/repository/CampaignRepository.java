package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modal.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
	List<Campaign> findByStatus(String status);
}
