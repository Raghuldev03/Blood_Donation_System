package com.example.demo.modal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin_Details {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int adminId;
	private String adminName;
	private String adminUsername;
	private String adminPassword;
	
	public Admin_Details() {
	}
	public Admin_Details(String admin_Name, String admin_Username, String admin_Password) {
		adminName = admin_Name;
		adminUsername = admin_Username;
		adminPassword = admin_Password;
	}
	
	public int getAdmin_ID() {
		return adminId;
	}
	public void setAdmin_ID(int admin_ID) {
		adminId = admin_ID;
	}
	public String getAdmin_Name() {
		return adminName;
	}
	public void setAdmin_Name(String admin_Name) {
		adminName = admin_Name;
	}
	public String getAdmin_Username() {
		return adminUsername;
	}
	public void setAdmin_Username(String admin_Username) {
		adminUsername = admin_Username;
	}
	public String getAdmin_Password() {
		return adminPassword;
	}
	public void setAdmin_Password(String admin_Password) {
		adminPassword = admin_Password;
	}

}
