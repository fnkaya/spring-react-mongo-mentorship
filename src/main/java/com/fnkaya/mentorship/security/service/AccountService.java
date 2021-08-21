package com.fnkaya.mentorship.security.service;

import com.fnkaya.mentorship.security.model.Account;

public interface AccountService {

    Account findByUsername(String username);

    Account findById(String id);
}
