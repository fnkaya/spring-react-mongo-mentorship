package com.fnkaya.mentorship.security.service;

import com.fnkaya.mentorship.security.dto.LoginRequestDto;
import com.fnkaya.mentorship.security.dto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationProvider authProvider;

    public LdapUserDetails login() throws AuthenticationException {
        return (LdapUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
