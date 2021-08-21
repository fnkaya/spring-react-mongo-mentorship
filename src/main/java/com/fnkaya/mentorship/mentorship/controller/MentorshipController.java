package com.fnkaya.mentorship.mentorship.controller;

import com.fnkaya.mentorship.mentorship.dto.CreateMentorshipDto;
import com.fnkaya.mentorship.mentorship.dto.MentorshipDto;
import com.fnkaya.mentorship.mentorship.dto.mapper.MentorshipDtoMapper;
import com.fnkaya.mentorship.mentorship.model.Mentorship;
import com.fnkaya.mentorship.mentorship.model.Phase;
import com.fnkaya.mentorship.mentorship.model.MentorshipStatus;
import com.fnkaya.mentorship.mentorship.service.MentorshipServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("api/mentorships")
@RequiredArgsConstructor
public class MentorshipController {

    private final MentorshipServiceImpl service;
    private final MentorshipDtoMapper mapper;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ResponseEntity<MentorshipDto> save(@RequestBody @Valid CreateMentorshipDto createMentorshipDto) {
        Mentorship mentorship = mapper.fromDto(createMentorshipDto);
        Mentorship createdMentorship = service.save(mentorship);
        MentorshipDto mentorshipDto = mapper.toDto(createdMentorship);
        return ResponseEntity.status(HttpStatus.CREATED).body(mentorshipDto);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "mentee/{menteeId}")
    public ResponseEntity<List<MentorshipDto>> getByMenteeId(@PathVariable(value = "menteeId") String menteeId) {
        List<Mentorship> mentorships = service.getByMenteeId(menteeId);
        List<MentorshipDto> mentorshipDtos = mentorships.stream().map(mapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(mentorshipDtos);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "mentor/{accountId}")
    public ResponseEntity<List<MentorshipDto>> getByMentorAccountId(@PathVariable(value = "accountId") String accountId) {
        List<Mentorship> mentorships = service.getByMentorAccountId(accountId);
        List<MentorshipDto> mentorshipDtos = mentorships.stream().map(mapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(mentorshipDtos);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "{id}")
    public ResponseEntity<MentorshipDto> getById(@PathVariable(value = "id") String id) {
        Mentorship mentorship = service.getById(id);
        MentorshipDto mentorshipDto = mapper.toDto(mentorship);
        return ResponseEntity.ok(mentorshipDto);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping
    public ResponseEntity<Page<MentorshipDto>> getAll(Pageable pageable) {
        Page<Mentorship> mentorships = service.getAll(pageable);
        Page<MentorshipDto> mentorshipDtos = mentorships.map(mapper::toDto);
        return ResponseEntity.ok(mentorshipDtos);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PatchMapping(value = "{id}")
    public ResponseEntity<MentorshipDto> updateStatus(@PathVariable(value = "id") String id, @RequestParam(value = "status") MentorshipStatus mentorshipStatus) {
        Mentorship mentorship = service.updateStatus(id, mentorshipStatus);
        MentorshipDto mentorshipDto = mapper.toDto(mentorship);
        return ResponseEntity.ok(mentorshipDto);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PatchMapping(value = "{id}/phases")
    public ResponseEntity<MentorshipDto> savePhase(@PathVariable(value = "id") String id,
                                                     @RequestBody List<Phase> phaseList) {
        log.info(phaseList.toString());
        Mentorship mentorship = service.savePhase(id, phaseList);
        MentorshipDto mentorshipDto = mapper.toDto(mentorship);
        return ResponseEntity.ok(mentorshipDto);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PatchMapping(value = "{id}/phases/status")
    public ResponseEntity<MentorshipDto> updatePhaseStatus(@PathVariable(value = "id") String id,
                                                           @RequestBody Phase phase) {
        Mentorship mentorship = service.updatePhaseStatus(id, phase);
        MentorshipDto mentorshipDto = mapper.toDto(mentorship);
        return ResponseEntity.ok(mentorshipDto);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PatchMapping(value = "{id}/phases/comment")
    public ResponseEntity<MentorshipDto> updatePhaseComment(@PathVariable(value = "id") String id,
                                                     @RequestBody Phase phase) {
        Mentorship mentorship = service.updatePhaseComment(id, phase);
        MentorshipDto mentorshipDto = mapper.toDto(mentorship);
        return ResponseEntity.ok(mentorshipDto);
    }
}
