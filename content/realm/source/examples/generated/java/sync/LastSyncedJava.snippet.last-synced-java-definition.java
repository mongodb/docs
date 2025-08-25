import org.bson.types.ObjectId;

import java.util.Date;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class LastSynced extends RealmObject {
    protected Long timestamp;
    @PrimaryKey
    protected ObjectId _id = null;
    // only one instance per realm -- enforce by forcing a single objectid value on all instances

    public LastSynced(Long timestamp) {
        this.timestamp = timestamp;
    }

    public LastSynced() {}

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
