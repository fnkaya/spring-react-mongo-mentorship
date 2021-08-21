package com.fnkaya.mentorship.mentorship.repository;

import com.fnkaya.mentorship.mentor.model.Mentor;
import com.fnkaya.mentorship.mentorship.model.Mentorship;
import com.fnkaya.mentorship.mentorship.model.MentorshipStatus;
import com.fnkaya.mentorship.security.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface MentorshipRepository extends MongoRepository<Mentorship, String> {

    Optional<Mentorship> findByMenteeAndCategoryNameAndStatusIn(Account mentee, String categoryName, Collection<MentorshipStatus> mentorshipStatusList);

    List<Mentorship> findByMentorAndStatusIn(Mentor mentor, Collection<MentorshipStatus> mentorshipStatusList);

    List<Mentorship> findByMenteeIdOrderByStartDateDesc(String menteeId);

    List<Mentorship> findByMentorOrderByStartDateDesc(Mentor mentor);
}
