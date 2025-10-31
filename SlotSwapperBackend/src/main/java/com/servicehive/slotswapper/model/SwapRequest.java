package com.servicehive.slotswapper.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "swap_requests")
public class SwapRequest {
    
    @Id
    private String id;
    
    private String requesterId;
    
    private String requesterSlotId;
    
    private String receiverId;
    
    private String receiverSlotId;
    
    private SwapStatus status;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    public SwapRequest() {
        this.status = SwapStatus.PENDING;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public SwapRequest(String requesterId, String requesterSlotId, 
                      String receiverId, String receiverSlotId) {
        this.requesterId = requesterId;
        this.requesterSlotId = requesterSlotId;
        this.receiverId = receiverId;
        this.receiverSlotId = receiverSlotId;
        this.status = SwapStatus.PENDING;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getRequesterId() {
        return requesterId;
    }
    
    public void setRequesterId(String requesterId) {
        this.requesterId = requesterId;
    }
    
    public String getRequesterSlotId() {
        return requesterSlotId;
    }
    
    public void setRequesterSlotId(String requesterSlotId) {
        this.requesterSlotId = requesterSlotId;
    }
    
    public String getReceiverId() {
        return receiverId;
    }
    
    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }
    
    public String getReceiverSlotId() {
        return receiverSlotId;
    }
    
    public void setReceiverSlotId(String receiverSlotId) {
        this.receiverSlotId = receiverSlotId;
    }
    
    public SwapStatus getStatus() {
        return status;
    }
    
    public void setStatus(SwapStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}