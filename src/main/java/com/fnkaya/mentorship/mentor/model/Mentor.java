package com.fnkaya.mentorship.mentor.model;

import com.fnkaya.mentorship.security.model.Account;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "mentors")
public class Mentor {

    @Id
    private String id;

    @DBRef
    private Account account;

    private boolean available;
}
