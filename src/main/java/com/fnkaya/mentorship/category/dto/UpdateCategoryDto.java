package com.fnkaya.mentorship.category.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class UpdateCategoryDto {

    @NotBlank
    private String id;

    @NotBlank(message = "Kategori ismi boş olamaz")
    private String name;

    @NotEmpty(message = "Kategori en az bir adet konu içermelidir")
    private List<String> subjects;
}
