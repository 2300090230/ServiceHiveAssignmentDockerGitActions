package com.servicehive.slotswapper.dto;

import java.time.LocalDateTime;

import com.servicehive.slotswapper.model.Event;
import com.servicehive.slotswapper.model.EventStatus;

public class EventResponse {
    
    private String id;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private EventStatus status;
    private String userId;
    private String userName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public EventResponse() {}
    
    public EventResponse(Event event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.startTime = event.getStartTime();
        this.endTime = event.getEndTime();
        this.status = event.getStatus();
        this.userId = event.getUserId();
        this.createdAt = event.getCreatedAt();
        this.updatedAt = event.getUpdatedAt();
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public LocalDateTime getStartTime() {
        return startTime;
    }
    
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
    
    public LocalDateTime getEndTime() {
        return endTime;
    }
    
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
    
    public EventStatus getStatus() {
        return status;
    }
    
    public void setStatus(EventStatus status) {
        this.status = status;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
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