package com.fnkaya.mentorship.post.repository;

import com.fnkaya.mentorship.post.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PostRepository extends MongoRepository<Post, String> {

    Page<Post> findByCategoryName(String category, Pageable pageable);

    Page<Post> findByCategorySubjects(String subject, Pageable pageable);

    @Query(value = "{$text: {$search: '?0'}}")
    Page<Post> search(String keyword, Pageable pageable);
}
