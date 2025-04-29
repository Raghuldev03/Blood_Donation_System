package com.example.demo.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.modal.BloodRequest;
import com.example.demo.modal.Campaign;
import com.example.demo.service.CampaignService;

@RestController
@CrossOrigin(origins = "*")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;
    
    @GetMapping("/campain")
    public List<Campaign> getcampain() {
        return campaignService.getcampain();
    }

    // new campaign
    @PostMapping("valut/campaign/create")
    public ResponseEntity<Campaign> createCampaign(@RequestBody Campaign campaign) {
        Campaign createdCampaign = campaignService.createCampaign(campaign);
        return ResponseEntity.ok(createdCampaign);
 
    }

    // Get all
    @GetMapping("admin/campaign/all")
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        List<Campaign> allCampaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(allCampaigns);
    }
    
    @GetMapping("valut/campain/approvedcampain")
    public List<Campaign> getApprovedCampaigns() {
        return campaignService.getapproved();
    }
    
    // Admin approves
    @PatchMapping("valut/campaign/approve/{id}")
    public ResponseEntity<Campaign> approveCampaign(@PathVariable Long id) {
        Campaign approvedCampaign = campaignService.approveCampaign(id);
        return ResponseEntity.ok(approvedCampaign);
    }

    // Admin closes
    @PatchMapping("valut/campaign/close/{id}")
    public ResponseEntity<Campaign> closeCampaign(@PathVariable Long id) {
        Campaign closedCampaign = campaignService.closeCampaign(id);
        return ResponseEntity.ok(closedCampaign);
    }

    // Get campaign by ID
    @GetMapping("valut/campaign/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable Long id) {
        Optional<Campaign> campaign = campaignService.getCampaignById(id);
        return campaign.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
