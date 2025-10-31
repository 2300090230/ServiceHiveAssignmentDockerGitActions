package com.servicehive.slotswapper.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.servicehive.slotswapper.model.SwapRequest;
import com.servicehive.slotswapper.model.SwapStatus;

@Repository
public interface SwapRequestRepository extends MongoRepository<SwapRequest, String> {
    
    List<SwapRequest> findByRequesterId(String requesterId);
    
    List<SwapRequest> findByReceiverId(String receiverId);
    
    List<SwapRequest> findByReceiverIdAndStatus(String receiverId, SwapStatus status);
    
    List<SwapRequest> findByRequesterIdAndStatus(String requesterId, SwapStatus status);
}