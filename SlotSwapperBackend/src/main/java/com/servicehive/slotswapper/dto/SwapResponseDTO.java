package com.servicehive.slotswapper.dto;



import jakarta.validation.constraints.NotNull;

public class SwapResponseDTO {
    
    @NotNull(message = "Accept field is required")
    private Boolean accept;
    
    public SwapResponseDTO() {}
    
    public Boolean getAccept() {
        return accept;
    }
    
    public void setAccept(Boolean accept) {
        this.accept = accept;
    }
}