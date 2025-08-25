package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmList
import io.realm.RealmObject
import io.realm.annotations.Required

// :snippet-start: schema-types
open class CollegeStudent : RealmObject() {
    @Required
    var notes = RealmList<String>()
    var nullableNotes = RealmList<String>()
}
// :snippet-end:
