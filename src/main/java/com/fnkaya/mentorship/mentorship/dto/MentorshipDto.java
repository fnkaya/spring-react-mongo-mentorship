package com.fnkaya.mentorship.mentorship.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fnkaya.mentorship.mentorship.model.Category;
import com.fnkaya.mentorship.mentorship.model.MentorshipStatus;
import com.fnkaya.mentorship.mentorship.model.Phase;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class MentorshipDto {

    private String id;

    private MentorDto mentor;

    private AccountDto mentee;

    private LocalDateTime startDate;

    private Category category;

    private List<PhaseDto> phases;

    private MentorshipStatus status;
}
