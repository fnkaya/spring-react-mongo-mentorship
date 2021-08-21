package com.fnkaya.mentorship.common.model;

import lombok.Data;

import java.util.List;

@Data
public class Category {

    private String name;

    private List<String> subjects;
}
