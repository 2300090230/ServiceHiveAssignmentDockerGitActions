package com.servicehive.slotswapper.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servicehive.slotswapper.dto.EventRequest;
import com.servicehive.slotswapper.dto.EventResponse;
import com.servicehive.slotswapper.dto.UpdateEventStatusRequest;
import com.servicehive.slotswapper.model.Event;
import com.servicehive.slotswapper.model.User;
import com.servicehive.slotswapper.service.EventService;
import com.servicehive.slotswapper.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    
    private final EventService eventService;
    private final UserService userService;
    
    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }
    
    @PostMapping
    public ResponseEntity<?> createEvent(@Valid @RequestBody EventRequest request) {
        try {
            User currentUser = userService.getCurrentUser();
            
            Event event = eventService.createEvent(
                request.getTitle(),
                request.getStartTime(),
                request.getEndTime(),
                currentUser.getId()
            );
            
            EventResponse response = new EventResponse(event);
            response.setUserName(currentUser.getName());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getAllEvents() {
        try {
            User currentUser = userService.getCurrentUser();
            List<Event> events = eventService.getAllEventsByUser(currentUser.getId());
            
            List<EventResponse> responses = events.stream()
                .map(event -> {
                    EventResponse response = new EventResponse(event);
                    response.setUserName(currentUser.getName());
                    return response;
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable String id) {
        try {
            Event event = eventService.getEventById(id);
            User user = userService.findById(event.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            EventResponse response = new EventResponse(event);
            response.setUserName(user.getName());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, 
                                        @Valid @RequestBody EventRequest request) {
        try {
            User currentUser = userService.getCurrentUser();
            
            Event event = eventService.updateEvent(
                id,
                request.getTitle(),
                request.getStartTime(),
                request.getEndTime(),
                currentUser.getId()
            );
            
            EventResponse response = new EventResponse(event);
            response.setUserName(currentUser.getName());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateEventStatus(@PathVariable String id,
                                              @Valid @RequestBody UpdateEventStatusRequest request) {
        try {
            User currentUser = userService.getCurrentUser();
            
            Event event = eventService.updateEventStatus(
                id,
                request.getStatus(),
                currentUser.getId()
            );
            
            EventResponse response = new EventResponse(event);
            response.setUserName(currentUser.getName());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id) {
        try {
            User currentUser = userService.getCurrentUser();
            eventService.deleteEvent(id, currentUser.getId());
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Event deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}