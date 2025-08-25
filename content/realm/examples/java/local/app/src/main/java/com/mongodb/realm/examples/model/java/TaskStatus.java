package com.mongodb.realm.examples.model.java;
// :snippet-start: define-object-model-local

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