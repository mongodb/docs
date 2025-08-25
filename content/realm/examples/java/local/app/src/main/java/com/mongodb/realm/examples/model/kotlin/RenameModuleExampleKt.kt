package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "RenameModuleExampleKt": "MyModule"
//    }
// }
import io.realm.annotations.RealmModule
import io.realm.annotations.RealmNamingPolicy

// :emphasize-start:
@RealmModule(
    allClasses = true,
    classNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES,
    fieldNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES
)
// :emphasize-end:
open class RenameModuleExampleKt
// :replace-end:
// :snippet-end: