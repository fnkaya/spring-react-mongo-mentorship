package com.fnkaya.mentorship.application.model;

import com.fnkaya.mentorship.common.model.Category;
import com.fnkaya.mentorship.security.model.Account;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "applications")
public class MentorApplication {

    @Id
    private String id;

    @DBRef
    private Account owner;

    private Category category;

    private String description;

    private ApplicationStatus status;

    private LocalDateTime date;
}
