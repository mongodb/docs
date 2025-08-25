package com.mongodb.realm.examples.model.java;

import com.mongodb.realm.examples.model.kotlin.Frog;

import io.realm.RealmList;
import io.realm.RealmObject;

// :snippet-start: one-to-many-relationship
// :replace-start: {
//    "terms": {
//       "KidJava": "Kid"
//    }
// }
public class KidJava
        extends RealmObject {
    public RealmList<Frog> frogs =
            new RealmList<Frog>();
}
// :replace-end:
// :snippet-end:
