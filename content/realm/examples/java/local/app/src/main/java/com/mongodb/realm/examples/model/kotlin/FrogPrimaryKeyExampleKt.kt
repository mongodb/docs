package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogPrimaryKeyExampleKt": "Frog"
//    }
// }
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey

open class FrogPrimaryKeyExampleKt : RealmObject {
    @PrimaryKey var name : String? = null // :emphasize:
    var age = 0
    var species: String? = null
    var owner: String? = null

    constructor(name: String?, age: Int, species: String?, owner: String?) {
        this.name = name
        this.age = age
        this.species = species
        this.owner = owner
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :snippet-end: