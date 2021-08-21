package com.fnkaya.mentorship.security.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AuthRequestDto {

    @NotBlank(message = "Kullanıcı adı alanı boş olamaz")
    private String username;

    @NotBlank(message = "Şifre alanı boş olamaz")
    private String password;
}
