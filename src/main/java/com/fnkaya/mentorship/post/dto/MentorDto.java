package com.fnkaya.mentorship.post.dto;

import lombok.Data;

@Data
public class MentorDto {

    private String id;

    private AccountDto account;

    private boolean available;
}
