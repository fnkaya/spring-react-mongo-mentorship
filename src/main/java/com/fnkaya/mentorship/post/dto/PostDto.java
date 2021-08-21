package com.fnkaya.mentorship.post.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fnkaya.mentorship.common.model.Category;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDto {

    private String id;

    private MentorDto owner;

    private Category category;

    private String description;
}
