package com.mongodb.realm.examples.model.java

// :snippet-start: onion-kotlin-definition
import io.realm.DynamicRealmObject
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Onion : RealmObject {
    @PrimaryKey
    var _id: ObjectId? = null
    var lastUpdated: Long
    var varietal: String? = null
        set(varietal: String?) {
            lastUpdated = System.currentTimeMillis()
            field = varietal
        }

    constructor(id: ObjectId?, varietal: String?) {
        this._id = id
        lastUpdated = System.currentTimeMillis()
        this.varietal = varietal
    }

    constructor() {
        lastUpdated = System.currentTimeMillis()
    }

    // convenience constructor that allows us to convert DynamicRealmObjects in a backup realm
    // into full object instances
    constructor(obj: DynamicRealmObject) {
        _id = obj.getObjectId("_id")
        varietal = obj.getString("varietal")
        lastUpdated = obj.getLong("lastUpdated")
    }
}
// :snippet-end: