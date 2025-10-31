package com.servicehive.slotswapper.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.servicehive.slotswapper.model.Event;
import com.servicehive.slotswapper.model.EventStatus;
import com.servicehive.slotswapper.repository.EventRepository;

@Service
public class EventServiceImpl implements EventService {
    
    private final EventRepository eventRepository;
    
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    @Override
    public Event createEvent(String title, LocalDateTime startTime, LocalDateTime endTime, String userId) {
        if (startTime.isAfter(endTime)) {
            throw new RuntimeException("Start time must be before end time");
        }
        
        Event event = new Event();
        event.setTitle(title);
        event.setStartTime(startTime);
        event.setEndTime(endTime);
        event.setUserId(userId);
        event.setStatus(EventStatus.BUSY);
        
        return eventRepository.save(event);
    }
    
    @Override
    public List<Event> getAllEventsByUser(String userId) {
        return eventRepository.findByUserId(userId);
    }
    
    @Override
    public Event getEventById(String eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }
    
    @Override
    public Event updateEvent(String eventId, String title, LocalDateTime startTime, 
                            LocalDateTime endTime, String userId) {
        Event event = eventRepository.findByIdAndUserId(eventId, userId)
                .orElseThrow(() -> new RuntimeException("Event not found or unauthorized"));
        
        if (event.getStatus() == EventStatus.SWAP_PENDING) {
            throw new RuntimeException("Cannot update event with pending swap");
        }
        
        if (startTime.isAfter(endTime)) {
            throw new RuntimeException("Start time must be before end time");
        }
        
        event.setTitle(title);
        event.setStartTime(startTime);
        event.setEndTime(endTime);
        event.setUpdatedAt(LocalDateTime.now());
        
        return eventRepository.save(event);
    }
    
    @Override
    public Event updateEventStatus(String eventId, EventStatus status, String userId) {
        Event event = eventRepository.findByIdAndUserId(eventId, userId)
                .orElseThrow(() -> new RuntimeException("Event not found or unauthorized"));
        
        if (event.getStatus() == EventStatus.SWAP_PENDING) {
            throw new RuntimeException("Cannot update event with pending swap");
        }
        
        event.setStatus(status);
        event.setUpdatedAt(LocalDateTime.now());
        
        return eventRepository.save(event);
    }
    
    @Override
    public void deleteEvent(String eventId, String userId) {
        Event event = eventRepository.findByIdAndUserId(eventId, userId)
                .orElseThrow(() -> new RuntimeException("Event not found or unauthorized"));
        
        if (event.getStatus() == EventStatus.SWAP_PENDING) {
            throw new RuntimeException("Cannot delete event with pending swap");
        }
        
        eventRepository.delete(event);
    }
    
    @Override
    public List<Event> getSwappableSlots(String currentUserId) {
        return eventRepository.findByStatusAndUserIdNot(EventStatus.SWAPPABLE, currentUserId);
    }
    
    @Override
    public List<Event> getUserSwappableSlots(String userId) {
        return eventRepository.findByUserIdAndStatus(userId, EventStatus.SWAPPABLE);
    }
}
