package com.fnkaya.mentorship.security.dto.mapper;

import com.fnkaya.mentorship.security.dto.LoginResponseDto;
import org.mapstruct.Mapper;
import org.springframework.security.ldap.userdetails.LdapUserDetails;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;

@Mapper
public interface LoginDtoMapper {

    LoginResponseDto toDto(LdapUserDetails ldapUserDetails);
}
