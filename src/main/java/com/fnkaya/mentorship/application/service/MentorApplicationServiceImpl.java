package com.fnkaya.mentorship.application.service;

import com.fnkaya.mentorship.application.model.ApplicationStatus;
import com.fnkaya.mentorship.application.model.MentorApplication;
import com.fnkaya.mentorship.application.repository.MentorApplicationRepository;
import com.fnkaya.mentorship.mentor.model.Mentor;
import com.fnkaya.mentorship.mentor.repository.MentorRepository;
import com.fnkaya.mentorship.post.model.Post;
import com.fnkaya.mentorship.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MentorApplicationServiceImpl implements MentorApplicationService {

    private final MentorApplicationRepository mentorApplicationRepository;
    private final PostRepository postRepository;
    private final MentorRepository mentorRepository;

    @Transactional
    public MentorApplication save(MentorApplication mentorApplication) {
        String ownerId = mentorApplication.getOwner().getId();
        String categoryName = mentorApplication.getCategory().getName();

        mentorApplicationRepository.findByOwnerIdAndCategoryNameAndStatusNot(ownerId, categoryName, ApplicationStatus.REJECTED)
                .ifPresent(application -> {
                    throw new IllegalArgumentException(application.getCategory().getName() + " kategorisine ait durumu \"" +
                            application.getStatus().getDescription() + "\" olan bir başvurunuz zaten var.");
                });

        return mentorApplicationRepository.save(mentorApplication);
    }

    public MentorApplication getById(String id) {
        return mentorApplicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + " id değerine sahip bir kayıt bulunamadı"));
    }

    public Page<MentorApplication> getAll(Pageable pageable) {
        return mentorApplicationRepository.findAll(pageable);
    }

    @Override
    public Page<MentorApplication> getAllByOwnerId(String ownerId, Pageable pageable) {
        return mentorApplicationRepository.findAllByOwnerId(ownerId, pageable);
    }

    public Page<MentorApplication> getAllByStatus(ApplicationStatus status, Pageable pageable) {
        return mentorApplicationRepository.findAllByStatus(status, pageable);
    }

    @Transactional
    public MentorApplication updateStatus(String id, ApplicationStatus status) {
        MentorApplication mentorApplication = getById(id);

        if (ApplicationStatus.ACCEPTED.equals(status)) {
            Optional<Mentor> optionalMentor = mentorRepository.findByAccountId(mentorApplication.getOwner().getId());

            Mentor mentor = optionalMentor.orElseGet(() -> Mentor.builder()
                    .account(mentorApplication.getOwner())
                    .available(true)
                    .build());
            mentor = mentorRepository.save(mentor);

            Post post = Post.builder()
                    .owner(mentor)
                    .category(mentorApplication.getCategory())
                    .description(mentorApplication.getDescription())
                    .build();
            postRepository.save(post);
        }

        mentorApplication.setStatus(status);
        return mentorApplicationRepository.save(mentorApplication);
    }
}
