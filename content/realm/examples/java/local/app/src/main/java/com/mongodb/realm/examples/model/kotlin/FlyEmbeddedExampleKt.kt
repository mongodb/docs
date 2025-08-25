package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FlyEmbeddedExampleKt": "Fly"
//    }
// }
import io.realm.RealmObject
import io.realm.annotations.RealmClass

@RealmClass(embedded = true) // :emphasize:
open class FlyEmbeddedExampleKt : RealmObject {
    private var name: String? = null

    constructor(name: String?) {
        this.name = name
    }

    constructor() {} // RealmObject subclasses must provide an empty constructor
}
// :replace-end:
// :snippet-end: