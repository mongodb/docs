package com.mongodb.realm.examples.model.kotlin
// :snippet-start: frog-definition-local

import io.realm.RealmObject

open class Frog(var name: String = "",
                var age: Int = 0,
                var species: String? = null,
                var owner: String? = null): RealmObject()
// :snippet-end: