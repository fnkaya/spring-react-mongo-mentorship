package com.fnkaya.mentorship.mentorship.dto.mapper;

import com.fnkaya.mentorship.mentorship.dto.CreateMentorshipDto;
import com.fnkaya.mentorship.mentorship.dto.MentorshipDto;
import com.fnkaya.mentorship.mentorship.model.Mentorship;
import org.mapstruct.Mapper;

@Mapper
public interface MentorshipDtoMapper {

    Mentorship fromDto(CreateMentorshipDto createMentorshipDto);
    MentorshipDto toDto(Mentorship mentorship);
}
