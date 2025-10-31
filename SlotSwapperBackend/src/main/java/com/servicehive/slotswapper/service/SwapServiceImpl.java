package com.servicehive.slotswapper.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.servicehive.slotswapper.model.Event;
import com.servicehive.slotswapper.model.EventStatus;
import com.servicehive.slotswapper.model.SwapRequest;
import com.servicehive.slotswapper.model.SwapStatus;
import com.servicehive.slotswapper.repository.EventRepository;
import com.servicehive.slotswapper.repository.SwapRequestRepository;

@Service
public class SwapServiceImpl implements SwapService {
    
    private final SwapRequestRepository swapRequestRepository;
    private final EventRepository eventRepository;
    
    public SwapServiceImpl(SwapRequestRepository swapRequestRepository,
                          EventRepository eventRepository) {
        this.swapRequestRepository = swapRequestRepository;
        this.eventRepository = eventRepository;
    }
    
    @Override
    @Transactional
    public SwapRequest createSwapRequest(String mySlotId, String theirSlotId, String requesterId) {
        // Validate my slot
        Event mySlot = eventRepository.findById(mySlotId)
                .orElseThrow(() -> new RuntimeException("Your slot not found"));
        
        if (!mySlot.getUserId().equals(requesterId)) {
            throw new RuntimeException("You don't own this slot");
        }
        
        if (mySlot.getStatus() != EventStatus.SWAPPABLE) {
            throw new RuntimeException("Your slot must be SWAPPABLE");
        }
        
        // Validate their slot
        Event theirSlot = eventRepository.findById(theirSlotId)
                .orElseThrow(() -> new RuntimeException("Their slot not found"));
        
        if (theirSlot.getUserId().equals(requesterId)) {
            throw new RuntimeException("Cannot swap with your own slot");
        }
        
        if (theirSlot.getStatus() != EventStatus.SWAPPABLE) {
            throw new RuntimeException("Their slot must be SWAPPABLE");
        }
        
        // Update both slots to SWAP_PENDING
        mySlot.setStatus(EventStatus.SWAP_PENDING);
        theirSlot.setStatus(EventStatus.SWAP_PENDING);
        eventRepository.save(mySlot);
        eventRepository.save(theirSlot);
        
        // Create swap request
        SwapRequest swapRequest = new SwapRequest();
        swapRequest.setRequesterId(requesterId);
        swapRequest.setRequesterSlotId(mySlotId);
        swapRequest.setReceiverId(theirSlot.getUserId());
        swapRequest.setReceiverSlotId(theirSlotId);
        swapRequest.setStatus(SwapStatus.PENDING);
        
        return swapRequestRepository.save(swapRequest);
    }
    
    @Override
    @Transactional
    public SwapRequest respondToSwapRequest(String requestId, boolean accept, String userId) {
        SwapRequest swapRequest = swapRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Swap request not found"));
        
        // Verify the user is the receiver
        if (!swapRequest.getReceiverId().equals(userId)) {
            throw new RuntimeException("You are not authorized to respond to this request");
        }
        
        if (swapRequest.getStatus() != SwapStatus.PENDING) {
            throw new RuntimeException("Swap request is not pending");
        }
        
        Event requesterSlot = eventRepository.findById(swapRequest.getRequesterSlotId())
                .orElseThrow(() -> new RuntimeException("Requester slot not found"));
        
        Event receiverSlot = eventRepository.findById(swapRequest.getReceiverSlotId())
                .orElseThrow(() -> new RuntimeException("Receiver slot not found"));
        
        if (accept) {
            // ACCEPT: Exchange ownership and set status to BUSY
            String tempUserId = requesterSlot.getUserId();
            requesterSlot.setUserId(receiverSlot.getUserId());
            receiverSlot.setUserId(tempUserId);
            
            requesterSlot.setStatus(EventStatus.BUSY);
            receiverSlot.setStatus(EventStatus.BUSY);
            
            swapRequest.setStatus(SwapStatus.ACCEPTED);
        } else {
            // REJECT: Revert status back to SWAPPABLE
            requesterSlot.setStatus(EventStatus.SWAPPABLE);
            receiverSlot.setStatus(EventStatus.SWAPPABLE);
            
            swapRequest.setStatus(SwapStatus.REJECTED);
        }
        
        requesterSlot.setUpdatedAt(LocalDateTime.now());
        receiverSlot.setUpdatedAt(LocalDateTime.now());
        swapRequest.setUpdatedAt(LocalDateTime.now());
        
        eventRepository.save(requesterSlot);
        eventRepository.save(receiverSlot);
        
        return swapRequestRepository.save(swapRequest);
    }
    
    @Override
    public List<SwapRequest> getIncomingRequests(String userId) {
        return swapRequestRepository.findByReceiverIdAndStatus(userId, SwapStatus.PENDING);
    }
    
    @Override
    public List<SwapRequest> getOutgoingRequests(String userId) {
        return swapRequestRepository.findByRequesterIdAndStatus(userId, SwapStatus.PENDING);
    }
    
    @Override
    public SwapRequest getSwapRequestById(String requestId) {
        return swapRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Swap request not found"));
    }
}
