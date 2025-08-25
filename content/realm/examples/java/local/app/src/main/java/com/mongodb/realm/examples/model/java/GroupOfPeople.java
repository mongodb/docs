package com.mongodb.realm.examples.model.java;

import io.realm.RealmList;
import io.realm.RealmObject;

public class GroupOfPeople extends RealmObject {
    private RealmList<String> people = new RealmList<String>();
    public GroupOfPeople() {}

    public RealmList<String> getPeople() { return people; }
    public void setPeople(RealmList<String> people) { this.people = people; }
}
