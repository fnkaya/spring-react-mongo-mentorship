package com.fnkaya.mentorship.category.controller;

import com.fnkaya.mentorship.category.dto.CategoryDto;
import com.fnkaya.mentorship.category.dto.CreateCategoryDto;
import com.fnkaya.mentorship.category.dto.UpdateCategoryDto;
import com.fnkaya.mentorship.category.dto.mapper.CategoryDtoMapper;
import com.fnkaya.mentorship.category.model.Category;
import com.fnkaya.mentorship.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;
    private final CategoryDtoMapper mapper;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryDto> save(@RequestBody @Valid CreateCategoryDto createCategoryDto) {
        Category category = mapper.fromDto(createCategoryDto);
        Category createdCategory = service.save(category);
        CategoryDto createdCategoryDto = mapper.toDto(createdCategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategoryDto);
    }

    @PreAuthorize("permitAll()")
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAll() {
        List<Category> categories = service.getAll();
        List<CategoryDto> categoryDtos = categories.stream().map(mapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(categoryDtos);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping()
    public ResponseEntity<CategoryDto> update(@RequestBody @Valid UpdateCategoryDto updateCategoryDto) {
        Category category = mapper.fromDto(updateCategoryDto);
        Category updatedCategory = service.save(category);
        CategoryDto categoryDto = mapper.toDto(updatedCategory);
        return ResponseEntity.ok(categoryDto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "{id}")
    public void delete(@PathVariable(value = "id") String id) {
        service.delete(id);
    }
}
