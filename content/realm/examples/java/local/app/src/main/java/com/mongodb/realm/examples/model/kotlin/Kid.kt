package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmList
import io.realm.RealmObject

// :snippet-start: one-to-many-relationship
open class Kid : RealmObject() {
    var frogs = RealmList<Frog>()
}
// :snippet-end:
