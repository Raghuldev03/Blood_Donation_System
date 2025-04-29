package com.example.demo.modal;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BloodBank {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String bloodBankName;
    private String email;
    private String registrationNumber;
    private String licenseNumber;
    private String address;
    private String contactNumber;
    private String bloodBankType; // e.g., Government, Private, NGO, Hospital
    private LocalDate licenseValidityDate;
    private String authorizedPersonName;
    private String personAadhar;
    private String availableBloodComponents; // comma-separated e.g., "Whole Blood, Plasma"
    @Column(name = "approved")
    private boolean approved;
    @Column(name = "status")
    private String status;
    public BloodBank() {
    	
    }
    
    public BloodBank(String bloodBankName, String email, String registrationNumber, String licenseNumber,
			String address, String contactNumber, String bloodBankType, LocalDate licenseValidityDate,
			String authorizedPersonName, String personAadhar, String availableBloodComponents) {
		this.bloodBankName = bloodBankName;
		this.email = email;
		this.registrationNumber = registrationNumber;
		this.licenseNumber = licenseNumber;
		this.address = address;
		this.contactNumber = contactNumber;
		this.bloodBankType = bloodBankType;
		this.licenseValidityDate = licenseValidityDate;
		this.authorizedPersonName = authorizedPersonName;
		this.personAadhar = personAadhar;
		this.availableBloodComponents = availableBloodComponents;
	}
    
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getBloodBankName() {
		return bloodBankName;
	}
	public void setBloodBankName(String bloodBankName) {
		this.bloodBankName = bloodBankName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRegistrationNumber() {
		return registrationNumber;
	}
	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}
	public String getLicenseNumber() {
		return licenseNumber;
	}
	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getBloodBankType() {
		return bloodBankType;
	}
	public void setBloodBankType(String bloodBankType) {
		this.bloodBankType = bloodBankType;
	}
	public LocalDate getLicenseValidityDate() {
		return licenseValidityDate;
	}
	public void setLicenseValidityDate(LocalDate licenseValidityDate) {
		this.licenseValidityDate = licenseValidityDate;
	}
	public String getAuthorizedPersonName() {
		return authorizedPersonName;
	}
	public void setAuthorizedPersonName(String authorizedPersonName) {
		this.authorizedPersonName = authorizedPersonName;
	}
	public String getPersonAadhar() {
	    return personAadhar;
	}

	public void setPersonAadhar(String personAadhar) {
	    this.personAadhar = personAadhar;
	}
	public String getAvailableBloodComponents() {
		return availableBloodComponents;
	}
	public void setAvailableBloodComponents(String availableBloodComponents) {
		this.availableBloodComponents = availableBloodComponents;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
	    this.approved = approved;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
