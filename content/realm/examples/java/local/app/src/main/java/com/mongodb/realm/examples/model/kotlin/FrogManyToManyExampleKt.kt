package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogManyToManyExampleKt": "Frog"
//    }
// }
import io.realm.RealmList
import io.realm.RealmObject

open class FrogManyToManyExampleKt : RealmObject {
    var name: String? = null
    var age = 0
    var species: String? = null
    var owner: String? = null
    var bestFriends: RealmList<FrogManyToManyExampleKt>? = null // :emphasize:

    constructor(
        name: String?,
        age: Int,
        species: String?,
        owner: String?,
        bestFriends: RealmList<FrogManyToManyExampleKt>?
    ) {
        this.name = name
        this.age = age
        this.species = species
        this.owner = owner
        this.bestFriends = bestFriends
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :snippet-end: