package com.fnkaya.mentorship.mentor.service;

import com.fnkaya.mentorship.mentor.model.Mentor;
import com.fnkaya.mentorship.mentor.repository.MentorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MentorServiceImpl implements MentorService {

    private final MentorRepository repository;

    public Page<Mentor> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
