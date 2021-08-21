package com.fnkaya.mentorship.mentorship.repository;

import com.fnkaya.mentorship.mentorship.model.Phase;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhaseRepository extends MongoRepository<Phase, String> {
}
