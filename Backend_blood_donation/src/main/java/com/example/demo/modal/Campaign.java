package com.example.demo.modal;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "campaigns")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "campaign_name", nullable = false)
    private String campaignName;

    private String registrationNumber;
    
    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "blood_type_needed", nullable = false)
    private String bloodTypeNeeded;

    @Column(nullable = false)
    private String location;

    @Column(name = "target_collection", nullable = false)
    private int targetCollection;

    private String description;

    private String status = "Pending"; // Default status
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getBloodTypeNeeded() {
        return bloodTypeNeeded;
    }

    public void setBloodTypeNeeded(String bloodTypeNeeded) {
        this.bloodTypeNeeded = bloodTypeNeeded;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getTargetCollection() {
        return targetCollection;
    }

    public void setTargetCollection(int targetCollection) {
        this.targetCollection = targetCollection;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}
}
