package com.mongodb.realm.examples.model.java;
// :snippet-start: projecttask

import org.bson.types.ObjectId;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.RealmClass;
import io.realm.annotations.Required;

// :remove-start:
@RealmClass(name = "DefinitelyNotProjectTask")
// :remove-end:
public class ProjectTask extends RealmObject {
    @PrimaryKey
    public ObjectId _id;
    @Required
    public String name;
    public String assignee;
    public int progressMinutes;
    public boolean isComplete;
    public int priority;
    @Required
    public String _partition;
}
// :snippet-end: