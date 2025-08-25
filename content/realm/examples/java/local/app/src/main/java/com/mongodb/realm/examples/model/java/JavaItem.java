package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "JavaItem": "Item"
//    }
// }

import io.realm.RealmObject;

public class JavaItem extends RealmObject {
    int id;
    String name;

    public JavaItem() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

// :replace-end:
// :snippet-end: