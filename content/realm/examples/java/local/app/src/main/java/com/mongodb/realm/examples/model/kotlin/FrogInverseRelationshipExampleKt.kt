package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogInverseRelationshipExampleKt": "Frog",
//       "ToadInverseRelationshipExampleKt": "Toad"
//    }
// }
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.LinkingObjects

open class FrogInverseRelationshipExampleKt : RealmObject {
    var name: String? = null
    var age = 0
    var species: String? = null
    var owner: String? = null
    @LinkingObjects("frogFriends") // :emphasize:
    private val toadFriends: RealmResults<ToadInverseRelationshipExampleKt>? = null // :emphasize:

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