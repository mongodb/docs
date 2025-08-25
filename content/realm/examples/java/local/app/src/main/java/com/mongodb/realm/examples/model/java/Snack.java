package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
import io.realm.RealmObject;

public class Snack extends RealmObject {
    private String name;
    public Snack() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
// :snippet-end: