package com.mongodb.realm.examples.model
// :snippet-start: plant
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId

open class Plant(val id : ObjectId = ObjectId(),
                 var name : String? = null,
                 var sunlight : String? = null,
                 var color : String? = null,
                 var type : String? = null,
                 @field:BsonProperty("_partition") // specify that this is a field-level annotation
                 var partition : String? = null) {
    override fun toString(): String {
        return "Plant [id=$id, name=$name, sunlight=$sunlight, color=$color, type=$type, partition=$partition]"
    }
}
// :snippet-end: