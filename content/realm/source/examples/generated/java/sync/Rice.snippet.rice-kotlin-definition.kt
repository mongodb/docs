import io.realm.DynamicRealmObject
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Rice : RealmObject {
    @PrimaryKey
    var _id: ObjectId? = null
    var lastUpdated: Long
    var style: String? = null
        set(style: String?) {
            field = style
            lastUpdated = System.currentTimeMillis()
        }

    constructor(id: ObjectId?, style: String?) {
        this._id = id
        lastUpdated = System.currentTimeMillis()
        this.style = style
    }

    constructor() {
        lastUpdated = System.currentTimeMillis()
    }

    // convenience constructor that allows us to convert DynamicRealmObjects in a backup realm
    // into full object instances
    constructor(obj: DynamicRealmObject) {
        _id = obj.getObjectId("_id")
        style = obj.getString("style")
        lastUpdated = obj.getLong("lastUpdated")
    }
}
