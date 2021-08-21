package com.fnkaya.mentorship.application.controller;

import com.fnkaya.mentorship.application.dto.CreateMentorApplicationDto;
import com.fnkaya.mentorship.application.dto.MentorApplicationDto;
import com.fnkaya.mentorship.application.dto.mapper.MentorApplicationDtoMapper;
import com.fnkaya.mentorship.application.model.ApplicationStatus;
import com.fnkaya.mentorship.application.model.MentorApplication;
import com.fnkaya.mentorship.application.service.MentorApplicationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/applications")
@RequiredArgsConstructor
public class MentorApplicationController {

    private final MentorApplicationServiceImpl service;
    private final MentorApplicationDtoMapper mapper;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ResponseEntity<MentorApplicationDto> save(@RequestBody CreateMentorApplicationDto createMentorApplicationDto) {
        MentorApplication mentorApplication = mapper.fromDto(createMentorApplicationDto);
        MentorApplication createdMentorApplication = service.save(mentorApplication);
        MentorApplicationDto mentorApplicationDto = mapper.toDto(createdMentorApplication);
        return ResponseEntity.status(HttpStatus.CREATED).body(mentorApplicationDto);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping(value = "{id}")
    public ResponseEntity<MentorApplicationDto> getById(@PathVariable(value = "id") String id) {
        MentorApplication mentorApplication = service.getById(id);
        MentorApplicationDto mentorApplicationDto = mapper.toDto(mentorApplication);
        return ResponseEntity.ok(mentorApplicationDto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<Page<MentorApplicationDto>> getAll(Pageable pageable) {
        Page<MentorApplication> mentorApplications = service.getAll(pageable);
        Page<MentorApplicationDto> mentorApplicationDtos = mentorApplications.map(mapper::toDto);
        return ResponseEntity.ok(mentorApplicationDtos);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "owner/{ownerId}")
    public ResponseEntity<Page<MentorApplicationDto>> getAllByOwnerId(@PathVariable(value = "ownerId") String  ownerId, Pageable pageable) {
        Page<MentorApplication> mentorApplications = service.getAllByOwnerId(ownerId, pageable);
        Page<MentorApplicationDto> mentorApplicationDtos = mentorApplications.map(mapper::toDto);
        return ResponseEntity.ok(mentorApplicationDtos);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "status")
    public ResponseEntity<Page<MentorApplicationDto>> getAllByStatus(@RequestParam(value = "status") ApplicationStatus status, Pageable pageable) {
        Page<MentorApplication> mentorApplications = service.getAllByStatus(status, pageable);
        Page<MentorApplicationDto> mentorApplicationDtos = mentorApplications.map(mapper::toDto);
        return ResponseEntity.ok(mentorApplicationDtos);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping(value = "{id}")
    public ResponseEntity<MentorApplicationDto> updateStatus(@PathVariable(value = "id") String id, @RequestParam(value = "status")ApplicationStatus status) {
        MentorApplication mentorApplication = service.updateStatus(id, status);
        MentorApplicationDto mentorApplicationDto = mapper.toDto(mentorApplication);
        return ResponseEntity.ok(mentorApplicationDto);
    }
}
