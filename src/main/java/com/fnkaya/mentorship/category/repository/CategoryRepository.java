package com.fnkaya.mentorship.category.repository;

import com.fnkaya.mentorship.category.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
