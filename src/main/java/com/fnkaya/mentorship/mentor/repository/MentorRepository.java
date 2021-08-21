package com.fnkaya.mentorship.mentor.repository;

import com.fnkaya.mentorship.mentor.model.Mentor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MentorRepository extends MongoRepository<Mentor, String> {

    Optional<Mentor> findByAccountId(String accountId);
}
