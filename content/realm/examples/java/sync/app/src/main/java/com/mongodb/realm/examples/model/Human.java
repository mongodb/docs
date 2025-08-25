package com.mongodb.realm.examples.model;
// :snippet-start: complete
import org.bson.types.ObjectId;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class Human extends RealmObject {
    @PrimaryKey
    private ObjectId _id = new ObjectId();
    private String name;
    private Cat cat; // :emphasize:

    public Human(String name) {
        this.name = name;
    }

    public Human() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Cat getCat() {
        return cat;
    }

    public void setCat(Cat cat) {
        this.cat = cat;
    }

    public ObjectId get_id() {
        return _id;
    }
}
// :snippet-end: