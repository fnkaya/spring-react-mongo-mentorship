package com.fnkaya.mentorship.mentorship.dto;

import com.fnkaya.mentorship.mentor.model.Mentor;
import com.fnkaya.mentorship.mentorship.model.Category;
import com.fnkaya.mentorship.security.model.Account;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CreateMentorshipDto {

    @NotNull
    private Mentor mentor;

    @NotNull
    private Account mentee;

    @NotNull
    private Category category;
}
