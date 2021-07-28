package com.fnkaya.mentorship.account.service;

import com.fnkaya.mentorship.account.model.Account;
import com.fnkaya.mentorship.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository repository;

    public Account save(Account account) {
        return repository.save(account);
    }

    public Account get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + " id değerine sahip bir kayıt bulunamadı"));
    }

    public Page<Account> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Account update(Long id, Account account) {
        Account accountDb = this.get(id);
        account.setId(accountDb.getId());
        return repository.save(account);
    }

    public void delete(Long id) {
        Account account = this.get(id);
        repository.delete(account);
    }
}
