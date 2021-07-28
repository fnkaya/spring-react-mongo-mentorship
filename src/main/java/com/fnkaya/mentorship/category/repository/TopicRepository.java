package com.fnkaya.mentorship.category.repository;

import com.fnkaya.mentorship.category.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
}
