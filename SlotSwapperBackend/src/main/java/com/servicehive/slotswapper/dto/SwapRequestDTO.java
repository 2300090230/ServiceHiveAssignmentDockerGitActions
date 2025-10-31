package com.servicehive.slotswapper.dto;

import jakarta.validation.constraints.NotBlank;

public class SwapRequestDTO {

	@NotBlank(message = "My slot ID is required")
	private String mySlotId;

	@NotBlank(message = "Their slot ID is required")
	private String theirSlotId;

	public SwapRequestDTO() {
	}

	public String getMySlotId() {
		return mySlotId;
	}

	public void setMySlotId(String mySlotId) {
		this.mySlotId = mySlotId;
	}

	public String getTheirSlotId() {
		return theirSlotId;
	}

	public void setTheirSlotId(String theirSlotId) {
		this.theirSlotId = theirSlotId;
	}
}