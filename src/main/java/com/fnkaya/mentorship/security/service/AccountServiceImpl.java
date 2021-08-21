package com.fnkaya.mentorship.security.service;

import com.fnkaya.mentorship.errorhadler.ResourceNotFoundException;
import com.fnkaya.mentorship.security.model.Account;
import com.fnkaya.mentorship.security.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository repository;

    @Override
    public Account findByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + " kullanıcı adı bulunamadı"));
    }

    @Override
    public Account findById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }
}
