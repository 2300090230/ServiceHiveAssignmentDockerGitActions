package com.servicehive.slotswapper.service;

import java.util.List;

import com.servicehive.slotswapper.model.SwapRequest;

public interface SwapService {
    
    SwapRequest createSwapRequest(String mySlotId, String theirSlotId, String requesterId);
    
    SwapRequest respondToSwapRequest(String requestId, boolean accept, String userId);
    
    List<SwapRequest> getIncomingRequests(String userId);
    
    List<SwapRequest> getOutgoingRequests(String userId);
    
    SwapRequest getSwapRequestById(String requestId);
}