package com.fnkaya.mentorship.security.controller;

import com.fnkaya.mentorship.security.annotation.CurrentUser;
import com.fnkaya.mentorship.security.dto.AccountResponseDto;
import com.fnkaya.mentorship.security.dto.mapper.AccountDtoMapper;
import com.fnkaya.mentorship.security.model.Account;
import com.fnkaya.mentorship.security.oauth.user.UserPrincipal;
import com.fnkaya.mentorship.security.service.AccountService;
import com.fnkaya.mentorship.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.ldap.userdetails.LdapUserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountDtoMapper mapper;
    private final AuthService authService;

    @GetMapping(value = "ldap")
    public ResponseEntity<AccountResponseDto> getCurrentUserWithLdap(@CurrentUser LdapUserDetails ldapUserDetails) {
        Account account = accountService.findByUsername(ldapUserDetails.getUsername());
        AccountResponseDto accountResponseDto = mapper.toDto(account);
        return ResponseEntity.ok(accountResponseDto);
    }

    @GetMapping(value = "google")
    public ResponseEntity<AccountResponseDto> getCurrentUserWithGoogleAuth(@CurrentUser UserPrincipal userPrincipal) {
        Account account = accountService.findById(userPrincipal.getId());
        AccountResponseDto accountResponseDto = mapper.toDto(account);
        return ResponseEntity.ok(accountResponseDto);
    }

/*    @PostMapping(value = "auth")
    public ResponseEntity<AccountResponseDto> auth(HttpServletRequest request, @RequestBody @Valid AuthRequestDto authRequestDto) {
        Account account = authService.authenticate(request, authRequestDto);
        AccountResponseDto accountResponseDto = mapper.toDto(account);
        return ResponseEntity.ok(accountResponseDto);
    }*/
}
