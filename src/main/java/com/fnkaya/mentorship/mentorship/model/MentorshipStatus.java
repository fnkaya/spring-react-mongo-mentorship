package com.fnkaya.mentorship.mentorship.model;

public enum MentorshipStatus {

    PENDING("Onay bekliyor"),
    ACCEPTED("Onaylandı"),
    STARTED("Başladı"),
    DONE("Tamamlandı"),
    REJECTED("Reddedildi");

    private String desc;

    MentorshipStatus(String desc) {
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }
}
