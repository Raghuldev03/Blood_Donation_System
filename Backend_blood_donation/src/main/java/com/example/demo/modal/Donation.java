package com.example.demo.modal;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String donorEmail;
    private String donorName;
    private String location;
    
    @Column(name = "campaign_name")
    private String campaignName; // Corrected variable name

    @Column(name = "bloodbank_name")
    private String bloodBankName; // Corrected variable name
    
    private Date date;
    private String time;
    private String status; // Scheduled, Completed, Cancelled
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    // New field for blood type
    private String bloodType; // Added blood type field

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBloodBankName() {
        return bloodBankName;
    }

    public void setBloodBankName(String bloodBankName) {
        this.bloodBankName = bloodBankName;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    // Getter and setter for the new bloodType field
    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

	public String getCampaignName() {
		return campaignName;
	}

	public void setCampaignName(String campaignName) {
		this.campaignName = campaignName;
	}

	public Donation(String donorEmail, String donorName, String location, String campaignName, String bloodBankName,
			Date date, String time, String status, Date createdAt, String bloodType) {
		this.donorEmail = donorEmail;
		this.donorName = donorName;
		this.location = location;
		this.campaignName = campaignName;
		this.bloodBankName = bloodBankName;
		this.date = date;
		this.time = time;
		this.status = status;
		this.createdAt = createdAt;
		this.bloodType = bloodType;
	}
	public Donation() {
	    // Default constructor required by JPA
	}
}
