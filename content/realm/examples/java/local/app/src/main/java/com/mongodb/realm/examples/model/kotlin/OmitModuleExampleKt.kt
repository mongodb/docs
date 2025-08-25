package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "OmitModuleExampleKt": "MyModule",
//       "FrogEmbeddedExampleKt": "Frog",
//       "FlyEmbeddedExampleKt": "Fly"
//    }
// }
import io.realm.annotations.RealmModule

@RealmModule(classes = [FrogEmbeddedExampleKt::class, FlyEmbeddedExampleKt::class]) // :emphasize:
open class OmitModuleExampleKt
// :replace-end:
// :snippet-end: