package com.mongodb.realm.examples.model.java;

import com.mongodb.realm.examples.model.kotlin.Frog;

import io.realm.RealmObject;
// :snippet-start: one-to-one-relationship
// :replace-start: {
//    "terms": {
//       "ChildJava": "Child"
//    }
// }
public class ChildJava
        extends RealmObject {
    public Frog frog = null;
}
// :replace-end:
// :snippet-end:
