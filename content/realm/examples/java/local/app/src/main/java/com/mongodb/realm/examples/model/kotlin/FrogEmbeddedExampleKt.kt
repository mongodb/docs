package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogEmbeddedExampleKt": "Frog",
//       "FlyEmbeddedExampleKt": "Fly"
//    }
// }
import io.realm.RealmObject

open class FrogEmbeddedExampleKt : RealmObject {
    var name: String? = null
    var age = 0
    var species: String? = null
    var owner: String? = null
    var lastMeal: FlyEmbeddedExampleKt? = null // :emphasize:

    constructor(
        name: String?,
        age: Int,
        species: String?,
        owner: String?,
        lastMeal: FlyEmbeddedExampleKt?
    ) {
        this.name = name
        this.age = age
        this.species = species
        this.owner = owner
        this.lastMeal = lastMeal
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :snippet-end: