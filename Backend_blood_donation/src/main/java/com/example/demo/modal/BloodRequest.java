package com.example.demo.modal;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registrationNumber;
    private String bloodType;
    private int quantity;

    private String status;

    private LocalDate requestedDate;

    // Constructor to set default values
    public BloodRequest() {
        this.status = "PENDING";
        this.requestedDate = LocalDate.now();
    }

    // Getters & Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getRegistrationNumber() { return registrationNumber; }

    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getBloodType() { return bloodType; }

    public void setBloodType(String bloodType) { this.bloodType = bloodType; }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public LocalDate getRequestedDate() { return requestedDate; }

    public void setRequestedDate(LocalDate requestedDate) { this.requestedDate = requestedDate; }
}
