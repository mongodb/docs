package com.mongodb.realm.livedataquickstart.model

import io.realm.MutableRealmInteger
import io.realm.RealmObject
import io.realm.annotations.PrimaryKey
import org.bson.types.ObjectId

open class Counter : RealmObject() {
    @PrimaryKey
    private var _id = ObjectId()
    val value = MutableRealmInteger.valueOf(0)
    fun add() {
        value.increment(1)
    }

    fun sub() {
        value.decrement(1)
    }
}