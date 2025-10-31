package com.servicehive.slotswapper.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.servicehive.slotswapper.model.Event;
import com.servicehive.slotswapper.model.EventStatus;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

	List<Event> findByUserId(String userId);

	List<Event> findByUserIdAndStatus(String userId, EventStatus status);

	List<Event> findByStatusAndUserIdNot(EventStatus status, String userId);

	Optional<Event> findByIdAndUserId(String id, String userId);
}