package com.fnkaya.mentorship.category.controller;

import com.fnkaya.mentorship.category.model.Category;
import com.fnkaya.mentorship.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @PostMapping
    public ResponseEntity<Category> save(@RequestBody Category category) {
        Category categoryDb = service.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryDb);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Category> get(@PathVariable(value = "id") Long id) {
        Category category = service.get(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public ResponseEntity<Page<Category>> getAll(Pageable pageable) {
        Page<Category> categories = service.getAll(pageable);
        return ResponseEntity.ok(categories);
    }

    @PutMapping(value = "{id}")
    public ResponseEntity<Category> update(@PathVariable(value = "id") Long id, @RequestBody Category category) {
        Category updatedCategory = service.update(id, category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping(value = "{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
    }
}
