package com.fnkaya.mentorship.mentor.dto;

import com.fnkaya.mentorship.security.model.Account;
import lombok.Data;

@Data
public class MentorDto {

    private String id;

    private AccountDto account;

    private boolean available;

    private double rating;
}
