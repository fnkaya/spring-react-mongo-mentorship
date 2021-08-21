package com.fnkaya.mentorship.category.service;

import com.fnkaya.mentorship.category.model.Category;

import java.util.List;

public interface CategoryService {

    Category save(Category category);
    List<Category> getAll();
    void delete(String id);
}
