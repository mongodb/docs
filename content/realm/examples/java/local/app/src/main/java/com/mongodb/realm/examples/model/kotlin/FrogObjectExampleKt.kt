package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogObjectExampleKt": "Frog"
//    }
// }
import io.realm.RealmObject

// :emphasize: // providing default values for each constructor parameter
// :emphasize: // fulfills the need for an empty constructor
open class FrogObjectExampleKt(
    var name: String? = null,
    var age: Int = 0,
    var species: String? = null,
    var owner: String? = null
) : RealmObject() // :emphasize: // To add an object to your Realm Schema, extend RealmObject
// :replace-end:
// :snippet-end: