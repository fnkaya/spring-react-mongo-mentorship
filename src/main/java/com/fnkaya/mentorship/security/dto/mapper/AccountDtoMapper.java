package com.fnkaya.mentorship.security.dto.mapper;

import com.fnkaya.mentorship.security.dto.AccountResponseDto;
import com.fnkaya.mentorship.security.model.Account;
import org.mapstruct.Mapper;

@Mapper
public interface AccountDtoMapper {

    AccountResponseDto toDto(Account account);
}
