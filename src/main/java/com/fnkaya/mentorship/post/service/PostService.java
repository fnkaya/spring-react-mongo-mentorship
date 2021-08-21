package com.fnkaya.mentorship.post.service;

import com.fnkaya.mentorship.post.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    Post getById(String id);

    Page<Post> getAll(Pageable pageable);

    Page<Post> getAllBtCategory(String category, Pageable pageable);

    Page<Post> getAllBySubject(String subject, Pageable pageable);

    Page<Post> search(String keyword, Pageable pageable);
}
