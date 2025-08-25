package com.mongodb.realm.examples.model.kotlin
// :snippet-start: frog-definition-local
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Frog(@PrimaryKey var _id : ObjectId = ObjectId(),
                var name: String = "",
                var age: Int = 0,
                var species: String? = null,
                var owner: String? = null): RealmObject()
// :snippet-end: