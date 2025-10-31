package com.servicehive.slotswapper.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servicehive.slotswapper.dto.EventResponse;
import com.servicehive.slotswapper.dto.SwapRequestDTO;
import com.servicehive.slotswapper.dto.SwapRequestResponse;
import com.servicehive.slotswapper.dto.SwapResponseDTO;
import com.servicehive.slotswapper.model.Event;
import com.servicehive.slotswapper.model.SwapRequest;
import com.servicehive.slotswapper.model.User;
import com.servicehive.slotswapper.service.EventService;
import com.servicehive.slotswapper.service.SwapService;
import com.servicehive.slotswapper.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SwapController {
    
    private final SwapService swapService;
    private final EventService eventService;
    private final UserService userService;
    
    public SwapController(SwapService swapService, 
                         EventService eventService,
                         UserService userService) {
        this.swapService = swapService;
        this.eventService = eventService;
        this.userService = userService;
    }
    
    @GetMapping("/swappable-slots")
    public ResponseEntity<?> getSwappableSlots() {
        try {
            User currentUser = userService.getCurrentUser();
            List<Event> events = eventService.getSwappableSlots(currentUser.getId());
            
            List<EventResponse> responses = events.stream()
                .map(event -> {
                    EventResponse response = new EventResponse(event);
                    User owner = userService.findById(event.getUserId())
                        .orElse(null);
                    if (owner != null) {
                        response.setUserName(owner.getName());
                    }
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
    
    @PostMapping("/swap-request")
    public ResponseEntity<?> createSwapRequest(@Valid @RequestBody SwapRequestDTO request) {
        try {
            User currentUser = userService.getCurrentUser();
            
            SwapRequest swapRequest = swapService.createSwapRequest(
                request.getMySlotId(),
                request.getTheirSlotId(),
                currentUser.getId()
            );
            
            SwapRequestResponse response = buildSwapRequestResponse(swapRequest);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PostMapping("/swap-response/{requestId}")
    public ResponseEntity<?> respondToSwapRequest(@PathVariable String requestId,
                                                  @Valid @RequestBody SwapResponseDTO request) {
        try {
            User currentUser = userService.getCurrentUser();
            
            SwapRequest swapRequest = swapService.respondToSwapRequest(
                requestId,
                request.getAccept(),
                currentUser.getId()
            );
            
            SwapRequestResponse response = buildSwapRequestResponse(swapRequest);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @GetMapping("/swap-requests/incoming")
    public ResponseEntity<?> getIncomingRequests() {
        try {
            User currentUser = userService.getCurrentUser();
            List<SwapRequest> requests = swapService.getIncomingRequests(currentUser.getId());
            
            List<SwapRequestResponse> responses = requests.stream()
                .map(this::buildSwapRequestResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/swap-requests/outgoing")
    public ResponseEntity<?> getOutgoingRequests() {
        try {
            User currentUser = userService.getCurrentUser();
            List<SwapRequest> requests = swapService.getOutgoingRequests(currentUser.getId());
            
            List<SwapRequestResponse> responses = requests.stream()
                .map(this::buildSwapRequestResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    private SwapRequestResponse buildSwapRequestResponse(SwapRequest swapRequest) {
        SwapRequestResponse response = new SwapRequestResponse();
        response.setId(swapRequest.getId());
        response.setRequesterId(swapRequest.getRequesterId());
        response.setReceiverId(swapRequest.getReceiverId());
        response.setStatus(swapRequest.getStatus());
        response.setCreatedAt(swapRequest.getCreatedAt());
        response.setUpdatedAt(swapRequest.getUpdatedAt());
        
        // Get requester info
        User requester = userService.findById(swapRequest.getRequesterId()).orElse(null);
        if (requester != null) {
            response.setRequesterName(requester.getName());
        }
        
        // Get receiver info
        User receiver = userService.findById(swapRequest.getReceiverId()).orElse(null);
        if (receiver != null) {
            response.setReceiverName(receiver.getName());
        }
        
        // Get requester slot
        Event requesterSlot = eventService.getEventById(swapRequest.getRequesterSlotId());
        EventResponse requesterSlotResponse = new EventResponse(requesterSlot);
        if (requester != null) {
            requesterSlotResponse.setUserName(requester.getName());
        }
        response.setRequesterSlot(requesterSlotResponse);
        
        // Get receiver slot
        Event receiverSlot = eventService.getEventById(swapRequest.getReceiverSlotId());
        EventResponse receiverSlotResponse = new EventResponse(receiverSlot);
        if (receiver != null) {
            receiverSlotResponse.setUserName(receiver.getName());
        }
        response.setReceiverSlot(receiverSlotResponse);
        
        return response;
    }
}