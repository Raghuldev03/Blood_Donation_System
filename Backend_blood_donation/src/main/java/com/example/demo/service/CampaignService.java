package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modal.BloodRequest;
import com.example.demo.modal.Campaign;
import com.example.demo.repository.CampaignRepository;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;
    
    public List<Campaign> getcampain() {
		return campaignRepository.findAll();
		}

    // Create a new campaign
    public Campaign createCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    // Get campaign by ID
    public Optional<Campaign> getCampaignById(Long id) {
        return campaignRepository.findById(id);
    }

    // Admin approve campaign
    public Campaign approveCampaign(Long id) {
        Optional<Campaign> campaign = campaignRepository.findById(id);
        if (campaign.isPresent()) {
            Campaign c = campaign.get();
            c.setStatus("Approved");
            return campaignRepository.save(c);
        } else {
            throw new RuntimeException("Campaign not found");
        }
    }

    // Admi close campaign
    public Campaign closeCampaign(Long id) {
        Optional<Campaign> campaign = campaignRepository.findById(id);
        if (campaign.isPresent()) {
            Campaign c = campaign.get();
            c.setStatus("Closed");
            return campaignRepository.save(c);
        } else {
            throw new RuntimeException("Campaign not found");
        }
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

	public List<Campaign> getapproved() {
		return campaignRepository.findByStatus("Approved");
	}
}
