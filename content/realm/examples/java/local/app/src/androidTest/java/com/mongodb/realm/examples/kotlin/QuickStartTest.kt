package com.mongodb.realm.examples.kotlin

import androidx.lifecycle.Lifecycle
import androidx.test.core.app.ActivityScenario

import org.junit.Test

class QuickStartTest {
    @Test fun testQuickStart() {
        val scenario : ActivityScenario<MainActivity> = ActivityScenario.launch(MainActivity::class.java)
        while(scenario.state != Lifecycle.State.DESTROYED) {
            // continue running the test until the quick start has completed execution
        }
    }
}