package com.fnkaya.mentorship.account.repository;

import com.fnkaya.mentorship.account.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
