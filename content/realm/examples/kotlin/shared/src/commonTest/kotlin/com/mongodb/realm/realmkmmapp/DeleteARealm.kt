package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import kotlin.test.Test

class DeleteARealm {
    @Test
    fun deleteARealm(){
        val config = RealmConfiguration.Builder(schema = setOf(Task::class))
            .name("throwaway-file")
            .build()
        val realm = Realm.open(config)
        // :snippet-start: delete-realm-file
        // You must close a realm before deleting it
        realm.close()
        // Delete the realm
        Realm.deleteRealm(config)
        // :snippet-end:
    }
}