package com.fnkaya.mentorship.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "accounts")
public class Account {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String username;

    @Indexed
    private String email;

    private String imageUrl;

    private Boolean emailVerified = false;

    private Role role;

    @JsonIgnore
    private String password = null;

    private AuthProvider provider;

    private String providerId;
}
