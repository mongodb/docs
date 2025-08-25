package com.mongodb.realm.examples

import android.app.Application
import android.util.Log
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.NetworkType
import androidx.work.PeriodicWorkRequest
import androidx.work.WorkManager
import io.realm.Realm
import io.realm.log.LogLevel
import io.realm.log.RealmLog
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import java.util.concurrent.TimeUnit

lateinit var taskApp: App

// global Kotlin extension that resolves to the short version
// of the name of the current class. Used for labelling logs.
inline fun <reified T> T.TAG(): String = T::class.java.simpleName

const val YOUR_APP_ID = "android-example-testers-rztwe"

class CustomApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        Realm.init(this)
        taskApp = App(
            AppConfiguration.Builder(YOUR_APP_ID)
                .build())

        // Enable more logging in debug mode
        if (BuildConfig.DEBUG) {
            RealmLog.setLevel(LogLevel.ALL)
        }

        Log.v(TAG(), "Initialized the Realm App configuration.")

        // :snippet-start: background-sync-realm
        // :replace-start: {
        //    "terms": {
        //       "RealmBackgroundWorkerKt": "RealmBackgroundWorker"
        //    }
        // }
        val constraints: Constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.UNMETERED)
            .setRequiresBatteryNotLow(true)
            .build()
        val backgroundRealmSync: PeriodicWorkRequest = PeriodicWorkRequest.Builder(
                RealmBackgroundWorkerKt::class.java,
                // repeat every 12 hours
                12, TimeUnit.HOURS,
                // execute job at any point during that 12 hour period
                12, TimeUnit.HOURS
            )
            .setConstraints(constraints)
            .build()
        // enqueue the work job, replacing it with the most recent version if we update it
        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
            RealmBackgroundWorkerKt.UNIQUE_WORK_NAME,
            ExistingPeriodicWorkPolicy.REPLACE,
            backgroundRealmSync
        )
        // :replace-end:
        // :snippet-end:
        try {
            assert(
                WorkManager.getInstance(this)
                    .getWorkInfosForUniqueWork(RealmBackgroundWorkerKt.UNIQUE_WORK_NAME)
                    .get()[0] != null
            )
        } catch (e: Exception) {
            Log.v("EXAMPLE", (e.message)!!)
        }
    }
}