package com.fnkaya.mentorship.mentor.dto.mapper;

import com.fnkaya.mentorship.mentor.dto.MentorDto;
import com.fnkaya.mentorship.mentor.model.Mentor;
import org.mapstruct.Mapper;

@Mapper
public interface MentorDtoMapper {

    MentorDto toDto(Mentor mentor);
}
