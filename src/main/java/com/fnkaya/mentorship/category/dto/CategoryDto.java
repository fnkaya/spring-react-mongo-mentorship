package com.fnkaya.mentorship.category.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class CategoryDto {

    private String id;

    private String name;

    private List<String> subjects;
}
