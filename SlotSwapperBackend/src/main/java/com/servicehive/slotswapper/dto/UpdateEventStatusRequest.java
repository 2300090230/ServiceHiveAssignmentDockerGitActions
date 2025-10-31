package com.servicehive.slotswapper.dto;

import com.servicehive.slotswapper.model.EventStatus;

import jakarta.validation.constraints.NotNull;

public class UpdateEventStatusRequest {
    
    @NotNull(message = "Status is required")
    private EventStatus status;
    
    public UpdateEventStatusRequest() {}
    
    public EventStatus getStatus() {
        return status;
    }
    
    public void setStatus(EventStatus status) {
        this.status = status;
    }
}
