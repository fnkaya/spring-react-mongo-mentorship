package com.fnkaya.mentorship.application.dto;

import com.fnkaya.mentorship.category.model.Category;
import com.fnkaya.mentorship.application.model.ApplicationStatus;
import com.fnkaya.mentorship.security.model.Account;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class CreateMentorApplicationDto {

    @NotNull
    private Account owner;

    @NotBlank
    private String description;

    @NotEmpty
    private Category category;

    private ApplicationStatus status = ApplicationStatus.PENDING;

    private LocalDateTime date = LocalDateTime.now();
}
