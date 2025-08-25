package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmObject

open class Person(var name : String? = null) : RealmObject() {
    var dog: Dog? = null
}