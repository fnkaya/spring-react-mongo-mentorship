package com.fnkaya.mentorship.security.controller;

import com.fnkaya.mentorship.security.dto.mapper.LoginDtoMapper;
import com.fnkaya.mentorship.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.ldap.userdetails.LdapUserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;
    private final LoginDtoMapper mapper;

    @GetMapping(value = "login")
    public ResponseEntity<LdapUserDetails> login() {
        LdapUserDetails ldapUserDetails = service.login();
        return ResponseEntity.ok(ldapUserDetails);
    }

}
