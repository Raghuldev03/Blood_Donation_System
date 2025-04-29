package com.example.demo.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.swing.text.Document;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.modal.Admin_Details;
import com.example.demo.modal.BloodBank;
import com.example.demo.modal.BloodQuantity;
import com.example.demo.modal.BloodRequest;
import com.example.demo.modal.Donar_Details;
import com.example.demo.modal.Donation;
import com.example.demo.repository.BloodQuantityRepository;
import com.example.demo.repository.BloodRequestRepository;
import com.example.demo.repository.DonationRepository;
import com.example.demo.repository.adminRepo;
import com.example.demo.repository.bloodbankRepo;
import com.example.demo.repository.donarRepo;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class BloodDonationService {
	
	@Autowired
	adminRepo adminrepo;
	
	@Autowired
	donarRepo donarrepo;
	
	@Autowired
	bloodbankRepo bloodbankrepo;
	
	@Autowired
    private BloodRequestRepository bloodRequestRepo;
	
	@Autowired
    private DonationRepository donationRepo;
	
	@Autowired
    private BloodQuantityRepository quantityRepo;
	
	// view all doanrs
	public List<Donar_Details> getvalues() {
		return donarrepo.findAll();
	}
	public List<Donar_Details> getdonar() {
		return donarrepo.findAll();
	}
	public List<Donar_Details> fetchvalues() {
		return donarrepo.findAll();
	}
	public List<BloodRequest> getbloodquanity() {
		return bloodRequestRepo.findAll();
	}
	
	public List<BloodBank> getAllbank() {
		return bloodbankrepo.findAll();
	}
	//admin login
	public String getAdminData(String username, String password) {
	    Admin_Details admin = adminrepo.findByadminUsername(username);

	    if (admin != null) {
	        if (admin.getAdmin_Username().equals(username)) {
	            if (password.equals(admin.getAdmin_Password())) {
	                return "Admin login successful";
	            } else {
	                return "Incorrect password";
	            }
	        }
	    }

	    return "Admin not found";
	}

	//donar Login
	public String getdonardData(String donarEmail, String password) {
		Donar_Details login=donarrepo.findBydonarEmail(donarEmail);
		if(login!=null) {
			if (login.getDonarEmail().equals(donarEmail)) {
				if(password.equals(login.getPassword())) {
					return "Donor login successful";
				}
				else {
					return "Incorrect password";
				}
			}
		}

	    return "Donar not found";
	}

	
	// donar registration
	public boolean saveDonarData(String donarName, String donarEmail, String password, Long phoneNumber, int donarAge,
	        String bloodGroup, String address, LocalDate lastDonationDate, boolean available) {
	    
		if (donarAge < 18 || donarAge > 50) {
	        return false;
	    }

	    Donar_Details data = new Donar_Details(donarName, donarEmail, password, phoneNumber, donarAge, bloodGroup, address);
	    data.setLastDonationDate(lastDonationDate);
	    data.setAvailable(available);
	    donarrepo.save(data);
	    return true;
	}
	
	//password update
	public String updatepassword(String donarEmail, String password) {
	    Donar_Details update = donarrepo.findBydonarEmail(donarEmail);
	    
	    if (update != null) {
	    	if(update.getDonarEmail().equals(donarEmail)) {
	    		if (!update.getPassword().equals(password)) {
	    			update.setPassword(password); 
	    			donarrepo.save(update);
	    			return "Password updated successfully";
	    		} 
	    		else {
	    			return "New password must be different from the current one";
	    		}
	    	}
	    }
	    return "Incorrect Username";
	}
	
	// donar registration
	public boolean saveBloodBankData(String bloodBankName, String email, String registrationNumber,
            String licenseNumber, String bloodBankType, String availableBloodComponents,
            String contactNumber, LocalDate licenseValidityDate,
            String authorizedPersonName, String personAadhar, String address) {
	try {
	BloodBank bloodBank = new BloodBank();
	
	bloodBank.setBloodBankName(bloodBankName);
	bloodBank.setEmail(email);
	bloodBank.setRegistrationNumber(registrationNumber);
	bloodBank.setLicenseNumber(licenseNumber);
	bloodBank.setBloodBankType(bloodBankType);
	bloodBank.setAvailableBloodComponents(availableBloodComponents);
	bloodBank.setContactNumber(contactNumber);
	bloodBank.setLicenseValidityDate(licenseValidityDate);
	bloodBank.setAuthorizedPersonName(authorizedPersonName);
	bloodBank.setPersonAadhar(personAadhar);
	bloodBank.setAddress(address);
	bloodbankrepo.save(bloodBank);
		return true;
	} catch (Exception e) {
		e.printStackTrace();
		return false;
		}
	}
	
	public void deleteDonorById(int id) {
	    donarrepo.deleteById(id);
	}
	

	public List<BloodBank> getpendingApproval() {
		return bloodbankrepo.findByApprovedFalse();
	}

	public ResponseEntity<String> postdata(BloodBank bloodBank) {
	    try {
	    	bloodbankrepo.save(bloodBank); // stores in DB with PENDING status
	        return ResponseEntity.ok("Registration request submitted.");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during registration.");
	    }
	}

	public ResponseEntity<String> valutlogin(Map<String, String> credentials) {
		String email = credentials.get("email");
        String registrationNumber = credentials.get("registrationNumber");

        Optional<BloodBank> optionalBloodBank = bloodbankrepo.findByEmail(email);
        if (optionalBloodBank.isPresent()) {
            BloodBank bloodBank = optionalBloodBank.get();
            if (!bloodBank.isApproved()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account not approved.");
            }
            if (bloodBank.getRegistrationNumber().equals(registrationNumber)) {
                return ResponseEntity.ok("Login successful.");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
	}

	public ResponseEntity<String> approvebloodbank(Integer id) {
		Optional<BloodBank> optionalBloodBank = bloodbankrepo.findById(id);
        if (optionalBloodBank.isPresent()) {
            BloodBank bloodBank = optionalBloodBank.get();
            bloodBank.setStatus("APPROVED");
            bloodBank.setApproved(true);
            bloodbankrepo.save(bloodBank);
            return ResponseEntity.ok("Blood bank approved.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blood bank not found.");
	}
	public ResponseEntity<String> rejectbloodbank(Integer id) {
	    Optional<BloodBank> optionalBloodBank = bloodbankrepo.findById(id);
	    if (optionalBloodBank.isPresent()) {
	        BloodBank bloodBank = optionalBloodBank.get();
	        bloodBank.setStatus("REJECTED");
	        bloodBank.setApproved(false);
	        bloodbankrepo.save(bloodBank);
	        return ResponseEntity.ok("Blood bank rejected.");
	    }
	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blood bank not found.");
	}

	public List<BloodBank> getAllBloodBanks() {
		// TODO Auto-generated method stub
		return bloodbankrepo.findAll();
	}
	
	public ResponseEntity<String> deleteBloodBank(Integer id) {
	    Optional<BloodBank> optional = bloodbankrepo.findById(id);
	    if (optional.isPresent()) {
	        bloodbankrepo.deleteById(id);
	        return ResponseEntity.ok("Blood bank deleted successfully.");
	    }
	    return ResponseEntity.status(404).body("Blood bank not found.");
	}

	public ResponseEntity<String> unapproveBloodBank(Integer id) {
	    Optional<BloodBank> optional = bloodbankrepo.findById(id);
	    if (optional.isPresent()) {
	        BloodBank bloodBank = optional.get();
	        bloodBank.setApproved(false);
	        bloodBank.setStatus("UNAPPROVED");
	        bloodbankrepo.save(bloodBank);
	        return ResponseEntity.ok("Blood bank unapproved successfully.");
	    }
	    return ResponseEntity.status(404).body("Blood bank not found.");
	}

	private final List<String> BLOOD_TYPES = Arrays.asList("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-");

    public List<BloodQuantity> getOrCreateQuantities(String regNo) {
        Optional<BloodBank> bankOpt = bloodbankrepo.findByRegistrationNumber(regNo);
        if (bankOpt.isEmpty()) throw new RuntimeException("BloodBank not found!");

        BloodBank bank = bankOpt.get();

        List<BloodQuantity> existing = quantityRepo.findByBloodBank_RegistrationNumber(regNo);
        if (existing.isEmpty()) {
            for (String type : BLOOD_TYPES) {
                BloodQuantity bq = new BloodQuantity();
                bq.setBloodType(type);
                bq.setQuantity(0);
                bq.setDateOfCollection(LocalDate.now());
                bq.setBloodBank(bank);
                quantityRepo.save(bq);
            }
        }

        return quantityRepo.findByBloodBank_RegistrationNumber(regNo);
    }
	

    public Map<String, String> getStatus(String regNo) {
        List<BloodQuantity> quantities = quantityRepo.findByBloodBank_RegistrationNumber(regNo);
        Map<String, String> statusMap = new HashMap<>();
        for (BloodQuantity q : quantities) {
            statusMap.put(q.getBloodType(), q.getQuantity() < 5 ? "Lesser Quantity" : "More Quantity");
        }
        return statusMap;
    }
   

    // Save a blood request
    public ResponseEntity<String> saveBloodRequest(Map<String, Object> request) {
        try {
            BloodRequest br = new BloodRequest();
            br.setRegistrationNumber((String) request.get("registrationNumber"));
            br.setBloodType((String) request.get("bloodType"));
            br.setQuantity((int) request.get("quantity"));
            br.setStatus("PENDING");
            br.setRequestedDate(LocalDate.now());

            bloodRequestRepo.save(br);
            return ResponseEntity.ok("Blood request submitted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request.");
        }
    }
    public ResponseEntity<String> updateRequestStatus(Long id, String status) {
        try {
            Optional<BloodRequest> optional = bloodRequestRepo.findById(id);
            if (optional.isPresent()) {
                BloodRequest br = optional.get();
                br.setStatus(status.toUpperCase());
                bloodRequestRepo.save(br);
                return ResponseEntity.ok("Request status updated to " + status);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating status");
        }
    }


    // Get all requests
    public List<BloodRequest> getAllBloodRequests() {
        return bloodRequestRepo.findAll();
    }
	
    public ResponseEntity<String> updateBloodRequestByRegNoAndType(String registrationNumber, String bloodType, Map<String, Integer> quantityMap) {
        int quantityToAdd = quantityMap.get("quantity");

        Optional<BloodQuantity> optional = quantityRepo.findByBloodBank_RegistrationNumberAndBloodType(registrationNumber, bloodType);


        if (optional.isPresent()) {
            BloodQuantity bloodQuantity = optional.get();
            bloodQuantity.setQuantity(bloodQuantity.getQuantity() + quantityToAdd);
            bloodQuantity.setDateOfCollection((LocalDate.now()));
            quantityRepo.save(bloodQuantity);
            return ResponseEntity.ok("Blood quantity and date updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("BloodQuantity not found.");
        }
    }

    //donar
    public Donar_Details getDonarDetailsByEmail(String email) {
        return donarrepo.findBydonarEmail(email);
    }

 // Save or Update donation
    public Donation saveDonation(Donation donation) {
        donation.setCreatedAt(new Date()); // Set createdAt to the current date and time
        return donationRepo.save(donation);
    }


    public Optional<Donation> getDonationById(Long id) {
        return donationRepo.findById(id);
    }


    public List<Donation> getAllDonations() {
        return donationRepo.findAll();
    }

    public Donation updateDonationStatusByEmail(String donorEmail, String status) {
        Donation donation = donationRepo.findByDonorEmail(donorEmail);
        if (donation != null) {
            donation.setStatus(status);
            
            Date createdAt = donation.getCreatedAt();
            if (createdAt != null) {
                LocalDate lastDonationDate = createdAt.toInstant()
                                                      .atZone(java.time.ZoneId.systemDefault())
                                                      .toLocalDate();
                Donar_Details donorDetails = donarrepo.findBydonarEmail(donorEmail);
                if (donorDetails != null) {
                    donorDetails.setLastDonationDate(lastDonationDate);
                    donarrepo.save(donorDetails);
                }
            } else {
                throw new RuntimeException("Created date is null for the donation");
            }

            return donationRepo.save(donation);
        }
        return null;
    }
    
    public Donation updateDonationStatusAndDate(String donorEmail, Donation updatedDonation) {
        Donation donation = donationRepo.findByDonorEmail(donorEmail);
        if (donation != null) {
            donation.setStatus(updatedDonation.getStatus());
            donation.setDate(updatedDonation.getDate());
            donation.setTime(updatedDonation.getTime());

            LocalDate lastDonationDate = updatedDonation.getDate().toInstant()
                .atZone(java.time.ZoneId.systemDefault())
                .toLocalDate();

            Donar_Details donorDetails = donarrepo.findBydonarEmail(donorEmail);
            if (donorDetails != null) {
                donorDetails.setLastDonationDate(lastDonationDate);
                donarrepo.save(donorDetails);
            }

            return donationRepo.save(donation);
        }
        return null;
    }
    

    public List<Donation> getApprovedDonationsByEmail(String email) {
        return donationRepo.findByDonorEmailAndStatus(email, "Approved");
    }

    public Optional<Donar_Details> getDonorDetailsByEmail(String email) {
        return Optional.ofNullable(donarrepo.findBydonarEmail(email));
    }


    

}