package com.fnkaya.mentorship.mentorship.dto;

import lombok.Data;

@Data
public class MentorDto {

    private AccountDto account;

    private boolean available;

    private double rating;
}
