package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmObject

open class Dog(var name: String = ""): RealmObject() {
    var age: Int = 0
    var breed: String? = null
    var owner: Person? = null
}
