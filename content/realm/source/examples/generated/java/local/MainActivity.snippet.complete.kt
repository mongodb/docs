
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.util.Log
import io.realm.*
import io.realm.annotations.PrimaryKey

import io.realm.annotations.Required
import io.realm.kotlin.where
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.FutureTask


class MainActivity : AppCompatActivity() {
    lateinit var uiThreadRealm: Realm

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        Realm.init(this) // context, usually an Activity or Application

        val realmName: String = "My Project"
        val config = RealmConfiguration.Builder()
            .name(realmName)
            .build()

        uiThreadRealm = Realm.getInstance(config)

        addChangeListenerToRealm(uiThreadRealm)

        val task : FutureTask<String> = FutureTask(BackgroundQuickStart(), "test")
        val executorService: ExecutorService = Executors.newFixedThreadPool(2)
        executorService.execute(task)

    }

    fun addChangeListenerToRealm(realm : Realm) {
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
    }

    override fun onDestroy() {
        super.onDestroy()
        // the ui thread realm uses asynchronous transactions, so we can only safely close the realm
        // when the activity ends and we can safely assume that those transactions have completed
        uiThreadRealm.close()
    }

    class BackgroundQuickStart : Runnable {

        override fun run() {
            val realmName: String = "My Project"
            val config = RealmConfiguration.Builder().name(realmName).build()

            val backgroundThreadRealm : Realm = Realm.getInstance(config)

            val task : Task = Task()
            task.name = "New Task"
            backgroundThreadRealm.executeTransaction { transactionRealm ->
                transactionRealm.insert(task)
            }

            // all tasks in the realm
            val tasks : RealmResults<Task> = backgroundThreadRealm.where<Task>().findAll()

            // you can also filter a collection
            val tasksThatBeginWithN : List<Task> = tasks.where().beginsWith("name", "N").findAll()
            val openTasks : List<Task> = tasks.where().equalTo("status", TaskStatus.Open.name).findAll()

            val otherTask: Task = tasks[0]!!

            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction { transactionRealm ->
                val innerOtherTask : Task = transactionRealm.where<Task>().equalTo("name", otherTask.name).findFirst()!!
                innerOtherTask.status = TaskStatus.Complete.name
            }

            val yetAnotherTask: Task = tasks.get(0)!!
            val yetAnotherTaskName: String = yetAnotherTask.name
            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction { transactionRealm ->
                val innerYetAnotherTask : Task = transactionRealm.where<Task>().equalTo("name", yetAnotherTaskName).findFirst()!!
                innerYetAnotherTask.deleteFromRealm()
            }

            // because this background thread uses synchronous realm transactions, at this point all
            // transactions have completed and we can safely close the realm
            backgroundThreadRealm.close()
        }

    }
}


enum class TaskStatus(val displayName: String) {
    Open("Open"),
    InProgress("In Progress"),
    Complete("Complete"),
}

open class Task() : RealmObject() {
    @PrimaryKey
    var name: String = "task"

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

