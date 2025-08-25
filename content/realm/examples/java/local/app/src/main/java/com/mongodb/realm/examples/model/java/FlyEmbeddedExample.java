package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FlyEmbeddedExample": "Fly"
//    }
// }
import io.realm.RealmObject;
import io.realm.annotations.RealmClass;

@RealmClass(embedded=true) // :emphasize:
public class FlyEmbeddedExample extends RealmObject {
    private String name;
    public FlyEmbeddedExample(String name) {
        this.name = name;
    }
    public FlyEmbeddedExample() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :snippet-end: