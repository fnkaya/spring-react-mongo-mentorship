package com.fnkaya.mentorship.application.repository;

import com.fnkaya.mentorship.application.model.ApplicationStatus;
import com.fnkaya.mentorship.application.model.MentorApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MentorApplicationRepository extends MongoRepository<MentorApplication, String> {

    Optional<MentorApplication> findByOwnerIdAndCategoryNameAndStatusNot(String ownerId, String categoryName, ApplicationStatus status);

    Page<MentorApplication> findAllByStatus(ApplicationStatus status, Pageable pageable);

    Page<MentorApplication> findAllByOwnerId(String ownerId, Pageable pageable);
}
