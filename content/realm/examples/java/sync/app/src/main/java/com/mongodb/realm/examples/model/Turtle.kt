package com.mongodb.realm.examples.model
// :snippet-start: complete
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Turtle(var name : String? = null, var age : Int = 0): RealmObject() {
    @PrimaryKey
    var _id : ObjectId = ObjectId()
    var owner : TurtleEnthusiast? = null
}
// :snippet-end: