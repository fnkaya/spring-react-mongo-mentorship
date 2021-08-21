package com.fnkaya.mentorship.category.dto.mapper;

import com.fnkaya.mentorship.category.dto.CreateCategoryDto;
import com.fnkaya.mentorship.category.dto.CategoryDto;
import com.fnkaya.mentorship.category.dto.UpdateCategoryDto;
import com.fnkaya.mentorship.category.model.Category;
import org.mapstruct.Mapper;

@Mapper
public interface CategoryDtoMapper {

    CategoryDto toDto(Category category);
    Category fromDto(CreateCategoryDto createCategoryDto);
    Category fromDto(UpdateCategoryDto updateCategoryDto);
}
