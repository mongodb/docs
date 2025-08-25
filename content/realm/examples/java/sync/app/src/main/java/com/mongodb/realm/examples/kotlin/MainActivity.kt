package com.mongodb.realm.examples.kotlin
// :snippet-start: complete
import org.bson.types.ObjectId

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.util.Log
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.OrderedRealmCollectionChangeListener

import io.realm.Realm
import io.realm.RealmObject
import io.realm.RealmResults
import io.realm.annotations.PrimaryKey
import io.realm.annotations.Required
import io.realm.kotlin.where
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration

import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.FutureTask


class MainActivity : AppCompatActivity() {
    lateinit var uiThreadRealm: Realm
    lateinit var app: App

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // :snippet-start: initialize-realm
        Realm.init(this) // context, usually an Activity or Application
        // :snippet-end:

        // :snippet-start: initialize-the-app
        val appID : String = YOUR_APP_ID;

        app = App(AppConfiguration.Builder(appID)
                .build())
        // :snippet-end:

        // :snippet-start: authenticate-a-user
        val credentials: Credentials = Credentials.anonymous()

        app.loginAsync(credentials) {
            if (it.isSuccess) {
                Log.v("QUICKSTART", "Successfully authenticated anonymously.")
                val user: User? = app.currentUser()

                val partitionValue: String = "My Project"
                val config = SyncConfiguration.Builder(user, partitionValue)
                    .build()

                uiThreadRealm = Realm.getInstance(config)

                addChangeListenerToRealm(uiThreadRealm)

                val task : FutureTask<String> = FutureTask(BackgroundQuickStart(app.currentUser()!!), "test")
                val executorService: ExecutorService = Executors.newFixedThreadPool(2)
                executorService.execute(task)

                // :remove-start:
                while(!task.isDone) {
                    // wait for task completion
                }
                Log.v("QUICKSTART", "Result: ${task.get()}")

                finish() // destroy activity when background task completes
                // :remove-end:
            } else {
                Log.e("QUICKSTART", "Failed to log in. Error: ${it.error}")
            }
        }
        // :snippet-end:

    }

    fun addChangeListenerToRealm(realm : Realm) {
        // :snippet-start: watch-for-changes
        // all tasks in the realm
        val tasks : RealmResults<Task> = realm.where<Task>().findAllAsync()

        tasks.addChangeListener(OrderedRealmCollectionChangeListener<RealmResults<Task>> { collection, changeSet ->
            // process deletions in reverse order if maintaining parallel data structures so indices don't change as you iterate
            val deletions = changeSet.deletionRanges
            for (i in deletions.indices.reversed()) {
                val range = deletions[i]
                Log.v("QUICKSTART", "Deleted range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
            }

            val insertions = changeSet.insertionRanges
            for (range in insertions) {
                Log.v("QUICKSTART", "Inserted range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
            }

            val modifications = changeSet.changeRanges
            for (range in modifications) {
                Log.v("QUICKSTART", "Updated range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
            }
        })
        // :snippet-end:
    }

    override fun onDestroy() {
        super.onDestroy()
        // the ui thread realm uses asynchronous transactions, so we can only safely close the realm
        // when the activity ends and we can safely assume that those transactions have completed
        uiThreadRealm.close()
        // :snippet-start: log-out
        app.currentUser()?.logOutAsync() {
            if (it.isSuccess) {
                Log.v("QUICKSTART", "Successfully logged out.")
            } else {
                Log.e("QUICKSTART", "Failed to log out, error: ${it.error}")
            }
        }
        // :snippet-end:
    }

    class BackgroundQuickStart(val user: User) : Runnable {

        override fun run() {
            // :snippet-start: open-a-realm
            val partitionValue: String = "My Project"
            val config = SyncConfiguration.Builder(user, partitionValue)
                .build()

            val backgroundThreadRealm : Realm = Realm.getInstance(config)
            // :snippet-end:

            // :snippet-start: create-object
            val task : Task = Task("New Task", partitionValue)
            backgroundThreadRealm.executeTransaction { transactionRealm ->
                transactionRealm.insert(task)
            }
            // :snippet-end:

            // :snippet-start: read-object
            // all tasks in the realm
            val tasks : RealmResults<Task> = backgroundThreadRealm.where<Task>().findAll()
            // :snippet-end:

            // :snippet-start: filter-collection
            // you can also filter a collection
            val tasksThatBeginWithN : List<Task> = tasks.where().beginsWith("name", "N").findAll()
            val openTasks : List<Task> = tasks.where().equalTo("status", TaskStatus.Open.name).findAll()
            // :snippet-end:

            // :snippet-start: update-object
            val otherTask: Task = tasks[0]!!

            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction { transactionRealm ->
                val innerOtherTask : Task = transactionRealm.where<Task>().equalTo("_id", otherTask._id).findFirst()!!
                innerOtherTask.status = TaskStatus.Complete.name
            }
            // :snippet-end:

            // :snippet-start: delete-object
            val yetAnotherTask: Task = tasks.get(0)!!
            val yetAnotherTaskId: ObjectId = yetAnotherTask._id
            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction { transactionRealm ->
                val innerYetAnotherTask : Task = transactionRealm.where<Task>().equalTo("_id", yetAnotherTaskId).findFirst()!!
                innerYetAnotherTask.deleteFromRealm()
            }
            // :snippet-end:

            // because this background thread uses synchronous realm transactions, at this point all
            // transactions have completed and we can safely close the realm
            backgroundThreadRealm.close()
        }

    }
}

// :snippet-start: define-object-model

enum class TaskStatus(val displayName: String) {
    Open("Open"),
    InProgress("In Progress"),
    Complete("Complete"),
}

open class Task(_name: String = "Task", project: String = "My Project") : RealmObject() {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = _name

    @Required
    var status: String = TaskStatus.Open.name
    var statusEnum: TaskStatus
        get() {
            // because status is actually a String and another client could assign an invalid value,
            // default the status to "Open" if the status is unreadable
            return try {
                TaskStatus.valueOf(status)
            } catch (e: IllegalArgumentException) {
                TaskStatus.Open
            }
        }
        set(value) { status = value.name }
}

// :snippet-end:
// :snippet-end: