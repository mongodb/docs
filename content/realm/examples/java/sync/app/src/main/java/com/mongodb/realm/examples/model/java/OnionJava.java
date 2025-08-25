package com.mongodb.realm.examples.model.java;
// :snippet-start: onion-java-definition
// :replace-start: {
//    "terms": {
//       "OnionJava": "Onion"
//    }
// }
import org.bson.types.ObjectId;

import io.realm.DynamicRealmObject;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class OnionJava extends RealmObject {
    @PrimaryKey
    public ObjectId _id;
    public Long lastUpdated;
    public String varietal;

    public OnionJava(ObjectId id, String varietal) {
        this._id = id;
        this.lastUpdated = System.currentTimeMillis();
        this.varietal = varietal;
    }

    public OnionJava() { this.lastUpdated = System.currentTimeMillis(); }

    // convenience constructor that allows us to convert DynamicRealmObjects in a backup realm
    // into full object instances
    public OnionJava(DynamicRealmObject obj) {
        this._id = obj.getObjectId("_id");
        this.varietal = obj.getString("varietal");
        this.lastUpdated = obj.getLong("lastUpdated");
    }

    public ObjectId getId() { return _id; }
    public String getVarietal() { return varietal; }
    public void setVarietal(String varietal) {
        this.varietal = varietal;
        this.lastUpdated = System.currentTimeMillis();
    }
    public Long getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(Long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
// :replace-end:
// :snippet-end: