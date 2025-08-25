package com.mongodb.realm.examples.model;
// :snippet-start: complete
public enum TaskStatus {
    Open("Open"),
    InProgress("In Progress"),
    Complete("Complete");

    String displayName;
    TaskStatus(String displayName) {
        this.displayName = displayName;
    }
}
// :snippet-end: