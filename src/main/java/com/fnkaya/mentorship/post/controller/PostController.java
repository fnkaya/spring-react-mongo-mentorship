package com.fnkaya.mentorship.post.controller;

import com.fnkaya.mentorship.post.dto.PostDto;
import com.fnkaya.mentorship.post.dto.mapper.PostDtoMapper;
import com.fnkaya.mentorship.post.model.Post;
import com.fnkaya.mentorship.post.service.PostServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl service;
    private final PostDtoMapper mapper;

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(value = "{id}")
    public ResponseEntity<PostDto> getById(@PathVariable(value = "id") String id) {
        Post post = service.getById(id);
        PostDto postDto = mapper.toDto(post);
        return ResponseEntity.ok(postDto);
    }

    @PreAuthorize("permitAll()")
    @GetMapping
    public ResponseEntity<Page<PostDto>> getAll(Pageable pageable) {
        Page<Post> mentors = service.getAll(pageable);
        Page<PostDto> mentorDtos = mentors.map(mapper::toDto);
        return ResponseEntity.ok(mentorDtos);
    }

    @PreAuthorize("permitAll()")
    @GetMapping(value = "category")
    public ResponseEntity<Page<PostDto>> getAllByCategory(@RequestParam(value = "category") String category, Pageable pageable) {
        Page<Post> mentors = service.getAllBtCategory(category, pageable);
        Page<PostDto> mentorDtos = mentors.map(mapper::toDto);
        return ResponseEntity.ok(mentorDtos);
    }

    @PreAuthorize("permitAll()")
    @GetMapping(value = "subject")
    public ResponseEntity<Page<PostDto>> getAllBySubject(@RequestParam(value = "subject") String subject, Pageable pageable) {
        Page<Post> mentors = service.getAllBySubject(subject, pageable);
        Page<PostDto> mentorDtos = mentors.map(mapper::toDto);
        return ResponseEntity.ok(mentorDtos);
    }

    @PreAuthorize("permitAll()")
    @GetMapping(value = "search")
    public ResponseEntity<Page<PostDto>> search(@RequestParam(value = "desc") String keyword, Pageable pageable) {
        Page<Post> mentors = service.search(keyword, pageable);
        Page<PostDto> mentorDtos = mentors.map(mapper::toDto);
        return ResponseEntity.ok(mentorDtos);
    }
}
