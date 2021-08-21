package com.fnkaya.mentorship.mentorship.model;

import com.fnkaya.mentorship.mentor.model.Mentor;
import com.fnkaya.mentorship.security.model.Account;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "mentorships")
public class Mentorship {

    @Id
    private String id;

    @DBRef
    private Mentor mentor;

    @DBRef
    private Account mentee;

    private LocalDateTime startDate;

    private Category category;

    @DBRef
    private List<Phase> phases;

    private MentorshipStatus status = MentorshipStatus.PENDING;
}
