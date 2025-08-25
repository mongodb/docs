package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmObject
// :snippet-start: one-to-one-relationship
open class Child : RealmObject() {
    var frog: Frog? = null
}
// :snippet-end:
