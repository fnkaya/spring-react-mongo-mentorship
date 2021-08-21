package com.fnkaya.mentorship.mentor.service;

import com.fnkaya.mentorship.mentor.model.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MentorService {

    Page<Mentor> getAll(Pageable pageable);
}
