package com.fnkaya.mentorship.security.service;

import com.fnkaya.mentorship.errorhadler.ResourceNotFoundException;
import com.fnkaya.mentorship.security.dto.AuthRequestDto;
import com.fnkaya.mentorship.security.model.Account;
import com.fnkaya.mentorship.security.oauth.user.UserPrincipal;
import com.fnkaya.mentorship.security.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AccountRepository repository;

    /*private final AuthenticationManager authManager;*/

    @Override
    public UserDetails loadUserById(String id) {
        Account account = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        return UserPrincipal.create(account);
    }

/*    public Account authenticate(HttpServletRequest request, AuthRequestDto authRequestDto) {
        Authentication usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authRequestDto.getUsername(), authRequestDto.getPassword());
        Authentication authentication = authManager.authenticate(usernamePasswordAuthenticationToken);
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(authentication);
        HttpSession session = request.getSession(true);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);

        String username = authentication.getName();
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + " kullanıcı adı bulunamadı"));
    }*/
}
