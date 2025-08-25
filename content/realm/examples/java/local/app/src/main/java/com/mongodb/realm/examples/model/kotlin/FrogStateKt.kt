package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogStateKt": "FrogState"
//    }
// }
enum class FrogStateKt(val state: String) {
    TADPOLE("Tadpole"),
    FROG("Frog"),
    OLD_FROG("Old Frog");
}
// :replace-end:
// :snippet-end: