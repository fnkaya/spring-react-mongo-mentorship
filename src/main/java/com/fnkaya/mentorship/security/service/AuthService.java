package com.fnkaya.mentorship.security.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {

    UserDetails loadUserById(String id);

    /*Account authenticate(HttpServletRequest request, AuthRequestDto authRequestDto);*/
}
