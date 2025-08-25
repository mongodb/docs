package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition
import com.mongodb.realm.examples.model.java.Project
import com.mongodb.realm.examples.model.java.ProjectTask
import io.realm.Case
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import org.junit.Test


class QueryEngineTest : RealmTest() {
    @Test
    fun testComparisonOperators() {
        val expectation = Expectation()
        val PARTITION = getRandomPartition()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            val anonymousCredentials =
                Credentials.anonymous()
            app.loginAsync(
                anonymousCredentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v(
                                "EXAMPLE",
                                "Successfully opened a realm with reads and writes allowed on the UI thread."
                            )
                            // :snippet-start: comparison-operators
                            val tasksQuery = realm.where(ProjectTask::class.java)
                            Log.i("EXAMPLE", "High priority tasks: " + tasksQuery.greaterThan("priority", 5).count())
                            Log.i("EXAMPLE", "Just-started or short tasks: " + tasksQuery.between("progressMinutes", 1, 10).count())
                            Log.i("EXAMPLE", "Unassigned tasks: " + tasksQuery.isNull("assignee").count())
                            Log.i("EXAMPLE", "Ali or Jamie's tasks: " + tasksQuery.`in`("assignee", arrayOf("Ali", "Jamie")).count())
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                            // :snippet-end:
                        }
                    })
                } else {
                    Log.e("EXAMPLE", it.error.toString())
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testLogicalOperators() {
        val expectation = Expectation()
        val PARTITION = getRandomPartition()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            val anonymousCredentials =
                Credentials.anonymous()
            app.loginAsync(
                anonymousCredentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.")
                            // :snippet-start: logical-operators
                            val tasksQuery = realm.where(ProjectTask::class.java)
                            Log.i("EXAMPLE", "Ali has completed " +
                                        tasksQuery.equalTo("assignee", "Ali").and()
                                            .equalTo("isComplete", true).findAll().size + " tasks.")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                            // :snippet-end:
                        }
                    })
                } else {
                    Log.e("EXAMPLE", it.error.toString())
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testStringOperators() {
        val expectation = Expectation()
        val PARTITION = getRandomPartition()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            val anonymousCredentials =
                Credentials.anonymous()
            app.loginAsync(
                anonymousCredentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.")
                            // :snippet-start: string-operators
                            val projectsQuery = realm.where(Project::class.java)
                            // Pass Case.INSENSITIVE as the third argument for case insensitivity.
                            Log.i("EXAMPLE", "Projects that start with 'e': "
                                        + projectsQuery.beginsWith("name", "e", Case.INSENSITIVE).count())
                            Log.i("EXAMPLE", "Projects that contain 'ie': "
                                    + projectsQuery.contains("name", "ie").count())
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                            // :snippet-end:
                        }
                    })
                } else {
                    Log.e("EXAMPLE", it.error.toString())
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testAggregateOperators() {
        val expectation = Expectation()
        val PARTITION = getRandomPartition()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            val anonymousCredentials =
                Credentials.anonymous()
            app.loginAsync(
                anonymousCredentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.")
                            // :snippet-start: aggregate-operators
                            val tasksQuery = realm.where(ProjectTask::class.java)
                            /*
                            Aggregate operators do not support dot-notation, so you
                            cannot directly operate on a property of all of the objects
                            in a collection property.

                            You can operate on a numeric property of the top-level
                            object, however:
                            */Log.i("EXAMPLE", "Tasks average priority: " + tasksQuery.average("priority"))
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                            // :snippet-end:
                        }
                    })
                } else {
                    Log.e("EXAMPLE", it.error.toString())
                }
            }
        }
        expectation.await()
    }
}
