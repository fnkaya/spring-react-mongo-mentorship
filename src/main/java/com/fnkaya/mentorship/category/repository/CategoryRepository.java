package com.fnkaya.mentorship.category.repository;

import com.fnkaya.mentorship.category.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {

    @Query(value = "{}", fields = "{'topics': 0}")
    List<Category> getAll();

    Optional<Category> findByNameIgnoreCase(String name);
}
