package com.mongodb.realm.examples.model.java;
// :snippet-start: rice-java-definition
// :replace-start: {
//    "terms": {
//       "RiceJava": "Rice"
//    }
// }
import org.bson.types.ObjectId;

import io.realm.DynamicRealmObject;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class RiceJava extends RealmObject {
    @PrimaryKey
    protected ObjectId _id;
    protected Long lastUpdated;
    protected String style;

    public RiceJava(ObjectId id, String style) {
        this._id = id;
        this.lastUpdated = System.currentTimeMillis();
        this.style = style;
    }

    public RiceJava() { this.lastUpdated = System.currentTimeMillis(); }

    // convenience constructor that allows us to convert DynamicRealmObjects in a backup realm
    // into full object instances
    public RiceJava(DynamicRealmObject obj) {
        this._id = obj.getObjectId("_id");
        this.style = obj.getString("style");
        this.lastUpdated = obj.getLong("lastUpdated");
    }

    public ObjectId getId() { return _id; }
    public String getStyle() { return style; }
    public void setStyle(String style) {
        this.style = style;
        this.lastUpdated = System.currentTimeMillis();
    }
    public Long getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(Long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
// :replace-end:
// :snippet-end: