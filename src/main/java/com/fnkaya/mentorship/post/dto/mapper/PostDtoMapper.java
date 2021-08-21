package com.fnkaya.mentorship.post.dto.mapper;

import com.fnkaya.mentorship.post.dto.PostDto;
import com.fnkaya.mentorship.post.model.Post;
import org.mapstruct.Mapper;

@Mapper
public interface PostDtoMapper {

    PostDto toDto(Post post);
}
