package com.mongodb.realm.examples.model.kotlin

import io.realm.RealmObject
import io.realm.annotations.Index
import io.realm.annotations.PrimaryKey
import java.util.*

// :snippet-start: realm-object-model
open class Sample : RealmObject() {
    @PrimaryKey
    var stringField = "Realm"
    var byteField: Byte = 0xA
    // no support for chars: no charField
    var shortField: Short = 17
    var intField = 42
    @Index
    var longField = 256L
    var booleanField = true
    var floatField = 3.14f
    var doubleField = 1.19840122
    var timestampField = Date()
}
// :snippet-end: