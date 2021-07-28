package com.fnkaya.mentorship.category.service;

import com.fnkaya.mentorship.category.model.Category;
import com.fnkaya.mentorship.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;

    public Category save(Category category) {
        return repository.save(category);
    }

    public Category get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + " id değerine ait bir kayıt bulunamadı."));
    }

    public Page<Category> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Category update(Long id, Category category) {
        Category categoryDb = this.get(id);
        category.setId(categoryDb.getId());
        return repository.save(category);
    }

    public void delete(Long id) {
        Category category = this.get(id);
        repository.delete(category);
    }
}
