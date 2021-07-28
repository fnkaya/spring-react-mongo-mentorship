package com.fnkaya.mentorship.mentor.model;

import com.fnkaya.mentorship.account.model.Account;
import com.fnkaya.mentorship.category.model.Topic;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "mentors")
public class Mentor{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "mentors_topics",
            joinColumns = @JoinColumn(name = "mentor_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id")
    )
    private Set<Topic> topics = new HashSet<>();

    @Column(nullable = false)
    private String description;

    private boolean available;

    private double rating;
}
