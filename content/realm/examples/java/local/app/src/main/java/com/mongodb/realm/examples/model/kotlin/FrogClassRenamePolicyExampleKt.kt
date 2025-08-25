package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogClassRenamePolicyExampleKt": "Frog"
//    }
// }
import io.realm.RealmObject
import io.realm.annotations.RealmClass
import io.realm.annotations.RealmNamingPolicy

@RealmClass(fieldNamingPolicy = RealmNamingPolicy.PASCAL_CASE) // :emphasize:
open class FrogClassRenamePolicyExampleKt : RealmObject {
    var name: String? = null
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