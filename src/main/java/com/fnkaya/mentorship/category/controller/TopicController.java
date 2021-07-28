package com.fnkaya.mentorship.category.controller;

import com.fnkaya.mentorship.category.model.Category;
import com.fnkaya.mentorship.category.model.Topic;
import com.fnkaya.mentorship.category.service.CategoryService;
import com.fnkaya.mentorship.category.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "topics")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService service;

    @PostMapping
    public ResponseEntity<Topic> save(@RequestBody Topic topic) {
        Topic createdTopic = service.save(topic);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTopic);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Topic> get(@PathVariable(value = "id") Long id) {
        Topic topic = service.get(id);
        return ResponseEntity.ok(topic);
    }

    @GetMapping
    public ResponseEntity<Page<Topic>> getAll(Pageable pageable) {
        Page<Topic> topics = service.getAll(pageable);
        return ResponseEntity.ok(topics);
    }

    @PutMapping(value = "{id}")
    public ResponseEntity<Topic> update(@PathVariable(value = "id") Long id, @RequestBody Topic topic) {
        Topic updatedTopic = service.update(id, topic);
        return ResponseEntity.ok(updatedTopic);
    }

    @DeleteMapping(value = "{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
    }
}
