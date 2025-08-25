package com.mongodb.realm.examples.model.java;
// :snippet-start: last-synced-java-definition
// :replace-start: {
//    "terms": {
//       "LastSyncedJava": "LastSynced"
//    }
// }
import org.bson.types.ObjectId;

import java.util.Date;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class LastSyncedJava extends RealmObject {
    protected Long timestamp;
    @PrimaryKey
    protected ObjectId _id = null;
    // only one instance per realm -- enforce by forcing a single objectid value on all instances

    public LastSyncedJava(Long timestamp) {
        this.timestamp = timestamp;
    }

    public LastSyncedJava() {}

    public Long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
    public ObjectId get_id() {
        return _id;
    }
}
// :replace-end:
// :snippet-end: