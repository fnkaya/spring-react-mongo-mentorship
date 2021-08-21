package com.fnkaya.mentorship.post.service;

import com.fnkaya.mentorship.errorhadler.ResourceNotFoundException;
import com.fnkaya.mentorship.post.model.Post;
import com.fnkaya.mentorship.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository repository;

    public Post getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor", "id", id));
    }

    public Page<Post> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<Post> getAllBtCategory(String category, Pageable pageable) {
        return repository.findByCategoryName(category, pageable);
    }

    public Page<Post> getAllBySubject(String subject, Pageable pageable) {
        return repository.findByCategorySubjects(subject, pageable);
    }

    public Page<Post> search(String keyword, Pageable pageable) {
        return repository.search(keyword, pageable);
    }
}
