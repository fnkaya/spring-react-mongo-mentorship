package com.fnkaya.mentorship.category.service;

import com.fnkaya.mentorship.category.model.Category;
import com.fnkaya.mentorship.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    public Category save(Category category) {
        boolean categoryAlreadyExistsWithSameName = repository.findByNameIgnoreCase(category.getName())
                .isPresent();

        if (categoryAlreadyExistsWithSameName) {
            throw new IllegalArgumentException(category.getName() + " isminde bir kategori zaten var.");
        }

        return repository.save(category);
    }

    public Category getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + " id değerine ait bir kategori bulunamadı."));
    }

    public List<Category> getAll() {
        return repository.findAll(Sort.by("name"));
    }

    public void delete(String id) {
        repository.delete(getById(id));
    }
}
