package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "SnackKt": "Snack"
//    }
// }
import io.realm.RealmObject

open class SnackKt : RealmObject() {
    var name: String? = null
}
// :replace-end:
// :snippet-end: