package com.fnkaya.mentorship.mentorship.service;

import com.fnkaya.mentorship.email.model.EmailRequest;
import com.fnkaya.mentorship.email.service.EmailSchedulerService;
import com.fnkaya.mentorship.mentor.model.Mentor;
import com.fnkaya.mentorship.mentor.repository.MentorRepository;
import com.fnkaya.mentorship.mentorship.model.Mentorship;
import com.fnkaya.mentorship.mentorship.model.MentorshipStatus;
import com.fnkaya.mentorship.mentorship.model.Phase;
import com.fnkaya.mentorship.mentorship.model.PhaseStatus;
import com.fnkaya.mentorship.mentorship.repository.MentorshipRepository;
import com.fnkaya.mentorship.mentorship.repository.PhaseRepository;
import com.fnkaya.mentorship.security.model.Account;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MentorshipServiceImpl implements MentorshipService {

    private final MentorshipRepository mentorshipRepository;
    private final PhaseRepository phaseRepository;
    private final MentorRepository mentorRepository;
    private final EmailSchedulerService emailSchedulerService;

    @Transactional
    public Mentorship save(Mentorship mentorship) {
        Account mentee = mentorship.getMentee();
        String categoryName = mentorship.getCategory().getName();

        List<MentorshipStatus> mentorshipStatusList = List.of(MentorshipStatus.PENDING, MentorshipStatus.ACCEPTED, MentorshipStatus.STARTED);
        mentorshipRepository.findByMenteeAndCategoryNameAndStatusIn(mentee, categoryName, mentorshipStatusList)
                .ifPresent(mentorshipInDb -> {
                    throw new IllegalStateException(mentorshipInDb.getCategory().getName() + " kategorisine ait durumu \"" + mentorshipInDb.getStatus().getDesc() + "\" olan bir kaydınız zaten var.");
                });

        return mentorshipRepository.save(mentorship);
    }

    public List<Mentorship> getByMenteeId(String menteeId) {
        return mentorshipRepository.findByMenteeIdOrderByStartDateDesc(menteeId);
    }

    public List<Mentorship> getByMentorAccountId(String accountId) {
        Mentor mentor = mentorRepository.findByAccountId(accountId)
                .orElse(null);
        return mentorshipRepository.findByMentorOrderByStartDateDesc(mentor);
    }

    public Page<Mentorship> getAll(Pageable pageable) {
        return mentorshipRepository.findAll(pageable);
    }

    @Transactional
    public Mentorship updateStatus(String id, MentorshipStatus mentorshipStatus) {
        Mentorship mentorship = getById(id);
        Mentor mentor = mentorship.getMentor();

        /*
            Gelen patch isteği ACCEPTED veya STARTED ise ve mentorun uygunluk durumu false ise hata dön
         */
        if ((MentorshipStatus.ACCEPTED.equals(mentorshipStatus) || MentorshipStatus.STARTED.equals(mentorshipStatus)) && !mentor.isAvailable()) {
            throw new IllegalStateException("Zaten iki adet mentorlük programınız mevcut");
        }

        /*
            Mentorun durumu ACCEPTED veya STARTED olan bir adet programı var ise gelen patch isteğinin MentorshipStatus alanına göre mentorun uygunluk durumunu güncelle
            Eğer gelen istek ACCEPTED veya STARTED ise mentorun uygunluk durumu false olmalı değil ise program bitmiş veya reddedilmiş demektir uygunluk durumu true olmalı
         */
        List<MentorshipStatus> mentorshipStatusList = List.of(MentorshipStatus.ACCEPTED, MentorshipStatus.STARTED);
        List<Mentorship> mentorshipList = mentorshipRepository.findByMentorAndStatusIn(mentor, mentorshipStatusList);
        if (mentorshipList.size() == 1) {
            mentor.setAvailable(!MentorshipStatus.ACCEPTED.equals(mentorshipStatus) && !MentorshipStatus.STARTED.equals(mentorshipStatus));
            mentorRepository.save(mentor);
        }

        /*
            Eğer program durumu mentor tarafından kabul edişmiş olarka güncelleniyorsa programın başlangıç tarihini kaydet
         */
        if (MentorshipStatus.ACCEPTED.equals(mentorshipStatus)) {
            mentorship.setStartDate(LocalDateTime.now());
        }
        mentorship.setStatus(mentorshipStatus);
        return mentorshipRepository.save(mentorship);
    }

    public Mentorship getById(String id) {
        return mentorshipRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + " id değerinde bir mentorluk kaydı bulunamadı"));
    }


    /*
        Faz işlemleri ayrı bir servis olmalı
     */
    @Transactional
    public Mentorship savePhase(String id, List<Phase> phaseList) {
        List<Phase> savedPhaseList = phaseRepository.saveAll(phaseList);

        Mentorship mentorship = getById(id);
        mentorship.setPhases(savedPhaseList);
        mentorship.setStatus(MentorshipStatus.STARTED);
        Mentorship savedMentorship = mentorshipRepository.save(mentorship);

        /*
            Her fazın bitiş tarihinden bir saat öncesine planlanmış e-mail isteği oluştur
         */
        phaseList
                .forEach(phase -> {
                    LocalDateTime notificationTime = phase.getEndDate().minusHours(1);
                    String subject = mentorship.getCategory().getSubject() + " - " + phase.getName();
                    String text = mentorship.getStartDate() + " tarihinde başlayan " + mentorship.getCategory().getName() + " - " + mentorship.getCategory().getSubject() + " konulu programa ait " +
                        " faz (" + phase.getName() + ") 1 saat sonra sonlanacaktır.";
                    EmailRequest mailForMentor = new EmailRequest(mentorship.getMentor().getAccount().getEmail(), subject, text, notificationTime, ZoneId.of("Europe/Istanbul"));
                    EmailRequest mailForMentee = new EmailRequest(mentorship.getMentee().getEmail(), subject, text, notificationTime.plusSeconds(30), ZoneId.of("Europe/Istanbul"));
                    emailSchedulerService.scheduleEmail(mailForMentor);
                    emailSchedulerService.scheduleEmail(mailForMentee);
                });

        return savedMentorship;
    }

    @Transactional
    public Mentorship updatePhaseStatus(String id, Phase phase) {
        phaseRepository.save(phase);

        /*
            Eğer sonlandırılan fazın bitiş tarihinden daha sonrasında bir bitiş tarihine sahip bir faz var ise o fazın durumunu ACTIVE yap
            yoksa programın durumunu DONE yap
         */
        Mentorship mentorship = getById(id);
        Optional<Phase> optionalNextPhase = mentorship.getPhases()
                .stream()
                .filter(p -> p.getEndDate().isAfter(phase.getEndDate()))
                .findFirst();
        if (optionalNextPhase.isPresent()) {
            Phase nextPhase = optionalNextPhase.get();
            nextPhase.setStatus(PhaseStatus.ACTIVE);
            phaseRepository.save(nextPhase);
        }
        else {
            mentorship.setStatus(MentorshipStatus.DONE);
            Mentor mentor = mentorship.getMentor();
            mentor.setAvailable(true);
            mentorRepository.save(mentor);
        }

        return mentorshipRepository.save(mentorship);
    }

    public Mentorship updatePhaseComment(String id, Phase phase) {
        phaseRepository.save(phase);

        return getById(id);
    }
}
