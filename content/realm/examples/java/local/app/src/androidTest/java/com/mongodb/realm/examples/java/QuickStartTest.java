package com.mongodb.realm.examples.java;

import androidx.lifecycle.Lifecycle;
import androidx.test.core.app.ActivityScenario;

import org.junit.Test;

public class QuickStartTest {
    @Test
    public void testQuickStart() throws Exception {
        ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class);
        while(scenario.getState() != Lifecycle.State.DESTROYED) {
            // continue running the test until the quick start has completed execution
        }
    }
}