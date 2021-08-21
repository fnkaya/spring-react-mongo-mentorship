package com.fnkaya.mentorship.application.service;

import com.fnkaya.mentorship.application.model.ApplicationStatus;
import com.fnkaya.mentorship.application.model.MentorApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MentorApplicationService {

    MentorApplication save(MentorApplication mentorApplication);

    MentorApplication getById(String id);

    Page<MentorApplication> getAll(Pageable pageable);

    Page<MentorApplication> getAllByOwnerId(String ownerId, Pageable pageable);

    Page<MentorApplication> getAllByStatus(ApplicationStatus status, Pageable pageable);

    MentorApplication updateStatus(String id, ApplicationStatus status);
}
