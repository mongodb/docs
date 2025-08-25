package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogInverseRelationshipExampleKt": "Frog",
//       "ToadInverseRelationshipExampleKt": "Toad"
//    }
// }
import io.realm.RealmList
import io.realm.RealmObject

open class ToadInverseRelationshipExampleKt : RealmObject {
    var frogFriends: RealmList<FrogInverseRelationshipExampleKt>? = null // :emphasize:

    constructor(frogFriends: RealmList<FrogInverseRelationshipExampleKt>?) {
        this.frogFriends = frogFriends
    }

    constructor() {}
}
// :replace-end:
// :snippet-end: