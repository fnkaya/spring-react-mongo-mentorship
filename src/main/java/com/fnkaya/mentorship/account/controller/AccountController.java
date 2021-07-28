package com.fnkaya.mentorship.account.controller;

import com.fnkaya.mentorship.account.model.Account;
import com.fnkaya.mentorship.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @PostMapping
    public ResponseEntity<Account> save(@RequestBody Account account) {
        Account createdAccount = service.save(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Account> get(@PathVariable(value = "id") Long id) {
        Account account = service.get(id);
        return ResponseEntity.ok(account);
    }

    @GetMapping
    public ResponseEntity<Page<Account>> getAll(Pageable pageable) {
        Page<Account> users = service.getAll(pageable);
        return ResponseEntity.ok(users);
    }

    @PutMapping(value = "{id}")
    public ResponseEntity<Account> update(@PathVariable(value = "id") Long id, @RequestBody Account account) {
        Account updatedAccount = service.update(id, account);
        return ResponseEntity.ok(updatedAccount);
    }

    @DeleteMapping(value = "{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
    }
}
