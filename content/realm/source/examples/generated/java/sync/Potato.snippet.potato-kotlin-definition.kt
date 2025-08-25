import io.realm.DynamicRealmObject
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Potato : RealmObject {
    @PrimaryKey
    var _id: ObjectId? = null
    var lastUpdated: Long
    var species: String? = null
        set(species: String?) {
            field = species
            lastUpdated = System.currentTimeMillis()
        }

    constructor(id: ObjectId?, species: String?) {
        this._id = id
        lastUpdated = System.currentTimeMillis()
        this.species = species
    }

    constructor() {
        lastUpdated = System.currentTimeMillis()
    }

    // convenience constructor that allows us to convert DynamicRealmObjects in a backup realm
    // into full object instances
    constructor(obj: DynamicRealmObject) {
        _id = obj.getObjectId("_id")
        species = obj.getString("species")
        lastUpdated = obj.getLong("lastUpdated")
    }
}
