package com.fnkaya.mentorship.application.dto.mapper;

import com.fnkaya.mentorship.application.dto.CreateMentorApplicationDto;
import com.fnkaya.mentorship.application.dto.MentorApplicationDto;
import com.fnkaya.mentorship.application.model.MentorApplication;
import org.mapstruct.Mapper;

@Mapper
public interface MentorApplicationDtoMapper {

    MentorApplication fromDto(CreateMentorApplicationDto createMentorApplicationDto);
    MentorApplicationDto toDto(MentorApplication mentorApplication);
}
