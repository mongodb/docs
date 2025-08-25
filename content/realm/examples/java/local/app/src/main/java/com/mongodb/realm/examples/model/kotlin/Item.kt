package com.mongodb.realm.examples.model.kotlin
// :snippet-start: complete

import io.realm.RealmObject

open class Item(var id: Int = 0,
                var name: String? = null): RealmObject()
// :snippet-end: