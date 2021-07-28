package com.fnkaya.mentorship.category.service;

import com.fnkaya.mentorship.category.model.Category;
import com.fnkaya.mentorship.category.model.Topic;
import com.fnkaya.mentorship.category.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicRepository repository;

    public Topic save(Topic topic) {
        return repository.save(topic);
    }

    public Topic get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + " id değerine ait bir kayıt bulunamadı."));
    }

    public Page<Topic> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Topic update(Long id, Topic topic) {
        Topic topicDb = this.get(id);
        topic.setId(topicDb.getId());
        return repository.save(topic);
    }

    public void delete(Long id) {
        Topic topic = this.get(id);
        repository.delete(topic);
    }
}
