package com.example.demo.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modal.BloodBank;
import com.example.demo.modal.BloodQuantity;
import com.example.demo.modal.BloodRequest;
import com.example.demo.modal.Donar_Details;
import com.example.demo.modal.Donation;
import com.example.demo.service.BloodDonationService;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "*")
public class BloodDonationController {
	
	@Autowired
	BloodDonationService bloodservice;
	
	@GetMapping("/donors")
    public List<Donar_Details> getAllDonors() {
        return bloodservice.getdonar();
    }
    @GetMapping("/bloodbanks")
    public List<BloodBank> getBloodBanks() {
        return bloodservice.getAllbank();
    }
    @GetMapping("/request")
    public List<BloodRequest> getBloodquantity() {
        return bloodservice.getbloodquanity();
    }
	@GetMapping("/admin/viewdonar")
	public List<Donar_Details> getdata(){
		return bloodservice.getvalues();
	}
	@GetMapping("/valut/viewdonar")
	public List<Donar_Details> getddata(){
		return bloodservice.fetchvalues();
	}
	
	@PostMapping("/admin/login")
	public String getadmindata(@RequestParam("adminUsername") String adminUsername, @RequestParam("adminPassword") String adminPassword) {
		return bloodservice.getAdminData(adminUsername, adminPassword);
	}
	
	@PostMapping("/donar/login")
	public String getdonarddata(@RequestParam("donarEmail") String donarEmail, @RequestParam("password") String password) {
		return bloodservice.getdonardData(donarEmail, password);
	}
	
	@PostMapping("/donar/signup")
	public boolean postDonarData(
	    @RequestParam("donarName") String donarName,
	    @RequestParam("donarEmail") String donarEmail,
	    @RequestParam("password") String password,
	    @RequestParam("phoneNumber") Long phoneNumber,
	    @RequestParam("donarAge") int donarAge,
	    @RequestParam("bloodGroup") String bloodGroup,
	    @RequestParam("address") String address,
	    @RequestParam("lastDonationDate") String lastDonationDateStr,
	    @RequestParam("available") boolean available
	) {
	    LocalDate lastDonationDate = LocalDate.parse(lastDonationDateStr); // Converts from String to LocalDate
	    return bloodservice.saveDonarData(donarName, donarEmail, password, phoneNumber, donarAge, bloodGroup, address, lastDonationDate, available);
	}

	
	@PutMapping("/donar/forgetPassword")
	public String updatepassword(
	    @RequestParam("donarEmail") String donarEmail,
	    @RequestParam("password") String password) {
		 if (donarEmail == null || donarEmail.isEmpty() || password == null || password.isEmpty()) {
	            return "Email and password must not be empty";
	        }

	    return bloodservice.updatepassword(donarEmail, password);
	}

	@PostMapping("/vault/signup")
	public ResponseEntity<String> registerBloodBank(@RequestBody BloodBank bloodBank) {
		bloodBank.setStatus("PENDING");
       return bloodservice.postdata(bloodBank);
    }
	
	@PostMapping("/vault/login")
	public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        return bloodservice.valutlogin(credentials);
    }
	 
	 @DeleteMapping("/admin/deletedonor/{id}")
	 public String deleteDonor(@PathVariable int id) {
	     bloodservice.deleteDonorById(id);
	     return "Donor deleted successfully";
	 }
	 
	 @Transactional
	 @DeleteMapping("admin/reject/{id}")
	 public ResponseEntity<String> rejectBloodBank(@PathVariable Integer id) {
	    return bloodservice.rejectbloodbank(id);
	 }
	 
	 @GetMapping("admin/pending-approvals")
	    public List<BloodBank> getPendingApprovals() {
	        return bloodservice.getpendingApproval();
	    }
	 
	   @Transactional
	   @PostMapping("admin/approve/{id}")
	    public ResponseEntity<String> approveBloodBank(@PathVariable Integer id) {
	        return bloodservice.approvebloodbank(id);
	    }
	   
	   @GetMapping("/admin/viewbloodbanks")
	   public List<BloodBank> getAllBloodBanks() {
	       return bloodservice.getAllBloodBanks();
	   }
	   @DeleteMapping("/admin/deletebloodbank/{id}")
	   public ResponseEntity<String> deleteBloodBank(@PathVariable Integer id) {
	       return bloodservice.deleteBloodBank(id);
	   }

	   @PatchMapping("/admin/unapprovebloodbank/{id}")
	   public ResponseEntity<String> unapproveBloodBank(@PathVariable Integer id) {
	       return bloodservice.unapproveBloodBank(id);
	   }
	   
	   @GetMapping("/valut/bloodquantity/{regNo}")
	    public List<BloodQuantity> getBloodData(@PathVariable String regNo) {
	        return bloodservice.getOrCreateQuantities(regNo);
	    }

	   public static class UpdateRequest {
		    public String registrationNumber;
		    public String bloodType;
		    public int quantity;
		}

//		@PutMapping("/valut/bloodquantity/update")
//		public String updateBloodQuantity(@RequestBody UpdateRequest request) {
//		    bloodservice.updateQuantity(
//		        request.registrationNumber,
//		        request.bloodType,
//		        request.quantity
//		    );
//		    return "Updated successfully";
//		}

	    @GetMapping("/valut/bloodquantity/status/{regNo}")
	    public Map<String, String> getStatus(@PathVariable String regNo) {
	        return bloodservice.getStatus(regNo);
	    }
	    
	    @PostMapping("/valut/bloodquantity/request")
	    public ResponseEntity<String> requestBlood(@RequestBody Map<String, Object> request) {
	        String registrationNumber = (String) request.get("registrationNumber");
	        String bloodType = (String) request.get("bloodType");
	        int quantity = (int) request.get("quantity");


	        return ResponseEntity.ok("Blood request received successfully.");
	    }
	    @PostMapping("/valut/bloodrequest")
	    public ResponseEntity<String> submitBloodRequest(@RequestBody Map<String, Object> request) {
	        return bloodservice.saveBloodRequest(request);
	    }
	    
	    @PutMapping("/valut/bloodrequest/status")
	    public ResponseEntity<String> updateRequestStatus(
	            @RequestParam Long id,
	            @RequestParam String status) {
	        return bloodservice.updateRequestStatus(id, status);
	    }

	    @GetMapping("/valut/bloodrequests")
	    public List<BloodRequest> getAllBloodRequests() {
	        return bloodservice.getAllBloodRequests();
	    }
	    @PutMapping("/valut/bloodquantity/update")
	    public ResponseEntity<String> updateBloodQuantityByRegNoAndType(
	        @RequestParam String registrationNumber,
	        @RequestParam String bloodType,
	        @RequestBody Map<String, Integer> quantityMap
	    ) {
	        return bloodservice.updateBloodRequestByRegNoAndType(registrationNumber, bloodType, quantityMap);
	    }
	    //donar
	    @GetMapping("/donar/details")
	    public Map<String, String> getDonorDetails(@RequestParam String email) {
	        Donar_Details donor = bloodservice.getDonarDetailsByEmail(email);
	        Map<String, String> response = new HashMap<>();

	        if (donor != null) {
	            response.put("donorName", donor.getDonarName());
	            response.put("bloodGroup", donor.getBloodGroup());
	            response.put("lastDonationDate", donor.getLastDonationDate().toString());  // Using ISO format by default
	        } else {
	            response.put("error", "Donor not found");
	        }
	        return response;
	    }

	    // Get all donations
	    @GetMapping("/donar/donation/all")
	    public ResponseEntity<List<Donation>> getAllDonations() {
	        List<Donation> donations = bloodservice.getAllDonations();
	        return new ResponseEntity<>(donations, HttpStatus.OK);
	    }
	    
	    @PostMapping("/donar/donation/savedata")
	    public ResponseEntity<Donation> saveDonation(@RequestBody Donation donation) {
	        System.out.println("Received donation: " + donation);
	        // Save donation to the database
	        Donation savedDonation = bloodservice.saveDonation(donation);

	        return ResponseEntity.status(HttpStatus.CREATED).body(savedDonation);
	    }
	    
	    @PutMapping("/donar/donation/updateStatusByEmail")
	    public Donation updateDonationStatus(@RequestParam String donorEmail,
	                                         @RequestParam String status) {

	        Donation updatedDonation = bloodservice.updateDonationStatusByEmail(donorEmail, status);

	        if (updatedDonation != null) {
	            return updatedDonation;
	        } else {
	            throw new RuntimeException("Donation not found for the given donorEmail");
	        }
	    }

	    @PutMapping("/donar/donation/updateDonationStatusAndDate")
	    public Donation updateDonationStatusAndDate(@RequestParam String donorEmail, @RequestBody Donation updatedDonation) {

	        // First, we will update the donation status and date
	        Donation updated = bloodservice.updateDonationStatusAndDate(donorEmail, updatedDonation);

	        if (updated != null) {
	            return updated;
	        } else {
	            throw new RuntimeException("Donation not found for the given donorEmail");
	        }
	    }
	    
	    
	    @GetMapping("/donar/certificate/approved")
	    public ResponseEntity<List<Donation>> getApprovedDonationsByEmail(@RequestParam String email) {
	        List<Donation> approvedDonations = bloodservice.getApprovedDonationsByEmail(email);
	        return ResponseEntity.ok(approvedDonations);
	    }

	    @GetMapping("/donor/certificate/details")
	    public ResponseEntity<Donar_Details> getDonorDetailsByEmail(@RequestParam String email) {
	        Optional<Donar_Details> donor = bloodservice.getDonorDetailsByEmail(email);
	        return donor.map(ResponseEntity::ok)
	                    .orElseGet(() -> ResponseEntity.notFound().build());
	    }

}
