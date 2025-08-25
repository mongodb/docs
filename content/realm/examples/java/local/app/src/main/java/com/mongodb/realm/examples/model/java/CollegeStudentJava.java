package com.mongodb.realm.examples.model.java;

import com.mongodb.realm.examples.model.kotlin.Frog;

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.Required;

// :snippet-start: schema-types
// :replace-start: {
//    "terms": {
//       "CollegeStudentJava": "CollegeStudent"
//    }
// }
public class CollegeStudentJava
        extends RealmObject {
    @Required
    public RealmList<String> notes =
            new RealmList<String>();
    public RealmList<String> nullableNotes =
            new RealmList<String>();
}
// :replace-end:
// :snippet-end:
