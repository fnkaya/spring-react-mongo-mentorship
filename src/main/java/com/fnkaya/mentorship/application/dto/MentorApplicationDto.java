package com.fnkaya.mentorship.application.dto;

import com.fnkaya.mentorship.application.model.ApplicationStatus;
import com.fnkaya.mentorship.common.model.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MentorApplicationDto {

    private String id;

    private OwnerDto owner;

    private Category category;

    private String description;

    private ApplicationStatus status;

    private LocalDateTime date;
}
