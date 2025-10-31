package com.servicehive.slotswapper.service;

import java.time.LocalDateTime;
import java.util.List;

import com.servicehive.slotswapper.model.Event;
import com.servicehive.slotswapper.model.EventStatus;

public interface EventService {
    
    Event createEvent(String title, LocalDateTime startTime, LocalDateTime endTime, String userId);
    
    List<Event> getAllEventsByUser(String userId);
    
    Event getEventById(String eventId);
    
    Event updateEvent(String eventId, String title, LocalDateTime startTime, LocalDateTime endTime, String userId);
    
    Event updateEventStatus(String eventId, EventStatus status, String userId);
    
    void deleteEvent(String eventId, String userId);
    
    List<Event> getSwappableSlots(String currentUserId);
    
    List<Event> getUserSwappableSlots(String userId);
}
