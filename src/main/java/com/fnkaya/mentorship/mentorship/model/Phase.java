package com.fnkaya.mentorship.mentorship.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "phases")
public class Phase {

    @Id
    private String id;

    private String name;

    private LocalDateTime endDate;

    private Comment mentorComment;

    private Comment menteeComment;

    private PhaseStatus status = PhaseStatus.NOT_STARTED;
}
