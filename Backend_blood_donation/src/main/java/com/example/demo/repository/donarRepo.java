package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modal.Donar_Details;

public interface donarRepo extends JpaRepository<Donar_Details, Integer>{
	Donar_Details findBydonarEmail(String donarEmail);
}
