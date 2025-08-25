import org.bson.types.ObjectId;

import io.realm.DynamicRealmObject;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class Rice extends RealmObject {
    @PrimaryKey
    protected ObjectId _id;
    protected Long lastUpdated;
    protected String style;

    public Rice(ObjectId id, String style) {
        this._id = id;
        this.lastUpdated = System.currentTimeMillis();
        this.style = style;
    }

    public Rice() { this.lastUpdated = System.currentTimeMillis(); }

    // convenience constructor that allows us to convert DynamicRealmObjects in a backup realm
    // into full object instances
    public Rice(DynamicRealmObject obj) {
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
