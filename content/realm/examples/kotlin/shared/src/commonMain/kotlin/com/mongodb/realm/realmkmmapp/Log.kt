package com.mongodb.realm.realmkmmapp
import co.touchlab.kermit.Kermit

object Log {
    val kermit = Kermit()

    fun e(log: String) {
        kermit.e { log }
    }
    fun w(log: String) {
        kermit.w { log }
    }
    fun d(log: String) {
        kermit.d { log }
    }
    fun i(log: String) {
        kermit.i { log }
    }
    fun v(log: String) {
        kermit.v { log }
    }
}