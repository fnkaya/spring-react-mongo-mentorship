package com.fnkaya.mentorship.post.model;

import com.fnkaya.mentorship.common.model.Category;
import com.fnkaya.mentorship.mentor.model.Mentor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    @DBRef
    private Mentor owner;

    private Category category;

    private String description;
}
