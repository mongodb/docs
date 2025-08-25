package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "RenameModuleExample": "MyModule"
//    }
// }
import io.realm.annotations.RealmModule;
import io.realm.annotations.RealmNamingPolicy;

// :emphasize-start:
@RealmModule(
        allClasses = true,
        classNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES,
        fieldNamingPolicy = RealmNamingPolicy.LOWER_CASE_WITH_UNDERSCORES
)
// :emphasize-end:
public class RenameModuleExample {
}
// :replace-end:
// :snippet-end:
