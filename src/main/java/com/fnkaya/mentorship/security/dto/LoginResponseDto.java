package com.fnkaya.mentorship.security.dto;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.ldap.userdetails.LdapUserDetails;

import java.util.Collection;

@Data
public class LoginResponseDto {

    private String username;
    private Collection<GrantedAuthority> authorities = AuthorityUtils.NO_AUTHORITIES;
}
