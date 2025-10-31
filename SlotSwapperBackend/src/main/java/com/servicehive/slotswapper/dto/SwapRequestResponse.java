package com.servicehive.slotswapper.dto;

import java.time.LocalDateTime;

import com.servicehive.slotswapper.model.SwapStatus;

public class SwapRequestResponse {

	private String id;
	private String requesterId;
	private String requesterName;
	private EventResponse requesterSlot;
	private String receiverId;
	private String receiverName;
	private EventResponse receiverSlot;
	private SwapStatus status;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	public SwapRequestResponse() {
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

	public String getRequesterName() {
		return requesterName;
	}

	public void setRequesterName(String requesterName) {
		this.requesterName = requesterName;
	}

	public EventResponse getRequesterSlot() {
		return requesterSlot;
	}

	public void setRequesterSlot(EventResponse requesterSlot) {
		this.requesterSlot = requesterSlot;
	}

	public String getReceiverId() {
		return receiverId;
	}

	public void setReceiverId(String receiverId) {
		this.receiverId = receiverId;
	}

	public String getReceiverName() {
		return receiverName;
	}

	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}

	public EventResponse getReceiverSlot() {
		return receiverSlot;
	}

	public void setReceiverSlot(EventResponse receiverSlot) {
		this.receiverSlot = receiverSlot;
	}

	public SwapStatus getStatus() {
		return status;
	}

	public void setStatus(SwapStatus status) {
		this.status = status;
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