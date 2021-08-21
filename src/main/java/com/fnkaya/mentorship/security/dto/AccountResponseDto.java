package com.fnkaya.mentorship.security.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fnkaya.mentorship.security.model.AuthProvider;
import com.fnkaya.mentorship.security.model.Role;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountResponseDto {

    private String id;

    private String name;

    private String username;

    private String email;

    private String imageUrl;

    private Boolean emailVerified;

    private Role role;

    private AuthProvider provider;

    private String providerId;
}
