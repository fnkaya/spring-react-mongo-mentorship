package com.fnkaya.mentorship.mentor.controller;

import com.fnkaya.mentorship.mentor.model.Mentor;
import com.fnkaya.mentorship.mentor.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("mentors")
@RequiredArgsConstructor
public class MentorController {

    private final MentorService service;

    @PostMapping
    public ResponseEntity<Mentor> save(@RequestBody Mentor mentor) {
        Mentor createdMentor = service.save(mentor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMentor);
    }

    @GetMapping
    public ResponseEntity<Page<Mentor>> getAll(Pageable pageable) {
        Page<Mentor> mentors = service.getAll(pageable);
        return ResponseEntity.ok(mentors);
    }
}
