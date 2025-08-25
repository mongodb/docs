import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class LastSynced : RealmObject {
    var timestamp: Long? = null

    @PrimaryKey
    var _id: ObjectId? = null
        protected set(id: ObjectId?) {}
    // only one instance per realm -- enforce by forcing a single objectid value on all instances

    constructor(timestamp: Long?) {
        this.timestamp = timestamp
    }

    constructor() {}
}
