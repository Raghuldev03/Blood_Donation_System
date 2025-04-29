package com.example.demo.modal;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BloodQuantity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodType;
    private int quantity;
    private LocalDate dateOfCollection;

    @ManyToOne
    @JoinColumn(name = "registration_number", referencedColumnName = "registrationNumber")
    private BloodBank bloodBank;

	public String getBloodType() {
		return bloodType;
	}

	public void setBloodType(String bloodType) {
		this.bloodType = bloodType;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public LocalDate getDateOfCollection() {
		return dateOfCollection;
	}

	public void setDateOfCollection(LocalDate dateOfCollection) {
		this.dateOfCollection = dateOfCollection;
	}

	public BloodBank getBloodBank() {
		return bloodBank;
	}

	public void setBloodBank(BloodBank bloodBank) {
		this.bloodBank = bloodBank;
	}

}
