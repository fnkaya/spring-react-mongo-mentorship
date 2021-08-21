package com.fnkaya.mentorship.mentor.controller;

import com.fnkaya.mentorship.mentor.dto.MentorDto;
import com.fnkaya.mentorship.mentor.dto.mapper.MentorDtoMapper;
import com.fnkaya.mentorship.mentor.model.Mentor;
import com.fnkaya.mentorship.mentor.service.MentorServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/mentors")
@RequiredArgsConstructor
public class MentorController {

    private final MentorServiceImpl service;
    private final MentorDtoMapper mapper;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<Page<MentorDto>> getAll(Pageable pageable) {
        Page<Mentor> mentors = service.getAll(pageable);
        Page<MentorDto> mentorDtos = mentors.map(mapper::toDto);
        return ResponseEntity.ok(mentorDtos);
    }
}
