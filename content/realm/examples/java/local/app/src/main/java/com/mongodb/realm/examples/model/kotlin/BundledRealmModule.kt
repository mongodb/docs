package com.mongodb.realm.examples.model.kotlin

import com.mongodb.realm.examples.model.java.FrogObjectExample
import io.realm.annotations.RealmModule

@RealmModule(classes = [FrogObjectExample::class])
class BundledRealmModule {
}