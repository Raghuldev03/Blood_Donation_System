package com.example.demo.modal;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Donar_Details {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int donarId;
    private String donarName;
    private String donarEmail;
    private String password;
    private Long phoneNumber;
    private int donarAge;
    private String bloodGroup;
    private String address;
    @Column(name = "last_donation_date")
    private LocalDate lastDonationDate;
    private boolean available;
    
    public Donar_Details() {
    	
    }
    public Donar_Details(String donarName, String donarEmail, String password, Long phoneNumber, int donarAge,
			String bloodGroup, String address) {
		super();
		this.donarName = donarName;
		this.donarEmail = donarEmail;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.donarAge = donarAge;
		this.bloodGroup = bloodGroup;
		this.address = address;
		this.available = true;
	}


    public int getDonarId() {
        return donarId;
    }

    public void setDonarId(int donarId) {
        this.donarId = donarId;
    }

    public String getDonarName() {
        return donarName;
    }

    public void setDonarName(String donarName) {
        this.donarName = donarName;
    }

    public String getDonarEmail() {
        return donarEmail;
    }

    public void setDonarEmail(String donarEmail) {
        this.donarEmail = donarEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getDonarAge() {
        return donarAge;
    }

    public void setDonarAge(int donarAge) {
        this.donarAge = donarAge;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public LocalDate getLastDonationDate() {
        return lastDonationDate;
    }

    public void setLastDonationDate(LocalDate lastDonationDate) {
        this.lastDonationDate = lastDonationDate;
    }
}
